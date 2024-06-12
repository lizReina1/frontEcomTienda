<template>
  <div class="home">
     <navbar></navbar>
  <section id="hero">
    <div class="hero-container" data-aos="fade-up">
      <h1>Bienvenido a Command Center</h1>
      <h2>Descubre tu estilo</h2>
      <a href="#about" class="btn-get-started scrollto">Empezar</a>
    </div>
  </section><!-- End Hero -->

  <main id="main">
     
    <!-- ======= About Section ======= -->
    <section id="about" class="about">
      <div class="container">

        <div class="row justify-content-end">
          <div class="col-lg-11">
            <div class="row justify-content-end">

              <div class="col-lg-3 col-md-5 col-6 d-md-flex align-items-md-stretch">
                <div class="count-box py-5">
                  <i class="bi bi-emoji-smile"></i>
                  <span data-purecounter-start="0" data-purecounter-end="65" class="purecounter">0</span>
                  <p>Happy Clients</p>
                </div>
              </div>

              <div class="col-lg-3 col-md-5 col-6 d-md-flex align-items-md-stretch">
                <div class="count-box py-5">
                  <i class="bi bi-journal-richtext"></i>
                  <span data-purecounter-start="0" data-purecounter-end="85" class="purecounter">0</span>
                  <p>Projects</p>
                </div>
              </div>

              <div class="col-lg-3 col-md-5 col-6 d-md-flex align-items-md-stretch">
                <div class="count-box pb-5 pt-0 pt-lg-5">
                  <i class="bi bi-clock"></i>
                  <span data-purecounter-start="0" data-purecounter-end="27" class="purecounter">0</span>
                  <p>Years of experience</p>
                </div>
              </div>

              <div class="col-lg-3 col-md-5 col-6 d-md-flex align-items-md-stretch">
                <div class="count-box pb-5 pt-0 pt-lg-5">
                  <i class="bi bi-award"></i>
                  <span data-purecounter-start="0" data-purecounter-end="22" class="purecounter">0</span>
                  <p>Awards</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="row">
          <div class="row">

          <h3 class="text-center">Estilos </h3>
          </div>
          <div class="row">
        <div class="col-sm-4">
          <div class="image-container">
            <img src="assets/img/modelos/mujer3.jpg" class="img-fluid" alt="">
             <div class="overlay">Ver</div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="image-container">
            <img src="assets/img/modelos/mujer2.jpeg" class="img-fluid" alt="">
             <div class="overlay">Ver</div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="image-container">
            <img src="assets/img/modelos/mujerRopa.jpeg" class="img-fluid" alt="">
            <div class="overlay">Ver</div>
          </div>
        </div>
      </div>
        </div>

      </div>
    </section><!-- End About Section -->

  </main><!-- End #main -->
</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from '@/components/navbar.vue';

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    Navbar
  },

}
</script>
