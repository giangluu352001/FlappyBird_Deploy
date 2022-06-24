import Phaser = require("phaser");
export class Pipe extends Phaser.GameObjects.Image {
    body: Phaser.Physics.Arcade.Body
    constructor(scene: Phaser.Scene, text: string) {
        super(scene, 0, 0, 'sprite', text);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setVelocityX(-100);
        this.setOrigin(0.5, 0).setDepth(2).setScale(1.3);
    }
    public update(time: number, delta: number): void {
        if (this.active) {
            if (this.x <= - this.scene.cameras.main.width / 2) 
                this.destroy();
        }
    }
}
export class PipeDown extends Pipe {
    constructor(scene: Phaser.Scene, random: number) {
        super(scene, 'pipe/green-pipe-down');
        this.setPosition(scene.cameras.main.width + 40, -420 + random);
    }
}
export class PipeUp extends Pipe {
    constructor(scene: Phaser.Scene, random: number) {
        super(scene, 'pipe/green-pipe-up');
        this.setPosition(scene.cameras.main.width + 40, 170 + random);
    }
}
