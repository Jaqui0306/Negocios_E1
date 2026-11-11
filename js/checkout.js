window.TZP = (function () {
    var K_PEDIDOS = "techzone_pedidos";
    var K_FOLIO = "techzone_folio_contador";
    var K_SEMILLA = "techzone_pedidos_semilla";
    var K_SALDO = "techzone_wallet_saldo";
    var SALDO_INICIAL = 15000;
    var NEGOCIO = { nombre: "TechZone", giro: "Tienda de dispositivos electrónicos", rfc: "TZN260101XXX (demostrativo)", web: "Sitio demostrativo · Compra simulada" };

    function leerJSON(k, d) { try { var x = JSON.parse(localStorage.getItem(k)); return x == null ? d : x; } catch (e) { return d; } }
    function escribir(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } }
    function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
    function fmt(n) { return "$" + Number(n || 0).toLocaleString("es-MX") + " MXN"; }
    function fechaLarga(iso) {
        var d = new Date(iso);
        return d.toLocaleDateString("es-MX", { day: "2-digit", month: "long", year: "numeric" }) + " · " + d.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });
    }
    function usuario() { return window.TZ && TZ.usuario ? TZ.usuario() : null; }
    function invitado() { try { var g = localStorage.getItem("techzone_invitado_sid"); if (!g) { g = "inv_" + Date.now() + "_" + Math.floor(Math.random() * 1e6); localStorage.setItem("techzone_invitado_sid", g); } return g; } catch (e) { return "inv_local"; } }
    function dueno() { var u = usuario(); return u ? String(u.correo || u.sid || "").toLowerCase() : invitado(); }

    // ----- Saldo del e-wallet simulado -----
    function saldo() { var s = Number(localStorage.getItem(K_SALDO)); return isFinite(s) && localStorage.getItem(K_SALDO) !== null ? s : SALDO_INICIAL; }
    function setSaldo(n) { try { localStorage.setItem(K_SALDO, String(Math.max(0, Math.round(n)))); } catch (e) {} }

    // ----- Pedidos -----
    function todos() { var a = leerJSON(K_PEDIDOS, []); return Array.isArray(a) ? a : []; }
    function guardarPedido(p) { var a = todos(); a.unshift(p); return escribir(K_PEDIDOS, a.slice(0, 200)); }
    function ordenar(a) { return a.slice().sort(function (x, y) { return new Date(y.fecha) - new Date(x.fecha); }); }

    // Dos pedidos de ejemplo la primera vez que un usuario abre "Mis compras".
    function sembrar() {
        var d = dueno(); if (!d) return;
        var hechos = leerJSON(K_SEMILLA, []); if (!Array.isArray(hechos)) hechos = [];
        if (hechos.indexOf(d) >= 0) return;
        var u = usuario() || {}, ahora = Date.now(), dia = 86400000;
        var base = { cliente: { nombre: u.nombre || "Cliente TechZone", correo: u.correo || "correo@ejemplo.com", telefono: u.telefono || "" }, direccion: { calle: "Av. Reforma 123", colonia: "Centro", ciudad: "Ciudad de México", estado: "CDMX", cp: "06000" }, envio: 0, descuento: 0, codigo: "", estado: "Pagado", ejemplo: true, owner: d };
        var ej = [
            { num: "TZ-482130", folio: "FAC-2026-000041", fecha: new Date(ahora - 34 * dia).toISOString(), metodo: { tipo: "tarjeta", etiqueta: "Tarjeta •••• 4242" }, items: [{ id: "mouse", nombre: "Mouse inalámbrico Glide", precio: 429, cantidad: 1, imagen: "img/mouse2.png" }, { id: "teclado", nombre: "Teclado mecánico Type-X", precio: 1299, cantidad: 1, imagen: "img/teclado.jpg" }] },
            { num: "TZ-517764", folio: "FAC-2026-000058", fecha: new Date(ahora - 12 * dia).toISOString(), metodo: { tipo: "wallet", etiqueta: "E-wallet TechZone Pay" }, items: [{ id: "audifonos", nombre: "Audífonos Pulse ANC", precio: 1899, cantidad: 1, imagen: "img/audifonos.jpg" }] }
        ];
        var a = todos();
        ej.forEach(function (e) {
            var p = Object.assign({}, base, e);
            p.subtotal = p.items.reduce(function (s, i) { return s + i.precio * i.cantidad; }, 0);
            p.total = p.subtotal;
            a.push(p);
        });
        escribir(K_PEDIDOS, a);
        hechos.push(d); escribir(K_SEMILLA, hechos);
    }
    function actualizarEstado(num, estado) {
        var a = todos(); a.forEach(function (p) { if (p.num === num) p.estado = estado; }); return escribir(K_PEDIDOS, a);
    }
    function propios() { sembrar(); var d = dueno(); return ordenar(todos().filter(function (p) { return p.owner === d; })); }
    function porNumero(num) { var d = dueno(); return todos().filter(function (p) { return p.num === num && p.owner === d; })[0] || null; }

    function siguienteFolio() {
        var n = Number(localStorage.getItem(K_FOLIO)) || 100;
        n += 1; try { localStorage.setItem(K_FOLIO, String(n)); } catch (e) {}
        return "FAC-" + new Date().getFullYear() + "-" + String(n).padStart(6, "0");
    }
    function numeroPedido() {
        var usados = todos().map(function (p) { return p.num; }), n;
        do { n = "TZ-" + (100000 + Math.floor(Math.random() * 900000)); } while (usados.indexOf(n) >= 0);
        return n;
    }

    // ----- Ticket / factura visual (se usa en comprobante y se imprime a PDF) -----
    function ticketHTML(p) {
        var filas = p.items.map(function (i) {
            return "<tr><td>" + esc(i.nombre) + "</td><td class='c'>" + Number(i.cantidad) + "</td><td class='r'>" + fmt(i.precio) + "</td><td class='r'>" + fmt(i.precio * i.cantidad) + "</td></tr>";
        }).join("");
        var d = p.direccion || {}, c = p.cliente || {};
        var dir = [d.calle, d.colonia, d.ciudad + (d.estado ? ", " + d.estado : ""), d.cp ? "C.P. " + d.cp : ""].filter(Boolean).join(" · ");
        return '<article class="co-ticket" id="co-ticket">' +
            '<div class="co-t-cab"><div class="co-t-marca"><img src="img/logo.svg" alt="">' + '<div><strong>' + esc(NEGOCIO.nombre) + '</strong><span>' + esc(NEGOCIO.giro) + '</span></div></div>' +
            '<div class="co-t-folio"><span>Comprobante de compra</span><strong>' + esc(p.folio) + '</strong></div></div>' +
            '<div class="co-t-meta">' +
            '<div><span>Fecha</span><strong>' + esc(fechaLarga(p.fecha)) + '</strong></div>' +
            '<div><span>Pedido</span><strong>' + esc(p.num) + '</strong></div>' +
            '<div><span>Estado</span><strong class="co-ok">' + esc(p.estado || "Pagado") + '</strong></div></div>' +
            '<div class="co-t-datos"><div><h4>Datos del cliente</h4><p><strong>' + esc(c.nombre) + '</strong><br>' + esc(c.correo) + (c.telefono ? '<br>Tel. ' + esc(c.telefono) : '') + '</p></div>' +
            '<div><h4>Envío a</h4><p>' + esc(dir || "—") + '</p></div>' +
            '<div><h4>Método de pago</h4><p>' + esc((p.metodo && p.metodo.etiqueta) || "—") + '</p></div></div>' +
            '<table class="co-t-tabla"><thead><tr><th>Producto</th><th class="c">Cant.</th><th class="r">Precio</th><th class="r">Importe</th></tr></thead><tbody>' + filas + '</tbody></table>' +
            '<div class="co-t-totales"><div><span>Subtotal</span><span>' + fmt(p.subtotal) + '</span></div>' +
            (p.descuento > 0 ? '<div><span>Descuento' + (p.codigo ? ' (' + esc(p.codigo) + ')' : '') + '</span><span>−' + fmt(p.descuento) + '</span></div>' : '') +
            '<div><span>Envío</span><span>Gratis</span></div>' +
            '<div class="co-t-total"><span>Total pagado</span><span>' + fmt(p.total) + '</span></div></div>' +
            '<div class="co-t-pie"><p>' + esc(NEGOCIO.nombre) + ' · RFC ' + esc(NEGOCIO.rfc) + '</p><p>Documento demostrativo sin validez fiscal. No se realizó ningún cargo real.</p></div></article>';
    }

    // "Descargar PDF": abre el cuadro de impresión del navegador (opción «Guardar como PDF»).
    function descargarPDF(p) {
        var titulo = document.title;
        document.title = "Comprobante " + p.folio;
        var restaurar = function () { document.title = titulo; window.removeEventListener("afterprint", restaurar); };
        window.addEventListener("afterprint", restaurar);
        window.print();
    }

    return { NEGOCIO: NEGOCIO, fmt: fmt, esc: esc, fechaLarga: fechaLarga, usuario: usuario, dueno: dueno, saldo: saldo, setSaldo: setSaldo, SALDO_INICIAL: SALDO_INICIAL,
        todos: todos, actualizarEstado: actualizarEstado, ordenar: ordenar, propios: propios, porNumero: porNumero, guardarPedido: guardarPedido, siguienteFolio: siguienteFolio, numeroPedido: numeroPedido, ticketHTML: ticketHTML, descargarPDF: descargarPDF };
})();

/* ============================================================
   Página: checkout.html
   ============================================================ */
document.addEventListener("DOMContentLoaded", function () {
    var raiz = document.getElementById("co-app");
    if (!raiz) return;
    var $ = function (id) { return document.getElementById(id); };
    var P = window.TZP;

    var u = P.usuario() || {};

    var carrito = obtenerCarrito();
    if (!carrito.length) { $("co-vacio").hidden = false; $("co-flujo").hidden = true; return; }

    var pct = parseFloat(localStorage.getItem("techzone_descuento_porcentaje") || "0") || 0;
    var codigo = localStorage.getItem("techzone_codigo_descuento") || "";
    var subtotal = carrito.reduce(function (s, i) { return s + (Number(i.precio) || 0) * Math.max(1, Number(i.cantidad) || 1); }, 0);
    var descuento = Math.round(subtotal * (pct / 100));
    var total = Math.max(0, subtotal - descuento);

    // Resumen lateral
    $("co-items").innerHTML = carrito.map(function (i) {
        var c = Math.max(1, Number(i.cantidad) || 1);
        return '<li><img src="' + P.esc(i.imagen) + '" alt=""><div><strong>' + P.esc(i.nombre) + '</strong><span>' + c + ' × ' + P.fmt(i.precio) + '</span></div><b>' + P.fmt((Number(i.precio) || 0) * c) + '</b></li>';
    }).join("");
    $("co-subtotal").textContent = P.fmt(subtotal);
    if (descuento > 0) { $("co-fila-desc").hidden = false; $("co-descuento").textContent = "−" + P.fmt(descuento); $("co-codigo").textContent = codigo ? "(" + codigo + ")" : ""; }
    $("co-total").textContent = P.fmt(total);

    // ----- Estado del flujo -----
    var paso = 1, direccion = null, metodo = null; // metodo: {tipo, etiqueta}
    var pasos = [$("co-paso-1"), $("co-paso-2"), $("co-paso-3")];
    var indicadores = document.querySelectorAll(".co-stepper li");

    function ir(n) {
        paso = n;
        pasos.forEach(function (el, i) { el.hidden = (i + 1) !== n; });
        indicadores.forEach(function (li, i) { li.classList.toggle("activo", i + 1 === n); li.classList.toggle("hecho", i + 1 < n); li.setAttribute("aria-current", i + 1 === n ? "step" : "false"); });
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function error(campo, msg) {
        var el = $(campo); if (!el) return;
        var m = el.parentNode.querySelector(".co-error");
        if (!m) { m = document.createElement("small"); m.className = "co-error"; el.parentNode.appendChild(m); }
        m.textContent = msg || ""; el.classList.toggle("invalido", !!msg);
    }
    function limpiarErrores(form) { form.querySelectorAll(".co-error").forEach(function (e) { e.textContent = ""; }); form.querySelectorAll(".invalido").forEach(function (e) { e.classList.remove("invalido"); }); }
    function primerError(form) { var e = form.querySelector(".invalido"); if (e) e.focus(); }

    // ----- Paso 1: dirección -----
    var fDir = $("co-form-dir");
    $("dir-nombre").value = u.nombre || ""; $("dir-correo").value = u.correo || ""; $("dir-tel").value = u.telefono || "";
    if (u.direccion) $("dir-calle").value = u.direccion;
    fDir.addEventListener("submit", function (e) {
        e.preventDefault(); limpiarErrores(fDir);
        var v = {
            nombre: $("dir-nombre").value.trim(), correo: $("dir-correo").value.trim(), telefono: $("dir-tel").value.trim(),
            calle: $("dir-calle").value.trim(), colonia: $("dir-colonia").value.trim(), ciudad: $("dir-ciudad").value.trim(), estado: $("dir-estado").value.trim(), cp: $("dir-cp").value.trim()
        };
        v.telefono = v.telefono.replace(/[\s-]/g, "");
        v.nombre = v.nombre || "Cliente TechZone"; v.correo = v.correo || "correo@ejemplo.com"; v.telefono = v.telefono || "—"; v.calle = v.calle || "Sin calle"; v.colonia = v.colonia || "Sin colonia"; v.ciudad = v.ciudad || "Sin ciudad"; v.estado = v.estado || "Sin estado"; v.cp = v.cp || "00000";
        direccion = v; ir(2);
    });

    // ----- Paso 2: método de pago -----
    var radios = document.querySelectorAll('input[name="co-metodo"]');
    var paneles = { tarjeta: $("co-pan-tarjeta"), transferencia: $("co-pan-transferencia"), wallet: $("co-pan-wallet") };
    var refTransf = "TZ" + String(Date.now()).slice(-8);
    $("co-ref").textContent = refTransf;
    function pintarWallet() {
        var s = P.saldo();
        $("co-saldo").textContent = P.fmt(s);
        var falta = total - s;
        var aviso = $("co-wallet-aviso");
        aviso.textContent = falta > 0 ? "Saldo insuficiente: te faltan " + P.fmt(falta) + ". Recarga saldo simulado para continuar." : "Saldo suficiente para esta compra.";
        aviso.className = "co-aviso " + (falta > 0 ? "mal" : "bien");
    }
    function elegido() { var r = document.querySelector('input[name="co-metodo"]:checked'); return r ? r.value : ""; }
    function mostrarPanel() {
        var t = elegido();
        Object.keys(paneles).forEach(function (k) { paneles[k].hidden = k !== t; });
        document.querySelectorAll(".co-opcion").forEach(function (l) { l.classList.toggle("sel", l.querySelector("input").checked); });
        if (t === "wallet") pintarWallet();
    }
    radios.forEach(function (r) { r.addEventListener("change", mostrarPanel); });
    $("co-recargar").addEventListener("click", function () { P.setSaldo(P.saldo() + 5000); pintarWallet(); });

    $("co-num").addEventListener("input", function () {
        var d = this.value.replace(/\D/g, "").slice(0, 16);
        this.value = d.replace(/(.{4})/g, "$1 ").trim();
    });
    $("co-exp").addEventListener("input", function () {
        var d = this.value.replace(/\D/g, "").slice(0, 4);
        this.value = d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d;
    });
    $("co-cvv").addEventListener("input", function () { this.value = this.value.replace(/\D/g, "").slice(0, 4); });

    var fPago = $("co-form-pago");
    $("co-atras-2").addEventListener("click", function () { ir(1); });
    fPago.addEventListener("submit", function (e) {
        e.preventDefault(); limpiarErrores(fPago);
        var t = elegido(), ok = true;
        $("co-error-metodo").textContent = "";
        if (!t) { $("co-error-metodo").textContent = "Elige un método de pago."; return; }
        if (t === "tarjeta") {
            var nombre = $("co-titular").value.trim(), num = $("co-num").value.replace(/\s/g, ""), exp = $("co-exp").value, cvv = $("co-cvv").value;
            metodo = { tipo: "tarjeta", etiqueta: "Tarjeta •••• " + (num.slice(-4) || "----"), titular: nombre };
        } else if (t === "transferencia") {
            metodo = { tipo: "transferencia", etiqueta: "Transferencia · ref. " + refTransf };
        } else {
            if (P.saldo() < total) { $("co-error-metodo").textContent = "Tu saldo no alcanza para esta compra. Recarga saldo simulado."; return; }
            metodo = { tipo: "wallet", etiqueta: "E-wallet TechZone Pay" };
        }
        pintarConfirmacion(); ir(3);
    });

    // ----- Paso 3: confirmación y pago -----
    function pintarConfirmacion() {
        $("co-conf-dir").innerHTML = '<strong>' + P.esc(direccion.nombre) + '</strong><br>' + P.esc(direccion.calle) + ', ' + P.esc(direccion.colonia) + '<br>' + P.esc(direccion.ciudad) + ', ' + P.esc(direccion.estado) + ' · C.P. ' + P.esc(direccion.cp) + '<br>' + P.esc(direccion.correo) + ' · Tel. ' + P.esc(direccion.telefono);
        $("co-conf-metodo").textContent = metodo.etiqueta;
        $("co-conf-total").textContent = P.fmt(total);
    }
    $("co-atras-3").addEventListener("click", function () { ir(2); });
    $("co-editar-dir").addEventListener("click", function () { ir(1); });
    $("co-editar-metodo").addEventListener("click", function () { ir(2); });

    var pagando = false;
    $("co-pagar").addEventListener("click", function () {
        if (pagando) return;
        if (metodo.tipo === "wallet" && P.saldo() < total) { mostrarMensaje("Saldo insuficiente", "Recarga saldo simulado en el paso del método de pago.", "info"); return; }
        pagando = true;
        var btn = this; btn.disabled = true; btn.classList.add("cargando"); btn.textContent = "Procesando pago…";
        setTimeout(function () {
            if (metodo.tipo === "wallet") P.setSaldo(P.saldo() - total);
            var pedido = {
                num: P.numeroPedido(), folio: P.siguienteFolio(), fecha: new Date().toISOString(), owner: P.dueno(), estado: "Pagado",
                cliente: { nombre: direccion.nombre, correo: direccion.correo, telefono: direccion.telefono },
                direccion: { calle: direccion.calle, colonia: direccion.colonia, ciudad: direccion.ciudad, estado: direccion.estado, cp: direccion.cp },
                metodo: { tipo: metodo.tipo, etiqueta: metodo.etiqueta },
                items: carrito.map(function (i) { return { id: i.id, nombre: i.nombre, precio: Number(i.precio) || 0, cantidad: Math.max(1, Number(i.cantidad) || 1), imagen: i.imagen || "" }; }),
                subtotal: subtotal, descuento: descuento, codigo: descuento > 0 ? codigo : "", envio: 0, total: total
            };
            if (!P.guardarPedido(pedido)) {
                pagando = false; btn.disabled = false; btn.classList.remove("cargando"); btn.textContent = "Pagar";
                mostrarMensaje("No se pudo guardar", "El almacenamiento del navegador está lleno.", "info"); return;
            }
            guardarCarrito([]);
            localStorage.removeItem("techzone_codigo_descuento"); localStorage.removeItem("techzone_descuento_porcentaje");
            actualizarBadgesCarrito();
            mostrarExito(pedido);
        }, 1400);
    });

    function mostrarExito(p) {
        $("co-flujo").hidden = true;
        var ex = $("co-exito"); ex.hidden = false;
        $("ex-num").textContent = p.num;
        $("ex-metodo").textContent = p.metodo.etiqueta;
        $("ex-fecha").textContent = P.fechaLarga(p.fecha);
        $("ex-items").innerHTML = p.items.map(function (i) { return '<li><span>' + i.cantidad + ' × ' + P.esc(i.nombre) + '</span><b>' + P.fmt(i.precio * i.cantidad) + '</b></li>'; }).join("");
        $("ex-total").textContent = P.fmt(p.total);
        $("ex-nota").textContent = p.metodo.tipo === "transferencia" ? "Pago por transferencia registrado (simulado). Conserva tu referencia " + refTransf + "." : "";
        $("ex-comprobante").href = "comprobante.html?pedido=" + encodeURIComponent(p.num);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    ir(1); mostrarPanel();
});

/* ============================================================
   Página: comprobante.html (ticket / factura visual)
   ============================================================ */
document.addEventListener("DOMContentLoaded", function () {
    var cont = document.getElementById("co-comprobante");
    if (!cont) return;
    var P = window.TZP;
    P.propios(); // asegura pedidos de ejemplo
    var num = new URLSearchParams(location.search).get("pedido") || "";
    var p = P.porNumero(num);
    if (!p) {
        cont.innerHTML = '<div class="co-vacio-caja"><h2>No encontramos ese pedido</h2><p>Puede que no exista o que pertenezca a otra cuenta.</p><a class="boton" href="mis-compras.html">Ir a Mis compras</a></div>';
        return;
    }
    cont.innerHTML = '<div class="co-acciones co-noprint"><a class="boton boton-contorno" href="mis-compras.html">← Mis compras</a><button type="button" class="boton" id="co-pdf">⬇ Descargar PDF</button></div>' +
        P.ticketHTML(p) + '<p class="co-ayuda co-noprint">Se abrirá el cuadro de impresión de tu navegador: elige «Guardar como PDF» como destino.</p>';
    document.getElementById("co-pdf").addEventListener("click", function () { P.descargarPDF(p); });
});

/* ============================================================
   Páginas: mis-compras.html y bloque «Mis compras» del perfil
   ============================================================ */
document.addEventListener("DOMContentLoaded", function () {
    var lista = document.getElementById("co-historial");
    if (!lista) return;
    var P = window.TZP;
    var compacto = lista.hasAttribute("data-compacto");
    if (compacto && !P.usuario()) return;
    var pedidos = P.propios();
    if (compacto) pedidos = pedidos.slice(0, 3);
    if (!pedidos.length) {
        lista.innerHTML = '<div class="co-vacio-caja"><h2>Aún no tienes compras</h2><p>Cuando completes un pago aparecerá aquí.</p><a class="boton" href="productos.html">Explorar catálogo</a></div>';
        return;
    }
    lista.innerHTML = pedidos.map(function (p) {
        var n = p.items.reduce(function (s, i) { return s + i.cantidad; }, 0);
        var miniaturas = p.items.slice(0, 3).map(function (i) { return '<img src="' + P.esc(i.imagen || "img/teclado.jpg") + '" alt="" onerror="this.src=\'img/teclado.jpg\'">'; }).join("");
        return '<article class="co-pedido"><div class="co-pedido-minis">' + miniaturas + '</div>' +
            '<div class="co-pedido-info"><strong>Pedido ' + P.esc(p.num) + '</strong><span>' + P.esc(P.fechaLarga(p.fecha)) + '</span>' +
            '<span>' + n + ' artículo' + (n === 1 ? '' : 's') + ' · ' + P.esc(p.metodo.etiqueta) + '</span>' +
            (p.ejemplo ? '<small class="co-chip-ejemplo">Pedido de ejemplo</small>' : '') + '</div>' +
            '<div class="co-pedido-der"><span class="co-estado">' + P.esc(p.estado || "Pagado") + '</span><b>' + P.fmt(p.total) + '</b>' +
            '<a class="boton boton-contorno" href="comprobante.html?pedido=' + encodeURIComponent(p.num) + '">Ver detalle</a></div></article>';
    }).join("");
    if (compacto && P.propios().length > 3) lista.insertAdjacentHTML("beforeend", '<p style="text-align:center;margin-top:12px"><a href="mis-compras.html">Ver todas mis compras →</a></p>');
});

/* ============================================================
   Panel del administrador: pedidos en vivo
   ============================================================ */
document.addEventListener("DOMContentLoaded", function () {
    var tbody = document.getElementById("admin-lista-pedidos");
    if (!tbody) return;
    var P = window.TZP, ESTADOS = ["Pagado", "En preparación", "Enviado", "Entregado", "Cancelado"];
    var $ = function (id) { return document.getElementById(id); };
    function pintar() {
        var ps = P.ordenar(P.todos()), hoy = new Date().toDateString();
        $("admin-total-pedidos").textContent = ps.length;
        $("ped-hoy").textContent = ps.filter(function (p) { return new Date(p.fecha).toDateString() === hoy; }).length;
        $("ped-proceso").textContent = ps.filter(function (p) { return p.estado === "En preparación" || p.estado === "Enviado"; }).length;
        $("ped-entregados").textContent = ps.filter(function (p) { return p.estado === "Entregado"; }).length;
        $("ped-ventas").textContent = P.fmt(ps.filter(function (p) { return p.estado !== "Cancelado"; }).reduce(function (s, p) { return s + p.total; }, 0));
        if (!ps.length) { tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#687991;padding:28px">Aún no hay pedidos. Aparecerán aquí cuando un cliente complete un pago.</td></tr>'; return; }
        tbody.innerHTML = ps.map(function (p) {
            var n = p.items.reduce(function (s, i) { return s + i.cantidad; }, 0);
            var opts = ESTADOS.map(function (e) { return '<option' + (e === p.estado ? " selected" : "") + '>' + e + '</option>'; }).join("");
            return '<tr><td><strong>' + P.esc(p.num) + '</strong><small class="admin-tabla-sub">' + P.esc(p.folio) + (p.ejemplo ? " · ejemplo" : "") + '</small></td><td>' + P.esc(P.fechaLarga(p.fecha)) + '</td><td>' + P.esc(p.cliente.nombre) + '<small class="admin-tabla-sub">' + P.esc(p.cliente.correo) + '</small></td><td>' + n + '</td><td>' + P.esc(p.metodo.etiqueta) + '</td><td><strong>' + P.fmt(p.total) + '</strong></td><td><select class="ped-estado" data-num="' + P.esc(p.num) + '" aria-label="Estado del pedido ' + P.esc(p.num) + '">' + opts + '</select></td></tr>';
        }).join("");
    }
    tbody.addEventListener("change", function (e) {
        if (!e.target.classList.contains("ped-estado")) return;
        P.actualizarEstado(e.target.getAttribute("data-num"), e.target.value);
        pintar();
        if (window.mostrarMensaje) mostrarMensaje("Pedido actualizado", "El estado ahora es «" + e.target.value + "». El cliente lo verá en Mis compras.");
    });
    window.addEventListener("storage", function (e) { if (e.key === "techzone_pedidos") pintar(); }); // otra pestaña hizo una compra
    window.addEventListener("focus", pintar);
    setInterval(pintar, 5000);
    pintar();
});
