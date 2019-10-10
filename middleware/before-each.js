import { getData, setData } from 'nuxt-storage/local-storage';
import {   userKey } from '@/global'


export default async ({
                        app,
                        redirect,
                        route,
                        store,
                        req,
                        $axios
                      }) => {
  // If nuxt generate, pass this middleware
  if (process.static) { return }
  const maybeReq = process.server ? req : null
  let maybeAuthenticated = await  store.getters.usuarioget
  const currentPath = route.path

  var isNotLogin =await getData(userKey)
  console.log("login", isNotLogin);

  if (isNotLogin && currentPath!=='/' &&  maybeAuthenticated === null ) {
    console.log("storage",getData(userKey))
     redirect('/', { page: route.fullPath })

  }
}
