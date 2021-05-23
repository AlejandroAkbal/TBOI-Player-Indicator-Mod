
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
return ____exports
end,
["main"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
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
            local PLAYER_NUMBER_STRING = "P" .. tostring(PLAYER.ControllerIndex)
            drawStringBelowPlayer(nil, PLAYER_NUMBER_STRING, PLAYER)
            index = index + 1
        end
    end
end
function drawStringBelowPlayer(self, ____string, player)
    local PLAYER_POSITION = Isaac.WorldToScreen(player.Position)
    local GAME_FONT = Font()
    GAME_FONT:Load(Config.Font)
    GAME_FONT:DrawStringScaledUTF8(
        ____string,
        PLAYER_POSITION.X + Config.FONT_X_OFFSET,
        PLAYER_POSITION.Y + Config.FONT_Y_OFFSET,
        Config.FONT_SCALE,
        Config.FONT_SCALE,
        KColor(255, 255, 255, 1),
        0,
        true
    )
end
GAME = Game()
PLAYER_INDICATOR_MOD = RegisterMod("Player Indicator", 1)
Config = Config or ({})
Config.DisableWithOnlyOnePlayer = 0
Config[Config.DisableWithOnlyOnePlayer] = "DisableWithOnlyOnePlayer"
Config.Font = "font/upheaval.fnt"
Config.FONT_X_OFFSET = -11
Config[Config.FONT_X_OFFSET] = "FONT_X_OFFSET"
Config.FONT_Y_OFFSET = 5
Config[Config.FONT_Y_OFFSET] = "FONT_Y_OFFSET"
Config.FONT_SCALE = 1
Config[Config.FONT_SCALE] = "FONT_SCALE"
function postRender(self)
    checkForPlayers(nil)
end
PLAYER_INDICATOR_MOD:AddCallback(ModCallbacks.MC_POST_RENDER, postRender)
Isaac.DebugString("Player Indicator initialized.")
end,
}
return require("main")
