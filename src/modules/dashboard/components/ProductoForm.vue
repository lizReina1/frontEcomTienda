<template>
  <div id="ProductoForm">
    <div class="container formProducto">
      <div class="row justify-content-center">
        <h4><b>{{ isEditing ? 'Editar Producto' : 'Crear Producto' }}</b></h4>
      </div>
      <div class="row">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <div class="row">
              <div class="col-sm-6">
                <label for="fecha"><b>Fecha</b></label>
                <input type="date" v-model="producto.fecha" class="form-control" id="fecha" required />
              </div>
              <div class="col-sm-6">
                <label for="metodopago"><b>Nombre Proveedor</b></label>
                <input type="text" v-model="producto.nombreproveedor" class="form-control" id="metodopago" required />
              </div>
            </div>
          </div>
          <div class="row" style="justify-content: end;">
            <div class="col-sm-2">
              <div class="form-group">
                <label for="total"><b>Total</b></label>
                <input type="text" v-model="producto.total" class="form-control" id="total" required />
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-sm-4">
              <button type="submit" class="btn btn-primary">{{ isEditing ? 'Guardar Cambios' : 'Crear' }}</button>
            </div>
            <div class="col-sm-4">
              <button @click.prevent="cancelarOperacion" class="btn btn-dark">Cancelar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'productoForm',
  props: {
    producto: {
      type: Object,
      default: () => ({ fecha: '', nombreproveedor: '', total: 0 })
    },
    isEditing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    };
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', { ...this.producto });
    },
    cancelarOperacion() {
      this.$emit('cancelar'); // Emitir evento cancelar
    },
    
    eliminarProducto(index) {
      this.items.splice(index, 1);
    }
  }
};
</script>

<style>
.container.formProducto {
  margin-left: 50px;
}
.row {
  margin-bottom: 30px;
}
.bold-label {
  font-weight: bold;
}
</style>
