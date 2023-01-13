const navigatePages = (target)=>{
window.location.href = `./pages/${target}.html`
}


document.addEventListener("DOMContentLoaded",()=>{navigatePages('loadingPage')})