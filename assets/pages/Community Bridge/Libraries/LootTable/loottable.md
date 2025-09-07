# LootTable 🎰

<!--META
nav: true
toc: true
description: The LootTable library provides randomized loot generation with weighted probability systems, tier-based filtering, and various selection methods for creating dynamic item rewards.
-->

The LootTable library provides randomized loot generation with weighted probability systems, tier-based filtering, and various selection methods for creating dynamic item rewards.

## Overview

The LootTable library provides comprehensive loot table functionality for randomized item distribution with support for chance-based selection, tier filtering, and different retrieval methods including one-time selections.

## Register (Server)

### Description
Registers a new loot table with items, chances, and tier configuration for randomized loot generation.

### Syntax
```lua
Bridge.LootTable.Register(name, items)
```

### Parameters
- **name** (string): Unique identifier for the loot table
- **items** (table): Table of items with min/max counts, chance percentages, tiers, and metadata

### Returns
- (table): The registered loot table in normalized format

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Register a treasure chest loot table
Bridge.LootTable.Register('treasure_chest', {
    gold_bar = {
        min = 1,
        max = 3,
        chance = 15, -- 15% chance
        tier = 1,
        item = 'gold_bar',
        metadata = {quality = 'pure'}
    },
    lockpick = {
        min = 2,
        max = 5,
        chance = 45, -- 45% chance
        tier = 1,
        item = 'lockpick'
    },
    rare_gem = {
        min = 1,
        max = 1,
        chance = 5, -- 5% chance
        tier = 2,
        item = 'rare_gem',
        metadata = {type = 'diamond'}
    }
})
```

## Get (Server)

### Description
Retrieves a registered loot table by name.

### Syntax
```lua
Bridge.LootTable.Get(name)
```

### Parameters
- **name** (string): The name of the loot table to retrieve

### Returns
- (table): The loot table or empty table if not found

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local lootTable = Bridge.LootTable.Get('treasure_chest')
if #lootTable > 0 then
    print('Found loot table with ' .. #lootTable .. ' items')
else
    print('Loot table not found')
end
```

## GetRandomItem (Server)

### Description
Gets a single random item from a loot table based on tier and chance calculations.

### Syntax
```lua
Bridge.LootTable.GetRandomItem(name, tier, randomNumber)
```

### Parameters
- **name** (string): The name of the loot table
- **tier** (number): The tier level to filter by (optional, defaults to 1)
- **randomNumber** (number): Custom random number for testing (optional)

### Returns
- (table): Random item with properties: item, metadata, count, tier, chance

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Get a random item from tier 1
local randomItem = Bridge.LootTable.GetRandomItem('treasure_chest', 1)
if randomItem then
    print('Found item:', randomItem.item, 'Count:', randomItem.count)

    -- Add to player inventory
    Bridge.Inventory.AddItem(source, randomItem.item, randomItem.count, nil, randomItem.metadata)
else
    print('No item found this time')
end
```

## GetRandomItems (Server)

### Description
Gets multiple random items from a loot table based on tier and chance calculations.

### Syntax
```lua
Bridge.LootTable.GetRandomItems(name, tier, randomNumber)
```

### Parameters
- **name** (string): The name of the loot table
- **tier** (number): The tier level to filter by (optional, defaults to 1)
- **randomNumber** (number): Custom random number for testing (optional)

### Returns
- (table): Array of random items that passed the chance check

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Get all matching items from the loot table
local items = Bridge.LootTable.GetRandomItems('treasure_chest', 1)
print('Found ' .. #items .. ' items:')

for _, item in pairs(items) do
    print('- ' .. item.item .. ' x' .. item.count)
    Bridge.Inventory.AddItem(source, item.item, item.count, nil, item.metadata)
end

if #items > 0 then
    Bridge.Notify.SendNotify('You found ' .. #items .. ' items!', 'success')
else
    Bridge.Notify.SendNotify('The chest was empty...', 'error')
end
```

## GetRandomItemsWithLimit (Server)

### Description
Gets random items from a loot table with removal to prevent duplicates. Items are removed from the table once selected.

### Syntax
```lua
Bridge.LootTable.GetRandomItemsWithLimit(name, tier, randomNumber)
```

### Parameters
- **name** (string): The name of the loot table
- **tier** (number): The tier level to filter by (optional, defaults to 1)
- **randomNumber** (number): Custom random number for testing (optional)

### Returns
- (table): Array of unique random items (items are removed from the source table)

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Get items with depletion (one-time loot)
local items = Bridge.LootTable.GetRandomItemsWithLimit('treasure_chest', 1)
for _, itemData in pairs(items) do
    -- itemData format: {item_name, metadata, count, tier, chance}
    local item, metadata, count, tier, chance = table.unpack(itemData)

    Bridge.Inventory.AddItem(source, item, count, nil, metadata)
    print('Added: ' .. item .. ' x' .. count)
end

-- Note: Selected items are removed from the loot table
print('Loot table depleted by ' .. #items .. ' items')
```
