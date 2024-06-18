<template>
  <div>
    <devolucion-form v-if="isFormVisible" :refund="selectedRefund" :isEditing="isEditing" @submit="handleFormSubmit" @cancelar="cancelarOperacion" />
    <devolucion-list v-if="!isFormVisible && !isDetailVisible" :refunds="refunds" @create="handleCreate" @edit="handleEdit" @view="handleView" @delete="handleDelete" />
    <devolucion-detail v-if="isDetailVisible" :refund="selectedRefund" @cancelar="cancelarOperacion" />
  </div>
</template>

<script>
import DevolucionForm from '../components/DevolucionForm.vue';
import DevolucionList from '../components/DevolucionList.vue';
import DevolucionDetail from '../components/DevolucionDetail.vue';
import axios from "axios";

export default {
  name: 'devolucion',
  components: {
    DevolucionForm,
    DevolucionList,
    DevolucionDetail
  },
  data() {
    return {
      refunds: [],
      isFormVisible: false,
      isEditing: false,
      selectedRefund: null,
      isDetailVisible: false
    };
  },
  methods: {
    handleCreate() {
      this.selectedRefund = { fecha: '', total: 0 };
      this.isEditing = false;
      this.isFormVisible = true;
      this.isDetailVisible = false;
    },
    handleEdit(refund) {
      this.selectedRefund = { ...refund };
      this.isEditing = true;
      this.isFormVisible = true;
      this.isDetailVisible = false;
    },
    handleView(refund) {
      this.selectedRefund = { ...refund};
      this.isDetailVisible = true;
      this.isFormVisible = false;
      this.isEditing = false;
    },
    handleDelete(id) {
      this.refunds = this.refunds.filter(refund => refund.id !== id);
      this.isDetailVisible = false;
    },
    handleFormSubmit(refund) {
      if (this.isEditing) {
        this.refunds = this.refunds.map(v => (v.id === refund.id ? refund : v));
      } else {
        refund.id = this.refunds.length + 1;
        this.refunds.push(refund);
      }
      this.isFormVisible = false;
      this.isDetailVisible = false;
      this.sortRefunds();  // Sort devoluciones after adding a new one
    },
    cancelarOperacion() {
      this.isFormVisible = false;
      this.isDetailVisible = false;
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