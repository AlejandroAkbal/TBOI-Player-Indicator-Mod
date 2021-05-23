// Register the mod
// (which will make it show up in the list of mods on the mod screen in the main menu)
const playerIndicator = RegisterMod("playerIndicator", 1);

// Define callback functions
function postGameStarted() {
  Isaac.DebugString("Callback triggered: MC_POST_GAME_STARTED");
}

// Register callbacks
playerIndicator.AddCallback(ModCallbacks.MC_POST_GAME_STARTED, postGameStarted);

// Print an initialization message to the "log.txt" file
Isaac.DebugString("player-indicator initialized.");
