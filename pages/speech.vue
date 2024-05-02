<template>
    <div>
        <v-card width="500">
            <v-form @submit.prevent="greet">
                <v-card-text>
                    <v-text-field v-model="name" outlined></v-text-field>
                    <v-btn type="submit">Greet</v-btn>
                </v-card-text>
            </v-form>
        </v-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            name: "",
            selectedVoice: 0,
            synth: window.speechSynthesis,
            voiceList: [],
            greetingSpeech: new window.SpeechSynthesisUtterance()
        }
    },

    mounted() {
        this.voiceList = this.synth.getVoices()


    },

    methods: {
        greet() {
            this.greetingSpeech.text = `Hello, ${this.name}. What's the crack?`

            this.greetingSpeech.voice = this.voiceList[0]
            this.synth.speak(this.greetingSpeech)
        }
    }
}
</script>