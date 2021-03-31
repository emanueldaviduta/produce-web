<template>
<Nutrition />
</template>

<script>
import Nutrition from './components/Nutrition';
export default {
  name: 'App',
  components: { 
      Nutrition
  },
  methods: {
  },
  props: {
  }
}
</script>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}
	body{
		font-family: 'Poppins', sans-serif;
	}
	
	.container {
		border: 1px solid steelblue;
		border-radius: 5px;
	}
</style>
