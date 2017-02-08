import React from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import {viewLoad} from "../actions/view";

class TreeItemList extends React.Component {

    onClick(path) {
        this.props.fetchData(path);
    }

    renderImg(image) {
        return (
            <li key={image.path} className="tree-list-image">
                <Link to={{pathname: '/', query: {path: image.path}}} onClick={this.onClick.bind(this, image.path)} activeClassName="active">
                    {image.name}
                </Link>
            </li>
        )
    }

    render() {
        const leaf = this.props.leaf;
        return (
            <ul>
                {leaf.images.length > 0 && leaf.images.map((image) => this.renderImg(image))}
            </ul>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (path) => dispatch(viewLoad(path))
    };
};

export default connect(null, mapDispatchToProps)(TreeItemList);
