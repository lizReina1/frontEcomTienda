<template>
  <div class="home">
    <navbar></navbar>

    <!-- Hero Section -->
    <section id="hero">
      <div class="hero-container" data-aos="fade-up">
        <h1>Bienvenido a LuxeStore</h1>
        <h2>Descubre tu estilo</h2>
        <a href="#about" class="btn-get-started scrollto">Empezar</a>
      </div>
    </section>

    <!-- Main Content -->
    <main id="main">
      
      <!-- Section: About -->
      <section id="about" class="about">
        <div class="container">
          <!-- Counters -->
          <div class="row justify-content-end">
            <div class="col-lg-11">
              <div class="row justify-content-end">
                <!-- Count Boxes -->
                <div class="col-lg-3 col-md-5 col-6 d-md-flex align-items-md-stretch">
                  <div class="count-box py-5">
                    <i class="bi bi-emoji-smile"></i>
                    <span data-purecounter-start="0" data-purecounter-end="65" class="purecounter">1000</span>
                    <p>Clientes felices</p>
                  </div>
                </div>
                <div class="col-lg-3 col-md-5 col-6 d-md-flex align-items-md-stretch">
                  <div class="count-box pb-5 pt-0 pt-lg-5">
                    <i class="bi bi-clock"></i>
                    <span data-purecounter-start="0" data-purecounter-end="27" class="purecounter">2</span>
                    <p>Años de experiencia</p>
                  </div>
                </div>
                <div class="col-lg-3 col-md-5 col-6 d-md-flex align-items-md-stretch">
                  <div class="count-box pb-5 pt-0 pt-lg-5">
                    <i class="bi bi-award"></i>
                    <span data-purecounter-start="0" data-purecounter-end="22" class="purecounter">7</span>
                    <p>Reconocimientos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Section: Products --> 
          <div class="row">
            <div class="col">
              <h3 class="text-center"><b>Estilos</b></h3>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-4" v-for="producto in productos" :key="producto.id">
              <div class="card">
          <img :src="producto.image" class="card-img-top img-fluid rounded mx-auto d-block" :alt="producto.name" style="max-width: 200px;">
                <div class="card-body">
                  <h5 class="card-title"><b>{{ producto.name }}</b></h5>
                  <p class="card-text">{{ producto.description }}</p>
                  <p class="card-text">Precio: ${{ producto.price }}</p>
                  <p class="card-text">Stock: {{ producto.stock }}</p>
                  <!-- Agrega más detalles del producto si es necesario -->
                  <a href="/login" class="btn btn-primary">Ver detalles</a>
                </div>
              </div>
            </div>
          </div>

        </div><!-- End Container -->
      </section><!-- End About Section -->

    </main><!-- End Main -->

  </div><!-- End Home -->
</template>

<script>
import axios from 'axios';
import Navbar from '@/components/navbar.vue';

export default {
  name: 'HomeView',
  components: {
    Navbar
  },
  data() {
    return {
      productos: []
    };
  },
  async mounted() {
    try {
      const result = await axios.post('http://18.218.15.90:8080/graphql', {
        query: `
          {
            products {
              brand_id
              code
              color_id
              description
              id
              image
              model_id
              name
              price
              size_id
              stock
            }
          }
        `
      });

      this.productos = result.data.data.products;
      // this.sortProductos(); // Si necesitas ordenar los productos
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    // Métodos adicionales si los necesitas
  }
};
</script>

<style scoped>
/* Estilos específicos para las tarjetas de productos */
.card {
  margin-bottom: 20px;
  width: 100%; /* Asegura que la tarjeta ocupe todo el ancho disponible */
}
.card-img-top {
  max-width: 200px; /* Limita la anchura máxima de la imagen a 200px */
  height: 300px; /* Permite que la altura se ajuste automáticamente */
}
</style>
