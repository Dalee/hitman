import React from 'react';
import DigestItem from '../../../components/DigestItem/DigestItem';
import {shallow} from 'enzyme';

describe('DigestItem', () => {

    it('should render removal confirmation', () => {
        const wrapper = shallow(<DigestItem path="some/path" name="test" tags={['latest']} deleteTag={jest.fn()} />);
        wrapper.find('Button').first().simulate('click');

        expect(wrapper.state('deleteConfirm')).toBe(true);
    });

    it('should remove tag', () => {
        const onButtonClick = jest.fn(() => Promise.resolve());
        const wrapper = shallow(<DigestItem path="some/path" name="test" tags={['latest']} deleteTag={onButtonClick} />);
        wrapper.setState({deleteConfirm: true});
        wrapper.find('Button').last().simulate('click');

        expect(onButtonClick).toHaveBeenCalledTimes(1);
        expect(onButtonClick).toHaveBeenCalledWith('some/path', 'test');
    });

    it('should hide removal confirmation', () => {
        const wrapper = shallow(<DigestItem path="some/path" name="test" tags={['latest']} deleteTag={jest.fn()} />);
        wrapper.setState({deleteConfirm: true});
        wrapper.find('Button').first().simulate('click');

        expect(wrapper.state('deleteConfirm')).toBe(false);
    });

    it('should render tags', () => {
        const tags = ['latest', 'v.1.2.0', 'master-wip'];
        const wrapper = shallow(<DigestItem path="some/path"
                                          name="test"
                                          tags={tags}
                                          deleteTag={jest.fn()} />);

        wrapper.find('Label').forEach((node, idx) => {
            expect(node.html()).toMatch(tags[idx]);
        });
    });

});
