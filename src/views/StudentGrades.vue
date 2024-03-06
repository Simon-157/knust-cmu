<template>
    <div class="grades-view">
      <SideBar />
      <div class="content">
        <div class="header">
          <h2>Student Grades</h2>
          <select v-model="selectedStudent" @change="fetchGrades">
            <option v-for="student in students" :value="student.student_id" :key="student.student_id">
              {{ student.first_name }} {{ student.last_name }}
            </option>
          </select>
          <div class="overall-info">
            <div>Overall GPA: {{ selectedStudentInfo.overall_gpa }}</div>
            <div>Overall Grade Points: {{ selectedStudentInfo.overall_grade_points}}</div>
          </div>
        </div>
        <div v-if="loading" class="loading">Loading...</div>
        <div v-else-if="error" class="error">
          Error fetching grades: {{ error }}
        </div>
        <div v-else>
          <table class="grades-table">
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Grade Point</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(grade, index) in grades" :key="index" :class="{'even-row': index % 2 === 0, 'odd-row': index % 2 !== 0}">
                <td>{{ grade.course_code }}</td>
                <td>{{ grade.course_name }}</td>
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
    name: "GradesView",
    components: {
      SideBar,
    },
    data() {
      return {
        students: [],
        selectedStudent: null,
        selectedStudentInfo: {}, // Added to store overall GPA and grade points for the selected student
        grades: [],
        loading: false,
        error: null,
      };
    },
    mounted() {
      this.fetchStudents();
    },
    methods: {
      async fetchStudents() {
        try {
          const response = await axios.get("http://localhost:3000/students");
          this.students = response.data;
        } catch (error) {
          this.error = error.message;
          console.log(error);
        }
      },
      async fetchGrades() {
        if (!this.selectedStudent) return;
        this.loading = true;
        try {
          const response = await axios.get(`http://localhost:3000/student/${this.selectedStudent}/grades`);
          this.grades = response.data;
  
          // Fetch overall GPA and grade points for the selected student
          const studentInfoResponse = await axios.get(`http://localhost:3000/student/${this.selectedStudent}`);
          this.selectedStudentInfo = studentInfoResponse.data;
  
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
    background-color: #33333398;
    color: #cecaca;
    box-shadow: 0px 2px 5px rgba(32, 32, 32, 0.377);
  }
  
  .overall-info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 10px;
  }
  
  .grades-table {
    width: 800px;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  .grades-table th,
  .grades-table td {
    padding: 15px;
    font-size: 14px;
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
  