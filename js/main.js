document.addEventListener("DOMContentLoaded", function () {

    var CLAVE_USUARIO = "techzone_usuario";

    var PRODUCTOS = {
        laptop: {
            nombre: 'Laptop Nimbus 14',
            precio: "$14,999 MXN",
            categoria: "computo",
            descripcion: 'Laptop ligera pensada para clases y home office. Cuenta con pantalla de 14" Full HD antirreflejo, 16 GB de RAM y 512 GB de almacenamiento SSD, ideal para trabajar, estudiar y entretenerte sin trabas durante todo el día.',
            imagenes: [
                "img/laptop.png",
                "img/laptop2.png",
                "img/laptop3.png",
                "img/laptop4.png",
            ],
            especificaciones: [
                'Pantalla 14" Full HD antirreflejo',
                "Procesador eficiente para uso diario",
                "16 GB de RAM y 512 GB de almacenamiento SSD",
                "Batería con autonomía de hasta 10 horas",
                "Peso ligero de 1.3 kg, fácil de transportar"
            ]
        },
        mouse: {
            nombre: "Mouse inalámbrico Glide",
            precio: "$429 MXN",
            categoria: "computo",
            descripcion: "Mouse inalámbrico silencioso y preciso, pensado para uso prolongado en oficina o clases. Su diseño ergonómico y sensor óptico de alta precisión lo hacen ideal para el día a día.",
            imagenes: [
                "img/mouse.jpg",
                "img/mouse2.png",
                "img/mouse3.png",
                "img/mouse4.png",
            ],
            especificaciones: [
                "Sensor óptico de 1600 DPI ajustable",
                "Diseño ergonómico para uso prolongado",
                "Clic silencioso",
                "Conexión inalámbrica 2.4 GHz",
                "Batería recargable por USB-C"
            ]
        },
        teclado: {
            nombre: "Teclado mecánico Type-X",
            precio: "$1,299 MXN",
            categoria: "computo",
            descripcion: "Teclado mecánico con switches táctiles y retroiluminación RGB personalizable, pensado tanto para trabajo como para gaming, con un cable trenzado resistente y desmontable.",
            imagenes: [
               "img/teclado.jpg",
               "img/teclado1.2.png",
               "img/teclado1.1.png",
               "img/teclado1.3.png",
            ],
            especificaciones: [
                "Switches mecánicos táctiles",
                "Retroiluminación RGB personalizable",
                "Cable trenzado desmontable",
                "Reposamuñecas incluido",
                "Compatible con Windows y Mac"
            ]
        },
        monitor: {
            nombre: 'Monitor UltraView 24',
            precio: "$3,199 MXN",
            categoria: "computo",
            descripcion: "Monitor de 24 pulgadas con panel IPS, ideal para trabajo, estudio y entretenimiento, con colores fieles y ángulos de visión amplios desde cualquier posición.",
            imagenes: [
                "img/monitor.png",
                "img/monitor2.png",
                "img/monitor3.png",
                "img/monitor4.png",
            ],
            especificaciones: [
                "Panel IPS con ángulos de visión amplios",
                "Resolución Full HD 1920x1080",
                "Frecuencia de actualización de 75 Hz",
                "Entradas HDMI y VGA",
                "Soporte ajustable en altura"
            ]
        },
        audifonos: {
            nombre: "Audífonos Pulse ANC",
            precio: "$1,899 MXN",
            categoria: "audio",
            descripcion: "Audífonos inalámbricos con cancelación activa de ruido, pensados para largas jornadas de trabajo, estudio o viaje, con un sonido nítido y cómodo ajuste.",
            imagenes: [
                "img/audifonos.jpg",
                "img/audifonos2.png",
                "img/audifonos3.png",
                "img/audifonos4.png",
            ],
            especificaciones: [
                "Cancelación activa de ruido (ANC)",
                "Hasta 30 horas de batería",
                "Bluetooth 5.3 de baja latencia",
                "Micrófono integrado para llamadas",
                "Estuche de carga incluido"
            ]
        },
        bocina: {
            nombre: "Bocina portátil Boom Mini",
            precio: "$799 MXN",
            categoria: "audio",
            descripcion: "Bocina compacta y resistente al agua, perfecta para llevar a cualquier lado, con sonido estéreo envolvente y batería de larga duración.",
            imagenes: [
                "img/bocina.jpg",
                "img/bocina2.png",
                "img/bocina3.png",
                "img/bocina4.png",
            ],
            especificaciones: [
                "Resistencia al agua IPX6",
                "Hasta 12 horas de batería",
                "Sonido estéreo",
                "Conexión Bluetooth 5.0",
                "Diseño compacto y portátil"
            ]
        },
        foco: {
            nombre: "Foco inteligente Orbit",
            precio: "$349 MXN",
            categoria: "hogar",
            descripcion: "Foco inteligente controlable desde tu celular o por voz, con millones de combinaciones de color para ambientar cualquier espacio de tu hogar.",
            imagenes: [
                "img/foco.jpg",
                "img/foco2.png",
                "img/foco3.png",
                "img/foco4.png",
            ],
            especificaciones: [
                "Control por app móvil o comandos de voz",
                "16 millones de combinaciones de color",
                "Compatible con Wi-Fi 2.4 GHz",
                "Programación de horarios de encendido",
                "Instalación en cualquier socket estándar"
            ]
        },
        camara: {
            nombre: "Cámara de seguridad SafeView",
            precio: "$899 MXN",
            categoria: "hogar",
            descripcion: "Cámara de seguridad para el hogar con visión nocturna y detección de movimiento, que te avisa a tu celular ante cualquier actividad inusual.",
            imagenes: [
                "img/camara.jpg",
                "img/camara2.png",
                "img/camara3.png",
                "img/camara4.png",
            ],
            especificaciones: [
                "Visión nocturna infrarroja",
                "Detección de movimiento con notificaciones",
                "Grabación en la nube y tarjeta SD",
                "Audio bidireccional",
                "Resistente a la intemperie"
            ]
        },
        speaker: {
            nombre: "Bocina inteligente Echo Home",
            precio: "$1,599 MXN",
            categoria: "hogar",
            descripcion: "Bocina inteligente con asistente de voz integrado, capaz de controlar otros dispositivos del hogar y ofrecer un sonido envolvente en cualquier habitación.",
            imagenes: [
                "img/bocinah.png",
                "img/bocinah2.png",
                "img/bocinah3.png",
                "img/bocinah4.png",
            ],
            especificaciones: [
                "Asistente de voz integrado",
                "Control de otros dispositivos del hogar",
                "Sonido envolvente 360°",
                "Conexión Wi-Fi y Bluetooth",
                "Diseño compacto para cualquier espacio"
            ]
        },
        reloj: {
            nombre: "Reloj inteligente Orbit Fit",
            precio: "$2,299 MXN",
            categoria: "movil",
            descripcion: "Reloj inteligente resistente al agua, con monitoreo de salud las 24 horas y notificaciones directas en tu muñeca, ideal para acompañarte en tu rutina diaria.",
            imagenes: [
                "img/reloj.jpg",
                "img/reloj2.png",
                "img/reloj3.png",
                "img/reloj4.png",

            ],
            especificaciones: [
                "Monitor de ritmo cardiaco 24/7",
                "Resistente al agua hasta 50 metros",
                "Batería con autonomía de hasta 7 días",
                "Notificaciones de llamadas y mensajes",
                "Modos de ejercicio integrados"
            ]
        }
    ,
        teclado_gamer: {
    nombre: "Teclado Gamer RGB Pro",
    precio: "$1,799 MXN",
    categoria: "computo",
    descripcion: "Teclado de alto rendimiento con iluminación RGB y diseño cómodo para estudio, trabajo y gaming.",
    imagenes: [
        "img/teclado2.png",
        "img/teclado22.png",
        "img/teclado23.png",
        "img/teclado24.png",
    ],
    especificaciones: [
        "Iluminación RGB",
        "Switches mecánicos",
        "Conexión USB",
        "Diseño ergonómico",
        "Compatible con Windows y Mac"
    ]
},

webcam: {
    nombre: "Webcam Vision HD",
    precio: "$699 MXN",
    categoria: "computo",
    descripcion: "Webcam compacta para clases, videollamadas y reuniones en línea.",
    imagenes: [
        "img/webcam.png",
        "img/webcam2.png",
        "img/webcam3.png",
        "img/webcam4.png"
    ],
    especificaciones: [
        "Resolución Full HD",
        "Micrófono integrado",
        "Enfoque automático",
        "Conexión USB",
        "Compatible con videollamadas"
    ]
},

barra: {
    nombre: "Barra de sonido SoundBar X",
    precio: "$1,499 MXN",
    categoria: "audio",
    descripcion: "Barra de sonido compacta para mejorar el audio de tu computadora, televisión o espacio de entretenimiento.",
    imagenes: [
        "img/barra.png",
        "img/barra2.png",
        "img/barra3.png",
        "img/barra4.png"
    ],
    especificaciones: [
        "Sonido estéreo",
        "Bluetooth",
        "Entrada auxiliar",
        "Control de volumen",
        "Diseño compacto"
    ]
},

microfono: {
    nombre: "Micrófono Stream Pro",
    precio: "$1,099 MXN",
    categoria: "audio",
    descripcion: "Micrófono USB pensado para clases, streaming, podcasts y videollamadas.",
    imagenes: [
        "img/microfono.png",
        "img/microfono2.png",
        "img/microfono3.png",
        "img/microfono4.png"
    ],
    especificaciones: [
        "Conexión USB",
        "Patrón cardioide",
        "Control de ganancia",
        "Base ajustable",
        "Indicador LED"
    ]
},

enchufe: {
    nombre: "Enchufe inteligente SmartPlug",
    precio: "$299 MXN",
    categoria: "hogar",
    descripcion: "Controla aparatos eléctricos desde tu celular y crea horarios para automatizar tu espacio.",
    imagenes: [
        "img/enchufe.png",
        "img/enchufe2.png",
        "img/enchufe3.png",
        "img/enchufe4.png"
    ],
    especificaciones: [
        "Control desde app",
        "Programación de horarios",
        "Wi-Fi 2.4 GHz",
        "Control por voz",
        "Formato compacto"
    ]
},

tira: {
    nombre: "Tira LED SmartGlow",
    precio: "$499 MXN",
    categoria: "hogar",
    descripcion: "Tira LED inteligente para ambientar escritorios, habitaciones y espacios de entretenimiento.",
    imagenes: [
        "img/tiraled.png",
        "img/tiraled2.png",
        "img/tiraled3.png",
        "img/tiraled4.png"
    ],
    especificaciones: [
        "Colores personalizables",
        "Control por app",
        "Temporizador",
        "Wi-Fi",
        "Instalación adhesiva"
    ]
},

cargador: {
    nombre: "Cargador rápido PowerGo",
    precio: "$549 MXN",
    categoria: "movil",
    descripcion: "Cargador compacto de carga rápida para dispositivos compatibles.",
    imagenes: [
        "img/cargador.png",
        "img/cargador2.png",
        "img/cargador3.png",
        "img/cargador4.png"
    ],
    especificaciones: [
        "Carga rápida",
        "Puerto USB-C",
        "Diseño compacto",
        "Protección contra sobrecarga",
        "Uso portátil"
    ]
},

powerbank: {
    nombre: "Power Bank Volt 20K",
    precio: "$899 MXN",
    categoria: "movil",
    descripcion: "Batería portátil de gran capacidad para mantener tus dispositivos cargados durante el día.",
    imagenes: [
        "img/powerbank.png",
        "img/powerbank2.png",
        "img/powerbank3.png",
        "img/powerbank4.png"
    ],
    especificaciones: [
        "20,000 mAh",
        "USB-C",
        "Indicador de carga",
        "Carga simultánea",
        "Diseño portátil"
    ]
},
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

    // ---- Menú dinámico: antes de iniciar sesión solo se muestran Nosotros y Contacto ----
    var navMenu = document.getElementById("nav-menu");
    if (navMenu) {
        var pagina = navMenu.getAttribute("data-pagina") || window.location.pathname.split("/").pop().toLowerCase();
        var enlacesPublicos = [
            { href: "nosotros.html", texto: "Nosotros", id: "nosotros" },
            { href: "contacto.html", texto: "Contacto", id: "contacto" }
        ];
        var enlacesCompletos = [
            { href: "inicio.html", texto: "Inicio", id: "inicio" },
            { href: "productos.html", texto: "Catálogo", id: "productos" },
            { href: "nosotros.html", texto: "Nosotros", id: "nosotros" },
            { href: "contacto.html", texto: "Contacto", id: "contacto" },
            { href: "perfil.html", texto: "Perfil", id: "perfil" },
            { href: "#", texto: "🛒 Carrito", id: "carrito" }
        ];
        var enlaces = usuario ? enlacesCompletos : enlacesPublicos;
        var htmlMenu = "";
        enlaces.forEach(function (enlace) {
            var esActivo = (enlace.id === pagina || pagina.indexOf(enlace.id) >= 0) ? ' class="activo"' : "";
            if (enlace.id === "carrito") {
                htmlMenu += '<a href="#" class="carrito-nav" aria-label="Carrito de compras (próximamente)" onclick="return false;">🛒 <span>Carrito</span><b class="carrito-badge">0</b></a>';
            } else {
                htmlMenu += '<a href="' + enlace.href + '"' + esActivo + '>' + enlace.texto + '</a>';
            }
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

    // ---- Formulario de registro (sin exigir llenar campos) ----
    var formRegistro = document.getElementById("formulario-registro");
    if (formRegistro) {
        formRegistro.addEventListener("submit", function (e) {
            e.preventDefault();
            var nombre = document.getElementById("nombre").value.trim() || "Cliente TechZone";
            var correo = document.getElementById("correo").value.trim() || "correo@ejemplo.com";
            guardarUsuario({ nombre: nombre, correo: correo });
            alert("Registro exitoso (simulado)");
            window.location.href = "login.html";
        });
    }

    // ---- Formulario de login (sin exigir llenar campos) ----
    var formLogin = document.getElementById("formulario-login");
    if (formLogin) {
        formLogin.addEventListener("submit", function (e) {
            e.preventDefault();
            var correo = document.getElementById("correo").value.trim();
            var existente = obtenerUsuario();
            guardarUsuario({
                nombre: existente ? existente.nombre : "Cliente TechZone",
                correo: correo || (existente ? existente.correo : "correo@ejemplo.com")
            });
            alert("Inicio de sesión exitoso (simulado)");
            window.location.href = "perfil.html";
        });
    }

    // ---- Formulario de contacto ----
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
            document.title = "TechZone - " + producto.nombre;

            var imagenPrincipal = document.getElementById("detalle-imagen-actual");
            var cajaImagen = document.getElementById("detalle-imagen");
            if (producto.imagenes && producto.imagenes.length) {
                imagenPrincipal.src = producto.imagenes[0];
                imagenPrincipal.alt = producto.nombre;
            } else {
                imagenPrincipal.style.display = "none";
                cajaImagen.insertAdjacentHTML("beforeend", '<div class="detalle-placeholder"><span>IMAGEN DEL PRODUCTO</span><small>Espacio reservado para la fotografía</small></div>');
            }
            cajaImagen.classList.add("producto-imagen-" + producto.categoria);

            var nombresCategoria = { computo: "Cómputo", audio: "Audio", hogar: "Hogar", movil: "Móvil" };
            var badge = document.getElementById("detalle-badge");
            badge.textContent = nombresCategoria[producto.categoria] || "Producto";
            badge.classList.add("badge-" + producto.categoria);

            var contenedorMiniaturas = document.getElementById("detalle-miniaturas");
            var contenedorSlots = document.getElementById("detalle-galeria-slots");
            var vistas = (producto.imagenes || []).filter(Boolean);
            var maxVistas = 4;
            vistas.slice(0, maxVistas).forEach(function (src, indice) {
                var mini = document.createElement("img");
                mini.src = src;
                mini.alt = producto.nombre + " - vista " + (indice + 1);
                if (indice === 0) mini.classList.add("activa");
                mini.addEventListener("click", function () {
                    imagenPrincipal.src = src;
                    contenedorMiniaturas.querySelectorAll("img").forEach(function (img) { img.classList.remove("activa"); });
                    mini.classList.add("activa");
                });
                contenedorMiniaturas.appendChild(mini);
            });
            if (contenedorSlots) {
                for (var vista = vistas.length; vista < maxVistas; vista++) {
                    var slot = document.createElement("div");
                    slot.className = "detalle-galeria-slot";
                    slot.innerHTML = '<span>＋</span><strong>Vista ' + (vista + 1) + '</strong><small>Coloca aquí una imagen</small>';
                    contenedorSlots.appendChild(slot);
                }
            }

            // Selector de cantidad y total estimado (simulado)
            var cantidadInput = document.getElementById("cantidad-producto");
            var cantidadMenos = document.getElementById("cantidad-menos");
            var cantidadMas = document.getElementById("cantidad-mas");
            var totalEl = document.getElementById("detalle-total");
            var precioNumerico = Number(String(producto.precio).replace(/[^0-9]/g, "")) || 0;
            function actualizarCantidad() {
                if (!cantidadInput) return;
                var cantidad = Math.min(10, Math.max(1, Number(cantidadInput.value) || 1));
                cantidadInput.value = cantidad;
                if (totalEl) totalEl.textContent = "$" + (precioNumerico * cantidad).toLocaleString("es-MX") + " MXN";
            }
            if (cantidadMenos) cantidadMenos.addEventListener("click", function(){ cantidadInput.value = Math.max(1, Number(cantidadInput.value || 1) - 1); actualizarCantidad(); });
            if (cantidadMas) cantidadMas.addEventListener("click", function(){ cantidadInput.value = Math.min(10, Number(cantidadInput.value || 1) + 1); actualizarCantidad(); });
            if (cantidadInput) cantidadInput.addEventListener("input", actualizarCantidad);
            actualizarCantidad();

            var listaEspecs = document.getElementById("detalle-especificaciones");
            producto.especificaciones.forEach(function (item) {
                var li = document.createElement("li");
                li.textContent = item;
                listaEspecs.appendChild(li);
            });

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

/* ============================================================
   ZOOM DE IMAGEN EN DETALLE DE PRODUCTO
   ============================================================ */
document.addEventListener("DOMContentLoaded", function () {
    var zoomBox = document.getElementById("detalle-imagen");
    var zoomImg = document.getElementById("detalle-imagen-actual");

    if (!zoomBox || !zoomImg) return;

    zoomBox.addEventListener("mouseenter", function () {
        zoomBox.classList.add("zoom-activo");
    });

    zoomBox.addEventListener("mousemove", function (event) {
        var rect = zoomBox.getBoundingClientRect();
        var x = ((event.clientX - rect.left) / rect.width) * 100;
        var y = ((event.clientY - rect.top) / rect.height) * 100;

        x = Math.max(0, Math.min(100, x));
        y = Math.max(0, Math.min(100, y));

        zoomImg.style.transformOrigin = x + "% " + y + "%";
        zoomImg.style.transform = "scale(2.15)";
    });

    zoomBox.addEventListener("mouseleave", function () {
        zoomBox.classList.remove("zoom-activo");
        zoomImg.style.transformOrigin = "50% 50%";
        zoomImg.style.transform = "scale(1)";
    });
});
