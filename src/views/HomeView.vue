<template>
  <div class="landing-page">
    <header class="hero">
      <div class="hero-content">
        <h1>Welcome to Student Management System</h1>
        <p>A platform to manage student data efficiently</p>
        <router-link to="/dashboard" class="btn">Go to Dashboard</router-link>
      </div>
    </header>
    <section class="features">
      <div class="feature">
        <img src="../assets/student.png" alt="Feature 1">
        <h2>Student Profiles</h2>
        <p>Manage student profiles with ease</p>
      </div>
      <div class="feature">
        <img src="../assets/teacher.png" alt="Feature 2">
        <h2>Course Management</h2>
        <p>Organize and manage courses efficiently</p>
      </div>
      <div class="feature">
        <img src="../assets/grades.png" alt="Feature 3">
        <h2>Grade Tracking</h2>
        <p>Track student grades and performance</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "LandingPage",
};
</script>

<style scoped>
/* Add your custom styles here */
.landing-page {
  font-family: Arial, sans-serif;
}

.hero {
  background-image: url('../assets/hero.png');
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}

.hero-content {
  text-align: center;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

.hero-content p {
  font-size: 1.2rem;
  margin-bottom: 40px;
}

.btn {
  display: inline-block;
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1.2rem;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #0056b3;
}

.features {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
}

.feature {
  text-align: center;
  margin: 0 20px;
}

.feature img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-bottom: 20px;
}

.feature h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.feature p {
  font-size: 1.1rem;
}
</style>
