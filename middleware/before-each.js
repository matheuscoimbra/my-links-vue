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
  console.log("maybe",maybeAuthenticated);
  const currentPath = route.path
  const isNotLogin = getData(userKey)
  console.log("login", isNotLogin);

  if (isNotLogin &&  maybeAuthenticated === null ) {
    console.log("ent")
     redirect('/auth/login', { page: route.fullPath })

  }
}
