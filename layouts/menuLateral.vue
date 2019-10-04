<template>
  <div>
  <v-navigation-drawer
    id="top"
    v-model="drawer"
    :mini-variant="miniVariant"
    :clipped="isMenuVisible"
    fixed
    app
  >
    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar
    :clipped-left="clipped"
    fixed
    app
  >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />


    <v-toolbar-title v-text="title" />
    <v-spacer />


  </v-app-bar>
  </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "menuLateral",
        computed: mapState(['isMenuVisible']),
        data () {
            return {
                clipped: false,
                drawer: false,
                items: [
                    {
                        icon: 'mdi-apps',
                        title: 'Welcome',
                        to: '/'
                    },
                    {
                        icon: 'mdi-chart-bubble',
                        title: 'Inspire',
                        to: '/inspire'
                    }
                ],
                miniVariant: false,
                right: true,
                rightDrawer: false,
                title: 'Vuetify.js'

            }
        },
        methods:{
            clip(){
                this.clipped =  this.$store.state.isMenuVisible
                console.log(this.drawer)
                return this.clipped
            }
        }
    }
</script>

<style scoped>
    #top{
      top: 0px !important;
      max-height: calc(100% - 36px) !important;

    }
</style>
