
local ____modules = {}
local ____moduleCache = {}
local ____originalRequire = require
local function require(file)
    if ____moduleCache[file] then
        return ____moduleCache[file]
    end
    if ____modules[file] then
        ____moduleCache[file] = ____modules[file]()
        return ____moduleCache[file]
    else
        if ____originalRequire then
            return ____originalRequire(file)
        else
            error("module '" .. file .. "' not found")
        end
    end
end
____modules = {
["constants"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
____exports.VERSION = "v1.0.2"
____exports.Config = Config or ({})
____exports.Config.DisableWithOnlyOnePlayer = 0
____exports.Config[____exports.Config.DisableWithOnlyOnePlayer] = "DisableWithOnlyOnePlayer"
____exports.Config.Font = "font/pftempestasevencondensed.fnt"
____exports.Config.FONT_X_OFFSET = 0
____exports.Config[____exports.Config.FONT_X_OFFSET] = "FONT_X_OFFSET"
____exports.Config.FONT_Y_OFFSET = 5
____exports.Config[____exports.Config.FONT_Y_OFFSET] = "FONT_Y_OFFSET"
____exports.Config.FONT_SCALE = 1.5
____exports.Config[____exports.Config.FONT_SCALE] = "FONT_SCALE"
____exports.PLAYER_COLOR_ARRAY = {
    KColor(255, 255, 255, 1),
    KColor(0, 255, 255, 1),
    KColor(0, 255, 0, 1),
    KColor(255, 0, 255, 1)
}
return ____exports
end,
["main"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____constants = require("constants")
local Config = ____constants.Config
local PLAYER_COLOR_ARRAY = ____constants.PLAYER_COLOR_ARRAY
local GAME, shouldRender, checkForPlayers, drawStringBelowPlayer
function shouldRender(self)
    local CURRENT_ROOM = GAME:GetRoom()
    if GAME:IsPaused() then
        return false
    end
    if (CURRENT_ROOM:GetFrameCount() < 1) and (not CURRENT_ROOM:IsClear()) then
        return false
    end
    return true
end
function checkForPlayers(self)
    local NUM_PLAYERS = GAME:GetNumPlayers()
    if (Config.DisableWithOnlyOnePlayer == 1) and (NUM_PLAYERS <= 1) then
        return
    end
    do
        local index = 0
        while index < NUM_PLAYERS do
            local PLAYER = Isaac.GetPlayer(index)
            if not PLAYER then
                return
            end
            local PLAYER_NUMBER = index + 1
            local PLAYER_NUMBER_STRING = "P" .. tostring(PLAYER_NUMBER)
            drawStringBelowPlayer(nil, PLAYER_NUMBER_STRING, PLAYER)
            index = index + 1
        end
    end
end
function drawStringBelowPlayer(self, stringToDraw, player)
    local PLAYER_POSITION = Isaac.WorldToScreen(player.Position)
    local GAME_FONT = Font()
    GAME_FONT:Load(Config.Font)
    local PLAYER_COLOR = PLAYER_COLOR_ARRAY[player.ControllerIndex + 1] or PLAYER_COLOR_ARRAY[1]
    GAME_FONT:DrawStringScaledUTF8(stringToDraw, PLAYER_POSITION.X + Config.FONT_X_OFFSET, PLAYER_POSITION.Y + Config.FONT_Y_OFFSET, Config.FONT_SCALE, Config.FONT_SCALE, PLAYER_COLOR, 1, true)
end
GAME = Game()
local PLAYER_INDICATOR_MOD = RegisterMod("Player Indicator", 1)
local function postRender(self)
    if not shouldRender(nil) then
        return
    end
    checkForPlayers(nil)
end
PLAYER_INDICATOR_MOD:AddCallback(ModCallbacks.MC_POST_RENDER, postRender)
Isaac.DebugString("Player Indicator initialized.")
return ____exports
end,
}
return require("main")
