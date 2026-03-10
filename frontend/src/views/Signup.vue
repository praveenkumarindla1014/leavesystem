<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <span class="auth-icon">✨</span>
        <h1>Create Account</h1>
        <p>Join LeaveFlow to manage leaves effortlessly</p>
      </div>

      <div v-if="error" class="alert alert-error">{{ error }}</div>
      <div v-if="success" class="alert alert-success">{{ success }}</div>

      <form @submit.prevent="handleSignup" class="auth-form">
        <div class="form-group">
          <label for="name">Full Name</label>
          <input
            type="text"
            id="name"
            v-model="name"
            placeholder="John Doe"
            required
          />
        </div>

        <div class="form-group">
          <label for="email">Email Address</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="you@company.com"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Min. 6 characters"
            minlength="6"
            required
          />
        </div>

        <div class="form-group">
          <label for="role">Role</label>
          <select id="role" v-model="role" required>
            <option value="employee">Employee</option>
            <option value="employer">Employer</option>
          </select>
        </div>

        <button type="submit" class="btn-primary" :disabled="loading">
          <span v-if="loading" class="spinner"></span>
          {{ loading ? 'Creating Account...' : 'Sign Up' }}
        </button>
      </form>

      <p class="auth-footer">
        Already have an account?
        <router-link to="/login">Sign in</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signupAPI } from '../services/api';

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const role = ref('employee');
const error = ref('');
const success = ref('');
const loading = ref(false);

const handleSignup = async () => {
  error.value = '';
  success.value = '';
  loading.value = true;
  try {
    const { data } = await signupAPI({
      name: name.value,
      email: email.value,
      password: password.value,
      role: role.value,
    });
    localStorage.setItem('user', JSON.stringify(data));
    router.push(data.role === 'employer' ? '/employer' : '/employee');
  } catch (err) {
    error.value =
      err.response?.data?.message ||
      err.response?.data?.errors?.[0]?.msg ||
      'Signup failed. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>
