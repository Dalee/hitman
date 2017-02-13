import React from 'react';
import {List, Label, Icon, Button, Grid} from 'semantic-ui-react';

class DigestItem extends React.Component {

    static get propTypes() {
        return {
            path: React.PropTypes.string,
            name: React.PropTypes.string,
            tags: React.PropTypes.arrayOf(React.PropTypes.string),
            deleteTag: React.PropTypes.func
        };
    }

    /**
     * Dispatches item removal.
     *
     * @param {string} path
     * @param {string} tag
     */
    onDeleteClick(path, tag) {
        if (confirm(`Destroy tag: ${path}:${tag}?`)) {
            this.props.deleteTag(path, tag);
        }
    }

    render() {
        return (
            <List.Item>
                <List.Content>
                    <Grid columns={2}>
                        <Grid.Column  width={14}>
                            <Label.Group color="blue" size="tiny">
                                {this.props.tags.map(tag => <Label key={tag}><Icon name="tag" />{tag}</Label>)}
                            </Label.Group>
                            <List.Description>{this.props.name}</List.Description>
                        </Grid.Column>
                        <Grid.Column width={1}>
                            <Button color="red" icon="delete" size="mini" />
                        </Grid.Column>
                    </Grid>
                </List.Content>
            </List.Item>
        );
    }

    __render() {
        return (
            <table className="pure-table pure-table-striped">
                <tbody>
                    <tr>
                        <td>
                            <div className="tags">
                                {this.props.tags.map(tag => <span key={tag}>{tag}</span>)}
                            </div>
                            <div className="digest">{this.props.name}</div>
                        </td>
                        <td style={{align: "center", width: "1em"}}>
                            <button
                                style={{color: "red"}}
                                onClick={this.onDeleteClick.bind(this, this.props.path, this.props.name)}
                                className="button-xsmall pure-button"
                            >
                                &#x2718;
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }

}

export default DigestItem;
