<template>
  <div>
    <proveedor-list :proveedores="proveedores" @create="handleCreate" @edit="handleEdit" @view="handleView" @delete="handleDelete" />
  </div>
</template>

<script>
import ProveedorList from '../components/ProveedoresList.vue';
import axios from "axios";
export default {
  name: 'Proveedor',
  components: {
    ProveedorList
  },
  data() {
    return {
      proveedores: [],
      isFormVisible: false,
      isEditing: false,
      selectedProveedor: null
    };
  },
  methods: {
    handleCreate() {
      this.selectedProveedor = { fecha: '', total: 0 };
      this.isEditing = false;
      this.isFormVisible = true;
    },
    handleEdit(proveedor) {
      this.selectedproveedor = { ...proveedor };
      this.isEditing = true;
      this.isFormVisible = true;
    },
    handleView(proveedor) {
      // Aquí podrías implementar la lógica para ver los detalles de la proveedor.
      alert(`Detalles de la proveedor: \nFecha: ${proveedor.fecha}\nTotal: ${proveedor.total}`);
    },
    handleDelete(id) {
      this.proveedores = this.proveedores.filter(proveedor => proveedor.id !== id);
    },
    handleFormSubmit(proveedor) {
      if (this.isEditing) {
        this.proveedores = this.proveedores.map(v => (v.id === proveedor.id ? proveedor : v));
      } else {
        proveedor.id = this.proveedores.length + 1;
        this.proveedores.push(proveedor);
      }
      this.isFormVisible = false;
    },
     cancelarOperacion() {
      this.isFormVisible = false;
    }, sort() {
      this.proveedores.sort((a, b) => new Date(b.date) - new Date(a.date));
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
      this.proveedores = result.data.data.purchases;
      this.sort();  // Sort ventas after fetching
    } catch (error) {
      console.error(error);
    }
  },
  
  
};
</script>
