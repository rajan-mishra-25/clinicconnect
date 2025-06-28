
<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">Book an Appointment</h2>
    <form @submit.prevent="submitAppointment">
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Doctor Name</label>
       <select id="doctor-select" v-model="selectedDoctor" class="w-full border rounded p-2">
         <option disabled value="">Select a doctor</option>
          <option v-for="doctor in doctors" :key="doctor.doctorId" :value="doctor.doctorId">
            {{ doctor.name }}
          </option>
      </select>
       </div>
      <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <input type="description" id="description" v-model="description" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500" required />
      </div>
      <div class="mb-4">
        <label for="date" class="block text-sm font-medium text-gray-700">Date</label>
        <input type="date" id="date" v-model="date" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500" required />
      </div>
      <div class="mb-4">
        <label for="time" class="block text-sm font-medium text-gray-700">Time</label>
        <input type="time" id="time" v-model="time" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500" required />
      </div>
      <button type="submit" class="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600">Book Appointment</button>
    </form>
  </div>
</template>

<script>
 import {jwtDecode} from 'jwt-decode';
import {getDoctorList} from '@/store/api.js';

//  const token = localStorage.getItem("authToken");
//  const decodedToken = jwtDecode(token);


export default {
  data() {
    
    return {
      selectedDoctor: null,
      description: '',
      date: '',
      time: '',
      doctors: [],
      timeslots: ['10:00 AM', '11:00 AM', '2:00 PM', '4:00 PM']
    };
  },
  mounted() {
    // fetch available doctors
    this.fetchDoctors();
  },
  methods: {
    async fetchDoctors(){
     try {
        const response = await getDoctorList();

        // Check if response is wrapped inside a `data` key
        this.doctors = Array.isArray(response) ? response : response.data;

        if (!this.doctors || this.doctors.length === 0) {
          console.warn('Doctors list is empty');
        }
      } catch (error) {
        console.error('Failed to load doctors:', error);
      }
    },
    async submitAppointment() {
       try {
      // book appointment and trigger email
      const token = localStorage.getItem('authToken');
      const decoded = jwtDecode(token);
      const patientId = decoded?.id || decoded?.userId;

      debugger;
      const payload = {
        doctorId: this.selectedDoctor,
        patientId: patientId,
        description: this.description,
        date: this.date,
        time: this.time
      };
    console.log('Submitting appointment:', payload);

    // Now send the payload to your backend API (e.g., using axios)
    // await axios.post('/api/appointments/book', payload);

    alert('Appointment booked!');
  } catch (error) {
    console.error('Failed to book appointment:', error);
    alert('Failed to book appointment.');
  }
    }
  }
};
</script>