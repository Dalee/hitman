import React from "react";
import {connect} from "react-redux";
import {deleteTag} from "../actions/tag";

class ViewTagList extends React.Component {

    onDeleteClick(path, tag) {
        if (confirm(`Destroy tag: ${path}:${tag}?`)) {
            this.props.deleteTag(path, tag);
        }
    }

    renderTag(tag) {
        return (
            <span key={tag}>{tag}</span>
        )
    }

    renderDigest(digest) {
        const digestKey = digest.name.replace(':', '_');

        return (
            <tr key={digestKey}>
                <td>
                    <div className="tags">{digest.tags.map((tag) => this.renderTag(tag))}</div>
                    <div className="digest">{digest.name}</div>
                </td>
                <td style={{align: "center", width: "1em"}}>
                    <button
                        style={{color: "red"}}
                        onClick={this.onDeleteClick.bind(this, digest.path, digest.name)}
                        className="button-xsmall pure-button"
                    >
                        &#x2718;
                    </button>
                </td>
            </tr>
        );
    }

    render() {
        if (this.props.view.children.length > 0) {
            return (
                <table className="pure-table pure-table-striped">
                    <tbody>
                    {this.props.view.children.map((child) => this.renderDigest(child))}
                    </tbody>
                </table>
            )
        }

        return (
            <div>
                <h2>Repository is empty</h2>
                <p>
                    This repository can be safely deleted from registry.<br/>
                    This action depends on storage driver type.
                    In most cases, this can be done by deleting: <br/>
                    <pre>%registry_root%/registry/v2/repositories/{this.props.path}</pre>
                </p>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTag: (path, tag) => dispatch(deleteTag(path, tag))
    };
};

export default connect(null, mapDispatchToProps)(ViewTagList);

