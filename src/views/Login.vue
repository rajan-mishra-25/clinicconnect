
<script>
  import { loginUser } from '@/store/api.js';

export default {
  data() {
    return {
      username: '',
      password: '',
      errors: {}
    };
  },
  methods: {
    validateInput() {
      this.errors = {};
      if (!this.username) {
        this.errors.username = 'Username is required.';
      }
      if (!this.password) {
        this.errors.password = 'Password is required.';
      }
      return Object.keys(this.errors).length === 0;
    },
    async handleLogin() {
      if (this.validateInput()) {
        try {
          const response = await loginUser({ username: this.username, password: this.password });
          // Handle successful login (e.g., redirect or store token)
          if(response.status === 200) {
            this.$router.push('/patient-dashboard'); // Redirect to dashboard on successful login
            // localStorage.setItem('authToken', response.data.token);
          }
          console.log('Login successful:', response);
        } catch (error) {
          // Handle login error (e.g., show error message)
          console.error('Login failed:', error);
        }
      }
    }
  }
};
</script>

<template>
     <div class="flex items-center justify-center min-h-screen bg-gray-100">
       <form class="bg-white p-6 rounded shadow-md w-96">
         <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
         <div class="mb-4">
           <label for="username" class="block text-sm font-medium text-gray-700">Email</label>
           <input type="text" id="email" v-model="username" class="mt-1 block w-full p-2 border border-gray-300 rounded" required />
        <span v-if="errors.username">{{ errors.username }}</span>
         </div>
         <div class="mb-4">
           <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
           <input type="password" id="password" v-model="password" class="mt-1 block w-full p-2 border border-gray-300 rounded" required />
        <span v-if="errors.password">{{ errors.password }}</span>
         </div>
         <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Login</button>
       </form>
     </div>
   </template>

