<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>
        <span class="header-icon">🏢</span> Employer Dashboard
      </h1>
      <p class="subtitle">Review and manage employee leave requests</p>
    </div>

    <!-- Stats -->
    <div class="stats-grid">
      <div class="stat-card pending">
        <span class="stat-number">{{ pendingCount }}</span>
        <span class="stat-label">Pending</span>
      </div>
      <div class="stat-card approved">
        <span class="stat-number">{{ approvedCount }}</span>
        <span class="stat-label">Approved</span>
      </div>
      <div class="stat-card rejected">
        <span class="stat-number">{{ rejectedCount }}</span>
        <span class="stat-label">Rejected</span>
      </div>
      <div class="stat-card total">
        <span class="stat-number">{{ leaves.length }}</span>
        <span class="stat-label">Total</span>
      </div>
    </div>

    <!-- Leave Requests Table -->
    <div class="card glass-card">
      <h2>All Leave Requests</h2>

      <div v-if="loading" class="loading-text">Loading requests...</div>
      <div v-else-if="leaves.length === 0" class="empty-state">
        <span class="empty-icon">📭</span>
        <p>No leave requests to display.</p>
      </div>
      <div v-else class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Type</th>
              <th>Start</th>
              <th>End</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="leave in leaves" :key="leave._id">
              <td>
                <div class="employee-info">
                  <strong>{{ leave.employeeId?.name || 'N/A' }}</strong>
                  <small>{{ leave.employeeId?.email || '' }}</small>
                </div>
              </td>
              <td>{{ leave.leaveType }}</td>
              <td>{{ formatDate(leave.startDate) }}</td>
              <td>{{ formatDate(leave.endDate) }}</td>
              <td class="reason-cell">{{ leave.reason }}</td>
              <td>
                <span :class="['status-badge', leave.status.toLowerCase()]">
                  {{ leave.status }}
                </span>
              </td>
              <td>
                <div class="action-btns" v-if="leave.status === 'Pending'">
                  <button
                    class="btn-approve"
                    @click="updateStatus(leave._id, 'Approved')"
                    :disabled="actionLoading === leave._id"
                  >
                    ✅ Approve
                  </button>
                  <button
                    class="btn-reject"
                    @click="updateStatus(leave._id, 'Rejected')"
                    :disabled="actionLoading === leave._id"
                  >
                    ❌ Reject
                  </button>
                </div>
                <span v-else class="action-done">—</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getLeavesAPI, updateLeaveStatusAPI } from '../services/api';

const leaves = ref([]);
const loading = ref(false);
const actionLoading = ref(null);

const pendingCount = computed(() => leaves.value.filter((l) => l.status === 'Pending').length);
const approvedCount = computed(() => leaves.value.filter((l) => l.status === 'Approved').length);
const rejectedCount = computed(() => leaves.value.filter((l) => l.status === 'Rejected').length);

const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

const fetchLeaves = async () => {
  loading.value = true;
  try {
    const { data } = await getLeavesAPI();
    leaves.value = data;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const updateStatus = async (id, status) => {
  actionLoading.value = id;
  try {
    await updateLeaveStatusAPI(id, status);
    fetchLeaves();
  } catch (err) {
    alert(err.response?.data?.message || 'Failed to update status');
  } finally {
    actionLoading.value = null;
  }
};

onMounted(fetchLeaves);
</script>
