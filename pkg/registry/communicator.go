package registry

import (
	"encoding/json"
	"fmt"
	"gopkg.in/resty.v0"
	"sort"
	"strings"
)

type (
	// private responses
	catalogResponse struct {
		Repositories []string `json:"repositories"`
	}

	tagListResponse struct {
		Tags []string `json:"tags"`
	}
)

// return sorted list of repositories
func (r *Registry) getCatalog() (*catalogResponse, error) {
	resp, err := r.reqGet("_catalog")
	if err != nil {
		return nil, err
	}

	catalog := &catalogResponse{
		Repositories: make([]string, 0),
	}

	if err = json.Unmarshal(resp.Body(), catalog); err != nil {
		return nil, err
	}

	sort.Strings(catalog.Repositories)

	return catalog, nil
}

// return sorted list of tags for repository
func (r *Registry) getTagList(name string) (*tagListResponse, error) {
	resp, err := r.reqGet(fmt.Sprintf("%s/tags/list", name))
	if err != nil {
		return nil, err
	}

	tagList := &tagListResponse{
		Tags: make([]string, 0),
	}

	if err = json.Unmarshal(resp.Body(), tagList); err != nil {
		return nil, err
	}

	sort.Strings(tagList.Tags)

	return tagList, nil
}

// delete digest from repository (one digest can refer to multiple tags)
func (r *Registry) deleteDigest(name, digest string) error {
	deleteResp, err := r.reqDelete(fmt.Sprintf("%s/manifests/%s", name, digest))
	if err != nil {
		return err
	}

	code := deleteResp.StatusCode()
	if code != 202 {
		return fmt.Errorf("Deletion request declined by registry with code: %d", code)
	}

	return nil
}

// return digest for a given tag
func (r *Registry) getManifestDigest(name, tag string) (string, error) {
	resp, err := r.reqHead(fmt.Sprintf("%s/manifests/%s", name, tag))
	if err != nil {
		return "", err
	}

	digest := resp.Header().Get("Docker-Content-Digest")
	if digest == "" {
		return "", fmt.Errorf("Empty digest for: %s:%s", name, tag)
	}

	return digest, nil
}

// DELETE helper
func (r *Registry) reqDelete(requestURI string) (*resty.Response, error) {
	requestURI = strings.TrimLeft(requestURI, "/")
	requestURL := fmt.Sprintf("%s/%s", r.url, requestURI)

	return resty.R().
		SetHeader("Accept", "application/vnd.docker.distribution.manifest.v2+json").
		Delete(requestURL)
}

// HEAD helper
func (r *Registry) reqHead(requestURI string) (*resty.Response, error) {
	requestURI = strings.TrimLeft(requestURI, "/")
	requestURL := fmt.Sprintf("%s/%s", r.url, requestURI)

	return resty.R().
		SetHeader("Accept", "application/vnd.docker.distribution.manifest.v2+json").
		Head(requestURL)
}

// GET helper
func (r *Registry) reqGet(requestURI string) (*resty.Response, error) {
	requestURI = strings.TrimLeft(requestURI, "/")
	requestURL := fmt.Sprintf("%s/%s", r.url, requestURI)

	return resty.R().
		SetHeader("Accept", "application/vnd.docker.distribution.manifest.v2+json").
		Get(requestURL)
}
