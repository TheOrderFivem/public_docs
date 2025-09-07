Welcome to Community Bridge! This guide will help you get up and running quickly.



1. Download the latest release from GitHub
2. Extract the `community_bridge` folder to your resources directory
3. Add `ensure community_bridge` to your server.cfg **after** your framework and **before** any scripts that use the bridge
4. Restart your server

```cfg
# Framework (choose one)
ensure es_extended
# or ensure qb-core
# or ensure qbx_core

# Community Bridge (after framework)
ensure community_bridge

# Your scripts that use Community Bridge (after bridge)
ensure your-script
ensure another-script
```


You can navigate to `community_bridge/settings` to customize the bridge settings. Here you can enable or disable specific modules, set default values, and configure compatibility with your resources



```lua
-- Initialize the bridge
local Bridge = exports['community_bridge']:Bridge()

-- Get player balance
local balance = Bridge.Banking.GetBalance()

-- Send notification
Bridge.Notify.Send("Hello World!", "success")

-- Add item to inventory
Bridge.Inventory.AddItem("bread", 5)
```




- Ensure the resource is started after your framework
- Check console for error messages
- Verify the resource name is exactly `community_bridge`

- Check if the module is enabled in config
- Verify you're using the correct syntax
- Enable debug mode for more information

- Make sure you're calling `exports['community_bridge']:Bridge()` correctly
- Ensure Community Bridge started successfully before your script
- Check the resource load order in server.cfg
