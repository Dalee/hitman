import React from 'react';
import ImageTreeLeaf from '../ImageTreeLeaf/ImageTreeLeaf';
import {List, Loader} from 'semantic-ui-react';

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
        const digests = leaf.images || [];

        return (
            <List.Item key={leaf.path}>
                <List.Icon name="folder" />
                <List.Content>
                    <List.Header>{leaf.name}</List.Header>
                    {children.length > 0 &&
                        <List.List>
                            {children.map(child => this.renderTree(child))}
                        </List.List>
                    }
                    {digests.length > 0 &&
                        <ImageTreeLeaf images={leaf.images} loadView={this.props.loadView} />
                    }
                </List.Content>
            </List.Item>
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
                <List>
                    {this.renderTree()}
                </List>
            );
        }

        return (
            <Loader active inline="centered">Loading</Loader>
        );
    }
}

export default ImageTree;
