# ts-server

A simple http backend written in typescript as a learning experience.

# setup

read the Makefile

TODO: more description

# usage

TODO: describe routes available

# TODOs

1. get devenv working with node/npm/ts
2. write Makefile for installing/running server
3. set up the following routes:
```
# Create
POST /widget name=$NAME

# Read
GET /list_widgets
POST /list_widgets id=$ID

# Update
POST /widget id=$ID name=$NAME
# raise error if widget does not exist

# Delete
DELETE /widget id=$ID
```
