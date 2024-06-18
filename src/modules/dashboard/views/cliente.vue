<template>
  <div>
    <cliente-form v-if="isFormVisible" :cliente="selectedCliente" :isEditing="isEditing" @submit="handleFormSubmit" @cancelar="cancelarOperacion"/>
    <cliente-list v-else-if="!isDetalleVisible" :clientes="clientes" @create="handleCreate" @edit="handleEdit" @view="handleView" @delete="handleDelete" />
    <cliente-detalle v-if="isDetalleVisible" :cliente-id="selectedCliente.id" @cancelar="cancelarOperacion" />
  </div>
</template>

<script>
import ClienteForm from '../components/clienteForm.vue';
import ClienteList from '../components/clienteList.vue';
import ClienteDetalle from '../components/ClienteDetalle.vue'; // Asegúrate de que este nombre coincide
import axios from 'axios';

export default {
  name: 'cliente',
  components: {
    ClienteForm,
    ClienteList,
    ClienteDetalle
  },
  data() {
    return {
      clientes: [],
      isFormVisible: false,
      isEditing: false,
      selectedCliente: null,
      isDetalleVisible: false
    };
  },
  methods: {
    handleCreate() {
      this.selectedCliente = { fecha: '', total: 0 };
      this.isEditing = false;
      this.isFormVisible = true;
    },
    handleEdit(cliente) {
      this.selectedCliente = { ...cliente };
      this.isEditing = true;
      this.isFormVisible = true;
    },
    handleView(cliente) {
      this.selectedCliente = { ...cliente };
      this.isEditing = false;
      this.isFormVisible = false;
      this.isDetalleVisible = true;
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
      this.isDetalleVisible = false;
      this.selectedCliente = null;
    },
    sortCliente() {
      this.clientes.sort((a, b) => new Date(b.date) - new Date(a.date));
    },
  },
  async mounted() {
    try {
      const result = await axios.post('http://18.218.15.90:8080/graphql', {
        query: `
        {
          customers {
            email
            id
            name
            phone
          }
        }
        `
      });
      this.clientes = result.data.data.customers;
      this.sortCliente();  // Sort clientes after fetching
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
