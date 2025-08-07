MAKEFLAGS += --silent

dev:
	./scripts/dev.sh

verify:
	./scripts/verify.sh

stop-docker:
	docker compose down -v
