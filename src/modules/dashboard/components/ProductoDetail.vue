<template>
  <div id="ProductoDetail">
    <div class="producto-detail">
      <div class="card">
        <div class="row g-0">
          <div class="col-md-5">
            <img class="card-img-top" :src="producto.image" :alt="producto.name">
          </div>
          <div class="col-md-7">
            <div class="card-body">
              <h5 class="card-title">{{ producto.name }}</h5>
              <p class="card-text">{{ producto.description }}</p>
              <p class="card-text"><strong>Stock:</strong> {{ producto.stock }}</p>
              <p class="card-text"><strong>Precio:</strong> ${{ producto.price }}</p>
            </div>
            <div class="card-footer">
              <button @click.prevent="cancelarOperacion" class="btn btn-dark">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductoDetail',
  props: {
    producto: Object
  },
  methods: {
    cancelarOperacion() {
      this.$emit('cancelar');
    }
  }
};
</script>

<style scoped>
.producto-detail {
  margin-top: 50px;
}

.card {
  max-width: 800px; /* Aumenta el ancho máximo de la tarjeta */
  margin: auto;
  border: none; /* Elimina el borde de la tarjeta si es necesario */
  border-radius: 10px; /* Opcional: Añade borde redondeado a la tarjeta */
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1); /* Opcional: Añade sombra a la tarjeta */
}

.card-img-top {
  width: 100%; /* La imagen ocupa el 100% del ancho de su contenedor */
  height: auto; /* Altura automática para mantener la proporción */
  border-top-left-radius: 10px; /* Borde redondeado en la esquina superior izquierda */
  border-bottom-left-radius: 10px; /* Borde redondeado en la esquina inferior izquierda */
}

.card-body {
  padding: 20px;
}

.card-footer {
  text-align: right;
  padding: 10px 20px;
}
</style>
