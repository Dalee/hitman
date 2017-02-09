import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

class TreeLeaf extends React.Component {

    static get propTypes() {
        return {
            loadView: React.PropTypes.func,
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
            <ul>
                {(this.props.images || []).map(image => {
                    return (
                        <li key={image.path} className="tree-list-image">
                            <Link to={{pathname: '/', query: {path: image.path}}} onClick={this.onClick.bind(this, image.path)} activeClassName="active">
                                {image.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        );
    }
}

export default TreeLeaf;
