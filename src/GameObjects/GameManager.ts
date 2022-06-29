import Phaser = require("phaser");
import { DELAYADD, GAP, PIPEFIRSTX, PIPEHEIGHT } from "../constant";
import { move } from "../Helper/helper";
import { GameOverScene } from "../Scenes/GameOverScene";
import { Background } from "./Background";
import { Bird } from "./Bird";
import { ButtonTitle } from "./ButtonTitle";
import { Ground } from "./Ground";
import { PipeUp, PipeDown } from "./Pipe";
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
    private input: Phaser.Input.Keyboard.Key;
    constructor(scene: Phaser.Scene, obj: objectGame) {
        this.scene = scene;
        this.obj = obj;
        this.pipeObstacle = scene.add.group();
        this.scene.physics.world.bounds.setTo(0, -20, 900, 573);
        scene.physics.add.collider(this.obj.bird, this.pipeObstacle, () => {
            this.end();
            this.scene.time.addEvent({
                delay: 150,
                loop: false,
                callbackScope: this,
                callback: () => this.scene.sound.play('die')
            });
        });
        scene.physics.world.on('worldbounds', (body: Phaser.Physics.Arcade.Body, 
        up: boolean, down: boolean, left: boolean, right: boolean) => { if (down) this.end() });
    }
    private end = (): void => {
        this.scene.sound.play('hit');
        this.obj.bird.die();
        this.obj.score.setVisible(false);
        this.obj.pauseButton.setVisible(false);
        this.disable();
        this.scene.scene.wake('gameOver-scene');
        let gameOverScene = this.scene.scene.get('gameOver-scene') as GameOverScene;
        gameOverScene.show(this.obj.score.getScore());
    }
    public play = (): void => {
        this.obj.bird.setisFly(true);
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
        this.scene.physics.world.colliders.destroy();
        this.scene.physics.world.removeAllListeners();
        this.scene.time.removeAllEvents();
        this.scene.input.shutdown();
        this.scene.tweens.getAllTweens().forEach((tween) => tween.stop());
    }
    public update(time: number, delta: number) {
       this.obj.bird.update(time, delta);
    }
    private addObstacle = (): void => {
        const random: number = Phaser.Math.Between(120, 220);
        let pipeUp: PipeUp = new PipeUp(this.scene, random);
        let pipeDown: PipeDown = new PipeDown(this.scene, random);
        this.upScore(pipeDown.y, pipeDown.displayWidth);
        this.pipeObstacle.addMultiple([pipeUp, pipeDown]);
    }
    private upScore(position: number, width: number): void {
        let rectangle = this.scene.add.rectangle(PIPEFIRSTX, position 
        + PIPEHEIGHT + GAP / 2, width, GAP, 0x6666ff);
        this.scene.physics.add.existing(rectangle);
        move(this.scene, rectangle);
        let overlapScore = this.scene.physics.add.overlap(this.obj.bird, rectangle, () => {
            this.obj.score.increaseScore();
            this.scene.physics.world.removeCollider(overlapScore);
        });
    }
}