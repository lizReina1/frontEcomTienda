<template>
<div class="dashboard">
    <div>
        <sidebar></sidebar>
        
    </div>
</div>
</template>
<script>
import sidebar from '../components/sidebar.vue';
export default {
  components: { sidebar },
    name: 'dashboard',

data() {
    return {
      activeTab: null // Variable para almacenar la pestaña activa
    };
},
methods: {
    activateTab(tab) {
      this.activeTab = tab; // Método para activar la pestaña haciendo clic en ella
    }
  }
}
</script>
<style>
</style>