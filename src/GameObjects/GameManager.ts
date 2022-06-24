import Phaser = require("phaser");
import { GameOverScene } from "../Scenes/GameOverScene";
import { Background } from "./Background";
import { Bird } from "./Bird";
import { ButtonTitle } from "./ButtonTitle";
import { Ground } from "./Ground";
import { PipeUp, PipeDown, Pipe } from "./Pipe";
import { Score } from "./Score";
interface objectGame {
    bird: Bird;
    ground: Ground;
    background: Background;
    score: Score;
    messButton: ButtonTitle;
    pauseButton: Phaser.GameObjects.Image;
}
export class GameManager {
    private scene: Phaser.Scene;
    private pipeObstacle: Phaser.GameObjects.Group;
    private obj: objectGame;
    private pipeCollision: Phaser.Physics.Arcade.Collider;
    private groundCollision: Phaser.Physics.Arcade.Collider;
    private isEnded: boolean;
    constructor(scene: Phaser.Scene, obj: objectGame) {
        this.scene = scene;
        this.obj = obj;
        this.isEnded = false;
        this.pipeObstacle = scene.add.group();
        this.scene.physics.world.bounds.setTo(0, 0, 900, 500);
        this.groundCollision = scene.physics.add.overlap(this.obj.bird, this.obj.ground, this.end);
        this.pipeCollision = scene.physics.add.overlap(this.obj.bird, this.pipeObstacle, this.end);
    }
    private end = (): void => {
        this.obj.bird.die();
        this.obj.score.setVisible(false);
        this.obj.pauseButton.setVisible(false);
        this.scene.physics.world.removeCollider(this.groundCollision);
        this.scene.physics.world.removeCollider(this.pipeCollision);
        this.disable();
        this.scene.time.removeAllEvents();
        this.scene.input.removeAllListeners();
        this.isEnded = true;
        this.scene.scene.wake('gameOver-scene');
        let gameOverScene = this.scene.scene.get('gameOver-scene') as GameOverScene;
        gameOverScene.show(this.obj.score.getScore());
    }
    public play = (): void => {
        this.obj.bird.jump();
        this.obj.messButton.setVisible(false);
        this.obj.pauseButton.setVisible(true);
        this.obj.score.setVisible(true).showScore();
        this.scene.time.addEvent({
            delay: 2000,
            loop: true,
            callbackScope: this,
            callback: this.addObstacle
        });
        this.scene.input.keyboard.on('keydown-SPACE', this.resetOrJump, this.obj.bird);
        this.scene.input.on('pointerdown', this.obj.bird.jump, this.obj.bird);
    }
    private resetOrJump = (): void => {
        if (this.isEnded) this.scene.scene.start('initial-scene');
        else this.obj.bird.jump();
    }
    private disable(): void {
        Object.values(this.obj).map(val => val.setActive(false));
        this.pipeObstacle.getChildren().forEach((child) => child.setActive(false));
    }
    public update(time: number, delta: number) {
        Object.values(this.obj).map(val => val.update(time, delta));
        this.pipeObstacle.getChildren().forEach((child) => { child.update(time, delta) });
    }
    private addObstacle = (): void => {
        const random: number = Phaser.Math.Between(120, 220)
        let pipeUp: PipeUp = new PipeUp(this.scene, random);
        let pipeDown: PipeDown = new PipeDown(this.scene, random);
        this.upScore(5800, false, true);
        this.pipeObstacle.addMultiple([pipeUp, pipeDown]);
    }
    private upScore(delay: number, isLoop: boolean, isCallback: boolean): void {
        this.scene.time.addEvent({
            delay: delay,
            loop: isLoop,
            callbackScope: this,
            callback: () => { if (isCallback) this.inscrease(isCallback) }
        });
    }
    private inscrease = (isCallback: boolean): void => {
        this.obj.score.increaseScore();
        this.upScore(4100, true, false);
    }
}