import Phaser = require("phaser");
import { DELAYADD, FIRSTDELAY } from "../constant";
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
    private input: Phaser.Input.Keyboard.Key;
    constructor(scene: Phaser.Scene, obj: objectGame) {
        this.scene = scene;
        this.obj = obj;
        this.pipeObstacle = scene.add.group();
        this.scene.physics.world.bounds.setTo(0, -20, 900, 573);
        this.groundCollision = scene.physics.add.overlap(this.obj.bird, this.obj.ground, this.end);
        this.pipeCollision = scene.physics.add.overlap(this.obj.bird, this.pipeObstacle, this.end);
        scene.physics.world.on('worldbounds', (body: Phaser.Physics.Arcade.Body, 
        up: boolean, down: boolean, left: boolean, right: boolean) => { if (down) this.end() });
    }
    private end = (): void => {
        this.scene.sound.play('hit');
        this.scene.time.addEvent({
            delay: 150,
            loop: false,
            callbackScope: this,
            callback: () => this.scene.sound.play('die'),
        });
        this.obj.bird.die();
        this.obj.score.setVisible(false);
        this.obj.pauseButton.setVisible(false);
        this.scene.physics.world.removeCollider(this.groundCollision);
        this.scene.physics.world.removeCollider(this.pipeCollision);
        this.scene.physics.world.removeAllListeners();
        this.disable();
        this.scene.time.removeAllEvents();
        this.scene.input.removeAllListeners();
        this.input.removeAllListeners();
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
            delay: DELAYADD,
            loop: true,
            callbackScope: this,
            callback: this.addObstacle
        });
        this.input = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.input.on('down', this.obj.bird.jump, this.scene);
        this.scene.input.on('pointerdown', this.obj.bird.jump, this.scene);
    }
    private disable(): void {
        this.scene.tweens.getAllTweens().forEach((tween) => tween.stop());
        this.pipeObstacle.getChildren().forEach((child: Pipe) => child.body.setVelocityX(0));
    }
    public update(time: number, delta: number) {
        Object.values(this.obj).map(val => val.update(time, delta));
        this.pipeObstacle.getChildren().forEach((child) => { child.update(time, delta) });
    }
    private addObstacle = (): void => {
        const random: number = Phaser.Math.Between(120, 220);
        let pipeUp: PipeUp = new PipeUp(this.scene, random);
        let pipeDown: PipeDown = new PipeDown(this.scene, random);
        this.upScore(FIRSTDELAY, false, true);
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
        this.upScore(FIRSTDELAY + DELAYADD, true, false);
    }
}