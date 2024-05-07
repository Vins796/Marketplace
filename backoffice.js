let param = new URLSearchParams(window.location.search)
let idProduct = param.get("id");

const containerCards = document.getElementById('containerCards');
const form = document.getElementById("product-form");

const url = 'https://www.google.com/url?q=https://striveschool-api.herokuapp.com/api/product/';
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhMTI5MjBiM2IyNTAwMTUxYjU0MmEiLCJpYXQiOjE3MTUwODE4NzQsImV4cCI6MTcxNjI5MTQ3NH0.oP8Ej3O1hpVz1etqFQzMYlKihyM4c_VL5E6hCYdAYAI';


// Funzione per creare il prodotto
function creaProdotto() {

  // Valori di Input
  const nomeDaForm = document.getElementById("name").value;
  const descriptionDaForm = document.getElementById("description").value;
  const brandDaForm = document.getElementById("brand").value;
  const imageDaForm = document.getElementById("image").value;
  const priceDaForm = document.getElementById("price").value;

  // Creo l'oggetto prodotto
  const prodotto = {
    name: nomeDaForm,
    description: descriptionDaForm,
    brand: brandDaForm,
    imageUrl: imageDaForm,
    price: priceDaForm
  }
    // Invio una richiesta POST per creare un nuovo prodotto sul server
    fetch(url, {
      method: "POST", // Metodo HTTP POST per l'invio dei dati
      headers: {
        Authorization: `Bearer ${apiKey}`, // Inserisco la mia key di autorizzazione
        "Content-Type": "application/json", // Imposto il tipo di contenuto a JSON
      },
      body: JSON.stringify(prodotto), // Converto l'oggetto utente in una stringa JSON e lo invio
    })
      // Converto la risposta del server in un formato JSON 
      .then((response) => response.json())
      .then((newProduct) => {
        createCardProdotto(newProduct);
      })
      // Gestisco l'errore nel caso non andasse a buon fine la richiesta HTTP
      .catch((error) => console.error("Errore:", error));
}

// Funzione per la creazione della struttura della card
function createCardProdotto(product) {
    // Creo il div della card del prodotto
    const card = document.createElement("div");
    card.className = "product-card"; // Applico CSS
  
    // Creo gli elementi che popoleranno la card
    const image = creaElementoConImg("img", product.imageUrl);
    const name = creaElementoConTesto("h3", product.name);
    const description = creaElementoConTesto("p", product.description);
    const brand = creaElementoConTesto("span", product.brand);
    const price = creaElementoConTesto("span", product.price);

    // Aggiungo gli elementi creati alla card
    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(description);
    card.appendChild(brand);
    card.appendChild(price);
  
    // Aggiungo la card al contenitore dei prodotti
    containerCards.appendChild(card);
}

// Creo le funzioni che andranno a modificare il contenuto della card
function creaElementoConTesto(tipoDiTag, testo) {
  const tag = document.createElement(tipoDiTag);
  tag.textContent = testo;
  return tag;
}
function creaElementoConImg(tipoDiTag, testo) {
  const tag = document.createElement(tipoDiTag);
  tag.textContent = testo;
  return tag;
}


form.addEventListener('submit', (event) => {
  event.preventDefault();

  creaProdotto();
})


  