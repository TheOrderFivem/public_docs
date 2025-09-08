# <i class="fas fa-code-branch"></i> Version

<!--META
nav: true
toc: true
description: Automated version checking system that monitors GitHub releases and notifies administrators when updates are available. This module helps keep your Community Bridge installation up-to-date with the latest features and security improvements.
-->

Automated version checking system that monitors GitHub releases and notifies administrators when updates are available. This module helps keep your Community Bridge installation up-to-date with the latest features and security improvements.

## Overview

The Version module provides version checking, update notifications, and compatibility management functions.

## VersionChecker (Server)

### Description
Compares the current resource version with the latest GitHub release and prints an update notification if a newer version is available. The version is extracted from the resource's fxmanifest.lua version field.

### Syntax
```lua
Bridge.Version.VersionChecker(repoPath, tebex)
```

### Parameters
- **repoPath** (string): GitHub repository path in format 'username/reponame'
- **tebex** (boolean|nil): Optional flag for Tebex resources (shows CFX asset portal link instead of GitHub)

### Returns
- (nil): No description provided

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()
-- Check for Community Bridge updates
Bridge.Version.VersionChecker('The-Order-Of-The-Sacred-Framework/community_bridge', false)

-- Check for a Tebex resource
Bridge.Version.VersionChecker('myusername/my-premium-script', true)
```

