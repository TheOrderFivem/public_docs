# Utility 🛠️

<!--META
nav: true
toc: true
description: The Utility library provides a comprehensive collection of client-side helper functions for common FiveM operations including entity creation, blip management, UI utilities, and coordinate operations. Essential for game world manipulation and player interaction.
-->

The Utility library provides a comprehensive collection of client-side helper functions for common FiveM operations including entity creation, blip management, UI utilities, and coordinate operations. Essential for game world manipulation and player interaction.

## Overview

The Utility library provides a collection of common helper functions and utilities for string manipulation, table operations, data validation, and other frequently used programming tasks in FiveM development.

## CreateProp (Client)

### Description
Creates a prop (object) at specified coordinates with automatic model loading and cleanup.

### Syntax
```lua
Bridge.Utility.CreateProp(model, coords, heading, networked)
```

### Parameters
- **model** (string | number): Model name or hash of the prop to create
- **coords** (vector3): World coordinates where to create the prop
- **heading** (number): Rotation heading of the prop
- **networked** (boolean): Whether the prop should be networked to other players

### Returns
- (number | nil): Entity handle of created prop, or nil if failed

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Create a traffic cone
local playerCoords = GetEntityCoords(PlayerPedId())
local cone = Bridge.Utility.CreateProp(
    'prop_roadcone02a',
    playerCoords + vector3(2, 0, 0),
    0.0,
    true
)

if cone then
    print('Traffic cone created with handle: ' .. cone)
else
    print('Failed to create traffic cone')
end
```

## CreateVehicle (Client)

### Description
Creates a vehicle with specified model and coordinates, returning both entity handle and metadata.

### Syntax
```lua
Bridge.Utility.CreateVehicle(model, coords, heading, networked)
```

### Parameters
- **model** (string | number): Vehicle model name or hash
- **coords** (vector3): Spawn coordinates
- **heading** (number): Vehicle heading
- **networked** (boolean): Whether vehicle should be networked

### Returns
- (number | nil): Vehicle entity handle
- (table): Vehicle metadata with networkid, coords, and heading

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Spawn a police car
local spawnCoords = GetEntityCoords(PlayerPedId()) + vector3(5, 0, 0)
local vehicle, metadata = Bridge.Utility.CreateVehicle(
    'police',
    spawnCoords,
    90.0,
    true
)

if vehicle then
    print('Vehicle spawned at: ' .. tostring(metadata.coords))
    print('Network ID: ' .. metadata.networkid)
    TaskWarpPedIntoVehicle(PlayerPedId(), vehicle, -1)
end
```

## CreatePed (Client)

### Description
Creates a ped with specified model and coordinates with automatic tracking for cleanup.

### Syntax
```lua
Bridge.Utility.CreatePed(model, coords, heading, networked, settings)
```

### Parameters
- **model** (string | number): Ped model name or hash
- **coords** (vector3): Spawn coordinates
- **heading** (number): Ped heading
- **networked** (boolean): Whether ped should be networked
- **settings** (table | nil): Optional ped configuration settings

### Returns
- (number | nil): Ped entity handle or nil if failed

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Create a shop keeper
local shopCoords = vector3(100, 200, 20)
local shopKeeper = Bridge.Utility.CreatePed(
    's_m_m_shopkeep_01',
    shopCoords,
    180.0,
    false,
    {scenario = 'WORLD_HUMAN_STAND_IMPATIENT'}
)

if shopKeeper then
    TaskStartScenarioInPlace(shopKeeper, 'WORLD_HUMAN_STAND_IMPATIENT', 0, true)
    print('Shop keeper created')
end
```

## GetStreetNameAtCoords (Client)

### Description
Gets the street name and crossing street at specified coordinates.

### Syntax
```lua
Bridge.Utility.GetStreetNameAtCoords(coords)
```

### Parameters
- **coords** (vector3): Coordinates to get street names for

### Returns
- (string): Primary street name
- (string): Crossing street name

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local playerCoords = GetEntityCoords(PlayerPedId())
local street, crossing = Bridge.Utility.GetStreetNameAtCoords(playerCoords)

local locationText = street
if crossing and crossing ~= '' then
    locationText = street .. ' & ' .. crossing
end

print('Current location: ' .. locationText)
```

## StartBusySpinner (Client)

### Description
Shows a busy spinner with custom text during loading operations.

### Syntax
```lua
Bridge.Utility.StartBusySpinner(text)
```

### Parameters
- **text** (string): Text to display with the spinner

### Returns
- (boolean): True if spinner was started successfully

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Show loading spinner
Bridge.Utility.StartBusySpinner('Loading player data...')

-- Simulate loading
Wait(3000)

-- Hide spinner
Bridge.Utility.StopBusySpinner()
```

## StopBusySpinner (Client)

### Description
Stops the currently active busy spinner.

### Syntax
```lua
Bridge.Utility.StopBusySpinner()
```

### Returns
- (boolean): True if spinner was stopped, false if none was active

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Stop any active spinner
local stopped = Bridge.Utility.StopBusySpinner()
if stopped then
    print('Spinner stopped')
else
    print('No spinner was active')
end
```

## CreateBlip (Client)

### Description
Creates a blip on the map at specified coordinates with automatic tracking for cleanup.

### Syntax
```lua
Bridge.Utility.CreateBlip(coords, sprite, color, scale, label, shortRange, displayType)
```

### Parameters
- **coords** (vector3): Coordinates for the blip
- **sprite** (number | nil): Blip sprite ID (default: 8)
- **color** (number | nil): Blip color ID (default: 3)
- **scale** (number | nil): Blip scale (default: 0.8)
- **label** (string): Blip label text
- **shortRange** (boolean): Whether blip is short range
- **displayType** (number | nil): Blip display type (default: 2)

### Returns
- (number): Blip handle

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Create a shop blip
local shopBlip = Bridge.Utility.CreateBlip(
    vector3(100, 200, 20),
    52, -- Shop sprite
    2,  -- Green color
    1.0,
    'General Store',
    true,
    2
)

print('Shop blip created with handle: ' .. shopBlip)
```

## CreateEntityBlip (Client)

### Description
Creates a blip that follows a specific entity with automatic tracking.

### Syntax
```lua
Bridge.Utility.CreateEntityBlip(entity, sprite, color, scale, label, shortRange, displayType)
```

### Parameters
- **entity** (number): Entity handle to attach blip to
- **sprite** (number | nil): Blip sprite ID (default: 8)
- **color** (number | nil): Blip color ID (default: 3)
- **scale** (number | nil): Blip scale (default: 0.8)
- **label** (string): Blip label text
- **shortRange** (boolean): Whether blip is short range
- **displayType** (number | nil): Blip display type (default: 2)

### Returns
- (number): Blip handle

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Create blip for player's vehicle
local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
if vehicle ~= 0 then
    local vehicleBlip = Bridge.Utility.CreateEntityBlip(
        vehicle,
        225, -- Car sprite
        3,   -- Blue color
        0.8,
        'My Vehicle',
        false,
        2
    )
    print('Vehicle blip created')
end
```

## RemoveBlip (Client)

### Description
Safely removes a blip and cleans it from the tracking system.

### Syntax
```lua
Bridge.Utility.RemoveBlip(blip)
```

### Parameters
- **blip** (number): Blip handle to remove

### Returns
- (boolean): True if blip was found and removed

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Remove a specific blip
local removed = Bridge.Utility.RemoveBlip(shopBlip)
if removed then
    print('Shop blip removed')
else
    print('Blip not found in tracking system')
end
```

