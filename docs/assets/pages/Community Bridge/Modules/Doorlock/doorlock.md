# <i class="fas fa-door-closed"></i> Doorlock

<!--META
nav: true
toc: true
description: The Doorlock module provides functions for managing door locking states across different doorlock systems. It handles locking and unlocking doors with various access controls.
-->

The Doorlock module provides functions for managing door locking states across different doorlock systems. It handles locking and unlocking doors with various access controls.

## Overview

The Doorlock module provides secure door and property locking mechanisms with access control and persistence.

## GetClosestDoor (Client)

### Description
This will get the closest door to the ped

### Syntax
```lua
Bridge.Doorlock.GetClosestDoor()
```

### Returns
- (string): | nil

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()\n\nBridge.Doorlock.GetClosestDoor()
```

## ToggleDoorLock (Server)

### Description
Toggles the lock state of a specific door by its ID.

### Syntax
```lua
Bridge.Doorlock.ToggleDoorLock(doorID, toggle)
```

### Parameters
- **doorID** (string): Unique identifier of the door to toggle
- **toggle** (boolean): True to lock the door, false to unlock

### Returns
- (boolean): True if the door state was changed successfully

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Lock a door
local success = Bridge.Doorlock.ToggleDoorLock("police_station_main", true)
if success then
    print("Police station main door locked")
end

-- Unlock a door
Bridge.Doorlock.ToggleDoorLock("hospital_entrance", false)
print("Hospital entrance unlocked")
```

## Supported Systems

| System | Resource Name |
|--------|---------------|
| Doors Creator | `doors_creator` |
| Ox Doorlock | `ox_doorlock` |
| QB Doorlock | `qb-doorlock` |
| RCore Doorlock | `rcore_doorlock` |

The system automatically detects which doorlock resource is available and uses the appropriate implementation. If no supported doorlock system is found, it falls back to the default system with basic functionality. Door locking functions are standardized across different systems.