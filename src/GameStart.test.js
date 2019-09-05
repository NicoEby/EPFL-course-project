import React from "react";
import { shallow, mount } from "enzyme";
import GameStart from "./GameStart";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from "react-router-dom";

configure({ adapter: new Adapter() });

describe("shallow-rendering the gamestart component", () => {
    const wrapper = shallow(<GameStart />);

    it("should render the gamestart component", () => {
        expect(wrapper).toBeTruthy();
    })
});

describe("testing the gamestart-button", () => {
    const handleJestClick = jest.fn();
    const wrapper = mount(
        <Router>
            <GameStart handleClick={handleJestClick}/>
        </Router>
    );

    it("gets rendered", () => {
        expect(wrapper).toBeTruthy();
    })

    it("clicks the button", () => {
        wrapper.find('button').simulate("click");
        expect(handleJestClick).toHaveBeenCalledTimes(1);
    });
}); 