import { WishListModule } from './wish-list.module';

describe('WishListModule', () => {
  let wishListModule: WishListModule;

  beforeEach(() => {
    wishListModule = new WishListModule();
  });

  it('should create an instance', () => {
    expect(wishListModule).toBeTruthy();
  });
});
