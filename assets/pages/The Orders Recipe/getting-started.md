# Getting Started with The Orders Recipe 🚀

This guide will walk you through the essential steps to start using The Orders Recipe patterns in your FiveM development workflow.

## Prerequisites

Before diving into The Orders Recipe, ensure you have:

### **Required Knowledge**
- Basic Lua programming
- FiveM development fundamentals
- Understanding of client-server architecture
- Familiarity with your chosen framework (ESX, QBCore, or Standalone)

### **Development Environment**
- **FiveM Server** (latest version recommended)
- **Code Editor** (VS Code, Sublime Text, or similar)
- **Community Bridge** installed and configured
- **Git** for version control (recommended)

## Installation Steps

### Step 1: Install Community Bridge

If you haven't already, install Community Bridge on your server:

```bash
# Clone the repository
git clone https://github.com/YourOrg/community-bridge.git

# Or download from releases
# Extract to your resources folder
```

Add to your `server.cfg`:
```cfg
ensure community-bridge
```

### Step 2: Configure Your Framework

Update your Community Bridge configuration for your framework:

```lua
-- config.lua
Config = {
    Framework = 'esx', -- 'esx', 'qbcore', or 'standalone'
    Debug = true, -- Enable for development
    
    -- Database settings
    Database = {
        Type = 'mysql', -- or 'sqlite'
        Host = 'localhost',
        Database = 'your_database',
        Username = 'your_username',
        Password = 'your_password'
    }
}
```

### Step 3: Verify Installation

Create a simple test resource to verify everything is working:

```lua
-- test_resource/fxmanifest.lua
fx_version 'cerulean'
game 'gta5'

dependency 'community-bridge'

client_script 'client.lua'
server_script 'server.lua'
```

```lua
-- test_resource/client.lua
Citizen.CreateThread(function()
    while not Bridge do
        Citizen.Wait(100)
    end
    
    print('Community Bridge loaded successfully!')
    
    -- Test notification
    Bridge.Notify.Send('Test notification', 'success')
end)
```

```lua
-- test_resource/server.lua
print('Test resource started with Community Bridge')

RegisterCommand('test', function(source)
    Bridge.Notify.Send(source, 'Command test successful!', 'info')
end)
```

## Your First Recipe Implementation

Let's implement a simple banking notification system using The Orders Recipe patterns:

### Recipe: Smart Banking Notifications

This recipe shows how to create contextual banking notifications that inform players about their financial status.

```lua
-- client/banking_notifications.lua
local BankingNotifications = {}

-- Initialize the system
function BankingNotifications:Init()
    self:RegisterEvents()
    self:StartMonitoring()
end

-- Register necessary events
function BankingNotifications:RegisterEvents()
    RegisterNetEvent('banking:updateBalance')
    AddEventHandler('banking:updateBalance', function(newBalance, oldBalance)
        self:HandleBalanceChange(newBalance, oldBalance)
    end)
end

-- Handle balance changes with smart notifications
function BankingNotifications:HandleBalanceChange(newBalance, oldBalance)
    local difference = newBalance - oldBalance
    
    if difference > 0 then
        -- Money received
        local message = string.format('Received $%s', self:FormatMoney(difference))
        Bridge.Notify.Send(message, 'success', 5000)
        
        -- Special notifications for large amounts
        if difference >= 10000 then
            Bridge.Notify.SendAdvanced({
                message = 'Large deposit detected! Check your account.',
                type = 'info',
                position = 'top-center',
                duration = 8000
            })
        end
    elseif difference < 0 then
        -- Money spent/withdrawn
        local amount = math.abs(difference)
        local message = string.format('Spent $%s', self:FormatMoney(amount))
        Bridge.Notify.Send(message, 'warning', 3000)
        
        -- Low balance warning
        if newBalance < 1000 and newBalance > 0 then
            Bridge.Notify.Send('Low balance warning!', 'error', 6000)
        elseif newBalance <= 0 then
            Bridge.Notify.Send('Account overdrawn!', 'error', 10000)
        end
    end
end

-- Format money with commas
function BankingNotifications:FormatMoney(amount)
    return tostring(amount):reverse():gsub('(%d%d%d)', '%1,'):reverse():gsub('^,', '')
end

-- Start the monitoring system
function BankingNotifications:StartMonitoring()
    Citizen.CreateThread(function()
        local lastBalance = Bridge.Banking.GetBalance()
        
        while true do
            Citizen.Wait(5000) -- Check every 5 seconds
            
            local currentBalance = Bridge.Banking.GetBalance()
            if currentBalance ~= lastBalance then
                TriggerEvent('banking:updateBalance', currentBalance, lastBalance)
                lastBalance = currentBalance
            end
        end
    end)
end

-- Initialize when resource starts
Citizen.CreateThread(function()
    while not Bridge do
        Citizen.Wait(100)
    end
    
    BankingNotifications:Init()
end)
```

### Recipe Explanation

This recipe demonstrates several important patterns:

1. **Modular Design**: Encapsulating functionality in a clear class structure
2. **Event-Driven Architecture**: Using events for loose coupling
3. **Smart Notifications**: Context-aware user feedback
4. **Resource Management**: Proper initialization and cleanup
5. **Error Prevention**: Checking for dependencies before use

## Next Steps

### **Explore More Recipes**
- Player progression systems
- Inventory management patterns
- Administrative tool development
- Performance optimization techniques

### **Join the Community**
- Share your own recipes
- Get help with implementation
- Contribute improvements

### **Watch Video Tutorials**
Visit our [Video Tutorials](./video-tutorials.md) page for visual learning experiences.

## Troubleshooting

### Common Issues

**Bridge not loading**
- Ensure Community Bridge is started before your resource
- Check for dependency declaration in fxmanifest.lua

**Events not firing**
- Verify event names match exactly
- Check client vs server event registration

**Performance issues**
- Review thread timing and frequency
- Implement proper cleanup in event handlers

### Getting Help

If you encounter issues:

1. Check the console for error messages
2. Enable debug mode in Community Bridge config
3. Ask for help in our Discord community
4. Review the troubleshooting section in our documentation

---

*Ready to start cooking up amazing FiveM resources? Dive into The Orders Recipe and transform your development workflow!*
