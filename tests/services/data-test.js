import { getData } from '../../src/services/data';
import { DATA } from '../../src/constants';

describe('data services', () => {
  describe('getData', () => {
    it('returns a Promise which resolves with the data', () => {
      return getData().then((data) => {
        expect(data).toEqual(DATA);
      });
    });
  });
});
