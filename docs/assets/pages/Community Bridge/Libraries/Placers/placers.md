# <i class="fas fa-cube"></i> Placers

<!--META
nav: true
toc: true
description: The Placers library provides interactive object placement systems with real-time preview, material validation, boundary checking, and advanced placement controls. Supports both simple and complex placement modes with collision detection and snap-to-ground functionality.
-->

The Placers library provides interactive object placement systems with real-time preview, material validation, boundary checking, and advanced placement controls. Supports both simple and complex placement modes with collision detection and snap-to-ground functionality.

## Overview

The Placers library provides object placement and positioning utilities for spawning, positioning, and managing entities and props in the game world with precise control.

## Placeable.PlaceObject (Client)

### Description
Simple object placement system with raycast-based positioning and basic controls for rotation and distance.

### Syntax
```lua
Bridge.Placeable.PlaceObject(object, distance, snapToGround, allowedMats, offset)
```

### Parameters
- **object** (string | number): Object model name or hash to place
- **distance** (number | nil): Maximum placement distance from player (default: 10.0)
- **snapToGround** (boolean | nil): Whether to snap placed object to ground surface
- **allowedMats** (table | nil): Table of allowed material hashes for placement validation
- **offset** (vector3 | nil): Additional offset to apply to placement coordinates

### Returns
- (vector3 | nil): Final placement coordinates or nil if cancelled
- (number | nil): Final heading/rotation or nil if cancelled

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Simple object placement
local coords, heading = Bridge.Placeable.PlaceObject('prop_cs_cardbox_01', 15.0, true)
if coords then
    print('Object placed at: ' .. tostring(coords))
    print('Object heading: ' .. heading)

    -- Spawn the actual object
    local finalObject = Bridge.Utility.CreateProp('prop_cs_cardbox_01', coords, heading, true)
else
    print('Placement cancelled')
end

-- Advanced placement with material restrictions
local allowedSurfaces = {
    [1109728704] = true, -- concrete
    [1333033863] = true, -- pavement
    [951832588] = true   -- rock
}

local coords, heading = Bridge.Placeable.PlaceObject(
    'prop_barrier_work05',
    20.0,
    true,
    allowedSurfaces,
    vector3(0, 0, 0.1) -- Slight height offset
)

if coords then
    Bridge.Framework.Notify('Barrier placed!', 'success')
else
    Bridge.Framework.Notify('Placement cancelled', 'info')
end
```

## Placeable.StopPlacing (Client)

### Description
Cancels the current object placement operation and cleans up the preview object.

### Syntax
```lua
Bridge.Placeable.StopPlacing()
```

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Cancel placement (e.g., on player disconnect)
Bridge.Placeable.StopPlacing()
print('Object placement cancelled')
```

## PlaceableObject.PlaceObject (Client)

### Description
Advanced object placement system with movement modes, boundary checking, material validation, and comprehensive controls.

### Syntax
```lua
Bridge.PlaceableObject.PlaceObject(entity, settings)
```

### Parameters
- **entity** (number): Entity handle of the object to place
- **settings** (table): Comprehensive placement configuration including boundaries, materials, controls, and callbacks

### Returns
- (promise): Promise that resolves with placement result or rejects if cancelled

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Create object for advanced placement
local entity = Bridge.Utility.CreateProp('prop_barrier_work05', playerCoords, 0.0, false)

-- Advanced placement with full configuration
local settings = {
    allowedMats = {
        [1109728704] = true, -- concrete
        [1333033863] = true  -- pavement
    },
    boundary = {
        min = vector3(-100, -100, -10),
        max = vector3(100, 100, 50)
    },
    allowMovement = true,
    allowVertical = true,
    snapToGround = true,
    maxDepth = 20.0,
    config = {
        place_object = {name = 'Place Barrier', key = {38}},
        cancel_placement = {name = 'Cancel', key = {73}},
        movement = {name = 'Movement Mode', key = {19}}
    },
    onPlace = function(coords, heading)
        print('Barrier placed at: ' .. tostring(coords))
        return true -- Allow placement
    end,
    onCancel = function()
        print('Barrier placement cancelled')
        DeleteEntity(entity)
    end
}

-- Start advanced placement
Bridge.PlaceableObject.PlaceObject(entity, settings):next(function(result)
    if result.placed then
        print('Successfully placed at: ' .. tostring(result.coords))
        print('Final heading: ' .. result.heading)
        -- Object is now placed and ready
    end
end, function(error)
    print('Placement error: ' .. error)
end)
```

## PlaceableObject.StopPlacing (Client)

### Description
Stops the current advanced placement operation and triggers cleanup callbacks.

### Syntax
```lua
Bridge.PlaceableObject.StopPlacing()
```

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Stop advanced placement
Bridge.PlaceableObject.StopPlacing()
print('Advanced placement stopped')
```

