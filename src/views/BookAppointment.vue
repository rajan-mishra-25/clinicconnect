
<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">Book an Appointment</h2>
    <form @submit.prevent="submitAppointment">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" id="name" v-model="name" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500" required />
      </div>
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" v-model="email" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500" required />
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
export default {
  data() {
    return {
      doctor: '',
      date: '',
      timeslot: '',
      doctors: [],
      timeslots: ['10:00 AM', '11:00 AM', '2:00 PM', '4:00 PM']
    };
  },
  mounted() {
    // fetch available doctors
  },
  methods: {
    book() {
      // book appointment and trigger email
    }
  }
};
</script>