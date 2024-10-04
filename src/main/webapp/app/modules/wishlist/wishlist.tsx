import React from 'react';
import WishlistPage from 'app/modules/wishlist/wishlistPage/WishlistPage';
import Scrollbar from 'app/modules/home/scrollbar';

const Wishlist: React.FC = () => {
  return (
    <>
      <div id="top"></div>
      <br />
      <WishlistPage />
      <Scrollbar />
    </>
  );
};

export default Wishlist;
