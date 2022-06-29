import { Background } from "../GameObjects/Background";
import { Bird } from "../GameObjects/Bird";
import { ButtonTitle } from "../GameObjects/ButtonTitle";
import { GameManager } from "../GameObjects/GameManager";
import { Ground } from "../GameObjects/Ground";
import { PauseResume } from "../GameObjects/PauseResume";
import { ReadyPlay } from "../GameObjects/ReadyPlay";
import { Score } from "../GameObjects/Score";

export class InitialScene extends Phaser.Scene {
    private background: Background;
    private ground: Ground;
    private gameManager: GameManager;
    private bird: Bird;
    private score: Score;
    private messButton: ButtonTitle;
    private pauseResume: PauseResume;
    private ready: ReadyPlay;
    constructor() {
        super('initial-scene');
    }
    public create(): void {
        this.background = new Background(this, 450, 324, 0.6);
        this.ground = new Ground(this, 0, 640, 1.5);
        this.bird = new Bird(this, 300, 300, 0.09);
        this.score = new Score(this, 'digit-36', 300, 80).setScale(1.3);
        this.messButton = new ButtonTitle(this);
        this.ready = new ReadyPlay(this).setName('ready').setInteractive();
        this.pauseResume = new PauseResume(this);
        this.gameManager = new GameManager(this, {
            bird: this.bird, ground: this.ground, background: this.background, score: this.score,
            messButton: this.messButton, pauseResume: this.pauseResume, readyPlay: this.ready
        });
        this.scene.launch('gameOver-scene');
        this.scene.sleep('gameOver-scene');
    }
    public update(time: number, delta: number): void {
        this.gameManager.update(time, delta);
    }
}