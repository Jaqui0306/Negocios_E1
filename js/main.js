document.addEventListener("DOMContentLoaded", function () {

    var CLAVE_USUARIO = "techzone_usuario";

    var PRODUCTOS = {
        laptop: {
            nombre: 'Laptop Nimbus 14"',
            precio: "$14,999 MXN",
            categoria: "computo",
            descripcion: 'Laptop ligera pensada para clases y home office, con pantalla de 14" Full HD, 16 GB de RAM, 512 GB de almacenamiento y batería para todo el día.',
            icono: '<svg viewBox="0 0 64 64" fill="none" stroke="#14171C" stroke-width="3"><rect x="10" y="14" width="44" height="28" rx="3"/><path d="M4 50h56l-6-8H10z"/></svg>'
        },
        audifonos: {
            nombre: "Audífonos Pulse ANC",
            precio: "$1,899 MXN",
            categoria: "audio",
            descripcion: "Audífonos inalámbricos con cancelación activa de ruido, hasta 30 horas de batería y conexión Bluetooth 5.3.",
            icono: '<svg viewBox="0 0 64 64" fill="none" stroke="#14171C" stroke-width="3"><path d="M10 34v-4a22 22 0 0 1 44 0v4"/><rect x="6" y="34" width="14" height="18" rx="6"/><rect x="44" y="34" width="14" height="18" rx="6"/></svg>'
        },
        foco: {
            nombre: "Foco inteligente Orbit",
            precio: "$349 MXN",
            categoria: "hogar",
            descripcion: "Foco Wi-Fi controlable por app o por voz, con 16 millones de tonos de color para ambientar tu espacio.",
            icono: '<svg viewBox="0 0 64 64" fill="none" stroke="#14171C" stroke-width="3"><circle cx="32" cy="26" r="16"/><path d="M32 42v8M24 54h16M26 58h12"/></svg>'
        },
        reloj: {
            nombre: "Reloj inteligente Orbit Fit",
            precio: "$2,299 MXN",
            categoria: "movil",
            descripcion: "Reloj resistente al agua con monitor de ritmo cardiaco y batería de hasta 7 días de duración.",
            icono: '<svg viewBox="0 0 64 64" fill="none" stroke="#14171C" stroke-width="3"><rect x="18" y="18" width="28" height="28" rx="6"/><path d="M26 10h12M26 54h12"/></svg>'
        },
        mouse: {
            nombre: "Mouse inalámbrico Glide",
            precio: "$429 MXN",
            categoria: "computo",
            descripcion: "Mouse silencioso y preciso con sensor óptico de 1600 DPI, recargable por USB-C.",
            icono: '<svg viewBox="0 0 64 64" fill="none" stroke="#14171C" stroke-width="3"><rect x="20" y="10" width="24" height="44" rx="12"/><path d="M32 10v16"/></svg>'
        },
        bocina: {
            nombre: "Bocina portátil Boom Mini",
            precio: "$799 MXN",
            categoria: "audio",
            descripcion: "Bocina resistente al agua IPX6, con sonido estéreo y hasta 12 horas de batería.",
            icono: '<svg viewBox="0 0 64 64" fill="none" stroke="#14171C" stroke-width="3"><rect x="14" y="8" width="36" height="48" rx="10"/><circle cx="32" cy="24" r="6"/><circle cx="32" cy="42" r="9"/></svg>'
        }
    };

    function obtenerUsuario() {
        try {
            var datos = localStorage.getItem(CLAVE_USUARIO);
            return datos ? JSON.parse(datos) : null;
        } catch (error) {
            return null;
        }
    }

    function guardarUsuario(usuario) {
        localStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuario));
    }

    function cerrarSesion() {
        localStorage.removeItem(CLAVE_USUARIO);
        alert("Cerraste sesión correctamente.");
        window.location.href = "index.html";
    }

    var usuario = obtenerUsuario();

    // ---- Mostrar/ocultar enlaces del menú según haya sesión ----
    var enlacePerfil = document.querySelector('nav a[href="perfil.html"]');
    var enlaceRegistro = document.querySelector('nav a[href="registro.html"]');
    var enlaceLogin = document.querySelector('nav a[href="login.html"]');

    if (usuario) {
        if (enlacePerfil) enlacePerfil.style.display = "";
        if (enlaceRegistro) enlaceRegistro.style.display = "none";
        if (enlaceLogin) enlaceLogin.style.display = "none";
    } else {
        if (enlacePerfil) enlacePerfil.style.display = "none";
    }

    // ---- Formulario de registro ----
    var formRegistro = document.getElementById("formulario-registro");
    if (formRegistro) {
        formRegistro.addEventListener("submit", function (e) {
            e.preventDefault();
            var nombre = document.getElementById("nombre").value.trim();
            var correo = document.getElementById("correo").value.trim();
            if (!nombre || !correo) return;
            guardarUsuario({ nombre: nombre, correo: correo });
            alert("Registro exitoso (simulado)");
            window.location.href = "login.html";
        });
    }

    // ---- Formulario de login ----
    var formLogin = document.getElementById("formulario-login");
    if (formLogin) {
        formLogin.addEventListener("submit", function (e) {
            e.preventDefault();
            var correo = document.getElementById("correo").value.trim();
            if (!correo) return;
            var existente = obtenerUsuario();
            guardarUsuario({
                nombre: existente ? existente.nombre : "Cliente TechZone",
                correo: correo
            });
            alert("Inicio de sesión exitoso (simulado)");
            window.location.href = "inicio.html";
        });
    }

    // ---- Formulario de contacto (index.html) ----
    var formContacto = document.getElementById("formulario-contacto");
    if (formContacto) {
        formContacto.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Mensaje enviado (simulado)");
            formContacto.reset();
        });
    }

    // ---- Página de detalle de producto ----
    var contenedorDetalle = document.getElementById("detalle-producto");
    if (contenedorDetalle) {
        var params = new URLSearchParams(window.location.search);
        var idProducto = params.get("id");
        var producto = PRODUCTOS[idProducto];

        if (producto) {
            document.getElementById("detalle-nombre").textContent = producto.nombre;
            document.getElementById("detalle-precio").textContent = producto.precio;
            document.getElementById("detalle-descripcion").textContent = producto.descripcion;
            var imagenEl = document.getElementById("detalle-imagen");
            imagenEl.innerHTML = producto.icono;
            imagenEl.classList.add("producto-imagen-" + producto.categoria);
            document.title = "TechZone - " + producto.nombre;
        } else {
            document.getElementById("detalle-nombre").textContent = "Producto no encontrado";
            document.getElementById("detalle-descripcion").textContent = "Regresa al catálogo para ver los productos disponibles.";
        }

        var botonCarrito = document.getElementById("boton-agregar-carrito");
        if (botonCarrito) {
            botonCarrito.addEventListener("click", function () {
                if (obtenerUsuario()) {
                    alert("Función próximamente disponible. Aún no hay carrito de compras.");
                } else {
                    alert("Inicia sesión para poder comprar más adelante.");
                    window.location.href = "login.html";
                }
            });
        }
    }

    // ---- Página de perfil: proteger, rellenar datos y logout ----
    var contenedorPerfil = document.getElementById("perfil-datos");
    if (contenedorPerfil) {
        if (!usuario) {
            window.location.href = "login.html";
            return;
        }
        var nombreEl = document.getElementById("perfil-nombre");
        var correoEl = document.getElementById("perfil-correo");
        var inicialesEl = document.getElementById("perfil-iniciales");
        if (nombreEl) nombreEl.textContent = usuario.nombre;
        if (correoEl) correoEl.textContent = usuario.correo;
        if (inicialesEl) {
            var partes = usuario.nombre.trim().split(/\s+/);
            var iniciales = (partes[0][0] || "") + (partes[1] ? partes[1][0] : "");
            inicialesEl.textContent = iniciales.toUpperCase();
        }

        var botonSalir = document.getElementById("boton-cerrar-sesion");
        if (botonSalir) {
            botonSalir.addEventListener("click", cerrarSesion);
        }
    }

});