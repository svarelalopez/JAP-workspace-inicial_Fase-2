const USER_ID = "25801" + ".json";
let cartProducts = []
let dolar = 41.02;

function includeProds(){
  let prods = JSON.parse(localStorage.getItem("cartProds"))

  if(prods!=null){
      console.log("del local:"); console.log(prods);
      for(let i = 0; i < prods.length; i++){
        cartProducts.articles.push(prods[i]);
      }
  }
}
function removeItemButton(i){
  // console.log("antes"); console.log(cartProducts);
  cartProducts.articles.splice(i,1);
  showCartProducts(cartProducts);
  localStorage.setItem("cartProds", JSON.stringify(cartProducts));
  showtotal(cartProducts);
  console.log("despues"); console.log(cartProducts);
  // console.log("del local"); console.log(JSON.parse(localStorage.getItem("cartProds")));

}

function calculateQuantity(cost, i){ //inclye cambio de color en cantidad
  let cuantity = document.getElementById("cuantity"+i);
  document.getElementById("subtotal"+i).innerHTML= cost*cuantity.value;
  showtotal(cartProducts);

  let btnminus = document.getElementById("minus"+i)
  let btnplus = document.getElementById("plus"+i)

  if(cuantity.value==0){
    cuantity.style.borderColor = "#dc3545"
    cuantity.style.color = "#dc3545"
    btnminus.style.color = "#dc3545"
    btnplus.style.color = "#dc3545"
  }else if(cuantity.value!=0){
    cuantity.style.borderColor = "#ced4da"
    cuantity.style.color = "#212529"
    btnminus.style.color = "#0d6efd"
    btnplus.style.color = "#0d6efd"
  }
}
function showCartProducts(array) {
    let htmlcontenttoappend= "";
    for(let i = 0; i < array.articles.length; i++){
        let item = array.articles[i];
        htmlcontenttoappend+=
        `                  <tr>
        <th scope="row">
          <div class="d-flex align-items-center">
            <img src="${item.image}" class="img-fluid rounded-3" style="width: 120px;" alt="" onclick="setProdID(${item.id})">
            <div class="flex-column ms-4">
              <p class="mb-2">${item.name}</p>
              <p class="mb-0"></p>
            </div>
          </div>
        </th>
        <td class="align-middle">
          <p class="mb-0" style="font-weight: 500;">${item.currency} ${item.unitCost}</p>
        </td>
        <td class="align-middle">
          <div class="d-flex flex-row">
          <button class="btn btn-link px-2" onclick="this.parentNode.querySelector('input[type=number]').stepDown(), calculateQuantity(${item.unitCost},${i})">
              <i id="minus${i}" class="fas fa-minus"></i>
            </button>
        
            <input onchange="calculateQuantity(${item.unitCost},${i})" id="cuantity${i}" min="0" name="quantity${i}" value=${item.count} type="number" class="form-control form-control-sm " style="width: 50px;">
        
            <button class="btn btn-link px-2" onclick="this.parentNode.querySelector('input[type=number]').stepUp(), calculateQuantity(${item.unitCost},${i})">
              <i id="plus${i}"class="fas fa-plus"></i>
            </button>
          </div>
        </td>
        <td class="align-middle">
          <p class="mb-0" style="font-weight: 600;">${item.currency} <span id="subtotal${i}">${item.unitCost}</span></p> 
        </td>
        <td class="align-middle">
          <button class="btn btn gray" onclick="removeItemButton(${i})">
            <i class="fas fa-trash"></i>
          </button>
        </td>
        </tr>`;
    }

document.getElementById("productInfo").innerHTML= htmlcontenttoappend;
}

function showtotal(array){
  //--Cotizacion Dolar--//
  document.getElementById("cotizacion").innerHTML= "(Dolar: UYU "+dolar+")"
  //-------------//
  let subtotalGral = 0;
  for(let i = 0; i < array.articles.length; i++){
    let costo=0
    let cantidad=document.getElementById("cuantity"+i).value
    if(array.articles[i].currency==="UYU"){
      costo = array.articles[i].unitCost/dolar
      subtotalGral+= costo*cantidad
    }else{
      costo = array.articles[i].unitCost
      subtotalGral+= costo*cantidad
      }
    }
  document.getElementById("subtotalGral").innerHTML=subtotalGral.toFixed(1);
  //-------------//
  let envio = document.querySelector(`input[name="inputEnvio"]:checked`).value;
  let costoEnvio = (subtotalGral*envio)/100; //alert(costoEnvio);
  document.getElementById("costoDeEnvio").innerHTML=costoEnvio.toFixed(1);
  //------------//
  let total = subtotalGral + costoEnvio;
  document.getElementById("montoTotal").innerHTML=total.toFixed(1);

}
function validarPago(){
  let formaDePago = document.querySelector(`input[name="formaPago"]:checked`);
  let text = document.getElementById("metodoDePago");
  let textopago = document.getElementById("formaDePago");

  if(!formaDePago) {
    text.innerHTML="No seleccionada";
    text.classList="text-end mb-2 text-danger";
    textopago.classList="mb-2 text-danger";


  }else if (formaDePago.id==='pagoTransferencia'){
    text.innerHTML="Transferencia bancaria";
    text.classList="text-end mb-2";
    textopago.classList="mb-2";

    document.getElementById("targetaChecked").innerHTML="";
    document.getElementById("transferenciaChecked").innerHTML=
        `                          <div class="col-12">
        <div class="form-outline ">
          <input type="text" id="typeExp" class="form-control form-control-lg" placeholder="Número de cuenta" required/>
          <div class="invalid-feedback"  id="validate-NC">
            Debe ingresar un número de cuenta
          </div>
        </div>
      </div>`

  }else if(formaDePago.id==='pagoTargeta'){
    text.innerHTML="Targeta de crédito";
    text.classList="text-end mb-2";
    textopago.classList="mb-2";

    document.getElementById("transferenciaChecked").innerHTML="";
    document.getElementById("targetaChecked").innerHTML=
        `                          <div class="col-7">
        <div class="form-outline mb-4 mb-xl-2">
          <input type="text" id="numeroTargeta" class="form-control form-control-lg"
            placeholder="Número de targeta" required/>
            <div class="invalid-feedback" id="validate-NT">
              Debe ingresar una targeta
            </div>
        </div>
      </div>

      <div class="col-5">
        <div class="form-outline mb-3">
          <input type="text" id="typeName" class="form-control form-control-lg"
            placeholder="Codigo de seg." maxlength="4" required/>
            <div class="invalid-feedback" id="validate-C">
              Debe ingresar un código
            </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="form-outline mb-5">
            <input type="text" id="typeExp" class="form-control form-control-lg" placeholder="Vencimiento (MM/AA)" required/>
            <div class="invalid-feedback" id="validate-F">
              Debe ingresar una fecha
            </div>
          </div>
        </div>
      </div>`;

  }else{
    text.innerHTML="";
  } 
}
function validarCantidad(){
  let array = cartProducts
  let a = 0
  for(let i = 0; i < array.articles.length; i++){
    let cantidad = document.getElementById(`cuantity${i}`);
    // console.log(cantidad);
    if(cantidad.value==0){a+=1}
  }
  if(a>0){
    document.getElementById("cantidades-validacion").innerHTML= "Las cantidades deben ser mayores que 0"
    return false
  }else{
    document.getElementById("cantidades-validacion").innerHTML= ""
    return true}
  // a>0 ? false : true
  }

function sweetAlert(){
  Swal.fire({
    title: '¡Compra realizada con éxito!',
    text: "Debe iniciar sesión para utilizar el sitio",
    icon: 'success',
    timer:2500,
    showCancelButton: false,
    confirmButtonColor: '#0d6efd',
    cancelButtonColor: '#dffff4',
    confirmButtonText: 'Volver al carrito'
  })
}


document.addEventListener("DOMContentLoaded", ()=>{

    getJSONData(CART_INFO_URL + USER_ID).then(function(json){ //PRODUCTOS
        if (json.status === "ok")
        {
            cartProducts = json.data; 
            includeProds()
            console.log(cartProducts);
            showCartProducts(cartProducts);
            showtotal(cartProducts);

        }
    });

    //Eventlistener de tipo de envio
    let inputsEnvio = document.getElementsByName("inputEnvio");
    for(let i = 0; i < inputsEnvio.length; i++){
      inputsEnvio[i].addEventListener("click", ()=>{
      showtotal(cartProducts);
      })
}

    //Eventlistener de forma de pago
    let pago = document.getElementsByName("formaPago");
    for(let i = 0; i < pago.length; i++){
      pago[i].addEventListener("click", ()=>{
        validarPago();
      })
    }

    //       VALIDACIÓN        //

    let pageform = document.getElementById("pageForm")
    let modalform = document.getElementById("modalForm")
    
    document.getElementById("finalizarCompra").addEventListener("click", event =>{
      if(!pageform.checkValidity() || !modalform.checkValidity() || !validarCantidad()){
        event.preventDefault();
        event.stopPropagation();
        validarPago();
        validarCantidad();
      }else{
        sweetAlert()
        document.getElementById("form").submit();
      }
      pageform.classList.add('was-validated')
    })
    

    document.getElementById("botonModal").addEventListener("click", event =>{
      if(!modalform.checkValidity()){
        document.getElementById("pago-validacion").innerHTML="Falta información de pago"
        event.preventDefault();
        event.stopPropagation();
        validarPago();
      }else{
        document.getElementById("pago-validacion").innerHTML=""
        document.getElementById("form").submit();
      }
      modalform.classList.add('was-validated')
    })

})




