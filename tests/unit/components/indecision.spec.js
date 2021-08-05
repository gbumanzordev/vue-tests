import { shallowMount } from '@vue/test-utils';
import Indecision from '@/components/Indecision';
import { fetchMock } from '../../utils/fetch.mock';

describe('Indecision Component', function () {
  let wrapper;
  let consoleLogSpy;
  global.fetch = jest.fn(() =>
    fetchMock({
      answer: 'yes',
      forced: false,
      image: 'https://yesno.wtf/assets/yes/2.gif',
    })
  );

  beforeEach(() => {
    wrapper = shallowMount(Indecision);
    consoleLogSpy = jest.spyOn(console, 'log');
  });

  test('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should not trigger anything when typing in input', async () => {
    const value = 'HelloWorld';
    const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer');

    const input = wrapper.find('input');
    await input.setValue(value);

    expect(consoleLogSpy).toHaveBeenCalledWith({ value });
    expect(getAnswerSpy).not.toHaveBeenCalled();
  });

  test('should typing question mark (?) should trigger getAnswer', async () => {
    const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer');
    const input = wrapper.find('input');
    await input.setValue('Imma be rich?');

    expect(getAnswerSpy).toHaveBeenCalledTimes(1);
  });

  test('should call API when getAnswer is called', async () => {
    await wrapper.vm.getAnswer();

    const img = wrapper.find('img');

    expect(img.exists()).toBeTruthy();
    expect(wrapper.vm.image).toEqual('https://yesno.wtf/assets/yes/2.gif');
    expect(wrapper.vm.answer).toEqual('Yeah!');
  });

  test('should test getAnswer when call Fails', async () => {
    fetch.mockImplementationOnce(() => Promise.reject('API is Down'));

    await wrapper.vm.getAnswer();

    const img = wrapper.find('img');

    expect(img.exists()).toBeFalsy();
    expect(wrapper.vm.answer).toBe('Unable to load from API');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
