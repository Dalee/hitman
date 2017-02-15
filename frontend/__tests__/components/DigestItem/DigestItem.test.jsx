import React from 'react';
import DigestItem from '../../../components/DigestItem/DigestItem';
import {mount} from 'enzyme';

describe('DigestItem', () => {

    it('should remove tag', () => {
        const onButtonClick = jest.fn(() => Promise.resolve());
        const wrapper = mount(<DigestItem path="some/path" name="test" tags={['latest']} deleteTag={onButtonClick} />);
        wrapper.setState({deleteConfirm: true});

        wrapper.find('button').last().simulate('click');
        expect(onButtonClick).toHaveBeenCalledTimes(1);
        expect(onButtonClick).toHaveBeenCalledWith('some/path', 'test');
    });

});
