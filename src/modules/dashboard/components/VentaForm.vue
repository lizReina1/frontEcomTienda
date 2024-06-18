<template>
  <div id="VentaForm">
    <div class="container formventa justify-content-center">
      <div class="row justify-content-center">
        <h4><b>{{ isEditing ? 'Editar Venta' : 'Crear Venta' }}</b></h4>
      </div>
      <div class="row">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <div class="row">
              <label for="cliente" class="bold-label"> Cliente </label>
              <select v-model="venta.cliente" class="form-control" id="cliente" required>
                <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">{{ cliente.name }}</option>
              </select>
            </div>

            <div class="row">
              <div class="col-sm-6">
                <label for="date"><b>Fecha</b></label>
                <input type="date" v-model="venta.date" class="form-control" id="date" required />
              </div>
              <div class="col-sm-6">
                <label for="metodopago"><b>Método Pago</b></label>
                <select v-model="venta.metodopago" class="form-control" id="metodopago" required>
                  <option value="qr">Pago con QR</option>
                  <option value="cash">Pago en efectivo</option>
                  <option value="card">Pago con tarjeta</option>
                </select>
              </div>
            </div>
            <div class="row">
              <label for=""><b>Productos</b></label>
            </div>
            <div class="row">
              <div class="col-sm-4">
                <label for="producto">Producto</label>
                <select v-model="nuevoProducto.id" class="form-control" id="producto">
                  <option v-for="producto in productos" :key="producto.id" :value="producto.id">{{ producto.name }}
                  </option>
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
                <!-- <template #cell(actions)="row">
                    <svg @click="eliminarProducto(row.index)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </template> -->
              </b-table>
            </div>
          </div>
          <div class="row" style="justify-content: end;">
            <div class="col-sm-2">
              <div class="form-group">
                <label for="total"><b>Total</b></label>
                <input type="text" v-model="venta.total" class="form-control" id="total" required readonly />
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
  name: 'VentaForm',
  props: {
    venta: {
      type: Object,
      default: () => ({ cliente: '', date: '', metodopago: '', productos: [], total: 0 })
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
        nombre: '',
        cantidad: 1
      },
      items: [],
      productos: [],
      clientes: [],
      fields: [
        { key: 'Producto', label: 'Producto' },
        { key: 'Precio', label: 'Precio' },
        { key: 'Cantidad', label: 'Cantidad' },
        { key: 'Total', label: 'Total' },
      ]
    };
  },
  created() {
    this.fetchProductos();
    this.fetchClientes();

    if (this.isEditing) {
      this.fetchVentaDetails(this.venta.id);
    }
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
    fetchClientes() {
      axios.post('http://18.218.15.90:8080/graphql', {
        query: `
          {
            customers {
              id
              name
            }
          }
        `
      })
        .then(response => {
          this.clientes = response.data.data.customers;
        })
        .catch(error => {
          console.error(error);
        });
    },
    async fetchProductoId(id) {
      try {
        const response = await axios.post('http://18.218.15.90:8080/graphql', {
          query: `
      {
        product(id: "${id}") {
            brand_id
            color_id
            code
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
        const prod = response.data.data.product;
        return prod.name;
      } catch (error) {
        console.error(error);
        return '';
      }
    },

    fetchVentaDetails(id) {
      axios.post('http://18.218.15.90:8080/graphql', {
        query: `
      {
        sale(id: "${id}") {
          id
          date
          total
          payment_type
          quantity_items
          customer_id
          user_id
          details {
            product_id
            sale_id
            quantity
            price
            total
          }
        }
      }
    `
      })
        .then(response => {
          const sale = response.data.data.sale;
          console.log('edit', sale);
          this.venta.date = sale.date;
          this.venta.metodopago = sale.payment_type;
          this.venta.cliente = sale.customer_id;
          this.venta.total = sale.total;

          // Poblar la tabla con los detalles de la venta
          Promise.all(sale.details.map(detail => this.fetchProductoId(detail.product_id)))
            .then(productos => {
              this.items = sale.details.map((detail, index) => ({
                Producto: productos[index],
                Precio: detail.price,
                Cantidad: detail.quantity,
                Total: detail.total
              }));
            })
            .catch(error => {
              console.error(error);
            });
        })
        .catch(error => {
          console.error(error);
        });
    },
    handleSubmit() {
      const detalles = this.items.map(item => ({
        product_id: this.productos.find(producto => producto.name === item.Producto).id,
        quantity: item.Cantidad,
        price: item.Precio
      }));
      const saleData = {
        date: this.venta.date,
        payment_type: this.venta.metodopago,
        customer_id: this.venta.cliente,
        user_id: 2, // Debes reemplazar esto con el id del usuario real
        details: detalles
      };

      axios.post('http://18.218.15.90:8080/graphql', {
        query: `
          mutation {
            createSale(input: {
              date: "${saleData.date}",
              payment_type: "${saleData.payment_type}",
              customer_id: ${saleData.customer_id},
              user_id: ${saleData.user_id},
              details: ${JSON.stringify(saleData.details).replace(/"([^"]+)":/g, '$1:')}
            }) {
              id
              date
              total
              payment_type
              quantity_items
              customer_id
              user_id
            }
          }
        `
      })
        .then(response => {
          console.log(response.data);
          this.$emit('submit', { ...this.venta });
        })
        .catch(error => {
          console.error(error);
        });
    },
    cancelarOperacion() {
      this.$emit('cancelar'); // Emitir evento cancelar
    },
    agregarProducto() {
      const productoSeleccionado = this.productos.find(producto => producto.id === this.nuevoProducto.id);
      if (productoSeleccionado && this.nuevoProducto.cantidad > 0) {
        const precio = 10; // Suponiendo un precio fijo para simplificar
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
      const deletedDetailId = this.items[index].IdDetalle; // Obtener el ID del detalle que se va a eliminar
      this.items.splice(index, 1); // Eliminar el detalle de la tabla

      // Actualizar la venta eliminando el detalle correspondiente
      axios.post('http://18.218.15.90:8080/graphql', {
        query: `
      mutation {
        updateSale(id: "${this.venta.id}", input: {
          date: "${this.venta.date}",
          details: [
            ${this.items.map(item => {
          if (item.IdDetalle !== deletedDetailId) { // Verificar si el detalle es el que se va a eliminar
            return `{ product_id: ${this.fetchProductId(item.Producto)}, quantity: ${item.Cantidad}, price: ${item.Precio} }`;
          }
        }).filter(Boolean).join(', ')} // Filtrar los detalles que no sean nulos (se excluyen los detalles que se van a eliminar)
          ]
        }) {
          date
          total
          payment_type
          quantity_items
        }
      }
    `
      })
        .then(response => {
          console.log('Venta actualizada:', response.data);
        })
        .catch(error => {
          console.error('Error al actualizar la venta:', error);
        });
      this.calcularTotal();
    },
    calcularTotal() {
      const total = this.items.reduce((acc, item) => acc + item.Total, 0);
      this.venta.total = total;
    }
  }
};
</script>

<style>
.container.formventa {
  margin-left: 50px;
}

.row {
  margin-bottom: 30px;
}

.bold-label {
  font-weight: bold;
}
</style>
