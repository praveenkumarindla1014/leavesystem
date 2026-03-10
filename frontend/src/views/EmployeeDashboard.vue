<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>
        <span class="header-icon">🏖️</span> Employee Dashboard
      </h1>
      <p class="subtitle">Apply for leave and track your requests</p>
    </div>

    <div class="tabs">
      <button
        :class="['tab-btn', { active: activeTab === 'apply' }]"
        @click="activeTab = 'apply'"
      >
        ✏️ Apply Leave
      </button>
      <button
        :class="['tab-btn', { active: activeTab === 'history' }]"
        @click="activeTab = 'history'"
      >
        📂 My Leaves
      </button>
    </div>

    <!-- Apply Leave Tab -->
    <div v-if="activeTab === 'apply'" class="card glass-card">
      <h2>Submit Leave Request</h2>
      <div v-if="applyError" class="alert alert-error">{{ applyError }}</div>
      <div v-if="applySuccess" class="alert alert-success">{{ applySuccess }}</div>

      <form @submit.prevent="submitLeave" class="leave-form">
        <div class="form-row">
          <div class="form-group">
            <label>Leave Type</label>
            <select v-model="form.leaveType" required>
              <option value="" disabled>Select type</option>
              <option value="Sick Leave">🤒 Sick Leave</option>
              <option value="Casual Leave">🌴 Casual Leave</option>
              <option value="Paid Time Off">💰 Paid Time Off</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Start Date</label>
            <input type="date" v-model="form.startDate" required />
          </div>
          <div class="form-group">
            <label>End Date</label>
            <input type="date" v-model="form.endDate" required />
          </div>
        </div>

        <div class="form-group">
          <label>Reason</label>
          <textarea
            v-model="form.reason"
            rows="3"
            placeholder="Provide a brief reason for your leave..."
            required
          ></textarea>
        </div>

        <button type="submit" class="btn-primary" :disabled="submitting">
          <span v-if="submitting" class="spinner"></span>
          {{ submitting ? 'Submitting...' : 'Submit Request' }}
        </button>
      </form>
    </div>

    <!-- My Leaves Tab -->
    <div v-if="activeTab === 'history'" class="card glass-card">
      <h2>My Leave History</h2>
      <div v-if="loadingLeaves" class="loading-text">Loading your leaves...</div>
      <div v-else-if="leaves.length === 0" class="empty-state">
        <span class="empty-icon">📭</span>
        <p>No leave requests yet. Apply for your first leave!</p>
      </div>
      <div v-else class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Start</th>
              <th>End</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="leave in leaves" :key="leave._id">
              <td>{{ leave.leaveType }}</td>
              <td>{{ formatDate(leave.startDate) }}</td>
              <td>{{ formatDate(leave.endDate) }}</td>
              <td class="reason-cell">{{ leave.reason }}</td>
              <td>
                <span :class="['status-badge', leave.status.toLowerCase()]">
                  {{ leave.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { applyLeaveAPI, getLeavesAPI } from '../services/api';

const activeTab = ref('apply');
const leaves = ref([]);
const loadingLeaves = ref(false);
const submitting = ref(false);
const applyError = ref('');
const applySuccess = ref('');

const form = ref({
  leaveType: '',
  startDate: '',
  endDate: '',
  reason: '',
});

const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

const fetchLeaves = async () => {
  loadingLeaves.value = true;
  try {
    const { data } = await getLeavesAPI();
    leaves.value = data;
  } catch (err) {
    console.error(err);
  } finally {
    loadingLeaves.value = false;
  }
};

const submitLeave = async () => {
  applyError.value = '';
  applySuccess.value = '';
  submitting.value = true;
  try {
    await applyLeaveAPI(form.value);
    applySuccess.value = 'Leave request submitted successfully! 🎉';
    form.value = { leaveType: '', startDate: '', endDate: '', reason: '' };
    fetchLeaves();
  } catch (err) {
    applyError.value =
      err.response?.data?.message ||
      err.response?.data?.errors?.[0]?.msg ||
      'Failed to submit leave request.';
  } finally {
    submitting.value = false;
  }
};

onMounted(fetchLeaves);
</script>
