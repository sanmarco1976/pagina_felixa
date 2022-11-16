const card = document.getElementById('productosAllday');
const items = document.getElementById('items');
const footer = document.getElementById('footer');
const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;
const fragment = document.createDocumentFragment();
let carrito = {};

// esta funcion revisa el localStorage y si el array carrito tiene algo lo agrega
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('miCarrito')) {
        carrito = JSON.parse(localStorage.getItem('miCarrito'));
        pintarCarrito();
    }
});

card.addEventListener('click', e => {
    agregarAlCarrito(e);
});

items.addEventListener('click', e => {
    accionBotones(e);
});

// agrega los datos que obtenemos en la funcion infoCarrito al carrito
const agregarAlCarrito = e => {
    if (e.target.classList.contains('add')) {
        infoCarrito(e.target.parentElement.parentElement)
    }
    e.stopPropagation();
    $(".add").on('click', function() {
        Swal.fire(
            'Listo!',
            'El Producto Se Añadio Correctamente!',
            'success'
        )
    });
}

// creamos una const de productos para llenar el id, nombre, precio, la imagen y la cantidad
const infoCarrito = objecto => {
    const producto = {
        id: objecto.querySelector('.add').dataset.id,
        nombre: objecto.querySelector('.divCate1__pCate').textContent,
        precio: Number(objecto.querySelector('.descripcion').textContent.replace('$', '')),
        img: objecto.querySelector('.divCate1__imgCate').src,
        talle: objecto.querySelector('.talles').value,
        color: objecto.querySelector('.colores').value,
        cant: 1,
    }

    //sumamos cantidad si agrega el mismo producto 
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cant = carrito[producto.id].cant + 1;
    }
    carrito[producto.id] = {...producto }
    pintarCarrito();
}

// crea la tabla del carrito y pinta los datos
const pintarCarrito = () => {
    items.innerHTML = '';
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id;
        templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre;
        templateCarrito.querySelectorAll('td')[1].textContent = producto.talle;
        templateCarrito.querySelectorAll('td')[2].textContent = producto.color;
        templateCarrito.querySelectorAll('td')[3].textContent = producto.cant;
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id;
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id;
        templateCarrito.querySelector('span').textContent = producto.cant * producto.precio;
        const copiar = templateCarrito.cloneNode(true);
        fragment.appendChild(copiar);
    })
    items.appendChild(fragment);
    precioTotal();
    localStorage.setItem('miCarrito', JSON.stringify(carrito));
}

const precioTotal = () => {
    footer.innerHTML = '';
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" class="carritoVacio" colspan="5">Carrito vacío - comience a comprar! </th>
        `;
        return
    }

    //creamos un acumulador y a este le sumamos la cantidad para que nos de la cantidad de productos que selecciona
    const cantidadTotal = Object.values(carrito).reduce((acumulador, { cant }) => acumulador + cant, 0);
    //creamos un acumulador y a este le sumamos la cantidad multiplicado al precio  para que nos de el precio total de los productos que selecciona
    const precioTotal = Object.values(carrito).reduce((acumulador, { cant, precio }) => acumulador + (cant * precio), 0);
    templateFooter.querySelectorAll('td')[0].textContent = cantidadTotal;
    templateFooter.querySelector('span').textContent = precioTotal;
    //creamos una copia 
    const copiar = templateFooter.cloneNode(true);
    fragment.appendChild(copiar);
    footer.appendChild(fragment);
    const vaciarCarrito = document.getElementById('vaciar-carrito');
    //funcion para vaciar el carrito, si hace click se eliminan todos los datos del array
    vaciarCarrito.addEventListener('click', () => {
        carrito = {};
        pintarCarrito();
    })
}

const accionBotones = e => {
    //si pulsa el boton + se suma uno a la cantidad
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id];
        producto.cant = carrito[e.target.dataset.id].cant + 1;
        carrito[e.target.dataset.id] = {...producto };
        pintarCarrito();
    }
    //si pulsa el boton - se resta uno a la cantidad
    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id];
        producto.cant = carrito[e.target.dataset.id].cant - 1;
        if (producto.cant === 0) {
            delete carrito[e.target.dataset.id];
        }
        pintarCarrito();
    }
    e.stopPropagation();
}



//animacion de scroll para 'ir arriba' del footer
$("#arriba").click(function() {
    $('html').animate({
        scrollDown: $("#principio").offset().down
    }, 2000);
});
