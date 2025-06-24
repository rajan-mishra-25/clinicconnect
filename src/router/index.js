import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import DoctorDashboard from '../views/DoctorDashboard.vue';
import PatientDashboard from '../views/PatientDashboard.vue';
import BookAppointment from '../views/BookAppointment.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/doctor-dashboard', component: DoctorDashboard },
  { path: '/patient-dashboard', component: PatientDashboard },
  { path: '/book-appointment', component: BookAppointment },
];

export default createRouter({
  history: createWebHistory(),
  routes
});