import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import App from './App';

describe('Testing app component with Enzyme' , () => {
  it('renders without crashing', () => {
    mount(<App />)
  });
});

