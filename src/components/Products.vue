<template>
	<div :key="product.id" v-for="product in products">
		<Product @product-clicked="$emit('product-clicked', product.id)" :product="product" />
	</div>
</template>

<script>
import Product from './Product';
export default {
	components: {
		Product
	},
	props: {
		products: Array
	},
	emits:['product-clicked']
}
</script>