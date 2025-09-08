# <i class="fas fa-rocket"></i> Getting Started with Community Bridge

> **Welcome to Community Bridge!** A universal compatibility layer for FiveM that bridges different frameworks and resources, providing unified APIs for common functionality like inventories, notifications, and more.

---

## <i class="fas fa-clipboard-list"></i> Prerequisites

Before getting started, make sure you have:

| Requirement | Description |
|-------------|-------------|
| <i class="fas fa-desktop"></i> **FiveM Server** | A working FiveM server instance |
| <i class="fas fa-code"></i> **Lua Knowledge** | Basic understanding of Lua scripting |
| <i class="fas fa-wrench"></i> **Framework** | Any supported framework (ESX, QBCore, etc.) or standalone |
| <i class="fas fa-cube"></i> **Resources** | Compatible inventory/notification resources (optional) |

> <i class="fas fa-info-circle"></i> **Note**: Community Bridge works standalone or with existing frameworks - no database setup required!

---

## <i class="fas fa-cube"></i> Installation

### Simple 3-Step Setup

1. <i class="fas fa-download"></i> **Download** the latest release from [GitHub](https://github.com/The-Order-Of-The-Sacred-Framework/community_bridge)
2. <i class="fas fa-folder"></i> **Extract** and place the `community_bridge` folder in your resources directory
3. <i class="fas fa-play"></i> **Start** the resource in your `server.cfg`

```bash
# Example directory structure
resources/
├── [essential]/
├── [framework]/        # Your framework (if using one)
├── [inventory]/       # Your inventory resource (if using one)
└── community_bridge/  # 👈 Community Bridge installation
```

### Server Configuration

Add Community Bridge to your `server.cfg`:

```cfg
# Start your framework first (if using one)
ensure qb-core          # or es_extended, etc.

# Start inventory/other resources
ensure qb-inventory     # or ox_inventory, qs-inventory, etc.

# Start Community Bridge (preferably near the end)
ensure community_bridge

# Start your custom resources that use Community Bridge
ensure your-custom-resource
```

> <i class="fas fa-exclamation-triangle"></i> **Start Order**: Place Community Bridge after your framework and inventory resources for best compatibility.

---

## <i class="fas fa-handshake"></i> How It Works

### Auto-Detection Magic

Community Bridge automatically detects and bridges with:

- **<i class="fas fa-cube"></i> Frameworks**: ESX, QBCore, and more
- **<i class="fas fa-briefcase"></i> Inventories**: ox_inventory, qb-inventory, qs-inventory, and others
- **<i class="fas fa-bullhorn"></i> Notifications**: Various notification systems
- **<i class="fas fa-bullseye"></i> Targeting**: Different target systems
- **<i class="fas fa-home"></i> Housing**: Multiple housing resources

### Universal API

Instead of learning different APIs for each resource, use one consistent interface:

```lua
-- Works with ANY compatible inventory resource
local Bridge = exports['community_bridge']:Bridge()

-- Add items regardless of inventory system
Bridge.Inventory.AddItem(source, 'bread', 5)

-- Send notifications regardless of notification system
Bridge.Notify.SendNotify('Hello World!', 'success')
```

---

## <i class="fas fa-laptop-code"></i> Basic Usage

### Getting Started with Bridge

```lua
-- Initialize the bridge in any script
local Bridge = exports['community_bridge']:Bridge()

-- Now you can use any module
Bridge.Notify.SendNotify('Community Bridge is working!', 'success')
```

### Example Implementations

#### <i class="fas fa-briefcase"></i> Inventory Operations
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Add items (works with ox_inventory, qb-inventory, qs-inventory, etc.)
Bridge.Inventory.AddItem(source, 'bread', 5)
Bridge.Inventory.AddItem(source, 'water', 3, nil, {quality = 100})

-- Remove items
local removed = Bridge.Inventory.RemoveItem(source, 'bread', 2)
if removed then
    Bridge.Notify.SendNotify('Ate some bread!', 'success')
end

-- Get item count
local breadCount = Bridge.Inventory.GetItemCount(source, 'bread')
print('Player has ' .. breadCount .. ' bread')
```

#### <i class="fas fa-bullhorn"></i> Notifications
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Client-side notifications
Bridge.Notify.SendNotify('✅ Task completed!', 'success', 5000)
Bridge.Notify.SendNotify('❌ Something went wrong!', 'error')
Bridge.Notify.SendNotify('ℹ️ Information message', 'info')

-- Server-side notifications to players
Bridge.Notify.Player(source, 'Welcome to the server!', 'success')
```

#### <i class="fas fa-bullseye"></i> Framework Integration
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Get player data (works with ESX, QBCore, etc.)
local playerData = Bridge.Framework.GetPlayerData(source)
if playerData then
    print('Player name: ' .. playerData.name)
end

-- Add money (framework-agnostic)
Bridge.Framework.AddMoney(source, 'bank', 1000)
```

---

## <i class="fas fa-cog"></i> Configuration

### Settings Overview

Community Bridge uses configuration files in the `settings/` folder to customize behavior:

| File | Purpose |
|------|---------|
| `clientConfig.lua` | <i class="fas fa-gamepad"></i> Client-side settings and preferences |
| `serverConfig.lua` | <i class="fas fa-server"></i> Server-side configuration |
| `sharedConfig.lua` | <i class="fas fa-sync-alt"></i> Shared settings for modules and resources |

### Module Configuration

Enable or disable specific modules in `sharedConfig.lua`:

```lua
Config.Modules = {
    -- Core Modules
    Framework = true,    -- <i class="fas fa-check"></i> Framework bridging (ESX, QBCore, etc.)
    Inventory = true,    -- <i class="fas fa-check"></i> Inventory bridging
    Notify = true,       -- <i class="fas fa-check"></i> Notification bridging

    -- Optional Modules
    Target = true,       -- <i class="fas fa-check"></i> Target system bridging
    Housing = false,     -- <i class="fas fa-times"></i> Disable housing bridge
    Banking = true,      -- <i class="fas fa-check"></i> Banking/economy bridging
    Skills = false,      -- <i class="fas fa-times"></i> Disable skills system
}
```

### Resource Override

Force specific resources instead of auto-detection:

```lua
Config.Resources = {
    Inventory = 'ox_inventory',     -- Force ox_inventory
    Notify = 'qb-core',            -- Force QB-Core notifications
    Target = 'qb-target',          -- Force qb-target
    -- Leave others as 'auto' for auto-detection
}
```

---

## <i class="fas fa-wrench"></i> Advanced Features

### Multi-Resource Support

Community Bridge can work with multiple resources simultaneously:

```lua
-- Example: Different players using different inventory systems
-- Community Bridge handles the differences automatically

-- Player 1 using ox_inventory
Bridge.Inventory.AddItem(player1, 'bread', 5)

-- Player 2 using qb-inventory
Bridge.Inventory.AddItem(player2, 'bread', 5)

-- Same code, different underlying systems!
```

### Resource Detection

Check what resources are detected:

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Get detected resources
local detectedInventory = Bridge.GetResourceName('Inventory')
local detectedFramework = Bridge.GetResourceName('Framework')

print('Using inventory: ' .. detectedInventory)
print('Using framework: ' .. detectedFramework)
```

### Debug Mode

Enable debug logging to see what's happening:

```lua
-- In serverConfig.lua or clientConfig.lua
Config.Debug = true

-- View logs in console to see:
-- - Resource detection
-- - Bridge initialization
-- - Function calls and redirections
```

---

## <i class="fas fa-ban"></i> Troubleshooting

### Common Issues

#### Module Not Working
| Problem | Solution |
|---------|----------|
| Function not found | <i class="fas fa-check"></i> Check if the module is enabled in config |
| Resource not detected | <i class="fas fa-search"></i> Verify resource is started before Community Bridge |
| Wrong inventory used | <i class="fas fa-cog"></i> Set specific resource in config override |

#### Resource Detection Issues
| Problem | Solution |
|---------|----------|
| Bridge using wrong resource | <i class="fas fa-edit"></i> Use resource override in config |
| Multiple resources conflict | <i class="fas fa-bullseye"></i> Disable conflicting resources or set priority |
| Resource not supported | <i class="fas fa-book"></i> Check compatibility list in documentation |

### Debug Steps

1. **Enable Debug Mode**: Set `Config.Debug = true`
2. **Check Console**: Look for Community Bridge startup messages
3. **Verify Resources**: Ensure target resources are running
4. **Test Basic Functions**: Try simple operations like notifications
5. **Check Configuration**: Review module and resource settings

---

## <i class="fas fa-book"></i> Next Steps

### Explore the Documentation

| Section | Description |
|---------|-------------|
| [<i class="fas fa-cube"></i> Modules](./Modules/) | Core modules like Framework, Inventory, Notify |
| [<i class="fas fa-book"></i> Libraries](./Libraries/) | Utility libraries for common tasks |
| [<i class="fas fa-lightbulb"></i> Examples](./Examples/) | Real-world usage examples |

### Quick Examples

```lua
-- Basic resource usage template
local Bridge = exports['community_bridge']:Bridge()

-- Check if modules are available
if Bridge.Inventory then
    Bridge.Inventory.AddItem(source, 'bread', 1)
end

if Bridge.Notify then
    Bridge.Notify.SendNotify('Item added!', 'success')
end

if Bridge.Framework then
    local playerData = Bridge.Framework.GetPlayerData(source)
    print('Player: ' .. (playerData.name or 'Unknown'))
end
```

### Community & Support

- <i class="fas fa-globe"></i> **GitHub**: [community_bridge repository](https://github.com/The-Order-Of-The-Sacred-Framework/community_bridge)
- <i class="fas fa-book"></i> **Documentation**: Explore modules and libraries in this documentation
- <i class="fas fa-bug"></i> **Issues**: Report bugs and request features on GitHub

> <i class="fas fa-rocket"></i> **Ready to build?** Start with the [Module Documentation](./Modules/) to see all available functionality!
