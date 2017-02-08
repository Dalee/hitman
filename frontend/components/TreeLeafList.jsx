import React from "react";
import TreeItemList from "./TreeItemList";

class TreeLeafList extends React.Component {

    renderLeaf(leaf, path) {
        return (
            <ul key={leaf.path}>
                <li className="tree-list-leaf">
                    <span>{leaf.name}</span>
                    {leaf.children.length > 0 && leaf.children.map((child) => this.renderLeaf(child))}
                    {leaf.images.length > 0 &&
                        <TreeItemList leaf={leaf} path={path} />
                    }
                </li>
            </ul>
        )
    }

    render() {
        return (
            <div className="tree-list">
                {this.renderLeaf(this.props.tree, this.props.path)}
            </div>
        )
    }
}

export default TreeLeafList;
