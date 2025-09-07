# Point 📍

<!--META
nav: true
toc: true
description: The Point system provides an efficient grid-based spatial management system for tracking player proximity to locations and entities. It uses spatial partitioning for optimized performance and supports both static coordinate points and dynamic entity tracking with enter/exit callbacks.
-->

The Point system provides an efficient grid-based spatial management system for tracking player proximity to locations and entities. It uses spatial partitioning for optimized performance and supports both static coordinate points and dynamic entity tracking with enter/exit callbacks.

## Overview

The Point library provides single coordinate point management with functions for distance calculations, coordinate transformations, and position-based operations.

## Register (Client)

### Description
Creates a new point that tracks player proximity with enter/exit callbacks. Supports both static coordinates and dynamic entities.

### Syntax
```lua
Bridge.Point.Register(id, target, distance, args, onEnter, onExit, onNearby)
```

### Parameters
- **id** (string): Unique identifier for the point
- **target** (number | vector3): Entity handle for dynamic tracking or vector3 for static position
- **distance** (number): Trigger distance for enter/exit events
- **args** (any): Custom data to pass to callback functions
- **onEnter** (function): Callback when player enters the point (point, data) -> updatedData
- **onExit** (function): Callback when player exits the point (point, data) -> updatedData
- **onNearby** (function | nil): Optional callback for nearby points processing

### Returns
- (table): Point object reference

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Static coordinate point
local shopPoint = Bridge.Point.Register(
    'shop_entrance',
    vector3(100, 200, 20),
    5.0,
    {shopName = 'General Store'},
    function(point, data)
        print('Entered ' .. data.shopName)
        Bridge.Framework.ShowHelpText('Press [E] to shop')
        return data
    end,
    function(point, data)
        print('Left ' .. data.shopName)
        Bridge.Framework.HideHelpText()
        return data
    end
)

-- Dynamic entity tracking
local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
local vehiclePoint = Bridge.Point.Register(
    'my_vehicle',
    vehicle,
    3.0,
    {plate = GetVehicleNumberPlateText(vehicle)},
    function(point, data)
        print('Near vehicle: ' .. data.plate)
        return data
    end,
    function(point, data)
        print('Away from vehicle: ' .. data.plate)
        return data
    end
)
```

## Remove (Client)

### Description
Removes a point by its ID and cleans up associated resources.

### Syntax
```lua
Bridge.Point.Remove(id)
```

### Parameters
- **id** (string): ID of the point to remove

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Remove a specific point
Bridge.Point.Remove('shop_entrance')
print('Shop entrance point removed')
```

## Get (Client)

### Description
Retrieves a point object by its ID.

### Syntax
```lua
Bridge.Point.Get(id)
```

### Parameters
- **id** (string): ID of the point to retrieve

### Returns
- (table | nil): Point object or nil if not found

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local point = Bridge.Point.Get('shop_entrance')
if point then
    print('Point distance: ' .. point.distance)
    print('Point inside: ' .. tostring(point.inside))
else
    print('Point not found')
end
```

## UpdateCoords (Client)

### Description
Updates the coordinates of an existing point and refreshes its grid position.

### Syntax
```lua
Bridge.Point.UpdateCoords(id, coords)
```

### Parameters
- **id** (string): ID of the point to update
- **coords** (vector3): New coordinates for the point

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Move a point to new location
local newLocation = vector3(150, 250, 25)
Bridge.Point.UpdateCoords('shop_entrance', newLocation)
print('Point moved to new location')
```

## GetAll (Client)

### Description
Returns all active points in the system.

### Syntax
```lua
Bridge.Point.GetAll()
```

### Returns
- (table): Table of all active points indexed by ID

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local allPoints = Bridge.Point.GetAll()
print('Total active points: ' .. table.getn(allPoints))

for id, point in pairs(allPoints) do
    print('Point ID: ' .. id .. ', Inside: ' .. tostring(point.inside))
end
```

## GetNearbyCells (Client)

### Description
Returns grid cell keys that are near the specified coordinates. Used internally for spatial optimization.

### Syntax
```lua
Bridge.Point.GetNearbyCells(coords)
```

### Parameters
- **coords** (vector3): Coordinates to find nearby cells for

### Returns
- (table): Array of nearby grid cell keys

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Get nearby grid cells for optimization
local playerCoords = GetEntityCoords(PlayerPedId())
local nearbyCells = Bridge.Point.GetNearbyCells(playerCoords)
print('Nearby cells: ' .. #nearbyCells)
```

## CheckPointsInSameCell (Client)

### Description
Returns all points in the same grid cell as the specified point for proximity checking.

### Syntax
```lua
Bridge.Point.CheckPointsInSameCell(point)
```

### Parameters
- **point** (table): Point object to check against

### Returns
- (table): Table of nearby points in the same cell

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local myPoint = Bridge.Point.Get('shop_entrance')
if myPoint then
    local nearbyPoints = Bridge.Point.CheckPointsInSameCell(myPoint)
    print('Points in same cell: ' .. table.getn(nearbyPoints))
end
```

