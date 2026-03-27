const searchProducts = document.getElementById("find-product");
const productList = document.querySelector(".container-products");
const magnifyingGlass = document.querySelector("#magnifying_glass");
const userAccount = document.querySelector(".account-user");
const shoppingCart = document.querySelector(".account-cart");


async function fethAPI(){
    const url = new Request("https://fakestoreapi.com/products");
    try {
         const response = await fetch(url);

         if(!response.ok)
            throw new Error(`Response Status: ${response.status}`);


         const data = await response.json();
         console.log(data);

         return data;
    } catch (error) {
        console.error(error.message);
    }
   return {};
}

async function renderData(){

    const data = await  fethAPI();
    productList.innerHtml = "";
    let html = "";
    

       productList.innerHTML = data.map((item) =>
          `<div class="card">
            <img src="${item.image}" alt="image">
            <p>${item.title}</p>
            <p>${item.price}</p>
            <p>${item.rating.rate}</p>
            <p>${item.rating.count}</p>
        </div>`
        ).join("");
    }

renderData();




