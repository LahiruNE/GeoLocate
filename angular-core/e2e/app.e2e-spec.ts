import { AngularCorePage } from './app.po';

describe('angular-core App', () => {
  let page: AngularCorePage;

  beforeEach(() => {
    page = new AngularCorePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
