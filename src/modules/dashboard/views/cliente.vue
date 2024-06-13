<template>
  <div>
    <cliente-form v-if="isFormVisible" :cliente="selectedcliente" :isEditing="isEditing" @submit="handleFormSubmit" @cancelar="cancelarOperacion"/>
    <cliente-list v-else :clientes="clientes" @create="handleCreate" @edit="handleEdit" @view="handleView" @delete="handleDelete" />
  </div>
</template>

<script>
import clienteForm from '../components/clienteForm.vue';
import clienteList from '../components/clienteList.vue';
import axios from "axios";
export default {
  name: 'cliente',
  components: {
    clienteForm,
    clienteList
  },
  data() {
    return {
      clientes: [],
      isFormVisible: false,
      isEditing: false,
      selectedcliente: null
    };
  },
  methods: {
    handleCreate() {
      this.selectedcliente = { fecha: '', total: 0 };
      this.isEditing = false;
      this.isFormVisible = true;
    },
    handleEdit(cliente) {
      this.selectedcliente = { ...cliente };
      this.isEditing = true;
      this.isFormVisible = true;
    },
    handleView(cliente) {
      // Aquí podrías implementar la lógica para ver los detalles de la cliente.
      alert(`Detalles de la cliente: \nFecha: ${cliente.fecha}\nTotal: ${cliente.total}`);
    },
    handleDelete(id) {
      this.clientes = this.clientes.filter(cliente => cliente.id !== id);
    },
    handleFormSubmit(cliente) {
      if (this.isEditing) {
        this.clientes = this.clientes.map(v => (v.id === cliente.id ? cliente : v));
      } else {
        cliente.id = this.clientes.length + 1;
        this.clientes.push(cliente);
      }
      this.isFormVisible = false;
    },
     cancelarOperacion() {
      this.isFormVisible = false;
    },
    sortCliente() {
      this.clientes.sort((a, b) => new Date(b.date) - new Date(a.date));
    },

  },
 async mounted() {
    try {
      var result = await axios({
        method: "POST",
        url: "http://18.218.15.90:8080/graphql",
        data: {
          query: `{
          customers {
            email
            id
            name
            phone
          }
          }
          `
        }
      });
      this.clientes = result.data.data.customers;
      this.sortCliente();  // Sort ventas after fetching
    } catch (error) {
      console.error(error);
    }
  },
};
</script>