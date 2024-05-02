<template>
  <v-container>
    <div class="d-flex align-center justify-center" style="height: 75vh">
      <v-card width="400" class="card-border">
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-btn x-large block color="blue" to="/admin/live-monitor" dark
                ><v-icon left>mdi-monitor</v-icon> Live Monitor</v-btn
              >
            </v-col>
            <v-col cols="12">
              <v-btn x-large block color="purple" dark @click="dialog = true"
                ><v-icon left>mdi-restore</v-icon> Reset Que</v-btn
              >
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>

    <!-- DIALOG BOX -->
    <v-dialog v-model="dialog" width="300">
      <div class="text-center">
        <v-sheet
          class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block"
          color="blue-grey darken-3"
          dark
        >
          <div class="grey--text text--lighten-1 text-body-2 mb-4">
            Are you sure you want to reset the que number?
          </div>

          <v-btn @click="dialog = false" class="ma-1" color="grey" plain>
            Cancel
          </v-btn>

          <v-btn class="ma-1" color="error" plain @click="resetQue">
            Reset
          </v-btn>
        </v-sheet>
      </div>
    </v-dialog>

    <!-- SNACKBAR -->
    <v-snackbar v-model="snackbar" top color="success">
      Successfully reset the que number!

      <template v-slot:action="{ attrs }">
        <v-btn small icon v-bind="attrs" @click="snackbar = false">
          <v-icon small>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<script>
export default {
  layout: 'admin',
  data() {
    return {
      dialog: false,
      snackbar: false,
    }
  },

  methods: {
    resetQue() {
      this.$axios
        .put(`/api/que-number/reset`)
        .then((response) => {
          console.log(response)
          this.dialog = false
          this.snackbar = true
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>
<style scoped>
.card-border {
  box-shadow: rgba(100, 100, 111, 0.5) 0px 7px 29px 0px !important;
}
</style>