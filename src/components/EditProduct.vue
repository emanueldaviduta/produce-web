<template>
  <form @submit.prevent="handleSubmit">
      <label>Id:</label>
	  <input type="number" required v-model="id">
	  
	  <label>Name:</label>
	  <input type="text" required v-model="name">
	  
	  <label>Description:</label>
	  <input type="text" required v-model="description">
	  
	  <label>Type:</label>
	  <select required v-model="type">
		  <option value="1"> Vegetable</option>
		  <option value="2"> Fruit</option>
	  </select>
	  
	  <label>Image:</label>
	  <input type="text" required v-model="img">
	  
		<div id='product-edit-buttons'>
			<div>
				<button class="product-edit-btn">Save</button>
				<button class="product-edit-btn" @click.prevent="cancel()">Cancel</button>
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
		description: {
			type: String,
			default: ''
		},
		type: {
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
			this.$emit('save-product',{id: this.id, name: this.name, description: this.description, type: this.type, img: this.img });
		},
		cancel() {
			this.$emit('cancel-edit');
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
	font-size: 40px;
	width: 45%;
	background: #000;
	color: #fff;
	border: none;
	margin: 0px 5% 5px 0px;
	border-radius: 5px;
	cursor: pointer;
	text-decoration: none;
	font-family: inherit;
}
</style>