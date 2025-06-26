<template>
  <div class="flex h-screen p-4 space-x-4 bg-gray-100">
    <!-- Left Section (40%) -->
    <div class="w-2/5 bg-white rounded-2xl shadow overflow-hidden">
      <div class="bg-blue-600 text-white text-lg font-semibold px-4 py-3">
        Appointments
      </div>
      <div class="p-4 grid grid-cols-1 gap-4">
        <div
          v-for="appointment in appointments"
          :key="'left-' + appointment.id"
          class="bg-blue-100 rounded-xl p-4 text-center shadow"
        >
          <ul>
          <div>
            <li  :key="appointment.id" @click="selectAppointment(appointment)" >{{ appointment.date }} - {{ appointment.doctorName }}</li>
          </div>
        </ul>
        </div>
      </div>
    </div>

    <!-- Right Section (60%) -->
    <div class="w-3/5 bg-white rounded-2xl shadow overflow-hidden">
      <div class="bg-green-600 text-white text-lg font-semibold px-4 py-3">
        Appointment Details
      </div>
      <div class="p-4 grid grid-cols-1 gap-4">
        <div
          :key="'right-' + n"
          class="bg-green-100 rounded-xl p-4 text-left shadow"
        >
           <div v-if="selectedAppointment">
          <p><strong>Doctor Name:</strong> {{ selectedAppointment.doctorName }}</p>
          <p><strong>Speciality:</strong> {{ selectedAppointment.speciality }}</p>
          <p><strong>Date:</strong> {{ selectedAppointment.date }}</p>
          <p><strong>Time:</strong> {{ selectedAppointment.time }}</p>
          <p><strong>Description:</strong> {{ selectedAppointment.description }}</p>
          <input type="button" value="Cancel Appointment" class="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer" @click="selectAppointment(null)" />
        </div>
        <div v-else>
          <p>Please select an appointment to see the details.</p>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appointments: [
        // Sample data structure
        { id: 1, doctorName: 'Dr. Smith', speciality: 'Cardiology', date: '2023-10-01', time: '10:00 AM', description: 'Routine check-up' },
        { id: 2, doctorName: 'Dr. Jones', speciality: 'Dermatology', date: '2023-10-02', time: '11:00 AM', description: 'Skin rash evaluation' },
        // Add more appointments as needed
      ],
      selectedAppointment: null,
    };
  },
  methods: {
     async getAppointments() {
      try {
        const response = await fetchAppointments();
        this.appointments = response.data; // Assuming the response structure
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    },
    selectAppointment(appointment) {
      this.selectedAppointment = appointment;
    }
  },
  mounted() {
    this.getAppointments();
  },
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  border: 2px solid #ccc;
  padding: 10px;
}

.header {
  grid-column: span 2;
  background-color: #f0f0f0;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  border-bottom: 2px solid #ccc;
}

.grid-item {
  background-color: #e0e0e0;
  border: 1px solid #ccc;
  padding: 20px;
  text-align: center;
}
</style>