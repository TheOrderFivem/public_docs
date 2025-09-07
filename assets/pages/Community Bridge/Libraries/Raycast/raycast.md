# Raycast 🎯

<!--META
nav: true
toc: true
description: The Raycast library provides advanced ray casting functionality for collision detection and world interaction. It includes camera-based raycasting, forward vector calculations, and comprehensive collision detection with material and normal information.
-->

The Raycast library provides advanced ray casting functionality for collision detection and world interaction. It includes camera-based raycasting, forward vector calculations, and comprehensive collision detection with material and normal information.

## Overview

The Raycast library provides raycasting utilities for line-of-sight calculations, hit detection, and world interaction using ray tracing for precise targeting and collision detection.

## GetForwardVector (Client)

### Description
Calculates the forward vector from a given rotation or camera rotation, useful for determining direction-based calculations.

### Syntax
```lua
Bridge.Raycast.GetForwardVector(rotation)
```

### Parameters
- **rotation** (vector3 | nil): Rotation vector to calculate forward direction from (uses camera rotation if nil)

### Returns
- (vector3): Normalized forward vector

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Get camera forward vector
local cameraForward = Bridge.Raycast.GetForwardVector()
print("Camera forward: " .. tostring(cameraForward))

-- Get forward vector from custom rotation
local customRotation = vector3(0.0, 0.0, 45.0)
local customForward = Bridge.Raycast.GetForwardVector(customRotation)
print("Custom forward: " .. tostring(customForward))
```

## ToCoords (Client)

### Description
Performs a raycast between two coordinate points with comprehensive collision detection, returning detailed hit information including entity, material, and surface normals.

### Syntax
```lua
Bridge.Raycast.ToCoords(startCoords, endCoords, flag, ignore)
```

### Parameters
- **startCoords** (vector3): Starting coordinates for the raycast
- **endCoords** (vector3): Ending coordinates for the raycast
- **flag** (number | nil): Collision flags to determine what to hit (default: 511 for all)
- **ignore** (number | nil): Entity handle to ignore during raycast (default: 4)

### Returns
- (number): Result code (2 = hit, 1 = miss)
- (number): Entity handle that was hit
- (vector3): Final coordinates where ray hit
- (vector3): Surface normal vector at hit point
- (number): Material hash of the surface hit

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local playerCoords = GetEntityCoords(PlayerPedId())
local targetCoords = playerCoords + vector3(0.0, 5.0, 0.0)

local retval, entity, hitCoords, normals, material = Bridge.Raycast.ToCoords(
    playerCoords,
    targetCoords,
    511, -- Hit everything
    PlayerPedId() -- Ignore player
)

if retval == 2 then
    print("Hit detected!")
    print("Hit coordinates: " .. tostring(hitCoords))
    print("Hit entity: " .. tostring(entity))
    print("Surface normal: " .. tostring(normals))
    print("Material hash: " .. tostring(material))
else
    print("No collision detected")
end
```

## FromCamera (Client)

### Description
Performs a raycast from the camera position in the direction the camera is facing, with automatic fallback for missed hits. Perfect for player interaction systems.

### Syntax
```lua
Bridge.Raycast.FromCamera(flags, ignore, distance)
```

### Parameters
- **flags** (number | nil): Collision flags to determine what to hit
- **ignore** (number | nil): Entity handle to ignore during raycast
- **distance** (number | nil): Maximum raycast distance (default: 10)

### Returns
- (number): Result code (2 = hit, 1 = miss)
- (number): Entity handle that was hit
- (vector3): Final coordinates where ray hit
- (vector3): Surface normal vector at hit point
- (number): Material hash of the surface hit

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Raycast from camera with 25 unit range
local retval, entity, hitCoords, normals, material = Bridge.Raycast.FromCamera(
    511, -- Hit everything
    PlayerPedId(), -- Ignore player
    25.0 -- 25 unit distance
)

if retval == 2 then
    if entity and entity ~= 0 then
        local entityType = GetEntityType(entity)
        if entityType == 1 then -- Ped
            print("Looking at a ped")
        elseif entityType == 2 then -- Vehicle
            print("Looking at a vehicle")
        elseif entityType == 3 then -- Object
            print("Looking at an object")
        end
    else
        print("Looking at terrain/building")
    end

    -- Place a marker at the hit location
    local markerId = Bridge.Markers.Create({
        position = hitCoords,
        marker = 1,
        size = vector3(0.5, 0.5, 0.5),
        color = vector3(255, 0, 0)
    })
else
    print("No hit detected from camera")
end
```

