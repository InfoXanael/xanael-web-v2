#!/usr/bin/env python3
import paramiko, time, sys

HOST = "116.203.230.143"
USER = "claudeuser"
PASSWORD = "UHxpcmPgjihT"

def run(client, cmd):
    print(f">>> {cmd}")
    _, stdout, stderr = client.exec_command(cmd)
    out = stdout.read().decode("utf-8", errors="replace").strip()
    err = stderr.read().decode("utf-8", errors="replace").strip()
    code = stdout.channel.recv_exit_status()
    if out: print("  OUT:", out[:300].encode("ascii", errors="replace").decode())
    if err: print("  ERR:", err[:300].encode("ascii", errors="replace").decode())
    print(f"  EXIT: {code}")
    return code, out

def main():
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(HOST, username=USER, password=PASSWORD, timeout=30)
    print("Connected!")

    # 1. Crear directorio testing con ownership correcto
    run(client, "sudo mkdir -p /var/www/media-xanael/testing")
    run(client, "sudo chown claudeuser:claudeuser /var/www/media-xanael/testing")
    run(client, "sudo chmod 755 /var/www/media-xanael/testing")

    # 2. Arreglar el resto de subdirectorios por si acaso
    run(client, "sudo find /var/www/media-xanael -type d -exec chown claudeuser:claudeuser {} \\;")

    # 3. Verificar estado PM2
    code, out = run(client, "pm2 list")
    if "xanael-uploader" not in out:
        print("PM2 process not found! Starting...")
        run(client, "cd /opt/xanael-uploader && pm2 start app.js --name xanael-uploader")
        run(client, "pm2 save")
    elif "errored" in out or "stopped" in out:
        print("PM2 process in bad state! Restarting...")
        run(client, "pm2 restart xanael-uploader")
    else:
        print("PM2 process running OK")

    # 4. Test directo al servicio
    time.sleep(1)
    api_key = "6fb3820c81ca82609fa89e7582dcc15579860eb3cf2942ea6dc85eafef0aba71"
    code, out = run(client,
        f'curl -s -X POST http://localhost:3001/upload/testing '
        f'-H "x-api-key: {api_key}" '
        f'-F "file=@/etc/hostname;type=image/jpeg"')
    if '"url"' in out:
        print("SUCCESS: uploader responds correctly for /upload/testing")
    else:
        print("WARNING: unexpected response:", out)

    client.close()
    print("Done.")

if __name__ == "__main__":
    main()
