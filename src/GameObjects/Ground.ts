import Phaser = require("phaser");

export class Ground extends Phaser.GameObjects.TileSprite {
    constructor(scene: Phaser.Scene, x: number, y: number, scale?: number) {
        super(scene, x, y, 910, 150, 'ground');
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setScale(scale).setOrigin(0, 0).setDepth(3);
    }
    public update(time: number, delta: number) {
        if (!this.scene.physics.world.isPaused)
            this.tilePositionX += 100 * delta / 1000;
    }
   
}