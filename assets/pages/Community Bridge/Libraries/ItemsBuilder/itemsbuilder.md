# ItemsBuilder 🏗️

<!--META
nav: true
toc: true
description: The ItemsBuilder library provides automatic item file generation for different inventory systems (QB-Core old/new format, OX Inventory) with universal item definition conversion.
-->

The ItemsBuilder library provides automatic item file generation for different inventory systems (QB-Core old/new format, OX Inventory) with universal item definition conversion.

## Overview

The ItemsBuilder library generates item definition files in multiple formats for different inventory systems. It creates separate files for QB-Core (old format), QB-Core (new format), and OX Inventory from a single universal item definition table.

## Generate (Server)

### Description
Generates item definition files in multiple formats for different inventory systems. Creates separate files for QB-Core (old format), QB-Core (new format), and OX Inventory.

### Syntax
```lua
Bridge.ItemsBuilder.Generate(invoking, outputPrefix, itemsTable, useQB)
```

### Parameters
- **invoking** (string): Resource name to generate files for (optional, defaults to calling resource)
- **outputPrefix** (string): Folder prefix for generated files (optional, defaults to "generated_items")
- **itemsTable** (table): Table of item definitions with properties like label, weight, description, etc.
- **useQB** (boolean): Whether to use QB format instead of OX format for input table (optional)

### Returns
- (void): Creates files in the specified directory

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Define items table in OX format
local items = {
    ['gold_bar'] = {
        label = 'Gold Bar',
        weight = 1000,
        stack = 50,
        close = true,
        description = 'A valuable gold bar made from pure gold',
        client = {
            image = 'gold_bar.png'
        }
    },
    ['lockpick'] = {
        label = 'Lockpick',
        weight = 100,
        stack = 10,
        close = false,
        description = 'A professional lockpicking tool'
    },
    ['healing_potion'] = {
        label = 'Healing Potion',
        weight = 250,
        stack = 20,
        close = true,
        description = 'Restores health when consumed',
        client = {
            image = 'potion_health.png'
        }
    }
}

-- Generate item files for all inventory systems
Bridge.ItemsBuilder.Generate('my_resource', 'items', items, false)

-- This will create three files:
-- - my_resource(qb_core_old).lua
-- - my_resource(qb_core_new).lua
-- - my_resource(ox_inventory).lua
```

