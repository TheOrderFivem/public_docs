# <i class="fas fa-question-circle"></i> HelpText

<!--META
nav: true
toc: true
description: The HelpText module provides functions for displaying and hiding help text messages on the player's screen. It supports various text UI systems.
-->

The HelpText module provides functions for displaying and hiding help text messages on the player's screen. It supports various text UI systems.

## Overview

The HelpText module provides contextual help and instruction display systems for user interface guidance.

## HideHelpText (Client)

### Description
Hides the currently displayed help text message.

### Syntax
```lua
Bridge.HelpText.HideHelpText()
```

### Returns
- (nil): No return value

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Hide any currently displayed help text
Bridge.HelpText.HideHelpText()
```

## ShowHelpText (Client)

### Description
Displays a help text message on the screen at the specified position.

### Syntax
```lua
Bridge.HelpText.ShowHelpText(message, position)
```

### Parameters
- **message** (string): The help text message to display
- **position** (string): Position on screen (top, center, bottom, etc.) (optional)

### Returns
- (nil): No return value

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Show help text at default position
Bridge.HelpText.ShowHelpText("Press [E] to interact")

-- Show help text at specific position
Bridge.HelpText.ShowHelpText("Hold [F] to enter vehicle", "center")
```

## HideHelpText (Server)

### Description
Hides help text for a specific player.

### Syntax
```lua
Bridge.HelpText.HideHelpText(src)
```

### Parameters
- **src** (number): Player server ID to hide help text for

### Returns
- (nil): No return value

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Hide help text for specific player
Bridge.HelpText.HideHelpText(source)
```

## ShowHelpText (Server)

### Description
Shows help text to a specific player.

### Syntax
```lua
Bridge.HelpText.ShowHelpText(src, message, position)
```

### Parameters
- **src** (number): Player server ID to show help text to
- **message** (string): The help text message to display
- **position** (string): Position on screen (top, center, bottom, etc.) (optional)

### Returns
- (nil): No return value

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Show help text to specific player
Bridge.HelpText.ShowHelpText(source, "Welcome! Press [F1] for help")

-- Show help text at bottom of screen
Bridge.HelpText.ShowHelpText(source, "You are now in a safe zone", "bottom")
```

## Supported Systems

| System | Resource Name |
|--------|---------------|
| Default | `_default` |
| cd drawtext | `cd_drawtext` |
| jg textui | `jg_textui` |
| lab hintui | `lab-hintui` |
| lation ui | `lation_ui` |
| okok textui | `okok_textui` |
| ox_lib | `ox_lib` |

The HelpText module provides a standardized interface for displaying contextual help messages. If no supported system is found, the system uses the default implementation which leverages native GTA V help text functionality.