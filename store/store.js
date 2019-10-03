import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        isMenuVisible:false,
        user: null,
        blog:false,
        update:false
    },
    mutations:{
        toggleMenu(state,isVisible){
            console.log("State "+isVisible)
            if(!state.user && !state.blog) {
                state.isMenuVisible = false
                return
            }
            if(isVisible === undefined){
                state.isMenuVisible = !state.isMenuVisible;
            }else{
                state.isMenuVisible = isVisible;
            }


        },
        setUser(state, user) {
            state.user = user
            if(user) {
                console.log(state.user);
                axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
                console.log(axios.defaults);
                state.isMenuVisible = true
            } else {
                delete  axios.defaults.headers.common['Authorization'];
                state.isMenuVisible = false
            }
        },
        setBlog(state, blog) {
            state.blog = blog
        },
        setUpdate(state, update) {
            state.update = update
            console.log(state.update)
        }
    }
})