# <i class="fas fa-key"></i> VehicleKey

<!--META
nav: true
toc: true
description: The VehicleKey module provides functions for managing vehicle keys across different key systems. It handles giving and removing keys for vehicles.
-->

The VehicleKey module provides functions for managing vehicle keys across different key systems. It handles giving and removing keys for vehicles.

## Overview

The VehicleKey module provides vehicle ownership, key management, and access control systems.

## GiveKeys (Client)

### Description
Gives the player keys to a specific vehicle.

### Syntax
```lua
Bridge.VehicleKey.GiveKeys(vehicle, plate)
```

### Parameters
- **vehicle** (number): Vehicle entity handle
- **plate** (string): License plate of the vehicle

### Returns
- (boolean): Returns false if plate is invalid, otherwise no return value

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Get nearby vehicle
local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
if vehicle ~= 0 then
    local plate = GetVehicleNumberPlateText(vehicle)
    Bridge.VehicleKey.GiveKeys(vehicle, plate)
    print("Given keys to vehicle: " .. plate)
end
```

## RemoveKeys (Client)

### Description
Removes the player's keys to a specific vehicle.

### Syntax
```lua
Bridge.VehicleKey.RemoveKeys(vehicle, plate)
```

### Parameters
- **vehicle** (number): Vehicle entity handle
- **plate** (string): License plate of the vehicle

### Returns
- (boolean): Returns false if plate is invalid, otherwise no return value

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Remove keys from current vehicle
local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
if vehicle ~= 0 then
    local plate = GetVehicleNumberPlateText(vehicle)
    Bridge.VehicleKey.RemoveKeys(vehicle, plate)
    print("Removed keys from vehicle: " .. plate)
end
```

