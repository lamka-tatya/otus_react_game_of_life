import { shallow } from "enzyme";
import React from "react";
import { ImageButton } from ".";

describe("ImageButton is rendered", () => {
	it("should exist", () => {
		const button = shallow(<ImageButton type="button"/>);
	
		expect(button.exists()).toBeTruthy();
	  });
	  it("should call handler on click", () => {
		const mock = jest.fn();
		const wrapper = shallow(<ImageButton type="button" onClick={mock} disabled={false}/>);
	
		wrapper.simulate("click");
	
		expect(mock).toHaveBeenCalledTimes(1);
	  });
});