<template>
  <div class="instructors-view">
    <h1>Instructors</h1>
    <div class="instructor-list">
      <div v-for="instructor in instructors" :key="instructor.id" class="instructor">
        <div class="instructor-info">
          <h2>{{ instructor.name }}</h2>
          <p>Email: {{ instructor.email }}</p>
          <p>Department: {{ instructor.department }}</p>
        </div>
        <!-- Add edit and delete buttons if needed -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InstructorsView',
  data() {
    return {
      instructors: [] // Your instructor data will go here
    };
  },
  methods: {
    // Fetch instructor data from backend API
    async fetchInstructors() {
      // Example: Make HTTP request using Axios
      try {
        const response = await this.$http.get('/instructors');
        this.instructors = response.data;
      } catch (error) {
        console.error('Error fetching instructors:', error);
      }
    }
  },
  mounted() {
    this.fetchInstructors(); // Fetch instructors when component is mounted
  },
  beforeRouteEnter(to, from, next) {
    // Dynamically set the active route in the sidebar
    to.meta.sidebarActive = 'instructors';
    next();
  },
  beforeRouteLeave(to, from, next) {
    // Reset the active route when leaving the component
    to.meta.sidebarActive = null;
    next();
  }
};
</script>

<style scoped>
.instructors-view {
  padding: 20px;
}

.instructor-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.instructor {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.instructor h2 {
  margin-bottom: 10px;
}

.instructor p {
  margin: 5px 0;
}
</style>
