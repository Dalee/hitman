# Docker Distribution (Registry) UI

[![Build Status](https://travis-ci.org/Dalee/hitman.svg?branch=master)](https://travis-ci.org/Dalee/hitman)
[![codecov](https://codecov.io/gh/Dalee/hitman/branch/master/graph/badge.svg)](https://codecov.io/gh/Dalee/hitman)
[![Go Report Card](https://goreportcard.com/badge/github.com/Dalee/hitman)](https://goreportcard.com/report/github.com/Dalee/hitman)
[![](https://images.microbadger.com/badges/image/dalee/hitman.svg)](https://microbadger.com/images/dalee/hitman "Get your own image badge on microbadger.com")
[![](https://images.microbadger.com/badges/version/dalee/hitman.svg)](https://microbadger.com/images/dalee/hitman "Get your own version badge on microbadger.com")

Web UI for Private Docker Distribution (Registry).

## Features

 * Browse Registry ([Semantic React UI](http://react.semantic-ui.com/))
 * Delete images from Registry
 * more coming..

## Requirements

 * [Registry 2.6+](https://hub.docker.com/r/library/registry/tags/) (should be ok with `> 2.3` but untested)
 * CLI access to host where Registry is running (run `garbage-collect` command)

## Prebuilt docker image

Run somewhere on Docker enabled host:
```bash
$ docker pull dalee/hitman
$ docker run \
    -e MACARON_ENV=production \
    -e REGISTRY_URL=https://registry.example.com:5000/ \
    dalee/hitman
```

Put command to your favourite scheduler (cron, ci, etc..)
```bash
$ docker exec -it docker.registry \
    bin/registry garbage-collect /etc/docker/registry/config.yml
```

Where `docker.registry` is name of container running Docker Registry.

## Common pitfalls

 * There is no auth, so, restrict access to UI via frontend (NGINX `deny/allow` for example)
 * Multiple `tags` could point to single `digest`
 (you can have `latest` and `v1.0.1` tags, but they actually single image, so be careful)
 * Tag deletion will not free you hard drive space until `garbage-collect` command is issued
 * Depending on storage driver, you may have to manually delete empty repositories (ui will show you hint)

## Licensing

Software is licensed under the Apache License, Version 2.0. See LICENSE for the full license text.

## Development

 * Golang >= 1.7.x
 * Node.js >= 6.9.x
 * [golint](https://github.com/golang/lint)
 * [glide](https://github.com/Masterminds/glide)
 * make


Setting up developer dependencies:
```bash
$ make install
```

You can also you yarn instead:
```bash
$ yarn --pure-lockfile
```

Run server:
```bash
$ go run ./bin/main.go -registry-url=https://registry.example.com:5000/
```

Full list of commands:
 * `make docker` - build docker image
 * `make install` — install all development dependencies
 * `make format-backend` — gofmt sources
 * `make test` — test backend and frontend code
 * `make test-backend` — test backend sources
 * `make test-frontend` — test frontend sources
 * `make coverage-backend ; go tool cover -html=coverage.txt` — display backend coverage

Build UI (required after any jsx/css change):
```bash
$ npm run build
```

Point your browser to `http://localhost:4000/`
