package registry

import (
	"strings"
)

// create new tree and initialize root leaf
func newTree() *RepositoryLeaf {
	return &RepositoryLeaf{
		Parent: nil,
		Path: "/",
		Name: "/",
		Images: make([]*RepositoryImage, 0),
		Children: make([]*RepositoryLeaf, 0),
	}
}

// create new leaf for a tree
func (leaf *RepositoryLeaf) newLeaf(name string) *RepositoryLeaf {
	child := &RepositoryLeaf{
		Parent: leaf,
		Name: name,
		Images: make([]*RepositoryImage, 0),
		Children: make([]*RepositoryLeaf, 0),
	}

	leaf.Children = append(leaf.Children, child)
	child.Path = child.formatPath("") // do not append current name to path

	return child
}

// find leaf by name, beware, if start searching from /
// this method can return unexpected result
func (leaf *RepositoryLeaf) findLeafByName(name string) *RepositoryLeaf {
	if strings.Compare(leaf.Name, name) == 0 {
		return leaf;
	}

	for _, child := range leaf.Children {
		if strings.Compare(child.Name, name) == 0 {
			return child
		}

		founded := child.findLeafByName(name);
		if founded != nil {
			return founded
		}
	}

	return nil;
}

// get leaf by provided path
func (leaf *RepositoryLeaf) findLeafByPath(path string) *RepositoryLeaf {
	if strings.Compare(leaf.Path, path) == 0 {
		return leaf;
	}

	for _, child := range leaf.Children {
		if strings.Compare(child.Path, path) == 0 {
			return child
		}

		founded := child.findLeafByPath(path);
		if founded != nil {
			return founded
		}
	}

	return nil;
}

// add new group/image to tree
func (leaf *RepositoryLeaf) addItem(item string) {
	if strings.Contains(item, "/") {
		parts := strings.SplitN(item, "/", 2)
		child := leaf.findLeafByName(parts[0])
		if child == nil {
			child = leaf.newLeaf(parts[0])
		}

		child.addItem(parts[1])

	} else {
		leaf.Images = append(leaf.Images, &RepositoryImage{
			Path: leaf.formatPath(item),
			Name: item,
		})
	}
}

// build path to group/image
//
func (leaf *RepositoryLeaf) formatPath(imageName string) string {
	pathSlice := make([]string, 0)
	if imageName != "" {
		pathSlice = append(pathSlice, imageName)
	}

	p := leaf
	for {
		if p.Name != "/" {
			pathSlice = append(pathSlice, p.Name)
		}
		if p = p.Parent; p == nil {
			break
		}
	}

	// https://github.com/golang/go/wiki/SliceTricks
	for i := len(pathSlice)/2-1; i >= 0; i-- {
		opp := len(pathSlice)-1-i
		pathSlice[i], pathSlice[opp] = pathSlice[opp], pathSlice[i]
	}

	return strings.Join(pathSlice, "/")
}
