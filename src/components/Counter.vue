<template>
  <h2>{{ customTitle }}</h2>
  <p>{{ count }}<sup>2</sup> = {{ squareCounter }}</p>
  <p data-test-id="counter">{{ count }}</p>
  <div class="buttons">
    <button @click="increaseCounter()">+ 1</button>
    <button @click="decreaseCounter()">- 1</button>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  props: {
    title: String,
    start: {
      type: Number,
      default: 25,
      validator(start) {
        return start > 0;
      },
    },
  },
  data() {
    return {
      count: this.start ?? 1,
    };
  },
  methods: {
    increaseCounter() {
      this.count++;
    },
    decreaseCounter() {
      this.count--;
    },
  },
  computed: {
    squareCounter() {
      return this.count * this.count;
    },
    customTitle() {
      return this.title || 'Counter';
    },
  },
};
</script>

<style scoped>
button {
  background-color: #64bb87;
  border-radius: 5px;
  border: 1px solid white;
  color: white;
  cursor: pointer;
  margin: 0 5px;
  padding: 15px;
  transition: 0.3s ease-in-out;
}

button:hover {
  background-color: #5aa67b;
  transition: 0.3s ease-in-out;
}

button + button {
  margin-left: 8px;
}
</style>
