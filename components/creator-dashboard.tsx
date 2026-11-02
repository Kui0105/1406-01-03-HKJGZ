'use client'

import Image from 'next/image'
import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Copy,
  CreditCard,
  ExternalLink,
  Gift,
  LayoutDashboard,
  Link2,
  Menu,
  ReceiptText,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  UsersRound,
  Wallet,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type View = 'overview' | 'team' | 'orders' | 'withdrawals' | 'earnings' | 'payout'
type ListView = Exclude<View, 'overview' | 'payout'>

const navigation: { id: View; label: string; icon: LucideIcon }[] = [
  { id: 'overview', label: '工作台總覽', icon: LayoutDashboard },
  { id: 'team', label: '我的團隊', icon: UsersRound },
  { id: 'orders', label: '推廣訂單', icon: ShoppingBag },
  { id: 'withdrawals', label: '提現記錄', icon: Wallet },
  { id: 'earnings', label: '收益明細', icon: ReceiptText },
]

const teamRows = [
  ['林小葵', 'HK 9128  ····', '2026/11/02 14:22'],
  ['陳可可', 'HK 6381  ····', '2026/11/02 11:08'],
  ['阿橙同學', 'HK 2057  ····', '2026/11/01 19:46'],
  ['Momo醬', 'HK 7762  ····', '2026/11/01 16:30'],
  ['小島日記', 'HK 3894  ····', '2026/10/31 21:14'],
  ['月亮汽水', 'HK 5108  ····', '2026/10/31 10:02'],
  ['花花', 'HK 9673  ····', '2026/10/30 18:53'],
  ['夏日氣泡', 'HK 4380  ····', '2026/10/30 12:20'],
  ['糯米糰子', 'HK 1096  ····', '2026/10/29 20:17'],
  ['可樂不加冰', 'HK 7254  ····', '2026/10/29 09:41'],
]

const orderRows = [
  ['HK202611020081', '月光會員季卡', 'HK$ 128.00', '林小葵', '11/02 14:22', 'HK$ 12.80'],
  ['HK202611020074', '星塵會員年卡', 'HK$ 688.00', '陳可可', '11/02 11:08', 'HK$ 68.80'],
  ['HK202611010316', '月光會員月卡', 'HK$ 48.00', '阿橙同學', '11/01 19:46', 'HK$ 4.80'],
  ['HK202611010289', '星塵會員季卡', 'HK$ 198.00', 'Momo醬', '11/01 16:30', 'HK$ 19.80'],
  ['HK202610310208', '月光會員年卡', 'HK$ 388.00', '小島日記', '10/31 21:14', 'HK$ 38.80'],
  ['HK202610310127', '月光會員月卡', 'HK$ 48.00', '月亮汽水', '10/31 10:02', 'HK$ 4.80'],
  ['HK202610300095', '星塵會員季卡', 'HK$ 198.00', '花花', '10/30 18:53', 'HK$ 19.80'],
  ['HK202610300061', '月光會員月卡', 'HK$ 48.00', '夏日氣泡', '10/30 12:20', 'HK$ 4.80'],
  ['HK202610290188', '星塵會員年卡', 'HK$ 688.00', '糯米糰子', '10/29 20:17', 'HK$ 68.80'],
  ['HK202610290036', '月光會員季卡', 'HK$ 128.00', '可樂不加冰', '10/29 09:41', 'HK$ 12.80'],
]

const withdrawalRows = [
  ['WD202611010036', 'HK$ 5,000.00', '已打款', '2026/11/01 16:20'],
  ['WD202610280024', 'HK$ 3,200.00', '審核中', '2026/10/28 10:45'],
  ['WD202610210019', 'HK$ 8,000.00', '已通過', '2026/10/21 15:12'],
  ['WD202610150011', 'HK$ 1,500.00', '已駁回', '2026/10/15 09:38'],
  ['WD202610080007', 'HK$ 2,800.00', '已打款', '2026/10/08 17:05'],
  ['WD202609290042', 'HK$ 4,600.00', '已打款', '2026/09/29 13:44'],
  ['WD202609180031', 'HK$ 3,000.00', '已通過', '2026/09/18 11:20'],
  ['WD202609080016', 'HK$ 2,000.00', '已打款', '2026/09/08 16:00'],
  ['WD202608260013', 'HK$ 1,200.00', '已駁回', '2026/08/26 10:31'],
  ['WD202608120009', 'HK$ 6,000.00', '已打款', '2026/08/12 14:18'],
]

const earningRows = [
  ['推廣消費增加收益', '+ HK$ 68.80', '2026/11/02 11:08'],
  ['推廣消費增加收益', '+ HK$ 12.80', '2026/11/02 14:22'],
  ['推廣消費增加收益', '+ HK$ 19.80', '2026/11/01 16:30'],
  ['提現扣減收益', '− HK$ 5,000.00', '2026/11/01 16:20'],
  ['推廣消費增加收益', '+ HK$ 4.80', '2026/11/01 19:46'],
  ['提現失敗返還收益', '+ HK$ 1,500.00', '2026/10/17 12:08'],
  ['推廣消費增加收益', '+ HK$ 38.80', '2026/10/31 21:14'],
  ['推廣消費增加收益', '+ HK$ 4.80', '2026/10/31 10:02'],
  ['提現扣減收益', '− HK$ 2,800.00', '2026/10/08 17:05'],
  ['推廣消費增加收益', '+ HK$ 19.80', '2026/10/30 18:53'],
]

const listConfig: Record<ListView, { title: string; eyebrow: string; columns: string[]; rows: string[][]; stats: [string, string][] }> = {
  team: {
    title: '我的團隊',
    eyebrow: '團隊成員',
    columns: ['用戶', '聯絡電話', '加入時間'],
    rows: teamRows,
    stats: [['推廣總數', '1,286'], ['今日推廣', '26'], ['本月推廣', '342']],
  },
  orders: {
    title: '推廣訂單',
    eyebrow: '推廣訂單',
    columns: ['訂單編號', '充值方案', '支付金額', '用戶暱稱', '支付時間', '收益金額'],
    rows: orderRows,
    stats: [['累計訂單', '3,840'], ['本月訂單', '216'], ['本月收益', 'HK$ 8,460']],
  },
  withdrawals: {
    title: '提現記錄',
    eyebrow: '提現記錄',
    columns: ['提現單號', '提現金額', '狀態', '提現時間'],
    rows: withdrawalRows,
    stats: [['累計提現', 'HK$ 32,600'], ['審核中', '1 筆'], ['已打款', '12 筆']],
  },
  earnings: {
    title: '收益明細',
    eyebrow: '收益明細',
    columns: ['變動原因', '變動金額', '變動時間'],
    rows: earningRows,
    stats: [['本月收入', 'HK$ 8,460'], ['本月提現', 'HK$ 5,000'], ['收益筆數', '148']],
  },
}

const money = (value: string) => Number(value.replace(/[^0-9.]/g, ''))

export function CreatorDashboard() {
  const [activeView, setActiveView] = useState<View>('overview')
  const [toast, setToast] = useState('')
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [amount, setAmount] = useState('')
  const [account, setAccount] = useState({ bank: '滙豐銀行', holder: '林可欣', number: '008-298  281-112' })

  const showToast = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2600)
  }

  const navigate = (view: View) => {
    setActiveView(view)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const copyInvite = async () => {
    try {
      await navigator.clipboard.writeText('https://hachi.hk/invite/KIKI2026')
      showToast('推廣連結已複製')
    } catch {
      showToast('推廣連結：hachi.hk/invite/KIKI2026')
    }
  }

  const submitPayout = () => {
    if (!amount || money(amount) < 100 || money(amount) > 82460.8) {
      showToast('提現金額需介於 HK$ 100 至 HK$ 82,460.80')
      return
    }
    setConfirmOpen(true)
  }

  const confirmPayout = () => {
    setConfirmOpen(false)
    showToast('提現申請已提交，請留意審核進度')
    setActiveView('withdrawals')
    setAmount('')
  }

  const activeTitle = activeView === 'overview' ? '工作台總覽' : activeView === 'payout' ? '收益提現' : listConfig[activeView].title

  return (
    <div className="creator-shell min-h-screen">
      <aside className="creator-sidebar">
        <button className="brand-lockup" onClick={() => navigate('overview')} aria-label="返回工作台總覽">
          <span className="brand-mark"><Sparkles size={19} strokeWidth={2.5} /></span>
          <span className="brand-type"><strong>HACHI</strong><small>創作者俱樂部</small></span>
        </button>
        <div className="sidebar-caption">創作者中心</div>
        <nav className="sidebar-nav" aria-label="主要導覽">
          {navigation.map(({ id, label, icon: Icon }) => (
            <button key={id} className={`nav-item ${activeView === id ? 'is-active' : ''}`} onClick={() => navigate(id)}>
              <Icon size={18} strokeWidth={2.1} /><span>{label}</span>
              {id === 'team' && <span className="nav-count">26</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-note"><span className="note-sticker"><Gift size={17} /></span><div><strong>邀請好友一起賺</strong><small>分享連結，解鎖更多獎勵</small></div><ArrowRight size={15} /></div>
          <button className="sidebar-help" onClick={() => showToast('客服小隊稍後為你服務')}><span className="help-dot" />需要幫助？聯絡客服</button>
          <div className="sidebar-user"><Image src="/creator-avatar.png" loading="eager" alt="Kiki 的動漫風頭像" width={40} height={40} /><div><strong>Kiki 林可欣</strong><small>認證創作者 <ShieldCheck size={12} /></small></div><ChevronDown size={15} /></div>
        </div>
      </aside>

      <main className="creator-main">
        <header className="topbar">
          <div className="topbar-left"><button className="mobile-menu" onClick={() => showToast('請使用下方導覽切換頁面')} aria-label="開啟導覽"><Menu size={20} /></button><span className="breadcrumb">創作者中心</span><span className="crumb-slash">/</span><strong>{activeTitle}</strong></div>
          <div className="topbar-right"><span className="today-pill"><CalendarDays size={14} /> 2026 年 11 月 2 日</span><button className="icon-button notification-button" aria-label="通知" onClick={() => showToast('目前沒有新通知')}><Bell size={18} /><i /></button><span className="topbar-divider" /><Image className="topbar-avatar" src="/creator-avatar.png" alt="Kiki 林可欣" width={36} height={36} /></div>
        </header>

        <div className="page-content">
          {activeView === 'overview' && <Overview onNavigate={navigate} onCopy={copyInvite} onToast={showToast} />}
          {activeView === 'payout' && <PayoutPage amount={amount} setAmount={setAmount} account={account} setAccount={setAccount} onSubmit={submitPayout} onBack={() => navigate('overview')} onHistory={() => navigate('withdrawals')} />}
          {activeView !== 'overview' && activeView !== 'payout' && <ListPage view={activeView} onToast={showToast} />}
        </div>
      </main>

      {toast && <div className="toast-message" role="status"><span><Check size={16} /></span>{toast}</div>}
      {confirmOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setConfirmOpen(false) }}><section className="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="confirm-title"><button className="modal-close" onClick={() => setConfirmOpen(false)} aria-label="關閉"><X size={18} /></button><div className="modal-illustration"><CircleDollarSign size={31} /></div><div className="modal-kicker">ONE MORE STEP</div><h2 id="confirm-title">確認提現申請？</h2><p>請確認以下金額與收款帳戶，提交後將進入人工審核。</p><div className="confirm-summary"><span>提現金額</span><strong>HK$ {Number(amount || 0).toLocaleString('en-HK', { minimumFractionDigits: 2 })}</strong><span>收款帳戶</span><strong>{account.bank} ···· {account.number.slice(-4)}</strong></div><div className="modal-actions"><button className="button-secondary" onClick={() => setConfirmOpen(false)}>再檢查一下</button><button className="button-lime" onClick={confirmPayout}>確認提交 <ArrowRight size={16} /></button></div></section></div>}
    </div>
  )
}

function Overview({ onNavigate, onCopy, onToast }: { onNavigate: (view: View) => void; onCopy: () => void; onToast: (message: string) => void }) {
  return (
    <>
      <section className="welcome-row"><div><div className="eyebrow"><span className="eyebrow-star">✳</span> 星期一・2026 年 11 月 2 日</div><h1>早安，Kiki <Sparkles className="wave-mark" size={18} /></h1><p>今天也來看看你的創作者能量值吧！</p></div><div className="season-stamp"><span>本月目標</span><strong>68<span>%</span></strong><small>再推廣 58 位夥伴達成！</small><div className="goal-track"><i /></div><span className="stamp-sun">✳</span></div></section>
      <section className="balance-card">
        <div className="balance-copy"><div className="balance-label"><Sparkles className="mini-spark" size={13} /> 可提現收益 <span className="live-dot" /> 即時更新</div><div className="balance-amount"><span>HK$</span> 82,460<span className="balance-decimal">.80</span></div><div className="balance-caption">累計為社群創造的價值，正在發光 ✨</div><button className="button-dark" onClick={() => onNavigate('payout')}>提現收益 <ArrowUpRight size={16} /></button></div>
        <div className="balance-art" aria-hidden="true"><div className="sunburst">✳</div><div className="coin coin-one">$</div><div className="coin coin-two">✦</div><div className="coin coin-three">$</div><div className="art-ribbon">KIKI<br />加油中</div><div className="art-character"><Image src="/creator-avatar.png" loading="eager" alt="" width={180} height={180} /></div><span className="art-caption">升級中！</span></div>
        <span className="balance-scribble" aria-hidden="true">耶！</span>
      </section>
      <section className="metrics-grid" aria-label="收益統計">
        <MetricCard label="今日收益" value="HK$ 286.40" change="+18.6%" icon={ArrowUpRight} tone="lemon" detail="較昨日" />
        <MetricCard label="累計收益" value="HK$ 96,820" change="+12.4%" icon={CircleDollarSign} tone="lilac" detail="較上月" />
        <MetricCard label="已結算收益" value="HK$ 14,360" change="本月" icon={Check} tone="peach" detail="已完成結算" />
        <button className="metric-card team-metric" onClick={() => onNavigate('team')}><span className="metric-top"><span>我的團隊</span><span className="metric-icon mint"><UsersRound size={17} /></span></span><strong>1,286<span className="metric-unit">人</span></strong><span className="metric-foot"><span className="positive-text">+26 位新夥伴</span><ArrowRight size={14} /></span><span className="metric-doodle">✷</span></button>
      </section>
      <section className="overview-bottom">
        <div className="panel earnings-panel"><div className="panel-heading"><div><div className="eyebrow">成長紀錄</div><h2>收益趨勢 <span className="heading-spark">↗</span></h2></div><button className="select-pill" onClick={() => onToast('已顯示近 7 日收益')}>近 7 日 <ChevronDown size={14} /></button></div><div className="chart-summary"><strong>HK$ 8,460.20</strong><span className="chart-trend"><ArrowUpRight size={14} /> 12.8%</span><small>較上週</small></div><div className="chart-area"><div className="chart-y"><span>3,000</span><span>2,000</span><span>1,000</span><span>0</span></div><div className="chart-plot"><div className="chart-gridline line-a" /><div className="chart-gridline line-b" /><div className="chart-gridline line-c" /><svg viewBox="0 0 620 170" preserveAspectRatio="none" role="img" aria-label="近七日收益逐漸上升的趨勢圖"><defs><linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#d9f15a" stopOpacity="0.55" /><stop offset="100%" stopColor="#d9f15a" stopOpacity="0.02" /></linearGradient></defs><path d="M0 142 C32 134 42 138 70 119 S110 133 145 102 S180 118 215 83 S255 103 290 77 S333 98 360 62 S405 76 438 53 S478 65 510 35 S552 57 580 22 S603 31 620 12 L620 170 L0 170 Z" fill="url(#chart-fill)" /><path d="M0 142 C32 134 42 138 70 119 S110 133 145 102 S180 118 215 83 S255 103 290 77 S333 98 360 62 S405 76 438 53 S478 65 510 35 S552 57 580 22 S603 31 620 12" fill="none" stroke="#232323" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" /><circle cx="580" cy="22" r="5" fill="#d9f15a" stroke="#202020" strokeWidth="2" vectorEffect="non-scaling-stroke" /></svg><div className="chart-x"><span>10/27</span><span>10/28</span><span>10/29</span><span>10/30</span><span>10/31</span><span>11/01</span><span>11/02</span></div></div></div><div className="chart-note"><span className="chart-note-dot" />收益跟著你的熱情一起成長！<span className="chart-note-face">☺</span></div></div>
        <div className="panel quick-panel"><div className="panel-heading"><div><div className="eyebrow">快速入口</div><h2>快速入口</h2></div><span className="quick-spark">✳</span></div><div className="quick-links"><QuickLink icon={ShoppingBag} title="推廣訂單" subtitle="查看成功訂單" onClick={() => onNavigate('orders')} tone="rose" /><QuickLink icon={Wallet} title="提現記錄" subtitle="追蹤審核進度" onClick={() => onNavigate('withdrawals')} tone="lime" /><QuickLink icon={ReceiptText} title="收益明細" subtitle="每一筆都清楚" onClick={() => onNavigate('earnings')} tone="blue" /></div><button className="invite-banner" onClick={onCopy}><span className="invite-icon"><Link2 size={18} /></span><span><strong>邀請連結</strong><small>分享你的專屬推廣碼</small></span><span className="copy-chip"><Copy size={14} />複製</span></button></div>
      </section>
      <section className="recent-panel panel"><div className="panel-heading"><div><div className="eyebrow">最新動態</div><h2>最新推廣訂單</h2></div><button className="text-action" onClick={() => onNavigate('orders')}>查看全部 <ArrowRight size={15} /></button></div><div className="recent-list"><RecentOrder initials="葵" name="林小葵" plan="月光會員季卡" time="今天 14:22" amount="HK$ 12.80" color="rose" /><RecentOrder initials="可" name="陳可可" plan="星塵會員年卡" time="今天 11:08" amount="HK$ 68.80" color="blue" /><RecentOrder initials="橙" name="阿橙同學" plan="月光會員月卡" time="昨天 19:46" amount="HK$ 4.80" color="mint" /></div></section>
    </>
  )
}

function MetricCard({ label, value, change, icon: Icon, tone, detail }: { label: string; value: string; change: string; icon: LucideIcon; tone: string; detail: string }) {
  return <div className="metric-card"><span className="metric-top"><span>{label}</span><span className={`metric-icon ${tone}`}><Icon size={17} /></span></span><strong>{value}</strong><span className="metric-foot"><span className="positive-text">{change}</span><span>{detail}</span></span><span className="metric-doodle">✷</span></div>
}

function QuickLink({ icon: Icon, title, subtitle, onClick, tone }: { icon: LucideIcon; title: string; subtitle: string; onClick: () => void; tone: string }) {
  return <button className="quick-link" onClick={onClick}><span className={`quick-icon ${tone}`}><Icon size={18} /></span><span className="quick-copy"><strong>{title}</strong><small>{subtitle}</small></span><ArrowRight size={15} className="quick-arrow" /></button>
}

function RecentOrder({ initials, name, plan, time, amount, color }: { initials: string; name: string; plan: string; time: string; amount: string; color: string }) {
  return <div className="recent-order"><span className={`recent-avatar ${color}`}>{initials}</span><span className="recent-person"><strong>{name}</strong><small>{plan} · {time}</small></span><span className="recent-amount">+ {amount}</span><span className="order-check"><Check size={12} /></span></div>
}

function ListPage({ view, onToast }: { view: ListView; onToast: (message: string) => void }) {
  const config = listConfig[view]
  const [page, setPage] = useState(1)
  const [filterActive, setFilterActive] = useState(false)
  return <section className="subpage"><div className="subpage-heading"><div><div className="eyebrow">{config.eyebrow}</div><h1>{config.title}<span className="heading-spark">✳</span></h1><p>{view === 'team' ? '看看你的社群正在如何一起發光。' : view === 'orders' ? '每一筆成功推廣，都在累積你的影響力。' : view === 'withdrawals' ? '提現申請狀態與打款進度，一目瞭然。' : '完整記錄每一筆收益變化。'}</p></div>{view === 'team' && <button className="button-dark invite-action" onClick={() => onToast('邀請連結已複製')}><Link2 size={16} /> 邀請好友 <ArrowUpRight size={15} /></button>}</div>
    <div className="list-stats">{config.stats.map(([label, value], index) => <div className="list-stat" key={label}><span className={`stat-mark stat-mark-${index}`}>{index === 0 ? <Sparkles size={17} /> : index === 1 ? <ArrowUpRight size={17} /> : <CircleDollarSign size={17} />}</span><span><small>{label}</small><strong>{value}</strong></span></div>)}</div>
    <div className="panel data-panel"><div className="data-toolbar"><div className="data-title"><h2>{view === 'team' ? '團隊成員' : view === 'orders' ? '訂單清單' : view === 'withdrawals' ? '提現申請' : '收益流水'}</h2><span className="count-badge">{view === 'team' ? '1,286' : view === 'orders' ? '3,840' : view === 'withdrawals' ? '36' : '148'} 筆</span></div><div className="filter-actions"><label className="search-box"><Search size={15} /><input aria-label="搜尋" placeholder={view === 'team' ? '搜尋暱稱或電話' : '搜尋單號'} /></label><div className="date-filter"><CalendarDays size={14} /><input type="date" aria-label="開始日期" defaultValue="2026-10-27" /><span>至</span><input type="date" aria-label="結束日期" defaultValue="2026-11-02" /></div><button className={`filter-button ${filterActive ? 'filter-on' : ''}`} onClick={() => { setFilterActive(!filterActive); onToast(filterActive ? '已清除篩選' : '已套用日期篩選') }}>篩選 <ChevronDown size={14} /></button></div></div>
      <div className="table-wrap"><table className={`data-table ${view === 'orders' ? 'wide-table' : ''}`}><thead><tr>{config.columns.map((column) => <th key={column}>{column}</th>)}{view === 'withdrawals' && <th>其他</th>}</tr></thead><tbody>{config.rows.slice(0, 10).map((row, rowIndex) => <tr key={`${row[0]}-${rowIndex}`}>{row.map((cell, cellIndex) => <td key={cellIndex}>{view === 'team' && cellIndex === 0 ? <span className="table-user"><span className={`table-avatar table-avatar-${rowIndex % 4}`}>{cell.charAt(0)}</span>{cell}</span> : view === 'withdrawals' && cellIndex === 2 ? <StatusBadge status={cell} /> : view === 'orders' && cellIndex === 5 ? <strong className="earning-cell">{cell}</strong> : view === 'earnings' && cellIndex === 1 ? <strong className={cell.startsWith('−') ? 'negative-cell' : 'earning-cell'}>{cell}</strong> : cell}</td>)}{view === 'withdrawals' && <td>{row[2] === '已打款' ? <button className="proof-button" onClick={() => onToast('打款憑證已開啟')}><ExternalLink size={13} /> 憑證</button> : row[2] === '已駁回' ? <button className="reason-button" onClick={() => onToast('駁回原因：收款帳戶資訊不完整')}>查看原因</button> : <span className="table-muted">—</span>}</td>}</tr>)}</tbody></table></div>
      <div className="table-footer"><span>顯示第 <strong>{page === 1 ? '1–10' : '11–20'}</strong> 筆，共 <strong>{view === 'team' ? '1,286' : view === 'orders' ? '3,840' : view === 'withdrawals' ? '36' : '148'}</strong> 筆資料</span><div className="pagination"><button aria-label="上一頁" disabled={page === 1} onClick={() => setPage(Math.max(1, page - 1))}><ChevronLeft size={15} /></button><button className="page-active">{page}</button><button onClick={() => setPage(page + 1)}>2</button><button onClick={() => setPage(page + 1)}>3</button><span>…</span><button onClick={() => setPage(page + 1)}>→</button><button aria-label="下一頁" onClick={() => setPage(page + 1)}><ChevronRight size={15} /></button></div></div>
    </div><div className="list-footnote"><span className="footnote-mark">✦</span>{view === 'team' ? '團隊成員為透過你的專屬邀請連結註冊的用戶。' : view === 'orders' ? '用戶充值成功後，推廣收益將自動計入你的收益餘額。' : view === 'withdrawals' ? '提現申請經審核通過後，將於 3–5 個工作日內完成打款。' : '收益明細依照發生時間排序，資料即時更新。'}</div></section>
}

function StatusBadge({ status }: { status: string }) {
  const statusClass = status === '已打款' ? 'status-paid' : status === '已通過' ? 'status-approved' : status === '已駁回' ? 'status-rejected' : 'status-pending'
  return <span className={`status-badge ${statusClass}`}><i />{status}</span>
}

function PayoutPage({ amount, setAmount, account, setAccount, onSubmit, onBack, onHistory }: { amount: string; setAmount: (value: string) => void; account: { bank: string; holder: string; number: string }; setAccount: (value: { bank: string; holder: string; number: string }) => void; onSubmit: () => void; onBack: () => void; onHistory: () => void }) {
  return <section className="subpage payout-page"><button className="back-link" onClick={onBack}><ArrowLeft size={15} /> 返回工作台</button><div className="subpage-heading payout-heading"><div><div className="eyebrow">提現你的創作收益</div><h1>收益提現 <span className="heading-spark">✳</span></h1><p>收益已準備就緒，選擇金額並確認收款帳戶吧。</p></div><div className="payout-available"><span>目前可提現金額</span><strong>HK$ 82,460<span>.80</span></strong><small><Clock3 size={13} /> 審核通過後約 3–5 個工作日到帳</small></div></div><div className="payout-layout"><form className="panel payout-form" onSubmit={(event) => { event.preventDefault(); onSubmit() }}><div className="form-section-title"><span>01</span><div><h2>提現金額</h2><small>最低提現金額 HK$ 100.00</small></div></div><label className="field-label" htmlFor="payout-amount">提現金額</label><div className="amount-input-wrap"><span>HK$</span><input id="payout-amount" inputMode="decimal" placeholder="請輸入提現金額" value={amount} onChange={(event) => setAmount(event.target.value.replace(/[^0-9.]/g, ''))} /><button type="button" onClick={() => setAmount('82460.80')}>全部提現</button></div><div className="field-hint">可提現 HK$ 82,460.80 <span>｜</span> 預計到帳金額將扣除相關手續費</div><div className="form-divider" /><div className="form-section-title"><span>02</span><div><h2>收款帳戶</h2><small>帳戶資料已為你自動回填，可隨時更新</small></div><span className="saved-tag"><Check size={12} /> 已儲存</span></div><label className="field-label" htmlFor="bank-name">開戶銀行</label><div className="field-with-icon"><CreditCard size={17} /><select id="bank-name" value={account.bank} onChange={(event) => setAccount({ ...account, bank: event.target.value })}><option>滙豐銀行</option><option>中國銀行（香港）</option><option>恒生銀行</option><option>渣打銀行</option><option>星展銀行</option></select><ChevronDown size={15} /></div><label className="field-label" htmlFor="account-number">提現帳號</label><input className="text-field" id="account-number" value={account.number} onChange={(event) => setAccount({ ...account, number: event.target.value })} required /><label className="field-label" htmlFor="account-holder">開戶人姓名</label><input className="text-field" id="account-holder" value={account.holder} onChange={(event) => setAccount({ ...account, holder: event.target.value })} required /><div className="secure-note"><ShieldCheck size={16} /><span>你的帳戶資料已加密保存，僅用於收益結算與打款。</span></div><button className="button-lime payout-submit" type="submit">提交提現申請 <ArrowRight size={17} /></button><p className="terms-note">提交即表示你已閱讀並同意 <button type="button">提現服務說明</button></p></form><aside className="payout-aside"><div className="payout-doodle-card"><div className="doodle-star">✳</div><div className="doodle-coin">$</div><span className="aside-sticker">GOOD<br />THINGS<br />AHEAD</span><h3>辛苦創造的<br />每一份價值，<br /><em>都值得期待。</em></h3><span className="aside-smile">☺</span></div><div className="payout-tips"><h3><Sparkles size={16} /> 提現小提醒</h3><ul><li>每次提現最低金額為 HK$ 100。</li><li>申請提交後將進入管理端審核。</li><li>審核通過後，將於 3–5 個工作日內完成打款。</li><li>若申請被駁回，收益會自動退回餘額。</li></ul></div><button className="history-link" onClick={onHistory}>查看提現記錄 <ArrowRight size={15} /></button></aside></div></section>
}
