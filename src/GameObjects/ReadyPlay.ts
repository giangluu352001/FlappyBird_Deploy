import Phaser = require("phaser");
export class ReadyPlay extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene) {
        super(scene, 300, 300);
        scene.add.existing(this);
        let ready: Phaser.GameObjects.Image = scene.add.image(0, -80, 'sprite', 'message/message-get-ready');
        let tab: Phaser.GameObjects.Image = scene.add.image(0, 100, 'sprite', 'message/message-helper');
        this.add(ready).add(tab).setScale(1.5).setDepth(8).setVisible(false);
    }
}