import React from 'react';
import {shallow} from 'enzyme';
import Footer from './Footer';

it("should show designer name", ()=>{
    const wrapper=shallow(<Footer />);
    const p = wrapper.find('p');
    const result = p.text();

    expect(result).toBe('designed by @sonalkhare');
})