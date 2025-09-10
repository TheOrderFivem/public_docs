# <i class="fas fa-archive"></i> Inventory

<!--META
nav: true
toc: true
description: The Inventory module provides a unified interface for handling player inventory items across different inventory systems. It supports various inventory systems like ox_inventory, qb-inventory, ps-inventory, and more.
-->

The Inventory module provides a unified interface for handling player inventory items across different inventory systems. It supports various inventory systems like ox_inventory, qb-inventory, ps-inventory, and more.

## Overview

The Inventory module provides item management, storage systems, and inventory interface functions.

## GetImagePath (Client)

### Description
Gets the image path for a specific item, with fallback to a default placeholder if not found.

### Syntax
```lua
Bridge.Inventory.GetImagePath(item)
```

### Parameters
- **item** (string): Name of the item

### Returns
- (string): Path to the item's image or default placeholder if not found

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local imagePath = Bridge.Inventory.GetImagePath("lockpick")
print("Lockpick image: " .. imagePath)
```

## GetItemCount (Client)

### Description
Returns the count of a specific item in the player's inventory.

### Syntax
```lua
Bridge.Inventory.GetItemCount(item)
```

### Parameters
- **item** (string): Name of the item

### Returns
- (number): Count of the item (0 if not found)

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local waterCount = Bridge.Inventory.GetItemCount("water")
print("Player has " .. waterCount .. " water bottles")
```

## GetItemInfo (Client)

### Description
Gets detailed information about a specific item from the inventory system.

### Syntax
```lua
Bridge.Inventory.GetItemInfo(item)
```

### Parameters
- **item** (string): Name of the item

### Returns
- (table): Table containing item information: {name, label, stack, weight, description, image}

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local itemInfo = Bridge.Inventory.GetItemInfo("phone")
if itemInfo then
    print("Item label: " .. itemInfo.label)
    print("Item weight: " .. itemInfo.weight)
end
```

## HasItem (Client)

### Description
Checks if the player has a specific item in their inventory.

### Syntax
```lua
Bridge.Inventory.HasItem(item)
```

### Parameters
- **item** (string): Name of the item

### Returns
- (boolean): True if the player has the item, false otherwise

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

if Bridge.Inventory.HasItem("lockpick") then
    print("Player has a lockpick")
else
    print("Player doesn't have a lockpick")
end
```

## GetPlayerInventory (Client)

### Description
Returns the player's entire inventory in a standardized format.

### Syntax
```lua
Bridge.Inventory.GetPlayerInventory()
```

### Returns
- (table): Array of inventory items: {name, label, count, slot, metadata}

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local inventory = Bridge.Inventory.GetPlayerInventory()
for i, item in pairs(inventory) do
    print(item.label .. " x" .. item.count)
end
```

## StripPNG (Client)

### Description
Removes the .png extension from an item name if present.

### Syntax
```lua
Bridge.Inventory.StripPNG(item)
```

### Parameters
- **item** (string): Item name that may contain .png extension

### Returns
- (string): Item name without .png extension

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local cleanName = Bridge.Inventory.StripPNG("phone.png")
print(cleanName) -- outputs: phone
```

## AddItem (Server)

### Description
Adds an item to a player's inventory with optional metadata.

### Syntax
```lua
Bridge.Inventory.AddItem(src, item, count, slot, metadata)
```

### Parameters
- **src** (number): Player server ID
- **item** (string): Name of the item
- **count** (number): Amount to add
- **slot** (number): Specific slot to add to (optional)
- **metadata** (table): Additional item metadata (optional)

### Returns
- (boolean): Success status of operation

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Add 1 phone with metadata
local success = Bridge.Inventory.AddItem(source, "phone", 1, nil, { number = "555-123-4567" })
if success then
    print("Added phone to inventory")
else
    print("Failed to add phone")
end
```

## RemoveItem (Server)

### Description
Removes an item from a player's inventory.

### Syntax
```lua
Bridge.Inventory.RemoveItem(src, item, count, slot, metadata)
```

### Parameters
- **src** (number): Player server ID
- **item** (string): Name of the item
- **count** (number): Amount to remove
- **slot** (number): Specific slot to remove from (optional)
- **metadata** (table): Specific item metadata to match (optional)

### Returns
- (boolean): Success status of operation

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Remove 2 water bottles
local success = Bridge.Inventory.RemoveItem(source, "water", 2)
if success then
    print("Removed water from inventory")
else
    print("Failed to remove water")
end
```

## GetItemCount (Server)

### Description
Gets the count of an item in a player's inventory, with optional metadata matching.

### Syntax
```lua
Bridge.Inventory.GetItemCount(src, item, metadata)
```

### Parameters
- **src** (number): Player server ID
- **item** (string): Name of the item
- **metadata** (table): Specific item metadata to match (optional)

### Returns
- (number): Count of the specified item

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Get count of lockpicks
local count = Bridge.Inventory.GetItemCount(source, "lockpick")
print("Player has " .. count .. " lockpicks")
```

## AddTrunkItems (Server)

### Description
Adds multiple items to a vehicle trunk inventory.

### Syntax
```lua
Bridge.Inventory.AddTrunkItems(identifier, items)
```

### Parameters
- **identifier** (string): Vehicle plate or unique identifier
- **items** (table): Array of items to add: {item, count, metadata}

### Returns
- (boolean): Success status of operation

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local items = {
    {item = "water", count = 5},
    {item = "bread", count = 3}
}
local success = Bridge.Inventory.AddTrunkItems("ABC123", items)
```

## AddItemsToTrunk (Server)

### Description
Alternative method to add items to a vehicle trunk.

### Syntax
```lua
Bridge.Inventory.AddItemsToTrunk(identifier, items)
```

### Parameters
- **identifier** (string): Vehicle identifier
- **items** (table): Items to add to trunk

### Returns
- (boolean): Success status

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Inventory.AddItemsToTrunk(vehicleId, itemsArray)
```

## CanCarryItem (Server)

### Description
Checks if a player can carry additional items without exceeding weight limits.

### Syntax
```lua
Bridge.Inventory.CanCarryItem(src, item, count)
```

### Parameters
- **src** (number): Player server ID
- **item** (string): Name of the item
- **count** (number): Amount to check

### Returns
- (boolean): True if player can carry the items

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

if Bridge.Inventory.CanCarryItem(source, "gold_bar", 5) then
    print("Player can carry 5 gold bars")
else
    print("Player cannot carry that much weight")
end
```

## ClearStash (Server)

### Description
Clears all items from a specific stash inventory.

### Syntax
```lua
Bridge.Inventory.ClearStash(id, type)
```

### Parameters
- **id** (string): Stash identifier
- **type** (string): Type of stash

### Returns
- (boolean): Success status

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Inventory.ClearStash("evidence_locker", "stash")
```

## GetImagePath (Server)

### Description
Server-side function to get item image path.

### Syntax
```lua
Bridge.Inventory.GetImagePath(item)
```

### Parameters
- **item** (string): Item name

### Returns
- (string): Image path for the item

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local imagePath = Bridge.Inventory.GetImagePath("lockpick")
```

## GetItem (Server)

### Description
Gets a specific item from player inventory by name.

### Syntax
```lua
Bridge.Inventory.GetItem(src, item)
```

### Parameters
- **src** (number): Player server ID
- **item** (string): Item name

### Returns
- (table): Item data or nil if not found

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local item = Bridge.Inventory.GetItem(source, "phone")
```

## GetItemBySlot (Server)

### Description
Gets an item from a specific inventory slot.

### Syntax
```lua
Bridge.Inventory.GetItemBySlot(src, slot)
```

### Parameters
- **src** (number): Player server ID
- **slot** (number): Inventory slot number

### Returns
- (table): Item data or nil if slot is empty

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local item = Bridge.Inventory.GetItemBySlot(source, 1)
```

## GetItemInfo (Server)

### Description
Server-side function to get detailed item information.

### Syntax
```lua
Bridge.Inventory.GetItemInfo(item)
```

### Parameters
- **item** (string): Item name

### Returns
- (table): Item information table

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local itemInfo = Bridge.Inventory.GetItemInfo("lockpick")
```

## GetPlayerInventory (Server)

### Description
Server-side function to get a player's complete inventory.

### Syntax
```lua
Bridge.Inventory.GetPlayerInventory(src)
```

### Parameters
- **src** (number): Player server ID

### Returns
- (table): Player's inventory data

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local inventory = Bridge.Inventory.GetPlayerInventory(source)
```

## HasItem (Server)

### Description
Server-side function to check if a player has a specific item.

### Syntax
```lua
Bridge.Inventory.HasItem(src, item)
```

### Parameters
- **src** (number): Player server ID
- **item** (string): Item name

### Returns
- (boolean): True if player has the item

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

if Bridge.Inventory.HasItem(source, "lockpick") then
    print("Player has a lockpick")
end
```

## OpenShop (Server)

### Description
Server-side function to open a shop for a player.

### Syntax
```lua
Bridge.Inventory.OpenShop(src, shopId)
```

### Parameters
- **src** (number): Player server ID
- **shopId** (string): Shop identifier

### Returns
- (nil): No return value

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Inventory.OpenShop(source, "general_store")
```

## OpenStash (Server)

### Description
Opens a stash interface for the player.

### Syntax
```lua
Bridge.Inventory.OpenStash(src, type, id)
```

### Parameters
- **source** (number): Player Identifier
- **idontknowwhythisishere** (string): Just set it to "stash"
- **stashId** (string): Unique identifier for the stash

### Returns
- (nil): No return value

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local data = {
  id = "someid",
  name = "somename",
  slots = 10,
  maxweight = 400000,
}
-- only needs to be registered once. If called again for same id, will do nothing
Bridge.Inventory.RegisterStash(data.id, data.name, data.slots, data.maxweight) 
Bridge.Inventory.OpenStash(src, 'stash', data.id)
```

## RegisterShop (Server)

### Description
Registers a new shop with the inventory system.

### Syntax
```lua
Bridge.Inventory.RegisterShop(shopData)
```

### Parameters
- **shopData** (table): Shop configuration data

### Returns
- (boolean): Success status

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local shopData = {
    name = "General Store",
    items = {{item = "water", price = 10}}
}
Bridge.Inventory.RegisterShop(shopData)
```

## RegisterStash (Server)

### Description
Registers a new stash inventory.

### Syntax
```lua
Bridge.Inventory.RegisterStash(id, label, slots, weight)
```

### Parameters
- **id** (string): Unique stash identifier
- **label** (string): Display name for the stash
- **slots** (number): Number of inventory slots
- **weight** (number): Maximum weight capacity

### Returns
- (boolean): Success status

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local data = {
  id = "someid",
  name = "somename",
  slots = 10,
  maxweight = 400000,
}
-- only needs to be registered once. If called again for same id, will do nothing
Bridge.Inventory.RegisterStash(data.id, data.name, data.slots, data.maxweight) 
Bridge.Inventory.OpenStash(src, 'stash', data.id)
```

## SetMetadata (Server)

### Description
Sets metadata for a specific item in player inventory.

### Syntax
```lua
Bridge.Inventory.SetMetadata(src, slot, metadata)
```

### Parameters
- **src** (number): Player server ID
- **slot** (number): Inventory slot
- **metadata** (table): Metadata to set

### Returns
- (boolean): Success status

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Inventory.SetMetadata(source, 1, {durability = 50})
```

## StripPNG (Server)

### Description
Server-side function to remove .png extension from item names.

### Syntax
```lua
Bridge.Inventory.StripPNG(item)
```

### Parameters
- **item** (string): Item name

### Returns
- (string): Item name without extension

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local cleanName = Bridge.Inventory.StripPNG("phone.png")
```

## UpdatePlate (Server)

### Description
Updates the plate identifier for a vehicle trunk inventory.

### Syntax
```lua
Bridge.Inventory.UpdatePlate(oldPlate, newPlate)
```

### Parameters
- **oldPlate** (string): Current plate number
- **newPlate** (string): New plate number

### Returns
- (boolean): Success status

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Inventory.UpdatePlate("ABC123", "XYZ789")
```

## Supported Systems

| System | Resource Name |
|--------|---------------|
| Codem Inventory | `codem-inventory` |
| Core Inventory | `core_inventory` |
| JPR Inventory | `jpr-inventory` |
| Origen Inventory | `origen_inventory` |
| Ox Inventory | `ox_inventory` |
| PS Inventory | `ps-inventory` |
| QB Inventory | `qb-inventory` |
| QS Inventory | `qs-inventory` |
| Tgiann Inventory | `tgiann-inventory` |

The system automatically detects which inventory resource is available and uses the appropriate implementation. If no supported inventory system is found, it falls back to the default system using framework inventory functions. All inventory functions are standardized across different systems to ensure compatibility.

