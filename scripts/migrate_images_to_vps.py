import os
import json
import time
import secrets
import mimetypes
import requests
import psycopg2
import paramiko

VPS_HOST = "116.203.230.143"
VPS_USER = "claudeuser"
VPS_PASSWORD = "UHxpcmPgjihT"
VPS_UPLOAD_DIR = "/var/www/media-xanael"
VPS_PUBLIC_BASE = "https://media.xanael.es"

DATABASE_URL = "postgresql://xanael:xanael2026db@116.203.230.143:5432/xanael_dashboard"

def is_vercel_url(url: str) -> bool:
    return "vercel-storage.com" in url

def generate_filename(url: str) -> str:
    ext = url.split(".")[-1].split("?")[0][:5].lower()
    if ext not in ("jpg", "jpeg", "png", "webp", "heic", "heif"):
        ext = "jpg"
    return f"{int(time.time() * 1000)}-{secrets.token_hex(6)}.{ext}"

def migrate():
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(VPS_HOST, username=VPS_USER, password=VPS_PASSWORD, timeout=10)
    sftp = ssh.open_sftp()

    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()

    cur.execute('SELECT id, zonas FROM "PilotoSubmission"')
    rows = cur.fetchall()
    print(f"Total submissions: {len(rows)}")

    migrated = 0
    skipped = 0

    for row_id, zonas in rows:
        if isinstance(zonas, str):
            zonas = json.loads(zonas)

        changed = False
        for zona in zonas:
            new_fotos = []
            for url in zona.get("fotos", []):
                if is_vercel_url(url):
                    print(f"  Downloading: {url[:80]}...")
                    try:
                        r = requests.get(url, timeout=20)
                        r.raise_for_status()

                        subfolder = "piloto"
                        filename = generate_filename(url)
                        remote_path = f"{VPS_UPLOAD_DIR}/{subfolder}/{filename}"
                        new_url = f"{VPS_PUBLIC_BASE}/{subfolder}/{filename}"

                        with sftp.open(remote_path, "wb") as f:
                            f.write(r.content)

                        new_fotos.append(new_url)
                        print(f"    -> {new_url}")
                        migrated += 1
                        changed = True
                    except Exception as e:
                        print(f"    ERROR: {e} — keeping original URL")
                        new_fotos.append(url)
                        skipped += 1
                else:
                    new_fotos.append(url)
            zona["fotos"] = new_fotos

        if changed:
            cur.execute(
                'UPDATE "PilotoSubmission" SET zonas = %s WHERE id = %s',
                (json.dumps(zonas), row_id),
            )
            conn.commit()
            print(f"  Updated submission {row_id}")

    sftp.close()
    ssh.close()
    cur.close()
    conn.close()
    print(f"\nDone. Migrated: {migrated}, Skipped/errors: {skipped}")

if __name__ == "__main__":
    migrate()
