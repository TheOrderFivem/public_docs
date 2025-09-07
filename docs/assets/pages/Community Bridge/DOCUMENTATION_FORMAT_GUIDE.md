# Documentation Format Guide 📖

This guide explains how to document functions using the new markdown-based format in the Community Bridge documentation system.

## Overview

The new documentation system uses standard markdown with a specific structure to automatically generate function cards with proper styling, syntax highlighting, and navigation.

## Function Documentation Format

Functions should be documented using the following markdown structure:

```markdown
## FunctionName (Client/Server/Shared)

### Description
Brief description of what the function does.

### Syntax
```lua
FunctionName(param1, param2)
```

### Parameters
- **paramName** (type): Description of the parameter
- **anotherParam** (type): Description of another parameter

### Returns
- (returnType): Description of what is returned

### Example
```lua
-- Example usage
local result = FunctionName("example", 123)
print(result)
```
```

## Required Elements

### Function Header
- Must start with `##` followed by the function name
- Must include the context in parentheses: `(Client)`, `(Server)`, or `(Shared)`
- Case doesn't matter for the context

### Section Headers
All sections use `###` headers:
- `### Description` - Required
- `### Syntax` - Optional but recommended
- `### Parameters` - Optional, omit if no parameters
- `### Returns` - Optional, omit if void function
- `### Example` - Optional but highly recommended

## Parameter Format

Parameters should be listed as markdown list items with this format:
```markdown
- **parameterName** (type): Description of the parameter
```

Example:
```markdown
### Parameters
- **playerId** (number): The server ID of the player
- **data** (table): Data table containing player information
- **callback** (function): Optional callback function (can be nil)
```

## Returns Format

Returns should be listed as markdown list items with this format:
```markdown
- (returnType): Description of what is returned
```

Example:
```markdown
### Returns
- (boolean): Returns true if the operation was successful
- (table): Returns player data table if found, nil otherwise
```

## Code Blocks

Use standard markdown code blocks with lua syntax highlighting:
````markdown
```lua
local result = MyFunction("test", 123)
```
````

## Example Functions

Here are some complete examples:

## GetPlayerData (Server)

### Description
Retrieves player data from the database by player ID.

### Syntax
```lua
GetPlayerData(playerId, callback)
```

### Parameters
- **playerId** (number): The server ID of the player
- **callback** (function): Callback function that receives the player data

### Returns
- (boolean): Returns true if the request was processed successfully

### Example
```lua
GetPlayerData(source, function(data)
    if data then
        print("Player name: " .. data.name)
        print("Player money: " .. data.money)
    else
        print("Player not found")
    end
end)
```

## ShowNotification (Client)

### Description
Displays a notification to the player with customizable styling.

### Syntax
```lua
ShowNotification(message, type, duration)
```

### Parameters
- **message** (string): The message to display
- **type** (string): Notification type ("info", "success", "warning", "error")
- **duration** (number): Duration in milliseconds (optional, defaults to 5000)

### Returns
- (number): Returns the notification ID for later manipulation

### Example
```lua
-- Show a success notification for 3 seconds
local notifId = ShowNotification("Operation completed successfully!", "success", 3000)

-- Show an error with default duration
ShowNotification("Something went wrong!", "error")
```

## IsPlayerReady (Shared)

### Description
Checks if a player is fully loaded and ready for interactions.

### Syntax
```lua
IsPlayerReady(playerId)
```

### Parameters
- **playerId** (number): The player ID to check

### Returns
- (boolean): Returns true if the player is ready, false otherwise

### Example
```lua
if IsPlayerReady(source) then
    -- Player is ready, proceed with operations
    TriggerClientEvent("myevent", source, data)
else
    -- Player not ready, wait or handle accordingly
    print("Player not ready yet")
end
```

## Benefits of This Format

1. **Clean and Readable**: Standard markdown that's easy to read and write
2. **No Complex JSON**: No need to escape quotes or worry about JSON syntax
3. **Syntax Highlighting**: Proper code highlighting in both documentation and editors
4. **Version Control Friendly**: Easy to see changes in git diffs
5. **Editor Support**: Works with any markdown editor or preview
6. **Automatic Processing**: Functions are automatically parsed and displayed as cards
7. **Search Integration**: Functions are automatically indexed for search
8. **TOC Generation**: Table of contents is automatically generated

## Migration from FNC Format

If you have existing FNC blocks, you can use the conversion script:

```bash
node convert-fnc-to-markdown.js "assets/pages"
```

This will automatically convert all `<--FNC ... FNC-->` blocks to the new markdown format.

## Tips

1. **Be Consistent**: Always use the same parameter and return format
2. **Include Examples**: Examples make functions much easier to understand
3. **Use Clear Descriptions**: Explain not just what the function does, but when to use it
4. **Document Edge Cases**: Mention what happens with invalid inputs
5. **Keep It Updated**: Update documentation when function signatures change

## File Organization

- Each library or module should have its own `.md` file
- Functions can be mixed (client, server, shared) in the same file
- The documentation system will automatically group and sort functions
- Use descriptive file names that match the module structure
