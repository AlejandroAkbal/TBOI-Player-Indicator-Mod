import { Config, PLAYER_COLOR_ARRAY } from "./constants";

const GAME = Game();

// Register the mod
const PLAYER_INDICATOR_MOD = RegisterMod("Player Indicator", 1);

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

  // Exit
  if (Config.DisableWithOnlyOnePlayer === 1 && NUM_PLAYERS <= 1) {
    return;
  }

  for (let index = 0; index < NUM_PLAYERS; index++) {
    const PLAYER = Isaac.GetPlayer(index);

    if (!PLAYER) {
      return;
    }

    const PLAYER_NUMBER_STRING = `P${PLAYER.ControllerIndex}`;

    drawStringBelowPlayer(PLAYER_NUMBER_STRING, PLAYER);
  }
}

function drawStringBelowPlayer(stringToDraw: string, player: EntityPlayer) {
  const PLAYER_POSITION = Isaac.WorldToScreen(player.Position);

  const GAME_FONT = Font();
  GAME_FONT.Load(Config.Font);

  const PLAYER_COLOR =
    PLAYER_COLOR_ARRAY[player.ControllerIndex] ?? PLAYER_COLOR_ARRAY[0];

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

// Register callbacks
PLAYER_INDICATOR_MOD.AddCallback(ModCallbacks.MC_POST_RENDER, postRender);

// Print an initialization message to the "log.txt" file
Isaac.DebugString("Player Indicator initialized.");
