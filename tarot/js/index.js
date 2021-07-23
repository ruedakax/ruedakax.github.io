import {tirada_1} from './tirada_1.js'
import {tirada_2} from './tirada_2.js'
import {tirada_3} from './tirada_3.js'
import {tirada_4} from './tirada_4.js'
import {tirada_5} from './tirada_5.js'
import {tirada_6} from './tirada_6.js'
import {tarot}    from './tarot.js'

const tiradas = {'t1':tirada_1,'t2':tirada_2,'t3':tirada_3,'t4':tirada_4,'t5':tirada_5,'t6':tirada_6}
const direccion = ['normal','reverse']

document.querySelectorAll('.tirada').forEach(item => {
    item.addEventListener('click', (event) => {
        let key = event.target.id        
        let main = document.querySelector('.main')
        main.innerHTML= tiradas[key].tirada
        main.setAttribute('data-sacadas','')
        main.setAttribute('data-index','0')
    })
})

document.querySelector('#aleatoria').addEventListener('click',(event) => {
    let main = document.querySelector('.main')
    let indice = main.getAttribute('data-index')
    let bloque = main.firstElementChild
    console.log(bloque)
    let cadena = main.getAttribute('data-sacadas')
    let sacadas = cadena.length === 0?[]:cadena.split(',')
    
    if(!bloque){
        popUp('Debe elegir una tirada')
    }else{        
        if(indice < tiradas[bloque.id].posiciones){
            document.querySelector('.loader').classList.remove('oculto')
            pasarCarta(indice,sacadas)
            setTimeout(function () {            
                document.querySelector('.loader').classList.add('oculto')
            }, 1000);
        }else{
            popUp('Ya se completó la tirada')
        }        
    }
})

document.querySelectorAll('.accordion').forEach(elemento => {
    elemento.addEventListener('click',(evento)=>{       
        document.querySelectorAll('.panel').forEach(item => {                     
            item.style.display = 'none'             
        });      
        let panel = evento.target.nextElementSibling
        panel.style.display = 'block'
        evento.target.classList.toggle('abierto')
    })
});

let pasarCarta = (indice,sacadas) => {
        let numero = nroAleatorio(sacadas)
        let carta = tarot[numero]
        let imagen = carta.img
        let cartaEscogida = crearNodoCarta(imagen,carta.name)
        let tip = crearNodoTooltip(carta.name)
        document.querySelector(`#pos_${indice}`).appendChild(cartaEscogida)
        document.querySelector(`#pos_${indice}`).appendChild(tip)
        sacadas.push(numero)
        let actual = sacadas.length===1?numero:sacadas.join()        
        let main = document.querySelector('.main')
        main.setAttribute('data-sacadas',actual)
        main.setAttribute('data-index',parseInt(indice) + 1)
}

let nroAleatorio = (cartasSacadas) => {    

	console.log(typeof cartasSacadas)
	console.log(cartasSacadas)
    let cartaNumero = Math.floor((Math.random() * 77) + 0)
	console.log(cartasSacadas.includes(parseInt(cartaNumero)))
    while(cartasSacadas.includes(parseInt(cartaNumero))===true){
        cartaNumero = Math.floor((Math.random() * 77) + 0)
    }
    return cartaNumero
}

let crearNodoCarta = (source,name) => {
    let azar = Math.round((Math.random() * 1) + 0)
    let orientacion = direccion[azar]
    let carta = document.createElement('img')
    carta.classList.add('imagen')
    carta.classList.add(orientacion)
    carta.setAttribute('width','140')
    carta.setAttribute('height','232')
    carta.setAttribute('src',source)
    carta.setAttribute('alt',name)
    return carta
}

let crearNodoTooltip = (name) => {   
    let tip = document.createElement('span')
    tip.classList.add('tooltip')
    tip.textContent = name
    return tip
}

let popUp = (mensaje) => {
  let popup = document.querySelector("#myPopup");
  popup.innerHTML = mensaje
  popup.classList.add("show");
  setTimeout(function () {
    popup.classList.remove("show");
  }, 2000);
}