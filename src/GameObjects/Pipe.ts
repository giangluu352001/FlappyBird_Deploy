import Phaser = require("phaser");
import { SPEED, WIDTHSCENE } from "../constant";
export class Pipe extends Phaser.GameObjects.Image {
    body: Phaser.Physics.Arcade.Body
    constructor(scene: Phaser.Scene, text: string) {
        super(scene, 0, 0, 'sprite', text);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setVelocityX(-SPEED);
        this.setOrigin(0.5, 0).setDepth(2).setScale(1.3);
    }
    public update(time: number, delta: number): void {
        if (this.active && this.x <= - WIDTHSCENE / 2)
            this.destroy();
    }
}
export class PipeDown extends Pipe {
    constructor(scene: Phaser.Scene, random: number) {
        super(scene, 'pipe/green-pipe-down');
        this.setPosition(WIDTHSCENE + 40, -420 + random);
    }
}
export class PipeUp extends Pipe {
    constructor(scene: Phaser.Scene, random: number) {
        super(scene, 'pipe/green-pipe-up');
        this.setPosition(WIDTHSCENE + 40, 170 + random);
    }
}
