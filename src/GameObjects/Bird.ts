import { shrug } from "../Helper/helper";

export class Bird extends Phaser.GameObjects.Sprite {
    body: Phaser.Physics.Arcade.Body;
    private idle: Phaser.Tweens.Tween;
    constructor(scene: Phaser.Scene, x: number, y: number, scale?: number) {
        super(scene, x, y, 'bird2');
        this.setScale(scale).setDepth(4);
        this.scene.physics.world.enable(this);
        this.body.setSize(this.width, this.height * 0.9);
        scene.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        this.flyAnimation();
        this.play('fly', true);
        this.setIdle();
    }
    public pause(): void {
        this.anims.pause();
        this.scene.physics.pause();
    }
    public resume(): void {
        this.anims.resume();
        this.scene.physics.resume();
    }
    private flyAnimation(): void {
        let config: Phaser.Types.Animations.Animation = {
            key: 'fly',
            frames: [
                {key: 'bird1'}, {key: 'bird2'},
                {key: 'bird3'}, {key: 'bird4'}
            ],
            frameRate: 12,
            repeat: -1
        }
        this.scene.anims.create(config);
    }
    public jump = (): void => {
        this.idle?.stop();
        this.scene.sound.play('wing');
        this.body.setVelocityY(-400);
        this.body.setGravityY(1200);
        this.scene.tweens.add({
                targets: this,
                angle: -25,
                duration: 100
        });
    }
    public setIdle(): void {
        this.idle?.stop();
        this.idle = shrug(this.scene, this);
    }
    public die(): void {
        this.body.setVelocityY(400);
        this.anims.stop();
    }
    public update(time: number, delta: number): void {
        if (this.angle >= -25 && this.angle <= 90 && this.body.velocity.y >= 400 
        && !this.scene.physics.world.isPaused) this.angle += 5;
    }
}