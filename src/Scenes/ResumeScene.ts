import Phaser = require("phaser");
export class ResumeScene extends Phaser.Scene {
    constructor() {
        super('resume-scene');
    }
    public create(): void {
        this.add.image(120, 80, 'sprite', 'button/button-play')
        .setScale(1.3).setDepth(7).setInteractive().on('pointerdown', this.resume);
        this.input.keyboard.on('keydown-SPACE', this.resume);
    }
    private resume = (): void => {
        this.scene.resume('initial-scene');
        this.scene.stop();
    }
}