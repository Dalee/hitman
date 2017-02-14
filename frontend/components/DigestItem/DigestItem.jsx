import React from 'react';
import {List, Label, Icon, Button, Grid} from 'semantic-ui-react';

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

    onDeleteClick() {
        // if (confirm(`Destroy tag: ${path}:${tag}?`)) {
        //     this.props.deleteTag(path, tag);
        // }

        this.setState({deleteConfirm: true});
    }

    onCancelClick() {
        this.setState({deleteConfirm: false});
    }

    onConfirmClick(path, tag) {
        this.setState({deleteInProgress: true});

        setTimeout(() => {
            this.setState({
                deleteInProgress: false,
                deleteConfirm: false
            });
        }, 4000);
    }

    render() {
        return (
            <List.Item>
                <List.Content>
                    <Grid columns={2}>
                        <Grid.Column width={13}>
                            <Label.Group color="blue" size="tiny">
                                {this.props.tags.map(tag => <Label key={tag}><Icon name="tag" />{tag}</Label>)}
                            </Label.Group>
                            <List.Description>{this.props.name}</List.Description>
                        </Grid.Column>
                        <Grid.Column width={2}>
                            {!this.state.deleteConfirm
                                ? <Button onClick={this.onDeleteClick.bind(this)} color="red" icon="delete" size="mini" />
                                : <Button.Group size="tiny">
                                    <Button disabled={this.state.deleteInProgress}
                                            onClick={this.onCancelClick.bind(this)}>
                                        Cancel
                                    </Button>
                                    <Button.Or />
                                    <Button loading={this.state.deleteInProgress}
                                            onClick={this.onConfirmClick.bind(this, this.props.path, this.props.name)}
                                            color="red">
                                        Delete
                                    </Button>
                                </Button.Group>}
                        </Grid.Column>
                    </Grid>
                </List.Content>
            </List.Item>
        );
    }

}

export default DigestItem;
