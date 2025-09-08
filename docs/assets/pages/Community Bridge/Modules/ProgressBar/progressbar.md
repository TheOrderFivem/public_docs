# <i class="fas fa-hourglass-half"></i> ProgressBar

<!--META
nav: true
toc: true
description: The ProgressBar module provides a unified interface for displaying progress bars during various actions. It supports different progress bar systems and styles.
-->

The ProgressBar module provides a unified interface for displaying progress bars during various actions. It supports different progress bar systems and styles.

## Overview

The ProgressBar module provides visual progress indicators and timed action feedback for player activities.

## Open (Client)

### Description
Opens a progress bar with specified options. Supports both bar and circle styles.

### Syntax
```lua
Bridge.ProgressBar.Open(options, callback, isQBFormat)
```

### Parameters
- **options** (table): Progress bar configuration options
- **callback** (function): Function to call when progress bar completes or is cancelled (optional)
- **isQBFormat** (boolean): Whether the options are in QB-Core format (will be auto-converted) (optional)

### Returns
- (boolean): Returns true if progress bar completed successfully, false if cancelled

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Basic progress bar
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
        clip = "fixing_a_ped"
    }
})

if success then
    print("Repair completed!")
else
    print("Repair cancelled!")
end
```

