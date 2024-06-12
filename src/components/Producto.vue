<template>
    <div>
        <img :src=urlImg alt="">
        <h3>
            {{nombre}}
        </h3>
        <p>
            $ {{precio}}
        </p>
    </div>
</template>
<script>

export default {
    name: 'Producto',
    components: {},
    method:{},
    props:{
    nombre: String,
    precio: Number,
    urlImg: String,
    }
}
</script>

<style scoped>

</style>
