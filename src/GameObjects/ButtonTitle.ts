import Phaser = require("phaser");
import { InitialScene } from "../Scenes/InitialScene";
export class ButtonTitle extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene) {
        super(scene, 300, 300);
        scene.add.existing(this);
        let button: Phaser.GameObjects.Image = scene.add.image(0, 120, 'sprite', 'button/button-playgame');
        let title: Phaser.GameObjects.Image = scene.add.image(0, -120, 'sprite', 'message/message-flappy-bird');
        this.add(button).add(title).setDepth(7).setScale(1.3);
        this.scene.tweens.add({
            targets: title,
            y: {from: title.y + 6, to: title.y - 6 },
            duration: 600,
            yoyo: -1,
            repeat: -1
        });
        button.setInteractive().on('pointerdown', () => {
            button.disableInteractive();
            (scene as InitialScene).getMain().play();
        });
    }
}