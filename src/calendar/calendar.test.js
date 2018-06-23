import React from 'react'
import Enzyme, { mount } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux'

import { endDates } from "../constants";
import Calendar from './components/Calendar';
import store from "../store";
Enzyme.configure({ adapter: new Adapter() });

describe('month', () => {
  const props={
    year:2018,
    month:5,
    isSundayFirst:false,
  }
  it(`5월의 30일 일수에 맞게 css date 클래스를 가진 컴포넌트가 30개 생성된다.`, ()=>{
    const element = mount(
      <Provider store={store}>
        <Calendar {...props} />
      </Provider>  
    )
    expect(element.find('.date').length).toBe(30)
  })
})