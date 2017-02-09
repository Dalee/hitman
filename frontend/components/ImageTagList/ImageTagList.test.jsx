import React from 'react';
import ImageTagList from './ImageTagList';
import {shallow} from 'enzyme';

describe('ImageTagList', () => {

    test('Renders error is flag is passed', () => {
        const component = shallow(<ImageTagList isError />);
        expect(component.equals(<h2>Error :(</h2>)).toBe(true);
    });

    test('Renders loading spinner is flag is passed', () => {
        const component = shallow(<ImageTagList isLoading />);
        expect(component.equals(<h2>Loading...</h2>)).toBe(true);
    });

    test('Renders image selection request if it\'s not selected', () => {
        const component = shallow(<ImageTagList />);
        expect(component.equals(<h2>Please select image</h2>)).toBe(true);
    });

    test('Renders empty repository message with path', () => {
        const props = {
            image: {children: []},
            path: 'dalee/repo'
        };
        const registryPath = `%registry_root%/registry/v2/repositories/${props.path}`;
        const component = shallow(<ImageTagList {...props} />);

        expect(component.text()).toMatch(registryPath);
    });

    test('Renders children as ImageTagItem', () => {
        const props = {
            image: {
                children: [
                    {name: 'test', path: 'dalee/repo', tags: ['1.0'], deleteTag: jest.fn()},
                    {name: 'test2', path: 'dalee/repo2', tags: ['1.1'], deleteTag: jest.fn()},
                ]
            }
        };

        const component = shallow(<ImageTagList {...props} />);
        const foundItems = component.find('ImageTagItem');

        expect(foundItems.length).toEqual(props.image.children.length);
    });

});
