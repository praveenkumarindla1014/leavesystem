<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <span class="brand-icon">📋</span>
      <span class="brand-text">LeaveFlow</span>
    </div>
    <div class="navbar-user" v-if="user">
      <span class="user-greeting">Hello, <strong>{{ user.name }}</strong></span>
      <span class="user-role-badge" :class="user.role">{{ user.role }}</span>
      <button class="btn-logout" @click="logout">Logout</button>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const user = computed(() => {
  const u = localStorage.getItem('user');
  return u ? JSON.parse(u) : null;
});

const logout = () => {
  localStorage.removeItem('user');
  router.push('/login');
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 2rem;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.brand-icon {
  font-size: 1.5rem;
}

.brand-text {
  font-size: 1.4rem;
  font-weight: 700;
  background: linear-gradient(90deg, #a78bfa, #60a5fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
}

.navbar-user {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-greeting {
  color: #cbd5e1;
  font-size: 0.9rem;
}

.user-role-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.user-role-badge.employee {
  background: rgba(96, 165, 250, 0.2);
  color: #60a5fa;
  border: 1px solid rgba(96, 165, 250, 0.3);
}

.user-role-badge.employer {
  background: rgba(167, 139, 250, 0.2);
  color: #a78bfa;
  border: 1px solid rgba(167, 139, 250, 0.3);
}

.btn-logout {
  padding: 0.4rem 1rem;
  background: rgba(239, 68, 68, 0.15);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-logout:hover {
  background: rgba(239, 68, 68, 0.3);
  transform: translateY(-1px);
}
</style>
