<template>
  <div>
    <compra-form v-if="isFormVisible" :compra="selectedCompra" :isEditing="isEditing" @submit="handleFormSubmit" @cancelar="cancelarOperacion"/>
    <compra-list v-else :compras="compras" @create="handleCreate" @edit="handleEdit" @view="handleView" @delete="handleDelete" />
  </div>
</template>

<script>
import CompraForm from '../components/CompraForm.vue';
import CompraList from '../components/CompraList.vue';
import axios from "axios";
export default {
  name: 'compra',
  components: {
    CompraForm,
    CompraList
  },
  data() {
    return {
      compras: [],
      isFormVisible: false,
      isEditing: false,
      selectedCompra: null
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
      // Aquí podrías implementar la lógica para ver los detalles de la compra.
      alert(`Detalles de la compra: \nFecha: ${compra.fecha}\nTotal: ${compra.total}`);
    },
    handleDelete(id) {
      this.compras = this.compras.filter(compra => compras.id !== id);
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
    } catch (error) {
      console.error(error);
    }
  },
  
  
};
</script>
