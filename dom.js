const imgCarrito = document.getElementById("imgCarrito")
const container = document.getElementById("container")
const inputSearch = document.querySelector("input#inputSearch")
const carrito = recuperarCarrito()

function filtrarProductos(valor) {
  const resultado = productos.filter(alimento => alimento.nombre.toLowerCase().includes(valor.toLowerCase()))
     if(resultado.length > 0){
     cargarProductos(resultado)
   }
}


function retornoCardHTML(alimento){
 return`<div class="card">
             <div class="card-image">${alimento.imagen}</div>
             <div class="card-name">${alimento.nombre}</div>
             <div class="card-price">$ ${alimento.precio}</div>
             <div class="card-button">
                 <button class="button button-outline button-add" id="${alimento.id}" title="Click para agregar al carrito"><img src="images/basket.png"></button>
             <div/>
         <div/>`
}

function cargarProductos(array){
      container.innerHTML = ""
      array.forEach(alimento => {
        container.innerHTML += retornoCardHTML(alimento)
      })
      activarClickEnBotones() 
}


inputSearch.addEventListener("keyup", (e)=> {
    filtrarProductos(e.target.value)
})

function activarClickEnBotones(){
    const botones = document.querySelectorAll("button.button.button-outline.button-add")
     for (const boton of botones){
        boton.addEventListener("click", ()=> {
         let resultado = productos.find(alimento => alimento.id === parseInt(boton.id))
           carrito.push(resultado)
           guardarCarrito()
        })
     }

}

function guardarCarrito(){
    localStorage.setItem("carritoAlimentos", JSON.stringify(carrito))
}

function recuperarCarrito(){
   return JSON.parse(localStorage.getItem("carritoAlimentos")) || []
}


cargarProductos(productos)
recuperarCarrito()
