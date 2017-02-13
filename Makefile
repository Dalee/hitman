
#
install:
	go get -u github.com/modocache/gover
	go get -u github.com/golang/lint/golint
	go get -u github.com/Masterminds/glide


# build and prepare new version
docker:
	mkdir -p ./build || true
	GOOS=linux GOARCH=amd64 go build -v -o ./build/hitman ./bin/main.go
	./node_modules/.bin/webpack --optimize-minimize -p --progress
	cp -fR ./public ./build/
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
	golint ./bin/ ./pkg/
	go test -v ./pkg/...

.PHONY: test docker
