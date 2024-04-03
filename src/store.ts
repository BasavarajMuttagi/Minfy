import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const storageModule = {
  name: "ecomm-storage",
  storage: createJSONStorage(() => sessionStorage),
};

const creator = (set: any) => ({
  token: "",
  cart: [],
  cartTotal: 0,
  totalPayable: 0,
  tax_percent: 0.18,
  taxAmount: 0,
  shipping: 0,
  discount: 0,
  address: {
    country: "",
    state: "",
    city: "",
    street: "",
    pincode: "",
  },
  setAddress: (address: any) =>
    set(() => ({ address: { ...address } })),
  clearCart: () => {
    set(() => ({
      cart: [],
      cartTotal: 0,
      totalPayable: 0,
      tax_percent: 0.18,
      taxAmount: 0,
      shipping: 0,
      discount: 0,
      address: {
        country: "",
        state: "",
        city: "",
        street: "",
        pincode: "",
      },
    }));
  },
  logout: () => {
    set(() => ({
      token: "",
      cart: [],
      cartTotal: 0,
      totalPayable: 0,
      tax_percent: 0.18,
      taxAmount: 0,
      shipping: 0,
      discount: 0,
      address: {
        country: "",
        state: "",
        city: "",
        street: "",
        pincode: "",
      },
    }));
  },
  setToken: (newToken: string) => set(() => ({ token: newToken })),
  addOneItem: (newItemId: string, data: any) => {
    set((state: any) => ({ cart: addItemToCart(newItemId, state.cart, data) }));
    set((state: any) => ({ cartTotal: getCartTotal(state.cart) })),
      set((state: any) => ({
        taxAmount: getTaxAmount(state.cartTotal, state.tax_percent),
      })),
      set((state: any) => ({
        shipping: state.cartTotal > 0 ? 5000 : 0,
      })),
      set((state: any) => ({
        totalPayable: getPay(
          state.cartTotal,
          state.shipping,
          state.taxAmount,
          state.discount
        ),
      }));
  },
  deleteOneItem: (itemId: string) => {
    set((state: any) => ({ cart: deleteOne(itemId, state.cart) })),
      set((state: any) => ({ cartTotal: getCartTotal(state.cart) })),
      set((state: any) => ({
        taxAmount: getTaxAmount(state.cartTotal, state.tax_percent),
      })),
      set((state: any) => ({
        shipping: state.cartTotal > 0 ? 5000 : 0,
      })),
      set((state: any) => ({
        totalPayable: getPay(
          state.cartTotal,
          state.shipping,
          state.taxAmount,
          state.discount
        ),
      }));
  },
  deteteAllItems: (itemId: string) => {
    set((store: any) => ({
      cart: deteteAllItems(itemId, store.cart),
    })),
      set((state: any) => ({ cartTotal: getCartTotal(state.cart) })),
      set((state: any) => ({
        taxAmount: getTaxAmount(state.cartTotal, state.tax_percent),
      })),
      set((state: any) => ({
        shipping: state.cartTotal > 0 ? 5000 : 0,
      })),
      set((state: any) => ({
        totalPayable: getPay(
          state.cartTotal,
          state.shipping,
          state.taxAmount,
          state.discount
        ),
      }));
  },
});

const useEcomStore = create(persist(creator, storageModule));
export default useEcomStore;

const addItemToCart = (newId: string, oldArray: any, data: any) => {
  let modified = false;
  oldArray.forEach((eachObject: any) => {
    if (eachObject._id == newId) {
      eachObject.count = eachObject.count + 1;
      modified = true;
    }
  });

  if (!modified) {
    oldArray.push({ _id: newId, count: 1, data: data });
  }

  return oldArray;
};

const deteteAllItems = (itemId: string, oldArray: any[]) => {
  const index = oldArray.findIndex(
    (eachObject: any) => eachObject._id == itemId
  );
  oldArray.splice(index, 1);
  return oldArray;
};

const getCartTotal = (oldArray: []) => {
  {
    let total = 0;
    oldArray.forEach((currentObject: any) => {
      total = total + currentObject.data.price * currentObject.count;
    });
    return total;
  }
};

const getTaxAmount = (cartTotal: number, tax_percent: number) => {
  return cartTotal * tax_percent;
};

const getPay = (
  cartTotal: number,
  shipping: number,
  taxAmount: number,
  discount: number
) => {
  return cartTotal + shipping + taxAmount - discount;
};

const deleteOne = (itemId: string, oldArray: any[]) => {
  const index = oldArray.findIndex(
    (eachObject: any) => eachObject._id == itemId
  );

  const count = oldArray[index]["count"];

  if (count > 1) {
    oldArray[index]["count"] = count - 1;
  }
  if (count <= 1) {
    deteteAllItems(itemId, oldArray);
  }

  return oldArray;
};
