# Cerberus
Purpose-built moderation "cases" Discord bot.
This bot can be deployed/run independently without much effort.
Meant for small-to-medium scale moderation.

Designed for one guild and not multiple.

# Installation & Running
Clone the repository. Install the dependencies in `npm.sh`.
Copy `example.env` to `.env` and modify.
See `/modules/rolesystem` for additional roles/adjustments.

Tested on Debian 10 (Linux)

> ( Install NodeJS 16+ )
>
> `git clone https://github.com/shir0tetsuo/Cerberus`
>
> `cd Cerberus/`
>
> `cp example.env .env`
>
> ( Create a Discord bot under Applications in Discord's Developer page, [x] intentions, invite bot, copy the bot's private token for the `.env` file )
>
> `nano .env` or with some other editor, modify `TOKEN`, `OWNER`
>
>> `nano modules/dbi.js` or with some other editor, append bot support and bot administrator
> User IDs to `Line 9` (botadmins) array and `Line 12` (botsupport) array as needed
>
> `npm ci` or `sudo chmod u+x npm.sh; ./npm.sh` to install npm dependencies.
>
> `node Cerberus.js` or `node Cerberus.js &disown` to daemon.

# Dependencies
See `npm.sh` or `package.json`.

`NodeJS v16(.15.1)` `Discord.js v13(.8.1)` `colorette v2(.0.19)`
`moment 2(.29.4)` `sequelize v6(.21.2)` `sqlite3 v5(.0.8)`
`dotenv v16(.0.1)` `time-utilities v1(.0.2)` `canvas v2(.9.3)`

# Commands
Default Prefix = `??`

>name | permission level | description
>> `help (0)` displays list of available commands.
