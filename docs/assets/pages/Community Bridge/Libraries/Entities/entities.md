# Entities 🎭

<!--META
nav: true
toc: true
description: The Entities library provides a comprehensive system for managing networked entities with automatic client-side spawning/despawning based on proximity. It supports objects, peds, and vehicles with action queuing and synchronized state management.
-->

The Entities library provides a comprehensive system for managing networked entities with automatic client-side spawning/despawning based on proximity. It supports objects, peds, and vehicles with action queuing and synchronized state management.

## Overview

The Entities library provides entity management functions for creating, tracking, and manipulating game entities including peds, vehicles, and objects with lifecycle management.

## Create (Client)

### Description
Registers an entity for proximity-based spawning and management. The entity will automatically spawn when players are within range and despawn when they leave.

### Syntax
```lua
Bridge.Entity.Create(entityData)
```

### Parameters
- **entityData** (table): Entity configuration containing:
  -- **id** (string|nil): Unique identifier for the entity (auto-generated if nil)
  -- **entityType** (string): Type of entity: 'object', 'ped', or 'vehicle'
  -- **model** (string|number): Model name or hash for the entity
  -- **coords** (vector3): Spawn coordinates for the entity
  -- **rotation** (vector3|nil): Rotation vector for objects
  -- **heading** (number|nil): Heading for peds/vehicles (alternative to rotation)
  -- **spawnDistance** (number|nil): Distance at which entity spawns (default: 50.0)
  -- **OnSpawn** (function|nil): Callback function when entity spawns
  -- **OnRemove** (function|nil): Callback function when entity despawns
  -- **OnUpdate** (function|nil): Callback function when entity updates
  -- **OnMove** (function|nil): Callback function when entity moves
  -- Additional properties for behaviors and metadata

### Returns
- (table): Point system data for the registered entity

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Register a static NPC
local npcData = {
    id = "shop_clerk",
    entityType = "ped",
    model = "a_m_m_business_01",
    coords = vector3(25.7, -1347.3, 29.5),
    heading = 180.0,
    spawnDistance = 25.0,
    OnSpawn = function(data)
        print("Shop clerk spawned: ", data.id)
        -- Make the ped invincible
        SetEntityInvincible(data.spawned, true)
        SetBlockingOfNonTemporaryEvents(data.spawned, true)
    end,
    OnRemove = function(data)
        print("Shop clerk despawned: ", data.id)
    end
}

local pointData = Bridge.Entity.Create(npcData)
print("Created entity with point ID: ", pointData.id)
```

## Destroy (Client)

### Description
Destroys an entity and removes it from the world if currently spawned. Cleans up all associated resources. Also available as `Unregister` (deprecated).

### Syntax
```lua
Bridge.Entity.Destroy(id)
```

### Parameters
- **id** (string|number): The ID of the entity to destroy

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Destroy the shop clerk
Bridge.Entity.Destroy("shop_clerk")
print("Shop clerk entity destroyed")

-- Clean up all entities when leaving an area
local entityIds = {"npc1", "npc2", "vehicle1"}
for _, entityId in ipairs(entityIds) do
    Bridge.Entity.Destroy(entityId)
end
```

## Create (Server)

### Description
Creates a server-side entity representation that will be synchronized to all clients with proximity-based spawning.

### Syntax
```lua
Bridge.Entity.Create(data)
```

### Parameters
- **data** (table): Entity configuration containing:
  -- **id** (string|nil): Unique identifier for the entity (auto-generated if nil)
  -- **entityType** (string): Type of entity: 'object', 'ped', or 'vehicle'
  -- **model** (string|number): Model name or hash for the entity
  -- **coords** (vector3): Spawn coordinates for the entity
  -- **rotation** (vector3|nil): Rotation vector for objects
  -- **heading** (number|nil): Heading for peds/vehicles (alternative to rotation)
  -- Additional properties for behaviors and metadata

### Returns
- (table): The created entity data structure

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Create a security guard NPC
local guard = Bridge.Entity.Create({
    id = "security_guard_01",
    entityType = "ped",
    model = "s_m_m_security_01",
    coords = vector3(100.0, 200.0, 30.0),
    heading = 180.0,
    spawnDistance = 50.0,
    weapon = {
        name = "WEAPON_PISTOL",
        ammo = 100
    },
    clothing = {
        components = {
            { drawable = 0, texture = 0, component_id = 0 }
        }
    }
})

-- Create a police vehicle
local policeVehicle = Bridge.Entity.Create({
    entityType = "vehicle",
    model = "police",
    coords = vector3(150.0, 250.0, 30.0),
    heading = 90.0,
    spawnDistance = 75.0
})

print("Created entities: " .. guard.id .. " and " .. policeVehicle.id)
```

## Destroy (Server)

### Description
Destroys a server-side entity and notifies all clients to remove it from their world. Also available as `Delete` (deprecated).

### Syntax
```lua
Bridge.Entity.Destroy(id)
```

### Parameters
- **id** (string|number): The ID of the entity to destroy

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Destroy the security guard
Bridge.Entity.Destroy("security_guard_01")
print("Security guard destroyed")

-- Clean up all event entities
local eventEntities = {"event_npc_1", "event_vehicle_1", "event_prop_1"}
for _, entityId in ipairs(eventEntities) do
    Bridge.Entity.Destroy(entityId)
end
print("Event cleanup completed")
```

## Set (Server)

### Description
Updates specific data fields for a server-side entity and synchronizes the changes to all clients.

### Syntax
```lua
Bridge.Entity.Set(id, data)
```

### Parameters
- **id** (string|number): The ID of the entity to update
- **data** (table): Table containing the fields to update

### Returns
- (boolean): True if entity was found and updated, false otherwise

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Update guard's position and weapon
local success = Bridge.Entity.Set("security_guard_01", {
    coords = vector3(105.0, 205.0, 30.0),
    weapon = {
        name = "WEAPON_CARBINERIFLE",
        ammo = 200
    }
})

if success then
    print("Guard updated successfully")
else
    print("Failed to update guard - entity not found")
end

-- Update vehicle with stash behavior
Bridge.Entity.Set("police_vehicle_01", {
    stash = {
        label = "Police Storage",
        slots = 30,
        maxWeight = 50000
    }
})
```

## Get (Server)

### Description
Retrieves a server-side entity by its ID.

### Syntax
```lua
Bridge.Entity.Get(id)
```

### Parameters
- **id** (string|number): The ID of the entity to retrieve

### Returns
- (table|nil): The entity data if found, nil if not found

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Get entity data
local guard = Bridge.Entity.Get("security_guard_01")
if guard then
    print("Found guard at coords:", guard.coords)
    print("Guard model:", guard.model)
    print("Guard entity type:", guard.entityType)
else
    print("Guard not found")
end

-- Check if entity exists before updating
if Bridge.Entity.Get("some_entity_id") then
    Bridge.Entity.Set("some_entity_id", { 
        weapon = { name = "WEAPON_PISTOL", ammo = 50 }
    })
end
```

## Get (Client)

### Description
Retrieves a client-side entity by its ID.

### Syntax
```lua
Bridge.Entity.Get(id)
```

### Parameters
- **id** (string|number): The ID of the entity to retrieve

### Returns
- (table|nil): The entity point data if found, nil if not found

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Get entity data
local clerk = Bridge.Entity.Get("shop_clerk")
if clerk then
    print("Found clerk at coords:", clerk.coords)
    print("Is spawned:", clerk.spawned ~= nil)
    if clerk.spawned then
        print("Entity handle:", clerk.spawned)
    end
else
    print("Clerk not found")
end

-- Check if entity exists and is spawned
local entity = Bridge.Entity.Get("some_entity_id")
if entity and entity.spawned then
    print("Entity is currently spawned in world")
end
```

## Set (Client)

### Description
Sets a property value for a client-side entity.

### Syntax
```lua
Bridge.Entity.Set(id, key, value)
```

### Parameters
- **id** (string|number): The ID of the entity to update
- **key** (string): The property name to set
- **value** (any): The value to set

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Update entity behaviors
Bridge.Entity.Set("shop_clerk", "weapon", {
    name = "WEAPON_PISTOL",
    ammo = 100
})

Bridge.Entity.Set("shop_clerk", "clothing", {
    components = {
        { drawable = 4, texture = 1, component_id = 11 }
    }
})

-- Update callback functions
Bridge.Entity.Set("shop_clerk", "OnSpawn", function(data)
    print("Updated spawn callback for:", data.id)
    -- Apply any custom logic here
end)

-- Update coordinates (will trigger respawn if spawned)
Bridge.Entity.Set("shop_clerk", "coords", vector3(30.0, -1350.0, 29.5))
```

