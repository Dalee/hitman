# Docker Registry Companion

[![](https://images.microbadger.com/badges/image/dalee/hitman.svg)](https://microbadger.com/images/dalee/hitman "Get your own image badge on microbadger.com")
[![](https://images.microbadger.com/badges/version/dalee/hitman.svg)](https://microbadger.com/images/dalee/hitman "Get your own version badge on microbadger.com")
[![Build Status](https://travis-ci.org/Dalee/hitman.svg?branch=master)](https://travis-ci.org/Dalee/hitman)
[![codecov](https://codecov.io/gh/Dalee/hitman/branch/master/graph/badge.svg)](https://codecov.io/gh/Dalee/hitman)
[![Go Report Card](https://goreportcard.com/badge/github.com/Dalee/hitman)](https://goreportcard.com/report/github.com/Dalee/hitman)

Companion tool for Private Docker Registry.

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

Setting up:
```bash
$ npm install && glide install
```

You can also you yarn instead:
```bash
$ yarn --pure-lockfile && glide install
```

Run server:
```bash
$ go run ./bin/main.go -registry-url=https://registry.example.com:5000/
```

Build ui (required after any jsx/css change):
```bash
$ npm run build
```

Point your browser to `http://localhost:4000/`

## Release new version

```
$ make docker
$ docker tag dalee/hitman:latest dalee/hitman:v1.x
```
