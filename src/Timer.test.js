import React from 'react';
import ReactDOM from 'react-dom';
import Timer from './Timer';
import { mount } from "enzyme";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe("test the timer component", () => {
    const wrapper = mount(<Timer/>);
    const initTime = 20;


    it("renders without crashing", () =>{
        expect(wrapper).toBeTruthy();
    });

    it("sets timer state correctly", () =>{
        
        const output = wrapper.find('label').html();
        expect(output).toContain(initTime);
    });
});