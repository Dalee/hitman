package registry

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

// ensure new tree works as expected
func TestNewTree(t *testing.T) {
	tree := newTree()

	assert.Nil(t, tree.Parent, "Parent should be 'nil' for root leaf")
	assert.Equal(t, tree.Path, "/", "Root leaf path should be '/'")
	assert.Equal(t, tree.Name, "/", "Root leaf name should be '/'")

	assert.NotNil(t, tree.Children, "Root leaf Children should not be 'nil'")
	assert.NotNil(t, tree.Images, "Root leaf Images should not be 'nil'")
}

// ensure new leaf works as expected
func TestNewLeaf(t *testing.T) {
	tree := newTree()
	leaf := tree.newLeaf("hello")

	assert.Equal(t, leaf.Parent, tree, "Leaf parent should be root leaf")
	assert.Equal(t, leaf.Name, "hello", "Leaf name should be correct")
	assert.Equal(t, leaf.Path, "hello", "Leaf path should be correct")

	assert.NotNil(t, leaf.Children, "Leaf children should not be 'nil'")
	assert.NotNil(t, leaf.Images, "Leaf images should not be 'nil'")

	assert.Equal(t, len(leaf.Children), 0, "Leaf children count should be '0'")
	assert.Equal(t, len(leaf.Images), 0, "Leaf images should should be '0'")
}

// ensure addItem works as expected
func TestAddItem(t *testing.T) {
	tree := newTree()

	tree.addItem("hello/world")
	assert.Equal(t, len(tree.Children), 1, "Root leaf should exactly one child")

	child1 := tree.Children[0]
	assert.Equal(t, child1.Name, "hello", "Leaf should have name 'hello'")
	assert.Equal(t, child1.Path, "hello", "Leaf should have path 'hello'")
	assert.Equal(t, child1.Parent, tree, "Leaf parent should be root leaf")
	assert.Equal(t, len(child1.Images), 1, "Leaf should have one image")
	assert.Equal(t, len(child1.Children), 0, "Leaf should not have any children")

	image1 := child1.Images[0]
	assert.Equal(t, image1.Name, "world", "Image name should be 'world'")
	assert.Equal(t, image1.Path, "hello/world", "Image path should be 'hello/world'")
	assert.Equal(t, image1.Parent, child1, "Image parent should be child leaf")
}

// ensure findLeafByName works as expected
func TestFindLeafByName(t *testing.T) {
	tree := newTree()

	tree.addItem("hello/world/sample_repo")
	assert.Equal(t, len(tree.Children), 1, "Root leaf should exactly one child")

	root := tree.findLeafByName("hello")
	assert.NotNil(t, root)
	assert.Equal(t, root.Name, "hello")
	assert.Equal(t, root.Path, "hello")

	same := root.findLeafByName("hello")
	assert.NotNil(t, same)
	assert.Equal(t, root, same)

	child := tree.findLeafByName("world")
	assert.NotNil(t, child)
	assert.Equal(t, child.Name, "world")
	assert.Equal(t, child.Path, "hello/world")

	missed := tree.findLeafByName("missed")
	assert.Nil(t, missed)
}

// ensure findLeafByPath works as expected
func TestFindLeafByPath(t *testing.T) {
	tree := newTree()

	tree.addItem("hello/world/sample_repo")
	assert.Equal(t, len(tree.Children), 1, "Root leaf should exactly one child")

	root := tree.findLeafByPath("hello")
	assert.NotNil(t, root)
	assert.Equal(t, root.Name, "hello")
	assert.Equal(t, root.Path, "hello")

	same := root.findLeafByPath("hello")
	assert.NotNil(t, same)
	assert.Equal(t, root, same)

	child := tree.findLeafByPath("hello/world")
	assert.NotNil(t, child)
	assert.Equal(t, child.Name, "world")
	assert.Equal(t, child.Path, "hello/world")

	missed := tree.findLeafByPath("missed")
	assert.Nil(t, missed)
}
