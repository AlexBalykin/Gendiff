
install: install-deps

install-deps:
	npm ci

lint:
	npx eslint .

publish:
	npm publish

link:
	sudo npm link

git:
	git push -u origin master

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

.PHONY: test