import React from 'react';
import {connect} from 'react-redux';
import ImageTreeLeaf from '../ImageTreeLeaf/ImageTreeLeaf';

class ImageTree extends React.Component {

    static get propTypes() {
        return {
            loadView: React.PropTypes.func,
            path: React.PropTypes.string,
            isError: React.PropTypes.bool,
            isLoading: React.PropTypes.bool,
            images: React.PropTypes.shape({
                path: React.PropTypes.string,
                name: React.PropTypes.string,
                children: React.PropTypes.array,
                images: React.PropTypes.arrayOf(React.PropTypes.shape({
                    path: React.PropTypes.string,
                    name: React.PropTypes.string
                }))
            })
        };
    }

    renderTree(leaf = this.props.images) {
        const children = leaf.children || [];

        return (
            <ul key={leaf.path}>
                <li className="tree-list-leaf">
                    <span>{leaf.name}</span>
                    {children.map(child => this.renderTree(child))}
                    {leaf.images.length > 0 && <ImageTreeLeaf images={leaf.images} loadView={this.props.loadView} />}
                </li>
            </ul>
        );
    }

    render() {
        if (this.props.isError) {
            return (
                <p>Error during tree load</p>
            );
        }

        if (this.props.images) {
            return (
                <div className="tree-list">
                    {this.renderTree()}
                </div>
            );
        }

        return (
            <h2>Loading</h2>
        );
    }
}

export default ImageTree;
