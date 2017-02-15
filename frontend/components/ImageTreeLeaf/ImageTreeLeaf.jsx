import React from 'react';
import {Link} from 'react-router';
import {List} from 'semantic-ui-react';

class ImageTreeLeaf extends React.Component {

    static get propTypes() {
        return {
            loadView: React.PropTypes.func.isRequired,
            images: React.PropTypes.arrayOf(React.PropTypes.shape({
                path: React.PropTypes.string,
                name: React.PropTypes.string
            }))
        };
    }

    /**
     * Fetches data for chosen leaf.
     *
     * @param {string} path
     */
    onClick(path) {
        this.props.loadView(path);
    }

    render() {
        return (
            <List.List>
                {this.props.images.map(image => {
                    return (
                        <List.Item key={image.path}>
                            <List.Icon name="file" />
                            <List.Content>
                                <Link to={{pathname: '/', query: {path: image.path}}}
                                      onClick={this.onClick.bind(this, image.path)}
                                      activeStyle={{fontWeight: 'bold', color: 'black'}}>
                                    {image.name}
                                </Link>
                            </List.Content>
                        </List.Item>
                    );
                })}
            </List.List>
        );
    }

}

export default ImageTreeLeaf;
