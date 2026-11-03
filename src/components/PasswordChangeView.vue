<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { ArrowLeft, CircleCheck, Key, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const formRef = ref<FormInstance>()
const confirmDialog = ref(false)
const form = reactive({ currentPassword: '', newPassword: '', confirmPassword: '' })

const rules: FormRules = {
  currentPassword: [{ required: true, message: '請輸入原密碼', trigger: 'blur' }],
  newPassword: [
    { required: true, message: '請輸入新密碼', trigger: 'blur' },
    { min: 8, message: '新密碼至少需要 8 個字元', trigger: 'blur' },
    {
      validator: (_rule, value, callback) => {
        if (value && value === form.currentPassword) callback(new Error('新密碼不能與原密碼相同'))
        else callback()
      },
      trigger: 'blur',
    },
  ],
  confirmPassword: [
    { required: true, message: '請再次輸入新密碼', trigger: 'blur' },
    {
      validator: (_rule, value, callback) => {
        if (value !== form.newPassword) callback(new Error('兩次輸入的新密碼不一致'))
        else callback()
      },
      trigger: 'blur',
    },
  ],
}

async function submitForm() {
  const valid = await formRef.value?.validate().catch(() => false)
  if (valid) confirmDialog.value = true
}

function confirmPasswordChange() {
  confirmDialog.value = false
  ElMessage.warning('目前未連接帳戶驗證服務，無法驗證原密碼或儲存新密碼。')
}
</script>

<template>
  <main class="password-change-page">
    <RouterLink class="password-return" to="/dashboard"><el-icon><ArrowLeft /></el-icon>返回推廣中心</RouterLink>
    <section class="password-change-card">
      <div class="password-brand"><span class="password-brand-mark"><el-icon><Key /></el-icon></span><span><strong>HK夹公仔</strong><small>網紅專屬推廣中心</small></span></div>
      <div class="password-heading"><span class="login-eyebrow">ACCOUNT SECURITY</span><h1>修改登入密碼</h1><p>更新密碼前，請先確認你的帳戶資料。</p></div>
      <el-alert class="password-service-notice" title="目前為介面預覽，尚未連接帳戶驗證服務。" description="表單會檢查必填欄位、密碼長度及兩次輸入是否一致，但無法驗證原密碼或實際更新帳戶密碼。" type="warning" :closable="false" show-icon />
      <el-form ref="formRef" class="password-change-form" :model="form" :rules="rules" label-position="top" @submit.prevent="submitForm">
        <el-form-item label="輸入原密碼" prop="currentPassword"><el-input v-model="form.currentPassword" :prefix-icon="Lock" type="password" show-password autocomplete="current-password" placeholder="請輸入目前使用的密碼" /></el-form-item>
        <el-form-item label="新密碼" prop="newPassword"><el-input v-model="form.newPassword" :prefix-icon="Key" type="password" show-password autocomplete="new-password" placeholder="至少 8 個字元" /></el-form-item>
        <el-form-item label="確認新密碼" prop="confirmPassword"><el-input v-model="form.confirmPassword" :prefix-icon="CircleCheck" type="password" show-password autocomplete="new-password" placeholder="請再次輸入新密碼" /></el-form-item>
        <el-button class="password-submit" type="primary" @click="submitForm">提交修改</el-button>
      </el-form>
    </section>

    <el-dialog v-model="confirmDialog" title="確認修改密碼" width="min(420px, calc(100vw - 32px))" align-center>
      <p class="dialog-description">請再次確認新密碼資料。由於目前沒有連接帳戶驗證服務，確認後仍無法驗證原密碼或更新密碼。</p>
      <template #footer><el-button @click="confirmDialog = false">返回修改</el-button><el-button type="primary" @click="confirmPasswordChange">確認提交</el-button></template>
    </el-dialog>
  </main>
</template>
