# 🌉 Community Bridge Overview

> **A Universal Translation Layer for FiveM** - Automatically bridging different resources with unified APIs for seamless cross-resource compatibility.

---

## 🤔 What is Community Bridge?

Community Bridge is a **universal translation layer** that automatically detects and bridges different FiveM resources, providing developers with unified APIs. Instead of learning different APIs for each inventory system, notification system, or framework, Community Bridge translates your calls to work with whatever resources are actually running on the server.

### How It Works

- **🔍 Auto-Detection**: Automatically detects which resources are running (ox_inventory, qb-inventory, ESX, QBCore, etc.)
- **🔄 API Translation**: Translates unified API calls to the specific resource's API
- **⚡ Zero Configuration**: Works out of the box - no module enabling/disabling needed
- **🎯 Developer Focus**: Write code once, works with any compatible resource

---

## ✨ Key Features

### 🤝 Automatic Resource Detection

Community Bridge automatically detects and translates calls for:

- **📦 Frameworks**: ESX, QBCore, and others
- **🎒 Inventories**: ox_inventory, qb-inventory, qs-inventory, and more
- **📢 Notifications**: Various notification systems
- **🎯 Targeting**: Different target systems
- **🏠 Housing**: Multiple housing resources

### 🔄 Unified Translation APIs

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

### 🎛️ Translation Categories

Community Bridge provides translation layers for:

#### 📦 Core Systems
- **Framework**: Player data, money, jobs (ESX ↔ QBCore ↔ Custom)
- **Inventory**: Item management across different inventory systems
- **Notify**: Notifications across different notification resources
- **Target**: Targeting systems (qb-target, ox_target, etc.)

#### 🏠 Advanced Systems
- **Housing**: Various housing resources
- **Banking**: Economy systems integration
- **Vehicle Systems**: Fuel, keys, and vehicle management

#### 📚 Utility Libraries
- **Anim**: Animation utilities
- **Cache**: Caching helpers
- **Logs**: Logging utilities
- **Math**: Mathematical functions
- **SQL**: Database helpers
- **Utility**: Common utility functions

---

## 🏛️ How Translation Works

### 🔍 Detection Process
```
1. Server starts Community Bridge
2. Bridge scans for running resources
3. Identifies compatible resources automatically
4. Sets up translation mappings
5. Ready to translate API calls
```

### 🔄 Translation Flow
```
Your Code → Community Bridge → Detected Resource
    ↓              ↓               ↓
Bridge.Inventory → ox_inventory → exports.ox_inventory:AddItem()
    OR             OR              OR
Bridge.Inventory → qb-inventory → exports['qb-inventory']:AddItem()
```

### 📁 File Structure
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

## 🚀 Getting Started

### Simple 3-Step Setup

1. **📥 Download**: Get Community Bridge from GitHub
2. **📂 Install**: Place in your resources directory
3. **▶️ Start**: Add to server.cfg (after other resources)

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

> ⚠️ **Critical**: Community Bridge must start AFTER the resources it needs to detect!

### Immediate Usage

```lua
-- No configuration needed - just use it!
local Bridge = exports['community_bridge']:Bridge()

-- Works regardless of what's actually running
Bridge.Notify.SendNotify('Community Bridge detected your resources!', 'success')
```

---

## ⚙️ Configuration (Limited)

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

> 📝 **Note**: Unlike traditional frameworks, you DON'T enable/disable modules. Community Bridge automatically provides translation for whatever it detects.

---

## 🎯 Use Cases

### 🔄 Multi-Server Compatibility
Write one script that works on any server:
```lua
-- Same code works whether server uses ESX or QBCore
local playerData = Bridge.Framework.GetPlayerData(source)
Bridge.Framework.AddMoney(source, 'bank', 1000)
```

### 📦 Resource Migration
Server switching from ox_inventory to qb-inventory? Your scripts don't need to change:
```lua
-- This call automatically translates to whatever inventory is running
Bridge.Inventory.AddItem(source, 'bread', 5)
```

### 🚀 Universal Script Development
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

## 🔍 Detection Examples

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

## 🎯 Best Practices

### ✅ Development
- **Start Order**: Always start Community Bridge after target resources
- **Detection Check**: Use debug mode to verify detection is working
- **Fallbacks**: Check if modules exist before using them
- **Testing**: Test your scripts on different server configurations

### 🔒 Error Handling
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

## 📚 Next Steps

### Essential Resources

| Resource | Description |
|----------|-------------|
| **🚀 Getting Started** | Installation and basic usage |
| **📦 Modules** | Available translation modules |
| **📚 Libraries** | Utility library reference |
| **💡 Examples** | Real-world implementation examples |

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

- **🌐 GitHub**: [community_bridge repository](https://github.com/The-Order-Of-The-Sacred-Framework/community_bridge)
- **📖 Documentation**: Complete API translation reference
- **🐛 Issues**: Report detection issues or request new resource support

---

## 🌟 Why Use Community Bridge?

| Benefit | Description |
|---------|-------------|
| **⚡ Write Once, Run Anywhere** | Single codebase works across different server configurations |
| **🔍 Zero Configuration** | Automatic detection means no complex setup |
| **🎯 Future-Proof** | New resource support added without changing your code |
| **🔄 Migration Friendly** | Switch resources without rewriting scripts |
| **📈 Community Compatible** | Build scripts that work on any server |

> **Perfect for script developers and server owners!**
>
> Community Bridge eliminates compatibility headaches by automatically translating between different FiveM resources, letting you focus on building great functionality instead of managing resource differences.
