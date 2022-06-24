import Phaser = require("phaser");
export class Score extends Phaser.GameObjects.Container {
    private value: number;
    private size: string;
    constructor(scene: Phaser.Scene, size: string, x: number, y: number) {
        super(scene);
        scene.add.existing(this);
        this.value = 0;
        this.size = size;
        this.setX(x).setY(y).setVisible(false).setDepth(5);
    }
    public setScore(value: number): void {
        this.value = value;
    }
    public getScore(): number {
        return this.value;
    }
    public showScore(): void {
        this.getAll().forEach((num) => num.destroy());
        let idx: number = 0;
        this.value.toString().split('').forEach((char) => {
            let digit: Phaser.GameObjects.Image = this.scene.add.image(idx, 0, 'sprite', `digit/${this.size}-${char}`);
            digit.setOrigin(0, 0.5);
            this.add(digit);
            idx += digit.width + 2;
        });
    }
    public increaseScore = (): void => {
        this.scene.sound.play('point');
        this.value += 1;
        this.showScore();
    }
}