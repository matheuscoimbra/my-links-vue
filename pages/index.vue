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
        <v-snackbar
          v-model="snackbar"
          color="primary"
          top="top"
        >
          {{ error }}
          <v-btn
            color="pink"
            text
            @click="snackbar = false"
          >
            fechar
          </v-btn>
        </v-snackbar>
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
                  <v-toolbar-title >My Links <v-icon>mdi-dog</v-icon></v-toolbar-title>
                  <div class="flex-grow-1"></div>

                </v-toolbar>
                <v-tabs  fixed-tabs
                         background-color="indigo"
                         dark>
                  <v-tab>Login</v-tab>

                  <v-tab-item>
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
                  </v-tab-item>
                  <v-tab>REGISTRAR</v-tab>
                  <v-tab-item>
                    <v-card-text>

                      <v-text-field
                        label="Nome Completo"
                        v-model="nome"
                        prepend-icon="mdi-account-badge"
                        required
                      ></v-text-field>

                      <v-text-field
                        label="Email"
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
                      <v-btn :disabled="!valid" @click="registrar" color="primary">Registrar</v-btn>
                    </v-card-actions>
                  </v-tab-item>
                </v-tabs>

              </v-card>

            </v-col>

          </v-row>

      </v-form>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import {   userKey } from '@/global'
    import { getData, setData,removeItem } from 'nuxt-storage/local-storage';
  import firebase from 'firebase'

    export default {

        data: () => ({
            top:true,
            snackbar: false,
            error:'',
            email:'',
            senha:'',
            nome:'',
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
                    this.error="realizando login..."
                    this.snackbar = true
                    this.user.email = this.email
                    this.user.senha = this.senha
                    this.user = new firebase.auth.GoogleAuthProvider()
                    firebase.auth().signInWithEmailAndPassword(this.email, this.senha)
                        .then((user)  => {
                        this.$store.dispatch('addUser', user)
                         this.error= "login realizado com sucesso!"
                    }).catch((e) => {
                        this.error= (e.message=="The password is invalid or the user does not have a password.")?"Usuário ou senhas inválidos":"não foi possível realizar logon, tente novamente mais tarde..."
                        this.snackbar = true
                        console.log(e)
                    })


                }


            },
            registrar(){
                this.error="realizando cadastro..."
                this.snackbar = true
                firebase.auth().createUserWithEmailAndPassword(this.email, this.senha)
                    .then((created) => {
                        created.user.sendEmailVerification().then((user) => {
                            firebase.firestore().collection("user").doc(created.user.uid).set({
                                name: this.nome,
                                email: this.email,
                            }).then((res)=>{
                                console.log("cadastrando",created)
                                this.$store.dispatch('addUser', created)
                                this.error= "cadastro realizado com sucesso!"

                            }).catch((err) => {
                                console.log("erro cadastro fb")
                                this.error=err.message
                                this.snackbar = true
                            })
                        });
                    }).catch((error) => {
                    console.log("erro cadastro")
                    this.error=error.message
                    this.snackbar = true
                });
            }
        },
        created() {
            this.$store.state.usuario=null
            removeItem(userKey)
        }
    }
</script>
