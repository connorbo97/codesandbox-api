#
# Vars
#

BIN = ./node_modules/.bin
.DEFAULT_GOAL := all

#
# Tasks
#

node_modules: package.json
	@npm install
	@touch node_modules

test: node_modules
	@${BIN}/tape test/*

validate: node_modules
	@standard

all: validate test

init:
	@git init
	@git add .
	@git commit -am "FIRST"
	@hub create joshrtay/prosh -d "A promise shell."
	@travis enable
	@git push -u origin master

#
# Phony
#

.PHONY: test validate clean build all init
