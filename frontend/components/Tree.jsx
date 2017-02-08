import React from "react";
import {connect} from "react-redux";
import TreeLeafList from "./TreeLeafList";

class Tree extends React.Component {

    render() {
        // we have error
        if (this.props.isError) {
            return (
                <p>Error during tree load</p>
            )
        }

        // we have loaded tree
        if (this.props.tree) {
            return (
                <TreeLeafList tree={this.props.tree} path={this.props.path} />
            )
        }

        // default..
        return (
            <h2>Loading</h2>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.treeLoading,
        tree: state.tree,
        isError: state.treeLoadError
    };
};

export default connect(mapStateToProps, null)(Tree);
