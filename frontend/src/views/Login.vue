<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <span class="auth-icon">🔐</span>
        <h1>Welcome Back</h1>
        <p>Sign in to your LeaveFlow account</p>
      </div>

      <div v-if="error" class="alert alert-error">{{ error }}</div>

      <form @submit.prevent="handleLogin" class="auth-form">
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
            placeholder="••••••••"
            required
          />
        </div>

        <button type="submit" class="btn-primary" :disabled="loading">
          <span v-if="loading" class="spinner"></span>
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>

      <p class="auth-footer">
        Don't have an account?
        <router-link to="/signup">Create one</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginAPI } from '../services/api';

const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

const handleLogin = async () => {
  error.value = '';
  loading.value = true;
  try {
    const { data } = await loginAPI({ email: email.value, password: password.value });
    localStorage.setItem('user', JSON.stringify(data));
    router.push(data.role === 'employer' ? '/employer' : '/employee');
  } catch (err) {
    error.value = err.response?.data?.message || 'Login failed. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>
