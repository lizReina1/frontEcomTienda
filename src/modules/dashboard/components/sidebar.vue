<template>
    <div class="container-fluid p-0">
        <div class="row m-0">
            <!-- Sidebar -->
            <div class="col-lg-3 col-md-4 sidebar">
                <div class="bg-purple p-4">
                    <h2 class="text-white text-center mb-4">LuxeStore</h2>
                    <ul class="list-unstyled">
                        <li v-if="showDashboardLink" :class="{ 'active': activeTab === 'Dashboard' }">
                            <a href="#" @click="activateTab('Dashboard')"
                                class="text-decoration-none d-flex align-items-center">
                                <i class="fas fa-box pt-1 me-3"></i>
                                <span class="link">Dashboard</span>
                            </a>
                        </li>
                        <li v-if="showVentasLink" :class="{ 'active': activeTab === 'Ventas' }">
                            <a href="#" @click="activateTab('Ventas')"
                                class="text-decoration-none d-flex align-items-center">
                                <i class="fas fa-box-open pt-1 me-3"></i>
                                <span class="link">Ventas</span>
                            </a>
                        </li>
                        <li v-if="showDevolucionesLink" :class="{ 'active': activeTab === 'Devoluciones' }">
                            <a href="#" @click="activateTab('Devoluciones')"
                                class="text-decoration-none d-flex align-items-center">
                                <i class="fas fa-box-open pt-1 me-3"></i>
                                <span class="link">Devoluciones</span>
                            </a>
                        </li>
                        <li v-if="showComprasLink" :class="{ 'active': activeTab === 'Compras' }">
                            <a href="#" @click="activateTab('Compras')"
                                class="text-decoration-none d-flex align-items-center">
                                <i class="far fa-address-book pt-1 me-3"></i>
                                <span class="link">Compras</span>
                            </a>
                        </li>
                        <li v-if="showProductosLink" :class="{ 'active': activeTab === 'Productos' }">
                            <a href="#" @click="activateTab('Productos')"
                                class="text-decoration-none d-flex align-items-center">
                                <i class="far fa-user pt-1 me-3"></i>
                                <span class="link">Productos</span>
                            </a>
                        </li>
                        <li v-if="showUsuariosLink" :class="{ 'active': activeTab === 'Usuarios' }">
                            <a href="#" @click="activateTab('Usuarios')"
                                class="text-decoration-none d-flex align-items-center">
                                <i class="fas fa-headset pt-1 me-3"></i>
                                <span class="link">Usuarios</span>
                            </a>
                        </li>
                        <li v-if="showProveedorLink" :class="{ 'active': activeTab === 'Proveedor' }">
                            <a href="#" @click="activateTab('Proveedor')"
                                class="text-decoration-none d-flex align-items-center">
                                <i class="fas fa-headset pt-1 me-3"></i>
                                <span class="link">Proveedor</span>
                            </a>
                        </li>
                        <li v-if="showClienteLink" :class="{ 'active': activeTab === 'Cliente' }">
                            <a href="#" @click="activateTab('Cliente')"
                                class="text-decoration-none d-flex align-items-center">
                                <i class="fas fa-headset pt-1 me-3"></i>
                                <span class="link">Clientes</span>
                            </a>
                        </li>
                    </ul>
                    <button class="btn btn-light w-100 mt-4" @click="logout">Salir</button>
                </div>
            </div>

            <!-- Main Content -->
            <div class="col-lg-9 col-md-8" id="main-content">
                <div class="p-4 border rounded">
                    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
                        <div class="container-fluid">
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                                    <li class="nav-item">
                                        <a class="nav-link" href="#">
                                            <i class="fas fa-user pe-1"></i>
                                            {{ username }}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                    <!-- Content Area -->
                    <div>
                        <h1 v-if="!activeTab" class="mb-4">Bienvenido</h1>

                        <div v-else>
                            <venta v-if="activeTab === 'Ventas'" />
                            <devoluciones v-if="activeTab === 'Devoluciones'" />
                            <compra v-if="activeTab === 'Compras'" />
                            <productos v-if="activeTab === 'Productos'" />
                            <usuarios v-if="activeTab === 'Usuarios'" />
                            <proveedor v-if="activeTab === 'Proveedor'" />
                            <cliente v-if="activeTab === 'Cliente'" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import venta from '../views/venta.vue';
import compra from '../views/compra.vue';
import productos from '../views/productos.vue';
import usuarios from '../views/usuarios.vue';
import proveedor from '../views/proveedores.vue';
import cliente from '../views/cliente.vue';
import devoluciones from '../views/devoluciones.vue';

export default {
    components: { venta, compra, productos, usuarios, proveedor, cliente, devoluciones },

    data() {
        return {
            activeTab: null,
            username: '',
            userRole: ''
        };
    },

    created() {
        this.username = localStorage.getItem('username');
        this.userRole = localStorage.getItem('role');
    },

    methods: {
        activateTab(tab) {
            this.activeTab = tab;
        },

        logout() {
            localStorage.removeItem('username');
            localStorage.removeItem('role');
            this.$router.push({ name: 'home' });
        }
    },

    computed: {
        showDashboardLink() {
            return this.userRole === 'Administrador';
        },
        showVentasLink() {
            return this.userRole === 'Cajero' || this.userRole === 'Administrador';
        },
        showDevolucionesLink() {
            return this.userRole === 'Cajero' || this.userRole === 'Administrador';
        },
        showComprasLink() {
            return this.userRole === 'Supervisor' || this.userRole === 'Administrador';
        },
        showProductosLink() {
            return this.userRole === 'Cajero' || this.userRole === 'Supervisor' || this.userRole === 'Administrador';
        },
        showUsuariosLink() {
            return this.userRole === 'Administrador';
        },
        showProveedorLink() {
            return this.userRole === 'Supervisor' || this.userRole === 'Administrador';
        },
        showClienteLink() {
            return this.userRole === 'Cajero' || this.userRole === 'Administrador';
        },
    },
};
</script>

<style scoped>
/* Estilos personalizados para el componente */

/* Estilo general del sidebar */
.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1000;
    /* Asegura que esté encima del contenido */
    overflow-y: auto;
    /* Permite hacer scroll si el contenido es largo */
    width: 250px;
    /* Ancho fijo del sidebar */
    padding-top: 20px;
    /* Espacio adicional arriba */
    background-color: #451296;
    /* Color de fondo del sidebar */
}

/* Estilo del título del sidebar */
.sidebar h2 {
    font-weight: 900;
    font-size: 1.8rem;
}

/* Estilo de los enlaces del sidebar */
.sidebar .link {
    font-size: 1.1rem;
    color: #fff;
    /* Color del texto */
}

/* Ajustes para las listas sin estilos del sidebar */
.sidebar ul {
    padding-left: 0;
}

.sidebar ul li {
    padding: 12px 20px;
    transition: background-color 0.3s;
}

.sidebar ul li.active {
    background-color: rgba(255, 255, 255, 0.1);
}

.sidebar ul li:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

/* Ajustes para el botón de logout */
.sidebar .btn {
    font-size: 1rem;
    padding: 10px 16px;
    border-radius: 8px;
    transition: background-color 0.3s;
}

.sidebar .btn:hover {
    background-color: #f0f0f0;
}

/* Ajustes para el contenido principal */
.bg-white {
    padding-left: 250px;
    /* Acomoda el contenido a la derecha del sidebar */
    min-height: 100vh;
    /* Alto mínimo para el contenido principal */
}

/* Ajustes para el título del contenido principal */
.bg-white h1 {
    font-size: 2rem;
    font-weight: 600;
    color: #333;
}

/* Ajustes para los iconos en la barra de navegación superior */
.navbar .fas {
    font-size: 1.2rem;
}

#main-content {
    flex: 1;
    padding: 30px;
    border-radius: 15px;
    margin-left: 250px;
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
</style>