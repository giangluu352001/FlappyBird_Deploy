import Phaser = require("phaser");
export class ResumeScene extends Phaser.Scene {
    constructor() {
        super('resume-scene');
    }
    public create(): void {
        this.add.image(120, 80, 'sprite', 'button/button-play')
        .setScale(1.5).setInteractive().on('pointerdown', this.resume);
    }
    private resume = (): void => {
        this.sound.play('swoosh');
        this.scene.resume('initial-scene');
        this.scene.stop();
    }
}