<template>
  <div>
    <producto-form v-if="isFormVisible" :producto="selectedProducto" :isEditing="isEditing" @submit="handleFormSubmit"
      @cancelar="cancelarOperacion" />
    <producto-list v-if="!isFormVisible && !isDetailVisible" :productos="productos" @create="handleCreate"
      @edit="handleEdit" @view="handleView" @delete="handleDelete" />
    <producto-detail v-if="isDetailVisible" :producto="selectedProducto" @cancelar="cancelarOperacion" />
  </div>
</template>

<script>
import ProductoForm from '../components/ProductoForm.vue';
import ProductoList from '../components/ProductoList.vue';
import ProductoDetail from '../components/ProductoDetail.vue';
import axios from "axios";
export default {
  name: 'producto',
  components: {
    ProductoForm,
    ProductoList,
    ProductoDetail
  },
  data() {
    return {
      productos: [],
      isFormVisible: false,
      isEditing: false,
      selectedProducto: null,
      isDetailVisible: false
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
      this.isDetailVisible = false;
    },
    handleView(producto) {
      this.selectedProducto = { ...producto };
      this.isDetailVisible = true;
      this.isFormVisible = false;
      this.isEditing = false;
    },
    handleDelete(id) {
      this.productos = this.productos.filter(producto => producto.id !== id);
      this.isDetailVisible = false;
    },
    handleFormSubmit(producto) {
      if (this.isEditing) {
        this.productos = this.productos.map(v => (v.id === producto.id ? producto : v));
      } else {
        producto.id = this.productos.length + 1;
        this.productos.push(producto);
      }
      this.isFormVisible = false;
      this.isDetailVisible = false;
      this.sortProductos();
    },
    cancelarOperacion() {
      this.isFormVisible = false;
      this.isDetailVisible = false;
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
  },
};
</script>
