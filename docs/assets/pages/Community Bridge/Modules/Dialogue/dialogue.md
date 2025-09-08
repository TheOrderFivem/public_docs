# <i class="fas fa-comments"></i> Dialogue

<!--META
nav: true
toc: true
description: The Dialogue module provides a modern web-based dialogue system for NPC interactions. It features automatic camera positioning and responsive UI design.
-->

The Dialogue module provides a modern web-based dialogue system for NPC interactions. It features automatic camera positioning and responsive UI design.

## Overview

The Dialogue module provides interactive conversation systems with NPC dialog management and player choice handling.

## Close (Client)

### Description
Closes a specific dialogue instance.

### Syntax
```lua
Bridge.Dialogue.Close(name)
```

### Parameters
- **name** (string): Name of the dialogue to close

### Returns
- (nil): No return value

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Close a specific dialogue
Bridge.Dialogue.Close("shop_keeper")
```

## Open (Client)

### Description
Opens a dialogue interface with NPC and presents options to the player.

### Syntax
```lua
Bridge.Dialogue.Open(name, dialogue, characterOptions, dialogueOptions, onSelected)
```

### Parameters
- **name** (string): Unique identifier for this dialogue instance
- **dialogue** (string): The text that the NPC says
- **characterOptions** (number|table): Entity handle or table with entity, offset, and rotationOffset
- **dialogueOptions** (table): Array of dialogue choices with id and label
- **onSelected** (function): Callback function when player selects an option (optional)

### Returns
- (string): ID of the selected dialogue option

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Simple dialogue with entity handle
local npc = GetClosestPed(GetEntityCoords(PlayerPedId()), 5.0)
local choice = Bridge.Dialogue.Open(
    "shop_keeper",
    "Welcome to my shop! What can I help you with?",
    npc,
    {
        {id = "buy", label = "I want to buy something"},
        {id = "sell", label = "I want to sell items"},
        {id = "leave", label = "Just browsing, thanks"}
    }
)

if choice == "buy" then
    -- Open shop interface
elseif choice == "sell" then
    -- Open sell interface
end
```

