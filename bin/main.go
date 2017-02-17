package main

import (
	"errors"
	"flag"
	"fmt"
	"gopkg.in/macaron.v1"
	"hitman/pkg/application"
	"hitman/pkg/controllers"
	"os"
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

	// define routes
	m.Get("/tree", controllers.IndexHandler)
	m.Get("/image", controllers.ImageHandler)
	m.Post("/delete", controllers.DeleteHandler)

	app.RunForever(m)
}
