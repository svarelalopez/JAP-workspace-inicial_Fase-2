let productsArray = [];  //array donde se cargarán los datos recibidos:

function setProdID(id) {
    localStorage.setItem("ProdID", id);
    window.location = "product-info.html"
}

function showProductsList(array){       //función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
    let htmlContentToAppend = ""; //define una lista del contenido a mostrar que empieza vacía

    for(let i = 0; i < array.length; i++){ //recorre el JSON en cada categoría de la lista y la va agregando
        let products = array[i];

        //estructura extraida de div categories.js modificada
        htmlContentToAppend += `
        <div onclick="setProdID(${products.id})" class="list-group-item list-group-item-action" >
            <div class="row">
                <div class="col-3">
                    <img src=" ${products.image} " alt="$product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4 > ${products.name} - ${products.currency} ${products.cost} </h4>
                        <p> ${products.description} </p>
                        </div>
                        <small class="text-muted"> ${products.soldCount} artículos</small>
                    </div>
                </div>
            </div> 
        </div>`
        
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend; 
    }
}

let listaFiltrada = []; //para buscador (array.filter)
function buscar(){
    let loEscrito = document.getElementById("buscador").value;

    let listaFiltrada = productsArray.filter((producto)=> {
        return producto.name.toLowerCase().indexOf(loEscrito.toLowerCase()) > -1; //producto.products.name?? x el json de productsArray.filter
    })
    showProductsList(listaFiltrada);
}

// function sortBy(elem, criteria) {   //Función que une relevancia, precioAsc y precioDesc pero no funciona

//     if (criteria===asc){
//     let sortedlist=productsArray.sort((a,b)=>a.elem-b.elem);
//     showProductsList(sortedlist)
//     }
//     if (criteria===desc){
//         let sortedlist=productsArray.sort((a,b)=>b.elem-a.elem);
//         showProductsList(sortedlist)
//         }
// }

function relevancia() {
    let sortedlist = productsArray.sort((a,b)=>a.soldCount-b.soldCount);
    showProductsList(sortedlist)
}
function precioAsc() {
    let sortedlist = productsArray.sort((a,b)=>a.cost-b.cost);
    showProductsList(sortedlist)
}
function precioDesc() {
    let sortedlist = productsArray.sort((a,b)=>b.cost-a.cost);
    showProductsList(sortedlist)
}


function filtrarPrecio() {

        let min = parseInt(document.getElementById('rangeFilterCountMin').value); //parseInt(string, base) parsea una cadena y devuelve entero (que es base?)
        let max = parseInt(document.getElementById('rangeFilterCountMax').value);
        if(min=""){ 
           let min= 0
        }
        let listaFiltrada = productsArray.filter(products => products.cost >= min && products.cost <= max );

        listaFiltrada.sort((ant,sig)=>ant.cost-sig.cost); //arr.sort((a,b)=>a-b) recorre todoos los elementos y los ordena en base a su resultado (1 || -1)
      
        showProductsList(listaFiltrada);
}

document.addEventListener("DOMContentLoaded", ()=>{ 


     getJSONData(PRODUCTS_URL + EXT_TYPE).then(function(json){ //getJSONData definida en init.js, devuelve fetch()
        if (json.status === "ok")
        {
            productsArray = json.data.products; 
            console.log(productsArray);
            showProductsList(productsArray);
        }
    });
            
    document.addEventListener("keyup", ()=>{        // barra de busqueda
        buscar()
    })
    document.getElementById("relevancia").addEventListener("click",()=>{         // filtrar por relevancia
        relevancia()  //sortBy("soldCount", asc)
    })
    document.getElementById("precioAsc").addEventListener("click",()=>{         //filtrar botones precio
        precioAsc()   // sortBy(cost, asc)
    })
    document.getElementById("precioDesc").addEventListener("click",()=>{ 
        precioDesc()  // sortBy(PRECIO,desc)
    })

            // filtrar por precio
    document.getElementById("rangeFilterCount").addEventListener("click",()=>{ //como poner el enter??
        filtrarPrecio();
    })

    document.getElementById("clearRangeFilter").addEventListener("click",()=>{        // Limpiar (mostrar todo)
        showProductsList(productsArray);
    })
});