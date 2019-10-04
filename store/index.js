
import axios from 'axios'

export const state = () => ({
  usuario: null,
  isMenuVisible:false,
})

export const mutations = {
  addUser (state, usuario) {
    state.usuario = usuario
    if(usuario) {
      console.log(state.usuario);
      axios.defaults.headers.common['Authorization'] = `Bearer ${usuario.token}`;
      console.log(axios.defaults);
      state.isMenuVisible = true
    } else {
      delete  axios.defaults.headers.common['Authorization'];
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
  }
}


export const getters = {
  usuarioget (state) {
    return state.usuario
  }
}
