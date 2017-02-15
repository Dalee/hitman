import React from 'react';
import {List, Label, Icon, Button} from 'semantic-ui-react';

class DigestItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            deleteConfirm: false,
            deleteInProgress: false
        };
    }

    static get propTypes() {
        return {
            path: React.PropTypes.string,
            name: React.PropTypes.string,
            tags: React.PropTypes.arrayOf(React.PropTypes.string),
            deleteTag: React.PropTypes.func
        };
    }

    /**
     * Toggles confirmation box
     *
     * @param {boolean} confirmState
     */
    toggleConfirmation(confirmState = false) {
        this.setState({deleteConfirm: confirmState});
    }

    /**
     * Deletes digest
     *
     * @param {string} path
     * @param {string} tag
     */
    onConfirmClick(path, tag) {
        this.setState({deleteInProgress: true});

        this.props.deleteTag(path, tag)
            .then(() => {
                this.setState({
                    deleteInProgress: false,
                    deleteConfirm: false
                });
            });
    }

    render() {
        return (
            <List.Item active={this.state.deleteConfirm}>
                    <List.Content floated="right">
                        {!this.state.deleteConfirm
                            ? <Button onClick={this.toggleConfirmation.bind(this, true)} color="red" icon="delete" size="mini" />
                            : <Button.Group size="tiny">
                                <Button disabled={this.state.deleteInProgress}
                                        onClick={this.toggleConfirmation.bind(this, false)}>
                                    Cancel
                                </Button>
                                <Button.Or />
                                <Button loading={this.state.deleteInProgress}
                                        onClick={this.onConfirmClick.bind(this, this.props.path, this.props.name)}
                                        color="red">
                                    Delete
                                </Button>
                            </Button.Group>}
                    </List.Content>
                    <List.Content>
                        <Label.Group color="blue" size="tiny">
                            {this.props.tags.map(tag => <Label key={tag}><Icon name="tag" />{tag}</Label>)}
                        </Label.Group>
                        <List.Description>{this.props.name}</List.Description>
                    </List.Content>
            </List.Item>
        );
    }

}

export default DigestItem;
