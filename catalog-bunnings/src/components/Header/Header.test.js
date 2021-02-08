import React from 'react';
import {shallow} from 'enzyme';
import Header from './Header';

it("should show Bunnings catalog", ()=>{
    const wrapper=shallow(<Header />);
    const h2 = wrapper.find('h2');
    const result = h2.text();

    expect(result).toBe("Bunnings Catalog");
})