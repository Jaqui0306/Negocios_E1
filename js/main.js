document.addEventListener("DOMContentLoaded", function () {

    var CLAVE_USUARIO = "techzone_usuario";

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
        window.location.href = "index.html";
    }

    // ---- Mostrar/ocultar "Perfil" en el menú según haya sesión ----
    var usuario = obtenerUsuario();
    var enlacePerfil = document.querySelector('nav a[href="perfil.html"]');
    if (enlacePerfil && !usuario) {
        enlacePerfil.style.display = "none";
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
            window.location.href = "perfil.html";
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
            window.location.href = "perfil.html";
        });
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