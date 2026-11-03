<script setup lang="ts">
import { reactive } from 'vue'
import { ArrowRight, StarFilled, User, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = reactive({ account: '', password: '' })

async function submitLogin() {
  await router.push('/dashboard')
}
</script>

<template>
  <main class="login-page">
    <section class="login-poster" aria-label="HK夹公仔網紅推廣平台介紹">
      <div class="poster-grain" aria-hidden="true"></div>
      <div class="poster-brand"><span class="poster-brand-mark"><StarFilled /></span><span><strong>HK夹公仔</strong><small>網紅推廣中心</small></span></div>
      <div class="poster-copy">
        <span class="poster-kicker">歡迎回到你的舞台</span>
        <h1>把熱愛夾進日常，<br />把成就帶回家。</h1>
        <p>每一次分享，都是好運開始的地方。</p>
      </div>
      <div class="poster-illustration">
        <div class="illustration-sun"><el-icon><StarFilled /></el-icon></div>
        <div class="illustration-ring"></div>
        <img src="/creator-avatar.png" alt="HK夹公仔網紅角色插畫" />
        <span class="illustration-label">好運加倍！</span>
        <span class="illustration-star star-one"><el-icon><StarFilled /></el-icon></span>
        <span class="illustration-star star-two"><el-icon><StarFilled /></el-icon></span>
      </div>
      <div class="poster-footer"><span>夾住好運，分享快樂</span><el-icon><StarFilled /></el-icon></div>
      <div class="poster-sticker">今日<br />也要<br />發光！</div>
    </section>

    <section class="login-side">
      <div class="login-side-top"><span class="top-dot"></span> 官方網紅推廣平台 <span class="top-separator">／</span> 演示入口</div>
      <div class="login-card-wrap">
        <div class="login-card-head"><span class="login-eyebrow">DEMO ACCESS</span><span class="login-card-sticker">DEMO<br /><el-icon><StarFilled /></el-icon></span><h2>進入網紅推廣工作台</h2><p>演示模式下無需驗證帳號密碼，點擊下方按鈕即可進入。</p></div>
        <el-form class="login-form" :model="form" label-position="top" @submit.prevent="submitLogin">
          <el-form-item label="帳號" prop="account">
            <el-input v-model="form.account" size="large" :prefix-icon="User" placeholder="請輸入帳號" autocomplete="username" clearable />
          </el-form-item>
          <el-form-item label="密碼" prop="password">
            <el-input v-model="form.password" size="large" :prefix-icon="Lock" placeholder="請輸入密碼" type="password" show-password autocomplete="current-password" @keyup.enter="submitLogin" />
          </el-form-item>
          <el-button class="login-submit" type="primary" size="large" @click="submitLogin">進入工作台 <el-icon><ArrowRight /></el-icon></el-button>
        </el-form>
      </div>
      <footer class="login-footer"><span>© 2026 HK夹公仔</span><span>夾住好運，分享快樂</span></footer>
    </section>
  </main>
</template>
