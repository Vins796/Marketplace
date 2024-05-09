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
  async function createProduct(getName, getDescription, getBrand, getImageUrl, getPrice) {

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
      alert('Prodotto caricato con successo!');
    }
  }


  // Funzione per la creazione della struttura della card
  function showProduct(products) {
    containerCards.innerHTML = '';
    console.log(products);
    products.forEach(prod => {
      
      // Creo il div della card del prodotto
      const card = document.createElement("div");
      card.className = "product-card col flex-column me-4"; // Applico CSS
    
      // Creo gli elementi che popoleranno la card
      const image = creaElementoConImg("img", prod.imageUrl);
      image.className = 'product-card-img';
      const name = creaElementoConTesto("h3", prod.name);
      const description = creaElementoConTesto("p", prod.description);
      const brand = creaElementoConTesto("span", prod.brand);
      brand.className = 'me-3';
      const price = creaElementoConTesto("span", prod.price);

      //BOTTONI
      const buttonContainer = document.createElement('div')
      buttonContainer.className = 'd-flex gap-2 mt-3'
      const buttonUpdate = document.createElement('button');
      buttonUpdate.textContent = "Modifica";
      buttonUpdate.className = 'btn btn-secondary w-50 mx-auto';
      buttonUpdate.onclick = () => updateProduct(prod.id);
      const buttonDelete = document.createElement('button');
      buttonDelete.textContent = "Delete";
      buttonDelete.className = 'btn btn-danger w-50 mx-auto';
      buttonDelete.onclick = () => updateProduct(prod.id);
  
      // Aggiungo gli elementi creati alla card
      card.appendChild(image);
      card.appendChild(name);
      card.appendChild(description);
      card.appendChild(brand);
      card.appendChild(price);

      buttonContainer.appendChild(buttonUpdate);
      buttonContainer.appendChild(buttonDelete);


      card.appendChild(buttonContainer);
      
    
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


  // Funzione per aggiornare un prodotto
  const updateProduct = async (productId) => {
  // Recupera i valori inseriti dall'utente nel form
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const brand = document.getElementById('brand').value;
  const imageUrl = document.getElementById('image').value;
  const price = document.getElementById('price').value;
  // Crea un nuovo oggetto prodotto con i nuovi dati
  const updatedProduct = { name, description, brand, imageUrl, price };

  // Invia una richiesta PUT all'API per aggiornare il prodotto richiesto
  // L'uso di await è necessario per attendere che la richiesta venga completata
  const res = await fetch(url + productId, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updatedProduct),
  });

  // Se la richiesta ha avuto successo
  if (res.ok) {
      // Mostra un messaggio di conferma
      alert('Prodotto aggiornato con successo!');
      // Chiama la funzione ottieniProdotti per aggiornare la lista dei prodotti
      await ottieniProdotti();
  }
}

// Funzione per mostrare i prodotti
function showProduct(products) {
  containerCards.innerHTML = '';
  products.forEach(prod => {
    
      // Creazione della card del prodotto
      const card = document.createElement("div");
      card.className = "product-card col flex-column me-4"; // Applica CSS
  
      // Creazione degli elementi per la card
      const image = creaElementoConImg("img", prod.imageUrl);
      image.className = 'product-card-img';
      const name = creaElementoConTesto("h3", prod.name);
      const description = creaElementoConTesto("p", prod.description);
      const brand = creaElementoConTesto("span", prod.brand);
      brand.className = 'me-3';
      const price = creaElementoConTesto("span", prod.price);

      // Creazione dei bottoni
      const buttonContainer = document.createElement('div')
      buttonContainer.className = 'd-flex gap-2 mt-3'
      const buttonUpdate = document.createElement('button');
      buttonUpdate.textContent = "Modifica";
      buttonUpdate.className = 'btn btn-secondary w-50 mx-auto';
      buttonUpdate.onclick = () => updateProduct(prod._id); // Passa l'ID del prodotto
      const buttonDelete = document.createElement('button');
      buttonDelete.textContent = "Delete";
      buttonDelete.className = 'btn btn-danger w-50 mx-auto';
      buttonDelete.onclick = () => deleteProduct(prod._id); // Passa l'ID del prodotto

      // Aggiunge gli elementi alla card
      card.appendChild(image);
      card.appendChild(name);
      card.appendChild(description);
      card.appendChild(brand);
      card.appendChild(price);

      buttonContainer.appendChild(buttonUpdate);
      buttonContainer.appendChild(buttonDelete);
      card.appendChild(buttonContainer);
    
      // Aggiunge la card al contenitore dei prodotti
      containerCards.appendChild(card);
  });
}



  form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Previene il comportamento di default del form
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const brand = document.getElementById('brand').value;
    const imageUrl = document.getElementById('image').value;
    const price = document.getElementById('price').value;
    const createdProduct = await createProduct(name, description, brand, imageUrl, price);
    // console.log('Elemento creato:', createdProduct);

    
    ottieniProdotti(); // Aggiorno la lista degli elementi
    form.reset();
  });

  ottieniProdotti(); // Carico gli elementi esistenti all'avvio
})





































  