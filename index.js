// Puntatori
const url = 'https://striveschool-api.herokuapp.com/api/product/';
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNiYTQwNWIxYzc3ZjAwMTUwNjgzZWMiLCJpYXQiOjE3MTUxODQ2NDUsImV4cCI6MTcxNjM5NDI0NX0.sXShtyZXMpQO7jCPkI6kklxE5ib3BiXQL-QAMCfIgmU';

// Funzione per ottenere prodotti
async function fetchItems() {

    const response = await fetch(url,{ 
    headers: {
        Authorization: `Bearer ${apiKey}`
    } 
    });

    const products = await response.json(); // Converte la risposta in JSON
    console.log(products);
    return products; // Restituisce l'elenco dei prodotti
}