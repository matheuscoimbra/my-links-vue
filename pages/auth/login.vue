<template>

  <v-app id="inspire">
    <v-content>
      <v-container

        fluid
      >
      <v-form
        ref="form"
        v-model="valid"
        :lazy-validation="lazy"
      >

          <v-row
            align="center"
            justify="center"
          >
            <v-col
              cols="12"
              sm="8"
              md="4"
            >
              <v-card class="elevation-1">
                <v-toolbar
                  color="primary"
                  dark
                  flat
                >
                  <v-toolbar-title >Login <v-icon>mdi-dog</v-icon></v-toolbar-title>
                  <div class="flex-grow-1"></div>

                </v-toolbar>
                <v-card-text>
                    <v-text-field
                      label="Login"
                      v-model="email"
                      :rules="emailRules"
                      name="login"
                      required
                      prepend-icon="mdi-account"
                    ></v-text-field>

                    <v-text-field
                      label="Password"
                      v-model="senha"
                      prepend-icon="mdi-key"
                      :rules="[v => !!v || 'Informe a senha']"
                      required
                      type="password"
                    ></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn :disabled="!valid" @click="validate" color="primary">Entrar</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>

      </v-form>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
    import { getData, setData } from 'nuxt-storage/local-storage';
    export default {

        data: () => ({
            email:'',
            senha:'',
            name: "login",
            user: {},
            valid: true,
            emailRules: [
                v => !!v || 'informe seu email de autenticação',
                v => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
            ],
            lazy: false,
        }),
        methods: {
            validate() {
                if (this.$refs.form.validate()) {
                    console.log("if")
                    this.snackbar = true
                    this.user.email = this.email
                    this.user.senha = this.senha
                    //this.$store.commit('addUser', user)
                    // setData(userKey, JSON.stringify(res.data))
                    //this.$router.push({ path: '/' })
                }


            }
        }
    }
</script>
