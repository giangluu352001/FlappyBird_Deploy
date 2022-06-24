import Phaser = require("phaser");
import { InitialScene } from "../Scenes/InitialScene";
export class ButtonTitle extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene) {
        super(scene, 300, 300);
        scene.add.existing(this);
        let button: Phaser.GameObjects.Image = scene.add.image(0, 80, 'sprite', 'button/button-playgame');
        let title: Phaser.GameObjects.Image = scene.add.image(0, -120, 'sprite', 'message/message-flappy-bird');
        this.add(button).add(title).setDepth(7);
        button.setInteractive().on('pointerdown', () => {
            button.disableInteractive();
            (scene as InitialScene).getMain().play();
        })
    }
}