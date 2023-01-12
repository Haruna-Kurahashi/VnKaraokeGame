class HarmonyKey {
    constructor() {
        //根音
        this.tonic_tone = 440;
        //５音
        this.dominant_tone = this.tonic_tone * 3 / 2;
        //３音
        this.mediant_tone = this.tonic_tone * 5 / 4;
        this.tonic_midiNum = 69;
    }

    createHarmony(key) {
        switch (key) {
            case "C":
                this.tonic_tone = 264;
                this.dominant_tone = this.tonic_tone * 3 / 2;
                this.mediant_tone = this.tonic_tone * 5 / 4;
                this.tonic_midiNum = 60;
                break;
            case "G":
                this.tonic_tone = 391;
                this.dominant_tone = this.tonic_tone * 3 / 2;
                this.mediant_tone = this.tonic_tone * 5 / 4;
                this.tonic_midiNum = 67;
                break;
            case "D":
                this.tonic_tone = 391;
                this.dominant_tone = this.tonic_tone * 3 / 2;
                this.mediant_tone = this.tonic_tone * 5 / 4;
                this.tonic_midiNum = 67;
                break;
            case "A":
                this.tonic_tone = 293.5;
                this.dominant_tone = this.tonic_tone * 3 / 2;
                this.mediant_tone = this.tonic_tone * 5 / 4;
                this.tonic_midiNum = 62;
                break;
            case "B":
                this.tonic_tone = 247.5;
                this.dominant_tone = this.tonic_tone * 3 / 2;
                this.mediant_tone = this.tonic_tone * 5 / 4;
                this.tonic_midiNum = 59;
                break;
        }
    }
}