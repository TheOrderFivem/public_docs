# Phone 📱

<!--META
nav: true
toc: true
description: The Phone module provides functions for integrating with various phone systems, including retrieving player phone numbers and sending emails.
-->

The Phone module provides functions for integrating with various phone systems, including retrieving player phone numbers and sending emails.

## Overview

The Phone module provides smartphone simulation with apps, messaging, and communication systems.

## SendEmail (Client)

### Description
This will send an email to the passed email address with the title and message.

### Syntax
```lua
Bridge.Phone.SendEmail(email, title, message)
```

### Parameters
- **email** (string): 
- **title** (string): 
- **message** (string): 

### Returns
- (boolean): 

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()\n\nBridge.Phone.SendEmail()
```

## GetPhoneName (Client)

### Description
This will get the name of the Phone system being being used.

### Syntax
```lua
Bridge.Phone.GetPhoneName()
```

### Returns
- (string): 

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()\n\nBridge.Phone.GetPhoneName()
```

## GetPhoneName (Server)

### Description
Gets the name of the currently active phone system.

### Syntax
```lua
Bridge.Phone.GetPhoneName()
```

### Returns
- (string): Name of the phone system being used

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local phoneSystem = Bridge.Phone.GetPhoneName()
print("Using phone system: " .. phoneSystem)
```

## GetPlayerPhone (Server)

### Description
Gets the phone number of a specific player.

### Syntax
```lua
Bridge.Phone.GetPlayerPhone(src)
```

### Parameters
- **src** (number): Player server ID

### Returns
- (string|boolean): Player's phone number or false if not found/supported

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local phoneNumber = Bridge.Phone.GetPlayerPhone(source)
if phoneNumber then
    print("Player's phone number: " .. phoneNumber)
else
    print("Phone number not available")
end
```

## SendEmail (Server)

### Description
Sends an email to a specific player through their phone system.

### Syntax
```lua
Bridge.Phone.SendEmail(src, email, title, message)
```

### Parameters
- **src** (number): Player server ID to send email to
- **email** (string): Sender email address
- **title** (string): Email subject/title
- **message** (string): Email message content

### Returns
- (boolean): True if email was sent successfully, false otherwise

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Send a welcome email
local success = Bridge.Phone.SendEmail(
    source,
    "admin@cityserver.com",
    "Welcome to the City!",
    "Thank you for joining our server. Please read the rules and have fun!"
)

if success then
    print("Welcome email sent!")
else
    print("Failed to send email")
end
```

