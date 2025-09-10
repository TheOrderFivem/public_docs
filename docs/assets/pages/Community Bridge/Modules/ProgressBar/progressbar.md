# <i class="fas fa-hourglass-half"></i> ProgressBar

<!--META
nav: true
toc: true
description: The ProgressBar module provides a unified interface for displaying progress bars during various actions. It supports different progress bar systems and styles with automatic format conversion.
-->

The ProgressBar module provides a unified interface for displaying progress bars during various actions. It supports different progress bar systems and styles with automatic format conversion between different frameworks.

## Overview

The ProgressBar module provides visual progress indicators and timed action feedback for player activities. It automatically detects and adapts to different progress bar systems:

- **ox_lib** - Supports both bar and circle styles with modern UI elements
- **lation_ui** - Advanced progress bar system with enhanced visual features  
- **qb-progressbar** - Traditional QB-Core progress bar system

The module automatically converts between different option formats (QB-Core format vs Ox format) to ensure compatibility across all supported systems.

## Open (Client)

### Description
Opens a progress bar with specified options. Supports both bar and circle styles (ox_lib), with automatic format conversion between QB-Core and Ox formats.

### Syntax
```lua
Bridge.ProgressBar.Open(options, callback, isQBFormat)
```

### Parameters
- **options** (table): Progress bar configuration options (see Options section below)
- **callback** (function): Function to call when progress bar completes or is cancelled (optional)
- **isQBFormat** (boolean): Whether the options are in QB-Core format (will be auto-converted) (optional)

### Returns
- (boolean): Returns true if progress bar completed successfully, false if cancelled

## Options

The options table supports different formats depending on the `isQBFormat` parameter:

### Standard Format (Ox/Lation Compatible)
```lua
{
    duration = 5000,              -- Duration in milliseconds
    label = "Action...",          -- Progress bar label
    description = "Description",  -- Additional description (lation_ui only)
    icon = "icon-name",          -- Icon name (lation_ui only)
    iconColor = "#ffffff",       -- Icon color (lation_ui only)
    iconAnimation = "bounce",    -- Icon animation (lation_ui only)
    style = "bar",               -- "bar" or "circle" (ox_lib only)
    position = "bottom",         -- Position on screen (ox_lib only)
    useWhileDead = false,        -- Allow use while dead
    canCancel = true,            -- Allow cancellation
    disable = {                  -- Control restrictions
        move = true,             -- Disable movement
        car = true,              -- Disable vehicle movement
        combat = true,           -- Disable combat
        mouse = false            -- Disable mouse
    },
    anim = {                     -- Animation settings
        dict = "animation_dict", -- Animation dictionary
        clip = "animation_name", -- Animation name
        flag = 49               -- Animation flags
    },
    prop = {                     -- Props (can be table or array)
        {                        -- First prop
            model = "prop_name",
            bone = 60309,
            pos = {x, y, z},
            rot = {x, y, z}
        },
        {                        -- Second prop (optional)
            model = "prop_name2",
            bone = 18905,
            pos = {x, y, z},
            rot = {x, y, z}
        }
    }
}
```

### QB-Core Format (Legacy Compatibility)
```lua
{
    name = "unique_name",        -- Unique identifier
    duration = 5000,             -- Duration in milliseconds
    label = "Action...",         -- Progress bar label
    useWhileDead = false,        -- Allow use while dead
    canCancel = true,            -- Allow cancellation
    controlDisables = {          -- Control restrictions
        disableMovement = true,
        disableCarMovement = true,
        disableCombat = true,
        disableMouse = false
    },
    animation = {                -- Animation settings
        animDict = "animation_dict",
        anim = "animation_name",
        flags = 49
    },
    prop = {                     -- First prop
        model = "prop_name",
        bone = 60309,
        coords = {x, y, z},
        rotation = {x, y, z}
    },
    propTwo = {                  -- Second prop (optional)
        model = "prop_name2",
        bone = 18905,
        coords = {x, y, z},
        rotation = {x, y, z}
    }
}
```

## Examples

### Basic Progress Bar
```lua
local Bridge = exports['community_bridge']:Bridge()

local success = Bridge.ProgressBar.Open({
    duration = 5000,
    label = "Repairing vehicle...",
    canCancel = true,
    disable = {
        move = true,
        car = true,
        combat = true
    },
    anim = {
        dict = "mini@repair",
        clip = "fixing_a_ped",
        flag = 49
    }
})

if success then
    print("Repair completed!")
else
    print("Repair cancelled!")
end
```

### Progress Bar with Props
```lua
local success = Bridge.ProgressBar.Open({
    duration = 8000,
    label = "Using laptop...",
    canCancel = true,
    disable = {
        move = true,
        combat = true
    },
    anim = {
        dict = "anim@heists@prison_heistig_1@misc@ig_15@",
        clip = "hack_loop",
        flag = 49
    },
    prop = {
        {
            model = "hei_prop_hst_laptop",
            bone = 60309,
            pos = {0.0, 0.0, 0.0},
            rot = {0.0, 0.0, 0.0}
        }
    }
})
```

### Using QB-Core Format
```lua
local success = Bridge.ProgressBar.Open({
    name = "vehicle_repair",
    duration = 5000,
    label = "Repairing vehicle...",
    useWhileDead = false,
    canCancel = true,
    controlDisables = {
        disableMovement = true,
        disableCarMovement = true,
        disableCombat = true,
        disableMouse = false
    },
    animation = {
        animDict = "mini@repair",
        anim = "fixing_a_ped",
        flags = 49
    }
}, nil, true)  -- true indicates QB format
```

### With Callback Function
```lua
Bridge.ProgressBar.Open({
    duration = 4000,
    label = "Crafting item...",
    canCancel = true,
    disable = {
        move = true,
        combat = true
    }
}, function(success)
    if success then
        -- Add item to inventory
        print("Item crafted successfully!")
    else
        print("Crafting cancelled!")
    end
end)
```

## GetResourceName (Client)

### Description
Returns the name of the currently active progress bar resource.

### Syntax
```lua
Bridge.ProgressBar.GetResourceName()
```

### Returns
- (string): The name of the active progress bar resource ("ox_lib", "lation_ui", or "progressbar")

### Example
```lua
local resourceName = Bridge.ProgressBar.GetResourceName()
print("Using progress bar system:", resourceName)
```

## Supported Systems

| System | Resource Name |
|--------|---------------|
| Ox Lib | `ox_lib` |
| Lation UI | `lation_ui` |
| QB ProgressBar | `progressbar` |

The system automatically detects which progress bar resource is available and uses the appropriate implementation. Format conversion is handled automatically when using the `isQBFormat` parameter.