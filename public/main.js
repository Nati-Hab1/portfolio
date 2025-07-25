const buttons = document.querySelectorAll("button.faq-toggle");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const faq = button.nextElementSibling;
    const svg = button.children[1];

    faq.classList.toggle("show");
    svg.classList.toggle("rotate");
  });
});
