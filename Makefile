
# build and prepare new version
docker:
	mkdir -p ./build || true
	GOOS=linux GOARCH=amd64 go build -v -o ./build/hitman ./bin/main.go
	./node_modules/.bin/webpack --optimize-minimize -p --progress
	cp -fR ./public ./build/
	rm ./build/public/.gitignore
	cp -fR ./Dockerfile ./build/Dockerfile
	docker build -f ./build/Dockerfile -t dalee/hitman:latest ./build/

# test whole project
test: test-backend test-frontend

# test frontend only
test-frontend:
	./node_modules/.bin/eslint frontend/

# test backend only
test-backend:
	golint ./bin/ ./pkg/
	go test -v ./pkg/...


.PHONY: test docker
