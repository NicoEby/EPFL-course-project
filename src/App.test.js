import React from 'react';
import ReactDOM from 'react-dom';
import Canvas from './Canvas';
import Controls from './Controls';
import { mount } from "enzyme";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('Controls render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Controls/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Canvas renders without crashing', () => {
  const ref = React.createRef();
  const component = mount(
    <div>
      <Canvas ref={ref}></Canvas>
    </div>
  )
  expect(component.find('canvas').instance()).toEqual(ref.current);
});