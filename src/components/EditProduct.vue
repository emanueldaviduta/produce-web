<template>
  <form @submit.prevent="handleSubmit">
      <label>Id:</label>
	  <input type="number" required v-model="id" readonly>
	  
	  <label>Name:</label>
	  <input type="text" required v-model="name" :readonly="false">
	  
	  <label>Type:</label>
	  <select required v-model="categoryId" :disabled="false">
		  <option value="1"> Vegetable</option>
		  <option value="2"> Fruit</option>
	  </select>
	  
	  <label>Image:</label>
	  <input type="text" v-model="img" :readonly="false">
	  
		<div id='product-edit-buttons'>
			<div>
				<button class="product-edit-btn">Save</button>
				<button class="product-edit-btn" @click.prevent="remove()">Remove</button>
			</div>
		</div>
  </form>
</template>

<script>
export default {
	props: {
		id: {
			type: Number,
			default: 0,
		},
		name: {
			type: String,
			default: ''
		},
		categoryId: {
			type: Number,
			default: 1,
		},
		img: {
			type: String,
			default: ''
		}
	},
	methods: {
		handleSubmit() {
			this.$emit('save-product',{id: this.id, name: this.name, categoryId: this.categoryId, img: this.img });
		},
		remove() {
			this.$emit('remove');
		}
	}

}
</script>

<style>
form {
	max-width: 420px;
	margin:30px auto;
	background: white;
	text-align: left;
	padding: 40px;
	border-radius: 10px;
}
label {
	color: #aaa;
	display: inline-block;
	margin: 25px 0 15px;
	font-size: 0.6em;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-weight: bold;
}
input, select {
	display: block;
	padding: 10px 6px;
	width: 100%;
	box-sizing: border-box;
	border: none;
	border-bottom: 1px solid #ddd;
	color: #555;
}

#product-edit-buttons{
	text-align: center;
	margin-top: 10px;
}

.product-edit-btn {
	font-size: 14px;
    background: #a2a2a2;
    color: #fff;
    border: none;
    margin: 5px;
    padding: 5px;
    cursor: pointer;
    text-decoration: none;
    font-family: inherit;
}
</style>