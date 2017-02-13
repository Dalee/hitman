import React from 'react';
import {Grid} from 'semantic-ui-react';

/**
 * Main layout
 */
class Layout extends React.Component {

    static get propTypes() {
        return {
            children: React.PropTypes.node
        };
    }

    render() {
        return (
            <div>
                <Grid padded>
                    <Grid.Row color="black">
                        <Grid.Column textAlign="left">Registry Browser</Grid.Column>
                    </Grid.Row>
                </Grid>
                {this.props.children}
            </div>
        );

    }

}

export default Layout;
