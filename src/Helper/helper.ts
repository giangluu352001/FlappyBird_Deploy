import { PIPEFIRSTX, SPEED } from "../constant";
export function move(scene: Phaser.Scene, target: any): void {
    scene.tweens.add({
      targets: target,
      x: - target.displayWidth / 2,
      duration: (PIPEFIRSTX + target.displayWidth / 2) / SPEED * 1000,
      loop: 0,
      onComplete: () => {
        target.destroy();
      }
    });
}