<template>
    <div class="register">
     <navbar></navbar>
     <br>
    <AuthForm
      title="Crear Cuenta"
      buttonText="Registrar"
      linkText="Ya tienes una cuenta?"
      linkHref="/login"
      linkActionText="Iniciar Sesion"
      @submit="handleRegister"
    >
      <template #additional-fields>
        <div class="form-element">
          <span id="input-header">Nombre</span>
          <input type="text" v-model="form.name" placeholder="Nombre completo">
        </div>
        <div class="form-element">
          <span id="input-header">Confirmar contraseña</span>
          <input type="password" v-model="form.confirmPassword" placeholder="Confirmar contraseña">
        </div>
      </template>
    </AuthForm>
  </div>
</template>

<script>
import AuthForm from '../components/AuthForm.vue';
import Navbar from '@/components/navbar.vue';
export default {
  components: {
    AuthForm,
        Navbar
  },
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        name: '',
        confirmPassword: ''
      }
    };
  },
  methods: {
    handleRegister(form) {
      if (form.password !== form.confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }
      // Lógica de registro
      console.log('Register', form);
      this.$router.push({ name: 'dashboard' });
    }
  }
};
</script>


<style scoped>
/* Add your styles here */
</style>
