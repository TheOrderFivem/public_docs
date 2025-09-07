# DUI 🖥️

<!--META
nav: true
toc: true
description: The DUI (Direct User Interface) library provides HTML/CSS UI integration within FiveM with full mouse interaction support, texture rendering, and real-time message passing between browser and game. Currently in development/template stage.
-->

The DUI (Direct User Interface) library provides HTML/CSS UI integration within FiveM with full mouse interaction support, texture rendering, and real-time message passing between browser and game. Currently in development/template stage.

## Overview

The DUI library provides Dynamic User Interface management for creating and controlling browser-based UI elements, web content integration, and HTML rendering in-game.

## Create (Client)

### Description
Creates a new DUI browser instance with specified URL and dimensions, returning a unique ID for management.

### Syntax
```lua
Bridge.DUI.Create(url, width, height)
```

### Parameters
- **url** (string): URL to load in the DUI browser
- **width** (number | nil): Width of the DUI in pixels (default: 1280)
- **height** (number | nil): Height of the DUI in pixels (default: 720)

### Returns
- (number | nil): DUI instance ID if successful, nil if failed

### Example
```lua
-- NOTE: DUI library is currently commented out in source
-- This documentation represents the intended API

local Bridge = exports['community_bridge']:Bridge()

-- Create a web-based UI
local duiId = Bridge.DUI.Create('https://example.com/ui', 1920, 1080)
if duiId then
    print('DUI created with ID: ' .. duiId)

    -- Get textures for rendering
    local txd, txn = Bridge.DUI.GetTextures(duiId)
    print('Texture: ' .. txd .. '/' .. txn)
else
    print('Failed to create DUI')
end

-- Create local HTML UI
local localDui = Bridge.DUI.Create('file://ui/index.html', 800, 600)
if localDui then
    Bridge.DUI.TrackMouse(localDui, true, 1.0, 1.0)
end
```

## Destroy (Client)

### Description
Destroys a DUI instance and cleans up associated resources including textures and browser handles.

### Syntax
```lua
Bridge.DUI.Destroy(id)
```

### Parameters
- **id** (number): DUI instance ID to destroy

### Returns
- (boolean): True if successfully destroyed, false if ID not found

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Clean up DUI when done
local destroyed = Bridge.DUI.Destroy(duiId)
if destroyed then
    print('DUI destroyed successfully')
else
    print('DUI not found or already destroyed')
end

-- Cleanup all DUIs on resource stop
Bridge.DUI.CleanupAll()
```

## SetURL (Client)

### Description
Changes the URL of an existing DUI instance, loading new content without recreating the browser.

### Syntax
```lua
Bridge.DUI.SetURL(id, url)
```

### Parameters
- **id** (number): DUI instance ID
- **url** (string): New URL to load

### Returns
- (boolean): True if URL was set successfully

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Navigate to different pages
Bridge.DUI.SetURL(duiId, 'https://example.com/inventory')
Bridge.DUI.SetURL(duiId, 'https://example.com/settings')

-- Load local content
Bridge.DUI.SetURL(duiId, 'file://ui/character.html')
```

## SendMessage (Client)

### Description
Sends a JSON message from the game to the DUI browser for JavaScript handling.

### Syntax
```lua
Bridge.DUI.SendMessage(id, message)
```

### Parameters
- **id** (number): DUI instance ID
- **message** (table): Message object (will be JSON encoded)

### Returns
- (boolean): True if message was sent successfully

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Send player data to UI
local playerData = {
    type = 'updatePlayer',
    data = {
        name = 'John Doe',
        money = 5000,
        job = 'police'
    }
}
Bridge.DUI.SendMessage(duiId, playerData)

-- Send inventory update
local inventoryUpdate = {
    type = 'inventory',
    action = 'update',
    items = Bridge.Framework.GetPlayerInventory()
}
Bridge.DUI.SendMessage(duiId, inventoryUpdate)
```

## Click (Client)

### Description
Simulates a mouse click at specified coordinates on the DUI interface.

### Syntax
```lua
Bridge.DUI.Click(id, x, y, button)
```

### Parameters
- **id** (number): DUI instance ID
- **x** (number): X coordinate to click
- **y** (number): Y coordinate to click
- **button** (string | nil): Mouse button: 'left', 'middle', 'right' (default: 'left')

### Returns
- (boolean): True if click was simulated successfully

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Click a button at specific coordinates
Bridge.DUI.Click(duiId, 400, 300, 'left')

-- Right-click for context menu
Bridge.DUI.Click(duiId, 500, 200, 'right')

-- Programmatic UI interaction
local buttonPos = {x = 150, y = 50}
Bridge.DUI.Click(duiId, buttonPos.x, buttonPos.y)
```

## TrackMouse (Client)

### Description
Enables or disables real-time mouse tracking for a DUI instance with coordinate scaling options.

### Syntax
```lua
Bridge.DUI.TrackMouse(id, enabled, scaleX, scaleY)
```

### Parameters
- **id** (number): DUI instance ID
- **enabled** (boolean): Whether to enable mouse tracking
- **scaleX** (number | nil): X coordinate scale factor (default: 1.0)
- **scaleY** (number | nil): Y coordinate scale factor (default: 1.0)

### Returns
- (boolean): True if tracking state was set successfully

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Enable mouse tracking with 1:1 scaling
Bridge.DUI.TrackMouse(duiId, true, 1.0, 1.0)

-- Enable with custom scaling for high-DPI
Bridge.DUI.TrackMouse(duiId, true, 0.5, 0.5)

-- Disable mouse tracking
Bridge.DUI.TrackMouse(duiId, false)
```

## GetTextures (Client)

### Description
Retrieves the texture dictionary and name for rendering the DUI in-game.

### Syntax
```lua
Bridge.DUI.GetTextures(id)
```

### Parameters
- **id** (number): DUI instance ID

### Returns
- (string | nil): Texture dictionary name
- (string | nil): Texture name

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Get textures for rendering
local txd, txn = Bridge.DUI.GetTextures(duiId)
if txd and txn then
    -- Render DUI on a surface (requires additional rendering code)
    print('Render using: ' .. txd .. '/' .. txn)
else
    print('DUI textures not available')
end
```

## Exists (Client)

### Description
Checks if a DUI instance exists and is active.

### Syntax
```lua
Bridge.DUI.Exists(id)
```

### Parameters
- **id** (number): DUI instance ID to check

### Returns
- (boolean): True if instance exists and is active

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Check before operations
if Bridge.DUI.Exists(duiId) then
    Bridge.DUI.SendMessage(duiId, {type = 'update'})
else
    print('DUI no longer exists')
end
```

## CleanupAll (Client)

### Description
Destroys all active DUI instances, useful for resource cleanup.

### Syntax
```lua
Bridge.DUI.CleanupAll()
```

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Clean up all DUIs (automatically called on resource stop)
Bridge.DUI.CleanupAll()
print('All DUI instances destroyed')
```

