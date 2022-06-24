import Phaser = require("phaser");
import { Score } from "../GameObjects/Score";
export class GameOverScene extends Phaser.Scene {
    private score: Score;
    private highScore: Score;
    private messnew: Phaser.GameObjects.Image;
    constructor() {
        super('gameOver-scene');  
    }
    public create(): void {
        let container: Phaser.GameObjects.Container = this.add.container(450, 300);
        let message: Phaser.GameObjects.Image = this.add.image(450, 100, 'sprite', 'message/message-game-over')
        message.setDepth(6).setScale(1.4);
        let board: Phaser.GameObjects.Image = this.add.image(0, -20, 'sprite', 'message/board');
        let ok: Phaser.GameObjects.Image = this.add.image(0, 100, 'sprite', 'button/button-ok');
        this.messnew = this.add.image(35, -10, 'sprite', 'message/message-new').setVisible(true);
        ok.setScale(1.3);
        ok.setInteractive().on('pointerdown', () => {
            ok.disableInteractive();
            this.scene.start('initial-scene');
        });
        this.score = new Score(this, 'digit-20', 60, -32);
        this.highScore = new Score(this, 'digit-20', 60, 12);
        container.add(board).add(ok).add(this.score).
        add(this.messnew).add(this.highScore).setDepth(6).setScale(1.5);
    }
    public show(score: number): void {
        let highScore: number = Number(localStorage.getItem('score'));
        if (score > highScore) {
            highScore = score;
            this.messnew.setVisible(true);
        }
        localStorage.setItem('score', `${highScore}`);
        this.score.setScore(score);
        this.score.setVisible(true).showScore();
        this.highScore.setScore(highScore);
        this.highScore.setVisible(true).showScore();
    }
}
