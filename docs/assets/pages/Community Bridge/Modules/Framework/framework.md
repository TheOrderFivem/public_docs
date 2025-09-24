# <i class="fas fa-layer-group"></i> Framework

<!--META
nav: true
toc: true
description: Universal framework compatibility layer that provides consistent access to player data, jobs, and framework-specific functions across QB-Core, ESX, QBox, and custom frameworks. This is the foundation module that enables cross-framework development.
-->

Universal framework compatibility layer that provides consistent access to player data, jobs, and framework-specific functions across QB-Core, ESX, QBox, and custom frameworks. This is the foundation module that enables cross-framework development.

## Overview

The Framework module provides core integration functions that bridge different FiveM frameworks and resources.

## GetAccountBalance (Client)

### Description
Returns the player's account balance of the specified type.

NOTE: Do not use this for purchase validation. Things like checking if they have enough money before triggering a server event that does not check, should not be done. Use this for quick UI values and always check on the server.

### Syntax
```lua
Bridge.Framework.GetAccountBalance(_type)
```

### Parameters
- **_type** (string): 'bank' / 'cash'

### Returns
- (number): | nil

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()
Bridge.Framework.GetAccountBalance('cash')
```

## GetFrameworkJobs (Client)

### Description
Function GetFrameworkJobs

### Syntax
```lua
Bridge.Framework.GetFrameworkJobs()
```

### Returns
- (table): Array of job objects with name, label, and grades

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local jobs = Bridge.Framework.GetFrameworkJobs()
for _, job in pairs(jobs) do
    print('Job:', job.name, job.label)
end
```

## GetFrameworkName (Client)

### Description
Function GetFrameworkName

### Syntax
```lua
Bridge.Framework.GetFrameworkName()
```

### Returns
- (string): The name of the detected framework ('qb-core', 'qbx_core', 'es_extended')

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local frameworkName = Bridge.Framework.GetFrameworkName()
print('Using framework:', frameworkName)
```

## GetIsPlayerDead (Client)

### Description
Function GetIsPlayerDead

### Syntax
```lua
Bridge.Framework.GetIsPlayerDead()
```

### Returns
- (boolean): Whether the player is dead/downed

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
if Bridge.Framework.GetIsPlayerDead() then
    print('Player is down or dead')
end
```

## GetItemInfo (Client)

### Description
Function GetItemInfo

### Syntax
```lua
Bridge.Framework.GetItemInfo(item)
```

### Parameters
- **item** (string): Item name

### Returns
- (table): Item information (name, label, weight, etc.)

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local itemInfo = Bridge.Framework.GetItemInfo('phone')
print('Item label:', itemInfo.label)
print('Item weight:', itemInfo.weight)
```

## GetPlayerData (Client)

### Description
Function GetPlayerData

### Syntax
```lua
Bridge.Framework.GetPlayerData()
```

### Returns
- (table): Player data in framework's native format

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local playerData = Bridge.Framework.GetPlayerData()
print('Player name:', playerData.charinfo.firstname)
```

## GetPlayerDob (Client)

### Description
Function GetPlayerDob

### Syntax
```lua
Bridge.Framework.GetPlayerDob()
```

### Returns
- (string): Player's date of birth

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local dob = Bridge.Framework.GetPlayerDob()
print('Player DOB:', dob)
```

## GetPlayerIdentifier (Client)

### Description
Function GetPlayerIdentifier

### Syntax
```lua
Bridge.Framework.GetPlayerIdentifier()
```

### Returns
- (string): Player's unique identifier (citizenid/identifier)

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local identifier = Bridge.Framework.GetPlayerIdentifier()
print('Player ID:', identifier)
```

## GetPlayerInventory (Client)

### Description
Function GetPlayerInventory

### Syntax
```lua
Bridge.Framework.GetPlayerInventory()
```

### Returns
- (table): Player's inventory in standardized format

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local inventory = Bridge.Framework.GetPlayerInventory()
for _, item in pairs(inventory) do
    print('Item:', item.name, 'Count:', item.count)
end
```

## GetPlayerJob (Client)

### Description
Function GetPlayerJob

### Syntax
```lua
Bridge.Framework.GetPlayerJob()
```

### Returns
- (string, string, string, number): Job name, label, grade name, grade level

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local jobName, jobLabel, gradeName, gradeLevel = Bridge.Framework.GetPlayerJob()
print('Job:', jobName, jobLabel)
```

## GetPlayerJobData (Client)

### Description
Function GetPlayerJobData

### Syntax
```lua
Bridge.Framework.GetPlayerJobData()
```

### Returns
- (table): Complete job information object

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local jobData = Bridge.Framework.GetPlayerJobData()
print('Job:', jobData.jobName)
print('On duty:', jobData.onDuty)
print('Is boss:', jobData.boss)
```

## GetPlayerMetaData (Client)

### Description
Function GetPlayerMetaData

### Syntax
```lua
Bridge.Framework.GetPlayerMetaData(metadata)
```

### Parameters
- **metadata** (string|table): Metadata key to retrieve

### Returns
- (any): The metadata value

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local stress = Bridge.Framework.GetPlayerMetaData('stress')
print('Player stress level:', stress)
```

## GetPlayerName (Client)

### Description
Function GetPlayerName

### Syntax
```lua
Bridge.Framework.GetPlayerName()
```

### Returns
- (string, string): First name, Last name

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local firstName, lastName = Bridge.Framework.GetPlayerName()
print('Player name:', firstName, lastName)
```

## GetVehicleProperties (Client)

### Description
Function GetVehicleProperties

### Syntax
```lua
Bridge.Framework.GetVehicleProperties(vehicle)
```

### Parameters
- **vehicle** (number): Vehicle entity handle

### Returns
- (table): Vehicle properties data

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
local props = Bridge.Framework.GetVehicleProperties(vehicle)
print('Plate:', props.plate)
```

## HasItem (Client)

### Description
Function HasItem

### Syntax
```lua
Bridge.Framework.HasItem(item)
```

### Parameters
- **item** (string): Item name to check

### Returns
- (boolean): Whether player has the item

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
if Bridge.Framework.HasItem('phone') then
    print('Player has a phone')
end
```

## HideHelpText (Client)

### Description
Function HideHelpText

### Syntax
```lua
Bridge.Framework.HideHelpText()
```

### Returns
- (nil): No description provided

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Framework.HideHelpText()
```

## Notify (Client)

### Description
Function Notify

### Syntax
```lua
Bridge.Framework.Notify(message, type, time)
```

### Parameters
- **message** (string): Notification message
- **type** (string): Notification type
- **time** (number): Display duration

### Returns
- (nil): No description provided

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Framework.Notify('Hello World!', 'success', 5000)
```

## SetVehicleProperties (Client)

### Description
Function SetVehicleProperties

### Syntax
```lua
Bridge.Framework.SetVehicleProperties(vehicle, properties)
```

### Parameters
- **vehicle** (number): Vehicle entity handle
- **properties** (table): Properties to apply

### Returns
- (boolean): Success status

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
local props = { plate = 'BRIDGE1' }
Bridge.Framework.SetVehicleProperties(vehicle, props)
```

## ShowHelpText (Client)

### Description
Function ShowHelpText

### Syntax
```lua
Bridge.Framework.ShowHelpText(message, position)
```

### Parameters
- **message** (string): Help text message
- **position** (string): Text position

### Returns
- (nil): No description provided

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Framework.ShowHelpText('Press E to interact', 'top-center')
```

## GetItemCount (Client)

### Description
This will return the item count for the specified item in the players inventory.

### Syntax
```lua
Bridge.Framework.GetItemCount(item)
```

### Parameters
- **item** (string): 

### Returns
- (number): 

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()
Bridge.Framework.GetItemCount()
```

## AddHunger (Server)

### Description
Function AddHunger

### Syntax
```lua
Bridge.Framework.AddHunger(src, value)
```

### Parameters
- **src** (number): Player source ID
- **value** (number): Hunger amount to add

### Returns
- (number|nil): New hunger level

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local newHunger = Bridge.Framework.AddHunger(source, 20)
print('New hunger level:', newHunger)
```

## AddItem (Server)

### Description
Function AddItem

### Syntax
```lua
Bridge.Framework.AddItem(src, item, amount, slot, metadata)
```

### Parameters
- **src** (number): Player source ID
- **item** (string): Item name
- **amount** (number): Item quantity
- **slot** (number): Optional specific slot
- **metadata** (table): Optional item metadata

### Returns
- (boolean|nil): Success status

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local success = Bridge.Framework.AddItem(source, 'phone', 1)
print('Item added:', success)
```

## AddStress (Server)

### Description
Function AddStress

### Syntax
```lua
Bridge.Framework.AddStress(src, value)
```

### Parameters
- **src** (number): Player source ID
- **value** (number): Stress amount to add

### Returns
- (number|nil): New stress level

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local newStress = Bridge.Framework.AddStress(source, 10)
print('New stress level:', newStress)
```

## AddThirst (Server)

### Description
Function AddThirst

### Syntax
```lua
Bridge.Framework.AddThirst(src, value)
```

### Parameters
- **src** (number): Player source ID
- **value** (number): Thirst amount to add

### Returns
- (number|nil): New thirst level

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local newThirst = Bridge.Framework.AddThirst(source, 25)
print('New thirst level:', newThirst)
```

## GetFrameworkJobs (Server)

### Description
Function GetFrameworkJobs

### Syntax
```lua
Bridge.Framework.GetFrameworkJobs()
```

### Returns
- (table): Array of all framework jobs

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local jobs = Bridge.Framework.GetFrameworkJobs()
print('Total jobs:', #jobs)
```

## GetFrameworkName (Server)

### Description
Function GetFrameworkName

### Syntax
```lua
Bridge.Framework.GetFrameworkName()
```

### Returns
- (string): The name of the detected framework

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local frameworkName = Bridge.Framework.GetFrameworkName()
print('Server using:', frameworkName)
```

## GetHunger (Server)

### Description
Function GetHunger

### Syntax
```lua
Bridge.Framework.GetHunger(src)
```

### Parameters
- **src** (number): Player source ID

### Returns
- (number|nil): Current hunger level

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local hunger = Bridge.Framework.GetHunger(source)
print('Player hunger:', hunger)
```

## GetIsFrameworkAdmin (Server)

### Description
Function GetIsFrameworkAdmin

### Syntax
```lua
Bridge.Framework.GetIsFrameworkAdmin(src)
```

### Parameters
- **src** (number): Player source ID

### Returns
- (boolean): Whether the player is an admin

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
if Bridge.Framework.GetIsFrameworkAdmin(source) then
    print('Player is an admin')
end
```

## GetIsPlayerDead (Server)

### Description
Function GetIsPlayerDead

### Syntax
```lua
Bridge.Framework.GetIsPlayerDead(src)
```

### Parameters
- **src** (number): Player source ID

### Returns
- (boolean|nil): Whether the player is dead/downed

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
if Bridge.Framework.GetIsPlayerDead(source) then
    print('Player is down')
end
```

## GetItem (Server)

### Description
Function GetItem

### Syntax
```lua
Bridge.Framework.GetItem(src, item, metadata)
```

### Parameters
- **src** (number): Player source ID
- **item** (string): Item name
- **metadata** (table): Optional metadata filter

### Returns
- (table|nil): Item data if found

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local phoneItem = Bridge.Framework.GetItem(source, 'phone')
if phoneItem then
    print('Player has phone with count:', phoneItem.count)
end
```

## GetItemBySlot (Server)

### Description
Function GetItemBySlot

### Syntax
```lua
Bridge.Framework.GetItemBySlot(src, slot)
```

### Parameters
- **src** (number): Player source ID
- **slot** (number): Inventory slot number

### Returns
- (table|nil): Item in the specified slot

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local item = Bridge.Framework.GetItemBySlot(source, 1)
if item then
    print('Slot 1 contains:', item.name)
end
```

## GetOwnedVehicles (Server)

### Description
Function GetOwnedVehicles

### Syntax
```lua
Bridge.Framework.GetOwnedVehicles(src)
```

### Parameters
- **src** (number): Player source ID

### Returns
- (table): Array of owned vehicles with vehicle and plate

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local vehicles = Bridge.Framework.GetOwnedVehicles(source)
for _, vehicle in pairs(vehicles) do
    print('Vehicle:', vehicle.vehicle, 'Plate:', vehicle.plate)
end
```

## GetPlayer (Server)

### Description
Function GetPlayer

### Syntax
```lua
Bridge.Framework.GetPlayer(src)
```

### Parameters
- **src** (number): Player source ID

### Returns
- (table|nil): Player object in framework's native format

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local player = Bridge.Framework.GetPlayer(source)
if player then
    print('Found player data')
end
```

## GetPlayerDob (Server)

### Description
Function GetPlayerDob

### Syntax
```lua
Bridge.Framework.GetPlayerDob(src)
```

### Parameters
- **src** (number): Player source ID

### Returns
- (string|nil): Player's date of birth

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local dob = Bridge.Framework.GetPlayerDob(source)
print('DOB:', dob)
```

## GetPlayerDuty (Server)

### Description
Function GetPlayerDuty

### Syntax
```lua
Bridge.Framework.GetPlayerDuty(src)
```

### Parameters
- **src** (number): Player source ID

### Returns
- (boolean|nil): Whether the player is on duty

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local onDuty = Bridge.Framework.GetPlayerDuty(source)
print('On duty:', onDuty)
```

## GetPlayerGang (Server)

### Description
Function GetPlayerGang

### Syntax
```lua
Bridge.Framework.GetPlayerGang(src)
```

### Parameters
- **src** (number): Player source ID

### Returns
- (string|nil): Player's gang name

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local gang = Bridge.Framework.GetPlayerGang(source)
print('Player gang:', gang)
```

## GetPlayerIdentifier (Server)

### Description
Function GetPlayerIdentifier

### Syntax
```lua
Bridge.Framework.GetPlayerIdentifier(src)
```

### Parameters
- **src** (number): Player source ID

### Returns
- (string|nil): Player's unique identifier

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local identifier = Bridge.Framework.GetPlayerIdentifier(source)
print('Player ID:', identifier)
```

## GetPlayerInventory (Server)

### Description
Function GetPlayerInventory

### Syntax
```lua
Bridge.Framework.GetPlayerInventory(src)
```

### Parameters
- **src** (number): Player source ID

### Returns
- (table|nil): Player's complete inventory

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local inventory = Bridge.Framework.GetPlayerInventory(source)
for _, item in pairs(inventory) do
    print('Item:', item.name, 'Count:', item.count)
end
```

## GetPlayerJob (Server)

### Description
Function GetPlayerJob

### Syntax
```lua
Bridge.Framework.GetPlayerJob(src)
```

### Parameters
- **src** (number): Player source ID

### Returns
- (string, string, string, number): Job name, label, grade name, grade level

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local jobName, jobLabel, gradeName, gradeLevel = Bridge.Framework.GetPlayerJob(source)
print('Job:', jobName)
```

## GetPlayerJobData (Server)

### Description
Function GetPlayerJobData

### Syntax
```lua
Bridge.Framework.GetPlayerJobData(src)
```

### Parameters
- **src** (number): Player source ID

### Returns
- (table|nil): Complete job information object

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local jobData = Bridge.Framework.GetPlayerJobData(source)
if jobData then
    print('Job:', jobData.jobName)
    print('On duty:', jobData.onDuty)
end
```

## GetPlayerMetadata (Server)

### Description
Function GetPlayerMetadata

### Syntax
```lua
Bridge.Framework.GetPlayerMetadata(src, metadata)
```

### Parameters
- **src** (number): Player source ID
- **metadata** (string): Metadata key

### Returns
- (any|nil): Metadata value

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local stress = Bridge.Framework.GetPlayerMetadata(source, 'stress')
print('Player stress:', stress)
```

## GetPlayerName (Server)

### Description
Function GetPlayerName

### Syntax
```lua
Bridge.Framework.GetPlayerName(src)
```

### Parameters
- **src** (number): Player source ID

### Returns
- (string|nil, string|nil): First name, Last name

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local firstName, lastName = Bridge.Framework.GetPlayerName(source)
print('Player:', firstName, lastName)
```

## GetPlayerPhone (Server)

### Description
Function GetPlayerPhone

### Syntax
```lua
Bridge.Framework.GetPlayerPhone(src)
```

### Parameters
- **src** (number): Player source ID

### Returns
- (string|nil): Player's phone number

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local phone = Bridge.Framework.GetPlayerPhone(source)
print('Player phone:', phone)
```

## GetPlayers (Server)

### Description
Function GetPlayers

### Syntax
```lua
Bridge.Framework.GetPlayers()
```

### Returns
- (table): Array of all online player source IDs

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local players = Bridge.Framework.GetPlayers()
print('Online players:', #players)
```

## GetPlayersByJob (Server)

### Description
Function GetPlayersByJob

### Syntax
```lua
Bridge.Framework.GetPlayersByJob(job)
```

### Parameters
- **job** (string): Job name to filter by

### Returns
- (table): Array of player source IDs with the job

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local police = Bridge.Framework.GetPlayersByJob('police')
print('Police online:', #police)
```

## GetThirst (Server)

### Description
Function GetThirst

### Syntax
```lua
Bridge.Framework.GetThirst(src)
```

### Parameters
- **src** (number): Player source ID

### Returns
- (number|nil): Current thirst level

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local thirst = Bridge.Framework.GetThirst(source)
print('Player thirst:', thirst)
```

## RegisterUsableItem (Server)

### Description
Function RegisterUsableItem

### Syntax
```lua
Bridge.Framework.RegisterUsableItem(itemName, callback)
```

### Parameters
- **itemName** (string): Item name to register
- **callback** (function): Function to call when item is used

### Returns
- (function|nil): Registration result

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Framework.RegisterUsableItem('phone', function(src, itemData)
    print('Player', src, 'used phone')
end)
```

## RemoveHunger (Server)

### Description
Function RemoveHunger

### Syntax
```lua
Bridge.Framework.RemoveHunger(src, value)
```

### Parameters
- **src** (number): Player source ID
- **value** (number): Hunger amount to remove

### Returns
- (number|nil): New hunger level

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local newHunger = Bridge.Framework.RemoveHunger(source, 15)
print('Reduced hunger to:', newHunger)
```

## RemoveItem (Server)

### Description
Function RemoveItem

### Syntax
```lua
Bridge.Framework.RemoveItem(src, item, amount, slot, metadata)
```

### Parameters
- **src** (number): Player source ID
- **item** (string): Item name
- **amount** (number): Item quantity
- **slot** (number): Optional specific slot
- **metadata** (table): Optional metadata filter

### Returns
- (boolean|nil): Success status

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local success = Bridge.Framework.RemoveItem(source, 'phone', 1)
print('Item removed:', success)
```

## RemoveStress (Server)

### Description
Function RemoveStress

### Syntax
```lua
Bridge.Framework.RemoveStress(src, value)
```

### Parameters
- **src** (number): Player source ID
- **value** (number): Stress amount to remove

### Returns
- (number|nil): New stress level

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local newStress = Bridge.Framework.RemoveStress(source, 5)
print('Reduced stress to:', newStress)
```

## RemoveThirst (Server)

### Description
Function RemoveThirst

### Syntax
```lua
Bridge.Framework.RemoveThirst(src, value)
```

### Parameters
- **src** (number): Player source ID
- **value** (number): Thirst amount to remove

### Returns
- (number|nil): New thirst level

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local newThirst = Bridge.Framework.RemoveThirst(source, 10)
print('Reduced thirst to:', newThirst)
```

## RevivePlayer (Server)

### Description
Function RevivePlayer

### Syntax
```lua
Bridge.Framework.RevivePlayer(src)
```

### Parameters
- **src** (number): Player source ID

### Returns
- (boolean): Success status

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local success = Bridge.Framework.RevivePlayer(source)
print('Revive success:', success)
```

## SetMetadata (Server)

### Description
Function SetMetadata

### Syntax
```lua
Bridge.Framework.SetMetadata(src, item, slot, metadata)
```

### Parameters
- **src** (number): Player source ID
- **item** (string): Item name
- **slot** (number): Item slot
- **metadata** (table): New metadata

### Returns
- (boolean|nil): Success status

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
local metadata = { quality = 100 }
Bridge.Framework.SetMetadata(source, 'phone', 1, metadata)
```

## SetPlayerDuty (Server)

### Description
Function SetPlayerDuty

### Syntax
```lua
Bridge.Framework.SetPlayerDuty(src, status)
```

### Parameters
- **src** (number): Player source ID
- **status** (boolean): Duty status to set

### Returns
- (nil): No description provided

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Framework.SetPlayerDuty(source, true)
```

## SetPlayerJob (Server)

### Description
Function SetPlayerJob

### Syntax
```lua
Bridge.Framework.SetPlayerJob(src, name, grade)
```

### Parameters
- **src** (number): Player source ID
- **name** (string): Job name
- **grade** (string|number): Job grade

### Returns
- (boolean|nil): Success status

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Framework.SetPlayerJob(source, 'police', '1')
```

## SetPlayerMetadata (Server)

### Description
Function SetPlayerMetadata

### Syntax
```lua
Bridge.Framework.SetPlayerMetadata(src, metadata, value)
```

### Parameters
- **src** (number): Player source ID
- **metadata** (string): Metadata key
- **value** (any): Value to set

### Returns
- (boolean|nil): Success status

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Framework.SetPlayerMetadata(source, 'stress', 50)
```

## AddAccountBalance (Server)

### Description
Adds the specified amount to the player's account balance of the specified type.

### Syntax
```lua
Bridge.Framework.AddAccountBalance(src, _type, amount)
```

### Parameters
- **src** (number): Player source ID
- **_type** (string): 'bank' / 'cash' 
- **amount** (number): Value of money to add

### Returns
- (boolean): | nil

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()
Bridge.Framework.AddAccountBalance()
```

## GetStatus (Server)

### Description
Function GetStatus

### Syntax
```lua
Bridge.Framework.GetStatus(src, column)
```

### Parameters
- **src** (any): Parameter src
- **column** (any): Parameter column

### Returns
- (nil): No return value

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()
Bridge.Framework.GetStatus()
```

## GetAccountBalance (Server)

### Description
Returns the player's account balance of the specified type.

### Syntax
```lua
Bridge.Framework.GetAccountBalance(src, _type)
```

### Parameters
- **src** (number): Player source
- **_type** (string):  'bank' / 'cash'

### Returns
- (number): | nil

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()
Bridge.Framework.GetAccountBalance('bank')
```

## GetItemCount (Server)

### Description
Returns the count of items matching the specified name and if passed metadata from the player's inventory.

### Syntax
```lua
Bridge.Framework.GetItemCount(src, item, metadata)
```

### Parameters
- **src** (number): Player source
- **item** (string): Item name
- **metadata** (table): Item metadata

### Returns
- (number): | nil

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()
Bridge.Framework.GetItemCount()
```

## RemoveAccountBalance (Server)

### Description
Removes the specified amount from the player's account balance of the specified type.

### Syntax
```lua
Bridge.Framework.RemoveAccountBalance(src, _type, amount)
```

### Parameters
- **src** (number): Player source
- **_type** (string): 'cash' / 'bank'
- **amount** (number): Value of money to remove

### Returns
- (boolean): | nil

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()Bridge.Framework.RemoveAccountBalance()
```

## GetItemInfo (Server)

### Description
This will return a table with the item info, {name, label, stack, weight, description, image}

### Syntax
```lua
Bridge.Framework.GetItemInfo(item)
```

### Parameters
- **item** (string): Item name

### Returns
- (table): 

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()
Bridge.Framework.GetItemInfo()
```

## HasItem (Server)

### Description
Returns boolean if the player has the specified item in their inventory.

### Syntax
```lua
Bridge.Framework.HasItem(src, item)
```

### Parameters
- **src** (number): Player source
- **item** (string): Item name

### Returns
- (boolean): 

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()
Bridge.Framework.HasItem()
```

## Supported Systems

| System | Resource Name |
|--------|---------------|
| QB-Core | `qb-core` |
| QBox | `qbx_core` |
| ESX | `es_extended` |

The Framework module automatically detects which framework is running and provides a unified interface for all core functions. This is the foundation that enables all other modules to work across different frameworks seamlessly.
