<template>
  <div class="modal">
    <div class="modal-content">
      <div class="header">
          <h4>Edit Student Details</h4>
        <span class="close-button" @click="$emit('close')">&times;</span>
      </div>
      <form @submit.prevent="submitForm">
        <!-- Add fields for the student properties that you want to be editable -->
        <input
          v-model="editedStudent.first_name"
          type="text"
          placeholder="First Name"
          required
        />
        <input
          v-model="editedStudent.last_name"
          type="text"
          placeholder="Last Name"
          required
        />
        <input
          v-model="editedStudent.email"
          type="email"
          placeholder="Email"
          required
        />
        <input
          v-model="editedStudent.phone_number"
          type="text"
          placeholder="Phone Number"
          required
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["student"],
  data() {
    return {
      editedStudent: null,
    };
  },
  watch: {
    student: {
      immediate: true,
      handler() {
        this.editedStudent = { ...this.student };
      },
    },
  },
  methods: {
    async submitForm() {
      try {
        await axios.patch(
          `https://knust-cmu-api.onrender.com/students/${this.editedStudent.student_id}`,
          this.editedStudent
        );
        this.$emit("close");
        location.reload();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
@import url("./modal.css");
</style>
