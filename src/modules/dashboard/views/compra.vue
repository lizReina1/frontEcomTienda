<template>
  <div>
    <compra-form v-if="isFormVisible" :compra="selectedCompra" :isEditing="isEditing" @submit="handleFormSubmit" @cancelar="cancelarOperacion"/>
    <compra-list v-else-if="!isDetalleVisible" :compras="compras" @create="handleCreate" @edit="handleEdit" @view="handleView" @delete="handleDelete" />
    <compra-detalle v-if="isDetalleVisible" :compra-id="selectedCompra.id.toString()" @cancelar="cancelarOperacion" />
  </div>
</template>

<script>
import CompraForm from '../components/CompraForm.vue';
import CompraList from '../components/CompraList.vue';
import CompraDetalle from '../components/CompraDetalle.vue'; // Importa el nuevo componente
import axios from 'axios';

export default {
  name: 'compra',
  components: {
    CompraForm,
    CompraList,
    CompraDetalle
  },
  data() {
    return {
      compras: [],
      isFormVisible: false,
      isEditing: false,
      selectedCompra: null,
      isDetalleVisible: false
    };
  },
  methods: {
    handleCreate() {
      this.selectedCompra = { fecha: '', total: 0 };
      this.isEditing = false;
      this.isFormVisible = true;
    },
    handleEdit(compra) {
      this.selectedCompra = { ...compra };
      this.isEditing = true;
      this.isFormVisible = true;
    },
    handleView(compra) {
      this.selectedCompra = { ...compra };
      this.isEditing = false;
      this.isFormVisible = false;
      this.isDetalleVisible = true;
    },
    handleDelete(id) {
      this.compras = this.compras.filter(compra => compra.id !== id);
    },
    handleFormSubmit(compra) {
      if (this.isEditing) {
        this.compras = this.compras.map(v => (v.id === compra.id ? compra : v));
      } else {
        compra.id = this.compras.length + 1;
        this.compras.push(compra);
      }
      this.isFormVisible = false;
    },
    cancelarOperacion() {
      this.isFormVisible = false;
      this.isDetalleVisible = false;
      this.selectedCompra = null;
    },
    sortCompras() {
      this.compras.sort((a, b) => new Date(b.date) - new Date(a.date));
    },
  },
  async mounted() {
    try {
      var result = await axios({
        method: "POST",
        url: "http://18.218.15.90:8080/graphql",
        data: {
          query: `
          {
            purchases {
              date
              id
              supplier_id
              total
              details {
                id
                price
                product_id
                purchase_id
                quantity
                total
              }
            }
          }
          `
        }
      });
      this.compras = result.data.data.purchases;
      this.sortCompras();  // Ordenar compras después de obtenerlas
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
