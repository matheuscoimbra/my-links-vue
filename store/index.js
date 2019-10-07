
import firebase from 'firebase'

export const state = () => ({
  usuario: null,
  isMenuVisible:false,
  userProfile:null,
})

export const mutations = {
  addUser (state, usuario) {
    state.usuario = usuario
    if(usuario) {
      console.log("login",state.usuario.user);
      var docRef = firebase.firestore().collection("user").doc(state.usuario.user.uid).get();
      docRef.get().then((res) => {
        if(res.exists) {
          state.userProfile = res.data()
          console.log("res store", state.userProfile)
          state.isMenuVisible = true
        }
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
