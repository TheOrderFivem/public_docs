# Batch 📦

<!--META
nav: true
toc: true
description: The Batch library provides network event optimization by queuing multiple events and sending them together to reduce network strain and improve performance in multiplayer environments.
-->

The Batch library provides network event optimization by queuing multiple events and sending them together to reduce network strain and improve performance in multiplayer environments.

## Overview

The Batch library provides network event optimization by queuing multiple events and sending them together to reduce network strain and improve performance in multiplayer environments.

## Event.Fire (Client)

### Description
Processes an array of batched events received from the server, triggering each event for the appropriate player.

### Syntax
```lua
Bridge.Batch.Event.Fire(array)
```

### Parameters
- **array** (table): Array of event objects with src, event, and args properties

### Example
```lua
-- Internal function - called automatically via network events
-- Client receives and processes batched events from server
local Bridge = exports['community_bridge']:Bridge()

-- This happens automatically when server sends batched events
local eventArray = {
    {
        src = GetPlayerServerId(PlayerId()),
        event = 'myResource:updateUI',
        args = {'data1', 'data2'}
    },
    {
        src = GetPlayerServerId(PlayerId()),
        event = 'myResource:notify',
        args = {'message', 'success'}
    }
}

-- Process events (done automatically)
Bridge.Batch.Event.Fire(eventArray)
```

## Event.Queue (Server)

### Description
Queues client events for batched sending to reduce network calls, automatically sending after 100ms timeout.

### Syntax
```lua
Bridge.Batch.Event.Queue(src, event, ...)
```

### Parameters
- **src** (number | number[]): Target player ID or -1 for all players
- **event** (string): Event name to trigger on client
- **...** (any): Arguments to pass to the client event

### Example
```lua
-- Server-side event batching
local Bridge = exports['community_bridge']:Bridge()

-- Queue events for specific player
local playerId = source
Bridge.Batch.Event.Queue(playerId, 'myResource:updateInventory', inventory)
Bridge.Batch.Event.Queue(playerId, 'myResource:updateMoney', money)
Bridge.Batch.Event.Queue(playerId, 'myResource:notify', 'Items updated', 'success')

-- Queue events for all players
Bridge.Batch.Event.Queue(-1, 'myResource:globalAnnouncement', 'Server restarting in 5 minutes')
Bridge.Batch.Event.Queue(-1, 'myResource:weatherUpdate', 'sunny', 12)

-- Events are automatically sent after 100ms timeout as a batch
-- This reduces multiple TriggerClientEvent calls to a single batched call

-- Example of multiple rapid updates that benefit from batching
for i = 1, 10 do
    Bridge.Batch.Event.Queue(playerId, 'myResource:progressUpdate', i * 10)
end
-- All 10 events sent as one batch instead of 10 separate network calls
```

