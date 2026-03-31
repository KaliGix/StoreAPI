const searchProducts = document.getElementById("find-product");
const productList = document.querySelector(".container-products");
const magnifyingGlass = document.querySelector("#magnifying_glass");
const userAccount = document.querySelector(".account-user");
const shoppingCart = document.querySelector(".account-cart");
const loadingText = document.querySelector(".load-data");
const errorMessage = document.querySelector(".error-message");

searchProducts.addEventListener("keyup", searchItem);

renderData("");

async function fethAPI() {
  const url = new Request("https://fakestoreapi.com/products");
  try {
    showLoadingText("flex");
    const response = await fetch(url);

    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      showErrorMessage("Network error: check your interenet connection");
    } else showErrorMessage("Application error: ", error.message);
  }
}

function showLoadingText(displayType) {
  errorMessage.style.display = "none";
  loadingText.style.display = displayType;
}

function showErrorMessage(error) {
  errorMessage.style.display = "flex";
  errorMessage.textContent = error;
  loadingText.style.display = "none";
}

async function renderData(query) {
  let data = await fethAPI();
  productList.innerHtml = "";

  if (query !== "") {
    data = data.filter((item) => {
      return item.title.toLowerCase().trim().includes(query);
    });
  }

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

async function searchItem(keyboardEvent) {
  let query = searchProducts.value.toLowerCase().trim();
  await renderData(query);
}
