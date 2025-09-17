.PHONY: init up

init:
	@chmod +x ./bin/init-project.sh
	@./bin/init-project.sh

up:
	@npm install
