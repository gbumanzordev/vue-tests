<template>
  <img v-if="image" :src="image" alt="BG" />
  <div class="bg-dark"></div>

  <div class="indecision-container">
    <input v-model="question" type="text" placeholder="Ask a question" />
    <p>Don't forget to finish your question with a question (?) mark.</p>
    <div>
      <h2>{{ question }}</h2>
      <h1 v-if="isValidQuestion">{{ answer }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Indecision',
  data() {
    return {
      question: '',
      answer: null,
      image: null,
      isValidQuestion: false,
    };
  },
  watch: {
    question(value) {
      this.isValidQuestion = false;
      console.log({ value });
      if (!value.includes('?')) {
        return;
      }
      this.isValidQuestion = true;
      this.getAnswer();
    },
  },
  methods: {
    async getAnswer() {
      try {
        this.answer = 'Thinking...';

        const { answer, image } = await fetch(
          'https://yesno.wtf/api'
        ).then((response) => response.json());

        this.answer =
          answer === 'yes' ? 'Yeah!' : answer === 'no' ? 'No!' : 'Maybe 😏';
        this.image = image;
      } catch (error) {
        this.answer = 'Unable to load from API';
        this.image = null;
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
img,
.bg-dark {
  height: 100vh;
  left: 0;
  max-height: 100%;
  max-width: 100%;
  position: fixed;
  top: 0;
  width: 100vw;
}

.bg-dark {
  background-color: rgba(0, 0, 0, 0.4);
}

.indecision-container {
  position: relative;
  z-index: 99;
}

input {
  width: 250px;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
}

input:focus {
  outline: none;
}

p {
  color: white;
  font-size: 20px;
  margin-top: 8px;
}

h1,
h2 {
  color: white;
}

h2 {
  margin-top: 150px;
}
</style>
