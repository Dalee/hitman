import React from 'react';
import ErrorPage404 from '../../../../components/Pages/ErrorPage404/ErrorPage404';
import {shallow} from 'enzyme';

describe('ErrorPage404', () => {

    it('should render 404 header', () => {
        const component = shallow(<ErrorPage404 />);

        const title = component.find('h1').text();
        expect(title).toEqual('404');
    });

    it('should render 404 content', () => {
        const component = shallow(<ErrorPage404 />);

        const title = component.find('p').text();
        expect(title).toEqual('Oops, something went wrong...');
    });

});
