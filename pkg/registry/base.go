package registry

import (
	"strings"
	"fmt"
)

type (
	Registry struct {
		url string // base URL
	}

	RepositoryDigest struct {
		Path    string `json:"path"`
		Name    string `json:"name"`
		TagList []string `json:"tags"`
	}

	RepositoryDigestList struct {
		Children []*RepositoryDigest `json:"children"`
	}

	RepositoryImage struct {
		Path   string `json:"path"`
		Name   string `json:"name"`
		Parent *RepositoryLeaf `json:"-"`
	}

	RepositoryLeaf struct {
		Name     string `json:"name"`
		Path     string `json:"path"`
		Images   []*RepositoryImage `json:"images"`
		Children []*RepositoryLeaf `json:"children"`
		Parent   *RepositoryLeaf `json:"-"`
	}
)

//
func New(registryUrl string) *Registry {
	registryUrl = strings.TrimRight(registryUrl, "/")
	registryUrl = fmt.Sprintf("%s/v2", registryUrl)

	registry := &Registry{
		url: registryUrl,
	}

	return registry
}
