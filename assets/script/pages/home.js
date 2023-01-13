const BASE_URL = "http://localhost:3000";
const brandsDiv = document.getElementById("brands");
const productsDiv = document.getElementById("products");

const getAllBrands = async () => {
  try {
    const request = await axios.get(`${BASE_URL}/brands`);
    const Brandsdata = request.data;
    if (Brandsdata.length > 0) {
      displayBrands(Brandsdata);
    }
  } catch (error) {
    console.log(error);
  }
};

const displayBrands = (Brandsdata) => {
  Brandsdata.map((brand) => {
    brandsDiv.innerHTML += `
        
        <div class="brand flex col a-c j-c" onclick="goToCategoryPage(${brand.id})">
        <div class ="brand-imgBox flex a-c j-c"><img src="../${brand.image}" alt="${brand.name}"></div>
        <p>${brand.name}</p>
        </div>
    
        `;
  });
};

const goToCategoryPage = (brandId) => {
  window.location.href = `./productDetails.html?brandId${brandId} `;
};

const getAllProducts = async () => {
  try {
    const request = await axios.get(`${BASE_URL}/products`);
    const productsData = request.data;
    if (productsData.length > 0) {
      displayProducts(productsData);
    }
  } catch (error) {
    console.log(error);
  }
};

const displayProducts = (productsData) => {
  productsData.map((product) => {
    productsDiv.innerHTML += `
        <div class="homePage_products-list_product flex col gap10" onclick="goToPageDetails(${
          product.id
        })">
                <div class="product-img flex j-c a-c">
                    <img src="../${
                      product.images[0]
                    }" alt="${product.name.substring(0, 7)}">
                </div>
                <p class ="product-name">${product.name.substring(0, 15)}...</p>
                <p class ="product-price">$ ${product.price}</p>
            </div>
    `;
  });
};
const navigatePage = (page) => {
  window.location.href = `${page}`;
};

const goToPageDetails = (productId) => {
  window.location.href = `./productDetails.html?productId=${productId}`;
};
getAllProducts();
getAllBrands();
