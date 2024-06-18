<template>
  <div id="UsuarioForm">
    <div class="container formUsuario">
      <div class="row justify-content-center">
        <h4><b>{{ isEditing ? 'Editar Usuario' : 'Crear Usuario' }}</b></h4>
      </div>
      <div class="row">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <div class="row">
              <div class="col-sm-6 mb-3">
                <label for="username"><b>Nombre de Usuario</b></label>
                <input type="text" v-model="usuario.username" class="form-control" id="username" required />
              </div>
              <div class="col-sm-6 mb-3">
                <label for="email"><b>E-mail</b></label>
                <input type="text" v-model="usuario.email" class="form-control" id="email" required />
              </div>
              <div class="col-sm-6 mb-3">
                <label for="password"><b>Contraseña</b></label>
                <div class="input-group">
                  <input :type="showPassword ? 'text' : 'password'" v-model="usuario.password" class="form-control" id="password" required />
                  <div class="input-group-append">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16" @click="togglePasswordVisibility">
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                    </svg>
                  </div>
                </div>
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
  name: 'usuarioForm',
  props: {
    usuario: {
      type: Object,
      default: () => ({
        username: '',
        email: '',
        password: '',
      })
    },
    isEditing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showPassword: false // Estado para controlar la visibilidad de la contraseña
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    handleSubmit() {
      const usuarioData = {
        username: this.usuario.username,
        email: this.usuario.email,
        password: this.usuario.password
      };

      axios.post('http://18.218.15.90:8080/graphql', {
        query: `
          mutation {
             updateUser(
              input: {
                username: "${usuarioData.username}",
                email: "${usuarioData.email}",
                password: "${usuarioData.password}"
              }
            ) 
          }
        `
      })
      .then(response => {
        console.log(response.data);
        this.$emit('submit', { ...this.usuario });
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
.container.formUsuario {
  margin-left: 50px;
}
.row {
  margin-bottom: 30px;
}
.bold-label {
  font-weight: bold;
}
/* Estilo opcional para el cursor en el ícono */
.input-group-text {
  cursor: pointer;
}
</style>
