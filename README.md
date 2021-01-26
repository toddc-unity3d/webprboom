[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# WebPrBoom

WebPrBoom is a fork of the excellent [WebDOOM](https://github.com/UstymUkhman/webDOOM) WebAssembly port of [PrBoom](http://prboom.sourceforge.net/) that was originally developed by [UstymUkhman](https://github.com/UstymUkhman).

The original goal of WebPrBoom was to provide a version of PrBoom that is compatible with the Xbox One (series X/S) browser. Currently, WebPrBoom works well for most devices (including Xbox One) that support WebAssembly and have a physical input mechanism (gamepad, mouse/keyboard, etc.).

## Play

To play WebPrBoom, use one of the following URLs (GitHub is more reliable)

[http://webprboom.com](http://webprboom.com) 
or
[https://raz0red.github.io/webprboom](https://raz0red.github.io/webprboom) 

## Features

* Menu to select game to play (Doom 1/Shareware, Freedoom 1, and Freedoom 2)
* Gamepad support for menu and games
* Keyboard/mouse support for menu and games
* Save/load game support (persisted in browser storage)
* Configuration persistence (in browser storage)
* Support for Freedoom 1 and Freedoom 2
* Pointer lock support (for mouse input)

## Gamepad Controls

The following controls are described using the Xbox One controller. 

Equivalent controls for other controller types (PS4, Switch, etc.) should also be compatible.

|Name|Controls|Description|
|-|-|-|
|Move|D-Pad or Left Analog Stick| |
|Run|X Button| | 
|Fire|A Button| | 
|Strafe|B Button| | 
|Use|Y Button| | 
|Previous Weapon|Left Shoulder (LB)| |
|Next Weapon|Right Shoulder (RB)| |
|Show Menu|Left Trigger (LT) + Right Trigger (RT) + Left Analog Stick Click|**3 button combo**<br><br>This three button combo is required due to the Xbox One reserving the "Screen" and "Menu" buttons for browser-specific controls. To enter the menu, hold down the left and right trigger buttons and click (press down) on the left analog stick.|
|Full screen Toggle|View Button (Previously back button)|**Only for Xbox One**<br><br>This button toggles between full screen and browser (containing the address bar, etc.) modes.|
|Controls Menu|Menu Button (Previously start button)|**Only for Xbox One**<br><br>Displays a menu that allows for choosing between "browsing" and "game" controls.|
