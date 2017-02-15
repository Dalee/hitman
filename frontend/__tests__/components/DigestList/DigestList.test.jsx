import React from 'react';
import DigestList from '../../../components/DigestList/DigestList';
import {shallow} from 'enzyme';
import {Loader} from 'semantic-ui-react';

describe('DigestList', () => {

    it('renders error is flag is passed', () => {
        const component = shallow(<DigestList isError />);
        expect(component.equals(<h2>Error :(</h2>)).toBe(true);
    });

    it('renders loading spinner is flag is passed', () => {
        const component = shallow(<DigestList isLoading />);
        expect(component.equals(<Loader active inline="centered">Loading</Loader>)).toBe(true);
    });

    it('renders image selection request if it\'s not selected', () => {
        const component = shallow(<DigestList />);
        expect(component.equals(<h2>Please select image</h2>)).toBe(true);
    });

    it('renders empty repository message with path', () => {
        const props = {
            digest: {children: []},
            path: 'dalee/repo'
        };
        const registryPath = `%registry_root%/registry/v2/repositories/${props.path}`;
        const component = shallow(<DigestList {...props} />);

        expect(component.text()).toMatch(registryPath);
    });

    it('renders children as DigestItem', () => {
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
