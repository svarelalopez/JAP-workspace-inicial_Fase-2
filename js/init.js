const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/"; //https://japceibal.github.io/emercado-api/cats_products/
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const AUTOS = "https://japceibal.github.io/emercado-api/cats_products/101.json";
const EXT_TYPE = localStorage.getItem("catID") + ".json"; 
const EXT_PROD_TYPE = localStorage.getItem("ProdID") + ".json"; 



let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}
let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}
let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}


function iralogin() {

  // // ALERTA SIMPLE:
  //     alert("Debe iniciar sesión para utilizar el sitio")
  //     location.href = "login.html"

  Swal.fire({
      title: 'Se ha cerrado la sesión',
      text: "Debe iniciar sesión para utilizar el sitio",
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#229fbc',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Iniciar sesión'
    }).then((result) => {
      if (result.isConfirmed) {
          location.href = "login.html"
      } else{
          location.href = "login.html"
      }
    })
} 
function botonusuario() {

  let usuario = localStorage.getItem("usuario");

  if (usuario != null) {      //para verificar si usuario logueado y dar booleano
      
      document.getElementById("saludarusuario").innerHTML = 
        `<div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
          <ul class="navbar-nav">
            <li class="nav-item dropdown ">
              <a class="nav-link active dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Hola, ${usuario}
              </a>
              <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
              <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
              <li><a class="dropdown-item" href="my-profile.html">Mi Perfil</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" id="cerrarsesion" href="#" onclick="iralogin()">Cerrar sesión</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>`

    }else{
      iralogin()
  }
}
function setProdID(id) {
  localStorage.setItem("ProdID", id);
  window.location = "product-info.html"
}


document.addEventListener("DOMContentLoaded", ()=>{
  botonusuario();

  document.getElementById("cerrarsesion").addEventListener("click", ()=>{
    window.localStorage.removeItem("usuario")
  })
})