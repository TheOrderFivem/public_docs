# <i class="fas fa-phone"></i> Callback

<!--META
nav: true
toc: true
description: The Callback library provides a robust client-server communication system with support for promises, callbacks, and resource-specific cleanup. It handles bi-directional communication between client and server with automatic timeout and error handling.
-->

The Callback library provides a robust client-server communication system with support for promises, callbacks, and resource-specific cleanup. It handles bi-directional communication between client and server with automatic timeout and error handling.

## Overview

The Callback library provides a robust client-server communication system with support for promises, callbacks, and resource-specific cleanup. It handles bi-directional communication between client and server with automatic timeout and error handling.

## Register (Client)

### Description
Registers a client-side callback function that can be triggered by the server.

### Syntax
```lua
Bridge.Callback.Register(name, handler)
```

### Parameters
- **name** (string): Unique name for the callback
- **handler** (function): Function to execute when callback is triggered

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Register a client callback
Bridge.Callback.Register('getPlayerInfo', function()
    local ped = PlayerPedId()
    local health = GetEntityHealth(ped),
    local coords = GetEntityCoords(ped),
    local model = GetEntityModel(ped)
    return health, coords, model
end)
```

## RegisterRebound (Client)

### Description
Registers a rebound callback that receives responses from server callbacks triggered by this client.

### Syntax
```lua
Bridge.Callback.RegisterRebound(name, handler)
```

### Parameters
- **name** (string): Name of the callback to rebound from
- **handler** (function): Function to handle the rebound response

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Register a rebound callback for server responses
Bridge.Callback.RegisterRebound('validateUser', function(isValid, reason)
    if isValid then
        print('User validation successful')
    else
        print('User validation failed: ' .. reason)
    end
end)
```

## Trigger (Client)

### Description
Triggers a server-side callback and optionally handles the response with a callback or returns a promise.

### Syntax
```lua
Bridge.Callback.Trigger(name, ...)
```

### Parameters
- **name** (string): Name of the server callback to trigger
- **...** (any): Arguments to pass to the server callback

### Returns
- (any): Return value from server callback

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
-- Trigger with promise
local money = Bridge.Callback.Trigger('getUserMoney', GetPlayerServerId(PlayerId()))
print('Player has $' .. money)
```

## Register (Server)

### Description
Registers a server-side callback function that can be triggered by clients.

### Syntax
```lua
Bridge.Callback.Register(name, handler)
```

### Parameters
- **name** (string): Unique name for the callback
- **handler** (function): Function to execute when callback is triggered (first parameter is source player ID)

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Register a server callback
Bridge.Callback.Register('getUserMoney', function(source, somedata)
    if not somedata then return end
    return Bridge.Framework.GetPlayerJob(source)
end)
```

## Trigger (Server)

### Description
Triggers a client-side callback on specific player(s) and optionally handles the response.

### Syntax
```lua
Bridge.Callback.Trigger(name, target, ...)
```

### Parameters
- **name** (string): Name of the client callback to trigger
- **target** (number | table): Player ID or table of player IDs to trigger callback on
- **...** (any): Arguments to pass to the client callback (optional callback function as first argument)

### Returns
- (any): Return value from client callback

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Trigger on multiple players
local someData = "derp"
local money = Bridge.Callback.Trigger('getUseMoney', someData)
print('money', money)
```

