# Advanced Examples

This section covers advanced usage patterns and integration examples for Community Bridge.



Here's an example of creating a complex vehicle interaction system that uses multiple modules:

```lua
-- client.lua
local VehicleInteraction = {}

function VehicleInteraction.CreateAdvancedMenu(vehicle)
    local vehicleData = {
        model = GetEntityModel(vehicle),
        plate = GetVehicleNumberPlateText(vehicle),
        engine = GetVehicleEngineHealth(vehicle),
        body = GetVehicleBodyHealth(vehicle)
    }

    -- Create comprehensive vehicle menu
    Bridge.Menu.Context({
        {
            header = "🚗 " .. GetDisplayNameFromVehicleModel(vehicleData.model),
            txt = "Plate: " .. vehicleData.plate,
            isMenuHeader = true
        },
        {
            header = "🔧 Repair Options",
            txt = "Engine: " .. math.floor(vehicleData.engine/10) .. "% | Body: " .. math.floor(vehicleData.body/10) .. "%",
            params = {
                event = "vehicle:repairMenu",
                args = { vehicle = vehicle }
            }
        },
        {
            header = "🎨 Customization",
            txt = "Modify vehicle appearance",
            params = {
                event = "vehicle:customizationMenu",
                args = { vehicle = vehicle }
            }
        },
        {
            header = "📊 Diagnostics",
            txt = "Run vehicle diagnostics",
            params = {
                event = "vehicle:diagnostics",
                args = { vehicle = vehicle }
            }
        }
    })
end

-- Advanced repair system with skill checks
RegisterNetEvent("vehicle:repairMenu")
AddEventHandler("vehicle:repairMenu", function(data)
    local vehicle = data.vehicle

    Bridge.Callback.Trigger("vehicle:getRepairSkill", function(skillLevel)
        local repairOptions = {
            {
                header = "🔧 Engine Repair",
                txt = "Skill Required: " .. (skillLevel >= 50 and "✅" or "❌") .. " Mechanic Level 2",
                params = {
                    event = "vehicle:startRepair",
                    args = {
                        vehicle = vehicle,
                        type = "engine",
                        skillRequired = 50,
                        duration = 15000,
                        items = {"wrench", "engine_oil", "spark_plug"}
                    }
                }
            },
            {
                header = "🛠️ Body Repair",
                txt = "Skill Required: " .. (skillLevel >= 25 and "✅" or "❌") .. " Mechanic Level 1",
                params = {
                    event = "vehicle:startRepair",
                    args = {
                        vehicle = vehicle,
                        type = "body",
                        skillRequired = 25,
                        duration = 8000,
                        items = {"hammer", "metal_sheet"}
                    }
                }
            }
        }

        Bridge.Menu.Context(repairOptions)
    end)
end)

RegisterNetEvent("vehicle:startRepair")
AddEventHandler("vehicle:startRepair", function(data)
    -- Check skill level
    Bridge.Callback.Trigger("player:hasSkillLevel", function(hasSkill)
        if not hasSkill then
            Bridge.Notify.Error("You don't have the required skill level!")
            return
        end

        -- Check required items
        Bridge.Callback.Trigger("inventory:hasItems", function(hasItems)
            if not hasItems then
                Bridge.Notify.Error("You're missing required items!")
                return
            end

            -- Start mini-game for skill check
            VehicleInteraction.StartRepairMinigame(data)

        end, data.items)
    end, "mechanic", data.skillRequired)
end)

function VehicleInteraction.StartRepairMinigame(repairData)
    -- Show target zones for skill-based interaction
    Bridge.Target.AddEntity(repairData.vehicle, {
        {
            label = "🎯 Repair (" .. repairData.type .. ")",
            action = function()
                VehicleInteraction.PerformRepair(repairData)
            end
        }
    })

    Bridge.HelpText.ShowHelpText("Target the repair area and press E", "center")
end

function VehicleInteraction.PerformRepair(repairData)
    Bridge.Target.RemoveEntity(repairData.vehicle)
    Bridge.HelpText.HideHelpText()

    -- Advanced progress bar with multiple stages
    local stages = {
        {label = "Diagnosing issue...", duration = 2000},
        {label = "Removing damaged parts...", duration = 3000},
        {label = "Installing new parts...", duration = 5000},
        {label = "Testing repair...", duration = 2000}
    }

    VehicleInteraction.RunRepairStages(repairData, stages, 1)
end

function VehicleInteraction.RunRepairStages(repairData, stages, currentStage)
    if currentStage > #stages then
        -- Repair complete
        VehicleInteraction.CompleteRepair(repairData)
        return
    end

    local stage = stages[currentStage]

    Bridge.Progressbar.Start({
        label = stage.label,
        duration = stage.duration,
        useWhileDead = false,
        canCancel = true,
        animation = {
            dict = "mini@repair",
            clip = "fixing_a_ped"
        },
        disableControls = {
            disableMovement = true,
            disableCarMovement = true,
            disableCombat = true
        }
    }, function(cancelled)
        if cancelled then
            Bridge.Notify.Error("Repair cancelled!")
            return
        end

        -- Move to next stage
        VehicleInteraction.RunRepairStages(repairData, stages, currentStage + 1)
    end)
end

function VehicleInteraction.CompleteRepair(repairData)
    TriggerServerEvent("vehicle:completeRepair", repairData)

    Bridge.Notify.Success("Repair completed successfully!")

    -- Add XP for successful repair
    TriggerServerEvent("skills:addXP", "mechanic", 25)

    -- Show repair summary
    Bridge.Menu.Context({
        {
            header = "✅ Repair Complete",
            txt = "Vehicle " .. repairData.type .. " has been repaired",
            isMenuHeader = true
        },
        {
            header = "💰 Cost",
            txt = "$" .. (repairData.cost or 0),
        },
        {
            header = "⭐ XP Gained",
            txt = "+25 Mechanic XP"
        }
    })
end
```


```lua
-- Advanced shop system with dynamic content
local ShopSystem = {}

function ShopSystem.OpenShop(shopType, shopId)
    Bridge.Callback.Trigger("shop:getData", function(shopData)
        if not shopData then
            Bridge.Notify.Error("Shop not available")
            return
        end

        ShopSystem.RenderShopMenu(shopData)
    end, shopType, shopId)
end

function ShopSystem.RenderShopMenu(shopData)
    local menuItems = {
        {
            header = "🏪 " .. shopData.name,
            txt = shopData.description,
            isMenuHeader = true
        }
    }

    -- Add categories
    for categoryName, category in pairs(shopData.categories) do
        table.insert(menuItems, {
            header = category.icon .. " " .. category.label,
            txt = #category.items .. " items available",
            params = {
                event = "shop:openCategory",
                args = {
                    shopId = shopData.id,
                    category = categoryName,
                    items = category.items
                }
            }
        })
    end

    Bridge.Menu.Context(menuItems)
end

RegisterNetEvent("shop:openCategory")
AddEventHandler("shop:openCategory", function(data)
    local menuItems = {
        {
            header = "⬅️ Back to Shop",
            params = {
                event = "shop:goBack",
                args = { shopId = data.shopId }
            }
        }
    }

    for _, item in ipairs(data.items) do
        -- Check if player can afford item
        Bridge.Callback.Trigger("player:canAfford", function(canAfford)
            local priceText = canAfford and ("💰 $" .. item.price) or ("❌ $" .. item.price)

            table.insert(menuItems, {
                header = item.label,
                txt = item.description .. "\n" .. priceText,
                params = {
                    event = "shop:purchaseItem",
                    args = {
                        item = item,
                        canAfford = canAfford
                    }
                }
            })
        end, item.price)
    end

    Bridge.Menu.Context(menuItems)
end)
```


```lua
-- Advanced housing system with real-time updates
local HousingSystem = {}
HousingSystem.activeHouses = {}

function HousingSystem.Init()
    -- Register for real-time updates
    TriggerServerEvent("housing:requestUpdates")

    -- Set up periodic sync
    Citizen.CreateThread(function()
        while true do
            HousingSystem.SyncNearbyHouses()
            Citizen.Wait(5000)
        end
    end)
end

function HousingSystem.SyncNearbyHouses()
    local playerCoords = GetEntityCoords(PlayerPedId())

    Bridge.Callback.Trigger("housing:getNearbyHouses", function(houses)
        for houseId, houseData in pairs(houses) do
            HousingSystem.UpdateHouseDisplay(houseId, houseData)
        end

        -- Remove houses that are no longer nearby
        for houseId, _ in pairs(HousingSystem.activeHouses) do
            if not houses[houseId] then
                HousingSystem.RemoveHouseDisplay(houseId)
            end
        end

        HousingSystem.activeHouses = houses
    end, playerCoords, 100.0) -- 100 unit radius
end

function HousingSystem.UpdateHouseDisplay(houseId, houseData)
    -- Remove existing display
    HousingSystem.RemoveHouseDisplay(houseId)

    -- Create new target zone
    Bridge.Target.AddZone("house_" .. houseId, {
        coords = houseData.coords,
        size = vector3(2.0, 2.0, 3.0),
        options = HousingSystem.GetHouseOptions(houseData)
    })

    -- Add blip if owned by player or for sale
    if houseData.owner == GetPlayerServerId(PlayerId()) or houseData.forSale then
        local blip = AddBlipForCoord(houseData.coords.x, houseData.coords.y, houseData.coords.z)
        SetBlipSprite(blip, houseData.forSale and 374 or 40)
        SetBlipColour(blip, houseData.forSale and 2 or 3)
        SetBlipAsShortRange(blip, true)
        BeginTextCommandSetBlipName("STRING")
        AddTextComponentString(houseData.name)
        EndTextCommandSetBlipName(blip)

        HousingSystem.activeHouses[houseId] = HousingSystem.activeHouses[houseId] or {}
        HousingSystem.activeHouses[houseId].blip = blip
    end
end

function HousingSystem.GetHouseOptions(houseData)
    local options = {}
    local playerId = GetPlayerServerId(PlayerId())

    if houseData.forSale then
        table.insert(options, {
            label = "🏠 Buy House ($" .. houseData.price .. ")",
            action = function()
                HousingSystem.PurchaseHouse(houseData)
            end
        })

        table.insert(options, {
            label = "👀 View House",
            action = function()
                HousingSystem.ViewHouse(houseData)
            end
        })
    end

    if houseData.owner == playerId then
        table.insert(options, {
            label = "🚪 Enter House",
            action = function()
                HousingSystem.EnterHouse(houseData)
            end
        })

        table.insert(options, {
            label = "⚙️ House Settings",
            action = function()
                HousingSystem.OpenHouseSettings(houseData)
            end
        })
    elseif houseData.owner and houseData.allowVisitors then
        table.insert(options, {
            label = "🔔 Ring Doorbell",
            action = function()
                HousingSystem.RingDoorbell(houseData)
            end
        })
    end

    return options
end

function HousingSystem.PurchaseHouse(houseData)
    Bridge.Menu.Input({
        header = "🏠 Purchase House",
        submitText = "Buy Now",
        inputs = {
            {
                text = "Confirm purchase of " .. houseData.name,
                name = "confirm",
                type = "text",
                isRequired = true,
                placeholder = "Type 'CONFIRM' to proceed"
            }
        }
    }, function(result)
        if result and result.confirm == "CONFIRM" then
            Bridge.Progressbar.Start({
                label = "Processing purchase...",
                duration = 3000
            }, function(cancelled)
                if not cancelled then
                    TriggerServerEvent("housing:purchaseHouse", houseData.id)
                end
            end)
        else
            Bridge.Notify.Error("Purchase cancelled")
        end
    end)
end
```


```lua
-- Advanced particle and animation system
local EffectsSystem = {}

function EffectsSystem.PlayWeldingEffect(coords, duration)
    -- Request particle effect
    if not HasNamedPtfxAssetLoaded("core") then
        RequestNamedPtfxAsset("core")
        while not HasNamedPtfxAssetLoaded("core") do
            Citizen.Wait(1)
        end
    end

    -- Start welding particle effect
    UseParticleFxAssetNextCall("core")
    local weldingEffect = StartParticleFxLoopedAtCoord(
        "ent_amb_sparking_wires",
        coords.x, coords.y, coords.z,
        0.0, 0.0, 0.0,
        1.0,
        false, false, false, false
    )

    -- Play welding sound
    local soundId = GetSoundId()
    PlaySoundFromCoord(soundId, "welding_sound", coords.x, coords.y, coords.z, "", true, 20.0, false)

    -- Clean up after duration
    Citizen.SetTimeout(duration, function()
        StopParticleFxLooped(weldingEffect, false)
        StopSound(soundId)
        ReleaseSoundId(soundId)
    end)

    return {
        particle = weldingEffect,
        sound = soundId
    }
end

function EffectsSystem.CreateAdvancedProgressWithEffects(config)
    local effects = {}

    -- Start environmental effects
    if config.effects then
        for _, effect in ipairs(config.effects) do
            if effect.type == "particles" then
                table.insert(effects, EffectsSystem.PlayWeldingEffect(
                    effect.coords,
                    config.duration
                ))
            elseif effect.type == "lights" then
                -- Add dynamic lighting
                local light = CreateLight(
                    2, -- flashlight type
                    effect.coords.x, effect.coords.y, effect.coords.z,
                    effect.color.r, effect.color.g, effect.color.b,
                    effect.intensity,
                    effect.range
                )
                table.insert(effects, {light = light})

                Citizen.SetTimeout(config.duration, function()
                    DeleteLight(light)
                end)
            end
        end
    end

    -- Start progress bar with enhanced features
    Bridge.Progressbar.Start({
        label = config.label,
        duration = config.duration,
        useWhileDead = false,
        canCancel = true,
        animation = config.animation,
        prop = config.prop,
        disableControls = {
            disableMovement = true,
            disableCarMovement = true,
            disableCombat = true
        }
    }, function(cancelled)
        -- Clean up effects
        for _, effect in ipairs(effects) do
            if effect.particle then
                StopParticleFxLooped(effect.particle, false)
            end
            if effect.sound then
                StopSound(effect.sound)
                ReleaseSoundId(effect.sound)
            end
            if effect.light then
                DeleteLight(effect.light)
            end
        end

        if config.callback then
            config.callback(cancelled)
        end
    end)
end

-- Usage example
function StartAdvancedCrafting()
    EffectsSystem.CreateAdvancedProgressWithEffects({
        label = "Welding metal parts...",
        duration = 10000,
        animation = {
            dict = "anim@amb@clubhouse@tutorial@bkr_tut_ig3@",
            clip = "machinic_loop_mechandplayer"
        },
        prop = {
            model = "prop_tool_blowtorch",
            bone = 28422,
            coords = vector3(0.0, 0.0, 0.0),
            rotation = vector3(0.0, 0.0, 0.0)
        },
        effects = {
            {
                type = "particles",
                coords = GetEntityCoords(PlayerPedId())
            },
            {
                type = "lights",
                coords = GetEntityCoords(PlayerPedId()),
                color = {r = 255, g = 100, b = 0},
                intensity = 2.0,
                range = 5.0
            }
        },
        callback = function(cancelled)
            if not cancelled then
                Bridge.Notify.Success("Welding completed!")
                TriggerServerEvent("crafting:completeWelding")
            else
                Bridge.Notify.Error("Welding interrupted!")
            end
        end
    })
end
```


```lua
-- Advanced localization system
local LocaleSystem = {}
LocaleSystem.currentLocale = "en"
LocaleSystem.locales = {}

function LocaleSystem.Init()
    -- Load locale data
    Bridge.Callback.Trigger("locale:getPlayerLocale", function(locale)
        LocaleSystem.currentLocale = locale or "en"
        LocaleSystem.LoadLocaleData()
    end)
end

function LocaleSystem.LoadLocaleData()
    Bridge.Callback.Trigger("locale:getData", function(localeData)
        LocaleSystem.locales = localeData
    end, LocaleSystem.currentLocale)
end

function LocaleSystem.Translate(key, params)
    local translation = LocaleSystem.locales[key] or key

    -- Replace parameters
    if params then
        for paramKey, paramValue in pairs(params) do
            translation = string.gsub(translation, "{" .. paramKey .. "}", tostring(paramValue))
        end
    end

    return translation
end

-- Usage with Community Bridge modules
function ShowLocalizedHelpText(key, params, position)
    local message = LocaleSystem.Translate(key, params)
    Bridge.HelpText.ShowHelpText(message, position or "center")
end

function ShowLocalizedNotification(type, key, params)
    local message = LocaleSystem.Translate(key, params)
    Bridge.Notify[type](message)
end

-- Example usage
ShowLocalizedHelpText("press_to_interact", {key = "E"})
ShowLocalizedNotification("Success", "vehicle_repaired", {vehicle = "Adder"})
```


```lua
-- Performance monitoring system
local PerfMonitor = {}
PerfMonitor.metrics = {}

function PerfMonitor.StartTimer(operation)
    PerfMonitor.metrics[operation] = GetGameTimer()
end

function PerfMonitor.EndTimer(operation)
    if PerfMonitor.metrics[operation] then
        local duration = GetGameTimer() - PerfMonitor.metrics[operation]
        print("⏱️ " .. operation .. " took " .. duration .. "ms")

        -- Log slow operations
        if duration > 100 then
            TriggerServerEvent("performance:logSlowOperation", operation, duration)
        end

        PerfMonitor.metrics[operation] = nil
    end
end

-- Optimized distance checking
function PerfMonitor.OptimizedDistanceCheck()
    local playerPed = PlayerPedId()
    local playerCoords = GetEntityCoords(playerPed)

    Citizen.CreateThread(function()
        while true do
            local sleep = 1000
            local nearbyTargets = false

            PerfMonitor.StartTimer("distance_check")

            -- Check only nearby entities
            for entity in EnumerateVehicles() do
                local distance = #(playerCoords - GetEntityCoords(entity))
                if distance < 10.0 then
                    nearbyTargets = true
                    sleep = 100
                    break
                end
            end

            PerfMonitor.EndTimer("distance_check")

            if nearbyTargets then
                -- Show interactions only when needed
                Bridge.HelpText.ShowHelpText("Press E to interact", "center")
            else
                Bridge.HelpText.HideHelpText()
            end

            Citizen.Wait(sleep)
        end
    end)
end
```

These advanced examples demonstrate sophisticated usage patterns that combine multiple Community Bridge modules to create complex, feature-rich systems. The key principles are:

1. **Modular Design**: Break complex systems into smaller, manageable functions
2. **Error Handling**: Always check for module availability and handle edge cases
3. **Performance**: Use efficient coding patterns and monitoring
4. **User Experience**: Provide clear feedback and intuitive interfaces
5. **Extensibility**: Design systems that can be easily extended and modified

These patterns can be adapted and combined to create powerful, professional-grade FiveM resources using the Community Bridge framework.
