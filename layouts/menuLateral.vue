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
    <v-list >
      <v-list-item
        to="/"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>mdi-account</v-icon>
        </v-list-item-action>
        <v-list-item-content >
          <v-list-item-title v-text="userProfile===null?'':userProfile.name"  />
        </v-list-item-content>
      </v-list-item>
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
          <v-list-item-title v-text="item.title"  />
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn @click="logout" block>Logout</v-btn>
      </div>
    </template>
  </v-navigation-drawer>

  <v-app-bar
    :clipped-left="clipped"
    fixed
    app
  >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />


    <v-toolbar-title v-text="titleBarra" />
    <v-spacer />


  </v-app-bar>
  </div>
</template>

<script>
    import { removeItem } from 'nuxt-storage/local-storage'
    import {mapState} from 'vuex'
    import {   userKey } from '@/global'
    import { getData, setData } from 'nuxt-storage/local-storage';

    import firebase from 'firebase'
    export default {
        name: "menuLateral",
        computed: mapState(['isMenuVisible','userProfile']),
        data () {
            return {
                clipped: false,
                drawer: false,
                title: '',
                nome:'',
                titleBarra:'MyLinks',
                componentKey:0,
                items: [

                    {
                        icon: 'mdi-chart-bubble',
                        title: 'Calendario',
                        to: '/calendar'
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
            },
            logout(){

                firebase.auth().signOut().then(() => {
                    this.$store.commit("addUser",null)
                    removeItem(userKey)
                    this.$router.replace('/auth/login')
                })

            }
        },
        watch:{
            userProfile(newValue, oldValue){
                console.log(`Updating from ${oldValue} to ${newValue}`);
                this.componentKey +=1;
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
