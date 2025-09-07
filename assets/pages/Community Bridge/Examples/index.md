# Code Examples

This page contains practical examples of how to use Community Bridge in your FiveM resources.



```lua
fx_version 'cerulean'
game 'gta5'

author 'Your Name'
description 'Example resource using Community Bridge'
version '1.0.0'

-- Dependencies
dependency 'community-bridge'

-- Client scripts
client_scripts {
    'client/*.lua'
}

-- Server scripts
server_scripts {
    'server/*.lua'
}
```



```lua
-- Client-side
local balance = Bridge.Banking.GetBalance()
if balance > 1000 then
    Bridge.Notify.Send("You have enough money!", "success")
else
    Bridge.Notify.Send("Insufficient funds", "error")
end
```


```lua
-- Server-side
RegisterCommand('transfer', function(source, args)
    local amount = tonumber(args[1])
    local targetId = tonumber(args[2])

    if amount and targetId then
        local success = Bridge.Banking.TransferMoney(source, targetId, amount)
        if success then
            Bridge.Notify.Send(source, 'Transfer successful!', 'success')
            Bridge.Notify.Send(targetId, 'You received $' .. amount, 'info')
        else
            Bridge.Notify.Send(source, 'Transfer failed!', 'error')
        end
    end
end)
```



```lua
-- Server-side
RegisterCommand('giveitem', function(source, args)
    local item = args[1]
    local amount = tonumber(args[2]) or 1

    local success = Bridge.Inventory.AddItem(source, item, amount)
    if success then
        Bridge.Notify.Send(source, 'Item added to inventory', 'success')
    else
        Bridge.Notify.Send(source, 'Could not add item', 'error')
    end
end)
```


```lua
-- Client or Server
local breadCount = Bridge.Inventory.GetItemCount('bread')
print('Player has ' .. breadCount .. ' bread')
```



```lua
-- Success notification
Bridge.Notify.Send('Operation completed!', 'success')

-- Error notification
Bridge.Notify.Send('Something went wrong!', 'error')

-- Info notification
Bridge.Notify.Send('New message received', 'info')

-- Warning notification
Bridge.Notify.Send('Low health warning', 'warning')
```


```lua
-- Notification with duration
Bridge.Notify.Send('This message lasts 10 seconds', 'info', 10000)

-- Notification with position
Bridge.Notify.SendAdvanced({
    message = 'Custom positioned notification',
    type = 'success',
    position = 'top-right',
    duration = 5000
})
```



```lua
-- Client-side
Bridge.Target.AddBoxZone('example_shop', vector3(100.0, 200.0, 30.0), 2.0, 2.0, {
    name = 'example_shop',
    heading = 0.0,
    debugPoly = false,
}, {
    options = {
        {
            icon = 'fas fa-shopping-cart',
            label = 'Open Shop',
            action = function()
                -- Open shop menu
                TriggerEvent('openShop')
            end
        }
    },
    distance = 2.0
})
```


```lua
-- Target vehicles
Bridge.Target.AddEntityZone('vehicle_interaction', GetPlayerPed(-1), {
    options = {
        {
            icon = 'fas fa-key',
            label = 'Lock/Unlock Vehicle',
            action = function(entity)
                local plate = GetVehicleNumberPlateText(entity)
                TriggerServerEvent('toggleVehicleLock', plate)
            end,
            canInteract = function(entity)
                return IsPedInAnyVehicle(GetPlayerPed(-1), false)
            end
        }
    },
    distance = 3.0
})
```



```lua
-- Always check if Bridge is available
if Bridge and Bridge.Banking then
    local balance = Bridge.Banking.GetBalance()
    -- Use balance...
else
    print('Bridge not available')
end

-- Use pcall for error handling
local success, result = pcall(function()
    return Bridge.Banking.WithdrawMoney(1000)
end)

if success then
    print('Withdrawal successful: ' .. tostring(result))
else
    print('Withdrawal failed: ' .. result)
end
```


Enable debug mode in your config for detailed logging:

```lua
Config.Debug = true
```

This will show additional console output for troubleshooting.


1. **Always check availability**: Ensure Bridge modules are loaded before using them
2. **Handle errors gracefully**: Use pcall or check return values
3. **Use meaningful variable names**: Make your code readable
4. **Comment your code**: Explain complex logic
5. **Test thoroughly**: Verify functionality across different frameworks
6. **Keep it simple**: Don't over-complicate basic operations



```lua
local Bridge = nil

Citizen.CreateThread(function()
    while not GetResourceState('community-bridge') == 'started' do
        Citizen.Wait(100)
    end

    Bridge = exports['community-bridge']:GetBridge()

    -- Now safe to use Bridge functions
    initializeResource()
end)

function initializeResource()
    -- Your initialization code here
    print('Resource initialized with Bridge')
end
```


```lua
-- Register events for cross-resource communication
RegisterNetEvent('myresource:updateBalance')
AddEventHandler('myresource:updateBalance', function(newBalance)
    Bridge.Notify.Send('Balance updated: $' .. newBalance, 'info')
end)

-- Server-side balance update
AddEventHandler('playerMoneyChange', function(playerId, newAmount)
    TriggerClientEvent('myresource:updateBalance', playerId, newAmount)
end)
```
