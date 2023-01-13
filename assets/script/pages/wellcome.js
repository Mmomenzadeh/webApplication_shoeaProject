const navigatePages = (target) => {
  window.location.href = `./${target}.html`;
};

if (localStorage.hasOwnProperty("wellcomePage")) {
  navigatePages("splashPage/firstPage");
} else {
  localStorage.setItem("wellcomePage", true);
}

document.querySelector(".wellcomePage").addEventListener("click", () => {
  navigatePages("splashPage/firstPage");
});
