
import firebase from 'firebase'
import {   userKey } from '@/global'
import { getData, setData } from 'nuxt-storage/local-storage';
export const strict = false
export const state = () => ({
  usuario: null,
  isMenuVisible:false,
  userProfile:null,
  use:{}
})

export const mutations = {
   addUser(state, usuario) {
    state.usuario = usuario
    if (usuario) {
      state.use.uid = usuario.user.uid
      console.log("ok store")
      console.log(usuario.user)
       firebase.firestore().collection("user").doc(usuario.user.uid).get().then((res) => {
        console.log("res store", res.data())
        state.userProfile = res.data()
        state.use.name = res.data().name
        state.use.email = res.data().email
        setData(userKey, state.use, 100, 100)
        var userr = getData(userKey)
        console.log("GET KEY LOGIN", userr)

        state.isMenuVisible = true
        this.$router.push('/pagina/links')
      }).catch((err) => {
        console.log("erro ao adc")
      })

    } else {
      state.isMenuVisible = false
    }
  },
  toggleMenu (state, isVisible) {
    console.log("State "+isVisible)
    if(!state.usuario && !state.blog) {
      state.isMenuVisible = false
      return
    }
    if(isVisible === undefined){
      state.isMenuVisible = !state.isMenuVisible;
    }else{
      state.isMenuVisible = isVisible;
    }
  },
  setUserProfile(state, val) {
    state.userProfile = val
  },
}

export const actions = {
   addUser(context, usuario) {
       console.log("action")
       context.commit('addUser', usuario)
  }
}
export const getters = {
  usuarioget (state) {
    return state.usuario
  }
}
