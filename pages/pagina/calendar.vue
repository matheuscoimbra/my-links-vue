<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet  height="64">
        <v-toolbar flat  color="indigo">
          <v-btn color="white" outlined class="mr-4" @click="setToday">
            Hoje
          </v-btn>
          <v-btn color="white" fab text small @click="prev">
            <v-icon color="white" small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn color="white" fab text small @click="next">
            <v-icon color="white" small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title class="title">{{ title }}</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-menu bottom right color="white">
            <template v-slot:activator="{ on }">
              <v-btn
                outlined
                v-on="on"
                color="white"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon color="white" right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item color="white" @click="type = 'day'">
                <v-list-item-title color="white">Dia</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Semana</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Mês</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 dias</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="eventos"
          :event-color="getEventColor"
          :event-margin-bottom="3"
          :now="today"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          full-width
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >

              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <div class="flex-grow-1"></div>

            </v-toolbar>
            <v-card-text>
              <span id="color"  v-html="selectedEvent.link"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Fechar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>
<script>
    import firebase from 'firebase'
    import moment from 'moment'
    import { getData, setData } from 'nuxt-storage/local-storage';
    import {   userKey } from '@/global'
    export default {
        data: () => ({
            today: moment(String(new Date())).format('YYYY-MM-DD'),
            focus: moment(String(new Date())).format('YYYY-MM-DD'),
            type: 'month',
            typeToLabel: {
                month: 'MÊs',
                week: 'Semana',
                day: 'Dia',
                '4day': '4 dias',
            },
            start: null,
            end: null,
            selectedEvent: {},
            selectedElement: null,
            selectedOpen: false,
            eventos:[],
            objeto:{},
            usuario:{}
        }),
        methods:{
            carregar(){
                firebase.firestore().collection("user").
                doc(this.usuario.uid).collection("links").get().then((data)=>{
                    data.docs.map((doc)=>{
                        this.eventos.push( doc.data())
                        console.log(this.aventos)

                    })
                })
            },
            viewDay ({ date }) {
                this.focus = date
                this.type = 'day'
            },
            getEventColor (event) {
                return event.color
            },
            setToday () {
                this.focus = this.today
            },
            prev () {
                this.$refs.calendar.prev()
            },
            next () {
                this.$refs.calendar.next()
            },
            showEvent ({ nativeEvent, event }) {
                const open = () => {
                    this.selectedEvent = event
                    this.selectedElement = nativeEvent.target
                    setTimeout(() => this.selectedOpen = true, 10)
                }

                if (this.selectedOpen) {
                    this.selectedOpen = false
                    setTimeout(open, 10)
                } else {
                    open()
                }

                nativeEvent.stopPropagation()
            },
            updateRange ({ start, end }) {
                // You could load events from an outside source (like database) now that we have the start and end dates on the calendar
                this.start = start
                this.end = end
            },
            nth (d) {
                return d > 3 && d < 21
                    ? 'th'
                    : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
            },

        },
        computed: {
            title () {
                const { start, end } = this
                if (!start || !end) {
                    return ''
                }

                const startMonth = this.monthFormatter(start)
                const endMonth = this.monthFormatter(end)
                const suffixMonth = startMonth === endMonth ? '' : endMonth

                const startYear = start.year
                const endYear = end.year
                const suffixYear = startYear === endYear ? '' : endYear

                const startDay = start.day + this.nth(start.day)
                const endDay = end.day + this.nth(end.day)

                switch (this.type) {
                    case 'month':
                        return `${startMonth} ${startYear}`
                    case 'week':
                    case '4day':
                        return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
                    case 'day':
                        return `${startMonth} ${startDay} ${startYear}`
                }
                return ''
            },
            monthFormatter () {
                return this.$refs.calendar.getFormatter({
                    timeZone: 'UTC', month: 'long',
                })
            },
        },
        mounted() {
            this.$refs.calendar.checkChange()
            this.usuario = getData(userKey)
            this.carregar()
        }

    }
</script>
<style scoped>
  .theme--dark.v-card > .v-card__text {
    color: rgba(0, 0, 0, 0.87) !important;
  }

  .v-toolbar__content{
    color: #35495e !important;
    background: indigo !important;
  }

  .title{
    color: white !important;
  }
</style>
