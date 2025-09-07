# Math 🔢

<!--META
nav: true
toc: true
description: The Math utility library provides advanced mathematical functions for game development including clamping, remapping, normalization, vector operations, and coordinate transformations. Essential for positioning, movement, and physics calculations.
-->

The Math utility library provides advanced mathematical functions for game development including clamping, remapping, normalization, vector operations, and coordinate transformations. Essential for positioning, movement, and physics calculations.

## Overview

The Math module provides advanced mathematical calculations and utility functions for gameplay mechanics.

## Clamp (Shared)

### Description
Constrains a value between a minimum and maximum range.

### Syntax
```lua
Bridge.Math.Clamp(value, min, max)
```

### Parameters
- **value** (number): Value to clamp
- **min** (number): Minimum allowed value
- **max** (number): Maximum allowed value

### Returns
- (number): Clamped value within min-max range

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local health = Bridge.Math.Clamp(150, 0, 100) -- 100
local damage = Bridge.Math.Clamp(-10, 0, 100) -- 0
local normal = Bridge.Math.Clamp(50, 0, 100) -- 50
```

## Remap (Shared)

### Description
Remaps a value from one range to another range proportionally.

### Syntax
```lua
Bridge.Math.Remap(value, min, max, newMin, newMax)
```

### Parameters
- **value** (number): Value to remap
- **min** (number): Original range minimum
- **max** (number): Original range maximum
- **newMin** (number): Target range minimum
- **newMax** (number): Target range maximum

### Returns
- (number): Remapped value in new range

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Convert health (0-100) to progress bar width (0-200)
local health = 75
local barWidth = Bridge.Math.Remap(health, 0, 100, 0, 200) -- 150

-- Convert temperature (-40 to 40) to color (0-255)
local temp = 20
local colorValue = Bridge.Math.Remap(temp, -40, 40, 0, 255) -- ~191
```

## PointInRadius (Shared)

### Description
Generates a random point within a circular radius.

### Syntax
```lua
Bridge.Math.PointInRadius(radius)
```

### Parameters
- **radius** (number): Radius of the circle

### Returns
- (vector2): Random point within the radius

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Generate random spawn point within 50 units
local randomOffset = Bridge.Math.PointInRadius(50.0)
local playerCoords = GetEntityCoords(PlayerPedId())
local spawnCoords = vector3(
    playerCoords.x + randomOffset.x,
    playerCoords.y + randomOffset.y,
    playerCoords.z
)
```

## Normalize (Shared)

### Description
Normalizes a value to a 0-1 range based on min and max values.

### Syntax
```lua
Bridge.Math.Normalize(value, min, max)
```

### Parameters
- **value** (number): Value to normalize
- **min** (number): Minimum value of the range
- **max** (number): Maximum value of the range

### Returns
- (number): Normalized value between 0 and 1

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Normalize health for progress bar
local health = 75
local healthPercent = Bridge.Math.Normalize(health, 0, 100) -- 0.75

-- Normalize speed for effects
local speed = 50
local speedPercent = Bridge.Math.Normalize(speed, 0, 200) -- 0.25
```

## Normalize2D (Shared)

### Description
Normalizes a 2D vector to unit length, handling both vector2 and separate x,y parameters.

### Syntax
```lua
Bridge.Math.Normalize2D(x, y)
```

### Parameters
- **x** (number | vector2): X component or vector2 object
- **y** (number | nil): Y component (if x is not vector2)

### Returns
- (vector2): Normalized vector2 with unit length

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Normalize direction vector
local direction = vector2(3, 4)
local normalized = Bridge.Math.Normalize2D(direction)
-- Result: vector2(0.6, 0.8) - unit vector in same direction

-- Normalize separate components
local normalizedXY = Bridge.Math.Normalize2D(10, 0)
-- Result: vector2(1, 0) - pointing right
```

## Normalize3D (Shared)

### Description
Normalizes a 3D vector to unit length, handling both vector3 and separate x,y,z parameters.

### Syntax
```lua
Bridge.Math.Normalize3D(x, y, z)
```

### Parameters
- **x** (number | vector3): X component or vector3 object
- **y** (number | nil): Y component (if x is not vector3)
- **z** (number | nil): Z component (if x is not vector3)

### Returns
- (vector3): Normalized vector3 with unit length

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Normalize entity direction
local playerCoords = GetEntityCoords(PlayerPedId())
local targetCoords = vector3(100, 100, 20)
local direction = targetCoords - playerCoords
local normalized = Bridge.Math.Normalize3D(direction)
-- Use normalized for consistent movement speed
```

## Normalize4D (Shared)

### Description
Normalizes a 4D vector to unit length, handling both vector4 and separate x,y,z,w parameters.

### Syntax
```lua
Bridge.Math.Normalize4D(x, y, z, w)
```

### Parameters
- **x** (number | vector4): X component or vector4 object
- **y** (number | nil): Y component (if x is not vector4)
- **z** (number | nil): Z component (if x is not vector4)
- **w** (number | nil): W component (if x is not vector4)

### Returns
- (vector4): Normalized vector4 with unit length

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Normalize quaternion or 4D data
local data = vector4(1, 2, 3, 4)
local normalized = Bridge.Math.Normalize4D(data)
-- Result: Unit vector in 4D space
```

## DirectionToTarget (Shared)

### Description
Calculates the normalized direction vector from one point to another.

### Syntax
```lua
Bridge.Math.DirectionToTarget(fromV3, toV3)
```

### Parameters
- **fromV3** (vector3): Starting position
- **toV3** (vector3): Target position

### Returns
- (vector3): Normalized direction vector pointing from source to target

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local playerPos = GetEntityCoords(PlayerPedId())
local targetPos = vector3(100, 200, 20)

local direction = Bridge.Math.DirectionToTarget(playerPos, targetPos)
-- Use direction to move entity toward target
local moveSpeed = 5.0
local newPos = playerPos + (direction * moveSpeed)
```

## GetOffsetFromMatrix (Shared)

### Description
Calculates world coordinates by applying rotation and offset to a base position using matrix transformation.

### Syntax
```lua
Bridge.Math.GetOffsetFromMatrix(position, rotation, offset)
```

### Parameters
- **position** (vector3): Base world position
- **rotation** (vector3): Rotation in degrees (pitch, roll, yaw)
- **offset** (vector3): Local offset to apply

### Returns
- (vector3): World coordinates after transformation

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Calculate position 5 units in front of rotated entity
local entityPos = GetEntityCoords(someEntity)
local entityRot = GetEntityRotation(someEntity)
local forwardOffset = vector3(0, 5, 0) -- 5 units forward in local space

local worldPos = Bridge.Math.GetOffsetFromMatrix(entityPos, entityRot, forwardOffset)
-- worldPos is now 5 units in front of the entity, accounting for its rotation
```

