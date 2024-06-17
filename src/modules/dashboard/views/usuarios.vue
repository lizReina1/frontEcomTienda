<template>
  <div>
    <usuario-form v-if="isFormVisible" :usuario="selectedUsuario" :isEditing="isEditing" @submit="handleFormSubmit" @cancelar="cancelarOperacion" />
    <usuario-list v-else :usuarios="usuarios" @create="handleCreate" @edit="handleEdit" @view="handleView" @delete="handleDelete" />

</div>
</template>

<script>
import UsuarioList from '../components/UsuariosList.vue';
import UsuarioForm from '../components/UsuariosForm.vue';
import axios from 'axios';

export default {
  name: 'Usuario',
  components: {
    UsuarioList,
    UsuarioForm
  },
  data() {
    return {
      usuarios: [],
      isFormVisible: false,
      isEditing: false,
      selectedUsuario: null,
      showPassword: false
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    handleCreate() {
      this.selectedUsuario = { username: '', email: '', role: '', password: '' };
      this.isEditing = false;
      this.isFormVisible = true;
    },
    handleEdit(usuario) {
      this.selectedUsuario = { ...usuario };
      this.isEditing = true;
      this.isFormVisible = true;
    },
    handleView(usuario) {
      // Aquí podrías implementar la lógica para ver los detalles del usuario.
      alert(`Detalles del usuario: \nUsername: ${usuario.username}\nEmail: ${usuario.email}`);
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
    },
    sortUsuarios() {
      this.usuarios.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  },
  async mounted() {
    try {
      const result = await axios.post('http://18.218.15.90:8080/graphql', {
        query: `
          {
            users {
              id
              username
              email
              role
              password
            }
          }
        `
      });
      this.usuarios = result.data.data.users;
      this.sortUsuarios();
    } catch (error) {
      console.error(error);
    }
  }
};
</script>
