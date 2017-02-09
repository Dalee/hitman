import React from 'react';
import {connect} from 'react-redux';
import {locationShape} from 'react-router';
import Tree from '../../components/Tree/Tree';
import ImageTagList from '../../components/ImageTagList/ImageTagList';
import {treeLoad} from '../../actions/tree';
import {viewLoad} from '../../actions/view';
import {deleteTag} from '../../actions/tag';

/**
 * Renders index page
 */
class IndexPage extends React.Component {

    static get propTypes() {
        return {
            location: locationShape,
            isError: React.PropTypes.bool,
            isLoading: React.PropTypes.bool,
            image: React.PropTypes.shape({
                children: React.PropTypes.arrayOf(React.PropTypes.shape({
                    path: React.PropTypes.string,
                    name: React.PropTypes.string,
                    tags: React.PropTypes.arrayOf(React.PropTypes.string)
                }))
            })
        };
    }

    componentDidMount() {
        this.props.loadTree();

        const path = this.props.location.query.path;
        if (path) {
            this.props.loadView(path);
        }
    }

    render() {
        const path = this.props.location.query.path;

        return (
            <div className="pure-g">
                <div className="pure-u-1-3 app-left-panel">
                    <Tree {...this.props.tree}
                          path={path}
                          loadView={this.props.loadView} />
                </div>
                <div className="pure-u-2-3 app-right-panel">
                    <ImageTagList {...this.props.image}
                                  path={path}
                                  deleteTag={this.props.deleteTag} />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadTree: () => dispatch(treeLoad()),
        loadView: path => dispatch(viewLoad(path)),

        deleteTag: (path, tag) => dispatch(deleteTag(path, tag))
    };
};

const mapStateToProps = state => {
    return {
        image: {
            isLoading: state.viewLoading,
            isError: state.viewLoadError,
            image: state.view
        },
        tree: {
            isLoading: state.treeLoading,
            isError: state.treeLoadError,
            tree: state.tree
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
