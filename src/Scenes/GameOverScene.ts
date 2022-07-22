import Phaser = require("phaser");
import { Score } from "../GameObjects/Score";
import { setAllVisible } from "../Helper/helper";
export class GameOverScene extends Phaser.Scene {
    private score: Score;
    private highScore: Score;
    private messnew: Phaser.GameObjects.Image;
    private medal: Phaser.GameObjects.Image;
    private message: Phaser.GameObjects.Image;
    private ok: Phaser.GameObjects.Image;
    private container: Phaser.GameObjects.Container;
    constructor() {
        super('gameOver-scene');  
    }
    public create(): void {
        this.container = this.add.container(300, 500);

        this.message = this.add.image(300, 100, 'sprite', 'message/message-game-over')
        this.message.setDepth(6).setScale(1.5);

        let board: Phaser.GameObjects.Image = this.add.image(0, -20, 'sprite', 'message/board');
        this.ok = this.add.image(300, 450, 'sprite', 'button/button-ok').setScale(1.5);
        this.medal = this.add.image(-65, -13, 'sprite', 'medal/silver-medal');
        this.messnew = this.add.image(35, -10, 'sprite', 'message/message-new');
        this.score = new Score(this, 'digit-20', 60, -32);
        this.highScore = new Score(this, 'digit-20', 60, 12);

        this.container.add(board).add(this.score).add(this.messnew)
        .add(this.highScore).add(this.medal).setDepth(6).setScale(1.5);

        setAllVisible(false, this.message, this.ok, this.container, this.messnew);

        this.cameras.main.flash();
        this.showGameOver();

        this.ok.setInteractive().once('pointerdown', this.reset, this);
    
    }
    private reset = (): void => {
        this.sound.play('swoosh');
        this.cameras.main.fadeOut(600, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, 
        () => this.scene.start('initial-scene'));
    }
    private showGameOver(): void {
        this.time.addEvent({
            delay: 500,
            loop: false,
            callback: () => {
                this.message.setVisible(true);
                this.elementEffect(this.message, 30, 0).on('complete', () => {
                    this.container.setVisible(true);
                    this.elementEffect(this.container, 0, 200)
                    .on('complete', () => this.ok.setVisible(true));
                });
            }
        });    
    }
    private elementEffect(object: Phaser.GameObjects.Components.Transform,
    from: number, to: number): Phaser.Tweens.Tween {
        return this.tweens.add({
            targets: object,
            duration: 300,
            y: {from: object.y - from, to: object.y - to},
            repeat: 0,
            completeDelay: 500
        });
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
