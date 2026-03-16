from playwright.sync_api import sync_playwright
import json

BASE = "http://localhost:3000"
RESULTS = []

def test_form(page, form_type, tab_text, fields, expect_status=201):
    """Test a contact form type."""
    print(f"\n{'='*60}")
    print(f"Testing: {form_type} form")
    print(f"{'='*60}")

    # Capture console and network
    console_errors = []
    api_responses = []

    page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
    page.on("response", lambda resp: api_responses.append({"url": resp.url, "status": resp.status}) if "/api/formularios" in resp.url else None)

    # Navigate to /contacto
    page.goto(f"{BASE}/es/contacto")
    page.wait_for_load_state("networkidle")

    # Click the tab for this form type
    page.locator(f"text={tab_text}").first.click()
    page.wait_for_timeout(500)

    # Fill in fields
    for selector, value in fields.items():
        if selector == "rgpd":
            # Click the checkbox
            page.locator("input[type='checkbox']").first.check()
        elif selector.startswith("select:"):
            field_name = selector.replace("select:", "")
            page.locator(f"select").nth(0).select_option(value)
        elif selector.startswith("textarea"):
            page.locator("textarea").first.fill(value)
        else:
            page.locator(f"input[type='{selector.split(':')[0]}'][placeholder]").nth(int(selector.split(':')[1]) if ':' in selector else 0)

    # Use a more robust approach - fill by placeholder or input order
    print("  Filling form fields...")

    # Get all visible inputs and fill them
    inputs = page.locator("input:visible:not([type='checkbox']):not([type='hidden'])").all()
    textareas = page.locator("textarea:visible").all()
    selects = page.locator("select:visible").all()

    for i, inp in enumerate(inputs):
        input_type = inp.get_attribute("type") or "text"
        if input_type == "email":
            inp.fill("test@xanael.es")
        elif input_type == "tel":
            inp.fill("678111222")
        else:
            placeholder = inp.get_attribute("placeholder") or ""
            if "empresa" in placeholder.lower() or "company" in placeholder.lower():
                inp.fill("Empresa Test S.L.")
            elif "provincia" in placeholder.lower() or "province" in placeholder.lower():
                inp.fill("Navarra")
            elif "experiencia" in placeholder.lower() or "experience" in placeholder.lower():
                inp.fill("5")
            else:
                inp.fill("Test Usuario")

    for ta in textareas:
        ta.fill(f"Mensaje de prueba para formulario {form_type}")

    for sel in selects:
        options = sel.locator("option").all()
        if len(options) > 1:
            # Select the second option (first non-empty)
            sel.select_option(index=1)

    # Check RGPD checkbox
    checkboxes = page.locator("input[type='checkbox']:visible").all()
    for cb in checkboxes:
        if not cb.is_checked():
            cb.check()

    page.wait_for_timeout(300)

    # Take screenshot before submit
    page.screenshot(path=f"/tmp/form_{form_type}_before.png")

    # Find and click submit button
    submit_btn = page.locator("button[type='submit']:visible").first
    print(f"  Submit button text: {submit_btn.text_content()}")
    submit_btn.click()

    # Wait for API response
    page.wait_for_timeout(3000)

    # Take screenshot after submit
    page.screenshot(path=f"/tmp/form_{form_type}_after.png")

    # Check results
    api_hit = [r for r in api_responses if "/api/formularios" in r["url"] and r["url"].count("/") <= 5]
    console_errs = [e for e in console_errors if "error" in e.lower() or "Error" in e]

    result = {
        "form_type": form_type,
        "api_responses": api_hit,
        "console_errors": console_errs,
        "success": any(r["status"] == expect_status for r in api_hit)
    }
    RESULTS.append(result)

    if result["success"]:
        print(f"  ✓ API returned {expect_status}")
    else:
        print(f"  ✗ Expected {expect_status}, got: {api_hit}")

    if console_errs:
        print(f"  ✗ Console errors: {console_errs}")
    else:
        print(f"  ✓ No console errors")

    # Remove listeners to avoid stacking
    page.remove_listener("console", lambda msg: None)
    page.remove_listener("response", lambda msg: None)

    return result


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    # Test 1: Comercial form
    console_errors_1 = []
    api_responses_1 = []
    page.on("console", lambda msg: console_errors_1.append(msg.text) if msg.type == "error" else None)
    page.on("response", lambda resp: api_responses_1.append({"url": resp.url, "status": resp.status}) if "/api/formularios" in resp.url and resp.request.method == "POST" else None)

    print("\n" + "="*60)
    print("TEST 1: Comercial form")
    print("="*60)
    page.goto(f"{BASE}/es/contacto")
    page.wait_for_load_state("networkidle")

    # Click "Información comercial" tab
    page.locator("text=Información comercial").first.click()
    page.wait_for_timeout(500)
    page.screenshot(path="/tmp/form_comercial_tab.png")

    # Fill fields
    inputs = page.locator("input:visible:not([type='checkbox']):not([type='hidden'])").all()
    for inp in inputs:
        itype = inp.get_attribute("type") or "text"
        if itype == "email":
            inp.fill("comercial@test.es")
        elif itype == "tel":
            inp.fill("678111001")
        else:
            inp.fill("Test Comercial")

    selects = page.locator("select:visible").all()
    for sel in selects:
        opts = sel.locator("option").all()
        if len(opts) > 1:
            sel.select_option(index=1)

    page.locator("textarea:visible").first.fill("Mensaje comercial de prueba")
    page.locator("input[type='checkbox']:visible").first.check()
    page.screenshot(path="/tmp/form_comercial_filled.png")

    page.locator("button[type='submit']:visible").first.click()
    page.wait_for_timeout(3000)
    page.screenshot(path="/tmp/form_comercial_after.png")

    print(f"  API responses: {api_responses_1}")
    print(f"  Console errors: {console_errors_1}")
    success_1 = any(r["status"] == 201 for r in api_responses_1)
    print(f"  {'✓' if success_1 else '✗'} Status 201: {success_1}")

    # Test 2: General form
    api_responses_2 = []
    console_errors_2 = []
    page2 = browser.new_page()
    page2.on("console", lambda msg: console_errors_2.append(msg.text) if msg.type == "error" else None)
    page2.on("response", lambda resp: api_responses_2.append({"url": resp.url, "status": resp.status}) if "/api/formularios" in resp.url and resp.request.method == "POST" else None)

    print("\n" + "="*60)
    print("TEST 2: General form")
    print("="*60)
    page2.goto(f"{BASE}/es/contacto")
    page2.wait_for_load_state("networkidle")

    page2.locator("text=Consulta general").first.click()
    page2.wait_for_timeout(500)

    inputs = page2.locator("input:visible:not([type='checkbox']):not([type='hidden'])").all()
    for inp in inputs:
        itype = inp.get_attribute("type") or "text"
        if itype == "email":
            inp.fill("general@test.es")
        else:
            inp.fill("Test General")

    page2.locator("textarea:visible").first.fill("Consulta general de prueba")
    page2.locator("input[type='checkbox']:visible").first.check()
    page2.locator("button[type='submit']:visible").first.click()
    page2.wait_for_timeout(3000)
    page2.screenshot(path="/tmp/form_general_after.png")

    print(f"  API responses: {api_responses_2}")
    print(f"  Console errors: {console_errors_2}")
    success_2 = any(r["status"] == 201 for r in api_responses_2)
    print(f"  {'✓' if success_2 else '✗'} Status 201: {success_2}")
    page2.close()

    # Test 3: Partner/Instalador form
    api_responses_3 = []
    console_errors_3 = []
    page3 = browser.new_page()
    page3.on("console", lambda msg: console_errors_3.append(msg.text) if msg.type == "error" else None)
    page3.on("response", lambda resp: api_responses_3.append({"url": resp.url, "status": resp.status}) if "/api/formularios" in resp.url and resp.request.method == "POST" else None)

    print("\n" + "="*60)
    print("TEST 3: Partner/Instalador form")
    print("="*60)
    page3.goto(f"{BASE}/es/contacto")
    page3.wait_for_load_state("networkidle")

    page3.locator("text=Quiero ser partner").first.click()
    page3.wait_for_timeout(500)

    inputs = page3.locator("input:visible:not([type='checkbox']):not([type='hidden'])").all()
    for inp in inputs:
        itype = inp.get_attribute("type") or "text"
        if itype == "email":
            inp.fill("partner@test.es")
        elif itype == "tel":
            inp.fill("678111003")
        else:
            placeholder = (inp.get_attribute("placeholder") or "").lower()
            if "empresa" in placeholder or "company" in placeholder:
                inp.fill("Partner S.L.")
            elif "provincia" in placeholder or "province" in placeholder:
                inp.fill("Navarra")
            elif "experiencia" in placeholder or "experience" in placeholder or "años" in placeholder:
                inp.fill("10")
            else:
                inp.fill("Test Partner")

    selects = page3.locator("select:visible").all()
    for sel in selects:
        opts = sel.locator("option").all()
        if len(opts) > 1:
            sel.select_option(index=1)

    page3.locator("textarea:visible").first.fill("Quiero ser instalador autorizado")
    page3.locator("input[type='checkbox']:visible").first.check()
    page3.locator("button[type='submit']:visible").first.click()
    page3.wait_for_timeout(3000)
    page3.screenshot(path="/tmp/form_partner_after.png")

    print(f"  API responses: {api_responses_3}")
    print(f"  Console errors: {console_errors_3}")
    success_3 = any(r["status"] == 201 for r in api_responses_3)
    print(f"  {'✓' if success_3 else '✗'} Status 201: {success_3}")
    page3.close()

    # Test 4: Técnico form
    api_responses_4 = []
    console_errors_4 = []
    page4 = browser.new_page()
    page4.on("console", lambda msg: console_errors_4.append(msg.text) if msg.type == "error" else None)
    page4.on("response", lambda resp: api_responses_4.append({"url": resp.url, "status": resp.status}) if "/api/formularios" in resp.url and resp.request.method == "POST" else None)

    print("\n" + "="*60)
    print("TEST 4: Técnico form")
    print("="*60)
    page4.goto(f"{BASE}/es/contacto")
    page4.wait_for_load_state("networkidle")

    page4.locator("text=Soporte técnico").first.click()
    page4.wait_for_timeout(500)

    inputs = page4.locator("input:visible:not([type='checkbox']):not([type='hidden'])").all()
    for inp in inputs:
        itype = inp.get_attribute("type") or "text"
        if itype == "email":
            inp.fill("tecnico@test.es")
        elif itype == "tel":
            inp.fill("678111004")
        else:
            inp.fill("Test Técnico")

    page4.locator("textarea:visible").first.fill("Incidencia técnica de prueba")
    page4.locator("input[type='checkbox']:visible").first.check()
    page4.locator("button[type='submit']:visible").first.click()
    page4.wait_for_timeout(3000)
    page4.screenshot(path="/tmp/form_tecnico_after.png")

    print(f"  API responses: {api_responses_4}")
    print(f"  Console errors: {console_errors_4}")
    success_4 = any(r["status"] == 201 for r in api_responses_4)
    print(f"  {'✓' if success_4 else '✗'} Status 201: {success_4}")
    page4.close()

    # Test 5: Colaboradores form (check if it submits)
    api_responses_5 = []
    console_errors_5 = []
    page5 = browser.new_page()
    page5.on("console", lambda msg: console_errors_5.append(msg.text) if msg.type == "error" else None)
    page5.on("response", lambda resp: api_responses_5.append({"url": resp.url, "status": resp.status}) if "/api/formularios" in resp.url and resp.request.method == "POST" else None)

    print("\n" + "="*60)
    print("TEST 5: Colaboradores form")
    print("="*60)
    page5.goto(f"{BASE}/es/colaboradores")
    page5.wait_for_load_state("networkidle")
    page5.screenshot(path="/tmp/form_colab_page.png")

    # Try to find and fill the form
    inputs = page5.locator("input:visible:not([type='checkbox']):not([type='hidden'])").all()
    print(f"  Found {len(inputs)} input fields")

    for inp in inputs:
        itype = inp.get_attribute("type") or "text"
        if itype == "email":
            inp.fill("colab@test.es")
        elif itype == "tel":
            inp.fill("678111005")
        else:
            inp.fill("Test Colaborador")

    selects = page5.locator("select:visible").all()
    print(f"  Found {len(selects)} select fields")
    for sel in selects:
        opts = sel.locator("option").all()
        if len(opts) > 1:
            sel.select_option(index=1)

    textareas = page5.locator("textarea:visible").all()
    print(f"  Found {len(textareas)} textarea fields")
    for ta in textareas:
        ta.fill("Quiero colaborar como distribuidor")

    checkboxes = page5.locator("input[type='checkbox']:visible").all()
    print(f"  Found {len(checkboxes)} checkboxes")
    for cb in checkboxes:
        if not cb.is_checked():
            cb.check()

    # Try to submit
    submit_btns = page5.locator("button[type='submit']:visible").all()
    print(f"  Found {len(submit_btns)} submit buttons")
    if submit_btns:
        submit_btns[0].click()
        page5.wait_for_timeout(3000)

    page5.screenshot(path="/tmp/form_colab_after.png")
    print(f"  API responses: {api_responses_5}")
    print(f"  Console errors: {console_errors_5}")
    success_5 = any(r["status"] == 201 for r in api_responses_5)
    print(f"  {'✓' if success_5 else '✗'} Status 201: {success_5}")
    if not api_responses_5:
        print(f"  ⚠ No API call made — form submission is not wired")
    page5.close()

    # Summary
    print("\n" + "="*60)
    print("SUMMARY")
    print("="*60)
    results = [
        ("Comercial", success_1),
        ("General", success_2),
        ("Partner/Instalador", success_3),
        ("Técnico", success_4),
        ("Colaboradores", success_5),
    ]
    for name, ok in results:
        print(f"  {'✓' if ok else '✗'} {name}: {'PASS' if ok else 'FAIL'}")

    browser.close()
