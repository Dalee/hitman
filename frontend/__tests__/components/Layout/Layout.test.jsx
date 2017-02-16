import React from 'react';
import Layout from '../../../components/Layout/Layout';
import {shallow} from 'enzyme';

describe('Layout', () => {

    it('should render children within', () => {
        const component = shallow(
            <Layout>
                <h2 className="test_title">My new site</h2>
            </Layout>
        );

        const title = component.find('h2.test_title').text();
        expect(title).toEqual('My new site');
    });

});
