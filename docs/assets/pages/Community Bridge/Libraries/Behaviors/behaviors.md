# <i class="fas fa-cogs"></i> Entity Behaviors

<!--META
nav: true
toc: true
description: The Entity Behaviors system provides a comprehensive framework for creating reusable entity functionality like animations, particles, clothing, weapons, and more. Behaviors automatically handle lifecycle events and can be mixed and matched on entities.
-->

The Entity Behaviors system provides a comprehensive framework for creating reusable entity functionality like animations, particles, clothing, weapons, and more. Behaviors automatically handle lifecycle events and can be mixed and matched on entities.

## Overview

Entity Behaviors are modular components that can be applied to entities to provide specific functionality. Each behavior handles its own lifecycle events (OnSpawn, OnRemove, OnUpdate) and can be combined with other behaviors on the same entity.


## Create (Shared)

### Description
Creates a custom behavior that can be applied to entities. Behaviors define how entities should respond to lifecycle events.

### Syntax
```lua
Bridge.Entity.Behaviors.Create(behaviorId, behavior)
```

### Parameters
- **behaviorId** (string): Unique identifier for the behavior
- **behavior** (table): Behavior definition with lifecycle callbacks

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Create a custom plate behavior
Bridge.Entity.Behaviors.Create("license_plate", {
    OnCreate = function(entityData)
        -- Called when behavior is first applied
        print("License plate behavior created for:", entityData.id)
    end,
    OnSpawn = function(entityData)
        -- Called when entity spawns in world
        if entityData.license_plate and entityData.license_plate.text then
            SetVehicleNumberPlateText(entityData.spawned, entityData.license_plate.text)
        end
    end,
    OnUpdate = function(entityData)
        -- Called during entity updates
        -- Update logic here
    end,
    OnRemove = function(entityData)
        -- Called when entity is removed
        print("License plate behavior removed for:", entityData.id)
    end,
    OnDestroy = function(entityData)
        -- Called when behavior is completely destroyed
        print("License plate behavior destroyed for:", entityData.id)
    end
})
```

## Get (Shared)

### Description
Retrieves a registered behavior by its ID.

### Syntax
```lua
Bridge.Entity.Behaviors.Get(behaviorId)
```

### Parameters
- **behaviorId** (string): The ID of the behavior to retrieve

### Returns
- (table): The behavior definition, or nil if not found

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local plateBehavior = Bridge.Entity.Behaviors.Get("license_plate")
if plateBehavior then
    print("Found license plate behavior")
else
    print("Behavior not found")
end
```

## Remove (Shared)

### Description
Removes a registered behavior. Entities using this behavior will no longer have access to it.

### Syntax
```lua
Bridge.Entity.Behaviors.Remove(behaviorId)
```

### Parameters
- **behaviorId** (string): The ID of the behavior to remove

### Returns
- (boolean): True if behavior was removed, false if not found

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local removed = Bridge.Entity.Behaviors.Remove("license_plate")
if removed then
    print("License plate behavior removed")
else
    print("Behavior not found")
end
```

## Animation Behavior (Client)

### Description
Handles entity animations with automatic playback, looping, and chaining support. Only works with ped entities.

### Syntax
```lua
Bridge.Entity.Create({
    anim = {
        dict = "animation_dict",
        name = "animation_name",
        flags = 49,
        duration = -1,
        onComplete = function(entityData) end
    }
})
```

### Parameters
- **anim** (table): Animation configuration containing:
  -- **dict** (string): Animation dictionary name
  -- **name** (string): Animation name within the dictionary
  -- **flags** (number): Animation flags (default: 49)
  -- **duration** (number): Animation duration in milliseconds (-1 for infinite)
  -- **onComplete** (function): Callback function when animation completes

### Example 
```lua
local Bridge = exports['community_bridge']:Bridge()

local entityData = Bridge.Entity.Create({
    id = "animated_ped",
    entityType = "ped",
    model = "mp_m_freemode_01",
    coords = vector3(100.0, 200.0, 30.0),
    anim = {
        dict = "anim@mp_player_intcelebrationmale@wave",
        name = "wave",
        flags = 49,
        duration = 5000,
        onComplete = function(entityData)
            print("Wave animation completed for:", entityData.id)
            -- Chain another animation
            Bridge.Entity.Set(entityData.id, "anim", {
                dict = "rcmnigel1c",
                name = "hailing_whistle_waive_a",
                flags = 49,
                duration = 3000
            })
        end
    }
})
```

## Attach Behavior (Client)

### Description
Attaches entities to other entities or players using bone attachment system.

### Syntax
```lua
Bridge.Entity.Create({
    attach = {
        target = serverIdOrEntityId,
        bone = 57005,
        offset = vector3(0.0, 0.0, 0.0),
        rotation = vector3(0.0, 0.0, 0.0)
    }
})
```

### Parameters
- **attach** (table): Attachment configuration containing:
  -- **target** (number|string): Server ID of player or entity ID to attach to
  -- **bone** (number): Bone index to attach to (e.g., 57005 for right hand)
  -- **offset** (vector3): Position offset from bone (optional)
  -- **rotation** (vector3): Rotation offset (optional)

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Attach object to player's hand
local entityData = Bridge.Entity.Create({
    id = "attached_weapon",
    entityType = "ped",
    model = "mp_m_freemode_01",
    coords = vector3(100.0, 200.0, 30.0),
    attach = {
        target = GetPlayerServerId(PlayerId()),
        bone = 57005, -- Right hand
        offset = vector3(0.1, 0.0, 0.0),
        rotation = vector3(0.0, 90.0, 0.0)
    }
})
```

## Clothing Behavior (Client)

### Description
Applies clothing components and props to ped entities with detailed customization options.

### Syntax
```lua
Bridge.Entity.Create({
    clothing = {
        components = {
            { drawable = 0, texture = 0, component_id = 0 }
        },
        props = {
            { drawable = 0, texture = 0, prop_id = 0 }
        }
    }
})
```

### Parameters
- **components** (table): Array of clothing components, each containing:
  -- **drawable** (number): Drawable variation
  -- **texture** (number): Texture variation  
  -- **component_id** (number): Component slot ID
- **props** (table): Array of props, each containing:
  -- **drawable** (number): Prop drawable
  -- **texture** (number): Prop texture
  -- **prop_id** (number): Prop slot ID

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local entityData = Bridge.Entity.Create({
    id = "well_dressed_ped",
    entityType = "ped",
    model = "mp_m_freemode_01",
    coords = vector3(100.0, 200.0, 30.0),
    clothing = {
        components = {
            { drawable = 0, texture = 0, component_id = 0 },  -- Face
            { drawable = 19, texture = 0, component_id = 2 }, -- Hair
            { drawable = 4, texture = 2, component_id = 11 }  -- Torso
        },
        props = {
            { drawable = 27, prop_id = 0, texture = 0 }, -- Hat
            { drawable = 5, prop_id = 1, texture = 0 }   -- Glasses
        }
    }
})
```

## Follow Behavior (Client)

### Description
Makes entities follow targets with configurable speed and distance parameters. Only works with ped entities.

### Syntax
```lua
Bridge.Entity.Create({
    follow = {
        target = serverIdOrEntityId,
        speed = 1.0,
        distance = 2.0,
        OnExit = function(entityData) end
    }
})
```

### Parameters
- **follow** (table): Follow configuration containing:
  -- **target** (number|string): Server ID of player or entity ID to follow
  -- **speed** (number): Movement speed (default: 1.0)
  -- **distance** (number): Follow distance (default: 2.0)
  -- **OnExit** (function): Callback when entity stops following

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local entityData = Bridge.Entity.Create({
    id = "follower_ped",
    entityType = "ped",
    model = "mp_m_freemode_01",
    coords = vector3(100.0, 200.0, 30.0),
    follow = {
        target = GetPlayerServerId(PlayerId()),
        speed = 2.5,
        distance = 3.0,
        OnExit = function(entityData)
            print("Ped stopped following:", entityData.id)
        end
    }
})
```

## Particles Behavior (Client)

### Description
Attaches particle effects to entities with support for multiple simultaneous effects.

### Syntax
```lua
Bridge.Entity.Create({
    particles = {
        {
            dict = "core",
            ptfx = "ent_dst_electrical",
            offset = vector3(0.0, 0.0, 0.0),
            rotation = vector3(0.0, 0.0, 0.0),
            size = 1.0,
            color = vector3(255, 255, 255),
            looped = true,
            loopLength = 5000
        }
    }
})
```

### Parameters
- **particles** (table): Array of particle effect configurations, each containing:
  -- **dict** (string): Particle dictionary name
  -- **ptfx** (string): Particle effect name
  -- **offset** (vector3): Position offset from entity
  -- **rotation** (vector3): Rotation offset
  -- **size** (number): Effect size multiplier
  -- **color** (vector3): RGB color values (0-255)
  -- **looped** (boolean): Whether effect should loop
  -- **loopLength** (number): Loop duration in milliseconds

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local entityData = Bridge.Entity.Create({
    id = "particle_ped",
    entityType = "ped",
    model = "mp_m_freemode_01",
    coords = vector3(100.0, 200.0, 30.0),
    particles = {
        {
            dict = "core",
            ptfx = "ent_dst_electrical",
            offset = vector3(0.0, 1.0, 0.0),
            looped = true
        },
        {
            dict = "core",
            ptfx = "ent_dst_electrical", 
            offset = vector3(0.0, -1.0, 0.0),
            rotation = vector3(0.0, 0.0, 180.0),
            looped = true,
            loopLength = 1000
        }
    }
})
```

## Scenarios Behavior (Client)

### Description
Makes ped entities perform ambient scenarios like clipboard holding, smoking, etc.

### Syntax
```lua
Bridge.Entity.Create({
    scenarios = {
        name = "WORLD_HUMAN_CLIPBOARD",
        introClip = true,
        duration = 20000
    }
})
```

### Parameters
- **scenarios** (table): Scenario configuration containing:
  -- **name** (string): Scenario name (e.g., "WORLD_HUMAN_CLIPBOARD")
  -- **introClip** (boolean): Play introduction clip
  -- **duration** (number): Scenario duration in milliseconds

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local entityData = Bridge.Entity.Create({
    id = "clipboard_ped",
    entityType = "ped", 
    model = "mp_m_freemode_01",
    coords = vector3(100.0, 200.0, 30.0),
    scenarios = {
        name = "WORLD_HUMAN_CLIPBOARD",
        introClip = true,
        duration = 20000
    }
})
```

## Stash Behavior (Server)

### Description
Adds inventory stash functionality to entities with target interaction support.

### Syntax
```lua
Bridge.ServerEntity.Create({
    stash = {
        label = "Storage Name",
        slots = 50,
        maxWeight = 100000,
        target = {
            label = "Open Storage",
            description = "Access storage",
            icon = "fas fa-boxes"
        }
    }
})
```

### Parameters
- **stash** (table): Stash configuration containing:
  -- **label** (string): Display name for the stash
  -- **slots** (number): Number of inventory slots (server-side)
  -- **maxWeight** (number): Maximum weight capacity (server-side)
  -- **target** (table): Target interaction configuration containing:
    --- **label** (string): Target label displayed to players
    --- **description** (string): Target description text
    --- **icon** (string): Font Awesome icon class

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local serverEntity = Bridge.ServerEntity.Create({
    entityType = "ped",
    model = "mp_m_freemode_01",
    coords = vector3(110.0, 200.0, 30.0),
    stash = {
        label = "Secure Storage",
        slots = 50,
        maxWeight = 100000,
        target = {
            label = "Open Storage",
            description = "Access secure storage facility",
            icon = "fas fa-vault"
        }
    }
})
```

## Targets Behavior (Client)

### Description
Adds interactive target zones to entities with customizable actions and UI.

### Syntax
```lua
Bridge.Entity.Create({
    targets = {
        {
            label = "Interact",
            description = "Description text",
            distance = 2.0,
            icon = "fas fa-hand",
            onSelect = function(entityData, entity) end
        }
    }
})
```

### Parameters
- **targets** (table): Array of target configurations, each containing:
  -- **label** (string): Target label displayed to players
  -- **description** (string): Target description text
  -- **distance** (number): Interaction distance
  -- **icon** (string): Font Awesome icon class
  -- **onSelect** (function): Callback function when target is selected

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local entityData = Bridge.Entity.Create({
    id = "interactive_ped",
    entityType = "ped",
    model = "mp_m_freemode_01",
    coords = vector3(100.0, 200.0, 30.0),
    targets = {
        {
            label = "Talk",
            description = "Have a conversation",
            distance = 2.0,
            icon = "fas fa-comments",
            onSelect = function(entityData, entity)
                print("Player interacted with:", entityData.id)
                -- Add dialogue logic here
            end
        },
        {
            label = "Follow Me",
            description = "Make this ped follow you",
            distance = 2.0,
            icon = "fas fa-walking",
            onSelect = function(entityData, entity)
                Bridge.Entity.Set(entityData.id, "follow", {
                    target = PlayerPedId()
                })
            end
        }
    }
})
```

## Weapon Behavior (Client)

### Description
Equips entities with weapons and ammunition. Only works with ped entities.

### Syntax
```lua
Bridge.Entity.Create({
    weapon = {
        name = "WEAPON_PISTOL",
        ammo = 100
    }
})
```

### Parameters
- **weapon** (table): Weapon configuration containing:
  -- **name** (string): Weapon hash or name
  -- **ammo** (number): Ammunition count

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local entityData = Bridge.Entity.Create({
    id = "armed_guard",
    entityType = "ped",
    model = "s_m_m_security_01",
    coords = vector3(100.0, 200.0, 30.0),
    weapon = {
        name = "WEAPON_PISTOL",
        ammo = 100
    }
})

-- Update weapon later
Bridge.Entity.Set(entityData.id, "weapon", {
    name = "WEAPON_CARBINERIFLE", 
    ammo = 200
})
```

## Set (Shared)

### Description  
Updates or sets behavior data for an existing entity. This will trigger behavior updates and re-apply effects.

### Syntax
```lua
Bridge.Entity.Set(entityId, behaviorKey, behaviorData)
```

### Parameters
- **entityId** (string): The ID of the entity to update
- **behaviorKey** (string): The behavior property to update
- **behaviorData** (table|any): New behavior configuration

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Update animation
Bridge.Entity.Set("my_ped", "anim", {
    dict = "amb@world_human_smoking@male@male_a@base",
    name = "base",
    flags = 49,
    duration = -1
})

-- Update follow target
Bridge.Entity.Set("follower_ped", "follow", {
    target = GetPlayerServerId(PlayerId()),
    speed = 3.0,
    distance = 2.5
})

-- Add new particles
Bridge.Entity.Set("particle_ped", "particles", {
    {
        dict = "scr_rcbarry2",
        ptfx = "scr_clown_appears",
        offset = vector3(0, 0, 1),
        looped = false
    }
})
```

## Combining Behaviors (Shared)

### Description
Multiple behaviors can be applied to the same entity, allowing for complex entity configurations:

### Syntax
N/A

### Parameters
N/A

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Create entity with multiple behaviors
local complexEntity = Bridge.Entity.Create({
    id = "complex_guard",
    entityType = "ped",
    model = "s_m_m_security_01",
    coords = vector3(100.0, 200.0, 30.0),
    
    -- Animation behavior
    anim = {
        dict = "amb@world_human_guard_stand@male@base",
        name = "base",
        flags = 49,
        duration = -1
    },
    
    -- Clothing behavior
    clothing = {
        components = {
            { drawable = 0, texture = 0, component_id = 0 },
            { drawable = 4, texture = 1, component_id = 11 }
        },
        props = {
            { drawable = 8, prop_id = 0, texture = 0 } -- Security hat
        }
    },
    
    -- Weapon behavior
    weapon = {
        name = "WEAPON_NIGHTSTICK",
        ammo = 1
    },
    
    -- Particles behavior
    particles = {
        {
            dict = "core", 
            ptfx = "ent_dst_electrical",
            offset = vector3(0, 0, 2),
            looped = true,
            loopLength = 2000
        }
    },
    
    -- Targets behavior
    targets = {
        {
            label = "Security Check",
            description = "Request security assistance",
            distance = 3.0,
            icon = "fas fa-shield-alt",
            onSelect = function(entityData, entity)
                print("Security requested by player")
            end
        }
    }
})
```
