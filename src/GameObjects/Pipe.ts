import Phaser = require("phaser");
class PipeUp extends Phaser.GameObjects.Image {
    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0, 'pipeup');
        scene.physics.world.enable(this);
        this.setOrigin(0.5, 0).setY(-300);
    }
}
class PipeDown extends Phaser.GameObjects.Image {
    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0, 'pipedown');
        //scene.physics.world.enable(this);
        this.setOrigin(0.5, 0).setY(150);
    }
}
export class Pipe extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene) {
        super(scene);
        this.scene.add.existing(this);
        scene.physics.world.enable(this);
        let pipeUp: PipeUp = new PipeUp(scene);
        let pipeDown: PipeDown = new PipeDown(scene);
        this.add([pipeUp, pipeDown]).setDepth(2)
        .setPosition(scene.cameras.main.width + 100, Phaser.Math.Between(120, 220));
    }
    public update(time: number, delta: number): void {
        if (this.x <= - this.scene.cameras.main.width / 2) this.destroy();
        else this.setX(this.x - 100 * delta / 1000);
    }
}