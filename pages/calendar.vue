<template>
    <v-sheet height="500">
      <v-calendar
        type="month"
        :events="aventos"
      ></v-calendar>
    </v-sheet>
</template>
<script>
    import firebase from 'firebase'
    import moment from 'moment'

    export default {
        data: () => ({
            aventos:[],
            objeto:{},
            usuario:{},
            events: [
                {
                    name: 'Vacation',
                    start: '2018-12-30',
                    end: '2019-01-02',
                },
                {
                    name: 'Meeting',
                    start: '2019-01-07',
                },
                {
                    name: '30th Birthday',
                    start: '2019-01-03',
                },
                {
                    name: 'New Year',
                    start: '2019-01-01',
                },
                {
                    name: 'Conference',
                    start: '2019-01-21',
                },
                {
                    name: 'Hackathon',
                    start: '2019-01-30',
                    end: '2019-02-01',
                },
            ],
        }),
        methods:{
            carregar(){
                firebase.firestore().collection("user").
                doc(this.usuario.user.uid).collection("links").get().then((data)=>{
                    data.docs.map((doc)=>{
                        this.aventos.push( doc.data())
                        console.log(this.aventos)

                    })
                })
            },
        },
        mounted() {
            this.usuario = this.$store.state.usuario
            this.carregar()
        }

    }
</script>
