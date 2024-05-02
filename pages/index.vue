<template>
  <v-container>
    <div class="d-flex align-center justify-center" style="height: 75vh">
      <v-card width="450" class="mx-auto card-border" elevation="0">
        <v-card-text class="text-center">
          <v-row dense>
            <v-col cols="8">
              <v-card elevation="0">
                <v-toolbar elevation="0" color="primary" dark>
                  <v-spacer></v-spacer>
                  <v-toolbar-title>Now Serving </v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>

                <v-card-text class="ns">
                  {{ this.que_number }}
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="4">
              <v-card elevation="0">
                <v-toolbar elevation="0" color="primary" dark>
                  <v-spacer></v-spacer>
                  <v-toolbar-title>Latest Que</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text class="lq">
                  {{ this.current_number }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="px-4">
          <v-row dense>
            <v-col cols="6">
              <v-btn color="success" @click="sendNumber" block
                ><v-icon left>mdi-chevron-double-right</v-icon> Next</v-btn
              >
            </v-col>
            <v-col cols="6"> 
              <v-btn @click="notify" color="warning" block
            ><v-icon left>mdi-bullhorn</v-icon> Notify</v-btn
          >
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </div>
   
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
  name: 'IndexPage',
  data() {
    return {
      autoplay: true,
      que_number: 0,
      cashier: this.$auth.user.cashier_no,
      current_number: 0,
    }
  },
  mounted() {
    this.receivedNumber()
    this.getNowServing()
    //this.playAudio()
  },
  methods: {
    playAudio() {
      var snd = new Audio('chime.mp3')
      snd.play()
    },
    receivedNumber() {
      const channel = ably.channels.get('que')
      channel.subscribe('send-number', (message) => {
        console.log(message.data.que_number)
        // const cashier_number = message.data.cashier
        // console.log("cashier:", cashier_number)

        this.current_number = message.data.que_number
      })
    },

    getNowServing() {
      this.$axios
        .get(`api/now-servings/1`)
        .then((response) => {
          console.log(response.data.data.attributes)
          this.current_number = response.data.data.attributes.now_serving
        })
        .catch((error) => {
          console.log(error)
        })
    },
    sendNumber() {
      // var data = {
      //   cashier: this.cashier,
      //   que_number: this.current_number + 1,
      // }
      // const channel = ably.channels.get('que')
      // channel.publish('send-number', data)
      // this.que_number = data.que_number
      // console.log('send')

      var data = {
        //cashier: this.cashier,
        cashier: this.$auth.user.cashier_no,
        que_number: this.current_number + 1,
      }

      // let payload = {
      //   queuing_number: this.current_number + 1,
      // }

      this.$axios
        .put(`api/now-serving/update/${this.cashier}`, data)
        .then((response) => {
          console.log(response)
          this.current_number = data.que_number

          const channel = ably.channels.get('que')
          channel.publish('send-number', data)
          this.que_number = data.que_number
          console.log('send')
        })
        .catch((error) => {
          console.log(error)
        })
    },

    notify() {
      var data = {
        cashier: this.cashier,
        que_number: this.que_number,
      }

      const channel = ably.channels.get('que')
      channel.publish('notify-number', data)
      console.log('notify')
    },
  },
}
</script>
<style scoped>
.card-border {
  border: 2px solid #01b62ec5;
  box-shadow: rgba(100, 100, 111, 0.5) 0px 7px 29px 0px !important;
 
  padding: 10px 15px 20px 15px;
}
.ns {
  color: green !important;

  /* border: 2px solid #666666a8; */
  box-shadow: rgba(100, 100, 111, 0.5) 0px 7px 29px 0px;
  font-size: 40px;
  font-weight: bold;
}
.lq {
  /* border: 2px solid #666666a8; */
  box-shadow: rgba(100, 100, 111, 0.4) 0px 7px 29px 0px;
  font-size: 30px;
  font-weight: bold;
}
</style>
