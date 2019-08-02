# Constant text index

This folder contains all unchangeable (hardcoded) text and information that are used throughout not only the game, but the server as well. Changeable information such as ingame data are not listed here.

This document describes the content and usage of each file, mostly as reminder to myself to keep things organized. They are listed in order of importance and frequency in the entire server.

## index.json
Referred to as: `$index`
- All alphabetical arrays that are used throughout the game.

## function.js
Referred to as: `$function`
- Commonly used functions throughout the bot.

## role.json
(Referred to as: `$role`)
- All role names sorted by category.
- Replaces `roles.json` and `roletype.json` (use `Object.keys()` instead) in legacy versions.

## roleinfo.json
(Referred to as: `$roleInfo`)
- All detailed role information and various display options used in the command `.role`.

## nicknames.json
(Referred to as: `$nicknames`)
- All possible enforced nickname pools.

## flavor.json
(Referred to as: `$flavor`)
- Random flavor text appended to interaction/self commands and server member leave/join events.
- Replaces `inout.json` in legacy versions.
