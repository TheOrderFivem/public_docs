# <i class="fas fa-globe"></i> Locales

<!--META
nav: true
toc: true
description: Multi-language localization system that automatically detects server language settings and provides translation functions. Supports nested JSON structures and variable interpolation for comprehensive internationalization support.
-->

Multi-language localization system that automatically detects server language settings and provides translation functions. Supports nested JSON structures and variable interpolation for comprehensive internationalization support.

## Overview

The Locales module provides multi-language support and translation management for internationalization.

## Current Language (Client)

### Description
Function Current Language

### Syntax
```lua
Lang
```

### Returns
- (string): The current language code

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()

print('Current language:', Lang) -- Output: 'en', 'fr', 'es', etc.
```

## Locale (Client)

### Description
Function Locale

### Syntax
```lua
Bridge.Language.Locale(key, ...args)
```

### Parameters
- **key** (string): The locale key using dot notation for nested objects
- **unknown** (unknown): ...args (any) - Optional arguments for string formatting

### Returns
- (string): The localized text or the key if not found

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local text = Bridge.Language.Locale('ui.welcome_message')
print('Localized text:', text)
```

## Locale (with formatting) (Client)

### Description
Function Locale (with formatting)

### Syntax
```lua
Bridge.Language.Locale(key, arg1, arg2, ...)
```

### Parameters
- **key** (string): The locale key
- **unknown** (unknown): arg1, arg2, ... (any) - Arguments for string.format() interpolation

### Returns
- (string): The formatted localized text

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
-- In en.json: "welcome": "Welcome %s, you have %d coins"
local message = Bridge.Language.Locale('welcome', playerName, coinCount)
print(message) -- Output: Welcome John, you have 150 coins
```

## Current Language (Server)

### Description
Function Current Language

### Syntax
```lua
Lang
```

### Returns
- (string): The current language code

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()

print('Server language:', Lang)
-- Use in conditional logic
if Lang == 'es' then
    -- Spanish-specific server logic
end
```

## Locale (Server)

### Description
Function Locale

### Syntax
```lua
Bridge.Language.Locale(key, ...args)
```

### Parameters
- **key** (string): The locale key using dot notation for nested objects
- **unknown** (unknown): ...args (any) - Optional arguments for string formatting

### Returns
- (string): The localized text or the key if not found

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local errorMsg = Bridge.Language.Locale('errors.insufficient_funds')
print('Error message:', errorMsg)
```

## Locale (with formatting) (Server)

### Description
Function Locale (with formatting)

### Syntax
```lua
Bridge.Language.Locale(key, arg1, arg2, ...)
```

### Parameters
- **key** (string): The locale key
- **unknown** (unknown): arg1, arg2, ... (any) - Arguments for string.format() interpolation

### Returns
- (string): The formatted localized text

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
-- In en.json: "player_joined": "Player %s joined the server with ID %d"
local message = Bridge.Language.Locale('player_joined', playerName, playerId)
TriggerClientEvent('chat:addMessage', -1, {args = {message}})
```

