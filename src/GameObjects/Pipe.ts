import Phaser = require("phaser");
import { PIPEFIRSTX } from "../constant";
import { move } from "../Helper/helper";
export class Pipe extends Phaser.GameObjects.Image {
    body: Phaser.Physics.Arcade.Body;
    constructor(scene: Phaser.Scene, text: string) {
        super(scene, 0, 0, 'sprite', text);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setOrigin(0.5, 0).setDepth(2).setScale(1.3);
        this.body.immovable = true;
        move(scene, this);
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
