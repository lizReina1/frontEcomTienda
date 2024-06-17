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
              <div class="col-sm-6">
                <label for="username"><b>Nombre de Usuario</b></label>
                <input type="text" v-model="usuario.username" class="form-control" id="username" required />
              </div>
              <div class="col-sm-6">
                <label for="email"><b>E-mail</b></label>
                <input type="text" v-model="usuario.email" class="form-control" id="email" required />
              </div>
              <div class="col-sm-6">
                <label for="password"><b>Contraseña</b></label>
                <div class="input-group">
                  <input :type="showPassword ? 'text' : 'password'" v-model="usuario.password" class="form-control" id="password" required />
                  <div class="input-group-append">
                    <span class="input-group-text" @click="togglePasswordVisibility">
                      <font-awesome-icon :icon="showPassword ? 'eye' : 'eye-slash'" />
                    </span>
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
