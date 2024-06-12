<template>
  <div>
    <usuario-list :usuarios="usuarios" @create="handleCreate" @edit="handleEdit" @view="handleView" @delete="handleDelete" />
  </div>
</template>

<script>
import UsuarioList from '../components/UsuariosList.vue';
import axios from "axios";

export default {
  name: 'Usuario',
  components: {
    UsuarioList
  },
  data() {
    return {
      usuarios: [],
      isFormVisible: false,
      isEditing: false,
      selectedUsuario: null
    };
  },
  methods: {
    handleCreate() {
      this.selectedUsuario = { fecha: '', total: 0 };
      this.isEditing = false;
      this.isFormVisible = true;
    },
    handleEdit(usuario) {
      this.selectedUsuario = { ...usuario };
      this.isEditing = true;
      this.isFormVisible = true;
    },
    handleView(usuario) {
      // Aquí podrías implementar la lógica para ver los detalles de la usuario.
      alert(`Detalles de la usuario: \nFecha: ${usuario.fecha}\nTotal: ${usuario.total}`);
    },
    handleDelete(id) {
      this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
    },
    handleFormSubmit(usuario) {
      if (this.isEditing) {
        this.usuarios = this.usuarios.map(v => (v.id === usuario.id ? usuario : v));
      } else {
        usuario.id = this.usuarios.length + 1;
        this.usuarios.push(usuario);
      }
      this.isFormVisible = false;
    },
     cancelarOperacion() {
      this.isFormVisible = false;
    }, sortUsuarios() {
      this.usuarios.sort((a, b) => new Date(b.date) - new Date(a.date));
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
            users {
              email
              id
              password
              role
              username
            }
          }
          `
        }
      });
      this.usuarios = result.data.data.users;
      this.sortUsuarios();  // Sort ventas after fetching
    } catch (error) {
      console.error(error);
    }
  },
  
  
};
</script>
