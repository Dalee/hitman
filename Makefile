
#
install:
	go get -u github.com/modocache/gover
	go get -u github.com/golang/lint/golint
	go get -u github.com/Masterminds/glide
	go get -u github.com/gordonklaus/ineffassign
	go get -u github.com/client9/misspell/cmd/misspell
	npm install
	glide install


# build and prepare new version
docker:
	mkdir -p ./build || true
	GOOS=linux GOARCH=amd64 go build -v -o ./build/hitman ./bin/main.go
	./node_modules/.bin/webpack --optimize-minimize -p --progress --config=./webpack.prod.config.js
	cp -fR ./public ./build/
	cp -f ./Dockerfile ./build/Dockerfile
	rm ./build/public/.gitignore
	docker build -t dalee/hitman:latest ./build/

# test whole project
test: test-backend test-frontend

# test frontend only
test-frontend:
	./node_modules/.bin/eslint frontend/
	./node_modules/.bin/jest --coverage

# test backend only
test-backend:
	golint -set_exit_status ./pkg/... ./bin/...
	ineffassign ./
	misspell -error README.md ./pkg/**/* ./bin/**/*
	gofmt -d -s -e ./bin/ ./pkg/
	go test -covermode=atomic ./pkg/...

format-backend:
	gofmt -d -w -s -e ./bin/ ./pkg/

.PHONY: test docker
