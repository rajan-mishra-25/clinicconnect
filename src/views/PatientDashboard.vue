
 <template>
  <div class="patient-dashboard">
    <div class="grid-container">
      <div class="appointments-list" style="flex: 0 0 40%;">
        <h2>Appointments</h2>
        <ul>
          <li v-for="appointment in appointments" :key="appointment.id" @click="selectAppointment(appointment)">
            {{ appointment.date }} - {{ appointment.doctorName }}
          </li>
        </ul>
      </div>
      <div class="appointment-details" style="flex: 0 0 60%;">
        <h2>Appointment Details</h2>
        <div v-if="selectedAppointment">
          <p><strong>Doctor Name:</strong> {{ selectedAppointment.doctorName }}</p>
          <p><strong>Speciality:</strong> {{ selectedAppointment.speciality }}</p>
          <p><strong>Date:</strong> {{ selectedAppointment.date }}</p>
          <p><strong>Time:</strong> {{ selectedAppointment.time }}</p>
          <p><strong>Description:</strong> {{ selectedAppointment.description }}</p>
        </div>
        <div v-else>
          <p>Please select an appointment to see the details.</p>
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
    selectAppointment(appointment) {
      this.selectedAppointment = appointment;
    },
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