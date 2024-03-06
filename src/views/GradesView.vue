<template>
  <div class="grades-view">
    <SideBar />
    <div class="content">
      <div class="header">
        <h2>Course Grades</h2>
        <select v-model="selectedCourse" @change="fetchGrades">
          <option v-for="course in courses" :value="course.course_id" :key="course.course_id">
            {{ course.course_code }} - {{ course.course_name }}
          </option>
        </select>
      </div>
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">
        Error fetching grades: {{ error }}
      </div>
      <div v-else>
        <table class="grades-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Grade Point</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(grade, index) in grades" :key="index" :class="{'even-row': index % 2 === 0, 'odd-row': index % 2 !== 0}">
              <td>{{ grade.student_name }}</td>
              <td>{{ grade.grade_value }}</td>
              <td>{{ grade.grade }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SideBar from "@/components/SideBar.vue";

export default {
  name: "CourseGradesView",
  components: {
    SideBar,
  },
  data() {
    return {
      courses: [],
      selectedCourse: null,
      grades: [],
      loading: false,
      error: null,
    };
  },
  mounted() {
    this.fetchCourses();
  },
  methods: {
    async fetchCourses() {
      try {
        const response = await axios.get("http://localhost:3000/courses");
        this.courses = response.data;
      } catch (error) {
        this.error = error.message;
        console.log(error);
      }
    },
    async fetchGrades() {
      if (!this.selectedCourse) return;
      this.loading = true;
      try {
        const response = await axios.get(`http://localhost:3000/course/${this.selectedCourse}/grades`);
        this.grades = response.data;
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        console.log(error);
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
/* Add your custom styles here */
.grades-view {
  display: flex;
  height: 100vh;
}

select {
  width: 200px;
  font-size: 16px;
  padding: 5px;
}

.content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  position: sticky;
  top: 0;
  padding: 10px 20px;
  color: #cecaca;
    background-color: #333; /* Change the background color as needed */

  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.425);
}

.grades-table {
  width: 800px;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.grades-table th,
.grades-table td {
  padding: 15px;
  font-size: 16px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.grades-table th {
  color: #cecaca;
  font-weight: bold;
}

.grades-table td:last-child {
  display: flex;
  align-items: center;
}

.loading,
.error {
  text-align: center;
  margin-top: 20px;
  color: #ff4d4f;
}
</style>

