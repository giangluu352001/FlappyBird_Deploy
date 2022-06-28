import Phaser = require("phaser");
import { FIRSTDELAY, PIPEFIRSTX, SPEED, WIDTHSCENE } from "../constant";
export class Pipe extends Phaser.GameObjects.Image {
    body: Phaser.Physics.Arcade.Body
    constructor(scene: Phaser.Scene, text: string) {
        super(scene, 0, 0, 'sprite', text);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setOrigin(0.5, 0).setDepth(2).setScale(1.3);
        this.move();
    }
    private move(): void {
        this.scene.tweens.add({
          targets: this,
          x: - this.displayWidth / 2,
          duration: (PIPEFIRSTX + this.displayWidth / 2) / SPEED * 1000,
          loop: 0,
          onComplete: () => {
            this.destroy();
          }
        });
    }
}
export class PipeDown extends Pipe {
    constructor(scene: Phaser.Scene, random: number) {
        super(scene, 'pipe/green-pipe-down');
        this.setPosition(PIPEFIRSTX, -420 + random);
    }
}
export class PipeUp extends Pipe {
    constructor(scene: Phaser.Scene, random: number) {
        super(scene, 'pipe/green-pipe-up');
        this.setPosition(PIPEFIRSTX, 170 + random);
    }
}
