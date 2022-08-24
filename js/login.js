function login () {

    let usuario = document.getElementById("email").value
    let clave = document.getElementById("password").value

    if(usuario==="" || clave ===""){
          //Advertencia de campos vacíos
          document.getElementById("error").innerHTML = "Debe ingresar Mail y Contraseña"

    } else {
        localStorage.setItem("usuario",usuario);
        location.href = "index.html";
    }

        }

document.addEventListener("DOMContentLoaded", ()=>{

    document.getElementById("inicio").addEventListener("click", () => {
        login();
    })
})



