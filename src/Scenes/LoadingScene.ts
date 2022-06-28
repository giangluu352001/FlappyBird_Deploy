export class LoadingScene extends Phaser.Scene {
    constructor() {
        super('loading-scene');
    }
    public preload(): void {
        this.load.audio('wing', './assets/audio/wing.wav');
        this.load.audio('die', './assets/audio/die.wav');
        this.load.audio('hit', './assets/audio/hit.wav'  );
        this.load.audio('point', './assets/audio/point.wav');
        this.load.audio('swoosh', './assets/audio/swoosh.wav');
        this.load.image('background', './assets/background.png');
        this.load.image('ground', './assets/ground.png');
        this.load.image('bird1', './assets/bird/frame-1.png');
        this.load.image('bird2', './assets/bird/frame-2.png');
        this.load.image('bird3', './assets/bird/frame-3.png');
        this.load.image('bird4', './assets/bird/frame-4.png');
        this.load.atlas('sprite', './assets/flappy-bird-sprite.png', './assets/flappy-bird-sprite.json');
    }
    public create(): void {
        this.scene.start('initial-scene');
    }
}