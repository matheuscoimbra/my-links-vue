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
  let maybeAuthenticated = await store.getters.usuario

  const currentPath = route.path
  const isNotLogin = currentPath !== '/auth/login'
  if (isNotLogin && (maybeAuthenticated === undefined || maybeAuthenticated === null) ) {
     redirect('/auth/login', { page: route.fullPath })

  }
}
