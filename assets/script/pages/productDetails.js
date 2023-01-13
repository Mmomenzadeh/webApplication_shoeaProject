const BASE_URL = "http://localhost:3000";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("productId");
// const productId = queryString.split('=')[1]
const slideshowContainer = document.querySelector(".slideshow-container");
let slideIndex = 1;
let productDesc = "";
let descFlag = true;
let productQuantity;
let buyQuantity = 1;
let productPrice = 0;

let cart =[];



const getProductDetails = async () => {
  try {
    const request = await axios.get(`${BASE_URL}/products/${productId}`);
    const productData = request.data;
    displayProductDetails(productData);
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'))
    }
  } catch (error) {
    console.log(error);
    Toastify({
      text: "Product is not found!",

      duration: 3000,
    }).showToast();
  }
};
if (productId !== null) {
  getProductDetails();
} else {
  Toastify({
    text: "Product is not found!",

    duration: 3000,
  }).showToast();
}

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

function showSlides(n) {
  slideshowContainer.innerHTML += `
  <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
  <a class="next" onclick="plusSlides(1)">&#10095;</a>
  `;
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}

const displayProductDetails = (productData) => {
  showSlider(productData.images);
  Quantity(productData.quantity);
  ///default price and quantity
  productPrice = productData.price;
  document.getElementById("totalPrice").innerText = `$ ${
    +productPrice * +buyQuantity
  }`;
  document.getElementById("quantityNumber").innerText = buyQuantity;
  ////

  document.getElementById("productName").innerHTML = `${productData.name}`;
  productDesc = productData.description;
  document.getElementById(
    "productDesc"
  ).innerHTML = `${productData.description.substring(0, 260)}`;

  productData.size.map((size) => {
    document.querySelector(
      ".productSize"
    ).innerHTML += `<div class="size flex j-c a-c" onclick="setOption('size',this)" >${size}</div>`;
  });

  productData.colors.map((color) => {
    document.querySelector(
      ".productColor"
    ).innerHTML += `<div class="color flex j-c a-c" style="background-color: ${color};" onclick="setOption('color',this)"></div>`;
  });
};
const showSlider = (productImages) => {
  productImages.map((image) => {
    slideshowContainer.innerHTML += `
    <div class="mySlides fade">
        <img src="../${image}"  />
      </div>
    `;
  });
  setTimeout(() => {
    showSlides(slideIndex);
  }, 10);
};

const goBack = () => {
  window.history.back();
};

const showFullDesc = () => {
  if (descFlag) {
    document.getElementById("productDesc").innerHTML = productDesc;
    document.getElementById("viewMore").innerHTML = "Close";
    // descFlag = false
  } else {
    document.getElementById("productDesc").innerHTML = productDesc.substring(
      0,
      260
    );
    document.getElementById("viewMore").innerHTML = "View More";
    // descFlag = true
  }

  descFlag = !descFlag;
};

const Quantity = (quantity) => {
  productQuantity = quantity;
  if (quantity === 0) {
    document.getElementById("quantityBox").style.display = "none";
    document.getElementById("addToCart").style.display = "none";
  }
};

const changeQuantity = (op) => {
  if (op === "+") {
    if (buyQuantity < productQuantity) {
      buyQuantity++;
      document.getElementById("quantityNumber").innerText = buyQuantity;
      document.getElementById("totalPrice").innerText = `$ ${
        +productPrice * +buyQuantity
      }`;
    }
  } else {
    if (buyQuantity > 1 && productQuantity !== 0) {
      buyQuantity--;
      document.getElementById("quantityNumber").innerText = buyQuantity;
      document.getElementById("totalPrice").innerText = `$ ${
        +productPrice * +buyQuantity
      }`;
    }
  }
};

const setOption = (type, e) => {
  if (type === "size") {
    [...document.querySelectorAll(".size")].map((sizeElement) => {
      sizeElement.classList.remove('selectSize')
    });
    e.classList.add('selectSize')
  }else{
    [...document.querySelectorAll('.color')].map(colorElement =>{
      colorElement.classList.remove('selectColor')
    })
    e.classList.add('selectColor')
  }
};

const addToCart = ()=>{
 
  let productSize = document.querySelector('.selectSize').innerHTML;
  let productColor =window.getComputedStyle(document.querySelector('.selectColor')).backgroundColor
  if (cart.length >0) {
    let temp =JSON.parse( localStorage.getItem('cart'))
    let tempCheck = temp.find(id =>{id === productId})
    if (tempCheck) {
      temp.map(item =>{

      })
    }else{
      cart.push({
        id : productId,
        size : productSize,
        color : productColor,
        quantity : buyQuantity,
        totalPrice : (+productPrice * +buyQuantity)
      })
      localStorage.setItem('cart',JSON.stringify(cart))

    }
 
  }else{
    localStorage.setItem('cart',JSON.stringify([{
      id : productId,
      size : productSize,
      color : productColor,
      quantity : buyQuantity,
      totalPrice : (+productPrice * +buyQuantity)
    }]))
  }

}