# Ingame data index

This folder contains all variables that are used throughout the game, such as channel IDs and setup details. Most data are generated within a separate private repository to prevent cheating. Fixed information such as role details are not listed here.

This document describes the content and usage of each file, mostly as reminder to myself to keep things organized. They are listed in order of appearance and importance in a regular game.

## setup.json
Referred to as: `dataSetup` and `fnSetup`
- All applicable variables concerning the current setup.
- Day/Night lengths are given in ms.
- Chat availability index:
  - 0: Always
  - 1: Only during daytime
  - 2: Only during nighttime
  - 3: Never
- Replaces `rolelist.json` in legacy versions.

## channel.json
(Referred to as: `dataChannel` and `fnChannel`)
- Describes common category and channel IDs used throughout the game, such as public channels and private faction channels.
- Category IDs are currently hardcoded.
- Replaces `ch.json` in legacy versions.

## time.json
(Referred to as: `dataTime` and `fnTime`)
- Description of the server's `gamestate`. (Unused as of August 24)
  - 0: No game
  - 1: Signups open
  - 2: Pregame
  - 3: Ingame
  - 4: Game end
- Description of the current time phase (`dayNo` and `phase`) and the `timeoutID` associated with it.
- `nextPhase`'s timestamp for countdowns.
- `logbookEntries`, an array with array entries of the format `event, [args...]`.
  - `"death", alphaID, cause`: Player death event.
  - `"attorney", alphaID`: Attorney protection event.
  - `"amnesiac", role`: Amnesiac recall event.
  - `"secretary", faction`: Secretary side event.
  - `"reveal", alphaID, role`: Role reveal event.
  - `"trialdeath", alphaID, voteCount`: Death by trial event.
- Replaces part of `attri.json` in legacy versions.

## player.json
(Referred to as: `dataPlayer` and `fnPlayer`)
- User ID (`userId`), private channel ID (`channelId`) and role name (`role`) tied to ingame alphabetical IDs.
- Replaces `id.json` in legacy versions.

## effect.json
(Referred to as: `dataEffect` and `fnEffect`)
- Player status effects.
- Replaces part of `attri.json` in legacy versions.

## ability.json
(Referred to as: `dataAbility` and `fnAbility`)
- Player visits. Action arguments depend on their role provided in `player.json`.
  - Abilities who accept multiple targets are always given in arrays.
  - Players with more than one ability are always tracked as an object, with a key for each ability.
  - Ability value is `true` when targeting the executor.
  - Ability value is `false` when no target has been selected.
  - Players that do not possess abilities or only instant abilities are not tracked in this file.
- Status messages computed from interactions between abilities.
- This file is cleared every phase switch.

## lastwill.json
(Referred to as: `dataWill` and `fnWill`)
- Content of all last wills, with letters as key.
- Replaces `will.json` in legacy versions.

## whisper.json
(Referred to as: `dataWhisper` and `fnWhisper`)
- Miscellaneous data concerning whispers, currently only used by `lover`s game mode.
- Replaces `w.json` in legacy versions.
