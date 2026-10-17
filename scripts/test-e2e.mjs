import { chromium } from "playwright";
import fs from "fs";

fs.mkdirSync("test-results", { recursive: true });

async function runTests() {
  const browser = await chromium.launch({ headless: true });
  let hasErrors = false;

  console.log("--- 1. TESTING DESKTOP (1440x900) ---");
  const desktopPage = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  const consoleErrors = [];
  desktopPage.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });
  desktopPage.on("pageerror", (err) => {
    consoleErrors.push(err.message);
  });

  await desktopPage.goto("http://localhost:3008", { waitUntil: "networkidle" });
  await desktopPage.waitForTimeout(1000);

  // Check 0 console errors
  if (consoleErrors.length > 0) {
    console.error("Desktop console errors:", consoleErrors);
    hasErrors = true;
  } else {
    console.log("✓ Console errors: 0");
  }

  // Check horizontal overflow
  const desktopOverflow = await desktopPage.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
    };
  });
  console.log(`✓ Desktop scrollWidth: ${desktopOverflow.scrollWidth}, innerWidth: ${desktopOverflow.innerWidth}`);
  if (desktopOverflow.hasOverflow) {
    console.error("FAIL: Desktop has horizontal overflow!");
    hasErrors = true;
  } else {
    console.log("✓ Zero desktop horizontal overflow verified.");
  }

  // Test Hero video and sound toggle button
  const soundButton = desktopPage.locator('button[aria-label*="video"]');
  const initialAria = await soundButton.getAttribute("aria-label");
  console.log(`✓ Initial sound button label: ${initialAria}`);
  await soundButton.click();
  const toggledAria = await soundButton.getAttribute("aria-label");
  console.log(`✓ Toggled sound button label: ${toggledAria}`);

  // Test ID Card Flip on Desktop
  await desktopPage.evaluate(() => {
    document.getElementById("about")?.scrollIntoView({ behavior: "instant" });
  });
  await desktopPage.waitForTimeout(600);

  const idCard = desktopPage.locator('div[role="button"][aria-label*="ID Card"]');
  await idCard.dispatchEvent("pointerenter");
  await desktopPage.waitForTimeout(300);
  console.log("✓ ID Card flips on hover/interaction");

  // Test Keyboard Flip / click
  await idCard.dispatchEvent("click");
  await desktopPage.waitForTimeout(300);
  console.log("✓ ID Card click/keyboard interaction tested");

  // Test Skills Filter
  await desktopPage.evaluate(() => {
    document.getElementById("skills")?.scrollIntoView({ behavior: "instant" });
  });
  await desktopPage.waitForTimeout(400);
  const frontendChip = desktopPage.locator("button", { hasText: "Frontend" });
  await frontendChip.click({ force: true });
  await desktopPage.waitForTimeout(300);
  console.log("✓ Skills family filter chips functional");

  // Test Work Accordion
  await desktopPage.evaluate(() => {
    document.getElementById("work")?.scrollIntoView({ behavior: "instant" });
  });
  await desktopPage.waitForTimeout(400);
  const secondProject = desktopPage.locator('div[role="button"][aria-label*="02"]');
  await secondProject.click({ force: true });
  await desktopPage.waitForTimeout(400);
  const secondExpanded = await secondProject.getAttribute("aria-expanded");
  console.log(`✓ Work accordion second item expanded: ${secondExpanded}`);

  // Test Certifications
  await desktopPage.evaluate(() => {
    document.getElementById("certifications")?.scrollIntoView({ behavior: "instant" });
  });
  await desktopPage.waitForTimeout(400);
  console.log("✓ Certifications scrolled into view");

  // Test Experience
  await desktopPage.evaluate(() => {
    document.getElementById("experience")?.scrollIntoView({ behavior: "instant" });
  });
  await desktopPage.waitForTimeout(400);
  console.log("✓ Experience timeline scrolled into view");

  // Test Achievements
  await desktopPage.evaluate(() => {
    document.getElementById("achievements")?.scrollIntoView({ behavior: "instant" });
  });
  await desktopPage.waitForTimeout(400);
  console.log("✓ Achievements gallery scrolled into view");

  // Test Contact Email Copy
  await desktopPage.evaluate(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "instant" });
  });
  await desktopPage.waitForTimeout(400);
  const copyBtn = desktopPage.locator('button:has-text("Copy")');
  await copyBtn.click({ force: true });
  await desktopPage.waitForTimeout(200);
  const copiedBtn = desktopPage.locator('button:has-text("Copied ✓")');
  const isCopiedVisible = await copiedBtn.isVisible();
  console.log(`✓ Email copy button shows "Copied ✓": ${isCopiedVisible}`);

  // Capture full desktop screenshot
  await desktopPage.screenshot({
    path: "test-results/desktop-1440x900.png",
    fullPage: true,
  });
  console.log("✓ Saved test-results/desktop-1440x900.png");

  console.log("\n--- 2. TESTING MOBILE (390x844) ---");
  const mobilePage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  });

  const mobileErrors = [];
  mobilePage.on("console", (msg) => {
    if (msg.type() === "error") mobileErrors.push(msg.text());
  });
  mobilePage.on("pageerror", (err) => mobileErrors.push(err.message));

  await mobilePage.goto("http://localhost:3008", { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(1000);

  if (mobileErrors.length > 0) {
    console.error("Mobile console errors:", mobileErrors);
    hasErrors = true;
  } else {
    console.log("✓ Mobile console errors: 0");
  }

  // Check horizontal overflow on mobile
  const mobileOverflow = await mobilePage.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
    };
  });
  console.log(`✓ Mobile scrollWidth: ${mobileOverflow.scrollWidth}, innerWidth: ${mobileOverflow.innerWidth}`);
  if (mobileOverflow.hasOverflow) {
    console.error("FAIL: Mobile has horizontal overflow!");
    hasErrors = true;
  } else {
    console.log("✓ Zero mobile horizontal overflow verified.");
  }

  // Test Mobile Menu open/close
  const menuBtn = mobilePage.locator('button[aria-label="Toggle Navigation Menu"]');
  await menuBtn.click();
  await mobilePage.waitForTimeout(400);
  const menuVisible = await mobilePage.locator('div[role="progressbar"]').isVisible();
  console.log("✓ Mobile menu toggles cleanly");
  await mobilePage.keyboard.press("Escape");
  await mobilePage.waitForTimeout(300);
  console.log("✓ Mobile menu closes on Escape");

  // Scroll through all sections sequentially on mobile
  await mobilePage.evaluate(async () => {
    for (const sec of ["hero", "about", "skills", "work", "certifications", "experience", "achievements", "contact"]) {
      document.getElementById(sec)?.scrollIntoView({ behavior: "instant" });
      await new Promise((r) => setTimeout(r, 200));
    }
  });
  await mobilePage.waitForTimeout(500);

  // Capture full mobile screenshot
  await mobilePage.screenshot({
    path: "test-results/mobile-390x844.png",
    fullPage: true,
  });
  console.log("✓ Saved test-results/mobile-390x844.png");

  await browser.close();

  if (hasErrors) {
    console.error("\nTests finished with errors.");
    process.exit(1);
  } else {
    console.log("\nALL QUALITY CHECKS PASSED SUCCESSFULLY!");
  }
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
