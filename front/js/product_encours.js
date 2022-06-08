/* affichage du Product sélectionné par l'utiliateur */
console.log('La page product.html  a correctement chargé le fichier product.js!')
localStorage.clear();
console.log('nombre de valeurs stockées en localstorage au chargement de la page:',localStorage.length);

let routeProduct = window.location.href;
/* console.log('voici l url du Product de laquelle il faut récupérer _id: ',routeProduct); */

var url = new URL(routeProduct);
let idProduct =url.searchParams.get("id");
let chosenColor
let selectedQuantity

localStorage.setItem("objId", idProduct);


let nomDomaine ='http://localhost';
let pisteProduct = `:3000/api/products/${idProduct}`;
const endPointProduct = nomDomaine + pisteProduct;
/* console.log('voici le end point du Product: ', endPointProduct);*/

let colorChoice = document.getElementById('colors');
let productQuantity = document.getElementById('quantity');



function getProduct() {
    // cette fonction se sert de fetch pour récupérer un Product de l'API en fonction de son id contenu dans le endPointProduct //
    
    fetch(endPointProduct)
        .then(function (response) {
            return response.json();
        })
        .then(function (res) {
            // res est un objet JavaScript contenant tous les elements qui seront récupérés pour afficher le Product //
        displayProduct(res);
        displayColor(res);
       /* console.log('voici le Product retourné: ',res); */
        })
        .catch(function (err) {
            console.log("Une erreur s'est Produite",err);
        })
}
getProduct()


function displayProduct(product) {
    /* cette fonction reçoit un objet en argument et extrait les propriétés nécessaires pour
     remplir dynamiquement les differents éléments de la page product.html
   */
  document.title = product.name;

  let img = document.createElement('img');
  img.setAttribute('src' , product.imageUrl);
  let img_container = document.getElementsByClassName("item__img")[0];
  img_container.append(img);

   let productTitle = document.getElementById('title');
    productTitle.textContent = product.name;

    let productPrice = document.getElementById('price');
    productPrice.textContent = product.price;

    let productDescription = document.getElementById('description');
    productDescription.textContent = product.description;

}
function displayColor(product) {
    /* Rajout dynamique des couleurs du produit dans la zone de selection d'une couleur*/

let colors = product.colors;
console.log("nombres de couleurs disponibles :" , colors.length) ;
for (let i = 0; i < colors.length; i++) {
 colorOption =document.createElement("option");
 colorOption.innerHTML = colors[i];
 colorChoice.appendChild(colorOption);
}

}

////========================================================////
/*                   */ 
function getData(elt) {
    return new Promise ((resolve, reject) => {
        elt.oninput = recupData;
        function recupData(event) {
            resultat = event.target.value;
             posit = () => resolve (`Data Récupéré : ${resultat}; OK!`);
            negat  = () => reject (new Error(`imposible de récup data!`));
        }
    })
}

async function recuperer() {
    try{
        const recupcouleur = await getData(colorChoice);
        alert(recupCouleur);
        const recupQuantité = await getData(productQuantity);
        alert(recupQuantité);
    } catch(err) {
        alert(err);
    }
}
recuperer();
  






























 /* capture du choix de la couleur par l'utilisateur 
 async function getChosenColor() {
    colorChoice.oninput = await recupererColor;
    
     
        localStorage.setItem("storedColor",chosenColor)
        console.log('nombre de valeurs stockées en localstorage après recup couleur:',localStorage.length);
    }  
 }
 const jsonColorPromise =  getChosenColor();
 jsonColorPromise.then((json) => console.log(json));


 /* capture du choix de la quantité par l'utilisateur 




  async function ajoutItem() {
    console.log('L identifiant du produit choisit est : ',localStorage.objId); 
     storedColor = await recupererColor();
     console.log('La couleur  du produit choisit est : ',localStorage.storedColor);  
     storedQuantity =await recupererQuantity();
     console.log('la quantité du produit choisit est : ',localStorage.storedQuantity);  
     console.log('nombre de valeurs stockées en localstorage avant panier:',localStorage.length);

  }  */