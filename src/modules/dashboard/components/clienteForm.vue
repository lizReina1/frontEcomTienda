<template>
  <div id="clienteForm">
    <div class="container formcliente justify-content-center">
      <div class="row justify-content-center">
        <h4><b>{{ isEditing ? 'Editar cliente' : 'Crear cliente' }}</b></h4>
      </div>
      <div class="row">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <div class="row">
              <label for="cliente" class="bold-label"> Cliente </label>
              <input type="text" v-model="cliente.cliente" class="form-control" id="cliente" required />
            </div>

            <div class="row">
              <div class="col-sm-6">
                <label for="fecha"><b>Fecha</b></label>
                <input type="date" v-model="cliente.fecha" class="form-control" id="fecha" required />
              </div>
              <div class="col-sm-6">
                <label for="metodopago"><b>Metodo Pago</b></label>
                <input type="text" v-model="cliente.metodopago" class="form-control" id="metodopago" required />
              </div>
            </div>
            <div class="row">
              <label for=""><b>Productos</b></label>
            </div>
            <div class="row">
              <div class="col-sm-4">
                <label for="producto">Producto</label>
                <input type="text" v-model="nuevoProducto.nombre" class="form-control" id="producto" />
              </div>
              <div class="col-sm-4">
                <label for="cantidad">Cantidad</label>
                <input type="number" v-model="nuevoProducto.cantidad" class="form-control" id="cantidad" required />
              </div>
              <div class="col-sm-4">
                <button @click.prevent="agregarProducto" class="btn btn-light mt-4">Agregar</button>
              </div>
            </div>
            <div class="row">
               <b-table striped hover :items="items" :fields="fields">
                <template #cell(actions)="row">
                    <svg @click="eliminarProducto(row.index)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </template>
              </b-table>
            </div>
          </div>
          <div class="row" style="justify-content: end;">
            <div class="col-sm-2">
              <div class="form-group">
                <label for="total"><b>Total</b></label>
                <input type="text" v-model="cliente.total" class="form-control" id="total" required />
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
  name: 'clienteForm',
  props: {
    cliente: {
      type: Object,
      default: () => ({ cliente: '', fecha: '', metodopago: '', productos: [], total: 0 })
    },
    isEditing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      nuevoProducto: {
        nombre: '',
        cantidad: 1
      },
      items: [
        { Producto: 'luz', Precio: '10', Cantidad: '2', Total: '20' }
      ],
      fields: [
        { key: 'Producto', label: 'Producto' },
        { key: 'Precio', label: 'Precio' },
        { key: 'Cantidad', label: 'Cantidad' },
        { key: 'Total', label: 'Total' },
        { key: 'actions', label: 'Acciones' }
      ]
    };
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', { ...this.cliente });
    },
    cancelarOperacion() {
      this.$emit('cancelar'); // Emitir evento cancelar
    },
    agregarProducto() {
      if (this.nuevoProducto.nombre && this.nuevoProducto.cantidad > 0) {
        const precio = 10; // Suponiendo un precio fijo para simplificar
        const total = this.nuevoProducto.cantidad * precio;
        this.items.push({ 
          Producto: this.nuevoProducto.nombre, 
          Precio: precio, 
          Cantidad: this.nuevoProducto.cantidad, 
          Total: total,
          Accion: ''
        });
        this.nuevoProducto.nombre = '';
        this.nuevoProducto.cantidad = 1;
      }
    },
    eliminarProducto(index) {
      this.items.splice(index, 1);
    }
  }
};
</script>

<style>
.container.formcliente {
  margin-left: 50px;
}
.row {
  margin-bottom: 30px;
}
.bold-label {
  font-weight: bold;
}
</style>
