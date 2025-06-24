
<template>
  <div id="app">
    <header>
      <div class="logo">
        <!-- Space for logo -->
        <img src="./assets/logo.png" alt="Logo" />
      </div>
      <nav>
        <ul>
          <li><router-link to="/">Login</router-link></li>
          <li><router-link to="/register">Register</router-link></li>
          <li><router-link to="/doctor-dashboard">Doctor Dashboard</router-link></li>
          <li><router-link to="/patient-dashboard">Patient Dashboard</router-link></li>
          <li><router-link to="/book-appointment">Book Appointment</router-link></li>
          <!-- Add more links as needed based on your views -->
        </ul>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
@import 'tailwindcss';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  background-color: #f8f9fa;
}

.logo img {
  height: 70px; /* Adjust as needed */
  width: 100px; /* Maintain aspect ratio */
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  display: inline;
  margin: 0 15px;
}

nav ul li a {
  text-decoration: none;
  color: #2c3e50;
}
</style>


