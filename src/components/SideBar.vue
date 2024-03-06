<template>
    <div class="sidebar">
      <div class="sidebar-header">
        <img src="../assets/logo.png" alt="Logo" class="logo" />
      </div>
      <ul class="nav flex-column">
        <li class="nav-item" v-for="(item, index) in sidebarItems" :key="index">
          <router-link :to="item.route" class="nav-link">
            <i :class="item.icon"></i>
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        sidebarItems: [
          { name: "Dashboard", route: "/dashboard", icon: "fas fa-tachometer-alt" },
          { name: "Profile", route: "/profile", icon: "fas fa-user" },
          { name: "Grades", route: "/grades", icon: "fas fa-graduation-cap" },
          { name: "Student", route: "/student/grades", icon: "fas fa-user-graduate" },
          { name: "Courses", route: "/courses", icon: "fas fa-book" },
          { name: "Instructors", route: "/instructors", icon: "fas fa-chalkboard-teacher" },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .sidebar {
    width: 150px;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #1b1d1fb6;
    padding-top: 20px;
    color: white;
  }
  
  .sidebar-header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .logo {
    width: 80px;
  }
  
  .nav-link {
    color: white;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    transition: background-color 0.3s;
  }
  
  .nav-link i {
    margin-right: 10px;
  }
  
  .nav-link:hover {
    background-color: #242b3353;
    text-decoration: none;
  }
  
  .nav {
    padding-left: 0;
    list-style: none;
  }
  </style>
  