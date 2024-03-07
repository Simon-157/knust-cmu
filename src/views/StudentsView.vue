<template>
  <!-- <section class="section"> -->

  <SideBar />
 <div class="wrapper">

      <div class="header fixed-header">
        <h2>Students</h2>
        <!-- Button to trigger the AddStudentModal -->
        <button @click="showAddStudentModal" class="add-button">New Student</button>
        <input v-model="searchQuery" type="text" placeholder="Search..." class="search-box" />
        <add-student-modal
          v-if="isAddStudentModalActive"
          @close="hideAddStudentModal"
        ></add-student-modal>
      </div>

      <div class="students-view">
        <div v-if="loading" class="loading">Loading...</div>
        <div v-else-if="error" class="error">
          Error fetching students: {{ error }}
        </div>
        <div v-else-if="students.length === 0" class="no-students">
          No students found.
        </div>
        <div v-else>
          <table class="students-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>DOB</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(student, index) in filteredStudents" :key="student.student_id" :class="{'even-row': index % 2 === 0, 'odd-row': index % 2 !== 0}" @mouseover="highlightRow(index)" @mouseleave="unhighlightRow(index)">
                <td>{{ student.first_name }}</td>
                <td>{{ student.last_name }}</td>
                <td>{{ student.date_of_birth.split('T')[0] }}</td>
                <td>{{ student.gender }}</td>
                <td>{{ student.email }}</td>
                <td>{{ student.phone_number }}</td>
                <td>
                  <button
                    class="edit-button"
                    @click="showEditStudentModal(student)"
                  >
                    Edit
                  </button>
                  <button class="delete-button" @click="confirmDelete(student)">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <edit-student-modal
            v-if="isEditStudentModalActive"
            :student="selectedStudent"
            @close="hideEditStudentModal"
          ></edit-student-modal>
        </div>
      </div>
    </div>
  <!-- </section> -->
</template>

<script>
import axios from "axios";
import AddStudentModal from "@/components/AddStudentModal.vue";
import EditStudentModal from "@/components/EditStudentModal.vue";
import SideBar from "@/components/SideBar.vue";

export default {
  name: "StudentsView",
  components: {
    AddStudentModal,
    EditStudentModal,
    SideBar,
  },
  data() {
    return {
      students: [],
      loading: false,
      error: null,
      newStudent: {
        name: "",
        email: "",
        age: null,
      },
      isAddStudentModalActive: false,
      selectedStudent: null,
      isEditStudentModalActive: false,
      highlightedRow: null,
      searchQuery: "",
    };
  },
  computed: {
    filteredStudents() {
      return this.students.filter(student =>
        student.first_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        student.last_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    async fetchStudents() {
      this.loading = true;
      try {
        const response = await axios.get("https://knust-cmu-api.onrender.com/students");
        this.students = response.data;
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        console.log(error);
        this.loading = false;
      }
    },

    showAddStudentModal() {
      this.isAddStudentModalActive = true;
    },

    hideAddStudentModal() {
      this.isAddStudentModalActive = false;
    },

    async deleteStudent(student) {
      try {
        await axios.delete(`https://knust-cmu-api.onrender.com/students/${student.student_id}`);
        this.fetchStudents();
      } catch (error) {
        this.error = error.message;
        console.log(error);
      }
    },
    confirmDelete(student) {
      if (
        confirm(
          `Are you sure you want to delete ${student.first_name} ${student.last_name}?`
        )
      ) {
        this.deleteStudent(student);
      }
    },
    showEditStudentModal(student) {
      this.selectedStudent = student;
      this.isEditStudentModalActive = true;
    },
    hideEditStudentModal() {
      this.selectedStudent = null;
      this.isEditStudentModalActive = false;
    },
    highlightRow(index) {
      this.highlightedRow = index;
    },
    unhighlightRow(index) {
      this.highlightedRow = null;
    },
  },
  created() {
    this.fetchStudents();
  },
};
</script>

<style scoped>
.wrapper{
  display: flex;
  flex-direction: column;
  width: 100vw;
}

.search-box {
  margin: 10px;
  padding: 10px;
  background-color: #3a3a3b1a;
  color: aliceblue;
  border: 0;
  border-radius: 3px;
  width:300px;

}
.fixed-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #1e1e1f;
  border-bottom: #504e4e52 1px solid;
}
.header {
  /* position: fixed; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-top: 10px;
  padding: 10px;
  border-bottom: #504e4e52 1px solid;
  box-shadow: 0 1px 5px rgba(48, 47, 47, 0.658);
  color: #ddd;
}
.students-view {
  display: flex;
  width: 100%;
  /* position: absolute; */
  flex-direction: column;
  justify-content: flex-end;
  font-family: Arial, sans-serif;
}

.loading,
.error,
.no-students {
  text-align: center;
  margin-top: 20px;
}

.students-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.students-table th {
  color: #ddd;
}

.students-table th,
.students-table td {
  padding: 15px;
  font-size:18px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.students-table td:last-child {
  display: flex;
  align-items: center;
  /* padding: 15px; */
  /* justify-content: center; */
}

.add-button{
  background-color: #4cafa2;
  color: white;
  border: none;
  cursor: pointer;
  padding: 5px;
  border-radius: 3px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.4s;
  padding-left: 10px;
  padding-right: 10px;
}

.edit-button,
.delete-button {
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
}

.delete-button {
  background-color: #f44336;
}

/* Row styles */
/* .even-row {
  background-color: #242627;
}

.odd-row {
  background-color: #1f1e1e;
} */

/* Highlighted row */
.students-table tbody tr:hover {
  background-color: #c0c0c01c;
  cursor: pointer;
}

/* Responsive styles */
@media (max-width: 768px) {
  .students-view {
    padding: 10px;
  }

  .students-table th,
  .students-table td {
    padding: 10px;
  }

  .edit-button,
  .delete-button,
  .add-student-form button {
    padding: 5px 10px;
    font-size: 14px;
  }
}
</style>
