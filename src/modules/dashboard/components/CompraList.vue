<template>
  <div id="CompraList">
    <h4><strong>Compras</strong></h4>
    <div class="col-sm-4">
      <button type="button" class="btn btn-info mb-3" @click="$emit('create')">Crear Compra</button>
    </div>
    <div class="col">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Fecha</th>
          <th scope="col">Total</th>
          <th scope="col">Nombre Proveedor</th>
          <th scope="col">Opciones</th>
        </tr>
      </thead>
      <tbody>
       <tr v-for="compra in paginatedCompras" :key="compra.id">
          <th scope="row">{{ compra.id }}</th>
          <td>{{ formatDate(compra.date) }}</td>
          <td>{{ compra.total }}</td>
         <td>{{ supplierNames[compra.supplier_id] || 'Cargando...' }}</td>
          <td>
            <div class="row">
              <!-- <div class="col-sm-2" @click="$emit('edit', compra)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                </svg>
              </div> -->
              <div class="col-sm-2" @click="$emit('view', compra)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                </svg>
              </div>
              <div class="col-sm-2" @click="$emit('delete', compra.id)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="card">
      <div class="card-body">
        <nav>
          <ul class="pagination flex-wrap d-flex justify-content-center">
            <li class="page-item">
              <button class="page-link" @click="currentPage--" :disabled="currentPage === 1" data-abc="true"><i class="fa fa-angle-left"></i> Anterior</button>
            </li>
            <li class="page-item" v-for="pageNumber in visiblePageNumbers" :key="pageNumber">
              <button class="page-link" @click="currentPage = pageNumber" :class="{ 'active': pageNumber === currentPage }">{{ pageNumber }}</button>
            </li>
            <li class="page-item">
              <button class="page-link" @click="currentPage++" :disabled="currentPage === totalPages" data-abc="true">Siguiente <i class="fa fa-angle-right"></i></button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';
import 'bootstrap'; // Asegúrate de importar bootstrap.js si no lo has hecho ya
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-datepicker';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css';

export default {
  name: 'CompraList',
  props: {
    compras: Array
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      searchDate: '',
      supplierNames: {}

    };
  },
  methods: {
    filteredCompras() {
      if (!this.searchDate) return this.compras;
      const searchDate = new Date(this.searchDate);
      return this.compras.filter(compra => {
        const compraDate = new Date(compra.date);
        return compraDate.toDateString() === searchDate.toDateString();
      });
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    async loadSupplierNames() {
      if (!this.compras || this.compras.length === 0) return;

      const supplierIds = [...new Set(this.compras
        .filter(compra => compra && compra.supplier_id)
        .map(compra => compra.supplier_id))];

      for (const id of supplierIds) {
        if (!this.supplierNames[id]) {
          await this.fetchSupplierName(id);
        }
      }
    },
    async fetchSupplierName(supplierId) {
      try {
        const result = await axios.post('http://18.218.15.90:8080/graphql', {
          query: `{
                supplier(id: "${supplierId}") {
                  id
                  name
                }
              }
            `,
        });
        const supplier = result.data.data.supplier;
        if (supplier && supplier.id) {
          this.$set(this.supplierNames, supplier.id, supplier.name);
        }
      } catch (error) {
        console.error('Error obteniendo el nombre del proveedor:', error);
        this.$set(this.supplierNames, supplierId, 'Error al cargar');
      }
    },
  },
  computed: {
    paginatedCompras() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredCompras().slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.filteredCompras().length / this.pageSize);
    },
    visiblePageNumbers() {
      const numberOfPages = Math.min(5, this.totalPages);
      const middlePage = Math.ceil(numberOfPages / 2);
      const startPage = Math.max(1, this.currentPage - middlePage + 1);
      const endPage = Math.min(this.totalPages, startPage + numberOfPages - 1);
      return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
    },

  },
  mounted() {
    this.loadSupplierNames();
    const $datepicker7 = $(this.$refs.datetimepicker7).datepicker({
      format: 'yyyy-mm-dd',
      autoclose: true,
    });

    // Configurar el mínimo y máximo valor del primer datepicker
    $datepicker7.on('changeDate', (e) => {
      $datepicker6.datepicker('setEndDate', e.date);
    });

    this.loadSupplierNames();
  },
  watch: {
    compras: {
      handler() {
        this.$nextTick(() => {
          this.loadSupplierNames();
        });
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
