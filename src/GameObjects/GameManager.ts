import Phaser = require("phaser");
import { GAP, PIPEFIRSTX, PIPEHEIGHT, DELAYADD } from "../constant";
import { move, setAllVisible } from "../Helper/helper";
import { GameOverScene } from "../Scenes/GameOverScene";
import { Background } from "./Background";
import { Bird } from "./Bird";
import { ButtonTitle } from "./ButtonTitle";
import { Ground } from "./Ground";
import { PauseResume } from "./PauseResume";
import { PipeUp, PipeDown } from "./Pipe";
import { ReadyPlay } from "./ReadyPlay";
import { Score } from "./Score";
interface objectGame {
    bird: Bird;
    ground: Ground;
    background: Background;
    score: Score;
    messButton: ButtonTitle;
    pauseResume: PauseResume;
    readyPlay: ReadyPlay;
}
enum State {READY, PAUSED, RUNNING};
export class GameManager {
    private scene: Phaser.Scene;
    private pipeObstacle: Phaser.GameObjects.Group;
    private obj: objectGame;
    private input: Phaser.Input.Keyboard.Key;
    private state: State;
    private timer: Phaser.Time.TimerEvent;
    private emitter: Phaser.GameObjects.Particles.ParticleEmitter;
    constructor(scene: Phaser.Scene, obj: objectGame) {
        this.scene = scene;
        this.obj = obj;
        this.pipeObstacle = scene.add.group();
        this.input = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
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
        this.handleInput();
        scene.physics.world.on('worldbounds', (body: Phaser.Physics.Arcade.Body, 
        up: boolean, down: boolean, left: boolean, right: boolean) => { if (down) this.end() });
    }
    private handleInput(): void {
        this.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer, 
            objectsClicked: Phaser.GameObjects.GameObject[]) => {    
                if (objectsClicked.length) {
                    this.scene.sound.play('swoosh');
                    if (objectsClicked[0].name == 'start') {
                        this.ready();
                        this.state = State.READY;
                    }
                    else if (objectsClicked[0].name == 'pause') {
                        this.pause();
                        this.state = State.PAUSED;
                        this.obj.pauseResume.setOpposite();
                    }
                    else if (objectsClicked[0].name == 'resume') {
                        if (this.state == State.PAUSED) { 
                            this.obj.pauseResume.setOpposite();
                            this.resume();
                            if (!this.obj.readyPlay.visible) 
                                this.state = State.RUNNING;
                            else this.state = State.READY;
                        }
                    }
                }
                else if (this.state == State.READY) {
                    this.play();
                    this.flyParticle();
                    this.obj.readyPlay.setVisible(false);
                    this.state = State.RUNNING;
                }
                else if (this.state == State.RUNNING)
                    this.obj.bird.jump();
        });
    }
    private end = (): void => {
        this.dieParticle();
        this.scene.sound.play('hit');
        this.obj.bird.die();
        setAllVisible(false, this.obj.score, this.obj.pauseResume);
        this.disable();
        this.scene.scene.wake('gameOver-scene');
        let gameOverScene = this.scene.scene.get('gameOver-scene') as GameOverScene;
        gameOverScene.show(this.obj.score.getScore());
    }
    private dieParticle(): void {
        this.emitter.setSpeed({ min: -800, max: 800 });
        this.emitter.setAngle({ min: 0, max: 360 });
        this.emitter.setBlendMode('SCREEN');
        this.emitter.explode(10, this.obj.bird.x, this.obj.bird.y);
    }
    private play = (): void => {
        this.obj.bird.jump();
        this.timer = this.scene.time.addEvent({
            delay: DELAYADD,
            loop: true,
            callbackScope: this,
            callback: this.addObstacle
        });
        this.input.on('down', this.obj.bird.jump, this.scene);
    }
    private ready(): void {
        setAllVisible(false, this.obj.messButton, this.obj.bird);
        this.scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_START, () => {
            setAllVisible(true, this.obj.bird, this.obj.score,
            this.obj.pauseResume, this.obj.readyPlay);
            this.obj.score.showScore();
        });
        this.scene.cameras.main.fadeIn(600, 0, 0, 0);
    }
    private pause(): void {
        this.obj.bird.pause();
        if (this.emitter) this.emitter.pause();
        if (this.timer) this.timer.paused = true;
        this.input.enabled = false;
        this.scene.tweens.getAllTweens().forEach((tween) => tween.pause());
    }
    private resume(): void {
        this.obj.bird.resume();
        if (this.emitter) this.emitter.resume();
        if (this.timer) this.timer.paused = false;
        this.input.enabled = true;
        this.scene.tweens.getAllTweens().forEach((tween) => tween.resume());
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
    private flyParticle(): void {
        this.emitter = this.scene.add.particles('flares').setDepth(3)
        .createEmitter({
            frame: 'blue',
            speed: 100,
            scale: { start: 0.4, end: 0.2 },
            angle: { min: 175, max: 185 },
            frequency: 50,
            lifespan: 3000,
            blendMode: 'ADD',
            follow: this.obj.bird
        });
    }
}