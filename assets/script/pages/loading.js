const navigatePages = (target) => {
  window.location.href = `./${target}.html`;
};

document.addEventListener("DOMContentLoaded", () => {
  window.setTimeout(() => {
    if (localStorage.hasOwnProperty("tridSplashPage")) {
      navigatePages("Home");
    } else if (localStorage.hasOwnProperty("secondSplashPage")) {
      navigatePages("./splashPage/tridPage");
    } else if (localStorage.hasOwnProperty("firstSplashPage")) {
      navigatePages("./splashPage/secondPage");
    } else if (localStorage.hasOwnProperty("wellcomePage")) {
      navigatePages("./splashPage/firstPage");
    }else{
        navigatePages("wellcome");
    }
  }, 2500);
});
