<template>
  <v-footer
    :fixed="fixed"
    app
  >
    <span>&copy; 2019</span>
  </v-footer>
</template>

<script>
    export default {
        name: "rodape",
        data(){
            return{
            fixed: false
            }
        }
    }
</script>

<style scoped>

</style>
