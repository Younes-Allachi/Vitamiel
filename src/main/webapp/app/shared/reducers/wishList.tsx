import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from '../actions/type';
import { toast } from 'react-toastify';

const init = {
  w_list: JSON.parse(localStorage.getItem('wishList')) || [], // Initialisation à partir du localStorage
};

export const wishListReducer = (state = init, action) => {
  let updatedWishList;
  switch (action.type) {
    case ADD_TO_WISHLIST: {
      const productId = action.product.id;
      if (state.w_list.findIndex(product => product.id === productId) !== -1) {
        updatedWishList = state.w_list.filter(product => product.id !== productId);
      } else {
        updatedWishList = [
          ...state.w_list,
          {
            ...action.product,
          },
        ];
      }
      break;
    }

    case REMOVE_FROM_WISHLIST: {
      const w_productId = action.id;
      updatedWishList = state.w_list.filter(product => product.id !== w_productId);
      break;
    }

    default:
      return state;
  }

  // Sauvegarder dans le localStorage
  localStorage.setItem('wishList', JSON.stringify(updatedWishList));
  return { ...state, w_list: updatedWishList };
};

export default wishListReducer;
