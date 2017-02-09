import React from 'react';
import Layout from './Layout';
import {shallow} from 'enzyme';

describe('Layout', () => {

    test('Renders children within', () => {
        const component = shallow(
            <Layout>
                <h2 className="test_title">My new site</h2>
            </Layout>
        );

        const title = component.find('h2.test_title').text();
        expect(title).toEqual('My new site');
    });

});
