import React from "react";
import {connect} from "react-redux";
import AppLayout from "../containers/AppLayout";
import Tree from "../components/Tree";
import View from "../components/View";
import {treeLoad} from "../actions/tree";
import {viewLoad} from "../actions/view";

class Index extends React.Component {

    componentDidMount() {
        const path = this.props.location.query.path || null;

        this.props.loadTree();
        if (path) {
            this.props.loadView(path);
        }
    }

    render() {
        const path = this.props.location.query.path || null;
        return (
            <AppLayout>
                <div className="pure-g">
                    <div className="pure-u-1-3 app-left-panel">
                        <Tree path={path}/>
                    </div>
                    <div className="pure-u-2-3 app-right-panel">
                        <View path={path}/>
                    </div>
                </div>
            </AppLayout>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadTree: () => dispatch(treeLoad()),
        loadView: (path) => dispatch(viewLoad(path))
    };
};

export default connect(null, mapDispatchToProps)(Index);
