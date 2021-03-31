<template>
<div id='navbar'>
	<div class="topnav-left">
		<p class="active" @click="addProduct()">Add Product</p>
	</div>
	<div class="topnav-right">
  		<p>Logout</p>
	</div>
</div>
<div id="nutrition">
	<div class='container' id="vegetables">
		<div id='product-type-navbar'>
			<button class="product-type-btn" @click="filterProductsByVegetables()">Vegetables</button>
			<button class="product-type-btn" @click="filterProductsByFruits()">Fruits</button>
		</div>
		<div id='product-list'>
			<Products @product-clicked="productClicked" :products="products"/>
		</div>
	</div>
	<div v-if="editMode === false && selectedProduct && selectedProduct.id" id="product-description-container">
		<div id='product-description-title'>
			<h1>Description</h1>
		</div>
		<div v-if="selectedProduct && selectedProduct.id" id='product-description-buttons'>
			<button class="product-type-btn" @click="editProduct()">Edit</button>
			<button class="product-type-btn" @click="deleteProduct()">Remove</button>
		</div>
		<div id="product-description-text">
			<p>{{selectedProduct ? selectedProduct.description : ''}}</p>
		</div>
	</div>
	<div v-if="editMode === true" id="product-description-container"> 
		<div id='product-description-title'>
			<h1 v-if="!selectedProduct">Add new product</h1>
			<h1 v-if="selectedProduct">Edit product</h1>
		</div>
		
		
		<EditProduct @cancel-edit="cancel" @save-product="save" 
		:id="selectedProduct ? selectedProduct.id : undefined"
		:name="selectedProduct ? selectedProduct.name : undefined"
		:type="selectedProduct ? selectedProduct.type : undefined"
		:description="selectedProduct ? selectedProduct.description : undefined"
		:img="selectedProduct ? selectedProduct.img : undefined" />
		
	</div>
</div>
</template>

<script>
import Products from './Products';
import EditProduct from './EditProduct';
export default {
	name: 'Nutrition',
	components: {
		Products,
		EditProduct
	},
	methods: {
		filterProductsByVegetables(){
		this.products = this.dumpData.filter(p => p.type == 1)
		},
		
		filterProductsByFruits() {
			this.products = this.dumpData.filter(p => p.type == 2);
		},
		
		productClicked(id){
			this.selectedProduct = this.products.find(p => p.id === id);
			this.editMode = false;
		},
		editProduct(){
			this.editMode = true;
		},
		cancel(){
			this.editMode = false;
		},
		save(product){
			if(this.dumpData.find(p => p.id === product.id))
			{
				// UPDATE 
				this.dumpData.splice(this.dumpData.findIndex(p => p.id === product.id), 1, product);
			}
			else{
				// ADD
				this.dumpData.push(product);
			}
			this.products = this.dumpData.filter(p => p.type === product.type);
			this.editMode = false;
		},
		deleteProduct(){
			this.dumpData = this.dumpData.filter((p) => p.id !== this.selectedProduct.id);
			this.products = this.dumpData.filter((p => p.type === this.selectedProduct.type));
			this.selectedProduct = null;
		},
		addProduct(){
			this.selectedProduct = null;
			this.editMode = true;
		},
	},
	data() {
		return {
			products: [],
			dumpData: [],
			editMode: false,
			selectedProduct: Object
		}
	},
	created() {
		// Product Type 1 -> vegetable Type 2 -> fruit
		this.dumpData = [
			{
				id: 1,
				name: 'Avocado',
				description: 'This is an avocado',
				img:'avocado',
				type: 2
			}, {
				id: 2,
				name: 'Lemon',
				description: 'This is a lemon',
				img:'lemon',
				type: 2
			}, {
				id: 3,
				name: 'Watermelon',
				description: 'This is a watermelon',
				img:'watermelon',
				type: 2
			}, {
				id: 4,
				name: 'Cucumber',
				description: 'This is a cucumber',
				img:'cucumber',
				type: 1
			}, {
				id: 5,
				name: 'Tomato',
				description: 'This is a tomato',
				img:'tomato',
				type: 2
			}, {
				id: 6,
				name: 'Eggplant',
				description: 'This is an eggplant',
				img:'eggplant',
				type: 1
			}, {
				id: 7,
				name: 'Onion',
				description: 'This is an onion',
				img:'onion',
				type: 1
			}, {
				id: 8,
				name: 'Cabbage',
				description: 'This is a cabbage',
				img:'cabbage',
				type: 1
			}, {
				id: 9,
				name: 'Potato',
				description: 'This is a potato',
				img:'potato',
				type: 1
			}
		];
		this.products = this.dumpData.filter(p => p.type == 1);
	}
}
</script>

<style scoped>

#nutrition{
	display: flex;
}
#vegetables {
	height: 95vh;
	width: 60%;
	overflow: auto;
}
#vegetables #product-type-navbar, #product-description-buttons{
  	overflow: hidden;
	text-align: center;
}

.product-type-btn {
	font-size: 40px;
	width: 40%;
	background: #000;
	color: #fff;
	border: none;
	margin: 0px 5% 5px 0px;
	border-radius: 5px;
	cursor: pointer;
	text-decoration: none;
	font-family: inherit;
}

.hide-btn {
	visibility: hidden;
}

#product-list{
	display: flex;
	flex-wrap: wrap;
	align-content: flex-start;
	justify-content: space-around;
}

#product-description-container{
	height: 95vh;
	width: 40%;
}

#product-description-container #product-description-title h1 {
	text-align: center;
}

/* NAVBAR */

#navbar {
  	background-color: #333;
  	overflow: hidden;
}

/* Style the links inside the navigation bar */
#navbar .topnav-left p {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}
#navbar .topnav-right p {
  float: right;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
.topnav-left p:hover, .topnav-right p:hover {
  background-color: #ddd;
  color: black;
}

/* Add a color to the active/current link */
.topnav-left p.active, .topnav-right p.active {
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
}
#navbar .topnav-right p img{
	width: 18px;
	height: 18px;
}

</style>