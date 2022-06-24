export class Bird extends Phaser.GameObjects.Sprite {
    body: Phaser.Physics.Arcade.Body;
    private idle: Phaser.Tweens.Tween;
    constructor(scene: Phaser.Scene, x: number, y: number, scale?: number) {
        super(scene, x, y, 'bird2');
        this.setScale(scale).setOrigin(0.5, 0.5).setDepth(4);
        this.scene.physics.world.enable(this);
        this.body.setSize(this.width, this.height * 0.9);
        scene.add.existing(this);
        this.flyAnimation();
        this.play('fly', true);
        this.setIdle();
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
        this.idle.stop();
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
        this.idle = this.scene.tweens.add({
          targets: this,
          y: {from: this.y + 3, to: this.y - 3 },
          duration: 360,
          yoyo: -1,
          repeat: -1
        });
      }
    public die(): void {
        this.body.setVelocityY(400);
        this.body.setCollideWorldBounds(true);
        this.anims.stop();
    }
    public update(time: number, delta: number): void {
        if (this.angle >= -25 && this.angle <= 90 
        && this.body.velocity.y >= 400) this.angle += 5;
    }
}