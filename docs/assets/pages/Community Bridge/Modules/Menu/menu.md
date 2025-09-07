# Menu 📋

<!--META
nav: true
toc: true
description: The Menu module provides a unified interface for creating interactive menus. It supports both ox_lib and qb-menu formats with automatic conversion.
-->

The Menu module provides a unified interface for creating interactive menus. It supports both ox_lib and qb-menu formats with automatic conversion.

## Overview

The Menu module provides interactive menu systems and user interface components for player interactions.

## Open (Client)

### Description
Opens a menu with specified configuration and options.

### Syntax
```lua
Bridge.Menu.Open(data, useQb)
```

### Parameters
- **data** (table): Menu configuration including title, description, and options
- **useQb** (boolean): Whether to use QB-Core menu format (optional)

### Returns
- (string): Menu ID for tracking and management

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Open a simple menu
local menuId = Bridge.Menu.Open({
    title = "Vehicle Options",
    description = "Choose an action for your vehicle",
    options = {
        {
            title = "Lock Vehicle",
            description = "Lock or unlock your vehicle",
            icon = "fas fa-lock",
            onSelect = function()
                -- Lock vehicle logic
                print("Vehicle locked!")
            end
        },
        {
            title = "Start Engine",
            description = "Start the vehicle engine",
            icon = "fas fa-power-off",
            onSelect = function()
                -- Start engine logic
                print("Engine started!")
            end
        },
        {
            title = "Open Trunk",
            description = "Access vehicle storage",
            icon = "fas fa-box-open",
            onSelect = function()
                -- Open trunk logic
                print("Trunk opened!")
            end
        }
    }
})
```

