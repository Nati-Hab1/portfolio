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

