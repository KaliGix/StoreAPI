const searchProducts = document.getElementById("find-product");
const productList = document.querySelector(".container-products");
const magnifyingGlass = document.querySelector("#magnifying_glass");
const userAccount = document.querySelector(".account-user");
const shoppingCart = document.querySelector(".account-cart");
const loadingText = document.querySelector(".load-data");
const errorMessage = document.querySelector(".error-message");

searchProducts.addEventListener("keyup", searchItem);

productList.addEventListener('click', (event) => {
    if(event.target.classList.contains("card") || event.target.classList.contains("image-product"))
    {
      console.log("Card is calling");
    }
});
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
    
    if(error instanceof TypeError){
      showErrorMessage("Network error: check your interenet connection");
    } else
      showErrorMessage("Application error: ", error.message);
  }
}

function showLoadingText(displayType){
  errorMessage.style.display = "none";
  loadingText.style.display = displayType;
}

function showErrorMessage(error){
  errorMessage.style.display = "flex";
  errorMessage.textContent = error;
  loadingText.style.display = "none";
}



async function renderData(query) {
  let data = await fethAPI();
  productList.innerHtml = "";
  
  if (query!=="") {
    data = data.filter(item => {
      return item.title.toLowerCase().trim().includes(query);
    });
  }

  productList.innerHTML = data
    .map(
      (item) =>
        `<div class="card">
            <img src="${item.image}" class="image-product" alt="image">
            <p>${item.title}</p>
            <p class="price">${item.price}$</p>
            <p class="rating">${item.rating.rate}  ${item.rating.count}</p>
            <button type="button" class="btn">Add to cart</button>
        </div>`,
    )
    .join("");

    showLoadingText("none");
}

async function searchItem(keyboardEvent) {
  let query = searchProducts.value.toLowerCase().trim();
  await renderData(query);
}
