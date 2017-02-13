import React from 'react';
import {connect} from 'react-redux';
import {locationShape} from 'react-router';
import ImageTree from '../../components/ImageTree/ImageTree';
import DigestList from '../../components/DigestList/DigestList';
import {Grid} from 'semantic-ui-react';

import {requestImages} from '../../actions/images';
import {requestDigest} from '../../actions/digest';
import {requestTagDeletion} from '../../actions/tag';

/**
 * Renders index page
 */
class IndexPage extends React.Component {

    static get propTypes() {
        return {
            location: locationShape.isRequired,
            requestImages: React.PropTypes.func.isRequired,
            requestDigest: React.PropTypes.func.isRequired,
            requestTagDeletion: React.PropTypes.func.isRequired
        };
    }

    componentDidMount() {
        this.props.requestImages();

        const path = this.props.location.query.path;
        if (path) {
            this.props.requestDigest(path);
        }
    }

    render() {
        const path = this.props.location.query.path;

        return (
            <Grid columns={2} padded>
                <Grid.Column width={4}>
                    <ImageTree {...this.props.images}
                               path={path}
                               loadView={this.props.requestDigest} />
                </Grid.Column>
                <Grid.Column width={8}>
                    <DigestList {...this.props.digest}
                                path={path}
                                deleteTag={this.props.requestTagDeletion} />
                </Grid.Column>
            </Grid>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        requestImages: () => dispatch(requestImages()),
        requestDigest: path => dispatch(requestDigest(path)),
        requestTagDeletion: (path, tag) => dispatch(requestTagDeletion(path, tag))
    };
};

const mapStateToProps = state => {
    return {
        images: state.images,
        digest: state.digest
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
