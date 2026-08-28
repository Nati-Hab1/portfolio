const buttons = document.querySelectorAll("button.faq-toggle");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const faq = button.nextElementSibling;
    const svg = button.children[1];

    faq.classList.toggle("show");
    svg.classList.toggle("rotate");
  });
});

// Device tabs selector
const deviceTabButtons = document.querySelectorAll(".device-tab-btn");

deviceTabButtons.forEach((tabBtn) => {
  tabBtn.addEventListener("click", () => {
    deviceTabButtons.forEach((btn) => {
      btn.classList.remove("active");
      btn.setAttribute("aria-selected", "false");
    });
    tabBtn.classList.add("active");
    tabBtn.setAttribute("aria-selected", "true");
    
    const selectedDevice = tabBtn.getAttribute("data-device");
    // Ready for future screenshot integration (e.g. `${selectedDevice}_screenshot_page_<page-number>`)
  });
});

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

