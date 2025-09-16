.PHONY: init run

F ?= src/finite_automaton.ts

init:
	@chmod +x ./bin/init-project.sh
	@./bin/init-project.sh

run:
	@ts-node $(F)
