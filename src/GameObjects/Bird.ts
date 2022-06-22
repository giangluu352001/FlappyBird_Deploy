export class Bird extends Phaser.GameObjects.Sprite {
    private tween: Phaser.Tweens.Tween;
    constructor(scene: Phaser.Scene, x: number, y: number, scale?: number) {
        super(scene, x, y, 'bird2');
        this.setScale(scale).setOrigin(0.5, 0.5).setDepth(4);
        scene.add.existing(this);
        this.flyAnimation();
        this.play('fly', true);
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
    public jump(): void {
        this.scene.physics.world.enable(this);
        let body = this.body as Phaser.Physics.Arcade.Body;
        body.setVelocityY(-350);
        body.setGravityY(1000);
        this.tween = this.scene.tweens.add({
                targets: this,
                angle: -25,
                duration: 100
            });
    }
    public update(time: number, delta: number): void {
        if (this.scene.physics.world.isPaused)
            this.anims.stop();
        else if (this.angle >= -25 && this.angle <= 90 && this.body
        && this.body.velocity.y >= 300) this.angle += 3;
    }
}