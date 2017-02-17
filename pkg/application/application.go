package application

import (
	"gopkg.in/macaron.v1"
	"hitman/pkg/registry"
	"time"
)

type (
	// App is base definition for application
	App struct {
		Registry *registry.Registry
	}
)

// New creates new Application
func New(registryURL string) *App {
	return &App{
		Registry: registry.New(registryURL),
	}
}

// RunForever will run web ui and background app loop
func (app *App) RunForever(web *macaron.Macaron) {
	go func(app *App) {
		app.loop()
	}(app)
	web.Run() // here we block..
}

func (app *App) loop() {
	for {
		// Any background tasks?
		time.Sleep(100 * time.Millisecond)
	}
}
