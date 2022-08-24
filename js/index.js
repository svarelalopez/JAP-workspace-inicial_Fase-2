// document.addEventListener("DOMContentLoaded", function(){
//     document.getElementById("autos").addEventListener("click", function() {
//         localStorage.setItem("catID", 101);
//         window.location = "products.html"
//     });
//     document.getElementById("juguetes").addEventListener("click", function() {
//         localStorage.setItem("catID", 102);
//         window.location = "products.html"
//     });
//     document.getElementById("muebles").addEventListener("click", function() {
//         localStorage.setItem("catID", 103);
//         window.location = "products.html"
//     });
// });

function cargarcategorias() {

    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    })
};

function iralogin() {

    // ALERTA SIMPLE:
    //     alert("Debe iniciar sesión para utilizar el sitio")
    //     location.href = "login.html"

    Swal.fire({
        title: '',
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

document.addEventListener("DOMContentLoaded", function(){
    
    let usuario = localStorage.getItem("usuario");

    if (usuario != null) {             //para verificar si usuario logueado y dar booleano
        // document.getElementById("usuario").innerHTML = usuario;              //Esta linea en caso de saludar usuario index.html:36
        cargarcategorias()
    }else{
        iralogin()
    }

    document.getElementById("cerrarsesion").addEventListener("click", ()=>{
        window.localStorage.removeItem("usuario")
        iralogin()

    })

})

    



