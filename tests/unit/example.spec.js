describe('Example Component', () => {
  test('Should be greater than 10', () => {
    let value = 5;

    value = value + 8;

    expect(value).toBeGreaterThan(10);
  });
});
