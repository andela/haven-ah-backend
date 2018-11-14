import chai from 'chai';
import processUrl from '../../utilities/processUrl';

const { expect } = chai;

describe('Process request URLs: ', () => {
  it('should return a resource from a url string', () => {
    const resource = processUrl('/articles/my-fake-slug-123132');
    expect(resource).to.equal('articles');
  });

  it('should clean url string and return a resource', () => {
    const resource = processUrl('///resource/my-fake-slug-123132///');
    expect(resource).to.equal('resource');
  });
});
