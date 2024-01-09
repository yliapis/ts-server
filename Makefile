
run:
	@echo "Running server"
	npx ts-node src/index.ts

install:
	@echo "Installing dependencies"
	nvm install 16
	nvm use 16
	npm install
