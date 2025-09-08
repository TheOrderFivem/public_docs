# <i class="fas fa-building"></i> BossMenu

<!--META
nav: true
toc: true
description: The BossMenu module provides functions for handling business and organization boss menu management. It bridges various management systems for business operations.
-->

The BossMenu module provides functions for handling business and organization boss menu management. It bridges various management systems for business operations.

## Overview

The BossMenu module provides administrative tools and resource oversight functions for server management.

## GetResourceName (Server)

### Description
Returns the name of the management resource being used by the BossMenu module.  
In this implementation, it always returns `"esx_society"` if that resource is running.

### Syntax
```lua
Bridge.BossMenu.GetResourceName()
```

### Returns
- (string): The name of the management resource in use (e.g., `"esx_society"`)

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local resourceName = Bridge.BossMenu.GetResourceName()
print("Using management resource: " .. resourceName)
```

## OpenBossMenu (Server)

### Description
Registers a society (if not already registered) and triggers the client event to open the boss menu for the specified player, job, and job type.

### Syntax
```lua
Bridge.BossMenu.OpenBossMenu(src, jobName, jobType)
```

### Parameters
- **src** (number): The source/player ID to open the menu for.
- **jobName** (string): The job identifier/name.
- **jobType** (string): The type of job.

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.BossMenu.OpenBossMenu(source, "mechanic", "public")
```
### Returns
- (table): Account details including balance information

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local accountData = Bridge.Managment.GetAccountMoney("mechanic_shop")
if accountData.balance then
    print("Account balance: $" .. accountData.balance)
end
```
