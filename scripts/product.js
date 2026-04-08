import { fethAPI, errorMessage } from "./api.js";

const productList = document.querySelector(".container-products");
const findProduct = document.querySelector("#find-product");
const resultsContainer = document.getElementById("resultsContainer");
const loadingText = document.querySelector(".load-data");
const errMessage = document.querySelector(".error-message");
const params = new URLSearchParams(window.location.search);

findProduct.addEventListener("input", searchProduct);

let productsData = [];

async function init() {
  try {
    showLoadingText("flex");
    const data = await fethAPI();
    productsData = data;
    
  } catch (error) {
    showErrorMessage(errorMessage);
  }
}

init();

function showLoadingText(displayType) {
  errMessage.style.display = "none";
  loadingText.style.display = displayType;
}

function showErrorMessage(error) {
  errMessage.style.display = "flex";
  errMessage.textContent = error;
  loadingText.style.display = "none";
}

//new code
function searchProduct(event) {
  const query = findProduct.value.toLowerCase().trim();

  if (!query) {
    resultsContainer.classList.add("hidden");
    return;
  }

  try {
    const data =  productsData || [];

    console.log(data);
    console.log(query);

    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(query)
    );

    console.log("filtered data:", filtered);
    renderResults(filtered);
  } catch (error) {
    console.error(error);
  }
}

//new code
function renderResults(items) {

  console.log("rendering results:", items);
  if (items.length === 0) {
    resultsContainer.innerHTML = `<div class="result-item">No results</div>`;
    console.log("No results found");
  } else {
    resultsContainer.innerHTML = items
      .map((item) => `<div class="result-item">${item.title}</div>`)
      .join("");

      console.log("Results rendered successfully");
  }

  resultsContainer.classList.remove("hidden");
}

function renderItemSelected() {
  productList.innerHTML = `<div class="card">
            <div class="product-image">
                  <img src="${params.get("urlImage")}"  alt="image">
              </div>

              <div class="product-info">
                
                 <h6>${params.get("title")}</h6>
                 <p data-id="${params.get("id")}"></p>
                 <p class="description">${params.get("description")}</p>
                 <p class="price">${params.get("price")}$</p>
                 <p class="rating">${params.get("ratingRate")} / 5 <span class="star">★</span>  ${params.get("ratingCount")} reviews</p>
                
                 <button type="button" class="btn">Add to cart</button>
              </div>
            </div>`;
}

renderItemSelected();
