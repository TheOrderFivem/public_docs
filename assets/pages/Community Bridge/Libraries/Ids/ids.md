# Ids 🆔

<!--META
nav: true
toc: true
description: The Ids library provides utilities for generating unique identifiers with various character patterns. It ensures uniqueness by checking against existing tables and supports custom patterns and lengths.
-->

The Ids library provides utilities for generating unique identifiers with various character patterns. It ensures uniqueness by checking against existing tables and supports custom patterns and lengths.

## Overview

The Ids library provides unique identifier generation and management for creating UUIDs, sequential IDs, and other identifier systems for data integrity and uniqueness.

## CreateUniqueId (Shared)

### Description
Generates a unique identifier with customizable length and character pattern. Checks against a table to ensure uniqueness.

### Syntax
```lua
Ids.CreateUniqueId(tbl, len, pattern)
```

### Parameters
- **tbl** (table | nil): Table to check for existing IDs (uses keys for uniqueness check)
- **len** (number | nil): Length of the ID to generate (default: 8)
- **pattern** (string | nil): Custom character pattern to use (default: uppercase letters and numbers)

### Returns
- (string): A unique identifier

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()

local existingIds = { ABC123 = true, DEF456 = true }
local newId = Bridge.Ids.CreateUniqueId(existingIds, 6)
print("Generated unique ID: " .. newId)

-- Custom pattern (only vowels)
local vowelId = Bridge.Ids.CreateUniqueId({}, 4, "AEIOU")
print("Vowel ID: " .. vowelId)
```

## RandomUpper (Shared)

### Description
Generates a unique identifier using only uppercase letters.

### Syntax
```lua
Ids.RandomUpper(tbl, len)
```

### Parameters
- **tbl** (table): Table to check for existing IDs
- **len** (number): Length of the ID to generate

### Returns
- (string): A unique uppercase letter identifier

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()

local players = {}
local playerId = Bridge.Ids.RandomUpper(players, 8)
players[playerId] = { name = "John", level = 1 }
print("Player ID: " .. playerId)
```

## RandomLower (Shared)

### Description
Generates a unique identifier using only lowercase letters.

### Syntax
```lua
Ids.RandomLower(tbl, len)
```

### Parameters
- **tbl** (table): Table to check for existing IDs
- **len** (number): Length of the ID to generate

### Returns
- (string): A unique lowercase letter identifier

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()

local sessions = {}
local sessionId = Bridge.Ids.RandomLower(sessions, 10)
sessions[sessionId] = { startTime = GetGameTimer() }
print("Session ID: " .. sessionId)
```

## RandomString (Shared)

### Description
Generates a unique identifier using both uppercase and lowercase letters.

### Syntax
```lua
Ids.RandomString(tbl, len)
```

### Parameters
- **tbl** (table): Table to check for existing IDs
- **len** (number): Length of the ID to generate

### Returns
- (string): A unique mixed-case letter identifier

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()

local tokens = {}
local accessToken = Bridge.Ids.RandomString(tokens, 12)
tokens[accessToken] = { userId = 123, expires = GetGameTimer() + 3600000 }
print("Access token: " .. accessToken)
```

## RandomNumber (Shared)

### Description
Generates a unique identifier using only numeric characters.

### Syntax
```lua
Ids.RandomNumber(tbl, len)
```

### Parameters
- **tbl** (table): Table to check for existing IDs
- **len** (number): Length of the ID to generate

### Returns
- (string): A unique numeric identifier

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()

local orders = {}
local orderId = Bridge.Ids.RandomNumber(orders, 6)
orders[orderId] = { items = {"bread", "milk"}, total = 15.50 }
print("Order ID: " .. orderId)
```

## Random (Shared)

### Description
Generates a unique identifier using the default pattern (uppercase letters and numbers).

### Syntax
```lua
Ids.Random(tbl, len)
```

### Parameters
- **tbl** (table): Table to check for existing IDs
- **len** (number): Length of the ID to generate

### Returns
- (string): A unique alphanumeric identifier

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()

local vehicles = {}
local vehicleId = Bridge.Ids.Random(vehicles, 8)
vehicles[vehicleId] = { model = "adder", plate = "FAST123" }
print("Vehicle ID: " .. vehicleId)
```

