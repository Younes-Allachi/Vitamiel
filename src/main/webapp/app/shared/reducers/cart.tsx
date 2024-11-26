import { ADD_TO_CART, DECREMENT_QUANTITY, INCREMENT_QUANTITY, REMOVE_FROM_CART,CLEAR_CART } from '../actions/type';
import { minValueOne } from '../../shared/util/lists';

const init = {
  cart: JSON.parse(localStorage.getItem('cartList')) || [], // Initialisation à partir du localStorage
};

export const cartReducer = (state = init, action) => {
  let updatedCart;
  switch (action.type) {
    case ADD_TO_CART: {
      const productId = action.product.id;
      const productQty = action.qty || 1;
      const productIndex = state.cart.findIndex(product => product.id === productId);

      if (productIndex !== -1) {
        // Si le produit existe, incrémenter la quantité et mettre à jour
        updatedCart = state.cart.map((product, index) => {
          if (index === productIndex) {
            return {
              ...product,
              selected_color: action.color,
              selected_size: action.size,
              qty: product.qty + productQty,
              sum: product.price * (1 - product.discount / 100) * (product.qty + productQty),
            };
          }
          return product;
        });
      } else {
        // Si le produit n'existe pas, l'ajouter au panier
        updatedCart = [
          ...state.cart,
          {
            ...action.product,
            selected_color: action.color,
            selected_size: action.size,
            qty: productQty,
            sum: action.product.price * (1 - action.product.discount / 100) * productQty,
          },
        ];
      }
      break;
    }

    case REMOVE_FROM_CART: {
      updatedCart = state.cart.filter(item => item.id !== action.product_id);
      break;
    }

    case INCREMENT_QUANTITY: {
      const productId = action.product_id;
      updatedCart = state.cart.map(product => {
        if (product.id === productId) {
          return {
            ...product,
            qty: product.qty + 1,
          };
        }
        return product;
      });
      break;
    }

    case DECREMENT_QUANTITY: {
      const productId = action.product_id;
      updatedCart = state.cart.map(product => {
        if (product.id === productId) {
          return {
            ...product,
            qty: minValueOne(product.qty - 1),
          };
        }
        return product;
      });
      break;
    }

    case CLEAR_CART:
      return {
        ...state,
        cart: [], // Clear the cart
      };

    default:
      return state;
  }
  // Sauvegarder dans le localStorage
  localStorage.setItem('cartList', JSON.stringify(updatedCart));
  return { ...state, cart: updatedCart };
};

export default cartReducer;
