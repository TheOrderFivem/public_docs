# Table 📊

<!--META
nav: true
toc: true
description: The Table utility library provides comprehensive table manipulation functions including deep cloning, searching, comparison, and data transformation operations. Essential for data processing and state management throughout the system.
-->

The Table utility library provides comprehensive table manipulation functions including deep cloning, searching, comparison, and data transformation operations. Essential for data processing and state management throughout the system.

## Overview

The Table library provides advanced table manipulation functions including deep comparison, merging, searching, filtering, and other table operations for complex data structures in Lua.

## CheckPopulated (Shared)

### Description
Checks if a table contains any data, handling both array-style and key-value tables.

### Syntax
```lua
Bridge.Table.CheckPopulated(tbl)
```

### Parameters
- **tbl** (table): Table to check for data

### Returns
- (boolean): True if table contains data, false if empty

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local emptyArray = {}
local emptyTable = {}
local populatedTable = {key = 'value'}

print(Bridge.Table.CheckPopulated(emptyArray)) -- false
print(Bridge.Table.CheckPopulated(populatedTable)) -- true
```

## DeepClone (Shared)

### Description
Creates a deep copy of a table, recursively cloning nested tables with optional omission of specific keys.

### Syntax
```lua
Bridge.Table.DeepClone(tbl, out, omit)
```

### Parameters
- **tbl** (table): Table to clone
- **out** (table | nil): Optional existing table to clone into
- **omit** (table | nil): Table of keys to omit from cloning

### Returns
- (table): Deep cloned table

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local original = {
    name = 'Player',
    stats = { health = 100, armor = 50 },
    password = 'secret'
}

local clone = Bridge.Table.DeepClone(original, nil, {password = true})
print(clone.name) -- 'Player'
print(clone.stats.health) -- 100
print(clone.password) -- nil (omitted)
```

## TableContains (Shared)

### Description
Searches for a value in a table with optional nested searching.

### Syntax
```lua
Bridge.Table.TableContains(tbl, search, nested)
```

### Parameters
- **tbl** (table): Table to search in
- **search** (any): Value to search for
- **nested** (boolean | nil): Whether to search recursively in nested tables

### Returns
- (boolean): True if value is found
- (any): The found value

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local data = {'apple', 'banana', {fruit = 'orange'}}

local found, value = Bridge.Table.TableContains(data, 'apple')
print(found) -- true

local foundNested = Bridge.Table.TableContains(data, 'orange', true)
print(foundNested) -- true
```

## TableContainsKey (Shared)

### Description
Checks if a table contains a specific key.

### Syntax
```lua
Bridge.Table.TableContainsKey(tbl, search)
```

### Parameters
- **tbl** (table): Table to search in
- **search** (any): Key to search for

### Returns
- (boolean): True if key exists
- (any): The found key

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local player = {name = 'John', health = 100}

local hasKey, key = Bridge.Table.TableContainsKey(player, 'name')
print(hasKey) -- true
print(key) -- 'name'
```

## TableGetKeys (Shared)

### Description
Returns an array of all keys in a table.

### Syntax
```lua
Bridge.Table.TableGetKeys(tbl)
```

### Parameters
- **tbl** (table): Table to get keys from

### Returns
- (table): Array of table keys

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local player = {name = 'John', health = 100, level = 5}
local keys = Bridge.Table.TableGetKeys(player)
-- keys = {'name', 'health', 'level'}
```

## GetClosest (Shared)

### Description
Finds the closest object to given coordinates from a table of objects with .coords property.

### Syntax
```lua
Bridge.Table.GetClosest(coords, tbl)
```

### Parameters
- **coords** (vector3): Reference coordinates
- **tbl** (table): Table of objects with .coords property

### Returns
- (table | nil): Closest object or nil if none found

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local playerCoords = GetEntityCoords(PlayerPedId())
local shops = {
    {name = 'Shop A', coords = vector3(100, 100, 20)},
    {name = 'Shop B', coords = vector3(200, 200, 20)}
}

local closest = Bridge.Table.GetClosest(playerCoords, shops)
print('Closest shop: ' .. closest.name)
```

## FindFirstUnoccupiedSlot (Shared)

### Description
Finds the first available slot number in a table of items with .slot property.

### Syntax
```lua
Bridge.Table.FindFirstUnoccupiedSlot(tbl)
```

### Parameters
- **tbl** (table): Table of items with .slot property

### Returns
- (number | nil): First available slot number or nil if all slots occupied

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local inventory = {
    {item = 'bread', slot = 1},
    {item = 'water', slot = 3}
}

local availableSlot = Bridge.Table.FindFirstUnoccupiedSlot(inventory)
print('Available slot: ' .. availableSlot) -- 2
```

## Append (Shared)

### Description
Appends all values from the second table to the first table.

### Syntax
```lua
Bridge.Table.Append(tbl1, tbl2)
```

### Parameters
- **tbl1** (table): Target table to append to
- **tbl2** (table): Source table to append from

### Returns
- (table): The modified first table

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local list1 = {'apple', 'banana'}
local list2 = {'cherry', 'date'}

Bridge.Table.Append(list1, list2)
-- list1 = {'apple', 'banana', 'cherry', 'date'}
```

## Split (Shared)

### Description
Splits a table into two parts at the specified size.

### Syntax
```lua
Bridge.Table.Split(tbl, size)
```

### Parameters
- **tbl** (table): Table to split
- **size** (number | nil): Split point (defaults to middle of table)

### Returns
- (table): First part of the split
- (table): Second part of the split

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local numbers = {1, 2, 3, 4, 5, 6}
local first, second = Bridge.Table.Split(numbers, 3)
-- first = {1, 2, 3}
-- second = {4, 5, 6}
```

## Shuffle (Shared)

### Description
Randomly shuffles the elements of a table using Fisher-Yates algorithm.

### Syntax
```lua
Bridge.Table.Shuffle(tbl)
```

### Parameters
- **tbl** (table): Table to shuffle

### Returns
- (table): The shuffled table (same reference)

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local deck = {'A', 'K', 'Q', 'J'}
Bridge.Table.Shuffle(deck)
print('Shuffled deck: ' .. table.concat(deck, ', '))
```

## Compare (Shared)

### Description
Performs deep comparison between two values, recursively comparing nested tables.

### Syntax
```lua
Bridge.Table.Compare(a, b)
```

### Parameters
- **a** (any): First value to compare
- **b** (any): Second value to compare

### Returns
- (boolean): True if values are deeply equal

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local table1 = {name = 'John', stats = {health = 100}}
local table2 = {name = 'John', stats = {health = 100}}
local table3 = {name = 'Jane', stats = {health = 100}}

print(Bridge.Table.Compare(table1, table2)) -- true
print(Bridge.Table.Compare(table1, table3)) -- false
```

