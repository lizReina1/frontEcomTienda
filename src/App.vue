<template>
  <div>
    <main>
      <RouterView />
    </main>

  </div>
</template>

<script>
import Producto from './components/Producto.vue';

export default {
  components: { Producto },
  name: 'App',

}
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
