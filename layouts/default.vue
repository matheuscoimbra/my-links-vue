<template>
  <v-app dark>
    <MenuLateral v-show="usuario !=null"/>
    <client-only placeholder="Carregando...">
    <Principal/>
    </client-only>

<Rodape/>
  </v-app>
</template>

<script>
    import {mapState} from 'vuex'
    import Rodape from "./rodape";
    import Principal from "./principal";
    import MenuLateral from "./menuLateral";
export default {
    components: {MenuLateral, Rodape,Principal},
  data () {
    return {


    }
  },
    computed: mapState(['usuario']),
    methods:{

    }
}
</script>
