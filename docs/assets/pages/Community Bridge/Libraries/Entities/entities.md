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
- **entityData** (table): Entity configuration with id, entityType, model, coords, rotation, and optional callbacks

### Returns
- (table): Point system data.

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Register a static NPC
local npcData = {
    id = "shop_clerk",
    entityType = "ped",
    model = "a_m_m_business_01",
    coords = vector3(25.7, -1347.3, 29.5),
    rotation = 180.0,
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
print("Created entity with point ID: ", pointData.id))
```

## Unregister (Client)

### Description
Unregisters an entity and removes it from the world if currently spawned. Cleans up all associated resources.

### Syntax
```lua
Bridge.Entity.Unregister(id)
```

### Parameters
- **id** (string | number): The ID of the entity to unregister

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Unregister the shop clerk
Bridge.Entity.Unregister("shop_clerk")
print("Shop clerk entity unregistered")

-- Clean up all entities when leaving an area
local entityIds = {"npc1", "npc2", "vehicle1"}
for _, entityId in ipairs(entityIds) do
    Bridge.Entity.Unregister(entityId)
end
```

## Create (Server)

### Description
Creates a server-side entity representation that will be synchronized to all clients with proximity-based spawning.

### Syntax
```lua
Bridge.ServerEntity.Create(id, entityType, model, coords, rotation, meta)
```

### Parameters
- **id** (string | nil): Unique identifier for the entity (auto-generated if nil)
- **entityType** (string): Type of entity: 'object', 'ped', or 'vehicle'
- **model** (string | number): Model name or hash for the entity
- **coords** (vector3): Spawn coordinates for the entity
- **rotation** (vector3 | number | nil): Rotation vector for objects or heading for peds/vehicles
- **meta** (table | nil): Additional metadata and configuration options

### Returns
- (table): The created entity data structure

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Create a security guard NPC
local guard = Bridge.ServerEntity.Create(
    "security_guard_01",
    "ped",
    "s_m_m_security_01",
    vector3(100.0, 200.0, 30.0),
    180.0,
    {
        spawnDistance = 50.0,
        health = 200,
        armor = 100,
        weapon = "WEAPON_PISTOL"
    }
)

-- Create a police vehicle
local policeVehicle = Bridge.ServerEntity.Create(
    nil, -- Auto-generate ID
    "vehicle",
    "police",
    vector3(150.0, 250.0, 30.0),
    90.0,
    {
        spawnDistance = 75.0,
        primaryColor = 0,
        secondaryColor = 0,
        plate = "POLICE01"
    }
)

print("Created entities: " .. guard.id .. " and " .. policeVehicle.id)
```

## Delete (Server)

### Description
Deletes a server-side entity and notifies all clients to remove it from their world.

### Syntax
```lua
Bridge.ServerEntity.Delete(id)
```

### Parameters
- **id** (string | number): The ID of the entity to delete

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Delete the security guard
Bridge.ServerEntity.Delete("security_guard_01")
print("Security guard deleted")

-- Clean up all event entities
local eventEntities = {"event_npc_1", "event_vehicle_1", "event_prop_1"}
for _, entityId in ipairs(eventEntities) do
    Bridge.ServerEntity.Delete(entityId)
end
print("Event cleanup completed")
```

## Update (Server)

### Description
Updates specific data fields for a server-side entity and synchronizes the changes to all clients.

### Syntax
```lua
Bridge.ServerEntity.Update(id, data)
```

### Parameters
- **id** (string | number): The ID of the entity to update
- **data** (table): Table containing the fields to update

### Returns
- (boolean): True if entity was found and updated, false otherwise

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Update guard's position and health
local success = Bridge.ServerEntity.Update("security_guard_01", {
    coords = vector3(105.0, 205.0, 30.0),
    health = 150,
    weapon = "WEAPON_CARBINERIFLE"
})

if success then
    print("Guard updated successfully")
else
    print("Failed to update guard - entity not found")
end

-- Update vehicle colors
Bridge.ServerEntity.Update("police_vehicle_01", {
    primaryColor = 12, -- Red
    secondaryColor = 0,  -- Black
    plate = "EMERGENCY"
})
```

## TriggerAction (Server)

### Description
Triggers a specific action on the client-side entity. Actions are only executed if the entity is currently spawned for the client.

### Syntax
```lua
Bridge.ServerEntity.TriggerAction(entityId, actionName, endPosition, ...)
```

### Parameters
- **entityId** (string | number): The ID of the entity to trigger action on
- **actionName** (string): Name of the action function to execute
- **endPosition** (vector3 | nil): Optional end position for movement actions
- **...** (any): Additional arguments for the action function

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Make guard walk to a position
Bridge.ServerEntity.TriggerAction(
    "security_guard_01",
    "WalkTo",
    vector3(110.0, 210.0, 30.0),
    1.0 -- Speed
)

-- Make guard play an animation
Bridge.ServerEntity.TriggerAction(
    "security_guard_01",
    "PlayAnimation",
    nil,
    "amb@world_human_guard_stand@male@base",
    "base",
    -1 -- Loop indefinitely
)

-- Make vehicle flash lights
Bridge.ServerEntity.TriggerAction(
    "police_vehicle_01",
    "FlashLights",
    nil,
    5000 -- Duration in ms
)
```

## TriggerActions (Server)

### Description
Triggers multiple actions in sequence on the client-side entity. Actions are queued and executed in order.

### Syntax
```lua
Bridge.ServerEntity.TriggerActions(entityId, actions, endPosition)
```

### Parameters
- **entityId** (string | number): The ID of the entity to trigger actions on
- **actions** (table): Array of action objects with name and params properties
- **endPosition** (vector3 | nil): Optional final position for movement sequences

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Create a complex guard patrol sequence
local patrolActions = {
    { name = "WalkTo", params = {vector3(115.0, 200.0, 30.0), 1.0} },
    { name = "Wait", params = {3000} },
    { name = "PlayAnimation", params = {"amb@world_human_cop_idles@male@idle_b", "idle_e", 5000} },
    { name = "WalkTo", params = {vector3(105.0, 220.0, 30.0), 1.0} },
    { name = "Wait", params = {2000} },
    { name = "WalkTo", params = {vector3(100.0, 200.0, 30.0), 1.0} }
}

Bridge.Entities.TriggerActions(
    "security_guard_01",
    patrolActions,
    vector3(100.0, 200.0, 30.0) -- End at starting position
)

print("Guard patrol sequence started")
```

