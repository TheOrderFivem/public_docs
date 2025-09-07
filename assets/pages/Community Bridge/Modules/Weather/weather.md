# Weather 🌤️

<!--META
nav: true
toc: true
description: The Weather module provides control over weather and time synchronization systems. It bridges various weather sync resources to provide unified weather control.
-->

The Weather module provides control over weather and time synchronization systems. It bridges various weather sync resources to provide unified weather control.

## Overview

The Weather module provides dynamic weather systems and environmental controls for immersive gameplay.

## ToggleSync (Client)

### Description
Toggles the player's weather and time synchronization on or off.

### Syntax
```lua
Bridge.Weather.ToggleSync(toggle)
```

### Parameters
- **toggle** (boolean): True to enable sync, false to disable

### Returns
- (nil): No return value

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Enable weather sync for player
Bridge.Weather.ToggleSync(true)

-- Disable weather sync (player keeps current weather/time)
Bridge.Weather.ToggleSync(false)
```

