let productInfo= [];
let coments= [];

function showProductInfo(array) {
    document.getElementById("infoDelProducto").innerHTML=
        `      <br><br>
                <div class="text-left">
                    <h1>${array.name}</h1>
                </div>
                <br><hr>

                <div>
                    <h4 >Precio</h4>
                    <p> ${array.currency} ${array.cost} </p>
                </div>
                <div>
                    <h4 >Descripción</h4>
                    <p> ${array.description} </p>
                </div>
                <div>
                    <h4 >Categoría</h4>
                    <p> ${array.category} </p>
                </div>
                <div>
                    <h4 >Cantidad de vendidos</h4>
                    <p> ${array.soldCount} </p>
                </div>
                <div>
                    <h4 >Imágenes ilustrativas</h4>
                    <br>
                    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="${array.images[0]}" class="d-block w-100">
                            </div>
                            <div class="carousel-item">
                                <img src="${array.images[1]}" class="d-block w-100">
                            </div>
                            <div class="carousel-item">
                                <img src="${array.images[2]}" class="d-block w-100">
                            </div>
                            <div class="carousel-item">
                                <img src="${array.images[3]}" class="d-block w-100">
                            </div>
                            
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>           
                        </div>
                    </div> 

                </div>`
}

function puntuacion(score){
            
    var stars="";
    for(let i = 1; i <= 5; i ++) {
        if (i<=score){
        stars += '<i class="fas fa-star checked" ></i>'; //llena
        }else{
             stars += '<i class="far fa-star unchecked"></i>';//vacía
        }
       }
    return stars
    };
function showComents(array) {
    let coms = ""; 

    for(let i = 0; i < array.length; i++){ 
        let coment = array[i];
        coms += `        <div class="list-group-item" >
        <div class="row">
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                      <h5 > ${coment.user} -  ${puntuacion(coment.score)} </h5>
                      <p> ${coment.description} </p>
                    </div>
                    <small class="text-muted">${coment.dateTime} </small>
                </div>
            </div>
        </div> 
      </div>`;

    document.getElementById("comentarios").innerHTML= coms;
}}
function fecha(){
    // dd/mm/aaaa - hh hs //2020-02-25 18:03:52
    let unafecha = new Date();
    let dia = unafecha.getDate();
    let mes = unafecha.getMonth() +1
    if (mes<10){
        mes= "0"+mes;
    }
    let anio = unafecha.getFullYear();
    let hora = unafecha.getHours() + ":" + unafecha.getMinutes()+":"+unafecha.getSeconds();

    return anio+"-"+mes+"-"+dia+" "+hora
};
function addUserComent() {
    let userScore = document.querySelector(`input[name="estrellas"]:checked`).value;

    let usercoment ={};
    usercoment.user = localStorage.getItem("usuario");
    usercoment.score = userScore;
    usercoment.description = document.getElementById("userDesc").value;
    // console.log(document.querySelector(`input[name="estrellas"]:checked`).value);
    usercoment.dateTime = fecha();
    
    if (userDesc.value===""){
        document.getElementById("error").innerHTML+="Ingrese su comentario y calificación antes de enviar"
    }else{
        coments.push(usercoment);
    }

}

function setProdID(id) {
    localStorage.setItem("ProdID", id);
    window.location = "product-info.html"
}
function relatedProducts(array){
    let rels = ""; 

    for(let i = 0; i < array.relatedProducts.length; i++){ 
        let rel = array.relatedProducts[i];
        rels += `        
        <div class="col-md-3">
          <div class="card mb-3 shadow-sm" onclick="setProdID(${rel.id})">
            <img class="bd-placeholder-img card-img-top" src="${rel.image}">
            <h5 class="m-3">${rel.name}</h5>
            <!-- <div class="card-body">
              <p class="card-text">Muebles antiguos, nuevos y para ser armados por uno mismo.</p>
            </div> -->
          </div>
        </div>`;
      
    document.getElementById("relacionados").innerHTML+= rels;
}};

document.addEventListener("DOMContentLoaded", ()=>{

    getJSONData(PRODUCT_INFO_URL + EXT_PROD_TYPE).then(function(json){ //PRODUCTOS
        if (json.status === "ok")
        {
            productInfo = json.data; 
            console.log(productInfo);
            showProductInfo(productInfo);
            relatedProducts(productInfo);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL + EXT_PROD_TYPE).then(function(json){ //COMENTARIOS
        if (json.status === "ok")
        {
            coments = json.data; 
            console.log(coments);
            showComents(coments);

            document.getElementById("takeUserComent").addEventListener("click", ()=>{

                addUserComent();
                showComents(coments);
            })
        }
    });
})
