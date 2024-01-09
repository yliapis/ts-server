# ts-server

A simple http backend written in typescript as a learning experience.

# setup

read the Makefile

TODO: more description

# usage

TODO: describe routes available

# TODOs

1. get devenv working with node/npm/ts [https://blog.logrocket.com/how-to-set-up-node-typescript-express/](https://blog.logrocket.com/how-to-set-up-node-typescript-express/) [DONE] 
2. write Makefile for installing/running server [DONE]
3. set up the following routes: [DONE]
```
# Create
POST /widget name=$NAME

# Read
GET /widget

# Update
POST /widget id=$ID name=$NAME
# raise error if widget does not exist

# Delete
DELETE /widget id=$ID
```
4. set up linting/formatting/etc [https://blog.logrocket.com/linting-typescript-eslint-prettier/](https://blog.logrocket.com/linting-typescript-eslint-prettier/)
5. use actual db for persistence, ie sqlite
