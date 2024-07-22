<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="9">
        <v-card outlined style="height: 96vh; background-color: #000">
          <video
            id="myVideo"
            controls
            loop
            autoplay
            muted
            style="width: 100%; height: 100%"
          >
            <source src="/videos/snc_sde.mp4" type="video/mp4" />
            <source src="movie.ogg" type="video/ogg" />
            Your browser does not support the video tag.
          </video>
          <!-- <iframe
            style="width: 100%; height: 100%;"
            src="https://www.youtube.com/embed/tgbNymZ7vqY?controls=0"
          >
          </iframe> -->
        </v-card>
      </v-col>
      <v-col cols="3" class="bg-image">
        <v-row>
          <v-col cols="12">
            <v-img src="/logo.png" style="height: 14vh" contain></v-img>
          </v-col>
          <v-col cols="12">
            <v-card elevation="0" color="transparent">
  
              <div class="ns-text">Now Serving</div>
              
              <v-card elevation="0" color="transparent">
                <v-card-text>
                  <v-divider dark></v-divider>
                  <v-card
                    :elevation="card_elev_1"
                    :class="active_card_1"
                    color="transparent"
                    outlined
                  >
                    <v-layout justify-center align-center style="height: 16vh">
                      <div d-flex>
                        <div class="cashier-number">CASHIER 1</div>
                        <div class="que-number" :class="active_card_1">
                          {{ this.cashier_1 }}
                        </div>
                      </div>
                    </v-layout>
                  </v-card>
                  <v-divider dark></v-divider>
                  <v-card
                    color="transparent"
                    :elevation="card_elev_2"
                    :class="active_card_2"
                    outlined
                  >
                    <v-layout justify-center align-center style="height: 16vh">
                      <div d-flex>
                        <div class="cashier-number">CASHIER 2</div>
                        <div class="que-number" :class="active_card_2">
                          {{ this.cashier_2 }}
                        </div>
                      </div>
                    </v-layout>
                  </v-card>
                  <v-divider dark></v-divider>
                  <v-card
                    color="transparent"
                    :elevation="card_elev_3"
                    :class="active_card_3"
                    outlined
                  >
                    <v-layout justify-center align-center style="height: 16vh">
                      <div d-flex>
                        <div class="cashier-number">CASHIER 3</div>
                        <div class="que-number" :class="active_card_3">
                          {{ this.cashier_3 }}
                        </div>
                      </div>
                    </v-layout>
                  </v-card>
                  <v-divider dark></v-divider>
                  <v-card
                    color="transparent"
                    :elevation="card_elev_4"
                    :class="active_card_4"
                    outlined
                  >
                    <v-layout justify-center align-center style="height: 16vh">
                      <div d-flex>
                        <div class="cashier-number">CASHIER 4</div>
                        <div class="que-number" :class="active_card_4">
                          {{ this.cashier_4 }}
                        </div>
                      </div>
                    </v-layout>
                  </v-card>
                </v-card-text>
              </v-card>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import * as Ably from 'ably'
var ably = new Ably.Realtime(
  'b_eYHA.KMJcLQ:Htuxt2XSJW7xmNWlNBHXhxwHmsMbutWbbdQ3yCGAKm8'
)
// ably.connection.once("connected");
// console.log("Connected to Ably!");

ably.connection.on(function (stateChange) {
  console.log('New connection state is ' + stateChange.current)
})

export default {
  layout: 'monitor',
  data() {
    return {
      card_elev_1: 0,
      card_elev_2: 0,
      card_elev_3: 0,
      card_elev_4: 0,
      cashier_1: 0,
      cashier_2: 0,
      cashier_3: 0,
      cashier_4: 0,
      voiceList: [],
      selectedVoice: 2,
      synth: window.speechSynthesis,
      greetingSpeech: new window.SpeechSynthesisUtterance(),
      name: '',
      active_card_1: '',
      active_card_2: '',
      active_card_3: '',
      active_card_4: '',
    }
  },
  mounted() {
    this.getCashierNumber()
    this.receivedData()
    this.receivedNotify()
    this.setVideoVolume()
    this.voiceList = this.synth.getVoices()
  },
  methods: {
    setVideoVolume() {
      let vid = document.getElementById('myVideo')
      vid.volume = 0.1
    },
    addZero(num) {
      return num.toString().padStart(3, 0)
    },
    playAudio() {
      var snd = new Audio('/chime.mp3')
      snd.play()
    },
    getCashierNumber() {
      this.$axios
        .$get(`api/queuings/1`)
        .then((response) => {
          console.log(response.data.attributes)
          this.cashier_1 = this.addZero(response.data.attributes.cashier_1)
          this.cashier_2 = this.addZero(response.data.attributes.cashier_2)
          this.cashier_3 = this.addZero(response.data.attributes.cashier_3)
          this.cashier_4 = this.addZero(response.data.attributes.cashier_4)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    receivedData() {
      const channel = ably.channels.get('que')
      channel.subscribe('send-number', (message) => {
        console.log(message.data.que_number)
        const cashier_number = message.data.cashier
        const voices = this.synth.getVoices();
        console.log('cashier:', cashier_number)
        if (cashier_number == 1) {
          this.card_elev_1 = 10
          this.card_elev_2 = 0
          this.card_elev_3 = 0
          this.card_elev_4 = 0
          this.active_card_1 = 'active'
          this.active_card_2 = ''
          this.active_card_3 = ''
          this.active_card_4 = ''
          this.cashier_1 = this.addZero(message.data.que_number)
          let vid = document.getElementById('myVideo')
          vid.volume = 0
          this.playAudio()
          setTimeout(() => {
            const queNum = message.data.que_number
            this.greetingSpeech.text = `Number ${queNum}, to cashier ${cashier_number}`
            this.greetingSpeech.voice = voices[this.selectedVoice]
            this.synth.speak(this.greetingSpeech)
          }, 1500)
          setTimeout(() => {
            vid.volume = 0.1
          }, 7000)
        } else if (cashier_number == 2) {
          this.card_elev_1 = 0
          this.card_elev_2 = 10
          this.card_elev_3 = 0
          this.card_elev_4 = 0
          this.active_card_1 = ''
          this.active_card_2 = 'active'
          this.active_card_3 = ''
          this.active_card_4 = ''
          this.cashier_2 = this.addZero(message.data.que_number)
          let vid = document.getElementById('myVideo')
          vid.volume = 0
          this.playAudio()
          setTimeout(() => {
            const queNum = message.data.que_number
            this.greetingSpeech.text = `Number ${queNum}, to cashier ${cashier_number}`
            this.greetingSpeech.voice = voices[this.selectedVoice]
            this.synth.speak(this.greetingSpeech)
          }, 1500)
          setTimeout(() => {
            vid.volume = 0.1
          }, 7000)
        } else if (cashier_number == 3) {
          this.card_elev_1 = 0
          this.card_elev_2 = 0
          this.card_elev_3 = 10
          this.card_elev_4 = 0
          this.active_card_1 = ''
          this.active_card_2 = ''
          this.active_card_3 = 'active'
          this.active_card_4 = ''
          this.cashier_3 = this.addZero(message.data.que_number)
          let vid = document.getElementById('myVideo')
          vid.volume = 0
          this.playAudio()
          setTimeout(() => {
            const queNum = message.data.que_number
            this.greetingSpeech.text = `Number ${queNum}, to cashier ${cashier_number}`
            this.greetingSpeech.voice = voices[this.selectedVoice]
            this.synth.speak(this.greetingSpeech)
          }, 1500)
          setTimeout(() => {
            vid.volume = 0.1
          }, 7000)
        } else if (cashier_number == 4) {
          this.card_elev_1 = 0
          this.card_elev_2 = 0
          this.card_elev_3 = 0
          this.card_elev_4 = 10
          this.active_card_1 = ''
          this.active_card_2 = ''
          this.active_card_3 = ''
          this.active_card_4 = 'active'
          this.cashier_4 = this.addZero(message.data.que_number)
          let vid = document.getElementById('myVideo')
          vid.volume = 0
          this.playAudio()
          setTimeout(() => {
            let voices = this.synth.getVoices();
            const queNum = message.data.que_number
            this.greetingSpeech.text = `Number ${queNum}, to cashier ${cashier_number}`
            this.greetingSpeech.voice = voices[this.selectedVoice]
            this.synth.speak(this.greetingSpeech)
          }, 1500)
          setTimeout(() => {
            vid.volume = 0.1
          }, 7000)
        }
        // this.cashier_1 = message.data.que_number
      })
    },

    receivedNotify() {
      const channel = ably.channels.get('que')
      
      channel.subscribe('notify-number', (message) => {
        const voices = this.synth.getVoices();
        let vid = document.getElementById('myVideo')
        vid.volume = 0
        console.log(message.data.que_number)
        const cashier_number = message.data.cashier
        const que_number = message.data.que_number
        console.log('cashier: ', cashier_number)
        this.greetingSpeech.text = `Number ${que_number}, to cashier ${cashier_number}`
        this.greetingSpeech.voice = voices[this.selectedVoice]
        this.synth.speak(this.greetingSpeech)
        setTimeout(() => {
          vid.volume = 0.1
        }, 2500)
      })
    },
  },
}
</script>
<style scoped>
html {
  overflow-y: auto;
}

.active {
  /* border: 3px solid green !important; */
  color: rgb(0, 255, 0) !important;
}

.cashier-number {
  font-size: 2.5vh;
  font-weight: bold;
  text-align: center;
  color: white;
  margin-bottom: 4vh;
}

.que-number {
  /* font-size: 60px; */
  font-size: 9vh;
  margin: 13px 0;
  font-weight: bold;
  text-align: center;
  color: #ffffff;
}

.ns-text {
  /* font-size: 35px; */
  font-size: 4vh;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  color: #ffffff;
}
</style>