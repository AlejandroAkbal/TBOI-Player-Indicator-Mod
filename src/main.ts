const GAME = Game();

// Register the mod
const PLAYER_INDICATOR_MOD = RegisterMod("Player Indicator", 1);

enum Config {
  DisableWithOnlyOnePlayer = 0,

  Font = "font/upheaval.fnt",
  FONT_X_OFFSET = -11,
  FONT_Y_OFFSET = 5,
  FONT_SCALE = 1,
}

// Define callback functions
function postRender() {
  checkForPlayers();
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

function drawStringBelowPlayer(string: string, player: EntityPlayer) {
  const PLAYER_POSITION = Isaac.WorldToScreen(player.Position);

  const GAME_FONT = Font();
  GAME_FONT.Load(Config.Font);

  GAME_FONT.DrawStringScaledUTF8(
    string,
    PLAYER_POSITION.X + Config.FONT_X_OFFSET,
    PLAYER_POSITION.Y + Config.FONT_Y_OFFSET,
    Config.FONT_SCALE,
    Config.FONT_SCALE,
    KColor(255, 255, 255, 1),
    0,
    true,
  );
}

// Register callbacks
PLAYER_INDICATOR_MOD.AddCallback(ModCallbacks.MC_POST_RENDER, postRender);

// Print an initialization message to the "log.txt" file
Isaac.DebugString("Player Indicator initialized.");
