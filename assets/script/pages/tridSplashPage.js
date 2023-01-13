const navigatePages = (target) =>{
    window.location.href =`./${target}.html`
}


if (localStorage.hasOwnProperty('tridSplashPage')) {
navigatePages('../Home')
    
}else{
    localStorage.setItem('tridSplashPage',true)
}