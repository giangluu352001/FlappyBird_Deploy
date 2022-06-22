import Phaser = require("phaser");
import { Background } from "./Background";
import { Bird } from "./Bird";
import { Ground } from "./Ground";
import { Pipe } from "./Pipe";
interface objectGame {
    bird: Bird;
    ground: Ground;
    background: Background;
}
export class GameManager {
    private scene: Phaser.Scene;
    private pipeObstacle: Phaser.GameObjects.Group;
    private obj: objectGame;
    constructor(scene: Phaser.Scene, obj: objectGame) {
        this.scene = scene;
        this.obj = obj;
        this.pipeObstacle = scene.physics.add.group();
        scene.physics.add.collider(this.obj.bird, this.obj.ground, this.pause);
        scene.physics.add.collider(this.obj.bird, this.pipeObstacle, this.pause);
        this.scene.time.addEvent({
            delay: 2000,
            loop: true,
            callback: this.addObstacle
        });
    }
    private pause = (): void => {
        this.scene.physics.pause();
    }
    public play = (): void => {
        this.obj.bird.jump();
    }
    public update(time: number, delta: number) {
        Object.values(this.obj).map(val => val.update(time, delta));
        this.pipeObstacle.getChildren().forEach((child) => child.update(time, delta));
    }
    private addObstacle = (): void => {
        this.pipeObstacle.add(new Pipe(this.scene));
    }
}