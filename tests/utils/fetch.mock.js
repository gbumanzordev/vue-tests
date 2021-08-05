export const fetchMock = (body) =>
  Promise.resolve({
    json: () => Promise.resolve({ ...body }),
  });
