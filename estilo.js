let carrito = [];

function añadir(nombre, precio) {
  // Verificar si el producto ya existe
  const existente = carrito.find(item => item.nombre === nombre);
  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById('lista-carrito');
  lista.innerHTML = '';

  let total = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.nombre} - $${item.precio} x 
      <input class="cantidad" type="number" min="1" value="${item.cantidad}" onchange="cambiarCantidad(${index}, this.value)">
      = $${item.precio * item.cantidad}
      <button onclick="eliminarProducto(${index})">Eliminar</button>
    `;
    lista.appendChild(li);
    total += item.precio * item.cantidad;
  });

  document.getElementById('total').textContent = total;
}

function cambiarCantidad(index, nuevaCantidad) {
  nuevaCantidad = parseInt(nuevaCantidad);
  if (nuevaCantidad < 1) return;

  carrito[index].cantidad = nuevaCantidad;
  actualizarCarrito();
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

function finalizarCompra() {
  if (carrito.length === 0) {
    alert('Tu carrito está vacío.');
    return;
  }

  alert('¡Gracias por tu compra!');
  carrito = [];
  actualizarCarrito();
}
