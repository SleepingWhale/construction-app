import React from 'react';
import { shallow } from 'enzyme';
import { FiltersComponent } from './FiltersComponent';


const filters = ['a', 'b', 'c'];
const onChangeHandler = jest.fn();



describe('FiltersComponent', () => {

  it('should render correctly', () => {
    const component = shallow(<FiltersComponent filters={filters} onChange={onChangeHandler}/>);
    expect(component).toMatchSnapshot();
  });

  it('should call onChangeHandler with proper arguments', () => {
    const component = shallow(<FiltersComponent filters={filters} onChange={onChangeHandler}/>);
    const aCheck = component.find('#a');
    const bCheck = component.find('#b');

    aCheck.simulate('change', { target: { checked: true, name: 'a' } });
    bCheck.simulate('change', { target: { checked: true, name: 'b' } });
    aCheck.simulate('change', { target: { checked: false, name: 'a' } });

    expect(onChangeHandler).toHaveBeenNthCalledWith(1, ['a']);
    expect(onChangeHandler).toHaveBeenNthCalledWith(2,['a', 'b']);
    expect(onChangeHandler).toHaveBeenNthCalledWith(3,['b']);
  });

});
