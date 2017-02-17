package registry

import (
	"fmt"
	"strings"
)

type (
	// Registry represent registry client
	Registry struct {
		url string // base URL
	}

	// RepositoryDigest represent repository image digest
	RepositoryDigest struct {
		Path    string   `json:"path"`
		Name    string   `json:"name"`
		TagList []string `json:"tags"`
	}

	// RepositoryDigestList represent list of RepositoryDigest
	RepositoryDigestList struct {
		Children []*RepositoryDigest `json:"children"`
	}

	// RepositoryImage represent repository image
	RepositoryImage struct {
		Path   string          `json:"path"`
		Name   string          `json:"name"`
		Parent *RepositoryLeaf `json:"-"`
	}

	// RepositoryLeaf represent any look-like-a-folder structure within Registry
	RepositoryLeaf struct {
		Name     string             `json:"name"`
		Path     string             `json:"path"`
		Images   []*RepositoryImage `json:"images"`
		Children []*RepositoryLeaf  `json:"children"`
		Parent   *RepositoryLeaf    `json:"-"`
	}
)

// New will create new Registry client
func New(registryURL string) *Registry {
	registryURL = strings.TrimRight(registryURL, "/")
	registryURL = fmt.Sprintf("%s/v2", registryURL)

	return &Registry{
		url: registryURL,
	}
}
