
import firebase from 'firebase'
export const strict = false
export const state = () => ({
  usuario: null,
  isMenuVisible:false,
  userProfile:null,
})

export const mutations = {
  addUser (state, usuario) {
    state.usuario = usuario
    if(usuario) {
      console.log("ok store")
      console.log(usuario.user)
      firebase.firestore().collection("user").doc(usuario.user.uid).get().then((res) => {
        console.log("res store",res.data())
       state.userProfile = res.data()
        state.isMenuVisible = true
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


export const getters = {
  usuarioget (state) {
    return state.usuario
  }
}
