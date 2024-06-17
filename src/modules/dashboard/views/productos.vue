<template>
  <div>
    <producto-form v-if="isFormVisible" :producto="selectedProducto" :isEditing="isEditing" @submit="handleFormSubmit" @cancelar="cancelarOperacion"/>
    <producto-list v-else :productos="productos" @create="handleCreate" @edit="handleEdit" @view="handleView" @delete="handleDelete" />
  </div>
</template>

<script>
import ProductoForm from '../components/ProductoForm.vue';
import ProductoList from '../components/ProductoList.vue';
import axios from "axios";
export default {
  name: 'producto',
  components: {
    ProductoForm,
    ProductoList
  },
  data() {
    return {
      productos: [],
      isFormVisible: false,
      isEditing: false,
      selectedProducto: null
    };
  },
  methods: {
    handleCreate() {
      this.selectedProducto = { fecha: '', total: 0 };
      this.isEditing = false;
      this.isFormVisible = true;
    },
    handleEdit(producto) {
      this.selectedProducto = { ...producto };
      this.isEditing = true;
      this.isFormVisible = true;
    },
    handleView(producto) {
      // Aquí podrías implementar la lógica para ver los detalles de la producto.
      alert(`Detalles del producto: \nFecha: ${producto.fecha}\nTotal: ${producto.total}`);
    },
    handleDelete(id) {
      this.productos = this.productos.filter(producto => producto.id !== id);
    },
    handleFormSubmit(producto) {
      if (this.isEditing) {
        this.productos = this.productos.map(v => (v.id === producto.id ? producto : v));
      } else {
        producto.id = this.productos.length + 1;
        this.productos.push(producto);
      }
      this.isFormVisible = false;
       this.sortProductos(); 
    },
     cancelarOperacion() {
      this.isFormVisible = false;
    },
     sortProductos() {
      this.productos.sort((a, b) => new Date(b.date) - new Date(a.date));
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
          products {
            brand_id
            code
            color_id
            description
            id
            image
            model_id
            name
            price
            size_id
            stock
          }
        }
          `
        }
      });
      this.productos = result.data.data.products;
      this.sortProductos();  
    } catch (error) {
      console.error(error);
    }
  }
};
</script>
