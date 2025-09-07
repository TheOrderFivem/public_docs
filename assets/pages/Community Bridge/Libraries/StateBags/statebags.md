# StateBags 🏷️

<!--META
nav: true
toc: true
description: The StateBags library provides simplified management of FiveM's StateBag system with enhanced entity and player change handlers. It offers convenient methods to watch for state changes on entities and players with automatic validation and filtering.
-->

The StateBags library provides simplified management of FiveM's StateBag system with enhanced entity and player change handlers. It offers convenient methods to watch for state changes on entities and players with automatic validation and filtering.

## Overview

The StateBags library provides state synchronization between client and server using FiveM's StateBags system for efficient data sharing and automatic network synchronization.

## AddEntityChangeHandler (Client)

### Description
Registers a handler to monitor state changes on entities. Automatically resolves entities from statebag names and validates their existence before triggering callbacks.

### Syntax
```lua
Bridge.StateBags.AddEntityChangeHandler(keyName, entityId, callback)
```

### Parameters
- **keyName** (string): The statebag key to monitor for changes
- **entityId** (string | nil): Specific entity ID to watch (nil to watch all entities)
- **callback** (function): Callback function with signature (entity, key, value, lastValue, replicated)

### Returns
- (number): Handler ID for removing the handler later

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Monitor health changes on all entities
local healthHandler = Bridge.StateBags.AddEntityChangeHandler(
    "health",
    nil, -- Watch all entities
    function(entity, key, value, lastValue, replicated)
        if DoesEntityExist(entity) then
            local entityType = GetEntityType(entity)
            print(string.format("Entity %d health changed: %d -> %d",
                entity, lastValue or 0, value or 0))

            if entityType == 1 and value <= 0 then -- Ped died
                print("Ped has died!")
            end
        end
    end
)

-- Monitor specific vehicle damage state
local myVehicle = GetVehiclePedIsIn(PlayerPedId(), false)
if myVehicle ~= 0 then
    local damageHandler = Bridge.StateBags.AddEntityChangeHandler(
        "damage_level",
        NetworkGetNetworkIdFromEntity(myVehicle),
        function(entity, key, value, lastValue, replicated)
            print("My vehicle damage level: " .. tostring(value))
        end
    )
end
```

## AddPlayerChangeHandler (Client)

### Description
Registers a handler to monitor state changes on players with optional filtering to watch only the current player or all players.

### Syntax
```lua
Bridge.StateBags.AddPlayerChangeHandler(keyName, filter, callback)
```

### Parameters
- **keyName** (string): The statebag key to monitor for changes
- **filter** (boolean | nil): If true, only watch changes from the current player
- **callback** (function): Callback function with signature (playerId, key, value, lastValue, replicated)

### Returns
- (number): Handler ID for removing the handler later

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Monitor money changes for current player only
local moneyHandler = Bridge.StateBags.AddPlayerChangeHandler(
    "money",
    true, -- Only current player
    function(playerId, key, value, lastValue, replicated)
        local difference = (value or 0) - (lastValue or 0)
        if difference > 0 then
            print("Gained $" .. difference)
        elseif difference < 0 then
            print("Lost $" .. math.abs(difference))
        end
    end
)

-- Monitor job changes for all players
local jobHandler = Bridge.StateBags.AddPlayerChangeHandler(
    "job",
    false, -- All players
    function(playerId, key, value, lastValue, replicated)
        local playerName = GetPlayerName(playerId)
        print(string.format("%s changed job from %s to %s",
            playerName,
            lastValue or "unemployed",
            value or "unemployed"))
    end
)

-- Monitor stress levels for current player
local stressHandler = Bridge.StateBags.AddPlayerChangeHandler(
    "stress",
    true,
    function(playerId, key, value, lastValue, replicated)
        if value and value > 80 then
            print("Warning: High stress level!")
        elseif value and value < 20 then
            print("Stress level is low - feeling relaxed")
        end
    end
)
```

