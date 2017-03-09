package main

import (
	"errors"
	"flag"
	"fmt"
	"gopkg.in/macaron.v1"
	"hitman/pkg/application"
	"hitman/pkg/controllers"
	"io/ioutil"
	"os"
	"path/filepath"
)

func main() {
	// determine registry url
	var registryURL string

	flag.StringVar(&registryURL, "registry-url", "", "Registry URL")
	flag.Parse()

	if registryURL == "" {
		registryURL = os.Getenv("REGISTRY_URL")
	}
	if registryURL == "" {
		fmt.Println("Error:")
		fmt.Println("Provide -registry-url flag or set REGISTRY_URL environment variable")
		fmt.Println("For example: ")
		os.Exit(1)
	}

	app := application.New(registryURL)
	if app.Registry.IsValidURL() == false {
		panic(errors.New("Registry /v2/ request failed, check URL"))
	}

	m := macaron.New()
	m.Use(macaron.Static("public", macaron.StaticOptions{
		SkipLogging: true,
		IndexFile:   "index.html",
	}))
	m.Use(macaron.Renderer())
	m.Map(app)

	// api routes
	m.Get("/tree", controllers.IndexHandler)
	m.Get("/image", controllers.ImageHandler)
	m.Post("/delete", controllers.DeleteHandler)

	// catch-all-route
	m.Get("/", func(ctx *macaron.Context) {
		file, _ := filepath.Abs("public/index.html")
		data, err := ioutil.ReadFile(file)
		if err != nil {
			ctx.Error(500, err.Error())
			return
		}

		ctx.Header().Set("Content-Type", "text/html; encoding=utf-8")
		ctx.Resp.Write(data)
	})

	app.RunForever(m)
}
