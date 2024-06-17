<template>
    <div id="DevolucionForm">
        <div class="container formrefund justify-content-center">
            <div class="row justify-content-center">
                <h4><b>{{ isEditing ? 'Editar Devolución' : 'Crear Devolución' }}</b></h4>
            </div>
            <div class="row">
                <form @submit.prevent="handleSubmit">
                    <div class="form-group">
                        <div class="row">
                            <label for="cliente" class="bold-label"> Cliente </label>
                            <select v-model="refund.cliente" class="form-control" id="cliente" required>
                                <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">{{
                                    cliente.name }}</option>
                            </select>
                        </div>

                        <div class="row">
                            <div class="col-sm-6">
                                <label for="date"><b>Fecha</b></label>
                                <input type="date" v-model="refund.date" class="form-control" id="date" required />
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-sm-4">
                            <button type="submit" class="btn btn-primary">{{ isEditing ? 'Guardar Cambios' : 'Crear'
                                }}</button>
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
    name: 'DevolucionForm',
    props: {
        refund: {
            type: Object,
            default: () => ({ cliente: '', date: '', total: 0 })
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
            this.fetchVentaDetails(this.refund.id);
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
        fetchProductoId(id) {
            return axios.post('http://18.218.15.90:8080/graphql', {
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
            })
                .then(response => {
                    const prod = response.data.data.product;
                    return prod.name; // Devolver el nombre del producto
                })
                .catch(error => {
                    console.error(error);
                    return ''; // O cualquier valor predeterminado en caso de error
                });
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
                    this.refund.date = sale.date;
                    this.refund.metodopago = sale.payment_type;
                    this.refund.cliente = sale.customer_id;
                    this.refund.total = sale.total;

                    // Poblar la tabla con los detalles de la refund
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
                date: this.refund.date,
                payment_type: this.refund.metodopago,
                customer_id: this.refund.cliente,
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
                    this.$emit('submit', { ...this.refund });
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

            // Actualizar la refund eliminando el detalle correspondiente
            axios.post('http://18.218.15.90:8080/graphql', {
                query: `
        mutation {
          updateSale(id: "${this.refund.id}", input: {
            date: "${this.refund.date}",
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
                    console.log('refund actualizada:', response.data);
                })
                .catch(error => {
                    console.error('Error al actualizar la refund:', error);
                });
            this.calcularTotal();
        },
        calcularTotal() {
            const total = this.items.reduce((acc, item) => acc + item.Total, 0);
            this.refund.total = total;
        }
    }
};
</script>

<style>
.container.formrefund {
    margin-left: 50px;
}

.row {
    margin-bottom: 30px;
}

.bold-label {
    font-weight: bold;
}
</style>