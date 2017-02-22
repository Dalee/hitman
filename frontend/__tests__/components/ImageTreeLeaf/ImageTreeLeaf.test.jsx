import React from 'react';
import ImageTreeLeaf from '../../../components/ImageTreeLeaf/ImageTreeLeaf';
import {shallow} from 'enzyme';
import {List} from 'semantic-ui-react';
import {Link} from 'react-router';

describe('ImageTreeLeaf', () => {

    it('should render images as List.Item', () => {
        const images = [
            {path: 'some/path', name: 'test'},
            {path: 'some/path2', name: 'test2'}
        ];
        const component = shallow(<ImageTreeLeaf loadView={jest.fn()} images={images} />);
        expect(component.find(List.Item).length).toEqual(images.length);
    });

    it('should render router Link', () => {
        const images = [{path: 'some/path', name: 'test'}];
        const component = shallow(<ImageTreeLeaf loadView={jest.fn()} images={images} />);
        expect(component.find(Link).length).toEqual(images.length);
    });

    it('should call loadView handler on Link click', () => {
        const images = [{path: 'some/path', name: 'test'}];
        const onLinkClick = jest.fn();
        const component = shallow(<ImageTreeLeaf loadView={onLinkClick} images={images} />);
        component.find(Link).simulate('click');

        expect(onLinkClick).toHaveBeenCalledTimes(1);
        expect(onLinkClick).toHaveBeenCalledWith(images[0].path);
    });

});
