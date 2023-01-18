class HarmonyKey {
    constructor() {
        //根音
        this.tonic_tone = 440;
        //５音
        this.dominant_tone = this.tonic_tone * 3 / 2;
        //３音
        this.mediant_tone = this.tonic_tone * 5 / 4;
        this.tonic_midiNum = 69;
        this.keyName = "";
        this.quizName = ";"
    }

    createHarmony(key) {
        switch (key) {
            case "C":
                this.tonic_tone = 260.74;
                this.dominant_tone = this.tonic_tone * 3 / 2;
                this.mediant_tone = this.tonic_tone * 5 / 4;
                this.tonic_midiNum = 60;
                this.keyName = "C dur";
                this.quizName = "E"
                break;
            case "G":
                this.tonic_tone = 391.11;
                this.dominant_tone = this.tonic_tone * 3 / 2;
                this.mediant_tone = this.tonic_tone * 5 / 4;
                this.tonic_midiNum = 67;
                this.keyName = "G dur";
                this.quizName = "B"
                break;
            case "D":
                this.tonic_tone = 293.5;
                this.dominant_tone = this.tonic_tone * 3 / 2;
                this.mediant_tone = this.tonic_tone * 5 / 4;
                this.tonic_midiNum = 62;
                this.keyName = "D dur";
                this.quizName = "F#"
                break;
            case "A":
                this.tonic_tone = 440;
                this.dominant_tone = this.tonic_tone * 3 / 2;
                this.mediant_tone = this.tonic_tone * 5 / 4;
                this.tonic_midiNum = 69;
                this.keyName = "A dur";
                this.quizName = "C#"
                break;
            case "E":
                this.tonic_tone = 660;
                this.dominant_tone = this.tonic_tone * 3 / 2;
                this.mediant_tone = this.tonic_tone * 5 / 4;
                this.tonic_midiNum = 76;
                this.keyName = "E dur";
                this.quizName = "G#"
                break;
            case "B":
                this.tonic_tone = 247.5;
                this.dominant_tone = this.tonic_tone * 3 / 2;
                this.mediant_tone = this.tonic_tone * 5 / 4;
                this.tonic_midiNum = 59;
                this.keyName = "B dur";
                this.quizName = "D#"
                break;
        }
    }
}