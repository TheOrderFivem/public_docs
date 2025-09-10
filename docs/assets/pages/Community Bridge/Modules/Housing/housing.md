# <i class="fas fa-home"></i> Housing

<!--META
nav: true
toc: true
description: The Housing module provides integration with various housing systems and tracks when players enter or leave properties. It standardizes housing events across different housing resources.
-->

The Housing module provides integration with various housing systems and tracks when players enter or leave properties. It standardizes housing events across different housing resources.

## Overview

The Housing module provides property ownership, interior management, and real estate systems for players.

## Supported Systems

| System | Resource Name |
|--------|---------------|
| bcs housing | `bcs_housing` |
| esx property | `esx_property` |
| ps-housing | `ps_housing` |
| qb-apartments | `qb-apartments` |
| qb-houses | `qb-houses` |

The system automatically detects which housing resource is available and uses the appropriate implementation. If no supported housing system is found, the module will not provide housing functionality. Housing events and operations are standardized across different systems.