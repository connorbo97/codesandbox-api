#
# Vars
#

BIN = ./node_modules/.bin
.DEFAULT_GOAL := all

#
# Tasks
#

test:
	@node test/*

validate:
	@standard

all: validate test

init:
	@git init
	@git add .
	@git commit -am "FIRST"
	@hub create joshrtay/find-mod -d "Find the closest directory containing node_modules."
	@travis enable
	@git push -u origin master

#
# Phony
#

.PHONY: test validate all init
