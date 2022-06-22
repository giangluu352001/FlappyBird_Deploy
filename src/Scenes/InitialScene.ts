import { Background } from "../GameObjects/Background";
import { Bird } from "../GameObjects/Bird";
import { GameManager } from "../GameObjects/GameManager";
import { Ground } from "../GameObjects/Ground";

export class InitialScene extends Phaser.Scene {
    private background: Background;
    private ground: Ground;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private gameManager: GameManager;
    private bird: Bird;
    constructor() {
        super('Init-game-scene');
    }
    public preload(): void {
        this.load.image('background', './assets/background.png');
        this.load.image('ground', './assets/ground.png');
        this.load.image('pipedown', './assets/pipedown.png');
        this.load.image('pipeup', './assets/pipeup.png');
        this.load.image('bird1', './assets/bird/frame-1.png');
        this.load.image('bird2', './assets/bird/frame-2.png');
        this.load.image('bird3', './assets/bird/frame-3.png');
        this.load.image('bird4', './assets/bird/frame-4.png');
    }
    public create(): void {
        this.background = new Background(this, 450, 324, 0.6);
        this.ground = new Ground(this, 0, 500, 1.3);
        this.bird = new Bird(this, 200, 300, 0.1);
        this.gameManager = new GameManager(this, {
            bird: this.bird, ground: this.ground,
            background: this.background
        });
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    
    public update(time: number, delta: number): void {
        this.gameManager.update(time, delta);
        if(this.cursors.space.isDown) this.gameManager.play();
    }
}