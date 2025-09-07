# Fuel ⛽

<!--META
nav: true
toc: true
description: The Fuel module provides functions for managing vehicle fuel levels across different fuel systems. It handles getting and setting fuel for vehicles.
-->

The Fuel module provides functions for managing vehicle fuel levels across different fuel systems. It handles getting and setting fuel for vehicles.

## Overview

The Fuel module provides vehicle fuel management and gas station systems for realistic vehicle operation.

## GetFuel (Client)

### Description
Gets the current fuel level of a vehicle.

### Syntax
```lua
Bridge.Fuel.GetFuel(vehicle)
```

### Parameters
- **vehicle** (number): Vehicle entity handle

### Returns
- (number): Fuel level (0.0 to 100.0)

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Get fuel level of current vehicle
local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
if vehicle ~= 0 then
    local fuelLevel = Bridge.Fuel.GetFuel(vehicle)
    print("Vehicle fuel level: " .. fuelLevel .. "%")
end
```

## GetResourceName (Client)

### Description
Returns the name of the currently active fuel system.

### Syntax
```lua
Bridge.Fuel.GetResourceName()
```

### Returns
- (string): Name of the fuel resource being used

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local fuelSystem = Bridge.Fuel.GetResourceName()
print("Using fuel system: " .. fuelSystem)
```

## SetFuel (Client)

### Description
Sets the fuel level of a vehicle. Some systems add fuel, others set absolute values.

### Syntax
```lua
Bridge.Fuel.SetFuel(vehicle, fuel, type)
```

### Parameters
- **vehicle** (number): Vehicle entity handle
- **fuel** (number): Fuel amount (0.0 to 100.0 or amount to add)
- **type** (string): Fuel type (for systems that support multiple fuel types) (optional)

### Returns
- (number|nil): New fuel level or nil if vehicle doesn't exist

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Set vehicle fuel to 75%
local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
if vehicle ~= 0 then
    Bridge.Fuel.SetFuel(vehicle, 75.0)
    print("Set vehicle fuel to 75%")
end

-- Add 25 units of fuel
Bridge.Fuel.SetFuel(vehicle, 25.0)
```

