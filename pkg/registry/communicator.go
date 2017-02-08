package registry

import (
	"strings"
	"fmt"
	"gopkg.in/resty.v0"
	"encoding/json"
	"errors"
	"sort"
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
func (r *Registry) deleteDigest(name, digest string) (error) {
	deleteResp, err := r.reqDelete(fmt.Sprintf("%s/manifests/%s", name, digest))
	if err != nil {
		return err
	}

	if deleteResp.StatusCode() != 202 {
		return errors.New("Deleting not accepted by registry")
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
		return "", errors.New(fmt.Sprintf("Empty digest for: %s:%s", name, tag))
	}

	return digest, nil
}

// DELETE helper
func (r *Registry) reqDelete(requestUri string) (*resty.Response, error) {
	requestUri = strings.TrimLeft(requestUri, "/")
	requestUrl := fmt.Sprintf("%s/%s", r.url, requestUri)

	return resty.R().
		SetHeader("Accept", "application/vnd.docker.distribution.manifest.v2+json").
		Delete(requestUrl)
}

// HEAD helper
func (r *Registry) reqHead(requestUri string) (*resty.Response, error) {
	requestUri = strings.TrimLeft(requestUri, "/")
	requestUrl := fmt.Sprintf("%s/%s", r.url, requestUri)

	return resty.R().
		SetHeader("Accept", "application/vnd.docker.distribution.manifest.v2+json").
		Head(requestUrl)
}

// GET helper
func (r *Registry) reqGet(requestUri string) (*resty.Response, error) {
	requestUri = strings.TrimLeft(requestUri, "/")
	requestUrl := fmt.Sprintf("%s/%s", r.url, requestUri)

	return resty.R().
		SetHeader("Accept", "application/vnd.docker.distribution.manifest.v2+json").
		Get(requestUrl)
}
