.PHONY: install lint build dev start ci clean

install:
	npm ci

lint:
	npm run lint

build:
	NEXT_TELEMETRY_DISABLED=1 npm run build

dev:
	npm run dev

start:
	npm run start

ci: install lint build

clean:
	rm -rf .next node_modules
