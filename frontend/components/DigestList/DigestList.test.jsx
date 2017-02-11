import React from 'react';
import DigestList from './DigestList';
import {shallow} from 'enzyme';

describe('DigestList', () => {

    test('Renders error is flag is passed', () => {
        const component = shallow(<DigestList isError />);
        expect(component.equals(<h2>Error :(</h2>)).toBe(true);
    });

    test('Renders loading spinner is flag is passed', () => {
        const component = shallow(<DigestList isLoading />);
        expect(component.equals(<h2>Loading...</h2>)).toBe(true);
    });

    test('Renders image selection request if it\'s not selected', () => {
        const component = shallow(<DigestList />);
        expect(component.equals(<h2>Please select image</h2>)).toBe(true);
    });

    test('Renders empty repository message with path', () => {
        const props = {
            digest: {children: []},
            path: 'dalee/repo'
        };
        const registryPath = `%registry_root%/registry/v2/repositories/${props.path}`;
        const component = shallow(<DigestList {...props} />);

        expect(component.text()).toMatch(registryPath);
    });

    test('Renders children as DigestItem', () => {
        const props = {
            digest: {
                children: [
                    {name: 'test', path: 'dalee/repo', tags: ['1.0'], deleteTag: jest.fn()},
                    {name: 'test2', path: 'dalee/repo2', tags: ['1.1'], deleteTag: jest.fn()},
                ]
            }
        };

        const component = shallow(<DigestList {...props} />);
        const foundItems = component.find('DigestItem');

        expect(foundItems.length).toEqual(props.digest.children.length);
    });

});
