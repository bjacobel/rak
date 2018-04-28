import { getData } from 'services/data';
import { DATA } from 'src/constants';

describe('data services', () => {
  describe('getData', () => {
    it('returns a Promise which resolves with the data', () =>
      getData().then(data => {
        expect(data).toEqual(DATA);
      }));
  });
});
