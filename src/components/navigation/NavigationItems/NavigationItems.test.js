import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});
describe('<NavigationItems', ()=>{
	let wrapper;
	beforeEach(()=>{
		wrapper=shallow(<NavigationItems/>);
	});

	it('should  render 2 navigation elements if not authenticated', ()=> {
		expect(wrapper.find(NavigationItem)).toHaveLength(2);
	});

	test('should  render 3 navigation elements if authenticated', ()=> {
		wrapper.setProps({isAuthenticated: true});
		expect(wrapper.find(NavigationItem)).toHaveLength(3);
	});

	test('should  render an exact logout button', ()=> {
		wrapper.setProps({isAuthenticated: true});
		expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
	});
});