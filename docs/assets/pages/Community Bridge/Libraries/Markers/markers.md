# <i class="fas fa-map-pin"></i> Markers

<!--META
nav: true
toc: true
description: The Markers library provides efficient 3D marker management with proximity-based rendering. It integrates with the Points system to automatically show/hide markers based on player distance, supporting various marker types, colors, animations, and custom textures.
-->

The Markers library provides efficient 3D marker management with proximity-based rendering. It integrates with the Points system to automatically show/hide markers based on player distance, supporting various marker types, colors, animations, and custom textures.

## Overview

The Markers library provides world marker management for creating visual indicators, waypoints, and interactive zones with customizable appearance and functionality.

## Create (Client)

### Description
Creates a 3D marker with comprehensive customization options. The marker automatically renders when players are within draw distance and supports various visual effects.

### Syntax
```lua
Bridge.Markers.Create(data)
```

### Parameters
- **data** (table): Configuration table with marker properties

### Returns
- (string | nil): Unique marker ID or nil if creation failed

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Create a basic green cylinder marker
local shopMarkerId = Bridge.Markers.Create({
    position = vector3(25.7, -1347.3, 29.5),
    marker = 1, -- Cylinder marker
    size = vector3(2.0, 2.0, 1.0),
    color = vector3(0, 255, 0), -- Green
    alpha = 150,
    bobUpAndDown = true,
    drawDistance = 50.0
})

-- Create a custom textured marker
local customMarkerId = Bridge.Markers.Create({
    position = vector3(100.0, 200.0, 30.0),
    offset = vector3(0.0, 0.0, 1.0),
    rotation = vector3(0.0, 0.0, 45.0),
    marker = 9, -- Cone marker
    size = vector3(1.5, 1.5, 2.0),
    color = vector3(255, 100, 100), -- Red
    alpha = 200,
    rotate = true,
    textureDict = "custom_markers",
    textureName = "warning_cone"
})
```

## Remove (Client)

### Description
Removes a specific marker by its ID and cleans up all associated resources.

### Syntax
```lua
Bridge.Markers.Remove(id)
```

### Parameters
- **id** (string): ID of the marker to remove

### Returns
- (boolean): True if marker was successfully removed, false if not found

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Remove the shop marker
local success = Bridge.Markers.Remove(shopMarkerId)
if success then
    print("Shop marker removed successfully")
else
    print("Failed to remove shop marker - not found")
end
```

## RemoveAll (Client)

### Description
Removes all active markers and cleans up all associated resources. Useful for cleanup operations or scene resets.

### Syntax
```lua
Bridge.Markers.RemoveAll()
```

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Clean up all markers when leaving an area
Bridge.Markers.RemoveAll()
print("All markers have been removed")

-- Commonly used in resource cleanup
AddEventHandler('onResourceStop', function(resource)
    if resource == GetCurrentResourceName() then
        Bridge.Markers.RemoveAll()
    end
end)
```

