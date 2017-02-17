package controllers

import (
	"gopkg.in/macaron.v1"
	"hitman/pkg/application"
)

// IndexHandler return repository tree
func IndexHandler(ctx *macaron.Context, app *application.App) {
	tree, err := app.Registry.GetTree(ctx.Query("path"))
	if err != nil {
		ctx.Error(500, err.Error())
	} else {
		ctx.JSON(200, tree)
	}
}

// ImageHandler return contents for a given repository
func ImageHandler(ctx *macaron.Context, app *application.App) {
	tags, err := app.Registry.GetImageDigestList(ctx.Query("path"))
	if err != nil {
		ctx.Error(500, err.Error())
	} else {
		ctx.JSON(200, tags)
	}
}

// DeleteHandler delete digest from registry
func DeleteHandler(ctx *macaron.Context, app *application.App) {
	err := app.Registry.DeleteImageDigest(ctx.Query("path"), ctx.Query("tag"))
	if err != nil {
		ctx.Error(500, err.Error())
	} else {
		ctx.PlainText(200, []byte("Deleted.."))
	}
}
