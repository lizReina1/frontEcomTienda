<template>
  <div>
    <devolucion-form v-if="isFormVisible" :refund="selectedRefund" :isEditing="isEditing" @submit="handleFormSubmit" @cancelar="cancelarOperacion" />
    <devolucion-list v-else :refunds="refunds" @create="handleCreate" @edit="handleEdit" @view="handleView" @delete="handleDelete" />
  </div>
</template>

<script>
import DevolucionForm from '../components/DevolucionForm.vue';
import DevolucionList from '../components/DevolucionList.vue';
import axios from "axios";

export default {
  name: 'devolucion',
  components: {
    DevolucionForm,
    DevolucionList
  },
  data() {
    return {
      refunds: [],
      isFormVisible: false,
      isEditing: false,
      selectedRefund: null
    };
  },
  methods: {
    handleCreate() {
      this.selectedRefund = { fecha: '', total: 0 };
      this.isEditing = false;
      this.isFormVisible = true;
    },
    handleEdit(refund) {
      this.selectedRefund = { ...refund };
      this.isEditing = true;
      this.isFormVisible = true;
    },
    handleView(refund) {
      alert(`Detalles de la devolucion: \nFecha: ${refund.date}\nCantidad: ${refund.quantity}`);
    },
    handleDelete(id) {
      this.refunds = this.refunds.filter(refund => refund.id !== id);
    },
    handleFormSubmit(refund) {
      if (this.isEditing) {
        this.refunds = this.refunds.map(v => (v.id === refund.id ? refund : v));
      } else {
        refund.id = this.refunds.length + 1;
        this.refunds.push(refund);
      }
      this.isFormVisible = false;
      this.sortRefunds();  // Sort devoluciones after adding a new one
    },
    cancelarOperacion() {
      this.isFormVisible = false;
    },
    sortRefunds() {
      this.refunds.sort((a, b) => new Date(b.date) - new Date(a.date));
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
            refunds {
              id
              date
              reason
              quantity
              customer_id
            }
          }
          `
        }
      });
      this.refunds = result.data.data.refunds;
      this.sortRefunds();  // Sort ventas after fetching
    } catch (error) {
      console.error(error);
    }
  }
};
</script>