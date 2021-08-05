import { shallowMount } from '@vue/test-utils';
import Counter from '@/components/Counter';
import { findByDataTestId } from '../../utils/test-utils';

describe('Counter Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Counter);
  });

  test('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should render h2 with default value', () => {
    expect(wrapper.find('h2').exists()).toBeTruthy();
    const headerValue = wrapper.find('h2').text();

    expect(headerValue).toBe('Counter');
  });

  test('should render default value (25) in paragraph', () => {
    const counterParagraph = wrapper.find(findByDataTestId('counter'));
    expect(counterParagraph.text()).toBe('25');
  });

  test('should increase and decrease with one the counter value', async () => {
    const [increaseBtn, decreaseBtn] = wrapper.findAll('button');

    await increaseBtn.trigger('click');
    await increaseBtn.trigger('click');
    await increaseBtn.trigger('click');

    await decreaseBtn.trigger('click');
    await decreaseBtn.trigger('click');

    const counterParagraph = wrapper.find(findByDataTestId('counter'));
    expect(counterParagraph.text()).toEqual('26');
  });

  test('should set default value', () => {
    const { start } = wrapper.props();
    const printedValue = wrapper.find(findByDataTestId('counter'));

    expect(start).toEqual(25);
    expect(printedValue.text()).toEqual(start.toString());
  });

  test('should show the prop title', () => {
    const title = 'Hello World';
    const customWrapper = shallowMount(Counter, {
      props: {
        title,
      },
    });

    expect(customWrapper.find('h2').text()).toBe(title);
  });
});
