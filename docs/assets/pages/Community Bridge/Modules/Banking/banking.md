# <i class="fas fa-university"></i> Banking

<!--META
nav: true
toc: true
description: Banking and economy functions for managing player finances and transactions.
-->

Banking and economy functions for managing player finances and transactions.

## Overview

The Banking module provides functions for interacting with player bank accounts, including querying balances and modifying account funds.

## GetManagmentName (server)

### Description
Gets the name of the management system being used.

### Syntax
```lua
Bridge.Banking.GetManagmentName()
```

### Returns
- (string): The name of the management system (e.g., "fd_banking")

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()

local name = Bridge.Banking.GetManagmentName()
print(name) -- "fd_banking"
```

## GetAccountMoney (server)

### Description
Returns the balance of the specified account.

### Syntax
```lua
Bridge.Banking.GetAccountMoney(account)
```

### Parameters
- **account** (string): The account identifier

### Returns
- (number): The account balance

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()

local balance = Bridge.Banking.GetAccountMoney("bank")
print(balance)
```

## AddAccountMoney (server)

### Description
Adds money to the specified account.

### Syntax
```lua
Bridge.Banking.AddAccountMoney(account, amount, reason)
```

### Parameters
- **account** (string): The account identifier
- **amount** (number): Amount to add
- **reason** (string): Reason for the addition

### Returns
- (boolean): Returns true if the operation was successful

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()

local success = Bridge.Banking.AddAccountMoney("bank", 500, "Salary")
print(success)
```

## RemoveAccountMoney (server)

### Description
Removes money from the specified account.

### Syntax
```lua
Bridge.Banking.RemoveAccountMoney(account, amount, reason)
```

### Parameters
- **account** (string): The account identifier
- **amount** (number): Amount to remove
- **reason** (string): Reason for the removal

### Returns
- (boolean): Returns true if the operation was successful

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()

local success = Bridge.Banking.RemoveAccountMoney("bank", 200, "Purchase")
print(success)
```

## Supported Systems

| System | Resource Name |
|--------|---------------|
| FD Banking | `fd_banking` |
| Kartik Banking | `kartik-banking` |
| Okok Banking | `okokBanking` |
| QB Banking | `qb-banking` |
| Renewed Banking | `renewed-banking` |
| TGG Banking | `tgg-banking` |
| Tgiann Bank | `tgiann-bank` |
| Wasabi Banking | `wasabi_banking` |

The system automatically detects which banking resource is available and uses the appropriate implementation. All banking functions are standardized across different systems to ensure compatibility. If no supported banking system is found, it falls back to a default system with basic functionality.

