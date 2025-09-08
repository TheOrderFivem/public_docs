# <i class="fas fa-keyboard"></i> Input

<!--META
nav: true
toc: true
description: The Input module provides a unified interface for creating input dialogs and forms. It supports both ox_lib and qb-input formats with automatic conversion.
-->

The Input module provides a unified interface for creating input dialogs and forms. It supports both ox_lib and qb-input formats with automatic conversion.

## Overview

The Input module provides user input handling and validation systems for forms, prompts, and data entry.

## Open (Client)

### Description
Opens an input dialog with specified fields and configuration.

### Syntax
```lua
Bridge.Input.Open(title, data, isQBFormat, submitText)
```

### Parameters
- **title** (string): Title of the input dialog
- **data** (table): Input configuration data (format depends on isQBFormat)
- **isQBFormat** (boolean): Whether the data is in QB-Core format (will be auto-converted) (optional)
- **submitText** (string): Text for the submit button (default: 'Submit') (optional)

### Returns
- (table|nil): Table with input values, or nil if cancelled

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- ox_lib format
local result = Bridge.Input.Open("Player Information", {
    {
        type = 'input',
        label = 'First Name',
        description = 'Enter your first name',
        required = true,
        max = 50
    },
    {
        type = 'input',
        label = 'Last Name',
        description = 'Enter your last name',
        required = true,
        max = 50
    },
    {
        type = 'number',
        label = 'Age',
        description = 'Enter your age',
        required = true,
        min = 18,
        max = 100
    }
})

if result then
    print("First Name: " .. result[1])
    print("Last Name: " .. result[2])
    print("Age: " .. result[3])
else
    print("Input cancelled")
end
```

