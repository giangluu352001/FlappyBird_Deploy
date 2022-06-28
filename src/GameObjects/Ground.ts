import Phaser = require("phaser");
import { SPEED } from "../constant";
export class Ground extends Phaser.GameObjects.Sprite {
    body: Phaser.Physics.Arcade.Body;
    constructor(scene: Phaser.Scene, x: number, y: number, scale?: number) {
        super(scene, x, y, 'ground');
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setOrigin(0, 0.5);
        this.setScale(scale).setDepth(3);
        this.move();
    }
    private move(): void {
        this.scene.tweens.add({
          targets: this,
          x: - this.displayWidth / 2,
          duration: (this.x + this.displayWidth / 2) / SPEED * 1000,
          loop: -1
        });
    }
}