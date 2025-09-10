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

## Supported Systems

| System | Resource Name |
|--------|---------------|
| MrNewb Vehicle Keys | `MrNewbVehicleKeys` |
| CD Garage | `cd_garage` |
| F Real Car Keys | `F_RealCarKeysSystem` |
| Jacksam | `jacksam` |
| MK Vehicle Keys | `mk_vehiclekeys` |
| mVehicle | `mVehicle` |
| Okok Garage | `okokGarage` |
| QB Vehicle Keys | `qb-vehiclekeys` |
| QBX Vehicle Keys | `qbx_vehiclekeys` |
| QS Vehicle Keys | `qs-vehiclekeys` |
| Renewed Vehicle Keys | `Renewed-Vehiclekeys` |
| T1ger Keys | `t1ger_keys` |
| Wasabi Car Lock | `wasabi_carlock` |

The system automatically detects which vehicle key resource is available and uses the appropriate implementation. If no supported key system is found, it falls back to the default system using basic native vehicle locking functionality. Key management functions are standardized across different systems.

