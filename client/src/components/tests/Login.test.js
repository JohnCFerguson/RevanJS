import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Login from '../auth/Login';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const initialState= {
    email: "test",
    password: "",
    errors: {},
    auth: {
        isAuthenticated: false
    }
};
type State = typeof initialState;
const mockStore = configureStore([thunk]);

let wrapper;

describe('Testing Login component with Enzyme' , () => {
    let store;
    beforeEach(() => {
        store = mockStore(initialState);
    });
     it('renders without crashing', () => {
        expect(shallow(<Login store={store} />).dive().dive().find('form').exists()).toBe(true);
    });
    it('check username/email change', () => {
        wrapper = shallow(<Login store={store} />);
        const emailInput = wrapper.dive().dive();
        // console.log(emailInput.debug()); -> used to debug test
        emailInput.find('input[name="email"]').simulate('change',
             {target: {id: "email", value: 'test@test.com'}});
        wrapper.update();
        // console.log(emailInput.state('email')); -> used to debug test
        expect(emailInput.state('email')).toEqual('test@test.com');
    });
    it('check password change', () => {
        wrapper = shallow(<Login store={store} />);
        const password = wrapper.dive().dive();
        // console.log(emailInput.debug()); -> used to debug test
        password.find('input[name="password"]').simulate('change',
             {target: {id: "password", value: 'test123'}});
        wrapper.update();
        // console.log(emailInput.state('email')); -> used to debug test
        expect(password.state('password')).toEqual('test123');
    });
    it('checks that onSubmit is called', () => {
        const preventDefault = jest.fn();
        const loginUser = jest.fn();

        const wrapper = shallow(<Login store={store} loginUser={loginUser} />);
        const login = wrapper.dive().dive();

        // console.log(emailInput.debug()); -> used to debug test
        login.find('input[name="email"]').simulate('change',
             {target: {id: "email", value: 'test@test.com'}});
        // console.log(emailInput.debug()); -> used to debug test
        login.find('input[name="password"]').simulate('change',
                  {target: {id: "password", value: 'test123'}});
        login.find('form').simulate('submit', { preventDefault: () => {
            preventDefault()} });
        expect(preventDefault).toHaveBeenCalled()
    });
});