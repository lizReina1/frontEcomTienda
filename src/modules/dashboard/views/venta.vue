<template>
  <div>
    <venta-form v-if="isFormVisible" :venta="selectedVenta" :isEditing="isEditing" @submit="handleFormSubmit" @cancelar="cancelarOperacion"/>
    <venta-list v-else :ventas="ventas" @create="handleCreate" @edit="handleEdit" @view="handleView" @delete="handleDelete" />
  </div>
</template>

<script>
import VentaForm from '../components/VentaForm.vue';
import VentaList from '../components/VentaList.vue';
import axios from "axios";

export default {
  name: 'venta',
  components: {
    VentaForm,
    VentaList
  },
  data() {
    return {
      ventas: [],
      isFormVisible: false,
      isEditing: false,
      selectedVenta: null
    };
  },
  methods: {
    handleCreate() {
      this.selectedVenta = { fecha: '', total: 0 };
      this.isEditing = false;
      this.isFormVisible = true;
    },
    handleEdit(venta) {
      this.selectedVenta = { ...venta };
      this.isEditing = true;
      this.isFormVisible = true;
    },
    handleView(venta) {
      alert(`Detalles de la venta: \nFecha: ${venta.date}\nTotal: ${venta.total}`);
    },
    handleDelete(id) {
      this.ventas = this.ventas.filter(venta => venta.id !== id);
    },
    handleFormSubmit(venta) {
      if (this.isEditing) {
        this.ventas = this.ventas.map(v => (v.id === venta.id ? venta : v));
      } else {
        venta.id = this.ventas.length + 1;
        this.ventas.push(venta);
      }
      this.isFormVisible = false;
      this.sortVentas();  // Sort ventas after adding a new one
    },
    cancelarOperacion() {
      this.isFormVisible = false;
    },
    sortVentas() {
      this.ventas.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  },
  async mounted() {
    try {
      var result = await axios({
        method: "POST",
        url: "http://18.218.15.90:8080/graphql",
        data: {
          query: `
          {
            sales {
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
        }
      });
      this.ventas = result.data.data.sales;
      this.sortVentas();  // Sort ventas after fetching
    } catch (error) {
      console.error(error);
    }
  }
};
</script>
