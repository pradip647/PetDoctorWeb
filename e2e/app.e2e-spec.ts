import { BookYourVetWebPage } from './app.po';

describe('book-your-vet-web App', function() {
  let page: BookYourVetWebPage;

  beforeEach(() => {
    page = new BookYourVetWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
