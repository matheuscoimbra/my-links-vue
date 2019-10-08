<template>
  <v-form v-model="valid">
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
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="8"
        >
          <v-text-field
            v-model="link"
            :rules="[v => !!v || 'Informe o link']"
            label="Link"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="2"
        >
          <v-text-field
            v-model="nome"
            :rules="[v => !!v || 'Informe o nome']"
            label="Nome"
            required
          ></v-text-field>
        </v-col>
        <v-btn :disabled="!valid" @click="registrar"  class="mx-2" fab dark color="indigo">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>

      </v-row>
    </v-container>
    <v-data-table :loading="load" loading-text="Carrregando..."
      :headers="headers"
      :items="links"
      :items-per-page="page"
      class="elevation-1"
    >

      <template v-slot:item.action="{ item }">

        <v-icon
          big color="indigo"
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-form>

</template>

<script>
    import {mapState} from 'vuex'
    import firebase from 'firebase'
    import moment from 'moment'


export default {

    data:()=>({
        valid:false,
        link:'',
        nome:'',
        error:'',
        snackbar: false,
        usuario:{},
        page:10,
        load:true,
        objeto:{},
        links:[],
        headers:[
            {
                text: 'link',
                align: 'left',
                sortable: false,
                value: 'list.link',
            },
            {
                text: 'Nome',
                align: 'left',
                sortable: false,
                value: 'list.nome',
            },
            { text: 'Ações', value: 'action', sortable: false, align: 'center', },
        ]

    }),
    methods:{
       isValidURL(string) {
        var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return (res !== null)

       },
        carregar(){
         firebase.firestore().collection("user").
             doc(this.usuario.user.uid).collection("links").get().then((data)=>{
             data.docs.map((doc)=>{
                  this.objeto.id = doc.id
                 this.objeto.list = doc.data()
                 this.links.push(this.objeto)
                 this.objeto={}
                 console.log(this.links)

             })
         })
        },
        reset() {
            this.objeto={}
            this.links = []
            this.carregar()
        },
        deleteItem(obj){
          console.log("delete",obj)
            firebase.firestore().collection("user").doc(this.usuario.user.uid).collection("links").doc(obj.id).delete().then((res)=>{
                this.error="link deletado com sucesso"
                this.snackbar = true
                this.reset();
            }).catch((err) => {
                this.error="erro ao deletar link"
                this.snackbar = true
            })
        },
        registrar(){
            console.log("link user", this.usuario)
            if(this.isValidURL(this.link)==false){
                this.error="link inválido"
                this.snackbar = true
                return
            }
            firebase.firestore().collection("user").doc(this.usuario.user.uid).collection("links").add({
                link: this.link,
                name:this.nome,
                start: moment(String(new Date())).format('YYYY-MM-DD'),
                end: moment(String(new Date())).format('YYYY-MM-DD')
                }
            ).then((res)=>{
                this.error="link cadastrado com sucesso"
                this.snackbar = true
                this.reset();
                this.link=''
                this.nome=''
            }).catch((err) => {

                this.error="erro ao cadastrar link"
                this.snackbar = true
            })

        }

    },
    watch: {
        page() {
            this.carregar()
        }
    },
    mounted(){
        this.usuario = this.$store.state.usuario
        this.carregar()
        this.load = false
    },
    created() {
        this.usuario = this.$store.state.usuario
    }
}
</script>
