MAKEFLAGS += --silent

dev:
	./scripts/dev.sh

verify:
	./scripts/verify.sh

stop-docker:
	docker-compose down -v

update-synthetic-tests:
	./scripts/update-synthetic-tests.sh
