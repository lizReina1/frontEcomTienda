<template>
    <div class="row">
            <div class="col-sm-2 my-lg-0 my-md-1">
                <div id="sidebar" class="bg-purple mb-3">
                    <div class="row" >
                    <div class="h4 text-white mt-4 text-center" style="margin-bottom: 50px;" >LuxeStore</div>
                    </div>
                    <ul>
                        <li :class="{ 'active': activeTab === 'Dashboard' }">
                            <a href="#" class="text-decoration-none d-flex align-items-start"  @click="activateTab('Dashboard')">
                                <div class="fas fa-box pt-2 me-3"></div>
                                <div class="d-flex flex-column">
                                    <div class="link"> 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-speedometer" viewBox="0 0 16 16">
                                        <path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2M3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.39.39 0 0 0-.029-.518z"/>
                                        <path fill-rule="evenodd" d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.95 11.95 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0"/>
                                    </svg>   Dashboard</div>
                                </div>
                            </a>
                        </li>
                        <li :class="{ 'active': activeTab === 'Ventas' }">
                            <a href="#" class="text-decoration-none d-flex align-items-start"  @click="activateTab('Ventas')">
                                <div class="fas fa-box-open pt-2 me-3"></div>

                                <div class="d-flex flex-column">
                                    <div class="link"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shop" viewBox="0 0 16 16">
                                        <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.37 2.37 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5M4 15h3v-5H4zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zm3 0h-2v3h2z"/>
                                    </svg>  Ventas</div>
                                </div>
                            </a>
                        </li>
                        <li :class="{ 'active': activeTab === 'Compras' }">
                            <a href="#" class="text-decoration-none d-flex align-items-start" @click="activateTab('Compras')">
                                <div class="far fa-address-book pt-2 me-3"></div>
                                <div class="d-flex flex-column">
                                    <div class="link"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-fill" viewBox="0 0 16 16">
                                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4z"/>
                                    </svg> Compras</div>
                                </div>
                            </a>
                        </li>
                        <li :class="{ 'active': activeTab === 'Productos' }">
                            <a href="#" class="text-decoration-none d-flex align-items-start" @click="activateTab('Productos')">
                                <div class="far fa-user pt-2 me-3"></div>
                                <div class="d-flex flex-column">
                                    <div class="link"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"  fill="currentColor" viewBox="0 0 24 24" >
                                        <path d="M3 7L6 4H9C9 4.39397 9.0776 4.78407 9.22836 5.14805C9.37913 5.51203 9.6001 5.84274 9.87868 6.12132C10.1573 6.3999 10.488 6.62087 10.8519 6.77164C11.2159 6.9224 11.606 7 12 7C12.394 7 12.7841 6.9224 13.1481 6.77164C13.512 6.62087 13.8427 6.3999 14.1213 6.12132C14.3999 5.84274 14.6209 5.51203 14.7716 5.14805C14.9224 4.78407 15 4.39397 15 4H18L21 7L20.5 12L18 10.5V20H6V10.5L3.5 12L3 7Z" stroke="#000000" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
                                    </svg> Productos</div>
                                </div>
                            </a>
                        </li>
                        <li :class="{ 'active': activeTab === 'Usuarios' }">
                            <a href="#" class="text-decoration-none d-flex align-items-start" @click="activateTab('Usuarios')">
                                <div class="fas fa-headset pt-2 me-3"></div>
                                <div class="d-flex flex-column">
                                    <div class="link"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                                    </svg> Usuarios</div>
                                </div>
                            </a>
                        </li>
                        <li :class="{ 'active': activeTab === 'Proveedor' }">
                            <a href="#" class="text-decoration-none d-flex align-items-start" @click="activateTab('Proveedor')">
                                <div class="fas fa-headset pt-2 me-3"></div>
                                <div class="d-flex flex-column">
                                    <div class="link"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                                    </svg> Proveedor</div>
                                </div>
                            </a>
                        </li>
                        <li :class="{ 'active': activeTab === 'Cliente' }">
                            <a href="#" class="text-decoration-none d-flex align-items-start" @click="activateTab('Cliente')">
                                <div class="fas fa-headset pt-2 me-3"></div>
                                <div class="d-flex flex-column">
                                    <div class="link"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                                    </svg> Clientes</div>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <div class="row"  style="margin-top: 220px;">
                        <button class="btn btn-light"> Salir </button>
                    </div>
                    
                </div>
            </div>
            <div class="col my-lg-0 my-1">
                <div id="main-content" class="bg-white border">
                    <div class="d-flex flex-column">
                        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynav"
                aria-controls="mynav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="mynav">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" href="#"> <span class="fas fa-user pe-2"></span> Hello Jhon</a>
                    </li>
                </ul>
            </div>
        </div>
                        </nav>
                    </div>
                    <div>
                         <div class="col-sm-10">
                            <div v-if="activeTab === 'Ventas'">
                                <venta />
                            </div>
                            <div v-if="activeTab === 'Compras'">
                                <compra />
                            </div>
                            <div v-if="activeTab === 'Productos'">
                                <productos />
                            </div>
                            <div v-if="activeTab === 'Usuarios'">
                                <usuarios />
                            </div>
                            <div v-if="activeTab === 'Proveedor'">
                                <proveedor />
                            </div>
                            <div v-if="activeTab === 'Cliente'">
                                <cliente />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

</template>

<script>
import dashboardList from '../views/dashboardList.vue';
import venta from '../views/venta.vue';
import compra from '../views/compra.vue';
import productos from '../views/productos.vue';
import usuarios from '../views/usuarios.vue';
import proveedor from '../views/proveedores.vue';
import cliente from '../views/cliente.vue';

export default {
  components: { venta, compra, productos, usuarios, proveedor,cliente },

data() {
    return {
      activeTab: null // Variable para almacenar la pestaña activa
    };
},
methods: {
    activateTab(tab) {
      this.activeTab = tab; // Método para activar la pestaña haciendo clic en ella
    }
}
}
</script>
<style>
    
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;900&display=swap');

/* Resetting */
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

nav {
    min-height: 70px;
}

nav .navbar-brand .logo {
    padding: 10px 15px;
    border-radius: 8px;
}

nav .navbar-brand .logo .h2 {
    margin: 0;
}

nav .navbar-brand .h4 {
    margin-bottom: 0px;
    font-weight: 900;
}

nav .navbar-brand .fs-6 {
    font-size: 0.88rem !important;
}

nav ul li {
    padding: 0 20px;
}

.navbar-light .navbar-nav .nav-link {
    color: #333;
}

.navbar-light .navbar-nav .nav-link:hover {
    color: #39045A;
}

.navbar-light .navbar-nav .nav-link.active {
    color: #451296;
}

nav ul li a .cart {
    padding: 4px 6px;
    border-radius: 6px;
    position: relative;
    display: inline;
}

nav ul li a .cart::after {
    position: absolute;
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #ff5252;
    top: -1px;
}

.navbar-toggler:focus {
    box-shadow: none;
}

#sidebar {
    padding: 15px 0px 15px 0px;
    border-radius: 10px;
    height: 107%;
}

#sidebar .h4 {
    font-weight: 600;
    padding-left: 15px;
}

#sidebar ul {
    list-style: none;
    margin: 0;
    padding-left: 0rem;
}

#sidebar ul li {
    padding: 10px 0;
    display: block;
    padding-left: 1rem;
    padding-right: 1rem;
    border-left: 5px solid transparent;
}

#sidebar ul li.active {
    border-left: 5px solid #ff5252;
    background-color: #FFC727;
}

#sidebar ul li a {
    display: block;
}

#sidebar ul li a .fas,
#sidebar ul li a .far {
    color: #ddd;
}

#sidebar ul li a .link {
    color: #fff;
    font-weight: 500;
}

#sidebar ul li a .link-desc {
    font-size: 0.8rem;
    color: #ddd;
}

#main-content {
    padding: 30px;
    border-radius: 15px;
}

#main-content .h5,
#main-content .text-uppercase {
    font-weight: 600;
    margin-bottom: 0;
}

#main-content .h5+div {
    font-size: 0.9rem;
}

#main-content .box {
    padding: 10px;
    border-radius: 6px;
    width: 170px;
    height: 90px;
}

#main-content .box img {
    width: 40px;
    height: 40px;
    object-fit: contain;
}

#main-content .box .tag {
    font-size: 0.9rem;
    color: #000;
    font-weight: 500;
}

#main-content .box .number {
    font-size: 1.5rem;
    font-weight: 600;
}

.order {
    padding: 10px 30px;
    min-height: 150px;
}

.order .order-summary {
    height: 100%;
}

.order .blue-label {
    background-color: #aeaeeb;
    color: #0046dd;
    font-size: 0.9rem;
    padding: 0px 3px;
}

.order .green-label {
    background-color: #a8e9d0;
    color: #008357;
    font-size: 0.9rem;
    padding: 0px 3px;
}

.order .fs-8 {
    font-size: 0.85rem;
}

.order .rating img {
    width: 20px;
    height: 20px;
    object-fit: contain;
}

.order .rating .fas,
.order .rating .far {
    font-size: 0.9rem;
}

.order .rating .fas {
    color: #daa520;
}

.order .status {
    font-weight: 600;
}

.order .btn.btn-primary {
    background-color: #fff;
    color: #4e2296;
    border: 1px solid #4e2296;
}

.order .btn.btn-primary:hover {
    background-color: #4e2296;
    color: #fff;
}

.order .progressbar-track {
    margin-top: 20px;
    margin-bottom: 20px;
    position: relative;
}

.order .progressbar-track .progressbar {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 0rem;
}

.order .progressbar-track .progressbar li {
    font-size: 1.5rem;
    border: 1px solid #333;
    padding: 5px 10px;
    border-radius: 50%;
    background-color: #dddddd;
    z-index: 100;
    position: relative;
}

.order .progressbar-track .progressbar li.green {
    border: 1px solid #007965;
    background-color: #d5e6e2;
}

.order .progressbar-track .progressbar li::after {
    position: absolute;
    font-size: 0.9rem;
    top: 50px;
    left: 0px;
}

#tracker {
    position: absolute;
    border-top: 1px solid #bbb;
    width: 100%;
    top: 25px;
}

#step-1::after {
    content: 'Placed';
}

#step-2::after {
    content: 'Accepted';
    left: -10px;
}

#step-3::after {
    content: 'Packed';
}

#step-4::after {
    content: 'Shipped';
}

#step-5::after {
    content: 'Delivered';
    left: -10px;
}



/* Backgrounds */
.bg-purple {
    background-color: #39045A;
}

.bg-light {
    background-color: #f0ecec !important;
}

.green {
    color: #007965 !important;
}

/* Media Queries */
@media(max-width: 1199.5px) {
    nav ul li {
        padding: 0 10px;
    }
}

@media(max-width: 500px) {
    .order .progressbar-track .progressbar li {
        font-size: 1rem;
    }

    .order .progressbar-track .progressbar li::after {
        font-size: 0.8rem;
        top: 35px;
    }

    #tracker {
        top: 20px;
    }
}

@media(max-width: 440px) {
    #main-content {
        padding: 20px;
    }

    .order {
        padding: 20px;
    }

    #step-4::after {
        left: -5px;
    }
}

@media(max-width: 395px) {
    .order .progressbar-track .progressbar li {
        font-size: 0.8rem;
    }

    .order .progressbar-track .progressbar li::after {
        font-size: 0.7rem;
        top: 35px;
    }

    #tracker {
        top: 15px;
    }

    .order .btn.btn-primary {
        font-size: 0.85rem;
    }
}

@media(max-width: 355px) {
    #main-content {
        padding: 15px;
    }

    .order {
        padding: 10px;
    }
}
</style>