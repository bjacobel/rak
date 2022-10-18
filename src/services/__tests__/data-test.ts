import { getData } from '../data';
import { DATA } from '../../constants';

describe('data services', () => {
  describe('getData', () => {
    it('returns a Promise which resolves with the data', () =>
      getData().then((data: unknown) => {
        expect(data).toEqual(DATA);
      }));
  });
});
