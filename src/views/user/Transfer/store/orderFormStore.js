import { create } from 'zustand'

const initialState = {
    productList: [],
    selectedProduct: [],
}

export const useOrderFormStore = create((set) => ({
    ...initialState,
    setProductList: (payload) => set(() => ({ productList: payload })),
    setSelectedProduct: (payload) => set(() => ({ selectedProduct: payload })),
}))
