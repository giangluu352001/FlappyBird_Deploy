import Phaser = require("phaser");
import { Score } from "../GameObjects/Score";
export class GameOverScene extends Phaser.Scene {
    private score: Score;
    private highScore: Score;
    private messnew: Phaser.GameObjects.Image;
    private medal: Phaser.GameObjects.Image;
    constructor() {
        super('gameOver-scene');  
    }
    public create(): void {
        let container: Phaser.GameObjects.Container = this.add.container(300, 300);
        let message: Phaser.GameObjects.Image = this.add.image(0, -150, 'sprite', 'message/message-game-over')
        message.setDepth(6);
        let board: Phaser.GameObjects.Image = this.add.image(0, -20, 'sprite', 'message/board');
        let ok: Phaser.GameObjects.Image = this.add.image(0, 100, 'sprite', 'button/button-ok');
        this.medal = this.add.image(-65, -13, 'sprite', 'medal/silver-medal');
        this.messnew = this.add.image(35, -10, 'sprite', 'message/message-new').setVisible(false);
        ok.setInteractive().once('pointerdown', this.reset, this);
        this.score = new Score(this, 'digit-20', 60, -32);
        this.highScore = new Score(this, 'digit-20', 60, 12);
        container.add(board).add(ok).add(this.score).add(this.messnew)
        .add(this.highScore).add(this.medal).add(message).setDepth(6).setScale(1.5);
        this.cameras.main.flash();
        this.tweens.add({
            targets: container,
            duration: 300,
            y: {from: container.y - 30, to: container.y },
            repeat: 0
        });
    }
    private reset = (): void => {
        this.sound.play('swoosh');
        this.cameras.main.fadeOut(600, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, 
            () => this.scene.start('initial-scene'));
    }
    public show(score: number): void {
        let highScore: number = Number(localStorage.getItem('score'));
        if (score > highScore) {
            highScore = score;
            this.messnew.setVisible(true);
        }
        if (score >= 15)
            this.medal.setTexture('sprite', 'medal/gold-medal-1');
        else if (score >= 10)
            this.medal.setTexture('sprite', 'medal/gold-medal-0');
        else if (score >= 5)
            this.medal.setTexture('sprite', 'medal/silver-medal-1');
        localStorage.setItem('score', `${highScore}`);
        this.score.setScore(score);
        this.score.setVisible(true).showScore();
        this.highScore.setScore(highScore);
        this.highScore.setVisible(true).showScore();
    }
}
