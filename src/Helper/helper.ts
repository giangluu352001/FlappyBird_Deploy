import { PIPEFIRSTX, SPEED } from "../constant";
export function move(scene: Phaser.Scene, target: any): void {
  scene.tweens.add({
    targets: target,
    x: - target.displayWidth / 2,
    duration: (PIPEFIRSTX + target.displayWidth / 2) / SPEED * 1000,
    loop: 0,
    onComplete: () => target.destroy()
  });
}
export function shrug(scene: Phaser.Scene, target: 
  Phaser.GameObjects.Components.Transform): Phaser.Tweens.Tween {
  return scene.tweens.add({
    targets: target,
    y: { from: target.y + 6, to: target.y - 6 },
    duration: 600,
    yoyo: -1,
    repeat: -1
  });
}
export function setAllVisible(value: boolean, 
  ...gameObject: Array<Phaser.GameObjects.Components.Visible>): void {
  gameObject.forEach((object) => object.setVisible(value));
}