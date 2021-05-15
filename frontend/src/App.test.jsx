import React from 'react';
import { shallow } from 'enzyme';
// import { render, screen } from '@testing-library/react';
// import App from './App';
import { ButtonCard, TotalTime } from './components/Card';
import Title from './components/Title';

describe('Button in Card', () => {
  it('Can be clicked', () => {
    const myClick = jest.fn();
    const randomStr = 'RandomString';
    shallow(<ButtonCard clickFn={myClick} content={randomStr} />).simulate(
      'click'
    );
    expect(myClick).toBeCalledTimes(1);
  });
});

describe('Title', () => {
  it('Correct display title', () => {
    const randomStr = 'RandomString';
    const btn = shallow(<Title title={randomStr} />);
    expect(btn.text()).toBe(randomStr);
  });
});

describe('TotalTime', () => {
  it('Correct calcul Total Quiz Time', () => {
    const time = [20, 30, 10];
    const btn = shallow(<TotalTime timeArray={time} />);
    expect(btn.text()).toBe('This quiz will cost you 60 seconds.');
  });
});
