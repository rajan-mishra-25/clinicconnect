<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6 text-center text-blue-700">Book an Appointment</h2>
    <form @submit.prevent="submitAppointment" class="space-y-5">
      <div class="flex space-x-4">
        <!-- Book by Doctor -->
        <div class="flex-1">
          <label for="doctor-select" class="block text-sm font-semibold text-gray-700 mb-1">Doctor Name</label>
          <select id="doctor-select" v-model="selectedDoctor" class="w-full border border-blue-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition">
            <option disabled value="">Select a doctor</option>
            <option v-for="doctor in filteredDoctors" :key="doctor.doctorId" :value="doctor.doctorId"
              :disabled="isDoctorUnavailable(doctor)"
              :class="isDoctorUnavailable(doctor) ? 'bg-red-100 text-red-600 font-semibold' : ''">
              {{ doctor.name }}<span v-if="isDoctorUnavailable(doctor)"> (Unavailable)</span>
            </option>
          </select>
        </div>
        <div class="flex items-center justify-center text-gray-400 font-bold px-2">OR</div>
        <!-- Book by Date/Time -->
        <div class="flex-1">
          <label for="date" class="block text-sm font-semibold text-gray-700 mb-1">Date</label>
          <input type="date" id="date" v-model="date" class="w-full border border-blue-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition mb-2" />
          <label for="time" class="block text-sm font-semibold text-gray-700 mb-1">Time</label>
          <select id="time" v-model="time" class="w-full border border-blue-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition">
            <option disabled value="">Select a time</option>
            <option v-for="slot in timeslots" :key="slot" :value="slot"
              :disabled="isSlotBooked(slot)"
              :class="isSlotBooked(slot) ? 'bg-red-100 text-red-600 font-semibold' : ''">
              {{ slot }}
              <span v-if="isSlotBooked(slot)"> (Booked)</span>
            </option>
          </select>
        </div>
      </div>
      <div>
        <label for="description" class="block text-sm font-semibold text-gray-700 mb-1">Description</label>
        <textarea id="description" v-model="description" rows="3" class="w-full border border-blue-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition resize-none" required></textarea>
      </div>
      <div class="flex space-x-2">
        <button type="submit" class="flex-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-2 rounded-lg shadow hover:from-blue-600 hover:to-blue-800 transition">Book Appointment</button>
        <button type="button" @click="resetForm" class="flex-1 bg-gray-200 text-gray-700 font-bold py-2 rounded-lg shadow hover:bg-gray-300 transition">Reset</button>
      </div>
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
      timeslots: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
    };
  },
  computed: {
    filteredDoctors() {
      // If searching by time and date, show only available doctors, others disabled and red
      if (this.date && this.time) {
        return this.doctors;
      }
      return this.doctors;
    }
  },
  mounted() {
    // Dummy doctor data with booked slots for demo
    this.doctors = [
      {
        doctorId: 1,
        name: 'Dr. Alice Smith',
        bookedSlots: {
          '2025-06-28': ['10:00', '12:00'],
          '2025-06-29': ['11:00', '15:00']
        }
      },
      {
        doctorId: 2,
        name: 'Dr. Bob Johnson',
        bookedSlots: {
          '2025-06-28': ['11:00', '14:00', '16:00'],
          '2025-06-29': ['10:00', '13:00', '18:00']
        }
      },
      {
        doctorId: 3,
        name: 'Dr. Carol Lee',
        bookedSlots: {
          '2025-06-28': ['13:00', '17:00'],
          '2025-06-29': ['12:00', '14:00']
        }
      }
    ];
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
    isSlotBooked(slot) {
      if (this.selectedDoctor && this.date) {
        const doctor = this.doctors.find(d => d.doctorId === this.selectedDoctor);
        if (doctor && doctor.bookedSlots && doctor.bookedSlots[this.date]) {
          return doctor.bookedSlots[this.date].includes(slot);
        }
      }
      return false;
    },
    isDoctorUnavailable(doctor) {
      if (this.date && this.time) {
        return doctor.bookedSlots && doctor.bookedSlots[this.date] && doctor.bookedSlots[this.date].includes(this.time);
      }
      return false;
    },
    resetForm() {
      this.selectedDoctor = null;
      this.description = '';
      this.date = '';
      this.time = '';
    },
    async submitAppointment() {
      if (!this.selectedDoctor && (!this.date || !this.time)) {
        alert('Please select a doctor or choose a date and time.');
        return;
      }
      // Time validation: only allow between 10:00 and 18:00
      if (this.time) {
        const [hour, minute] = this.time.split(":").map(Number);
        if (hour < 10 || hour > 18 || (hour === 18 && minute > 0)) {
          alert('Appointments can only be booked between 10:00 AM and 6:00 PM.');
          return;
        }
      }
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