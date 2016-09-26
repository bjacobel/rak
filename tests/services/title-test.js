import { getTitle } from '../../src/services/title';
import { TITLE } from '../../src/constants';

describe('title services', () => {
  describe('getTitle', () => {
    it('returns a Promise which resolves with the title', () => {
      return getTitle().then((title) => {
        expect(title).toEqual(TITLE);
      });
    });
  });
});
