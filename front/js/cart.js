/* affichage du panier de  l'utiliateur */
console.log('La page cart.html  a correctement chargé le fichier cart.js!');

// récupération des clés du localstorage
function recupCles(nombreCles) {
    let toutesLesCles = [];
    for(i=0;i<nombreCles;i++){
    let unecle = localStorage.key(i);
    toutesLesCles.push(unecle);
    }
    return toutesLesCles
}
const lesCles = recupCles(localStorage.length);
if(lesCles.length>0){
    lesCles.forEach(displayItemInCart);  
    //console.log('vrai');
}
else {
    h1 = document.getElementsByTagName('h1')[0];
    h1.textContent = 'Votre Panier est vide';
    //console.log('faux');
}
let lePrixtotal =  calculPrix();
let lesQuantitesTotales =  calculQuantities();

// affichage des produits dans le panier
function displayItemInCart(cle){
    let unProduit = JSON.parse(localStorage.getItem(cle));
    let article = document.createElement('article');
    article.setAttribute('class','cart__item');
    article.setAttribute('data-id',unProduit.id);
    article.setAttribute('data-color',unProduit.color);
    let cadreImg = document.createElement('div');
    cadreImg.setAttribute('class','cart__item__img');
        let img = document.createElement('img');
        img.setAttribute('src' , unProduit.imageUrl);
        img.setAttribute('alt' , unProduit.altTxt);
    cadreImg.append(img);
    let cadreContent = document.createElement('div');
    cadreContent.setAttribute('class',"cart__item__content");
        let cadreDescription = document.createElement('div');
        cadreDescription.setAttribute('class',"cart__item__content__description");
            let nomProduit = document.createElement('h2');
            nomProduit.textContent = unProduit.thename;
            let couleurProduit = document.createElement('p');
            couleurProduit.textContent = unProduit.color;
            let prixProduit = document.createElement('p');
            prixProduit.textContent = new Intl.NumberFormat('fr-FR',{style:'currency', currency:'EUR'}).format(unProduit.price);
        cadreDescription.append(nomProduit,couleurProduit,prixProduit);
    let cadreSettings = document.createElement('div');
    cadreSettings.setAttribute('class', "cart__item__content__settings");
        let cadreQuantity = document.createElement('div');
        cadreQuantity.setAttribute('class',"cart__item__content__settings__quantity");
            let textQuantity = document.createElement('p');
            textQuantity.textContent = `Qté : `;
            let valueQuantity = document.createElement('input') ;
            valueQuantity.setAttribute('name','itemQuantity');
            valueQuantity.setAttribute('type','number');
            valueQuantity.setAttribute('class','itemQuantity');
            valueQuantity.setAttribute('min','1');
            valueQuantity.setAttribute('max','100');
            valueQuantity.setAttribute('value',`${unProduit.quantity}`);
        cadreQuantity.append(textQuantity,valueQuantity);    
        let cadreDelete = document.createElement('div');
        cadreDelete.setAttribute('class',"cart__item__content__settings__delete");
            let btnDelete = document.createElement('p');
            btnDelete.setAttribute('class','deleteItem');
            btnDelete.textContent = ('Supprimer');
        cadreDelete.append(btnDelete);
    cadreSettings.append(cadreQuantity,cadreDelete);  
    cadreContent.append(cadreDescription,cadreSettings);
article.append(cadreImg,cadreContent);
document.getElementById("cart__items").append(article);
}
let prixTotal = document.getElementById("totalPrice");
prixTotal.textContent =new Intl.NumberFormat('fr-FR',{style:'currency', currency:'EUR'}).format(lePrixtotal);

let quantitesTotales = document.getElementById("totalQuantity");
quantitesTotales.textContent = lesQuantitesTotales;


// Calcul  du prix total du panier
function calculPrix(){
    pricesArray = [];
    totalPrice = 0;
    for(i=0;i<lesCles.length;i++){
    oneItem = JSON.parse(localStorage.getItem(lesCles[i]));
    oneItemPrice = oneItem.quantity * oneItem.price;
    pricesArray.push(oneItemPrice);
    totalPrice += +pricesArray[i];
}
return totalPrice ;
}
 // Calcul des quantites totales du panier
function calculQuantities(){
    quantitiesArray = [];
    totalQuantities = 0;
    for(i=0;i<lesCles.length;i++){
    oneItem = JSON.parse(localStorage.getItem(lesCles[i])); 
    quantitiesArray.push(oneItem.quantity);
    totalQuantities += +quantitiesArray[i];
    //console.log(totalPrice);
}
return totalQuantities ;
}
//Mettre à jour les articles du panier
// le reload  impacte négativement l'UX il me semble
let lesArticles = document.querySelector('#cart__items');
//console.log(lesArticles);
lesArticles.addEventListener('click', remove);
function remove(e){
    let target = e.target;
    if(target.className == 'deleteItem'){
        let lArticle = target.parentElement.parentElement.parentElement.parentElement;
        let lId = lArticle.getAttribute('data-id');
        let laCouleur = lArticle.getAttribute('data-color');
        let lUniqueId = lId+'_'+laCouleur;
        //console.log(lUniqueId);
        lArticle.remove();
        localStorage.removeItem(lUniqueId);
        location.reload()
    }
}
lesArticles.addEventListener('input',majQuantity);
function majQuantity(e){
    let target = e.target;
    if(target.className == 'itemQuantity'){
        //console.log(target.value);
        let lArticle = target.parentElement.parentElement.parentElement.parentElement;
        let lId = lArticle.getAttribute('data-id');
        let laCouleur = lArticle.getAttribute('data-color');
        let lUniqueId = lId+'_'+laCouleur;
        let lArtAMaj =JSON.parse(localStorage.getItem(lUniqueId)); 
        console.log(lArtAMaj);
        lArtAMaj.quantity = target.value;
        console.log(lArtAMaj);
        let lArtMisAJ = JSON.stringify(lArtAMaj);
        localStorage.setItem(lUniqueId,lArtMisAJ);
        location.reload()
    }
}
// passer la commande
let orderButton = document.getElementById("order");
orderButton.addEventListener("click", (event) => submitForm(event));
function submitForm(event) {
  event.preventDefault();
  if (localStorage.length === 0) {
    alert("Veuillez choisir un canapé");
    return;
  }
  if (validationOfForm()) return;
  if (emailValidation()) return;
  let requestToApi = transmettreCommande();
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(requestToApi),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      let orderId = data.orderId;
      window.location.href = "/front/html/confirmation.html?orderId=" + orderId;  
    })
    .catch((err) => console.error(err));
}
// Vérification de l'émail .
function emailValidation() {
  let emailInput = document.getElementById("email").value;
  let regex =
    /^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/i;
  if (regex.test(emailInput) === false) {
    alert("Veuillez entrez un email valide");
    return true;
  }
  return false;
}
// Vérification du forumlaire.
function validationOfForm() {
  let form = document.querySelector(".cart__order__form");
  let inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.value === "") {
      alert("Veuillez remplir tous les champs du formulaire");
      return true;
    }
    return false;
  });
}
function transmettreCommande() {
  let form = document.querySelector(".cart__order__form");
  let firstName = form.elements.firstName.value;
  let lastName = form.elements.lastName.value;
  let address = form.elements.address.value;
  let city = form.elements.city.value;
  let email = form.elements.email.value;
  let arrayApi = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    },
    products: getProductsId(lesCles),
  };
  console.log(arrayApi);
  return arrayApi;
}

function getProductsId(lesCles) {
  let productsId = [];
  for (let i = 0; i < lesCles.length; i++) {
    let id = lesCles[i].split("_")[0];
   productsId.push(id);
  }
  console.log(productsId)
  return productsId;
}
