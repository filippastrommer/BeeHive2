#!/bin/bash

npx google-closure-compiler \
--language_in ECMASCRIPT5_STRICT \
--language_out ECMASCRIPT5_STRICT \
--warning_level DEFAULT \
--compilation_level WHITESPACE_ONLY \
--isolation_mode IIFE \
--js "./../../lib/rune.js" \
--js "./../../src/scope/Manifest.js" \
--js "./../../src/data/resource/Requests.js" \
--js "./../../src/scene/menu/Menu.js" \
--js "./../../src/scene/game/Player.js" \
--js "./../../src/scene/game/Bullet.js" \
--js "./../../src/scene/game/Game.js" \
--js "./../../src/scene/game/Bird.js" \
--js "./../../src/scene/game/Beekeeper.js" \
--js "./../../src/scene/game/Powerup.js" \
--js "./../../src/system/Main.js" \
--js "./../../src/scope/Alias.js" \
--js "./../../src/scene/game/Honeycomb.js" \
--js "./../../src/scene/menu/GameOverMenu.js" \
--js "./../../src/scene/howToPlay/HowToPlay.js" \
--js_output_file "./../../dist/beehive.js";