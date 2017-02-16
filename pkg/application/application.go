package application

import (
	"gopkg.in/macaron.v1"
	"hitman/pkg/registry"
	"time"
)

type (
	App struct {
		Registry *registry.Registry
	}
)

//
func New(registryUrl string) *App {
	return &App{
		Registry: registry.New(registryUrl),
	}
}

//
func (app *App) RunForever(web *macaron.Macaron) {
	go func(app *App) {
		app.loop()
	}(app)
	web.Run() // here we block..
}

//
func (app *App) loop() {
	for {
		// Any background tasks?
		time.Sleep(100 * time.Millisecond)
	}
}
