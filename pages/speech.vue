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
        speakVoice() {
            // let voices, utterance;
            // voices = this.synth.getVoices();
            // utterance = new SpeechSynthesisUtterance(`Hello ${this.name}`);
            // utterance.voice = voices[2];
            // console.log(utterance.voice)
            // speechSynthesis.speak(utterance)

            let voices = this.synth.getVoices();
            this.greetingSpeech.text = `Hello, ${this.name}`
            this.greetingSpeech.voice = voices[0]
            this.synth.speak(this.greetingSpeech)
        },
        greet() {
            let voices = this.synth.getVoices();
            this.greetingSpeech.text = `Hello, ${this.name}`
            this.greetingSpeech.voice = voices[1]
            this.synth.speak(this.greetingSpeech)
           
        }
    }
}
</script>