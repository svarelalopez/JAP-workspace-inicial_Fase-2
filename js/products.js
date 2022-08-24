let categoriesArray = [];  //array donde se cargarán los datos recibidos:

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showCategoriesList(array){ 
    let htmlContentToAppend = ""; //define una lista del contenido a mostrar que empieza vacía

    for(let i = 0; i < array.length; i++){ //recorre el JSON en cada categoría de la lista y la va agregando
        let products = array[i];

        //estructura extraida de div categories.js modificada
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
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

document.addEventListener("DOMContentLoaded", ()=>{ 
    
    getJSONData(PRODUCTS_URL).then(function(json){ //getJSONData definida en init.js, devuelve fetch()
        if (json.status === "ok")
        {
            categoriesArray = json.data.products; 
            showCategoriesList(categoriesArray);
        }
    });
});