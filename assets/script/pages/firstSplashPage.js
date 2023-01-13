const navigatePages = (target) => {
  window.location.href = `./${target}.html`;
};

if (localStorage.hasOwnProperty("firstSplashPage")) {
  navigatePages("secondPage");
} else {
  localStorage.setItem("firstSplashPage", true);
}
