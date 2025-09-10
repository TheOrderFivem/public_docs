# <i class="fas fa-ambulance"></i> Dispatch

<!--META
nav: true
toc: true
description: The Dispatch module provides a unified interface for sending alerts and notifications to emergency services and other job-based players. It supports various dispatch systems.
-->

The Dispatch module provides a unified interface for sending alerts and notifications to emergency services and other job-based players. It supports various dispatch systems.

## Overview

The Dispatch module provides emergency services dispatch and notification systems for roleplay scenarios.

## SendAlert (Client)

### Description
Sends a dispatch alert to specified job players through the configured dispatch system.

### Syntax
```lua
Bridge.Dispatch.SendAlert(data)
```

### Parameters
- **data** (table): Alert configuration data

### Returns
- (nil): No return value

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Send a robbery alert
Bridge.Dispatch.SendAlert({
    message = "Armed robbery in progress at convenience store",
    code = "10-31",
    coords = vector3(123.45, 678.90, 12.34),
    jobs = {"police", "sheriff"},
    blipData = {
        sprite = 161,
        color = 1,
        scale = 1.0
    },
    time = 300000, -- 5 minutes
    icon = "fas fa-exclamation-triangle"
})

-- Send a medical emergency alert
Bridge.Dispatch.SendAlert({
    message = "Medical emergency - patient requires immediate attention",
    code = "10-52",
    coords = GetEntityCoords(PlayerPedId()),
    jobs = {"ambulance", "doctor"},
    blipData = {
        sprite = 153,
        color = 6,
        scale = 0.9
    },
    time = 180000, -- 3 minutes
    icon = "fas fa-ambulance"
})
```

## Supported Systems

| System | Resource Name |
|--------|---------------|
| Bub MDT | `bub-mdt` |
| CD Dispatch | `cd_dispatch` |
| Kartik MDT | `kartik-mdt` |
| LB Tablet | `lb-tablet` |
| Linden Outlaw Alert | `linden_outlawalert` |
| Origen Police | `origen_police` |
| Piotreq GPT | `piotreq_gpt` |
| PS Dispatch | `ps-dispatch` |
| QS Dispatch | `qs_dispatch` |
| Redutzu MDT | `redutzu-mdt` |
| TK Dispatch | `tk_dispatch` |

The system automatically detects which dispatch resource is available and uses the appropriate implementation. If no supported dispatch system is found, it falls back to the default system using basic notification methods to job players. Alert data is normalized across different systems to ensure compatibility.

