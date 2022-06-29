import Phaser = require("phaser");
import { HEIGHTSCENE, WIDTHSCENE } from "./constant";
import { GameOverScene } from "./Scenes/GameOverScene";
import { InitialScene } from "./Scenes/InitialScene";
import { LoadingScene } from "./Scenes/LoadingScene";
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    width: WIDTHSCENE,
    height: HEIGHTSCENE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: [LoadingScene, InitialScene, GameOverScene] 
}
export default new Phaser.Game(config);