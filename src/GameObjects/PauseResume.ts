import Phaser = require("phaser");
export class PauseResume extends Phaser.GameObjects.Container {
    private pause: Phaser.GameObjects.Image;
    private resume: Phaser.GameObjects.Image;
    constructor(scene: Phaser.Scene) {
        super(scene, 100, 200);
        scene.add.existing(this);
        this.pause = scene.add.image(0, -77, 'sprite', 'button/button-pause').setName('pause').setInteractive();
        this.resume = scene.add.image(0, -77, 'sprite', 'button/button-play').setName('resume').setInteractive().setVisible(false);
        this.add(this.pause).add(this.resume).setScale(1.5).setDepth(9).setVisible(false);
    }
    public setOpposite(): void {
        if (this.pause.visible) {
            this.pause.setVisible(false);
            this.resume.setVisible(true);
        }
        else {
            this.resume.setVisible(false);
            this.pause.setVisible(true);
        }
    }
}