# <i class="fas fa-film"></i> Cutscenes

<!--META
nav: true
toc: true
description: The Cutscenes library provides comprehensive cutscene management with character integration, outfit preservation, and multiplayer support. Handles loading, character registration, tag management, and seamless transitions between gameplay and cinematic sequences.
-->

The Cutscenes library provides comprehensive cutscene management with character integration, outfit preservation, and multiplayer support. Handles loading, character registration, tag management, and seamless transitions between gameplay and cinematic sequences.

## Overview

The Cutscenes library provides cinematic sequence management for creating and controlling in-game cutscenes, camera movements, and scripted sequences.

## GetTags (Client)

### Description
Retrieves available character tags from a specific cutscene for character assignment.

### Syntax
```lua
Bridge.Cutscene.GetTags(cutscene)
```

### Parameters
- **cutscene** (string): Name of the cutscene to analyze for character tags

### Returns
- (table): Array of character tag objects with male/female variants

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Get available character slots in a cutscene
local tags = Bridge.Cutscene.GetTags('mp_intro_concierge')
print('Available character tags: ' .. #tags)

for i, tag in pairs(tags) do
    print('Tag ' .. i .. ':')
    if tag.male then print('  Male: ' .. tag.male) end
    if tag.female then print('  Female: ' .. tag.female) end
end
```

## Load (Client)

### Description
Loads a cutscene with appropriate playback list based on player gender, with timeout handling.

### Syntax
```lua
Bridge.Cutscene.Load(cutscene)
```

### Parameters
- **cutscene** (string): Name of the cutscene to load

### Returns
- (boolean): True if cutscene loaded successfully, false if failed or timed out

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Load a cutscene before playing
local loaded = Bridge.Cutscene.Load('mp_intro_concierge')
if loaded then
    print('Cutscene loaded successfully')
    -- Proceed with cutscene setup
else
    print('Failed to load cutscene')
    Bridge.Framework.Notify('Cutscene unavailable', 'error')
end
```

## SavePedOutfit (Client)

### Description
Saves all clothing and prop components of a ped for later restoration after cutscenes.

### Syntax
```lua
Bridge.Cutscene.SavePedOutfit(ped)
```

### Parameters
- **ped** (number): Ped entity handle to save outfit from

### Returns
- (table): Complete outfit data including all components and props

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Save player's current outfit before cutscene
local playerPed = PlayerPedId()
local savedOutfit = Bridge.Cutscene.SavePedOutfit(playerPed)

print('Saved outfit components:')
for component, data in pairs(savedOutfit) do
    print('- ' .. component .. ': ' .. json.encode(data))
end

-- Store for later restoration
local cutsceneData = {
    originalOutfit = savedOutfit,
    ped = playerPed
}
```

## ApplyPedOutfit (Client)

### Description
Applies saved outfit data to a ped, restoring all clothing components and props.

### Syntax
```lua
Bridge.Cutscene.ApplyPedOutfit(ped, outfitData)
```

### Parameters
- **ped** (number): Ped entity handle to apply outfit to
- **outfitData** (table): Outfit data from SavePedOutfit function

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Restore player's outfit after cutscene
local playerPed = PlayerPedId()
Bridge.Cutscene.ApplyPedOutfit(playerPed, cutsceneData.originalOutfit)
print('Player outfit restored')

-- Apply custom outfit
local customOutfit = {
    head = {id = 0, type = 'drawable', drawable = 1, texture = 0, palette = 0},
    hair = {id = 2, type = 'drawable', drawable = 3, texture = 2, palette = 0},
    hat = {id = 0, type = 'prop', propIndex = 5, propTexture = 1}
}
Bridge.Cutscene.ApplyPedOutfit(playerPed, customOutfit)
```

## Create (Client)

### Description
Creates a comprehensive cutscene setup with character registration, tag assignment, and outfit preservation for multiple participants.

### Syntax
```lua
Bridge.Cutscene.Create(cutscene, coords, srcs)
```

### Parameters
- **cutscene** (string): Name of the cutscene to create
- **coords** (vector3 | boolean | nil): Cutscene coordinates (false for player position, nil for cutscene default)
- **srcs** (table | nil): Array of participants: server IDs (numbers), entity handles, or model names (strings)

### Returns
- (table | boolean): Cutscene data object for use with Start() or false if creation failed

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Create cutscene with multiple participants
local participants = {
    1, -- Server ID of another player
    2, -- Another player
    'mp_m_freemode_01', -- NPC model
    someEntityHandle -- Existing ped entity
}

local cutsceneData = Bridge.Cutscene.Create(
    'mp_intro_concierge',
    vector3(100, 200, 30), -- Custom location
    participants
)

if cutsceneData then
    print('Cutscene created with ' .. #cutsceneData.peds .. ' participants')
    print('Using tags: ' .. table.concat(cutsceneData.tags, ', '))

    -- Ready to start cutscene
    Bridge.Cutscene.Start(cutsceneData)
else
    print('Failed to create cutscene')
end

-- Simple single-player cutscene
local simpleData = Bridge.Cutscene.Create('mp_intro_concierge', false)
if simpleData then
    Bridge.Cutscene.Start(simpleData)
end
```

## Start (Client)

### Description
Starts a prepared cutscene with fade effects, control blocking, and automatic cleanup when finished.

### Syntax
```lua
Bridge.Cutscene.Start(cutsceneData)
```

### Parameters
- **cutsceneData** (table): Cutscene data object from Create() function

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Start a prepared cutscene
local cutsceneData = Bridge.Cutscene.Create('mp_intro_concierge', false, {1, 2})
if cutsceneData then
    -- Notify players
    Bridge.Framework.Notify('Starting cutscene...', 'info', 3000)

    -- Start cutscene (blocking until finished)
    Bridge.Cutscene.Start(cutsceneData)

    -- This code runs after cutscene completes
    print('Cutscene finished')
    Bridge.Framework.Notify('Cutscene complete', 'success', 2000)
end

-- Check if cutscene is still running
CreateThread(function()
    while not Bridge.Cutscene.done do
        -- Cutscene is playing
        print('Cutscene in progress...')
        Wait(1000)
    end
    print('Cutscene completed or stopped')
end)
```

