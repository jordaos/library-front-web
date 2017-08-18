import { LibraryFrontWebPage } from './app.po';

describe('library-front-web App', () => {
  let page: LibraryFrontWebPage;

  beforeEach(() => {
    page = new LibraryFrontWebPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
