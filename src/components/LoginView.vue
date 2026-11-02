<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { ArrowRight, RefreshRight, StarFilled, User, Lock, Key } from '@element-plus/icons-vue'
import { RouterLink } from 'vue-router'

const codePool = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'
const createCode = () => Array.from({ length: 5 }, () => codePool[Math.floor(Math.random() * codePool.length)]).join('')
const captchaCode = ref(createCode())
const captchaInput = ref('')
const formRef = ref<FormInstance>()
const form = reactive({ account: '', password: '' })
const rules: FormRules = {
  account: [{ required: true, message: '請輸入帳號', trigger: 'blur' }],
  password: [{ required: true, message: '請輸入密碼', trigger: 'blur' }],
}

const glyphs = computed(() => [...captchaCode.value].map((character, index) => ({
  character,
  x: 18 + index * 19,
  y: 27 + ((index % 2) * 2 - 1) * 4,
  rotation: (index % 2 === 0 ? -1 : 1) * (6 + index * 2),
})))
const noiseLines = [
  { x1: 4, y1: 11, x2: 98, y2: 30, color: '#98a43f' },
  { x1: 11, y1: 35, x2: 86, y2: 8, color: '#e18c72' },
  { x1: 29, y1: 4, x2: 60, y2: 37, color: '#a79ac2' },
]

function refreshCaptcha() {
  captchaCode.value = createCode()
  captchaInput.value = ''
}

async function submitLogin() {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return

  if (captchaInput.value.trim().toUpperCase() !== captchaCode.value) {
    ElMessage.error('圖形驗證碼不正確，請重新輸入')
    refreshCaptcha()
    return
  }

  ElMessage.info('圖形驗證通過；登入服務尚未連接，未建立登入狀態。')
}
</script>

<template>
  <main class="login-page">
    <section class="login-poster" aria-label="HK夹公仔創作者平台介紹">
      <div class="poster-grain" aria-hidden="true"></div>
      <div class="poster-brand"><span class="poster-brand-mark"><StarFilled /></span><span><strong>HK夹公仔</strong><small>創作者中心</small></span></div>
      <div class="poster-copy">
        <span class="poster-kicker">歡迎回到你的舞台</span>
        <h1>把熱愛夾進日常，<br />把成就帶回家。</h1>
        <p>每一次分享，都是好運開始的地方。</p>
      </div>
      <div class="poster-illustration">
        <div class="illustration-sun"><el-icon><StarFilled /></el-icon></div>
        <div class="illustration-ring"></div>
        <img src="/creator-avatar.png" alt="HK夹公仔創作者角色插畫" />
        <span class="illustration-label">好運加倍！</span>
        <span class="illustration-star star-one"><el-icon><StarFilled /></el-icon></span>
        <span class="illustration-star star-two"><el-icon><StarFilled /></el-icon></span>
      </div>
      <div class="poster-footer"><span>夾住好運，分享快樂</span><el-icon><StarFilled /></el-icon></div>
      <div class="poster-sticker">今日<br />也要<br />發光！</div>
    </section>

    <section class="login-side">
      <div class="login-side-top"><span class="top-dot"></span> 官方創作者平台 <span class="top-separator">／</span> 安全登入</div>
      <div class="login-card-wrap">
        <div class="login-card-head"><span class="login-eyebrow">CREATOR LOGIN</span><span class="login-card-sticker">LOGIN<br /><el-icon><StarFilled /></el-icon></span><h2>登入你的創作者帳號</h2><p>輸入帳號密碼，開啟今天的好運氣。</p></div>
        <el-form ref="formRef" class="login-form" :model="form" :rules="rules" label-position="top" @submit.prevent="submitLogin">
          <el-form-item label="帳號" prop="account">
            <el-input v-model="form.account" size="large" :prefix-icon="User" placeholder="請輸入帳號" autocomplete="username" clearable />
          </el-form-item>
          <el-form-item label="密碼" prop="password">
            <el-input v-model="form.password" size="large" :prefix-icon="Lock" placeholder="請輸入密碼" type="password" show-password autocomplete="current-password" @keyup.enter="submitLogin" />
          </el-form-item>
          <el-form-item label="圖形驗證碼" class="captcha-form-item">
            <div class="captcha-row">
              <el-input v-model="captchaInput" size="large" :prefix-icon="Key" placeholder="輸入右側驗證碼" maxlength="5" autocomplete="off" @keyup.enter="submitLogin" />
              <button class="captcha-art" type="button" aria-label="刷新圖形驗證碼" @click="refreshCaptcha">
                <svg viewBox="0 0 108 42" role="img" aria-label="圖形驗證碼">
                  <rect x="1" y="1" width="106" height="40" rx="8" fill="#f5f7e7" />
                  <line v-for="(line, index) in noiseLines" :key="index" :x1="line.x1" :y1="line.y1" :x2="line.x2" :y2="line.y2" :stroke="line.color" stroke-width="1.1" opacity=".66" />
                  <text v-for="(glyph, index) in glyphs" :key="`${glyph.character}-${index}`" :x="glyph.x" :y="glyph.y" :transform="`rotate(${glyph.rotation} ${glyph.x} ${glyph.y})`" fill="#303126" font-size="16" font-weight="800" font-family="monospace">{{ glyph.character }}</text>
                </svg>
                <span class="captcha-refresh"><el-icon><RefreshRight /></el-icon></span>
              </button>
            </div>
          </el-form-item>
          <div class="login-options"><el-checkbox>記住帳號</el-checkbox><button type="button" class="forgot-link" @click="ElMessage.info('請聯絡平台管理員重設密碼')">忘記密碼？</button></div>
          <el-button class="login-submit" type="primary" size="large" @click="submitLogin">登入帳號 <el-icon><ArrowRight /></el-icon></el-button>
        </el-form>
        <div class="login-demo-note"><span class="note-bullet"></span>目前為介面預覽；驗證碼在瀏覽器端驗證，登入需另接後端服務。</div>
        <RouterLink class="preview-link" to="/dashboard">查看工作台介面預覽 <el-icon><ArrowRight /></el-icon></RouterLink>
      </div>
      <footer class="login-footer"><span>© 2026 HK夹公仔</span><span>夾住好運，分享快樂</span></footer>
    </section>
  </main>
</template>
