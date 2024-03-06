<template>
  <SideBar />
  <div class="wrapper">
    <div class="header">
      <h2>Courses</h2>
      <input v-model="searchQuery" type="text" placeholder="Search..." class="search-box" />
    </div>
    <div class="courses-view">
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">
        Error fetching courses: {{ error }}
      </div>
      <div v-else-if="courses.length === 0" class="no-courses">
        No courses found.
      </div>
      <div v-else>
        <table class="courses-table">
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Name</th>
              <th>Credit Hours</th>
              <th>Total Enrollments</th>
              <th>Department</th>
              <th>Instructors</th>
              <th>Schedules</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(course, index) in filteredCourses" :key="course.course_id" :class="{'even-row': index % 2 === 0, 'odd-row': index % 2 !== 0}">
              <td>{{ course.course_code }}</td>
              <td>{{ course.course_name }}</td>
              <td>{{ course.credit_hours }}</td>
              <td>{{ course.total_enrollments }}</td>
              <td>{{ course.department }}</td>
              <td>
                <ul class="instructors-list">
                  <li v-for="instructor in course.instructors" :key="instructor.instructor_id">
                    {{ instructor.first_name.split('e')[0] }} {{ instructor.last_name }} - {{ instructor.email }}
                  </li>
                </ul>
              </td>
              <td>
                <ul class="schedules-list">
                  <li v-for="schedule in course.schedules" :key="schedule.schedule_id">
                    {{ schedule.day_of_week }} {{ schedule.start_time }} - {{ schedule.end_time }}, Room: {{ schedule.room_number }}
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SideBar from '@/components/SideBar.vue';

export default {
  name: "CoursesView",
  components: {
    SideBar,
  },
  data() {
    return {
      courses: [],
      loading: false,
      error: null,
      searchQuery: "",
    };
  },
  computed: {
    filteredCourses() {
      return this.courses.filter(course =>
        course.course_code.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        course.course_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        course.department.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    async fetchCourses() {
      this.loading = true;
      try {
        const response = await axios.get("http://localhost:3000/courses");
        this.courses = response.data;
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        console.log(error);
        this.loading = false;
      }
    },
  },
  created() {
    this.fetchCourses();
  },
};
</script>
<style scoped>
/* Add your custom styles here */
.wrapper {
  display: flex;
  flex-direction: column;
  width: 100vw;
}

.search-box {
  margin-left: 10px;
  padding: 5px;
  background-color: #1e1e1f7a;
  color: aliceblue;
  border: 0;
  border-radius: 3px;
  width: 300px;
}

.header {
  position: fixed;
  top: 0;
  left: 150px;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #333; /* Change the background color as needed */
  color: #ddd;
  z-index: 1000; /* Ensure the header stays on top of other elements */
}

.courses-view {
  margin-top: 60px; /* Adjust the margin to leave space for the fixed header */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  font-family: Arial, sans-serif;
}

.loading,
.error,
.no-courses {
  text-align: center;
  margin-top: 20px;
}

.courses-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.courses-table th {
  color: #ddd;
  font-size: 16px;
  font-weight: bold;
}

.courses-table th,
.courses-table td {
  padding: 15px;
  font-size: 16px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.courses-table td:last-child {
  display: flex;
  flex-direction: column;
}

.instructors-list,
.schedules-list {
  list-style: none;
  padding: 0;
}

.instructors-list li,
.schedules-list li {
  margin-bottom: 5px;
}

/* .even-row {
  background-color: #f5f5f5;
}

.odd-row {
  background-color: #ffffff;
} */

</style>

