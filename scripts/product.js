import { fethAPI, errorMessage } from "./api.js";

const productList = document.querySelector(".container-products");
const findProduct = document.querySelector("#find-product");
const resultsContainer = document.getElementById("resultsContainer");
const loadingText = document.querySelector(".load-data");
const errMessage = document.querySelector(".error-message");
const params = new URLSearchParams(window.location.search);

findProduct.addEventListener("input", searchProduct);


resultsContainer.addEventListener("click", (event) => {
  
  if(event.target.classList.contains("result-item")) {
  
    const selectedItem = event.target.textContent;
    const selectedProduct = productsData.find(product => product.title === selectedItem);
    renderItemSelected(selectedProduct);
    hideSearchResults();
  }
});


document.addEventListener("click", (event) => {

  if(!resultsContainer.contains(event.target))
    hideSearchResults();
});

let productsData = [];


let productInfo = {id: params.get("id"), title: params.get("title"), description: params.get("description"), price: params.get("price"), thumbnail: params.get("thumbnail"),
  rating: params.get("ratingRate"), reviews: params.get("ratingCount")};

  

async function init() {
  try {
    showLoadingText("flex");
    const data = await fethAPI();
    productsData = data.products;
 
    showLoadingText("none");
  } catch (error) {
    showErrorMessage(errorMessage);
  }
}

init();
renderItemSelected(productInfo);



function hideSearchResults() {
  resultsContainer.classList.add("hidden");
  findProduct.value = "";
}

function showLoadingText(displayType) {
  errMessage.style.display = "none";
  loadingText.style.display = displayType;
}

function showErrorMessage(error) {
  errMessage.style.display = "flex";
  errMessage.textContent = error;
  loadingText.style.display = "none";
}


function searchProduct(event) {
  const query = findProduct.value.toLowerCase().trim();

  if (!query) {
    resultsContainer.classList.add("hidden");
    return;
  }

  try {
    const data = productsData || [];
   
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(query),
    );

    renderResults(filtered);
  } catch (error) {
    console.error(error);
  }
}

function renderResults(items) {
  if (items.length === 0) {
    resultsContainer.innerHTML = `<div class="result-item">No results</div>`;
  } else {
    resultsContainer.innerHTML = items
      .map((item) => `<div class="result-item">${item.title}</div>`)
      .join("");
  }

  resultsContainer.classList.remove("hidden");
}

function renderItemSelected(productInfo) { 

  productList.innerHTML = "";
  productList.innerHTML = `<div class="card">
            <div class="product-image">
                  <img src="${productInfo.thumbnail}"  alt="image">
              </div>

              <div class="product-info">
                
                 <h6 class="product-title">${productInfo.title}</h6>
                 <p data-id="${productInfo.id}"></p>
                 <p class="description">${productInfo.description}</p>
                 <p class="price">${productInfo.price}$</p>
                 <p class="rating">${productInfo.rating} / 5 <span class="star">★</span>  ${productInfo.reviews.length} reviews</p>
                
                 <button type="button" class="btn">Add to cart</button>
              </div>
            </div>`;
}

