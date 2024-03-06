<template>
  <div class="modal">
    <div class="modal-content">
      <div class="header">
        <h2>Add Student</h2>
        <span class="close-button" @click="$emit('close')">&times;</span>
      </div>
      <form @submit.prevent="submitForm">
        <input v-model="newStudent.first_name" type="text" placeholder="First Name" required />
        <input v-model="newStudent.last_name" type="text" placeholder="Last Name" required />
        <input v-model="newStudent.date_of_birth" type="date" placeholder="Date of Birth" required />
        <select v-model="newStudent.gender" required>

          <option value="male" class="option">Male</option>
          <option value="female" class="option">Female</option>
          <option value="other" class="option">Other</option>
        </select>
        <input v-model="newStudent.email" type="email" placeholder="Email" required />
        <input v-model="newStudent.phone" type="text" placeholder="Phone" required />
        <textarea v-model="newStudent.address" placeholder="Address" required></textarea>
        <button type="submit">Add Student</button>
      </form>
    </div>
  </div>x
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      newStudent: {
        first_name: "",
        last_name: "",
        date_of_birth: "",
        gender: "",
        email: "",
        phone: "",
        address: "",
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        await axios.post("http://localhost:3000/students", this.newStudent);
        this.$emit("close");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
@import url('./modal.css');
</style>
