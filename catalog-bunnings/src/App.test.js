import React from 'react';
import {shallow} from 'enzyme';
import App from './App';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CSVRead from './CSVRead/CSVRead';

it("App js test", ()=>{
    const wrapper=shallow(<App />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.contains(<Header />)).toBe(true);
    expect(wrapper.contains(<Footer />)).toBe(true);
    expect(wrapper.contains(<CSVRead />)).toBe(true);

    // expect(wrapper).toBe("Bunnings Catalog");
})