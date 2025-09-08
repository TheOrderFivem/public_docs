# <i class="fas fa-file-alt"></i> Logs

<!--META
nav: true
toc: true
description: The Logs library provides unified logging functionality that supports multiple logging systems including built-in Discord webhooks, qb-log, and ox_lib. It automatically formats player information and timestamps for comprehensive audit trails.
-->

The Logs library provides unified logging functionality that supports multiple logging systems including built-in Discord webhooks, qb-log, and ox_lib. It automatically formats player information and timestamps for comprehensive audit trails.

## Overview

The Logs library provides comprehensive logging functionality with different log levels, file output, and structured logging for debugging and monitoring FiveM resources.

## CreateLog (Server)

### Description
Sends a log message to the configured logging system. Supports built-in Discord webhooks, qb-log, and ox_lib logging systems based on server configuration.

### Syntax
```lua
Bridge.Logs.CreateLog(src, message)
```

### Parameters
- **message** (string): The log message to send

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Log a player action
Bridge.Logs.CreateLog("Player purchased a vehicle: Adder for $1,000,000")

-- Log an admin action
Bridge.Logs.CreateLog("Admin spawned vehicle: adder at coordinates (100, 200, 30)")

-- Log a system event
Bridge.Logs.CreateLog("Player completed heist with reward: $50,000")
```

