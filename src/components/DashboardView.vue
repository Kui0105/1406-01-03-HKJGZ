<script setup lang="ts">
import { computed, ref } from 'vue'
import { ElMessage } from 'element-plus'
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Bell,
  Calendar,
  Check,
  CircleCheck,
  Coin,
  DataAnalysis,
  Document,
  HomeFilled,
  Link,
  Refresh,
  ShoppingBag,
  StarFilled,
  Tickets,
  User,
  UserFilled,
  Wallet,
} from '@element-plus/icons-vue'

const activeSection = ref('工作台總覽')
const payoutDialog = ref(false)
const payoutAmount = ref('')
const bankAccount = ref('滙豐銀行 ···· 1112')
const navItems = [
  { label: '工作台總覽', icon: HomeFilled },
  { label: '我的團隊', icon: User },
  { label: '推廣訂單', icon: ShoppingBag },
  { label: '提現記錄', icon: Wallet },
  { label: '收益明細', icon: Document },
]
const pageTitle = computed(() => activeSection.value)
const orderRows = [
  { id: 'HK202611020081', name: '月光會員季卡', amount: 'HK$ 128.00', member: '林小葵', time: '11/02 14:22', earning: 'HK$ 12.80', status: '已結算' },
  { id: 'HK202611020074', name: '星塵會員年卡', amount: 'HK$ 688.00', member: '陳可可', time: '11/02 11:08', earning: 'HK$ 68.80', status: '已結算' },
  { id: 'HK202611010316', name: '月光會員月卡', amount: 'HK$ 48.00', member: '阿橙同學', time: '11/01 19:46', earning: 'HK$ 4.80', status: '已結算' },
  { id: 'HK202611010289', name: '星塵會員季卡', amount: 'HK$ 198.00', member: 'Momo醬', time: '11/01 16:30', earning: 'HK$ 19.80', status: '處理中' },
]
const teamRows = [
  { name: '林小葵', phone: '+852 9128 ····', joined: '2026/11/02 14:22', orders: 18 },
  { name: '陳可可', phone: '+852 6381 ····', joined: '2026/11/02 11:08', orders: 12 },
  { name: '阿橙同學', phone: '+852 2057 ····', joined: '2026/11/01 19:46', orders: 9 },
  { name: 'Momo醬', phone: '+852 7762 ····', joined: '2026/11/01 16:30', orders: 7 },
]
const earningRows = [
  { reason: '推廣消費增加收益', amount: '+ HK$ 68.80', time: '2026/11/02 11:08', status: '已入帳' },
  { reason: '推廣消費增加收益', amount: '+ HK$ 12.80', time: '2026/11/02 14:22', status: '已入帳' },
  { reason: '提現扣減收益', amount: '− HK$ 5,000.00', time: '2026/11/01 16:20', status: '已完成' },
]
const withdrawalRows = [
  { id: 'WD202611010036', amount: 'HK$ 5,000.00', status: '已打款', time: '2026/11/01 16:20' },
  { id: 'WD202610280024', amount: 'HK$ 3,200.00', status: '審核中', time: '2026/10/28 10:45' },
  { id: 'WD202610210019', amount: 'HK$ 8,000.00', status: '已通過', time: '2026/10/21 15:12' },
]
const sectionCopy: Record<string, string> = {
  我的團隊: '看看你的社群正在如何一起發光。',
  推廣訂單: '每一筆成功推廣，都在累積你的影響力。',
  提現記錄: '提現申請狀態與打款進度，一目瞭然。',
  收益明細: '完整記錄每一筆收益變化。',
}
const sectionDescription = computed(() => sectionCopy[activeSection.value] ?? '管理你的創作者資料。')
const summaryLabel = computed(() => activeSection.value === '我的團隊' ? '團隊總人數' : activeSection.value === '推廣訂單' ? '累計推廣訂單' : activeSection.value === '提現記錄' ? '累計提現金額' : '本月收益')
const summaryValue = computed(() => activeSection.value === '我的團隊' ? '1,286 人' : activeSection.value === '推廣訂單' ? '3,840 筆' : activeSection.value === '提現記錄' ? 'HK$ 32,600' : 'HK$ 8,460')
const secondaryValue = computed(() => activeSection.value === '我的團隊' ? '342 人' : activeSection.value === '推廣訂單' ? '216 筆' : activeSection.value === '提現記錄' ? '12 筆' : '148 筆')

function handlePayout() {
  const amount = Number(payoutAmount.value)
  if (!Number.isFinite(amount) || amount < 100 || amount > 82460.8) {
    ElMessage.warning('提現金額需介於 HK$ 100 至 HK$ 82,460.80')
    return
  }
  payoutDialog.value = false
  ElMessage.info('提現介面示意，尚未連接申請服務。')
  payoutAmount.value = ''
}

function copyInvite() {
  navigator.clipboard?.writeText('https://hk-jia-gong-zai.example/invite/KIKI2026')
    .then(() => ElMessage.success('邀請連結已複製'))
    .catch(() => ElMessage.info('邀請連結：hk-jia-gong-zai.example/invite/KIKI2026'))
}
</script>

<template>
  <div class="workspace-shell">
    <aside class="workspace-sidebar">
      <RouterLink class="workspace-brand" to="/dashboard">
        <span class="workspace-brand-icon"><el-icon><Coin /></el-icon></span>
        <span><strong>HK夹公仔</strong><small>創作者工作台</small></span>
      </RouterLink>
      <div class="workspace-nav-label">創作者中心</div>
      <el-menu :default-active="activeSection" class="workspace-menu" @select="activeSection = $event">
        <el-menu-item v-for="item in navItems" :key="item.label" :index="item.label">
          <el-icon><component :is="item.icon" /></el-icon><span>{{ item.label }}</span>
          <span v-if="item.label === '我的團隊'" class="menu-count">26</span>
        </el-menu-item>
      </el-menu>
      <div class="workspace-sidebar-bottom">
        <div class="invite-mini"><span class="invite-mini-icon"><el-icon><Link /></el-icon></span><span><strong>邀請好友一起賺</strong><small>分享連結，解鎖更多獎勵</small></span></div>
        <div class="workspace-user"><img src="/creator-avatar.png" alt="Kiki 的動漫風頭像" /><span><strong>Kiki 林可欣</strong><small>認證創作者</small></span><el-icon><ArrowDown /></el-icon></div>
      </div>
    </aside>

    <main class="workspace-main">
      <header class="workspace-topbar">
        <div class="workspace-breadcrumb"><span>創作者中心</span><span class="breadcrumb-slash">／</span><strong>{{ pageTitle }}</strong></div>
        <div class="workspace-top-actions"><span class="top-date"><el-icon><Calendar /></el-icon>2026 年 11 月 2 日</span><el-button class="notification-button" circle text aria-label="通知" @click="ElMessage.info('目前沒有新通知')"><el-icon><Bell /></el-icon></el-button><img src="/creator-avatar.png" alt="Kiki 林可欣" /></div>
      </header>
      <div class="workspace-content">
        <template v-if="activeSection === '工作台總覽'">
          <section class="workspace-welcome"><div><div class="workspace-eyebrow">星期一・2026 年 11 月 2 日</div><h1>早安，Kiki <span><el-icon><StarFilled /></el-icon></span></h1><p>今天也來看看你的創作者能量值吧！</p></div><div class="goal-card"><span>本月目標</span><strong>68<small>%</small></strong><p>再推廣 58 位夥伴達成！</p><el-progress :percentage="68" :show-text="false" color="#d9f15a" /></div></section>
          <section class="balance-banner"><div class="balance-copy"><span class="balance-label"><el-icon><Coin /></el-icon>可提現收益 <i></i> 即時更新</span><div class="balance-total"><small>HK$</small> 82,460<span>.80</span></div><p>累計為社群創造的價值，正在發光。</p><el-button class="balance-action" @click="payoutDialog = true">提現收益 <el-icon><ArrowUp /></el-icon></el-button></div><div class="balance-mascot"><span class="mascot-spark"><el-icon><StarFilled /></el-icon></span><img src="/creator-avatar.png" alt="創作者動漫角色插畫" /><span class="mascot-sticker">好運<br />加倍！</span><span class="mascot-coin">$</span></div></section>
          <section class="metric-grid">
            <el-card v-for="metric in [
              { label: '今日收益', value: 'HK$ 286.40', change: '+18.6%', icon: ArrowUp, tone: 'mint' },
              { label: '累計收益', value: 'HK$ 96,820', change: '+12.4%', icon: Coin, tone: 'lavender' },
              { label: '已結算收益', value: 'HK$ 14,360', change: '本月', icon: CircleCheck, tone: 'peach' },
              { label: '我的團隊', value: '1,286 人', change: '+26 位新夥伴', icon: UserFilled, tone: 'sky' },
            ]" :key="metric.label" class="metric-card" shadow="never" @click="metric.label === '我的團隊' && (activeSection = '我的團隊')">
              <div class="metric-heading"><span>{{ metric.label }}</span><span class="metric-icon" :class="metric.tone"><el-icon><component :is="metric.icon" /></el-icon></span></div>
              <strong>{{ metric.value }}</strong><div class="metric-change"><span>{{ metric.change }}</span><span v-if="metric.label !== '已結算收益'">較昨日</span></div>
            </el-card>
          </section>
          <section class="dashboard-lower">
            <el-card class="chart-card" shadow="never"><div class="section-title"><div><div class="workspace-eyebrow">成長紀錄</div><h2>收益趨勢 <span><el-icon><ArrowUp /></el-icon></span></h2></div><el-button class="period-button" plain @click="ElMessage.info('目前顯示近 7 日收益')">近 7 日 <el-icon><ArrowDown /></el-icon></el-button></div><div class="chart-total">HK$ 8,460.20 <el-tag type="success" effect="light">+ 12.8%</el-tag><small>較上週</small></div><div class="chart-frame"><div class="chart-y-labels"><span>3,000</span><span>2,000</span><span>1,000</span><span>0</span></div><div class="chart-plot"><span v-for="line in 3" :key="line" class="chart-gridline" :class="`grid-${line}`"></span><svg viewBox="0 0 620 170" preserveAspectRatio="none" role="img" aria-label="近七日收益上升趨勢圖"><defs><linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#d9f15a" stop-opacity=".55" /><stop offset="100%" stop-color="#d9f15a" stop-opacity=".02" /></linearGradient></defs><path d="M0 142 C32 134 42 138 70 119 S110 133 145 102 S180 118 215 83 S255 103 290 77 S333 98 360 62 S405 76 438 53 S478 65 510 35 S552 57 580 22 S603 31 620 12 L620 170 L0 170 Z" fill="url(#chart-fill)" /><path d="M0 142 C32 134 42 138 70 119 S110 133 145 102 S180 118 215 83 S255 103 290 77 S333 98 360 62 S405 76 438 53 S478 65 510 35 S552 57 580 22 S603 31 620 12" fill="none" stroke="#262720" stroke-width="3" stroke-linecap="round" vector-effect="non-scaling-stroke" /></svg><div class="chart-x-labels"><span>10/27</span><span>10/28</span><span>10/29</span><span>10/30</span><span>10/31</span><span>11/01</span><span>11/02</span></div></div></div><div class="chart-footnote"><span></span>收益跟著你的熱情一起成長！</div></el-card>
            <el-card class="quick-card" shadow="never"><div class="section-title"><div><div class="workspace-eyebrow">快速入口</div><h2>快速入口</h2></div><span class="quick-star"><el-icon><StarFilled /></el-icon></span></div><button class="quick-entry" @click="activeSection = '推廣訂單'"><span class="quick-symbol coral"><el-icon><ShoppingBag /></el-icon></span><span><strong>推廣訂單</strong><small>查看成功訂單</small></span><el-icon><ArrowRight /></el-icon></button><button class="quick-entry" @click="activeSection = '提現記錄'"><span class="quick-symbol lemon"><el-icon><Wallet /></el-icon></span><span><strong>提現記錄</strong><small>追蹤審核進度</small></span><el-icon><ArrowRight /></el-icon></button><button class="quick-entry" @click="activeSection = '收益明細'"><span class="quick-symbol blue"><el-icon><Tickets /></el-icon></span><span><strong>收益明細</strong><small>每一筆都清楚</small></span><el-icon><ArrowRight /></el-icon></button><el-button class="invite-button" plain @click="copyInvite"><el-icon><Link /></el-icon><span><strong>邀請連結</strong><small>分享你的專屬推廣碼</small></span><el-tag>複製</el-tag></el-button></el-card>
          </section>
          <el-card class="recent-card" shadow="never"><div class="section-title"><div><div class="workspace-eyebrow">最新動態</div><h2>最新推廣訂單</h2></div><el-button text @click="activeSection = '推廣訂單'">查看全部 <el-icon><ArrowRight /></el-icon></el-button></div><div class="recent-row" v-for="order in orderRows.slice(0, 3)" :key="order.id"><span class="recent-avatar">{{ order.member.slice(0, 1) }}</span><span class="recent-name"><strong>{{ order.member }}</strong><small>{{ order.name }}・今天 {{ order.time }}</small></span><strong class="recent-earning">+ {{ order.earning }}</strong><span class="recent-check"><el-icon><Check /></el-icon></span></div></el-card>
        </template>

        <template v-else>
          <section class="list-page-heading"><div><div class="workspace-eyebrow">創作者數據</div><h1>{{ pageTitle }} <span><el-icon><StarFilled /></el-icon></span></h1><p>{{ sectionDescription }}</p></div><el-button v-if="activeSection === '我的團隊'" type="primary" @click="copyInvite"><el-icon><Link /></el-icon>邀請好友</el-button></section>
          <section class="metric-grid list-metrics"><el-card class="metric-card" shadow="never"><div class="metric-heading"><span>{{ summaryLabel }}</span><span class="metric-icon mint"><el-icon><DataAnalysis /></el-icon></span></div><strong>{{ summaryValue }}</strong><div class="metric-change"><span>即時更新</span></div></el-card><el-card class="metric-card" shadow="never"><div class="metric-heading"><span>本月新增</span><span class="metric-icon lavender"><el-icon><ArrowUp /></el-icon></span></div><strong>{{ secondaryValue }}</strong><div class="metric-change"><span>本月累計</span></div></el-card><el-card class="metric-card" shadow="never"><div class="metric-heading"><span>資料狀態</span><span class="metric-icon peach"><el-icon><CircleCheck /></el-icon></span></div><strong>同步正常</strong><div class="metric-change"><span>示意資料</span></div></el-card></section>
          <el-card class="table-card" shadow="never"><div class="table-toolbar"><div><h2>{{ pageTitle }}清單</h2><span class="row-count">顯示近期資料</span></div><div class="table-filters"><el-input class="table-search" placeholder="搜尋資料" :prefix-icon="User" /><el-date-picker type="daterange" range-separator="至" start-placeholder="開始日期" end-placeholder="結束日期" value-format="YYYY-MM-DD" /><el-button @click="ElMessage.info('日期篩選介面示意')"><el-icon><Refresh /></el-icon>篩選</el-button></div></div>
            <el-table v-if="activeSection === '我的團隊'" :data="teamRows" stripe><el-table-column label="團隊成員" min-width="150"><template #default="scope"><span class="member-cell"><span class="table-avatar">{{ scope.row.name.slice(0, 1) }}</span>{{ scope.row.name }}</span></template></el-table-column><el-table-column prop="phone" label="聯絡電話" min-width="150" /><el-table-column prop="joined" label="加入時間" min-width="180" /><el-table-column prop="orders" label="推廣訂單" min-width="120" /></el-table>
            <el-table v-else-if="activeSection === '推廣訂單'" :data="orderRows" stripe><el-table-column prop="id" label="訂單編號" min-width="170" /><el-table-column prop="name" label="充值方案" min-width="150" /><el-table-column prop="amount" label="支付金額" min-width="120" /><el-table-column prop="member" label="用戶暱稱" min-width="120" /><el-table-column prop="time" label="支付時間" min-width="120" /><el-table-column prop="earning" label="收益金額" min-width="120" /><el-table-column label="狀態" min-width="100"><template #default="scope"><el-tag :type="scope.row.status === '已結算' ? 'success' : 'warning'" effect="light">{{ scope.row.status }}</el-tag></template></el-table-column></el-table>
            <el-table v-else-if="activeSection === '提現記錄'" :data="withdrawalRows" stripe><el-table-column prop="id" label="提現單號" min-width="180" /><el-table-column prop="amount" label="提現金額" min-width="140" /><el-table-column prop="status" label="狀態" min-width="110" /><el-table-column prop="time" label="提現時間" min-width="180" /></el-table>
            <el-table v-else :data="earningRows" stripe><el-table-column prop="reason" label="變動原因" min-width="180" /><el-table-column prop="amount" label="變動金額" min-width="150" /><el-table-column prop="time" label="變動時間" min-width="180" /><el-table-column prop="status" label="狀態" min-width="110" /></el-table>
            <div class="table-bottom"><span>資料僅供介面展示</span><el-pagination size="small" background layout="prev, pager, next" :total="40" /></div>
          </el-card>
        </template>
        <p class="workspace-disclaimer"><el-icon><CircleCheck /></el-icon>目前顯示示意資料；登入與收益服務尚未連接後端。</p>
      </div>
    </main>

    <el-dialog v-model="payoutDialog" title="提交提現申請" width="min(460px, calc(100vw - 32px))" align-center>
      <p class="dialog-description">請確認提現金額與收款帳戶。此表單目前為介面預覽。</p>
      <el-form label-position="top"><el-form-item label="提現金額"><el-input v-model="payoutAmount" inputmode="decimal" placeholder="最低 HK$ 100"><template #prepend>HK$</template></el-input></el-form-item><el-form-item label="收款帳戶"><el-select v-model="bankAccount" style="width: 100%"><el-option label="滙豐銀行 ···· 1112" value="滙豐銀行 ···· 1112" /><el-option label="中國銀行 ···· 2057" value="中國銀行 ···· 2057" /></el-select></el-form-item></el-form>
      <template #footer><el-button @click="payoutDialog = false">取消</el-button><el-button type="primary" @click="handlePayout">確認提現</el-button></template>
    </el-dialog>
  </div>
</template>

