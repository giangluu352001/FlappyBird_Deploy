import Phaser = require("phaser");
import { GameOverScene } from "./Scenes/GameOverScene";
import { InitialScene } from "./Scenes/InitialScene";
import { LoadingScene } from "./Scenes/LoadingScene";
import { ResumeScene } from "./Scenes/ResumeScene";
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
  scene: [LoadingScene, InitialScene, ResumeScene, GameOverScene] 
}
export default new Phaser.Game(config);