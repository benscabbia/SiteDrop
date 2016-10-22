import { SiteDropPage } from './app.po';

describe('site-drop App', function() {
  let page: SiteDropPage;

  beforeEach(() => {
    page = new SiteDropPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
