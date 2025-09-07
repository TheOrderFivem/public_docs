# SQL 🗄️

<!--META
nav: true
toc: true
description: The SQL library provides simplified database operations with automatic table creation, upsert functionality, and common CRUD operations. It works with oxmysql and handles common database patterns used in FiveM development.
-->

The SQL library provides simplified database operations with automatic table creation, upsert functionality, and common CRUD operations. It works with oxmysql and handles common database patterns used in FiveM development.

## Overview

The SQL library provides simplified database operations with automatic table creation, upsert functionality, and common CRUD operations. It works with oxmysql and handles common database patterns used in FiveM development.

## Create (Server)

### Description
Creates a table with the specified columns if it doesn't already exist. Uses CREATE TABLE IF NOT EXISTS syntax.

### Syntax
```lua
SQL.Create(tableName, columns)
```

### Parameters
- **tableName** (string): Name of the table to create
- **columns** (table): Array of column definitions with 'name' and 'type' properties

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()

local columns = {
    { name = "id", type = "INT AUTO_INCREMENT PRIMARY KEY" },
    { name = "identifier", type = "VARCHAR(50) UNIQUE" },
    { name = "name", type = "VARCHAR(100)" },
    { name = "money", type = "INT DEFAULT 0" }
}

Bridge.SQL.Create("players", columns)
print("Players table created successfully")
```

## InsertOrUpdate (Server)

### Description
Inserts a new record or updates an existing one if a duplicate key is found. Uses INSERT ... ON DUPLICATE KEY UPDATE syntax.

### Syntax
```lua
SQL.InsertOrUpdate(tableName, data)
```

### Parameters
- **tableName** (string): Name of the table to insert/update
- **data** (table): Key-value pairs representing column names and values

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()

local playerData = {
    identifier = "steam:110000103fa6fc1",
    name = "John Doe",
    money = 5000
}

Bridge.SQL.InsertOrUpdate("players", playerData)
print("Player data saved successfully")

-- Update existing player
playerData.money = 7500
Bridge.SQL.InsertOrUpdate("players", playerData)
print("Player money updated")
```

## Get (Server)

### Description
Retrieves records from a table based on a WHERE condition.

### Syntax
```lua
SQL.Get(tableName, where)
```

### Parameters
- **tableName** (string): Name of the table to query
- **where** (string): WHERE clause condition (without the WHERE keyword)

### Returns
- (table): Array of records matching the condition

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()

-- Get specific player
local result = Bridge.SQL.Get("players", "identifier = 'steam:110000103fa6fc1'")
if #result > 0 then
    local player = result[1]
    print("Player name: " .. player.name)
    print("Player money: " .. player.money)
end

-- Get players with money > 1000
local richPlayers = Bridge.SQL.Get("players", "money > 1000")
print("Found " .. #richPlayers .. " rich players")
```

## GetAll (Server)

### Description
Retrieves all records from a table without any filtering.

### Syntax
```lua
SQL.GetAll(tableName)
```

### Parameters
- **tableName** (string): Name of the table to query

### Returns
- (table): Array of all records in the table

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()

local allPlayers = Bridge.SQL.GetAll("players")
print("Total players in database: " .. #allPlayers)

for i, player in ipairs(allPlayers) do
    print(string.format("%d. %s - $%d", i, player.name, player.money))
end
```

## Delete (Server)

### Description
Deletes records from a table based on a WHERE condition.

### Syntax
```lua
SQL.Delete(tableName, where)
```

### Parameters
- **tableName** (string): Name of the table to delete from
- **where** (string): WHERE clause condition (without the WHERE keyword)

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()

-- Delete specific player
Bridge.SQL.Delete("players", "identifier = 'steam:110000103fa6fc1'")
print("Player deleted from database")

-- Delete inactive players (example condition)
Bridge.SQL.Delete("players", "last_login < DATE_SUB(NOW(), INTERVAL 30 DAY)")
print("Inactive players cleaned up")
```

