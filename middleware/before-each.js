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
  console.log("PAGE", currentPath)
  const isNotLogin = getData(userKey)
  console.log("login", isNotLogin);

  if (isNotLogin===null && currentPath!=='/auth/login' &&  maybeAuthenticated === null ) {
    console.log("ent")
    setData(userKey, setData(userKey, JSON.stringify("user")))
     redirect('/auth/login', { page: route.fullPath })

  }
}
