# <i class="fas fa-bridge-water"></i> Community Bridge Overview

**Universal Translation Layer for FiveM** - Automatically bridging different resources with unified APIs for seamless cross-resource compatibility.

<div class="button-group">
  <a href="https://github.com/The-Order-Of-The-Sacred-Framework/community_bridge" target="_blank" class="doc-button github-button">
    <i class="fab fa-github"></i>
    GitHub
  </a>
  <a href="https://github.com/The-Order-Of-The-Sacred-Framework/community_bridge/releases" target="_blank" class="doc-button releases-button">
    <i class="fas fa-download"></i>
    Releases
  </a>
</div>

---

## <i class="fas fa-check-circle"></i> Compatibility

Community Bridge automatically detects and provides translation layers for the following resources:

### <i class="fas fa-layer-group"></i> Frameworks
- **ESX Legacy** - Complete player data, money, and job system integration
- **QBCore** - Full framework compatibility including player management
- **Custom Frameworks** - Extensible detection for custom implementations

### <i class="fas fa-cube"></i> Inventory Systems
- **ox_inventory** - Modern inventory with metadata support
- **qb-inventory** - QBCore's default inventory system
- **qs-inventory** - QuasarStore inventory implementation
- **esx_inventoryhud** - ESX inventory systems
- **Custom Inventories** - Plugin system for custom inventory resources

### <i class="fas fa-bell"></i> Notification Systems
- **ox_lib** - Modern notification system
- **qb-core** - QBCore's built-in notifications
- **esx_notify** - ESX notification system
- **okokNotify** - Popular notification resource
- **Custom Notify** - Extensible for any notification system

### <i class="fas fa-crosshairs"></i> Targeting Systems
- **ox_target** - Optimized targeting system
- **qb-target** - QBCore's targeting implementation
- **bt-target** - Alternative targeting resource
- **Custom Target** - Support for custom targeting systems

### <i class="fas fa-home"></i> Housing Systems
- **qb-houses** - QBCore housing system
- **okokHousing** - Advanced housing implementation
- **Custom Housing** - Extensible housing detection

### <i class="fas fa-university"></i> Banking Systems
- **qb-banking** - QBCore banking integration
- **esx_banking** - ESX banking systems
- **okokBanking** - Feature-rich banking system
- **Custom Banking** - Plugin support for banking resources

---

<div class="button-group">
  <a href="https://github.com/The-Order-Of-The-Sacred-Framework/community_bridge" target="_blank" class="doc-button github-button">
    <i class="fab fa-github"></i>
    GitHub
  </a>
  <a href="https://github.com/The-Order-Of-The-Sacred-Framework/community_bridge/releases" target="_blank" class="doc-button releases-button">
    <i class="fas fa-download"></i>
    Releases
  </a>
</div>

---

## <i class="fas fa-question-circle"></i> What is Community Bridge?

Community Bridge is a **universal translation layer** that automatically detects and bridges different FiveM resources, providing developers with unified APIs. Instead of learning different APIs for each inventory system, notification system, or framework, Community Bridge translates your calls to work with whatever resources are actually running on the server.

### How It Works

- **<i class="fas fa-search"></i> Auto-Detection**: Automatically detects which resources are running (ox_inventory, qb-inventory, ESX, QBCore, etc.)
- **<i class="fas fa-sync-alt"></i> API Translation**: Translates unified API calls to the specific resource's API
- **<i class="fas fa-bolt"></i> Zero Configuration**: Works out of the box - no module enabling/disabling needed
- **<i class="fas fa-bullseye"></i> Developer Focus**: Write code once, works with any compatible resource

---

## <i class="fas fa-sparkles"></i> Key Features

### <i class="fas fa-handshake"></i> Automatic Resource Detection

Community Bridge automatically detects and translates calls for:

- **<i class="fas fa-cube"></i> Frameworks**: ESX, QBCore, and others
- **<i class="fas fa-briefcase"></i> Inventories**: ox_inventory, qb-inventory, qs-inventory, and more
- **<i class="fas fa-bell"></i> Notifications**: Various notification systems
- **<i class="fas fa-crosshairs"></i> Targeting**: Different target systems
- **<i class="fas fa-home"></i> Housing**: Multiple housing resources

### <i class="fas fa-sync"></i> Unified Translation APIs

```lua
-- Write once, works with any inventory resource
local Bridge = exports['community_bridge']:Bridge()

-- Community Bridge translates this call to whatever inventory is running:
-- - ox_inventory: exports.ox_inventory:AddItem()
-- - qb-inventory: exports['qb-inventory']:AddItem()
-- - qs-inventory: exports['qs-inventory']:AddItem()
Bridge.Inventory.AddItem(source, 'bread', 5)

-- Same for notifications - works with any notification system
Bridge.Notify.SendNotify('Hello World!', 'success')
```

### <i class="fas fa-sliders-h"></i> Translation Categories

#### <i class="fas fa-cubes"></i> Core Systems
- **Framework**: Player data, money, jobs (ESX ↔ QBCore ↔ Custom)
- **Inventory**: Item management across different inventory systems
- **Notify**: Notifications across different notification resources
- **Target**: Targeting systems (qb-target, ox_target, etc.)

#### <i class="fas fa-home"></i> Advanced Systems
- **Housing**: Various housing resources
- **Banking**: Economy systems integration
- **Vehicle Systems**: Fuel, keys, and vehicle management

#### <i class="fas fa-book"></i> Utility Libraries
- **Anim**: Animation utilities
- **Cache**: Caching helpers
- **Logs**: Logging utilities
- **Math**: Mathematical functions
- **SQL**: Database helpers
- **Utility**: Common utility functions

---

## <i class="fas fa-university"></i> How Translation Works

### <i class="fas fa-search"></i> Detection Process
```
1. Server starts Community Bridge
2. Bridge scans for running resources
3. Identifies compatible resources automatically
4. Sets up translation mappings
5. Ready to translate API calls
```

### <i class="fas fa-sync-alt"></i> Translation Flow
```
Your Code → Community Bridge → Detected Resource
    ↓              ↓               ↓
Bridge.Inventory → ox_inventory → exports.ox_inventory:AddItem()
    OR             OR              OR
Bridge.Inventory → qb-inventory → exports['qb-inventory']:AddItem()
```

### <i class="fas fa-folder-open"></i> File Structure
```
📁 community_bridge/
├── 📄 fxmanifest.lua
├── 📄 init.lua
├── 📁 lib/                 # Utility libraries
│   ├── 📁 anim/
│   ├── 📁 cache/
│   ├── 📁 logs/
│   └── 📁 ...
├── 📁 modules/             # Translation modules
│   ├── 📁 framework/
│   ├── 📁 inventory/
│   ├── 📁 notify/
│   └── 📁 ...
└── 📁 settings/            # Configuration files
    ├── 📄 clientConfig.lua
    ├── 📄 serverConfig.lua
    └── 📄 sharedConfig.lua
```

---

## <i class="fas fa-rocket"></i> Getting Started

### Simple 3-Step Setup

1. **<i class="fas fa-download"></i> Download**: Get Community Bridge from GitHub
2. **<i class="fas fa-folder"></i> Install**: Place in your resources directory
3. **<i class="fas fa-play"></i> Start**: Add to server.cfg (after other resources)

```cfg
# Start your framework first
ensure qb-core          # or es_extended, etc.

# Start your other resources
ensure ox_inventory     # or qb-inventory, etc.
ensure qb-target        # or ox_target, etc.

# Start Community Bridge (must be after other resources)
ensure community_bridge

# Start your scripts that use Community Bridge
ensure your-custom-resource
```

> <i class="fas fa-exclamation-triangle"></i> **Critical**: Community Bridge must start AFTER the resources it needs to detect!

### Immediate Usage

```lua
-- No configuration needed - just use it!
local Bridge = exports['community_bridge']:Bridge()

-- Works regardless of what's actually running
Bridge.Notify.SendNotify('Community Bridge detected your resources!', 'success')
```

---

## <i class="fas fa-cog"></i> Configuration (Limited)

### Auto-Detection Override

For specific cases where auto-detection fails, you can force specific resources:

```lua
-- In sharedConfig.lua - ONLY for problematic resources
Config.Resources = {
    Inventory = 'ox_inventory',     -- Force specific inventory if detection fails
    Notify = 'qb-core',            -- Force specific notification system
    -- Most resources should be left to auto-detection
}
```

### Debug Mode

```lua
-- In serverConfig.lua or clientConfig.lua
Config.Debug = true     -- See what resources are detected
```

> <i class="fas fa-sticky-note"></i> **Note**: Unlike traditional frameworks, you DON'T enable/disable modules. Community Bridge automatically provides translation for whatever it detects.

---

## <i class="fas fa-bullseye"></i> Use Cases

### <i class="fas fa-sync-alt"></i> Multi-Server Compatibility
Write one script that works on any server:
```lua
-- Same code works whether server uses ESX or QBCore
local playerData = Bridge.Framework.GetPlayerData(source)
Bridge.Framework.AddMoney(source, 'bank', 1000)
```

### <i class="fas fa-cube"></i> Resource Migration
Server switching from ox_inventory to qb-inventory? Your scripts don't need to change:
```lua
-- This call automatically translates to whatever inventory is running
Bridge.Inventory.AddItem(source, 'bread', 5)
```

### <i class="fas fa-rocket"></i> Universal Script Development
Build scripts for the FiveM community:
```lua
-- Works on any server configuration
if Bridge.Inventory then
    Bridge.Inventory.AddItem(source, 'reward_item', 1)
end

if Bridge.Notify then
    Bridge.Notify.SendNotify('Quest completed!', 'success')
end
```

---

## <i class="fas fa-search"></i> Detection Examples

### What Gets Detected

```lua
-- Community Bridge automatically detects these patterns:

-- ESX Framework
if GetResourceState('es_extended') == 'started' then
    -- Sets up ESX translation

-- QBCore Framework
if GetResourceState('qb-core') == 'started' then
    -- Sets up QBCore translation

-- ox_inventory
if GetResourceState('ox_inventory') == 'started' then
    -- Sets up ox_inventory translation

-- And many more...
```

### Check Detection Results

```lua
local Bridge = exports['community_bridge']:Bridge()

-- See what was detected (if debug is enabled)
print('Detected Framework:', Bridge.GetDetectedFramework())
print('Detected Inventory:', Bridge.GetDetectedInventory())
```

---

## <i class="fas fa-bullseye"></i> Best Practices

### <i class="fas fa-check"></i> Development
- **Start Order**: Always start Community Bridge after target resources
- **Detection Check**: Use debug mode to verify detection is working
- **Fallbacks**: Check if modules exist before using them
- **Testing**: Test your scripts on different server configurations

### <i class="fas fa-lock"></i> Error Handling
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Always check if translation layer exists
if Bridge.Inventory then
    Bridge.Inventory.AddItem(source, 'bread', 5)
else
    print('No inventory system detected')
end
```

---

## <i class="fas fa-book"></i> Next Steps

### Essential Resources

| Resource | Description |
|----------|-------------|
| **<i class="fas fa-rocket"></i> Getting Started** | Installation and basic usage |
| **<i class="fas fa-cube"></i> Modules** | Available translation modules |
| **<i class="fas fa-book"></i> Libraries** | Utility library reference |
| **<i class="fas fa-lightbulb"></i> Examples** | Real-world implementation examples |

### Quick Validation

```lua
-- Test Community Bridge detection
local Bridge = exports['community_bridge']:Bridge()

print('Community Bridge Status:')
print('- Inventory available:', Bridge.Inventory ~= nil)
print('- Framework available:', Bridge.Framework ~= nil)
print('- Notify available:', Bridge.Notify ~= nil)
```

### Community & Support

- **<i class="fas fa-globe"></i> GitHub**: [community_bridge repository](https://github.com/The-Order-Of-The-Sacred-Framework/community_bridge)
- **<i class="fas fa-book"></i> Documentation**: Complete API translation reference
- **<i class="fas fa-bug"></i> Issues**: Report detection issues or request new resource support

---

## <i class="fas fa-star"></i> Why Use Community Bridge?

| Benefit | Description |
|---------|-------------|
| **<i class="fas fa-bolt"></i> Write Once, Run Anywhere** | Single codebase works across different server configurations |
| **<i class="fas fa-search"></i> Zero Configuration** | Automatic detection means no complex setup |
| **<i class="fas fa-bullseye"></i> Future-Proof** | New resource support added without changing your code |
| **<i class="fas fa-sync-alt"></i> Migration Friendly** | Switch resources without rewriting scripts |
| **<i class="fas fa-chart-line"></i> Community Compatible** | Build scripts that work on any server |

> **Perfect for script developers and server owners!**
>
> Community Bridge eliminates compatibility headaches by automatically translating between different FiveM resources, letting you focus on building great functionality instead of managing resource differences.
