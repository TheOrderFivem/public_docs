# Basic Usage Examples

This guide provides practical examples of how to use Community Bridge modules in your FiveM server.


Before using any Community Bridge functions, ensure the resource is started and properly configured on your server.


```lua
-- server.lua or client.lua
-- Community Bridge is automatically available as 'Bridge' global
```


The HelpText module provides functions for displaying help messages to players.


```lua
-- Client-side: Show a simple help text
Bridge.HelpText.ShowHelpText("Press E to interact", "center")

-- Show help text with custom position
Bridge.HelpText.ShowHelpText("Vehicle unlocked!", "top")

-- Show help text with custom styling
Bridge.HelpText.ShowHelpText("Important message", "bottom", {
    backgroundColor = "#ff0000",
    textColor = "#ffffff",
    duration = 3000
})
```


```lua
-- Hide the currently displayed help text
Bridge.HelpText.HideHelpText()

-- Hide after a specific delay
Citizen.SetTimeout(5000, function()
    Bridge.HelpText.HideHelpText()
end)
```


The Notify module handles different types of notifications.


```lua
-- Client-side notifications
Bridge.Notify.Success("Operation completed successfully!")
Bridge.Notify.Error("Something went wrong!")
Bridge.Notify.Info("Here's some information")
Bridge.Notify.Warning("Be careful!")

-- Custom notification
Bridge.Notify.Custom("Custom message", "purple", 5000)
```


```lua
-- server.lua
-- Send notification to specific player
Bridge.Notify.Player(playerId, "success", "Welcome to the server!")

-- Send notification to all players
Bridge.Notify.All("info", "Server restart in 5 minutes")
```


The Target module provides interaction zones and entity targeting.


```lua
-- client.lua
-- Add target options to a vehicle
local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)

Bridge.Target.AddEntity(vehicle, {
    {
        label = "Check Engine",
        icon = "fas fa-wrench",
        action = function(entity)
            Bridge.Notify.Info("Checking engine...")
            -- Your engine check logic here
        end,
        canInteract = function(entity)
            return IsVehicleEngineOn(entity)
        end
    },
    {
        label = "Lock/Unlock",
        icon = "fas fa-lock",
        action = function(entity)
            -- Toggle vehicle lock
            local locked = GetVehicleDoorLockStatus(entity) == 2
            SetVehicleDoorsLocked(entity, locked and 1 or 2)
            Bridge.Notify.Success(locked and "Vehicle unlocked" or "Vehicle locked")
        end
    }
})
```


```lua
-- Create an interaction zone
Bridge.Target.AddZone("gas_station_pump", {
    coords = vector3(265.0, -1261.0, 29.0),
    size = vector3(2.0, 2.0, 2.0),
    rotation = 0.0,
    options = {
        {
            label = "Refuel Vehicle",
            icon = "fas fa-gas-pump",
            action = function(coords)
                local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
                if vehicle and vehicle ~= 0 then
                    -- Start refueling process
                    TriggerEvent('fuel:startRefueling', vehicle)
                else
                    Bridge.Notify.Error("You need to be in a vehicle!")
                end
            end,
            canInteract = function(coords)
                local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
                return vehicle and vehicle ~= 0
            end
        }
    }
})
```


The Menu module provides various menu interfaces.


```lua
-- Show a context menu
Bridge.Menu.Context({
    {
        header = "Vehicle Options",
        isMenuHeader = true
    },
    {
        header = "Engine",
        txt = "Toggle engine on/off",
        params = {
            event = "vehicle:toggleEngine",
            args = {}
        }
    },
    {
        header = "Doors",
        txt = "Open/close doors",
        params = {
            event = "vehicle:toggleDoors",
            args = {}
        }
    }
})
```


```lua
-- Show input dialog
Bridge.Menu.Input({
    header = "Character Information",
    submitText = "Submit",
    inputs = {
        {
            text = "First Name",
            name = "firstname",
            type = "text",
            isRequired = true
        },
        {
            text = "Last Name",
            name = "lastname",
            type = "text",
            isRequired = true
        },
        {
            text = "Age",
            name = "age",
            type = "number",
            isRequired = true
        }
    }
}, function(result)
    if result then
        Bridge.Notify.Success("Character created: " .. result.firstname .. " " .. result.lastname)
        -- Process character creation
    end
end)
```


The Progressbar module provides progress indicators for actions.


```lua
-- Show a progress bar
Bridge.Progressbar.Start({
    label = "Repairing vehicle...",
    duration = 5000,
    useWhileDead = false,
    canCancel = true,
    disableControls = {
        disableMovement = true,
        disableCarMovement = true,
        disableMouse = false,
        disableCombat = true
    }
}, function(cancelled)
    if not cancelled then
        Bridge.Notify.Success("Vehicle repaired!")
        -- Apply repair logic
    else
        Bridge.Notify.Error("Repair cancelled")
    end
end)
```


```lua
-- Progress bar with animation
Bridge.Progressbar.Start({
    label = "Picking lock...",
    duration = 8000,
    useWhileDead = false,
    canCancel = true,
    animation = {
        dict = "anim@amb@clubhouse@tutorial@bkr_tut_ig3@",
        clip = "machinic_loop_mechandplayer"
    },
    prop = {
        model = "prop_tool_screwdvr01",
        bone = 57005,
        coords = vector3(0.12, 0.04, 0.001),
        rotation = vector3(90.0, 0.0, 90.0)
    }
}, function(cancelled)
    if not cancelled then
        Bridge.Notify.Success("Lock picked successfully!")
        -- Unlock door logic
    end
end)
```


Integration with inventory systems.


```lua
-- Server-side: Add item to player
Bridge.Inventory.AddItem(playerId, "water", 5, {
    quality = 100,
    metadata = {
        expiry = os.time() + (24 * 60 * 60) -- 24 hours
    }
})
```


```lua
-- Server-side: Check if player has item
if Bridge.Inventory.HasItem(playerId, "lockpick", 1) then
    -- Player has lockpick, proceed with action
    Bridge.Inventory.RemoveItem(playerId, "lockpick", 1)
    TriggerClientEvent("lockpicking:start", playerId)
else
    Bridge.Notify.Player(playerId, "error", "You need a lockpick!")
end
```



```lua
-- Complex interaction example
function StartVehicleRepair(vehicle)
    -- Check if player has required items
    Bridge.Callback.Trigger("inventory:hasItems", function(hasItems)
        if hasItems then
            -- Show target options
            Bridge.Target.AddEntity(vehicle, {
                {
                    label = "Repair Engine",
                    action = function()
                        -- Start progress bar
                        Bridge.Progressbar.Start({
                            label = "Repairing engine...",
                            duration = 10000,
                            animation = {
                                dict = "mini@repair",
                                clip = "fixing_a_ped"
                            }
                        }, function(cancelled)
                            if not cancelled then
                                -- Complete repair
                                SetVehicleEngineHealth(vehicle, 1000.0)
                                Bridge.Notify.Success("Engine repaired!")

                                -- Remove items on server
                                TriggerServerEvent("vehicle:removeRepairItems")
                            end
                        end)
                    end
                }
            })
        else
            Bridge.Notify.Error("You don't have the required repair items!")
        end
    end, {
        {item = "wrench", amount = 1},
        {item = "engine_oil", amount = 2}
    })
end
```


```lua
-- client.lua
RegisterNetEvent("shop:openMenu")
AddEventHandler("shop:openMenu", function(shopData)
    local menuItems = {}

    for i, item in ipairs(shopData.items) do
        table.insert(menuItems, {
            header = item.label,
            txt = "Price: $" .. item.price,
            params = {
                event = "shop:buyItem",
                args = {
                    item = item.name,
                    price = item.price
                }
            }
        })
    end

    Bridge.Menu.Context(menuItems)
end)

RegisterNetEvent("shop:buyItem")
AddEventHandler("shop:buyItem", function(data)
    Bridge.Progressbar.Start({
        label = "Purchasing item...",
        duration = 2000
    }, function(cancelled)
        if not cancelled then
            TriggerServerEvent("shop:completePurchase", data.item, data.price)
        end
    end)
end)
```



```lua
-- Always check if functions exist before calling
if Bridge.HelpText and Bridge.HelpText.ShowHelpText then
    Bridge.HelpText.ShowHelpText("Message", "center")
else
    print("HelpText module not available")
end
```


```lua
-- Clean up when resource stops
AddEventHandler("onResourceStop", function(resource)
    if resource == GetCurrentResourceName() then
        -- Remove targets
        Bridge.Target.RemoveAll()

        -- Hide UI elements
        Bridge.HelpText.HideHelpText()
        Bridge.Menu.CloseAll()
    end
end)
```


```lua
-- Use citizens/threads efficiently
Citizen.CreateThread(function()
    while true do
        local sleep = 1000

        if IsPlayerNearSomething() then
            sleep = 100
            -- Show help text or targets
        end

        Citizen.Wait(sleep)
    end
end)
```

These examples should give you a solid foundation for using Community Bridge in your FiveM server. Remember to check the specific API documentation for each module for complete function signatures and options.
