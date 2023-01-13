const navigatePages = (target) => {
    window.location.href = `./${target}.html`;
  };

if (localStorage.hasOwnProperty("secondSplashPage")) {
    navigatePages('tridPage')
    
}else{
    localStorage.setItem('secondSplashPage',true)
}

