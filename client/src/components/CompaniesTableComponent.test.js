import React from 'react';
import { shallow } from 'enzyme';
import { CompaniesTableComponent } from './CompaniesTableComponent';


const companies = [
  {
    id: '4deccc6a-8f3a-4cf2-bb87-5cf5b1874a11',
    picture: 'http://placekitten.com/100/100',
    companyName: 'Cubicide',
    city: 'Concho',
    specialty: [
      'Excavation',
      'Electrical'
    ]
  },
  {
    id: 'd1ab1c52-3a02-4582-8277-7aafae6a7cd9',
    picture: 'http://placekitten.com/100/100',
    companyName: 'Diginetic',
    city: 'Iola',
    specialty: [
      'Electrical'
    ]
  },
  {
    id: 'edae29c1-6afc-42d8-9923-9eb3715c443f',
    picture: 'http://placekitten.com/100/100',
    companyName: 'Fibrodyne',
    city: 'Hachita',
    specialty: [
      'Excavation',
      'Electrical',
      'Plumbing'
    ]
  }
];


describe('CompaniesTableComponent', () => {
  it('should render correctly', () => {
    const component = shallow(<CompaniesTableComponent companies={companies}/>);
    expect(component).toMatchSnapshot();
  });
});
