# Constant text index

This folder contains all unchangeable (hardcoded) text and information that are used throughout not only the game, but the server as well. Changeable information such as ingame data are not listed here.

This document describes the content and usage of each file, mostly as reminder to myself to keep things organized. They are listed in order of importance and frequency in the entire server.

## index.json
Referred to as: `$index`
- All alphabetical arrays that are used throughout the game.

## function.js
Referred to as: `$function`
- Commonly used functions throughout the bot.

## rolelist.json
(Referred to as: `$roleList`)
- All role names sorted by category.
- Replaces `roles.json` and `roletype.json` (use `Object.keys()` instead) in legacy versions.

## rolemeta.json
(Referred to as: `$roleMeta`)
- All meta role data used internally for edge case comparisons and by `.role`.
- Separated into `always` and "state" (`0`, `1` etc) objects, where `always` always applies, but only one "state" object applies at a time as specified in the `data/ability.json` file.
- Observed keys (and default value if undefined):
  - `vote`: Defaults to **1**.
  - `attack`: Defaults to **0**. Includes attack tier-equivalent abilities.
  - `defense`: Defaults to **0**.
  - `detection`: Defaults to **false**.
  - `control`: Defaults to **false**.
  - `roleblock`: Defaults to **false**.
  - `absence`: Defaults to **false**.

## roleinfo.json
(Referred to as: `$roleInfo`)
- All role information that is human-readable, used primarily by `.role`.

## nicknames.json
(Referred to as: `$nicknames`)
- All possible enforced nickname pools.

## flavor.json
(Referred to as: `$flavor`)
- Random flavor text appended to interaction/self commands and server member leave/join events.
- Replaces `inout.json` in legacy versions.
