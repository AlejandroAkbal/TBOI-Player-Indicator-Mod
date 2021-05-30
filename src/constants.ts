export const VERSION = "1.0.7";

export enum Config {
  DisableWithOnlyOnePlayer = 0,
  Font = "font/pftempestasevencondensed.fnt",
  FONT_X_OFFSET = 0,
  FONT_Y_OFFSET = 5,
  FONT_SCALE = 1.5,
}

export const PLAYER_COLOR_ARRAY = [
  KColor(0, 255, 255, 1), // Aqua
  KColor(0, 255, 0, 1), // Lime -> Green
  KColor(255, 0, 255, 1), // Fuchsia -> Pink
  KColor(255, 255, 0, 1), // Lemon Glacier -> Yellow
  // KColor(255, 0, 0, 1), // Red
  // KColor(0, 255, 0, 1), // Green
  // KColor(0, 0, 255, 1), // Blue
  // KColor(255, 255, 255, 1), // White
  // KColor(0, 0, 0, 1), // Black
];
