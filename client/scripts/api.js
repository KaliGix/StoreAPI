// api.js

export async function fetchAPI() {
  try {
    const response = await fetch("/api/products");

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
  
}

// export async function searchAPI(query) {
//   const res = await fetch(`/api/search?q=${query}`);
//   return await res.json();
// }
