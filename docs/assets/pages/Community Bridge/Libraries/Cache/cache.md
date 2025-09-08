# <i class="fas fa-database"></i> Cache

<!--META
nav: true
toc: true
description: The Cache library provides a powerful caching system with automatic updates, change detection, and resource cleanup. It allows you to cache expensive calculations or frequently accessed data with configurable update intervals and callback support.
-->

The Cache library provides a powerful caching system with automatic updates, change detection, and resource cleanup. It allows you to cache expensive calculations or frequently accessed data with configurable update intervals and callback support.

## Overview

The Cache library provides a powerful caching system with automatic updates, change detection, and resource cleanup. It allows you to cache expensive calculations or frequently accessed data with configurable update intervals and callback support.

## Create (Shared)

### Description
Creates a new cache entry with a comparison function and optional update interval. The cache will automatically update based on the wait time and call registered callbacks when values change.

### Syntax
```lua
Cache.Create(name, compare, waitTime)
```

### Parameters
- **name** (string): Unique name for the cache entry
- **compare** (function): Function that returns the current value to cache
- **waitTime** (number): Update interval in milliseconds (optional, nil for manual updates only)

### Returns
- (CacheEntry): The created cache entry or nil if creation failed

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()

-- Cache player health with 1 second updates
local healthCache = Bridge.Cache.Create(
    "player_health",
    function()
        return GetEntityHealth(PlayerPedId())
    end,
    1000
)

print("Health cache created with initial value: " .. tostring(healthCache.Value))
```

## Get (Shared)

### Description
Retrieves an existing cache entry by name.

### Syntax
```lua
Cache.Get(name)
```

### Parameters
- **name** (string): Name of the cache entry to retrieve

### Returns
- (CacheEntry): The cache entry or nil if not found

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()

local healthCache = Bridge.Cache.Get("player_health")
if healthCache then
    print("Current health: " .. tostring(healthCache.Value))
end
```

## OnChange (Shared)

### Description
Registers a callback function to be called whenever the cached value changes. The callback receives both new and old values.

### Syntax
```lua
Cache.OnChange(name, onChange)
```

### Parameters
- **name** (string): Name of the cache entry to monitor
- **onChange** (function): Callback function with signature (newValue, oldValue)

### Returns
- (string): Callback ID for removal purposes

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()

-- Monitor health changes
local callbackId = Bridge.Cache.OnChange("player_health", function(newHealth, oldHealth)
    local diff = newHealth - oldHealth
    if diff > 0 then
        print("Health increased by " .. diff)
    elseif diff < 0 then
        print("Health decreased by " .. math.abs(diff))
    end
end)

print("Health monitor registered with ID: " .. callbackId)
```

## RemoveOnChange (Shared)

### Description
Removes a previously registered onChange callback using its ID.

### Syntax
```lua
Cache.RemoveOnChange(name, id)
```

### Parameters
- **name** (string): Name of the cache entry
- **id** (string): Callback ID returned from OnChange

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()

-- Remove the health monitor callback
Bridge.Cache.RemoveOnChange("player_health", callbackId)
print("Health monitor callback removed")
```

## Remove (Shared)

### Description
Completely removes a cache entry and all its associated callbacks. This will stop all automatic updates for the cache.

### Syntax
```lua
Cache.Remove(name)
```

### Parameters
- **name** (string): Name of the cache entry to remove

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()

-- Remove the health cache completely
Bridge.Cache.Remove("player_health")
print("Health cache removed")
```

## Update (Shared)

### Description
Manually updates a cache entry with a new value and triggers onChange callbacks if the value has changed.

### Syntax
```lua
Cache.Update(name, newValue)
```

### Parameters
- **name** (string): Name of the cache entry to update
- **newValue** (any): The new value to set

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()

-- Manually update the health cache
Bridge.Cache.Update("player_health", 150)
print("Health cache manually updated to 150")
```
