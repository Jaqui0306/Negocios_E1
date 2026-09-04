document.addEventListener("DOMContentLoaded", function () {

    var CLAVE_USUARIO = "techzone_usuario";

    var PRODUCTOS = {
        laptop: {
            nombre: 'Laptop Nimbus 14"',
            precio: "$14,999 MXN",
            categoria: "computo",
            descripcion: 'Laptop ligera pensada para clases y home office, con pantalla de 14" Full HD, 16 GB de RAM, 512 GB de almacenamiento y batería para todo el día.',
            imagen: "https://loremflickr.com/500/350/laptop,computer?lock=11"
        },
        mouse: {
            nombre: "Mouse inalámbrico Glide",
            precio: "$429 MXN",
            categoria: "computo",
            descripcion: "Mouse silencioso y preciso con sensor óptico de 1600 DPI, recargable por USB-C.",
            imagen: "https://loremflickr.com/500/350/mouse,computer?lock=22"
        },
        teclado: {
            nombre: "Teclado mecánico Type-X",
            precio: "$1,299 MXN",
            categoria: "computo",
            descripcion: "Teclado mecánico con switches táctiles, retroiluminación RGB y cable trenzado desmontable, ideal para trabajo y juego.",
            imagen: "https://loremflickr.com/500/350/keyboard,mechanical?lock=33"
        },
        monitor: {
            nombre: 'Monitor UltraView 24"',
            precio: "$3,199 MXN",
            categoria: "computo",
            descripcion: "Monitor Full HD de 24 pulgadas con panel IPS y 75 Hz, con entradas HDMI y VGA para conectar cualquier equipo.",
            imagen: "https://loremflickr.com/500/350/monitor,screen?lock=44"
        },
        audifonos: {
            nombre: "Audífonos Pulse ANC",
            precio: "$1,899 MXN",
            categoria: "audio",
            descripcion: "Audífonos inalámbricos con cancelación activa de ruido, hasta 30 horas de batería y conexión Bluetooth 5.3.",
            imagen: "https://loremflickr.com/500/350/headphones?lock=55"
        },
        bocina: {
            nombre: "Bocina portátil Boom Mini",
            precio: "$799 MXN",
            categoria: "audio",
            descripcion: "Bocina resistente al agua IPX6, con sonido estéreo y hasta 12 horas de batería.",
            imagen: "https://loremflickr.com/500/350/speaker,bluetooth?lock=66"
        },
        foco: {
            nombre: "Foco inteligente Orbit",
            precio: "$349 MXN",
            categoria: "hogar",
            descripcion: "Foco Wi-Fi controlable por app o por voz, con 16 millones de tonos de color para ambientar tu espacio.",
            imagen: "https://loremflickr.com/500/350/lightbulb,smart?lock=88"
        },
        camara: {
            nombre: "Cámara de seguridad SafeView",
            precio: "$899 MXN",
            categoria: "hogar",
            descripcion: "Cámara de seguridad con visión nocturna, detección de movimiento y grabación en la nube para cuidar tu hogar.",
            imagen: "https://loremflickr.com/500/350/security,camera?lock=99"
        },
        speaker: {
            nombre: "Bocina inteligente Echo Home",
            precio: "$1,599 MXN",
            categoria: "hogar",
            descripcion: "Bocina con asistente de voz integrado, sonido envolvente 360° y control de otros dispositivos inteligentes del hogar.",
            imagen: "https://loremflickr.com/500/350/smart,speaker?lock=77"
        },
        reloj: {
            nombre: "Reloj inteligente Orbit Fit",
            precio: "$2,299 MXN",
            categoria: "movil",
            descripcion: "Reloj resistente al agua con monitor de ritmo cardiaco y batería de hasta 7 días de duración.",
            imagen: "https://loremflickr.com/500/350/smartwatch?lock=110"
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

    // ---- Menú dinámico en páginas públicas (Nosotros, Catálogo, Detalle) ----
    // Sin sesión: solo Catálogo / Nosotros. Con sesión: menú principal completo.
    var navMenu = document.getElementById("nav-menu");
    if (navMenu && usuario) {
        var pagina = navMenu.getAttribute("data-pagina");
        var enlaces = [
            { href: "inicio.html", texto: "Inicio", id: "inicio" },
            { href: "productos.html", texto: "Catálogo", id: "productos" },
            { href: "nosotros.html", texto: "Nosotros", id: "nosotros" },
            { href: "index.html#contacto", texto: "Contacto", id: "contacto" },
            { href: "perfil.html", texto: "Perfil", id: "perfil" }
        ];
        var htmlMenu = "";
        enlaces.forEach(function (enlace) {
            var esActivo = (enlace.id === pagina) ? ' class="activo"' : "";
            htmlMenu += '<a href="' + enlace.href + '"' + esActivo + '>' + enlace.texto + '</a>';
        });
        navMenu.innerHTML = htmlMenu;
    }

    // ---- Mostrar/ocultar enlaces del menú fijo (inicio.html, perfil.html) según haya sesión ----
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
            imagenEl.innerHTML = '<img src="' + producto.imagen + '" alt="' + producto.nombre + '">';
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