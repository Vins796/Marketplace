// Puntatori
const url = 'https://striveschool-api.herokuapp.com/api/product/';
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhMTI5MjBiM2IyNTAwMTUxYjU0MmEiLCJpYXQiOjE3MTUwODE4NzQsImV4cCI6MTcxNjI5MTQ3NH0.oP8Ej3O1hpVz1etqFQzMYlKihyM4c_VL5E6hCYdAYAI';


// Funzione per ottenere prodotti
function obtainProducts() {
    fetch(url, {
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
    })
      .then((response) => response.json())
      .then((products) => {
        // Itero attraverso la lista di prodotti
        products.forEach((product) => creaProdotto(product));
      })
      // Gestisco l'errore
      .catch((error) => console.error("Errore:", error));
}