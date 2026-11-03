<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
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
  SwitchButton,
  Tickets,
  User,
  UserFilled,
  Wallet,
} from '@element-plus/icons-vue'

const router = useRouter()

type WithdrawalRecord = {
  id: string
  amount: string
  status: string
  time: string
  reason?: string
  voucher?: string
  bank?: string
  accountMask?: string
}

const activeSection = ref('工作台總覽')
const payoutDialog = ref(false)
const confirmPayoutDialog = ref(false)
const withdrawalDetailDialog = ref(false)
const withdrawalDetailMode = ref<'reason' | 'proof'>('reason')
const selectedWithdrawal = ref<WithdrawalRecord | null>(null)
const availableBalance = ref(82460.8)
const balanceParts = computed(() => {
  const [whole, cents] = availableBalance.value.toLocaleString('en-HK', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).split('.')
  return { whole, cents }
})
const availableBalanceText = computed(() => `${balanceParts.value.whole}.${balanceParts.value.cents}`)
const payoutForm = reactive({ amount: '', account: '', bank: '', holder: '' })
const savedWithdrawalDetails = ref({ account: '', bank: '', holder: '' })
const withdrawalDetailTitle = computed(() => withdrawalDetailMode.value === 'reason' ? '提現駁回原因' : '打款憑證')
const navItems = [
  { label: '工作台總覽', icon: HomeFilled },
  { label: '我的團隊', icon: User },
  { label: '推廣訂單', icon: ShoppingBag },
  { label: '提現記錄', icon: Wallet },
  { label: '收益明細', icon: Document },
]
const pageTitle = computed(() => activeSection.value)
const orderRows = [
  { id: 'HK202611020081', name: '100金幣充值', amount: 'HK$ 128.00', member: '林小葵', time: '11/02 14:22', earning: 'HK$ 12.80', status: '已結算' },
  { id: 'HK202611020074', name: '200金幣充值', amount: 'HK$ 688.00', member: '陳可可', time: '11/02 11:08', earning: 'HK$ 68.80', status: '已結算' },
  { id: 'HK202611010316', name: '300金幣充值', amount: 'HK$ 48.00', member: '阿橙同學', time: '11/01 19:46', earning: 'HK$ 4.80', status: '已結算' },
  { id: 'HK202611010289', name: '400金幣充值', amount: 'HK$ 198.00', member: 'Momo醬', time: '11/01 16:30', earning: 'HK$ 19.80', status: '處理中' },
]
const teamRows = [
  { name: '林小葵', phone: '+852 9128 ····', joined: '2026/11/02 14:22', orders: 18 },
  { name: '陳可可', phone: '+852 6381 ····', joined: '2026/11/02 11:08', orders: 12 },
  { name: '阿橙同學', phone: '+852 2057 ····', joined: '2026/11/01 19:46', orders: 9 },
  { name: 'Momo醬', phone: '+852 7762 ····', joined: '2026/11/01 16:30', orders: 7 },
]
const teamMetrics = [
  { label: '推廣總數', value: '1,286 人', change: '累計團隊成員', icon: UserFilled, tone: 'mint' },
  { label: '今日推廣', value: '26 人', change: '+8 位新夥伴', icon: ArrowUp, tone: 'lavender' },
  { label: '本月推廣', value: '342 人', change: '本月新增團隊', icon: DataAnalysis, tone: 'peach' },
]
const earningRows = [
  { reason: '推廣消費增加收益', amount: '+ HK$ 68.80', time: '2026/11/02 11:08', status: '已入帳' },
  { reason: '推廣消費增加收益', amount: '+ HK$ 12.80', time: '2026/11/02 14:22', status: '已入帳' },
  { reason: '提現扣減收益', amount: '− HK$ 5,000.00', time: '2026/11/01 16:20', status: '已完成' },
  { reason: '提現駁回返還收益', amount: '+ HK$ 1,200.00', time: '2026/10/28 10:46', status: '已入帳' },
]
const withdrawalRows: WithdrawalRecord[] = [
  { id: 'WD202611010036', amount: 'HK$ 5,000.00', status: '已打款', time: '2026/11/01 16:20', voucher: 'FPS-20261101-77820', bank: '滙豐銀行', accountMask: '•••• 1112' },
  { id: 'WD202610280024', amount: 'HK$ 1,200.00', status: '已駁回', time: '2026/10/28 10:31', reason: '收款帳戶資訊不完整，請確認銀行帳戶及開戶人姓名一致。' },
  { id: 'WD202610210019', amount: 'HK$ 3,200.00', status: '審核中', time: '2026/10/21 15:12' },
  { id: 'WD202610120016', amount: 'HK$ 8,000.00', status: '已通過', time: '2026/10/12 09:40' },
]
const sectionCopy: Record<string, string> = {
  我的團隊: '看看你的社群正在如何一起發光。',
  推廣訂單: '每一筆成功推廣，都在累積你的影響力。',
  提現記錄: '提現申請狀態與打款進度，一目瞭然。',
  收益明細: '完整記錄每一筆收益變化。',
}
const sectionDescription = computed(() => sectionCopy[activeSection.value] ?? '管理你的網紅推廣資料。')
const summaryLabel = computed(() => activeSection.value === '我的團隊' ? '團隊總人數' : activeSection.value === '推廣訂單' ? '累計推廣訂單' : activeSection.value === '提現記錄' ? '累計提現金額' : '本月收益')
const summaryValue = computed(() => activeSection.value === '我的團隊' ? '1,286 人' : activeSection.value === '推廣訂單' ? '3,840 筆' : activeSection.value === '提現記錄' ? 'HK$ 32,600' : 'HK$ 8,460')
const secondaryValue = computed(() => activeSection.value === '我的團隊' ? '342 人' : activeSection.value === '推廣訂單' ? '216 筆' : activeSection.value === '提現記錄' ? '12 筆' : '148 筆')

function openPayoutDialog() {
  payoutForm.amount = ''
  Object.assign(payoutForm, savedWithdrawalDetails.value)
  payoutDialog.value = true
}

function fillAllAvailable() {
  payoutForm.amount = availableBalance.value.toFixed(2)
}

function handlePayout() {
  const amount = Number(payoutForm.amount.replace(/,/g, '').trim())
  if (!Number.isFinite(amount) || amount < 100 || amount > availableBalance.value) {
    ElMessage.warning(`提現金額需介於 HK$ 100 至 HK$ ${availableBalanceText}`)
    return
  }
  if (!payoutForm.account.trim() || !payoutForm.bank.trim() || !payoutForm.holder.trim()) {
    ElMessage.warning('請完整填寫提現帳號、開戶銀行及開戶人姓名')
    return
  }
  confirmPayoutDialog.value = true
}

function confirmPayout() {
  const amount = Number(payoutForm.amount.replace(/,/g, '').trim())
  const now = new Date()
  const date = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`
  const time = `${date.slice(0, 4)}/${date.slice(4, 6)}/${date.slice(6, 8)} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
  const formattedAmount = amount.toLocaleString('en-HK', { minimumFractionDigits: 2 })

  availableBalance.value = Math.max(0, availableBalance.value - amount)
  savedWithdrawalDetails.value = {
    account: payoutForm.account.trim(),
    bank: payoutForm.bank.trim(),
    holder: payoutForm.holder.trim(),
  }
  withdrawalRows.unshift({
    id: `WD${date}${String(Date.now()).slice(-4)}`,
    amount: `HK$ ${formattedAmount}`,
    status: '審核中',
    time,
    bank: payoutForm.bank.trim(),
    accountMask: `•••• ${payoutForm.account.trim().slice(-4)}`,
  })
  earningRows.unshift({
    reason: '提現扣減收益',
    amount: `− HK$ ${formattedAmount}`,
    time,
    status: '處理中',
  })
  confirmPayoutDialog.value = false
  payoutDialog.value = false
  payoutForm.amount = ''
  activeSection.value = '提現記錄'
  ElMessage.success('提現申請已提交，請留意審核進度')
}

function showWithdrawalDetail(record: unknown, mode: 'reason' | 'proof') {
  selectedWithdrawal.value = record as WithdrawalRecord
  withdrawalDetailMode.value = mode
  withdrawalDetailDialog.value = true
}

async function handleAccountAction(command: string) {
  if (command === 'password') {
    await router.push('/change-password')
    return
  }

  try {
    await ElMessageBox.confirm('退出後將返回登入頁面。', '確認退出登入', {
      confirmButtonText: '確認退出',
      cancelButtonText: '取消',
      type: 'warning',
    })
    await router.push('/login')
  } catch {
    return
  }
}

function copyTextFallback(value: string) {
  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.left = '-9999px'
  document.body.appendChild(textarea)

  try {
    textarea.select()
    if (!document.execCommand('copy')) throw new Error('Clipboard copy was rejected')
  } finally {
    textarea.remove()
  }
}

async function copyInvite() {
  const inviteUrl = new URL('/', window.location.origin)
  inviteUrl.searchParams.set('ref', 'KIKI2026')
  const link = inviteUrl.toString()

  try {
    if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(link)
    else copyTextFallback(link)
    ElMessage.success('推廣連結已複製')
  } catch {
    try {
      copyTextFallback(link)
      ElMessage.success('推廣連結已複製')
    } catch {
      ElMessage.info(`複製失敗，請手動複製：${link}`)
    }
  }
}
</script>

<template>
  <div class="workspace-shell">
    <aside class="workspace-sidebar">
      <RouterLink class="workspace-brand" to="/dashboard">
        <span class="workspace-brand-icon"><el-icon><Coin /></el-icon></span>
        <span><strong>HK夹公仔</strong><small>網紅專屬推廣中心</small></span>
      </RouterLink>
      <div class="workspace-nav-label">網紅推廣中心</div>
      <el-menu :default-active="activeSection" class="workspace-menu" @select="activeSection = $event">
        <el-menu-item v-for="item in navItems" :key="item.label" :index="item.label">
          <el-icon><component :is="item.icon" /></el-icon><span>{{ item.label }}</span>
          <span v-if="item.label === '我的團隊'" class="menu-count">26</span>
        </el-menu-item>
      </el-menu>
      <div class="workspace-sidebar-bottom">
        <button class="invite-mini" type="button" aria-label="點擊複製推廣連結" @click="copyInvite"><span class="invite-mini-icon"><el-icon><Link /></el-icon></span><span><strong>邀請好友一起賺</strong><small>點擊複製推廣連結</small></span></button>
        <div class="workspace-user"><img src="/creator-avatar.png" alt="Kiki 的動漫風頭像" /><span><strong>Kiki 林可欣</strong><small>認證網紅</small></span><el-dropdown trigger="hover" placement="top-end" @command="handleAccountAction"><button class="logout-button" type="button" aria-label="帳戶選單" title="帳戶選單"><el-icon><SwitchButton /></el-icon></button><template #dropdown><el-dropdown-menu><el-dropdown-item command="logout">退出登入</el-dropdown-item><el-dropdown-item command="password">修改密碼</el-dropdown-item></el-dropdown-menu></template></el-dropdown></div>
      </div>
    </aside>

    <main class="workspace-main">
      <header class="workspace-topbar">
        <div class="workspace-breadcrumb"><span>網紅推廣中心</span><span class="breadcrumb-slash">／</span><strong>{{ pageTitle }}</strong></div>
        <div class="workspace-top-actions"><span class="top-date"><el-icon><Calendar /></el-icon>2026 年 11 月 2 日</span><el-button class="notification-button" circle text aria-label="通知" @click="ElMessage.info('目前沒有新通知')"><el-icon><Bell /></el-icon></el-button><img src="/creator-avatar.png" alt="Kiki 林可欣" /></div>
      </header>
      <div class="workspace-content">
        <template v-if="activeSection === '工作台總覽'">
          <section class="workspace-welcome"><div><div class="workspace-eyebrow">星期一・2026 年 11 月 2 日</div><h1>早安，Kiki <span><el-icon><StarFilled /></el-icon></span></h1><p>今天也來看看你的推廣表現吧！</p></div></section>
          <section class="balance-banner"><div class="balance-copy"><span class="balance-label"><el-icon><Coin /></el-icon>可提現收益 <i></i> 即時更新</span><div class="balance-total"><small>HK$</small> {{ balanceParts.whole }}<span>.{{ balanceParts.cents }}</span></div><p>累計為社群創造的價值，正在發光。</p><el-button class="balance-action" @click="openPayoutDialog()">提現收益 <el-icon><ArrowUp /></el-icon></el-button></div><div class="balance-mascot"><span class="mascot-spark"><el-icon><StarFilled /></el-icon></span><img src="/creator-avatar.png" alt="網紅動漫角色插畫" /><span class="mascot-sticker">好運<br />加倍！</span><span class="mascot-coin">$</span></div></section>
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
            <el-card class="quick-card" shadow="never"><div class="section-title"><div><div class="workspace-eyebrow">快速入口</div><h2>快速入口</h2></div><span class="quick-star"><el-icon><StarFilled /></el-icon></span></div><button class="quick-entry" @click="activeSection = '推廣訂單'"><span class="quick-symbol coral"><el-icon><ShoppingBag /></el-icon></span><span><strong>推廣訂單</strong><small>查看成功訂單</small></span><el-icon><ArrowRight /></el-icon></button><button class="quick-entry" @click="activeSection = '提現記錄'"><span class="quick-symbol lemon"><el-icon><Wallet /></el-icon></span><span><strong>提現記錄</strong><small>追蹤審核進度</small></span><el-icon><ArrowRight /></el-icon></button><button class="quick-entry" @click="activeSection = '收益��細'"><span class="quick-symbol blue"><el-icon><Tickets /></el-icon></span><span><strong>收益明細</strong><small>每一筆都清楚</small></span><el-icon><ArrowRight /></el-icon></button><el-button class="invite-button" plain @click="copyInvite"><el-icon><Link /></el-icon><span><strong>邀請連結</strong><small>分享你的專屬推廣碼</small></span><el-tag>複製</el-tag></el-button></el-card>
          </section>
          <el-card class="recent-card" shadow="never"><div class="section-title"><div><div class="workspace-eyebrow">最新動態</div><h2>最新推廣訂單</h2></div><el-button text @click="activeSection = '推廣訂單'">查看全部 <el-icon><ArrowRight /></el-icon></el-button></div><div class="recent-row" v-for="order in orderRows.slice(0, 3)" :key="order.id"><span class="recent-avatar">{{ order.member.slice(0, 1) }}</span><span class="recent-name"><strong>{{ order.member }}</strong><small>{{ order.name }}・今天 {{ order.time }}</small></span><strong class="recent-earning">+ {{ order.earning }}</strong><span class="recent-check"><el-icon><Check /></el-icon></span></div></el-card>
        </template>

        <template v-else>
          <section class="list-page-heading"><div><div class="workspace-eyebrow">推廣中心數據</div><h1>{{ pageTitle }} <span><el-icon><StarFilled /></el-icon></span></h1><p>{{ sectionDescription }}</p></div><el-button v-if="activeSection === '我的團隊'" type="primary" @click="copyInvite"><el-icon><Link /></el-icon>邀請好友</el-button></section>
          <section v-if="activeSection === '我的團隊'" class="metric-grid list-metrics team-stat-grid"><el-card v-for="metric in teamMetrics" :key="metric.label" class="metric-card" shadow="never"><div class="metric-heading"><span>{{ metric.label }}</span><span class="metric-icon" :class="metric.tone"><el-icon><component :is="metric.icon" /></el-icon></span></div><strong>{{ metric.value }}</strong><div class="metric-change"><span>{{ metric.change }}</span></div></el-card></section>
          <section v-else class="metric-grid list-metrics"><el-card class="metric-card" shadow="never"><div class="metric-heading"><span>{{ summaryLabel }}</span><span class="metric-icon mint"><el-icon><DataAnalysis /></el-icon></span></div><strong>{{ summaryValue }}</strong><div class="metric-change"><span>即時更新</span></div></el-card><el-card class="metric-card" shadow="never"><div class="metric-heading"><span>本月新增</span><span class="metric-icon lavender"><el-icon><ArrowUp /></el-icon></span></div><strong>{{ secondaryValue }}</strong><div class="metric-change"><span>本月累計</span></div></el-card><el-card class="metric-card" shadow="never"><div class="metric-heading"><span>資料狀態</span><span class="metric-icon peach"><el-icon><CircleCheck /></el-icon></span></div><strong>同步正常</strong><div class="metric-change"><span>示意資料</span></div></el-card></section>
          <el-card class="table-card" shadow="never"><div class="table-toolbar"><div><h2>{{ pageTitle }}清單</h2><span class="row-count">顯示近期資料</span></div><div class="table-filters"><el-input class="table-search" placeholder="搜尋資料" :prefix-icon="User" /><el-date-picker type="daterange" range-separator="至" start-placeholder="開始日期" end-placeholder="結束日期" value-format="YYYY-MM-DD" /><el-button @click="ElMessage.info('日期篩選介面示意')"><el-icon><Refresh /></el-icon>篩選</el-button></div></div>
            <el-table v-if="activeSection === '我的團隊'" :data="teamRows" stripe><el-table-column label="團隊成員" min-width="150"><template #default="scope"><span class="member-cell"><span class="table-avatar">{{ scope.row.name.slice(0, 1) }}</span>{{ scope.row.name }}</span></template></el-table-column><el-table-column prop="phone" label="聯絡電話" min-width="150" /><el-table-column prop="joined" label="加入時間" min-width="180" /><el-table-column prop="orders" label="推廣訂單" min-width="120" /></el-table>
            <el-table v-else-if="activeSection === '推廣訂單'" :data="orderRows" stripe><el-table-column prop="id" label="訂單編號" min-width="170" /><el-table-column prop="name" label="充值方案" min-width="150" /><el-table-column prop="amount" label="支付金額" min-width="120" /><el-table-column prop="member" label="用戶暱稱" min-width="120" /><el-table-column prop="time" label="支付時間" min-width="120" /><el-table-column prop="earning" label="收益金額" min-width="120" /><el-table-column label="狀態" min-width="100"><template #default="scope"><el-tag :type="scope.row.status === '已結算' ? 'success' : 'warning'" effect="light">{{ scope.row.status }}</el-tag></template></el-table-column></el-table>
            <el-table v-else-if="activeSection === '提現記錄'" :data="withdrawalRows" stripe><el-table-column prop="id" label="提現單號" min-width="180" /><el-table-column prop="amount" label="提現金額" min-width="140" /><el-table-column prop="status" label="狀態" min-width="110"><template #default="scope"><el-tag :type="scope.row.status === '已打款' ? 'success' : scope.row.status === '已駁回' ? 'danger' : scope.row.status === '審核中' ? 'warning' : 'info'" effect="light">{{ scope.row.status }}</el-tag></template></el-table-column><el-table-column prop="time" label="提現時間" min-width="180" /><el-table-column label="操作" min-width="140" fixed="right"><template #default="scope"><el-button v-if="scope.row.status === '已駁回'" link type="primary" @click="showWithdrawalDetail(scope.row, 'reason')">查看駁回原因</el-button><el-button v-else-if="scope.row.status === '已打款'" link type="primary" @click="showWithdrawalDetail(scope.row, 'proof')">查看打款憑證</el-button><span v-else class="table-muted">—</span></template></el-table-column></el-table>
            <el-table v-else :data="earningRows" stripe><el-table-column prop="reason" label="變動原因" min-width="180" /><el-table-column prop="amount" label="變動金額" min-width="150" /><el-table-column prop="time" label="變動時間" min-width="180" /><el-table-column prop="status" label="狀態" min-width="110" /></el-table>
            <div class="table-bottom"><span>資料僅供介面展示</span><el-pagination size="small" background layout="prev, pager, next" :total="40" /></div>
          </el-card>
        </template>
        <p class="workspace-disclaimer"><el-icon><CircleCheck /></el-icon>目前顯示示意資料；登入與收益服務尚未連接後端。</p>
      </div>
    </main>

    <el-dialog v-model="payoutDialog" title="收益提現" width="min(520px, calc(100vw - 32px))" align-center>
      <div class="withdrawal-available"><span>目前可提現金額</span><strong>HK$ {{ availableBalanceText }}</strong></div>
      <p class="dialog-description">請填寫提現金額與收款資料；提交後將進入人工審核。</p>
      <el-form class="payout-form" label-position="top">
        <el-form-item label="提現金額"><el-input v-model="payoutForm.amount" inputmode="decimal" placeholder="最低提現 HK$ 100.00"><template #prepend>HK$</template><template #append><el-button @click="fillAllAvailable">全部提現</el-button></template></el-input></el-form-item>
        <el-form-item label="提現帳號"><el-input v-model="payoutForm.account" placeholder="請輸入銀行帳號" autocomplete="off" /></el-form-item>
        <el-form-item label="開戶銀行"><el-input v-model="payoutForm.bank" placeholder="請輸入開戶銀行名稱" autocomplete="organization" /></el-form-item>
        <el-form-item label="開戶人姓名"><el-input v-model="payoutForm.holder" placeholder="請輸入銀行帳戶持有人姓名" autocomplete="name" /></el-form-item>
      </el-form>
      <p class="payout-backfill-note">成功提交後，本次工作階段再次開啟時會自動回填帳戶資料。</p>
      <template #footer><el-button @click="payoutDialog = false">取消</el-button><el-button type="primary" @click="handlePayout">提交申請</el-button></template>
    </el-dialog>

    <el-dialog v-model="confirmPayoutDialog" title="確認提現申請？" width="min(440px, calc(100vw - 32px))" align-center>
      <p class="dialog-description">請確認以下提現資料；提交後會進入審核流程。</p>
      <dl class="withdrawal-confirm-list"><div><dt>提現金額</dt><dd>HK$ {{ Number(payoutForm.amount || 0).toLocaleString('en-HK', { minimumFractionDigits: 2 }) }}</dd></div><div><dt>提現帳號</dt><dd>{{ payoutForm.account }}</dd></div><div><dt>開戶銀行</dt><dd>{{ payoutForm.bank }}</dd></div><div><dt>開戶人姓名</dt><dd>{{ payoutForm.holder }}</dd></div></dl>
      <template #footer><el-button @click="confirmPayoutDialog = false">返回修改</el-button><el-button type="primary" @click="confirmPayout">確認提交</el-button></template>
    </el-dialog>

    <el-dialog v-model="withdrawalDetailDialog" :title="withdrawalDetailTitle" width="min(480px, calc(100vw - 32px))" align-center>
      <template v-if="selectedWithdrawal">
        <div v-if="withdrawalDetailMode === 'reason'" class="rejection-detail"><div class="rejection-icon"><el-icon><CircleCheck /></el-icon></div><div><strong>申請未通過</strong><p>{{ selectedWithdrawal.reason || '審核未通過，請聯絡平台管理員了解詳情。' }}</p></div></div>
        <div v-else class="proof-image-preview"><img src="/payment-proof-placeholder.png" alt="打款憑證 PNG 示意圖" /><span class="proof-demo-tag">PNG 佔位圖</span></div>
        <p v-if="withdrawalDetailMode === 'proof'" class="proof-caption">目前展示 PNG 佔位圖；正式憑證需由管理端上傳。</p>
      </template>
      <template #footer><el-button @click="withdrawalDetailDialog = false">關閉</el-button></template>
    </el-dialog>
  </div>
</template>

