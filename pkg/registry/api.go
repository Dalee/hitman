package registry

import (
	"fmt"
	"github.com/forestgiant/sliceutil"
	"strings"
)

// IsValidURL checks that provided registryURL is pointed to a registry v2
func (r *Registry) IsValidURL() bool {
	resp, err := r.reqHead("/") // actually is /v2/ request
	if err != nil {
		return false
	}

	if resp.StatusCode() != 200 {
		return false
	}

	apiVersion := resp.Header().Get("Docker-Distribution-API-Version")
	if strings.Compare(apiVersion, "registry/2.0") != 0 {
		return false
	}

	return true
}

// GetTree returns tree of repositories and images registered in registry
func (r *Registry) GetTree(path string) (*RepositoryLeaf, error) {
	resp, err := r.getCatalog()
	if err != nil {
		return nil, err
	}

	// getCatalog return whole list anyway, so just creating tree
	// from received response..
	tree := newTree()
	for _, item := range resp.Repositories {
		tree.addItem(item)
	}

	// if requested only part of tree, cut it there
	if path != "" {
		leaf := tree.findLeafByPath(path)
		if leaf == nil {
			err = fmt.Errorf("Path: %s doesn't exists in tree", path)
		}
		return leaf, err
	}

	return tree, nil
}

// GetImageDigestList return image information (tags are grouped by digest)
func (r *Registry) GetImageDigestList(path string) (*RepositoryDigestList, error) {
	resp, err := r.getTagList(path)
	if err != nil {
		return nil, err
	}

	tagList := &RepositoryDigestList{
		Children: make([]*RepositoryDigest, 0),
	}

	digestTag := make(map[string][]string, 0)
	digestOrder := make([]string, 0)

	// multiple tags can refer to one digest, so we need to merge them here
	for _, tag := range resp.Tags {
		digest, err := r.getManifestDigest(path, tag)
		if err != nil {
			return nil, err
		}

		digestTag[digest] = append(digestTag[digest], tag)
		if !sliceutil.Contains(digestOrder, digest) {
			digestOrder = append(digestOrder, digest)
		}
	}

	// format final digest -> [tag, ...] structure
	for _, digestKey := range digestOrder {
		digestKeyList := digestTag[digestKey]
		tag := &RepositoryDigest{
			Name:    digestKey,
			Path:    path,
			TagList: digestKeyList,
		}
		tagList.Children = append(tagList.Children, tag)
	}

	return tagList, nil
}

// DeleteImageDigest delete digest from repository
func (r *Registry) DeleteImageDigest(path, tag string) error {
	return r.deleteDigest(path, tag)
}
