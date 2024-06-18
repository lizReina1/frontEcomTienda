<template>
    <div class="col">
      <h2>Información del cliente</h2>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Cliente</th>
            <th scope="col">Productos</th>
            <th scope="col">Precio</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Total</th>
            <th scope="col">Fecha</th>
            <th scope="col">Método de Pago</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="compra">
            <th scope="row">{{ compra.id }}</th>
            <td>{{ customerNames[compra.customer_id] || 'Cargando...' }}</td>
            <td>
              <ul>
                <li v-for="(detail, index) in compra.details" :key="detail.product_id || index">
                  {{ productNames[detail.product_id] || 'Cargando...' }}
                </li>
              </ul>
            </td>
            <td>
              <ul>
                <li v-for="(detail, index) in compra.details" :key="detail.product_id || index">
                  {{ detail.price }}
                </li>
              </ul>
            </td>
            <td>
              <ul>
                <li v-for="(detail, index) in compra.details" :key="detail.product_id || index">
                  {{ detail.quantity }}
                </li>
              </ul>
            </td>
            <td>{{ compra.total }}</td>
            <td>{{ formatDate(compra.date) }}</td>
            <td>{{ compra.payment_type }}</td>
          </tr>
        </tbody>
      </table>
      <div class="card-footer d-flex justify-content-center"> <!-- Cambio en la clase para centrar -->
        <div class="col-md-8 text-md-end"> <!-- Ajuste de clases para ocupar casi todo el ancho y alinear a la derecha en pantallas medianas -->
          <button @click.prevent="cancelarOperacion" class="btn btn-dark w-100">Volver</button> <!-- Ancho del 100% para ocupar casi todo el ancho -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ClienteDetalle',
    props: {
      clienteId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        compra: null,
        customerNames: {},
        productNames: {}
      };
    },
    watch: {
      clienteId: {
        immediate: true,
        handler(newVal) {
          if (newVal) {
            this.fetchCompraDetails(newVal);
          }
        }
      }
    },
    methods: {
      formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      },
      async getCustomerName(customerId) {
        try {
          if (!this.customerNames[customerId]) {
            const result = await axios.post('http://18.218.15.90:8080/graphql', {
              query: `{
                customer(id: "${customerId}") {
                  id
                  name
                }
              }`
            });
            this.$set(this.customerNames, customerId, result.data.data.customer.name);
          }
          return this.customerNames[customerId];
        } catch (error) {
          console.error('Error obteniendo el nombre del cliente:', error);
          return 'Cliente Desconocido';
        }
      },
      async loadCustomerName(customerId) {
        await this.getCustomerName(customerId);
      },
      async getProductName(productId) {
        try {
          if (!this.productNames[productId]) {
            const result = await axios.post('http://18.218.15.90:8080/graphql', {
              query: `{
                product(id: "${productId}") {
                  id
                  name
                }
              }`
            });
            this.$set(this.productNames, productId, result.data.data.product.name);
          }
          return this.productNames[productId];
        } catch (error) {
          console.error('Error obteniendo el nombre del producto:', error);
          return 'Producto Desconocido';
        }
      },
      async loadProductNames(productIds) {
        const uniqueProductIds = [...new Set(productIds)];
        await Promise.all(uniqueProductIds.map(id => this.getProductName(id)));
      },
      async fetchCompraDetails(compraId) {
        try {
          const result = await axios.post('http://18.218.15.90:8080/graphql', {
            query: `{
              sale(id: "${compraId}") {
                id
                total
                date
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
            }`
          });
  
          const compra = result.data.data.sale;
          this.compra = compra;
  
          // Cargar el nombre del cliente
          await this.loadCustomerName(compra.customer_id);
  
          // Cargar los nombres de los productos
          await this.loadProductNames(compra.details.map(detail => detail.product_id));
        } catch (error) {
          console.error('Error obteniendo los detalles de la compra:', error);
        }
      },
      cancelarOperacion() {
        this.$emit('cancelar');
      }
    }
  };
  </script>
  