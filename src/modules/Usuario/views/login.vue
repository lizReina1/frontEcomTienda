<template>
    <div class="login">
        <navbar></navbar>
        <br>
        <AuthForm
            title="Iniciar Sesion"
            buttonText="Ingresar"
            :isRegister="false"
            linkText="No tiene cuenta"
            linkHref="/register"
            linkActionText="Crea una cuenta"
            @submit="handleLogin"
        />
    </div>
</template>

<script>
import Navbar from '@/components/navbar.vue';
import AuthForm from '../components/AuthForm.vue';

export default {
    name: 'login',
    components: {
    AuthForm,
        Navbar
    },
    methods: {
    handleLogin(form) {
        console.log('Login', form);
        localStorage.setItem('username', username); // Almacena el nombre de usuario
        localStorage.setItem('role', role); // Almacena el rol del usuario

        this.$router.push({ name: 'dashboard' });
    },
 
    }

};
</script>

<style>

</style>