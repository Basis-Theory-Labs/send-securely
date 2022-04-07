MAKEFLAGS += --silent

dev:
	./scripts/dev.sh

acceptance:
	yarn cypress:open
