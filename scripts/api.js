// api.js

export var errorMessage = "";
export async function fethAPI() {
  const url = new Request("https://dummyjson.com/products");
  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      errorMessage = "Network error: check your internet connection";
    } else ((errorMessage = "Application error: "), error.message);
  }
}
