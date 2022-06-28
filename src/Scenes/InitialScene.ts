import { Background } from "../GameObjects/Background";
import { Bird } from "../GameObjects/Bird";
import { ButtonTitle } from "../GameObjects/ButtonTitle";
import { GameManager } from "../GameObjects/GameManager";
import { Ground } from "../GameObjects/Ground";
import { Score } from "../GameObjects/Score";

export class InitialScene extends Phaser.Scene {
    private background: Background;
    private ground: Ground;
    private gameManager: GameManager;
    private bird: Bird;
    private score: Score;
    private messButton: ButtonTitle;
    private pauseButton: Phaser.GameObjects.Image;
    constructor() {
        super('initial-scene');
    }
    public create(): void {
        this.background = new Background(this, 450, 324, 0.6);
        this.ground = new Ground(this, 0, 640, 1.5);
        this.bird = new Bird(this, 300, 300, 0.09);
        this.score = new Score(this, 'digit-36', 300, 80);
        this.messButton = new ButtonTitle(this);
        this.pauseButton = this.add.image(120, 80, 'sprite', 'button/button-pause')
        .setVisible(false).setDepth(7).setScale(1.3).setInteractive().on('pointerdown', () => {
            this.scene.launch('resume-scene');
            this.scene.pause();
        });
        this.gameManager = new GameManager(this, {
            bird: this.bird, ground: this.ground,
            background: this.background, score: this.score,
            messButton: this.messButton, pauseButton: this.pauseButton
        });
        this.scene.launch('gameOver-scene');
        this.scene.sleep('gameOver-scene');
        this.input.keyboard.once('keydown-SPACE', this.playGame, this);
    }
    public playGame = (): void => {
        if (!this.bird.checkisFly()) this.gameManager.play();
    }
    public update(time: number, delta: number): void {
        this.gameManager.update(time, delta);
    }
}