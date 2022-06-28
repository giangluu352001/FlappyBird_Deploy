import Phaser = require("phaser");
export class Background extends Phaser.GameObjects.Image {
    constructor(scene: Phaser.Scene, x: number, y: number, scale?: number) {
        super(scene, x, y, 'background');
        this.scene.add.existing(this);
        this.setScale(scale).setDepth(1);
    }
}