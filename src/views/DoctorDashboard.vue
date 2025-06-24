
<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 class="text-2xl font-bold mb-4">Doctor Dashboard</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-blue-100 p-4 rounded-lg shadow">
          <h2 class="font-semibold text-lg">Patient List</h2>
          <ul>
            <li class="py-2 border-b">Patient 1</li>
            <li class="py-2 border-b">Patient 2</li>
            <li class="py-2 border-b">Patient 3</li>
          </ul>
        </div>
        <div class="bg-green-100 p-4 rounded-lg shadow">
          <h2 class="font-semibold text-lg">Appointments</h2>
          <ul>
            <li class="py-2 border-b">Appointment 1</li>
            <li class="py-2 border-b">Appointment 2</li>
            <li class="py-2 border-b">Appointment 3</li>
          </ul>
        </div>
      </div>
      <div class="mt-6">
        <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add New Patient</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
  name: 'DoctorDashboard',
  data() {
    return { appointments: [] };
  },
  mounted() {
    // fetch doctor appointments
  },
  methods: {
    cancel(id) {
      // cancel logic
    }
  }
};
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>