// Puntatore URL
const url = 'https://striveschool-api.herokuapp.com/api/product/';
// Puntatore apiKey
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNiYTQwNWIxYzc3ZjAwMTUwNjgzZWMiLCJpYXQiOjE3MTUxODQ2NDUsImV4cCI6MTcxNjM5NDI0NX0.sXShtyZXMpQO7jCPkI6kklxE5ib3BiXQL-QAMCfIgmU';


document.addEventListener('DOMContentLoaded', function() {

  const form = document.getElementById("product-form"); // Puntatore del form
  const containerCards = document.getElementById('containerCards'); // Puntatore del container dove stamperò i prodotti

  // Creo la funzione per la chiamata con metodo GET
  async function ottieniProdotti() {
    // Effettuo la chiamata all'endpoint
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}` // Inserisco il token per l'autorizzazione
      }
    });
    // Converto la risposta in un file JSON
    const product = await response.json();
    console.log(product);
    showProduct(product);
  }


  // Funzione per creare l'oggetto  
  async function createProduct(getName, getDescription, getBrand, getImageUrl, getPrice) {

    // Mi creo il mio oggetto passandogli i parametri della funzione
    const newProduct = {
      name: getName, 
      description: getDescription, 
      brand: getBrand, 
      imageUrl: getImageUrl, 
      price: getPrice
    };
    // Effettuo la chimata HTTP
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`, // inserisco il token per l'autorizzazione
        'Content-Type': "application/json"
      },
      body: JSON.stringify(newProduct), // gli passo come elemento il nuovo prodotto creato
    });
    // Se la risposta è andata a buon fine esegui questa operazione
    if (response.ok) {
      alert('Prodotto caricato con successo!');
    }
  }
  // Fine funzione per creare l'oggetto


  // Funzione per la creazione della struttura della card
  function showProduct(products) {
    containerCards.innerHTML = '';
    containerCards.className = 'mt-5 row row-gap-5';
    console.log(products);
    products.forEach(prod => {
      
      // Creo il div della card del prodotto
      const card = document.createElement("div");
      card.className = "product-card me-4"; // Applico CSS
    
      // Creo gli elementi che popoleranno la card
      const image = creaElementoConImg("img", prod.imageUrl);
      image.className = 'product-card-img';
      const name = creaElementoConTesto("h3", prod.name);
      const description = creaElementoConTesto("p", prod.description);
      const brand = creaElementoConTesto("span", prod.brand);
      brand.className = 'me-3';
      const price = creaElementoConTesto("span", prod.price);
      console.log(prod.id);

      // Creo e stilizzo il contenitore dei bottoni
      const buttonContainer = document.createElement('div')
      buttonContainer.className = 'd-flex gap-2 mt-3'

      // Creo e stilizzo il bottone Update
      const buttonUpdate = document.createElement('button');
      buttonUpdate.textContent = "Modifica";
      buttonUpdate.className = 'btn btn-secondary w-50 mx-auto';
      buttonUpdate.onclick = () => updateProduct(prod.id); // Aggiungo la funzione onclick al bottone

      // Creo e stilizzo il bottone Delete
      const buttonDelete = document.createElement('button');
      buttonDelete.textContent = "Delete";
      buttonDelete.className = 'btn btn-danger w-50 mx-auto';
      buttonDelete.onclick = () => deleteProduct(prod.id); // Aggiungo la funzione onclick al bottone
  
      // Aggiungo gli elementi creati alla card
      card.appendChild(image);
      card.appendChild(name);
      card.appendChild(description);
      card.appendChild(brand);
      card.appendChild(price);

      // Appendo i bottoni al loro contenitore 
      buttonContainer.appendChild(buttonUpdate);
      buttonContainer.appendChild(buttonDelete);

      // al click sulla card ci spostiamo nella pagina html specifica tramite il numero asin
      card.onclick = () => (window.location = `product-detail.html?id=${prod._id}`);

      card.appendChild(buttonContainer);

      
    
      // Aggiungo la card al contenitore dei prodotti
      containerCards.appendChild(card);
    });
  }
  // Fine funzione per la creazione della struttura della card


  // Creazione delle funzioni che andranno a modificare il contenuto della card
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
  // Fine creazione delle funzioni che andranno a modificare il contenuto della card


  // Funzione per aggiornare un prodotto
  // Passo come parametro l'ID per utilizzarlo in seguito
  const updateProduct = async (id) => {
  // Recupera i valori inseriti dall'utente nel form
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const brand = document.getElementById('brand').value;
  const imageUrl = document.getElementById('image').value;
  const price = document.getElementById('price').value;
  // Crea un nuovo oggetto prodotto con i nuovi dati
  const updatedProduct = {name, description, brand, imageUrl, price};

  // Effettuo la chimata HTTP passando anche come paramtro l'ID
  const res = await fetch(url + id, {
      method: "PUT", // Utilizzo il metodo PUT per modificare l'elemento 
      headers: { 
        "content-type": "application/json",
        'Authorization': `Bearer ${apiKey}`
      },
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
  // Fine funzione per aggiornare un prodotto


  // Funzione per eliminare un prodotto
  const deleteProduct = async (id) => {
    // Effettuo la chimata HTTP passando anche come paramtro l'ID
    const res = await fetch (url + id, {
      method: "DELETE", // Utilizzo il metodo DELETE per rimuovere l'elemento 
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    })
    // Se la risposta va a buon fine esegue queste operazioni
    if (res.ok) {
      // Mostra un messaggio di conferma
      alert('Prodotto eliminato con successo!');
      // Chiama la funzione ottieniProdotti per aggiornare la lista dei prodotti
      await ottieniProdotti();
    } else {
      console.error("Errore nell'eliminazione del prodotto");
    }
  }
  // Fine funzione per eliminare un prodotto

  // Funzione per mostrare i prodotti
  function showProduct(products) {
    // Mi occupo della pulizia del contenitore
    containerCards.innerHTML = '';
    products.forEach(prod => {
      
      // Creazione della card del prodotto
      const card = document.createElement("div");
      card.className = "product-card col flex-column me-4"; // Applica CSS
  
      // Creazione degli elementi per la card
      // IMMAGINE
      const image = creaElementoConImg("img", prod.imageUrl); // Creo e richiamo delle funzioni per la creazione degli elementi per non utilizzare innerHTML
      image.className = 'product-card-img';
      
      // NOME
      const name = creaElementoConTesto("h3", prod.name); // Creo e richiamo delle funzioni per la creazione degli elementi per non utilizzare innerHTML

      // DESCRIZIONE
      const description = creaElementoConTesto("p", prod.description); // Creo e richiamo delle funzioni per la creazione degli elementi per non utilizzare innerHTML

      // BRAND
      const brand = creaElementoConTesto("span", prod.brand); // Creo e richiamo delle funzioni per la creazione degli elementi per non utilizzare innerHTML
      brand.className = 'me-3';
      const price = creaElementoConTesto("span", prod.price); // Creo e richiamo delle funzioni per la creazione degli elementi per non utilizzare innerHTML

      // Creazione del container dei bottoni
      const buttonContainer = document.createElement('div')
      buttonContainer.className = 'd-flex gap-2 mt-3'

      // Creo e stilizzo il bottone di UPDATE
      const buttonUpdate = document.createElement('button');
      buttonUpdate.textContent = "Modifica";
      buttonUpdate.className = 'btn btn-secondary w-50 mx-auto';
      buttonUpdate.onclick = () => updateProduct(prod._id); // Passa l'ID del prodotto

      // Creo e stilizzo il bottone di DELETE
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

      // Aggiungo al container dei bottoni i bottoni creati
      buttonContainer.appendChild(buttonUpdate);
      buttonContainer.appendChild(buttonDelete);
      card.appendChild(buttonContainer); // Appendo il contenitore dei bottoni alla card
    
      // Appendo la card al contenitore dei prodotti
      containerCards.appendChild(card);
    });
  }
  // Fine funzione per mostrare i prodotti


  // Creo la funzione al submit del form
  form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Previene il comportamento di default del form

    // Estraggo i dati ottenuti dagli input
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const brand = document.getElementById('brand').value;
    const imageUrl = document.getElementById('image').value;
    const price = document.getElementById('price').value;
    const createdProduct = await createProduct(name, description, brand, imageUrl, price);
    console.log('Elemento creato:', createdProduct);

    
    ottieniProdotti(); // Aggiorno la lista degli elementi
    form.reset(); // Effettuo il reset dei campi di input
  });

  ottieniProdotti(); // Lancio la funzione per farmi ottenere i risultati all'avvio




})





































  