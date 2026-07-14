.PHONY: install lint typecheck build dev start ci clean

install:
	npm ci

lint:
	npm run lint

typecheck:
	npm run typecheck

build:
	NEXT_TELEMETRY_DISABLED=1 npm run build

dev:
	npm run dev

start:
	npm run start

ci: install lint typecheck build

clean:
	rm -rf .next node_modules
