import Phaser = require("phaser");
import { shrug } from "../Helper/helper";
export class ButtonTitle extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene) {
        super(scene, 300, 300);
        scene.add.existing(this);
        let button: Phaser.GameObjects.Image = scene.add.image(0, 120, 'sprite', 'button/button-playgame').
        setName('start').setInteractive().setScale(0.8);
        let title: Phaser.GameObjects.Image = scene.add.image(0, -120, 'sprite', 'message/message-flappy-bird');
        this.add(button).add(title).setDepth(7).setScale(1.3);
        shrug(scene, title);
        this.buttonEffect(button);
    }
    private buttonEffect(button: Phaser.GameObjects.Image): void {
        this.scene.tweens.add({
            targets: button,
            scaleX: 0.7,
            scaleY: 0.7,
            duration: 2000,
            repeat: -1,
            yoyo: true,
        });
    }
}