import { shallowMount } from '@vue/test-utils';
import Cart from './Cart.vue';

describe('Cart', () => {
    it('renders CartProduct component for each product in cart', () => {
        const cart = [
            { id: 1, name: 'Product 1', price: 10 },
            { id: 2, name: 'Product 2', price: 20 },
            { id: 3, name: 'Product 3', price: 30 },
        ];

        const wrapper = shallowMount(Cart, {
            props: { cart },
        });

        expect(wrapper.findAllComponents({ name: 'CartProduct' })).toHaveLength(3);
    });

    it('emits removeProductFromCart event when product is removed', async () => {
        const cart = [{ id: 1, name: 'Product 1', price: 10 }];

        const wrapper = shallowMount(Cart, {
            props: { cart },
        });

        await wrapper.findComponent({ name: 'CartProduct' }).vm.$emit('remove-product-from-cart', 1);

        expect(wrapper.emitted('removeProductFromCart')).toBeTruthy();
        expect(wrapper.emitted('removeProductFromCart')[0]).toEqual([1]);
    });
});
