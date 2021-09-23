import { Config, PLAYER_COLOR_ARRAY } from "./constants";

export default function main(): void {
  // Instantiate a new mod object, which grants the ability to add callback functions that
  // correspond to in-game events
  const MOD = RegisterMod("Player Indicator", 1);

  // Set a callback function that corresponds to when a new run is started
  MOD.AddCallback(ModCallbacks.MC_POST_RENDER, postRender);

  // Print an initialization message to the "log.txt" file
  Isaac.DebugString("Player Indicator initialized.");
}

const GAME = Game();

// Define callback functions
function postRender() {
  if (!shouldRender()) {
    return;
  }

  checkForPlayers();
}

function shouldRender() {
  const CURRENT_ROOM = GAME.GetRoom();

  if (GAME.IsPaused()) {
    return false;
  }

  // Don't render on Animations
  if (CURRENT_ROOM.GetFrameCount() < 1 && !CURRENT_ROOM.IsClear()) {
    return false;
  }

  return true;
}

function checkForPlayers() {
  const NUM_PLAYERS = GAME.GetNumPlayers();

  for (let playerIndex = 0; playerIndex < NUM_PLAYERS; playerIndex++) {
    const PLAYER = Isaac.GetPlayer(playerIndex);

    if (PLAYER === null || PLAYER === undefined) {
      return;
    }

    const PLAYER_NUMBER = playerIndex + 1;
    const PLAYER_NUMBER_STRING = `P${PLAYER_NUMBER}`;

    drawStringBelowPlayer(PLAYER_NUMBER_STRING, PLAYER, playerIndex);
  }
}

function drawStringBelowPlayer(
  stringToDraw: string,
  player: EntityPlayer,
  playerIndex: number,
) {
  const PLAYER_POSITION = Isaac.WorldToScreen(player.Position);

  const PLAYER_COLOR = PLAYER_COLOR_ARRAY[playerIndex] ?? PLAYER_COLOR_ARRAY[0];

  const GAME_FONT = Font();
  GAME_FONT.Load(Config.Font);

  GAME_FONT.DrawStringScaledUTF8(
    stringToDraw,
    PLAYER_POSITION.X + Config.FONT_X_OFFSET,
    PLAYER_POSITION.Y + Config.FONT_Y_OFFSET,
    Config.FONT_SCALE,
    Config.FONT_SCALE,
    PLAYER_COLOR,
    1,
    true,
  );
}
