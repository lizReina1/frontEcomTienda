<template>
  <div id="CompraForm">
    <div class="container formcompra justify-content-center">
      <div class="row justify-content-center">
        <h4><b>{{ isEditing ? 'Editar Compra' : 'Crear Compra' }}</b></h4>
      </div>
      <div class="row">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <div class="row">
              <label for="cliente" class="bold-label"> Cliente </label>
              <input type="text" v-model="compra.cliente" class="form-control" id="cliente" required />
            </div>

            <div class="row">
              <div class="col-sm-6">
                <label for="fecha"><b>Fecha</b></label>
                <input type="date" v-model="compra.fecha" class="form-control" id="fecha" required />
              </div>
              <div class="col-sm-6">
                <label for="metodopago"><b>Nombre Proveedor</b></label>
                <input type="text" v-model="compra.nombreproveedor" class="form-control" id="metodopago" required />
              </div>
            </div>
            <div class="row">
              <label for=""><b>Productos</b></label>
            </div>
            <div class="row">
              <div class="col-sm-4">
                <label for="producto">Producto</label>
                <select v-model="nuevoProducto.id" class="form-control" id="producto">
                  <option v-for="producto in productos" :key="producto.id" :value="producto.id">{{ producto.name }}</option>
                </select>
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
                <input type="text" v-model="compra.total" class="form-control" id="total" required />
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
import axios from 'axios';

export default {
  name: 'CompraForm',
  props: {
    compra: {
      type: Object,
      default: () => ({ cliente: '', fecha: '', nombreproveedor: '', productos: [], total: 0 })
    },
    isEditing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      nuevoProducto: {
        id: '',
        cantidad: 1
      },
      productos: [],
      items: [],
      fields: [
        { key: 'Producto', label: 'Producto' },
        { key: 'Precio', label: 'Precio' },
        { key: 'Cantidad', label: 'Cantidad' },
        { key: 'Total', label: 'Total' },
        { key: 'actions', label: 'Acciones' }
      ]
    };
  },  
  created() {
    this.fetchProductos();
  },
  methods: {
    fetchProductos() {
      axios.post('http://18.218.15.90:8080/graphql', {
        query: `
          {
            products {
              id
              name
            }
          }
        `
      })
      .then(response => {
        this.productos = response.data.data.products;
      })
      .catch(error => {
        console.error(error);
      });
    },
     async handleSubmit() {
      const detalles = this.items.map(item => ({
        product_id: this.productos.find(producto => producto.name === item.Producto).id,
        quantity: item.Cantidad,
        price: item.Precio,
        total: item.Total
      }));

      const compraData = {
        date: this.compra.fecha,
        total: parseFloat(this.compra.total), // Asegúrate de que el total sea un número
        supplier_id: 1, // Ajusta este valor según tu lógica
        details: detalles,
      };

      console.log('compraData', compraData);

      axios.post('http://18.218.15.90:8080/graphql', {
        query: `
          mutation {
            createPurchase(input: {
              date: "${compraData.date}"
              total: ${compraData.total}
              supplier_id: 1
              details: ${JSON.stringify(compraData.details).replace(/"([^"]+)":/g, '$1:')}
            }) {
              id
              total
              date
            }
          }
        `
      })
      .then(response => {
        console.log(response.data);
        this.$emit('submit', { ...this.compra });
      })
      .catch(error => {
        console.error('Error al agregar la compra:', error);
      });
    },
    cancelarOperacion() {
      this.$emit('cancelar');
    },
    agregarProducto() {
      const productoSeleccionado = this.productos.find(producto => producto.id === this.nuevoProducto.id);
      if (productoSeleccionado && this.nuevoProducto.cantidad > 0) {
        const precio = 10;
        const total = this.nuevoProducto.cantidad * precio;
        this.items.push({ 
          Producto: productoSeleccionado.name, 
          Precio: precio, 
          Cantidad: this.nuevoProducto.cantidad, 
          Total: total 
        });
        this.calcularTotal();
        this.nuevoProducto.id = '';
        this.nuevoProducto.cantidad = 1;
      }
    },
    eliminarProducto(index) {
      this.items.splice(index, 1);
      this.calcularTotal();
    },
    calcularTotal() {
      const total = this.items.reduce((acc, item) => acc + item.Total, 0);
      this.compra.total = total;
    },
    resetCompraData() {
      this.compra = { cliente: '', fecha: '', nombreproveedor: '', productos: [], total: 0 };
      this.items = [];
    }
  }
};
</script>

<style>
.container.formcompra {
  margin-left: 50px;
}
.row {
  margin-bottom: 30px;
}
.bold-label {
  font-weight: bold;
}
</style>
