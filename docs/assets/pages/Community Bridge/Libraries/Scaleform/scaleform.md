# <i class="fas fa-tv"></i> Scaleform

<!--META
nav: true
toc: true
description: The Scaleform library provides advanced interface management for GTA V's built-in Scaleform UI system, particularly for instructional buttons with customizable controls, automatic rendering, and button configuration.
-->

The Scaleform library provides advanced interface management for GTA V's built-in Scaleform UI system, particularly for instructional buttons with customizable controls, automatic rendering, and button configuration.

## Overview

The Scaleform library provides scaleform movie management for displaying HUD elements, loading screens, and interactive UI components using GTA V's scaleform system.

## SetupInstructionalButtons (Client)

### Description
Creates and configures an instructional buttons scaleform with custom button layouts and control bindings.

### Syntax
```lua
Bridge.Scaleform.SetupInstructionalButtons(buttons)
```

### Parameters
- **buttons** (table | nil): Array of button configuration objects (uses defaults if nil)

### Returns
- (number): Scaleform handle for the configured instructional buttons

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Create custom instructional buttons
local buttonConfig = {
    {type = 'CLEAR_ALL'},
    {type = 'SET_CLEAR_SPACE', int = 200},
    {
        type = 'SET_DATA_SLOT',
        name = 'Interact',
        keyIndex = {38}, -- E key
        int = 0
    },
    {
        type = 'SET_DATA_SLOT',
        name = 'Cancel',
        keyIndex = {73}, -- X key
        int = 1
    },
    {
        type = 'SET_DATA_SLOT',
        name = 'Move',
        keyIndex = {32, 33, 34, 35}, -- WASD
        int = 2
    },
    {type = 'DRAW_INSTRUCTIONAL_BUTTONS'},
    {type = 'SET_BACKGROUND_COLOUR'}
}

local scaleform = Bridge.Scaleform.SetupInstructionalButtons(buttonConfig)

-- Start displaying the buttons
Bridge.Scaleform.Run(scaleform, function()
    -- Update callback - return true to stop
    if IsControlJustPressed(0, 73) then -- X pressed
        return true -- Stop scaleform
    end
    return false -- Keep running
end)
```

## Run (Client)

### Description
Starts rendering a scaleform with optional update callback for dynamic content and stop conditions.

### Syntax
```lua
Bridge.Scaleform.Run(scaleform, onUpdate)
```

### Parameters
- **scaleform** (number): Scaleform handle to render
- **onUpdate** (function | nil): Optional callback function called each frame (return true to stop)

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Simple scaleform display
local scaleform = Bridge.Scaleform.SetupInstructionalButtons({})
Bridge.Scaleform.Run(scaleform)

-- Interactive scaleform with state checking
local isActive = true
Bridge.Scaleform.Run(scaleform, function()
    -- Check for exit conditions
    if IsControlJustPressed(0, 200) then -- ESC
        Bridge.Framework.Notify('UI closed', 'info')
        return true -- Stop scaleform
    end

    -- Check for interactions
    if IsControlJustPressed(0, 38) then -- E
        Bridge.Framework.Notify('Interaction pressed', 'success')
    end

    return not isActive -- Stop when isActive becomes false
end)

-- Stop from another thread
CreateThread(function()
    Wait(10000) -- 10 seconds
    isActive = false
end)
```

## Stop (Client)

### Description
Stops the currently running scaleform rendering, cleaning up the display thread.

### Syntax
```lua
Bridge.Scaleform.Stop()
```

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Start scaleform
local scaleform = Bridge.Scaleform.SetupInstructionalButtons({})
Bridge.Scaleform.Run(scaleform)

-- Stop after 5 seconds
SetTimeout(5000, function()
    Bridge.Scaleform.Stop()
    print('Scaleform stopped')
end)

-- Or stop based on condition
CreateThread(function()
    while true do
        if IsControlJustPressed(0, 73) then -- X key
            Bridge.Scaleform.Stop()
            break
        end
        Wait(0)
    end
end)
```

