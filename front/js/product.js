console.log("la page produit a bien chargé le fichier product.js");

const findId = new URLSearchParams(window.location.search);
const Id = findId.get("id");
//console.log(Id);
/* déclaration des variables (globales) */
let priceGlobal,urlGloblal ,altTxtGlobal,nameGlobal;
function assigneDonnee(){
    return priceGlobal,urlGloblal,altTxtGlobal,nameGlobal;
}
// getOneProduct se sert de fetch pour récupérer le produit dont l'id est rajoutée à l'url
function getOneProduct(assigneDonnee) {   
    const apiURL = "http://localhost:3000/api/products/"+Id;
    fetch(apiURL)
        .then(function (response) {
            
            return response.json();
        })
        .then(function (res) {
            // on assigne aux variables globales les propriétés du produit retourné par fetch   //
         priceGlobal =  res.price;
         urlGloblal = res.imageUrl;
         altTxtGlobal = res.altTxt;
         nameGlobal = res.name ;
         let titrePage = document.getElementsByTagName('title')[0];
         titrePage.textContent = res.name;
        displayOneProduct(res); 
        })
        .catch(function (err) {
            console.log("Une erreur s'est produite",err);
        })
}
// ici on invoque la fonction getOneProduct
getOneProduct(assigneDonnee);

// ici on définit la fonction displayOneProduct
function displayOneProduct(product) {
    // ajout image
    let img = document.createElement('img');
    img.setAttribute('src' , product.imageUrl);
    img.setAttribute('alt' , product.altTxt);
    document.getElementsByClassName("item__img")[0].append(img);
  // ajout nom et prix
    let h1 = document.createElement('h1');
    h1.setAttribute('id' , 'title');
    h1.textContent = product.name;
   let span = document.getElementById('price'); 
   span.textContent = product.price;
   document.getElementsByClassName("item__content__titlePrice")[0].append(h1);

   // ajout description
   let p = document.getElementById("description");
   p.textContent = product.description;
  
   // ajout couleur
  let colors = document.getElementById("colors");
  for(let i=0; i< product.colors.length;i++) {
    colorOption = document.createElement("option");
    colorOption.innerHTML = product.colors[i];
    colors.appendChild(colorOption);
  } ;
} 
   /* verification des couleurs et quantités*/
   let  buttonAddToCart = document.getElementById('addToCart');
   buttonAddToCart.addEventListener('click',addProducts);

function addProducts() {
    let color = document.getElementById("colors").value;
    let quantity = document.getElementById("quantity").value;
    if (color == null || color === "" || quantity == 0 || quantity == null) {
      alert("Veuillez sélectionner une couleur et une quantité");
      return;
    }
    else {
        let itemInCart = {
            id : Id,
            price : priceGlobal,
            color : color,
            quantity : Number(quantity),
            imageUrl : urlGloblal,
            altTxt : altTxtGlobal,
            thename : nameGlobal
        }
       //console.log(itemInCart);
       let uniqueId = itemInCart.id +'_'+ itemInCart.color;
       //console.log(uniqueId);
       if(localStorage.getItem(uniqueId)) {
        let item =  localStorage.getItem(uniqueId);
        item = JSON.parse(item);
        window.alert("le produit est déjà dans le panier"+'\n'+"Mise à jour des quantités..."); 
        itemInCart.quantity += item.quantity  ;
        //console.log(itemInCart.quantity);
        let productInCart = JSON.stringify(itemInCart);
        localStorage.setItem(uniqueId,productInCart);           
       }
       else{
        let productInCart = JSON.stringify(itemInCart);
        localStorage.setItem(uniqueId,productInCart);
       }
       }  
         if(window.confirm('produit ajouté au panier!'+'\n'+'Voulez-vous poursuivre vos achats?')) {           
          open('./index.html','_self');
         }else{    
            open('./cart.html','_self');   
         } ; 
    }

   