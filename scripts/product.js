import { fethAPI } from "./api.js";

const producList = document.querySelector(".container-products");
const findProduct = document.querySelector("#find-product");
const loadingText = document.querySelector(".load-data");
const errMessage = document.querySelector(".error-message");
const params = new URLSearchParams(window.location.search);

findProduct.addEventListener("keyup", searchProduct);

async function init() {
  try {
    showLoadingText("flex");
    const data = await fethAPI();
    return data;
  } catch (error) {
    showErrorMessage(errorMessage);
  }
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

const product = {
  id: params.get("id"),
  title: params.get("title"),
  description: params.get("description"),
  price: params.get("price"),
  urlImage: params.get("urlImage"),
  ratingRate: params.get("ratingRate"),
  ratingCount: params.get("ratingCount"),
};

function searchProduct(event) {
  const query = findProduct.value.toLowerCase().trim();
  renderData(query);
}

async function renderData(query) {
  let data = await init();
  productList.innerHtml = "";

  if (query !== "") {
    data = data.filter((item) => {
      return item.title.toLowerCase().trim().includes(query);
    });
  }

  console.log("THE RETURNED DATA: ", data);

  productList.innerHTML = data
    .map(
      (item) =>
        `<div class="card">
        <a href="product.htm?id=${item.id}&title=${item.title}&description=${item.description}&price=${item.price}&ratingRate=${item.rating.rate}
        &ratingCount=${item.rating.count}&urlImage=${item.image}">
            <div class="product-image">
              
                  <img src="${item.image}"  alt="image">
              
              </div>

              <div class="product-info">
                
                    <h6>${item.title}</h6>
                    <p data-id="${item.id}"></p>
                    <p class="price">${item.price}$</p>
                    <p class="rating">${item.rating.rate} / 5 <span class="star">★</span>  ${item.rating.count} reviews</p>
                
                  <button type="button" class="btn">Add to cart</button>
              </div>
          </a>
        </div>`,
    )
    .join("");

  showLoadingText("none");
}

function renderItemSelected() {
  producList.innerHTML = `<div class="card">
            <div class="product-image">
                  <img src="${product.urlImage}"  alt="image">
              </div>

              <div class="product-info">
                
                 <h6>${product.title}</h6>
                 <p data-id="${product.id}"></p>
                 <p class="description">${product.description}</p>
                 <p class="price">${product.price}$</p>
                 <p class="rating">${product.ratingRate} / 5 <span class="star">★</span>  ${product.ratingCount} reviews</p>
                
                 <button type="button" class="btn">Add to cart</button>
              </div>
            </div>`;
}

renderItemSelected();
