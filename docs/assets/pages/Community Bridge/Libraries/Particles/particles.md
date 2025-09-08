# <i class="fas fa-bolt"></i> Particles


<!--META
nav: true
toc: true
description: The Particles library provides comprehensive particle effect management with automatic asset loading, proximity-based spawning, and support for various particle types including looped, non-looped, entity-attached, and bone-attached effects.
-->

The Particles library provides comprehensive particle effect management with automatic asset loading, proximity-based spawning, and support for various particle types including looped, non-looped, entity-attached, and bone-attached effects.

## Overview

The Particles library provides particle effect management for creating visual effects, managing particle systems, and controlling environmental effects in the game world.

## Play (Client)

### Description
Creates a particle effect at the specified position with full control over appearance and behavior. Automatically handles asset loading and cleanup.

### Syntax
```lua
Bridge.Particles.Play(dict, ptfx, pos, rot, scale, color, looped, loopLength)
```

### Parameters
- **dict** (string): Particle effect dictionary name
- **ptfx** (string): Particle effect name within the dictionary
- **pos** (vector3): Position coordinates for the particle effect
- **rot** (vector3): Rotation angles (x, y, z) for the particle effect
- **scale** (number): Scale multiplier for the particle effect size
- **color** (vector3): RGB color values (0-255) for the particle effect
- **looped** (boolean): Whether the particle effect should loop continuously
- **loopLength** (number | nil): Duration in milliseconds for looped effects (nil for infinite)

### Returns
- (number | nil): Particle effect handle or nil if creation failed

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Create explosion effect
local explosionHandle = Bridge.Particles.Play(
    "core",
    "exp_grd_bzgas_smoke",
    vector3(100.0, 200.0, 30.0),
    vector3(0.0, 0.0, 0.0),
    2.0,
    vector3(255, 100, 100),
    false,
    nil
)

-- Create looped fire effect for 10 seconds
local fireHandle = Bridge.Particles.Play(
    "core",
    "fire_wrecked_plane_cockpit",
    GetEntityCoords(PlayerPedId()),
    vector3(0.0, 0.0, 0.0),
    1.5,
    vector3(255, 255, 255),
    true,
    10000
)
```

## Stop (Client)

### Description
Stops and removes a particle effect using its handle.

### Syntax
```lua
Bridge.Particles.Stop(handle)
```

### Parameters
- **handle** (number): Particle effect handle returned from Play function

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Create a particle effect
local smokeHandle = Bridge.Particles.Play(
    "core", "exp_grd_bzgas_smoke",
    GetEntityCoords(PlayerPedId()),
    vector3(0,0,0), 1.0, vector3(255,255,255), true
)

-- Stop it after 5 seconds
SetTimeout(5000, function()
    Bridge.Particles.Stop(smokeHandle)
    print("Smoke effect stopped")
end)
```

## Register (Client)

### Description
Registers a proximity-based particle effect that automatically spawns/despawns based on player distance. Integrates with the Points system for efficient management.

### Syntax
```lua
Bridge.Particles.Register(data)
```

### Parameters
- **data** (table): Configuration table with particle properties

### Returns
- (string): Unique ID for the registered particle effect

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Register a campfire effect that spawns when players get close
local campfireId = Bridge.Particles.Register({
    dict = "core",
    ptfx = "fire_wrecked_plane_cockpit",
    position = vector3(100.0, 200.0, 30.0),
    rotation = vector3(0.0, 0.0, 0.0),
    size = 1.0,
    color = vector3(255, 150, 50),
    looped = true,
    drawDistance = 25.0
})

print("Campfire registered with ID: " .. campfireId)
```

## Remove (Client)

### Description
Removes a registered particle effect and cleans up all associated resources.

### Syntax
```lua
Bridge.Particles.Remove(id)
```

### Parameters
- **id** (string): ID of the registered particle effect to remove

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Remove the campfire effect
Bridge.Particles.Remove(campfireId)
print("Campfire particle effect removed")
```

## CreateOnEntity (Client)

### Description
Creates a particle effect attached to an entity with offset positioning and automatic cleanup.

### Syntax
```lua
Bridge.Particles.CreateOnEntity(dict, ptfx, entity, offset, rot, scale, color, looped, loopLength)
```

### Parameters
- **dict** (string): Particle effect dictionary name
- **ptfx** (string): Particle effect name
- **entity** (number): Entity handle to attach the effect to
- **offset** (vector3): Offset position relative to entity
- **rot** (vector3): Rotation angles for the effect
- **scale** (number): Scale multiplier
- **color** (vector3): RGB color values
- **looped** (boolean): Whether to loop the effect
- **loopLength** (number | nil): Loop duration in milliseconds

### Returns
- (number): Particle effect handle

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Add smoke to player's vehicle exhaust
local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
if vehicle ~= 0 then
    local smokeHandle = Bridge.Particles.CreateOnEntity(
        "core",
        "exp_grd_bzgas_smoke",
        vehicle,
        vector3(0.0, -2.0, 0.0), -- Behind the vehicle
        vector3(0.0, 0.0, 0.0),
        0.5,
        vector3(200, 200, 200),
        true,
        5000
    )
end
```

## CreateOnEntityBone (Client)

### Description
Creates a particle effect attached to a specific bone of an entity for precise positioning.

### Syntax
```lua
Bridge.Particles.CreateOnEntityBone(dict, ptfx, entity, bone, offset, rot, scale, color, looped, loopLength)
```

### Parameters
- **dict** (string): Particle effect dictionary name
- **ptfx** (string): Particle effect name
- **entity** (number): Entity handle
- **bone** (number): Bone index to attach to
- **offset** (vector3): Offset from bone position
- **rot** (vector3): Rotation angles
- **scale** (number): Scale multiplier
- **color** (vector3): RGB color values
- **looped** (boolean): Whether to loop the effect
- **loopLength** (number | nil): Loop duration in milliseconds

### Returns
- (number): Particle effect handle

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Add spark effect to player's hand
local playerPed = PlayerPedId()
local handBone = GetPedBoneIndex(playerPed, 57005) -- Right hand

local sparkHandle = Bridge.Particles.CreateOnEntityBone(
    "core",
    "sp_welding_sparks",
    playerPed,
    handBone,
    vector3(0.1, 0.0, 0.0),
    vector3(0.0, 0.0, 0.0),
    0.3,
    vector3(255, 255, 100),
    true,
    3000
)
```

