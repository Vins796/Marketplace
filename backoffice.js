const url = 'https://striveschool-api.herokuapp.com/api/product/';
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNiYTQwNWIxYzc3ZjAwMTUwNjgzZWMiLCJpYXQiOjE3MTUxODQ2NDUsImV4cCI6MTcxNjM5NDI0NX0.sXShtyZXMpQO7jCPkI6kklxE5ib3BiXQL-QAMCfIgmU';


document.addEventListener('DOMContentLoaded', function() {

  const form = document.getElementById("product-form"); // puntatore del form
  const containerCards = document.getElementById('containerCards'); // puntatore del container dove stamperò i prodotti

  // Creo la funzione per la chiamata con metodo GET
  async function ottieniProdotti() {
    // faccio la chiamata all'endpoint
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}` // inserisco il token per l'autorizzazione
      }
    });
    // converto la risposta in un file JSON
    const product = await response.json();
    // TODO RICHIAMARE FUNZIONE PER MOSTRARE I PRODOTTI
    showProduct(product);
  }


  // Creo la funzione per creare l'oggetto
  
  async function createProduct(getName, getDescription, getBrand, getImageUrl, getPrice ) {

    const newItem = {
      name: getName, 
      description: getDescription, 
      brand: getBrand, 
      imageUrl: getImageUrl, 
      price: getPrice
    };
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`, // inserisco il token per l'autorizzazione
        'Content-Type': "application/json"
      },
      body: JSON.stringify(newItem),
    });
    if (response.ok) {
      alert('caricato');
    }
  }


  // Funzione per la creazione della struttura della card
  function showProduct(products) {
    containerCards.innerHTML = '';
    console.log(products);
    products.forEach(prod => {
      
      // Creo il div della card del prodotto
      const card = document.createElement("div");
      card.className = "product-card col"; // Applico CSS
    
      // Creo gli elementi che popoleranno la card
      const image = creaElementoConImg("img", prod.imageUrl);
      const name = creaElementoConTesto("h3", prod.name);
      const description = creaElementoConTesto("p", prod.description);
      const brand = creaElementoConTesto("span", prod.brand);
      const price = creaElementoConTesto("span", prod.price);
  
      // Aggiungo gli elementi creati alla card
      card.appendChild(image);
      card.appendChild(name);
      card.appendChild(description);
      card.appendChild(brand);
      card.appendChild(price);
    
      // Aggiungo la card al contenitore dei prodotti
      containerCards.appendChild(card);
    });
  }


  // Creo le funzioni che andranno a modificare il contenuto della card
  function creaElementoConTesto(tipoDiTag, testo) {
    const tag = document.createElement(tipoDiTag);
    tag.textContent = testo;
    return tag;
  }

  function creaElementoConImg(tipoDiTag, testo) {
    const tag = document.createElement(tipoDiTag);
    tag.src = testo;
    return tag;
  }


  form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Previene il comportamento di default del form
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const brand = document.getElementById('brand').value;
    const imageUrl = document.getElementById('image').value;
    const price = document.getElementById('price').value;
    const createdProduct = await createProduct(name, description, brand, imageUrl, price);
    console.log('Elemento creato:', createdProduct);

    
    ottieniProdotti(); // Aggiorno la lista degli elementi
    form.reset();
  });

  ottieniProdotti(); // Carico gli elementi esistenti all'avvio
})





































  