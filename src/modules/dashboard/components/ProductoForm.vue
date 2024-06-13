<template>
  <div id="ProductoForm">
    <div class="container formProducto">
      <div class="row justify-content-center">
        <h4><b>{{ isEditing ? 'Editar Producto' : 'Crear Producto' }}</b></h4>
      </div>
      <div class="row">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <div class="row">
              <div class="col-sm-6">
                <label for="name"><b>Nombre Producto</b></label>
                <input type="text" v-model="producto.name" class="form-control" id="name" required />
              </div>
              <div class="col-sm-6">
                <label for="description"><b>Descripción</b></label>
                <input type="text" v-model="producto.description" class="form-control" id="description" required />
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-sm-6">
                <label for="brand_id"><b>Marca</b></label>
                <select v-model="producto.brand_id" class="form-control" id="brand_id" required>
                  <option v-for="brand in brands" :key="brand.id" :value="brand.id">{{ brand.name }}</option>
                </select>
              </div>
              <div class="col-sm-6">
                <label for="model_id"><b>Modelo</b></label>
                <select v-model="producto.model_id" class="form-control" id="model_id" required>
                  <option v-for="model in models" :key="model.id" :value="model.id">{{ model.name }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-sm-6">
                <label for="color_id"><b>Color</b></label>
                <select v-model="producto.color_id" class="form-control" id="color_id" required>
                  <option v-for="color in colors" :key="color.id" :value="color.id">{{ color.name }}</option>
                </select>
              </div>
              <div class="col-sm-6">
                <label for="size_id"><b>Tamaño</b></label>
                <select v-model="producto.size_id" class="form-control" id="size_id" required>
                  <option v-for="size in sizes" :key="size.id" :value="size.id">{{ size.name }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-sm-6">
                <label for="price"><b>Precio</b></label>
                <input type="number" v-model="producto.price" class="form-control" id="price" required />
              </div>
              <div class="col-sm-6">
                <label for="stock"><b>Stock</b></label>
                <input type="number" v-model="producto.stock" class="form-control" id="stock" required />
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-sm-12">
                <label for="code"><b>Código</b></label>
                <input type="text" v-model="producto.code" class="form-control" id="code" required />
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-sm-12">
                <label for="image"><b>Imagen</b></label>
                <input type="text" v-model="producto.image" class="form-control" id="image" required />
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-sm-4">
              <button type="submit" class="btn btn-primary">{{ isEditing ? 'Guardar Cambios' : 'Crear' }}</button>
            </div>
            <div class="col-sm-4">
              <button @click.prevent="cancelarOperacion" class="btn btn-dark">Cancelar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'productoForm',
  props: {
    producto: {
      type: Object,
      default: () => ({
        brand_id: '',
        code: '',
        description: '',
        color_id: '',
        image: '',
        model_id: '',
        name: '',
        price: 0,
        size_id: '',
        stock: 0
      })
    },
    isEditing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      brands: [],
      colors: [],
      sizes: [],
      models: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const queries = [
        {
          key: 'brands',
          query: `
            {
              brands {
                id
                name
              }
            }
          `
        },
        {
          key: 'colors',
          query: `
            {
              colors {
                id
                name
              }
            }
          `
        },
        {
          key: 'sizes',
          query: `
            {
              sizes {
                id
                name
              }
            }
          `
        },
        {
          key: 'models',
          query: `
            {
              models {
                id
                name
              }
            }
          `
        }
      ];

      queries.forEach(({ key, query }) => {
        axios.post('http://18.218.15.90:8080/graphql', { query })
          .then(response => {
            this[key] = response.data.data[key];
          })
          .catch(error => {
            console.error(`Error fetching ${key}:`, error);
          });
      });
    },
    handleSubmit() {
      const productoData = {
        name: this.producto.name,
        description: this.producto.description,
        price: parseFloat(this.producto.price),
        stock: parseInt(this.producto.stock),
        code: this.producto.code,
        brand_id: parseInt(this.producto.brand_id),
        color_id: parseInt(this.producto.color_id),
        image: this.producto.image,
        model_id: parseInt(this.producto.model_id),
        size_id: parseInt(this.producto.size_id)
      };

      axios.post('http://18.218.15.90:8080/graphql', {
        query: `
          mutation {
            createProduct(
              input: {
                name: "${productoData.name}",
                description: "${productoData.description}",
                price: ${productoData.price},
                stock: ${productoData.stock},
                code: "${productoData.code}",
                brand_id: ${productoData.brand_id},
                color_id: ${productoData.color_id},
                image: "${productoData.image}",
                model_id: ${productoData.model_id},
                size_id: ${productoData.size_id}
              }
            ) {
              id
              brand_id
              code
              color_id
              description
              image
              model_id
              name
              price
              size_id
              stock
            }
          }
        `
      })
      .then(response => {
        console.log(response.data);
        this.$emit('submit', { ...this.producto });
      })
      .catch(error => {
        console.error(error);
      });
    },
    cancelarOperacion() {
      this.$emit('cancelar');
    }
  }
};
</script>

<style>
.container.formProducto {
  margin-left: 50px;
}
.row {
  margin-bottom: 30px;
}
.bold-label {
  font-weight: bold;
}
</style>
