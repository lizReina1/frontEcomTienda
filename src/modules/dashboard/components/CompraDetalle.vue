<template>
  <div class="card">
    <div class="col">
      <h2>Detalles de la compra</h2>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Fecha</th>
            <th scope="col">Nombre Proveedor</th>
            <th scope="col">Productos</th>
            <th scope="col">Precio</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="compra">
            <th scope="row">{{ compra.id }}</th>
            <td>{{ formatDate(compra.date) }}</td>
            <td>{{ supplierNames[compra.supplier_id] || 'Cargando...' }}</td>
            <td>
              <ul>
                <li v-for="(detail, index) in compra.details" :key="detail.id || index">
                  {{ productNames[detail.product_id] || 'Cargando...' }}
                </li>
              </ul>
            </td>
            <td>
              <ul>
                <li v-for="(detail, index) in compra.details" :key="detail.id || index">
                {{ detail.price }}
                </li>
              </ul>
            </td>
            <td>
              <ul>
                <li v-for="(detail, index) in compra.details" :key="detail.id || index">
                  {{ detail.quantity }}
                </li>
              </ul>
            </td>
            <td>{{ compra.total }}</td>
          </tr>
        </tbody>
      </table>
      <div class="card-footer d-flex justify-content-center"> <!-- Cambio en la clase para centrar -->
        <div class="col-md-8 text-md-end"> <!-- Ajuste de clases para ocupar casi todo el ancho y alinear a la derecha en pantallas medianas -->
          <button @click.prevent="cancelarOperacion" class="btn btn-dark w-100">Volver</button> <!-- Ancho del 100% para ocupar casi todo el ancho -->
        </div>
      </div>

    </div>
  </div>
  
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'CompraDetalle',
    props: {
      compraId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        compra: null,
        supplierNames: {},
        productNames: {}
      };
    },
    watch: {
      compraId: {
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
      async getSupplierName(supplierId) {
        try {
          if (!this.supplierNames[supplierId]) {
            const result = await axios.post('http://18.218.15.90:8080/graphql', {
              query: `{
                supplier(id: "${supplierId}") {
                  id
                  name
                }
              }`
            });
            this.$set(this.supplierNames, supplierId, result.data.data.supplier.name);
          }
          return this.supplierNames[supplierId];
        } catch (error) {
          console.error('Error obteniendo el nombre del proveedor:', error);
          return 'Proveedor Desconocido';
        }
      },
      async loadSupplierName(supplierId) {
        await this.getSupplierName(supplierId);
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
              purchase(id: "${compraId}") {
                id
                total
                date
                supplier_id
                details {
                  id
                  price
                  product_id
                  purchase_id
                  quantity
                  total
                }
              }
            }`
          });
  
          const compra = result.data.data.purchase;
          this.compra = compra;
  
          // Cargar el nombre del proveedor
          await this.loadSupplierName(compra.supplier_id);
  
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
  