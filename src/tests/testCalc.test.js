import {
  mount
} from "@vue/test-utils";
import Calc from "../components/MyCalculator.vue";
import {
  expect
} from "@jest/globals";


describe('Test Calculator', () => {
  it('test operand1', () => {
    const wrapper = mount(Calc)
    const operand1 = wrapper.find('input[name=operand1]')
    operand1.setValue('1')

    expect(wrapper.vm.operand1).toBe(1)
  });

  it('test operand2', () => {
    const wrapper = mount(Calc)

    const operand2 = wrapper.find('input[name=operand2]')
    operand2.element.value = '1'
    operand2.trigger('input')

    expect(wrapper.vm.operand2).toBe(1)
  });

  it('test sum', () => {
    const wrapper = mount(Calc)
    const operand1 = wrapper.find('input[name=operand1]')
    const operand2 = wrapper.find('input[name=operand2]')
    operand1.setValue('1')
    operand2.setValue('2')

    const btn = wrapper.find('button[name="+"]')
    btn.trigger('click')

    expect(wrapper.vm.result).toBe(3)
  });

  it('test substract', () => {
    const wrapper = mount(Calc)
    const operand1 = wrapper.find('input[name=operand1]')
    const operand2 = wrapper.find('input[name=operand2]')
    operand1.setValue('5')
    operand2.setValue('2')

    const btn = wrapper.find('button[name="-"]')
    btn.trigger('click')

    expect(wrapper.vm.result).toBe(3)
  });

  it('test divide', () => {
    const wrapper = mount(Calc)
    const operand1 = wrapper.find('input[name=operand1]')
    const operand2 = wrapper.find('input[name=operand2]')
    operand1.setValue('6')
    operand2.setValue('2')

    const btn = wrapper.find('button[name="/"]')
    btn.trigger('click')

    expect(wrapper.vm.result).toBe(3)
  });

  it('test multiply', () => {
    const wrapper = mount(Calc)
    const operand1 = wrapper.find('input[name=operand1]')
    const operand2 = wrapper.find('input[name=operand2]')
    operand1.setValue('6')
    operand2.setValue('2')

    const btn = wrapper.find('button[name="*"]')
    btn.trigger('click')

    expect(wrapper.vm.result).toBe(12)
  });

  it('test exponentiation', () => {
    const wrapper = mount(Calc)
    const operand1 = wrapper.find('input[name=operand1]')
    const operand2 = wrapper.find('input[name=operand2]')
    operand1.setValue('6')
    operand2.setValue('2')

    const btn = wrapper.find('button[name="^"]')
    btn.trigger('click')

    expect(wrapper.vm.result).toBe(36)
  });

  it("test checkbox", () => {
    const wrapper = mount(Calc);
    const checkbox = wrapper.find("input[type=checkbox]");
    checkbox.trigger("click");
    expect(checkbox.element.checked).toBe(true);
  });

  it("test with keyBtn", () => {
    const wrapper = mount(Calc);
    const keyBtns = wrapper.findAll("button[type=keyboard]");
    keyBtns.wrappers.forEach((wrapper) => {
      wrapper.trigger("click");
    });
    expect(wrapper.vm.operand1).toBe(123456789);
  });

  it("test del number", () => {
    const wrapper = mount(Calc);
    const keyBtns = wrapper.findAll("button[type=keyboard]");
    keyBtns.wrappers.forEach((wrapper) => {
      wrapper.trigger("click");
    });
    const delBtn = wrapper.find("button[name=←]");
    delBtn.trigger("click");
    expect(wrapper.vm.operand1).toBe(12345678);
  });

  it("test first radioBtn", () => {
    const wrapper = mount(Calc);
    const radioBtn = wrapper.find("input[value='1']");
    radioBtn.setChecked();
    const btns = wrapper.findAll("button[type=keyboard]");
    btns.wrappers.forEach((wrapper) => {
      wrapper.trigger("click");
    });
    expect(wrapper.vm.operand1).toBe(123456789);
  });

  it("test second radioBtn", () => {
    const wrapper = mount(Calc);
    const radioBtn = wrapper.find("input[value='2']");
    radioBtn.setChecked();
    const btns = wrapper.findAll("button[type=keyboard]");
    btns.wrappers.forEach((wrapper) => {
      wrapper.trigger("click");
    });
    expect(wrapper.vm.operand2).toBe(123456789);
  });
})