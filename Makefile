
docker:
	mkdir -p ./build || true
	GOOS=linux GOARCH=amd64 go build -v -o ./build/hitman ./bin/main.go
	./node_modules/.bin/webpack --optimize-minimize -p --progress
	cp -fR ./public ./build/
	rm ./build/public/.gitignore
	cp -fR ./Dockerfile ./build/Dockerfile
	docker build -f ./build/Dockerfile -t dalee/hitman:latest ./build/

test:
	./node_modules/.bin/eslint frontend/
	golint ./bin/ ./pkg/


.PHONY: test docker
