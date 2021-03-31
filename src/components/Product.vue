<template>
	<div class="product" @click="onProductClick(product.id)">
		<!-- <img :src="'/img/' + product.img + '.jpg'" :alt="`${product.name}`" /> -->
		<!-- <img :src="require(`../assets/${product.img}.jpg`)" :alt="`${product.name}`" /> -->
		<div class='centred-text'> {{product.name}} </div>
	</div>
</template>

<script>
export default {
	props: {
		product: Object
	},
	methods: {
		onProductClick(id){
			this.$emit('product-clicked', id);
		}
	}
}
</script>

<style scoped>
.product{
	position: relative;
	height: 200px;
	width: 200px;
	margin-bottom: 5px;
	margin-top: 5px;
}
.centred-text{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  
  color: black;
    font-size: 30px;
	font-family: inherit;
	font-weight: bold;
}

img{
	width: 100%;
	height: 100%;
	cursor:pointer;
}
</style>