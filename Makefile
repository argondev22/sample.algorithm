.PHONY: init up run

F ?= src/finite_automaton.ts

init:
	@chmod +x ./bin/init-project.sh
	@./bin/init-project.sh

up:
	@npm install

run:
	@ts-node $(F)
