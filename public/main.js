const buttons = document.querySelectorAll("button.faq-toggle");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const faq = button.nextElementSibling;
    const svg = button.children[1];

    faq.classList.toggle("show");
    svg.classList.toggle("rotate");
  });
});

// Device tabs and Responsive Screenshot Viewer selector
const deviceTabButtons = document.querySelectorAll(".device-tab-btn");
const screenshotPageButtons = document.querySelectorAll(".screenshot-page-btn");
const screenshotImg = document.getElementById("screenshot-image");
const screenshotViewport = document.getElementById("screenshot-viewport");
const screenshotEmptyState = document.getElementById("screenshot-empty");
const screenshotStage = document.querySelector(".screenshot-stage");
const screenshotPageTabs = document.querySelector(".screenshot-page-tabs");
const screenshotScrollHint = document.querySelector(".screenshot-scroll-hint");

let currentDevice = "mobile";
let currentPage = 1;

function updateScreenshot() {
  if (!screenshotImg || !screenshotViewport) return;

  // Reset scroll position to top when changing device or page
  screenshotViewport.scrollTop = 0;

  // Handle Desktop or devices without images yet
  if (currentDevice === "desktop") {
    if (screenshotStage) screenshotStage.style.display = "none";
    if (screenshotEmptyState) screenshotEmptyState.style.display = "flex";
    if (screenshotScrollHint) screenshotScrollHint.style.visibility = "hidden";
    return;
  }

  if (screenshotEmptyState) screenshotEmptyState.style.display = "none";
  if (screenshotStage) screenshotStage.style.display = "flex";
  if (screenshotScrollHint) screenshotScrollHint.style.visibility = "visible";

  const imagePath = `../assets/images/${currentDevice}_screenshot_page_${currentPage}.png`;

  const pageNames = { 1: "Home", 2: "About", 3: "Project" };
  const pageName = pageNames[currentPage] || `Page ${currentPage}`;

  // Update device CSS class for natural proportions
  screenshotImg.className = `screenshot-img device-${currentDevice}`;
  screenshotImg.alt = `${currentDevice.charAt(0).toUpperCase() + currentDevice.slice(1)} ${pageName} screenshot`;

  // Smooth fade transition
  screenshotImg.style.opacity = "0.4";
  
  // Test image loading
  const tempImg = new Image();
  tempImg.onload = () => {
    screenshotImg.src = imagePath;
    screenshotImg.style.opacity = "1";
    if (screenshotEmptyState) screenshotEmptyState.style.display = "none";
    if (screenshotStage) screenshotStage.style.display = "flex";
    if (screenshotScrollHint) screenshotScrollHint.style.visibility = "visible";
  };
  tempImg.onerror = () => {
    // If desktop (or any new device/page) file is not yet available
    if (screenshotStage) screenshotStage.style.display = "none";
    if (screenshotEmptyState) screenshotEmptyState.style.display = "flex";
    if (screenshotScrollHint) screenshotScrollHint.style.visibility = "hidden";
  };
  tempImg.src = imagePath;
}

if (deviceTabButtons.length > 0) {
  deviceTabButtons.forEach((tabBtn) => {
    tabBtn.addEventListener("click", () => {
      deviceTabButtons.forEach((btn) => {
        btn.classList.remove("active");
        btn.setAttribute("aria-selected", "false");
      });
      tabBtn.classList.add("active");
      tabBtn.setAttribute("aria-selected", "true");

      currentDevice = tabBtn.getAttribute("data-device") || "mobile";
      updateScreenshot();
    });
  });
}

if (screenshotPageButtons.length > 0) {
  screenshotPageButtons.forEach((pageBtn) => {
    pageBtn.addEventListener("click", () => {
      screenshotPageButtons.forEach((btn) => btn.classList.remove("active"));
      pageBtn.classList.add("active");

      currentPage = parseInt(pageBtn.getAttribute("data-page") || "1", 10);
      updateScreenshot();
    });
  });
}

// Mobile Hamburger & Side Navigation Drawer
const hamburgerBtn = document.querySelector(".nav-hamburger");
const drawerCloseBtn = document.querySelector(".nav-close-btn");
const navDrawer = document.querySelector(".nav-drawer");
const navOverlay = document.querySelector(".nav-overlay");
const drawerLinks = document.querySelectorAll(".nav-drawer-links a");

function openDrawer() {
  if (!navDrawer || !navOverlay) return;
  navDrawer.classList.add("open");
  navOverlay.classList.add("active");
  document.body.classList.add("drawer-open");
  if (hamburgerBtn) {
    hamburgerBtn.setAttribute("aria-expanded", "true");
  }
  if (drawerCloseBtn) {
    drawerCloseBtn.focus();
  }
}

function closeDrawer() {
  if (!navDrawer || !navOverlay) return;
  navDrawer.classList.remove("open");
  navOverlay.classList.remove("active");
  document.body.classList.remove("drawer-open");
  if (hamburgerBtn) {
    hamburgerBtn.setAttribute("aria-expanded", "false");
    hamburgerBtn.focus();
  }
}

if (hamburgerBtn) {
  hamburgerBtn.addEventListener("click", () => {
    const isOpen = navDrawer && navDrawer.classList.contains("open");
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });
}

if (drawerCloseBtn) {
  drawerCloseBtn.addEventListener("click", closeDrawer);
}

if (navOverlay) {
  navOverlay.addEventListener("click", closeDrawer);
}

// Close drawer on pressing Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navDrawer && navDrawer.classList.contains("open")) {
    closeDrawer();
  }
});

// Close drawer when any navigation link inside is clicked
drawerLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeDrawer();
  });
});

// Close drawer if window is resized beyond mobile breakpoint
window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && navDrawer && navDrawer.classList.contains("open")) {
    closeDrawer();
  }
});

