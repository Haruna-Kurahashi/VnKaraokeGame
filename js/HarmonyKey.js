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
    }

    createHarmony(key) {
        switch (key) {
            case "C":
                this.tonic_tone = 260.74;
                this.dominant_tone = this.tonic_tone * 3 / 2;
                this.mediant_tone = this.tonic_tone * 5 / 4;
                this.tonic_midiNum = 60;
                this.keyName = "C dur";
                break;
            case "G":
                this.tonic_tone = 391.11;
                this.dominant_tone = this.tonic_tone * 3 / 2;
                this.mediant_tone = this.tonic_tone * 5 / 4;
                this.tonic_midiNum = 67;
                this.keyName = "G dur";
                break;
            case "D":
                this.tonic_tone = 293.5;
                this.dominant_tone = this.tonic_tone * 3 / 2;
                this.mediant_tone = this.tonic_tone * 5 / 4;
                this.tonic_midiNum = 62;
                this.keyName = "D dur";
                break;
            case "A":
                this.tonic_tone = 440;
                this.dominant_tone = this.tonic_tone * 3 / 2;
                this.mediant_tone = this.tonic_tone * 5 / 4;
                this.tonic_midiNum = 69;
                this.keyName = "A dur";
                break;
            case "E":
                this.tonic_tone = 660;
                this.dominant_tone = this.tonic_tone * 3 / 2;
                this.mediant_tone = this.tonic_tone * 5 / 4;
                this.tonic_midiNum = 76;
                this.keyName = "E dur";
                break;
            case "B":
                this.tonic_tone = 247.5;
                this.dominant_tone = this.tonic_tone * 3 / 2;
                this.mediant_tone = this.tonic_tone * 5 / 4;
                this.tonic_midiNum = 59;
                this.keyName = "B dur";
                break;
        }
    }
}