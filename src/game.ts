import Phaser = require("phaser");
import { InitialScene } from "./Scenes/InitialScene";
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    width: 900,
    height: 648,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  scene: [InitialScene] 
}
export default new Phaser.Game(config);