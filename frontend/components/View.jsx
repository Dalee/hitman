import React from "react";
import {connect} from "react-redux";
import ViewTagList from "./ViewTagList";

class View extends React.Component {

    render() {
        if (this.props.isError) {
            return (
                <h2>Error :(</h2>
            )
        }

        if (this.props.isLoading) {
            return (
                <h2>Loading...</h2>
            )
        }

        if (this.props.view) {
            return (
                <ViewTagList view={this.props.view} path={this.props.path}/>
            )
        }

        return (
            <h2>Please select image</h2>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.viewLoading,
        view: state.view,
        isError: state.viewLoadError
    };
};


export default connect(mapStateToProps, null)(View);
