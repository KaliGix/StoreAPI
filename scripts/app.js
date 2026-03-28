const searchProducts = document.getElementById("find-product");
const productList = document.querySelector(".container-products");
const magnifyingGlass = document.querySelector("#magnifying_glass");
const userAccount = document.querySelector(".account-user");
const shoppingCart = document.querySelector(".account-cart");

searchProducts.addEventListener("keyup", searchItem);

renderData("");

async function fethAPI() {
  const url = new Request("https://fakestoreapi.com/products");
  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    const data = await response.json();

    return data;
  } catch (error) {
    
    if(error instanceof TypeError){
      console.log("Network error: check your interenet connection");
    } else
      console.log("Application error: ", error.message);
  }
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
            <img src="${item.image}" alt="image">
            <p>${item.title}</p>
            <p>${item.price}</p>
            <p>${item.rating.rate}</p>
            <p>${item.rating.count}</p>
        </div>`,
    )
    .join("");
}

async function searchItem(keyboardEvent) {
  let query = searchProducts.value.toLowerCase().trim();
  await renderData(query);
}
