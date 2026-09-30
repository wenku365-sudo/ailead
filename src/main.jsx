import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowRight,
  BarChart3,
  Bell,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  Command,
  Database,
  Download,
  ExternalLink,
  Filter,
  Flame,
  Home,
  LayoutDashboard,
  Lightbulb,
  ListFilter,
  MessageCircleMore,
  MoreHorizontal,
  Play,
  Plus,
  Search,
  Settings2,
  Sparkles,
  Target,
  UserRound,
  Users,
  X,
  Zap,
} from 'lucide-react'
import './styles.css'

const initialKeywords = [
  { id: 1, text: '少儿编程', platform: '抖音', count: '1,248', status: '运行中' },
  { id: 2, text: '成人英语', platform: '小红书', count: '863', status: '运行中' },
  { id: 3, text: '私教减脂', platform: '抖音', count: '527', status: '已暂停' },
  { id: 4, text: 'AI陪练', platform: '小红书', count: '416', status: '运行中' },
  { id: 5, text: '考研辅导', platform: '抖音', count: '309', status: '运行中' },
  { id: 6, text: '家庭收纳', platform: '小红书', count: '275', status: '运行中' },
  { id: 7, text: '职场写作', platform: '抖音', count: '184', status: '已暂停' },
]

const comments = [
  {
    id: 1,
    name: 'Mia',
    avatar: 'M',
    platform: '小红书',
    tone: 'pink',
    text: '坐标上海，想给孩子找线下的少儿编程课，四年级，现在报名还有优惠吗？',
    time: '8分钟前',
    intent: '高意向',
    score: 96,
    tags: ['明确咨询', '地域明确', '近期需求'],
    source: '少儿编程启蒙怎么选？这 3 个坑家长一定要避开',
    likes: 235,
  },
  {
    id: 2,
    name: 'Leo',
    avatar: 'L',
    platform: '抖音',
    tone: 'blue',
    text: '有没有适合零基础上班族的英语课？最好是晚上的，想系统学一下。',
    time: '23分钟前',
    intent: '高意向',
    score: 92,
    tags: ['明确咨询', '场景明确'],
    source: '上班族学英语，不报班也能坚持的 4 个方法',
    likes: 119,
  },
  {
    id: 3,
    name: '小太阳',
    avatar: '小',
    platform: '小红书',
    tone: 'orange',
    text: '这个训练营怎么收费呀？我目前 130 斤，想在夏天前瘦下来。',
    time: '1小时前',
    intent: '中意向',
    score: 84,
    tags: ['价格关注', '目标明确'],
    source: '普通人减脂 30 天打卡计划｜不用饿肚子',
    likes: 88,
  },
  {
    id: 4,
    name: 'Eason',
    avatar: 'E',
    platform: '抖音',
    tone: 'green',
    text: '想了解一下课程具体怎么上，深圳有校区吗？',
    time: '2小时前',
    intent: '中意向',
    score: 78,
    tags: ['地域明确', '了解产品'],
    source: '孩子不爱写作业？试试编程思维训练',
    likes: 54,
  },
  {
    id: 5,
    name: 'Nana',
    avatar: 'N',
    platform: '小红书',
    tone: 'purple',
    text: '蹲一个详细介绍，想先看看适不适合自己。',
    time: '3小时前',
    intent: '待确认',
    score: 63,
    tags: ['泛咨询'],
    source: '零基础英语学习路线分享',
    likes: 31,
  },
  {
    id: 6,
    name: '小鹿',
    avatar: '鹿',
    platform: '抖音',
    tone: 'blue',
    text: '北京有没有周末上课的考研辅导？我准备明年考，现在开始来得及吗？',
    time: '4小时前',
    intent: '高意向',
    score: 90,
    tags: ['地域明确', '时间明确', '近期需求'],
    source: '考研小白全年复习时间表，按这个节奏稳步上岸',
    likes: 72,
  },
  {
    id: 7,
    name: '阿柠',
    avatar: '柠',
    platform: '小红书',
    tone: 'green',
    text: '想问问你们的 AI 口语陪练怎么收费，孩子初一可以用吗？',
    time: '5小时前',
    intent: '高意向',
    score: 88,
    tags: ['价格关注', '人群明确'],
    source: '孩子不敢开口说英语？试试这套 AI 口语练习法',
    likes: 64,
  },
  {
    id: 8,
    name: '安安',
    avatar: '安',
    platform: '小红书',
    tone: 'orange',
    text: '有杭州本地的收纳师推荐吗？新家 90 平，月底前想整理好。',
    time: '6小时前',
    intent: '中意向',
    score: 81,
    tags: ['地域明确', '时间明确'],
    source: '小户型收纳动线规划，入住前一定要做这 5 件事',
    likes: 46,
  },
  {
    id: 9,
    name: 'Frank',
    avatar: 'F',
    platform: '抖音',
    tone: 'purple',
    text: '课程可以试听吗？我主要想提升工作中的汇报和邮件表达。',
    time: '昨天',
    intent: '中意向',
    score: 76,
    tags: ['明确咨询', '场景明确'],
    source: '职场表达不清晰？3 个结构让你的汇报更有说服力',
    likes: 39,
  },
  {
    id: 10,
    name: '小满',
    avatar: '满',
    platform: '抖音',
    tone: 'pink',
    text: '这个方法看起来不错，先收藏，之后有需要再来问。',
    time: '昨天',
    intent: '待确认',
    score: 58,
    tags: ['泛咨询'],
    source: '普通人减脂饮食搭配，一日三餐这样吃',
    likes: 22,
  },
]

const navItems = [
  { id: 'intro', label: '首页', icon: Home },
  { id: 'ask', label: 'AI交代任务', icon: Sparkles },
  { id: 'home', label: '工作台', icon: LayoutDashboard },
  { id: 'collect', label: '采集数据', icon: Database },
  { id: 'comments', label: '意向评论', icon: MessageCircleMore, badge: 24 },
]

function App() {
  const [activePage, setActivePage] = useState('intro')
  const [keywords, setKeywords] = useState(initialKeywords)
  const [selectedComment, setSelectedComment] = useState(null)
  const [showAddKeyword, setShowAddKeyword] = useState(false)
  const [running, setRunning] = useState(false)
  const [toast, setToast] = useState('')
  const [collectModalOpen, setCollectModalOpen] = useState(false)
  const [collectProgress, setCollectProgress] = useState(0)
  const [collectPhase, setCollectPhase] = useState(0)
  const [collectStats, setCollectStats] = useState({ works: 0, comments: 0, intents: 0 })
  const [collectDone, setCollectDone] = useState(false)

  const notify = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2600)
  }

  const runCollect = () => {
    if (running) {
      setCollectModalOpen(true)
      return
    }

    setRunning(true)
    setActivePage('collect')
    setCollectModalOpen(true)
    setCollectProgress(4)
    setCollectPhase(0)
    setCollectDone(false)
    setCollectStats({ works: 18, comments: 126, intents: 0 })

    let progress = 4
    const timer = window.setInterval(() => {
      progress = Math.min(progress + Math.ceil(Math.random() * 7) + 3, 100)
      setCollectProgress(progress)
      setCollectPhase(progress >= 76 ? 2 : progress >= 35 ? 1 : 0)
      setCollectStats({
        works: Math.max(18, Math.round(18 + progress * 4.8)),
        comments: Math.max(126, Math.round(126 + progress * 28.4)),
        intents: Math.max(0, Math.round(Math.max(progress - 36, 0) * 0.62)),
      })

      if (progress >= 100) {
        window.clearInterval(timer)
        setRunning(false)
        setCollectDone(true)
        setCollectPhase(3)
        notify('采集完成，已新增 28 条意向评论')
      }
    }, 420)
  }

  const addKeyword = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const text = form.get('keyword')?.toString().trim()
    const platform = form.get('platform')?.toString() || '抖音'
    if (!text) return
    setKeywords((current) => [
      ...current,
      { id: Date.now(), text, platform, count: '0', status: '运行中' },
    ])
    setShowAddKeyword(false)
    notify(`已添加「${text}」采集任务`)
  }

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="main-shell">
        <Header activePage={activePage} />
        <main className="content">
          {activePage === 'intro' && (
            <IntroPage
              setActivePage={setActivePage}
              runCollect={runCollect}
            />
          )}
          {activePage === 'ask' && (
            <AskTaskPage
              setActivePage={setActivePage}
              setKeywords={setKeywords}
              notify={notify}
              runCollect={runCollect}
            />
          )}
          {activePage === 'home' && (
            <HomePage
              keywords={keywords}
              runCollect={runCollect}
              setActivePage={setActivePage}
              setShowAddKeyword={setShowAddKeyword}
              notify={notify}
            />
          )}
          {activePage === 'collect' && (
            <CollectPage
              keywords={keywords}
              running={running}
              runCollect={runCollect}
              setShowAddKeyword={setShowAddKeyword}
              notify={notify}
            />
          )}
          {activePage === 'comments' && (
            <CommentsPage
              comments={comments}
              setSelectedComment={setSelectedComment}
              notify={notify}
            />
          )}
        </main>
      </div>
      {showAddKeyword && (
        <AddKeywordModal close={() => setShowAddKeyword(false)} submit={addKeyword} />
      )}
      {collectModalOpen && (
        <CollectProgressModal
          progress={collectProgress}
          phase={collectPhase}
          stats={collectStats}
          done={collectDone}
          close={() => setCollectModalOpen(false)}
        />
      )}
      {selectedComment && (
        <CommentDrawer
          comment={selectedComment}
          close={() => setSelectedComment(null)}
          notify={notify}
        />
      )}
      {toast && (
        <div className="toast">
          <Check size={17} />
          <span>{toast}</span>
        </div>
      )}
    </div>
  )
}

function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="sidebar">
      <div className="brand-lockup">
        <div className="brand-mark"><Sparkles size={19} strokeWidth={2.3} /></div>
        <div>
          <strong>线索雷达</strong>
          <span>AI LEAD RADAR</span>
        </div>
      </div>
      <div className="workspace-switcher">
        <div className="workspace-avatar">星</div>
        <div className="workspace-meta">
          <strong>星火教育</strong>
          <span>当前工作空间</span>
        </div>
        <ChevronRight size={16} />
      </div>
      <nav className="main-nav">
        <span className="nav-label">运营中心</span>
        {navItems.map(({ id, label, icon: Icon, badge }) => (
          <button
            key={id}
            className={`nav-item ${activePage === id ? 'active' : ''}`}
            onClick={() => setActivePage(id)}
          >
            <Icon size={18} />
            <span>{label}</span>
            {badge && <em>{badge}</em>}
          </button>
        ))}
      </nav>
      <div className="side-spacer" />
      <div className="side-tip">
        <div className="tip-icon"><Lightbulb size={17} /></div>
        <div>
          <strong>小贴士</strong>
          <p>从高意向评论开始跟进，转化率更高。</p>
        </div>
      </div>
      <nav className="secondary-nav">
        <button className="nav-item" onClick={() => {}}><Settings2 size={18} /><span>设置</span></button>
        <button className="nav-item" onClick={() => {}}><CircleHelp size={18} /><span>帮助中心</span></button>
      </nav>
      <div className="profile">
        <div className="profile-avatar">林</div>
        <div className="profile-meta"><strong>林小满</strong><span>管理员</span></div>
        <MoreHorizontal size={18} />
      </div>
    </aside>
  )
}

function Header({ activePage }) {
  const title = navItems.find((item) => item.id === activePage)?.label
  return (
    <header className="topbar">
      <div className="crumbs"><span>线索雷达</span><ChevronRight size={14} /><strong>{title}</strong></div>
      <div className="top-actions">
        <div className="top-search"><Search size={16} /><span>搜索关键词、评论...</span><kbd>⌘ K</kbd></div>
        <button className="icon-button" title="通知"><Bell size={18} /><i /></button>
        <div className="top-avatar">林</div>
      </div>
    </header>
  )
}

function AskTaskPage({ setActivePage, setKeywords, notify, runCollect }) {
  const [sentence, setSentence] = useState('')
  const [task, setTask] = useState(null)

  const examples = [
    '帮我找需要买家具的客户',
    '帮我找想学少儿编程的家长',
    '帮我找近期想减脂的上班族',
  ]

  const buildTask = (value) => {
    const topicMap = [
      { words: ['家具', '家居', '沙发'], topic: '家具购买需求' },
      { words: ['编程', '少儿'], topic: '少儿编程咨询' },
      { words: ['减脂', '健身', '瘦身'], topic: '减脂健身需求' },
      { words: ['英语', '口语'], topic: '英语学习需求' },
      { words: ['考研'], topic: '考研辅导需求' },
    ]
    const match = topicMap.find((item) => item.words.some((word) => value.includes(word)))
    return {
      sentence: value,
      topic: match?.topic || '自定义客户需求',
      keywords: match ? match.words.slice(0, 2) : ['购买意向', '客户需求'],
    }
  }

  const submitTask = (event) => {
    event.preventDefault()
    const value = sentence.trim()
    if (!value) return
    const nextTask = buildTask(value)
    setTask(nextTask)
    setKeywords((current) => [
      { id: Date.now(), text: nextTask.topic, platform: '全平台', count: '0', status: '运行中' },
      ...current,
    ])
    notify('AI 已创建新的客户挖掘任务')
  }

  return (
    <div className="ask-page">
      <section className="ask-heading">
        <div>
          <span className="eyebrow"><Sparkles size={14} /> AI 任务助手</span>
          <h1>用一句话，告诉 AI 你想找谁。</h1>
          <p>不用再拆关键词、平台和筛选条件，直接描述你想挖掘的客户。</p>
        </div>
        <div className="ask-heading-badge"><MessageCircleMore size={16} /><span>像聊天一样创建任务</span></div>
      </section>

      <section className="ask-workspace">
        <div className="ask-chat-column">
          <div className="ask-chat-top"><div className="ask-ai-avatar"><Sparkles size={18} /></div><div><strong>线索雷达 AI</strong><span>在线，可以开始交代任务</span></div><span className="ask-online-dot" /></div>
          <div className="ask-message ai-message"><span>你好，我可以帮你从抖音和小红书中找到有明确需求的人。你只要告诉我：想找什么产品的客户？</span></div>
          {task && <div className="ask-message user-message"><span>{task.sentence}</span></div>}
          <form className="ask-input-wrap" onSubmit={submitTask}>
            <textarea value={sentence} onChange={(event) => setSentence(event.target.value)} placeholder="例如：帮我找需要买家具的客户" rows="3" />
            <div className="ask-input-foot"><span><Lightbulb size={14} /> 描述得越具体，找到的客户越精准</span><button className="primary-button" type="submit"><ArrowRight size={17} />生成任务</button></div>
          </form>
          <div className="ask-examples"><span>试试这样说</span>{examples.map((example) => <button key={example} onClick={() => setSentence(example)}>{example}</button>)}</div>
        </div>

        <div className="ask-result-column">
          {!task ? (
            <div className="ask-empty-result"><div className="ask-empty-icon"><Sparkles size={24} /></div><strong>AI 任务理解</strong><p>提交一句话后，我会自动拆解你的目标客户、搜索范围和识别标准。</p><div className="ask-empty-points"><span><Check size={14} />提炼客户需求</span><span><Check size={14} />匹配搜索词</span><span><Check size={14} />识别意向评论</span></div></div>
          ) : (
            <div className="ask-result-card"><div className="ask-result-head"><div><span className="eyebrow"><Check size={14} /> AI 已理解任务</span><h2>客户挖掘任务</h2></div><span className="ask-ready-pill">准备完成</span></div><div className="ask-interpretation"><span>你的目标</span><strong>{task.sentence}</strong></div><div className="ask-detail-list"><div><span className="ask-detail-icon purple"><Target size={16} /></span><div><small>目标客户</small><strong>{task.topic}</strong></div></div><div><span className="ask-detail-icon blue"><Search size={16} /></span><div><small>搜索范围</small><strong>抖音 + 小红书公开作品</strong></div></div><div><span className="ask-detail-icon orange"><Filter size={16} /></span><div><small>重点识别</small><strong>价格、优惠、推荐、报名等意向</strong></div></div></div><div className="ask-keywords"><span>AI 提炼关键词</span><div>{task.keywords.map((keyword) => <b key={keyword}>{keyword}</b>)}</div></div><button className="primary-button ask-start-button" onClick={runCollect}><Play size={17} fill="currentColor" />开始采集这项任务</button><button className="ask-edit-button" onClick={() => setTask(null)}>返回修改描述</button></div>
          )}
        </div>
      </section>

      <section className="ask-how-it-works"><span className="eyebrow"><Zap size={14} /> 工作方式</span><div><strong>一句话描述</strong><ArrowRight size={15} /><strong>AI 自动拆解</strong><ArrowRight size={15} /><strong>采集公开作品</strong><ArrowRight size={15} /><strong>筛选意向评论</strong></div></section>
    </div>
  )
}

function IntroPage({ setActivePage, runCollect }) {
  const steps = [
    { number: '01', title: '告诉 Codex 你要找谁', text: '输入行业、产品、城市和用户需求，比如“上海少儿编程”“办公室减脂”。' },
    { number: '02', title: '自动挖掘公开内容', text: '系统按搜索词整理抖音、小红书相关作品，并持续收集评论中的真实表达。' },
    { number: '03', title: '识别可转化的线索', text: 'AI 识别收费、优惠、报名、推荐等购买信号，给评论打分并排出跟进优先级。' },
  ]

  return (
    <div className="intro-page">
      <section className="intro-hero">
        <div className="intro-hero-copy">
          <span className="eyebrow"><Sparkles size={14} /> CODEX · AI 客户挖掘工作流</span>
          <h1>让 Codex 帮你找到<br /><span>正在主动寻找产品的人。</span></h1>
          <p>从一个搜索词开始，自动发现抖音和小红书里的公开需求，把藏在评论区的咨询、比较和购买意愿，整理成可以跟进的客户线索。</p>
          <div className="intro-actions">
            <button className="primary-button" onClick={runCollect}><Play size={17} fill="currentColor" />立即体验 AI 采集</button>
            <button className="outline-button intro-secondary-button" onClick={() => setActivePage('home')}><LayoutDashboard size={16} />查看工作台</button>
          </div>
          <div className="intro-trust"><span><Check size={14} />公开内容挖掘</span><span><Check size={14} />AI 意向识别</span><span><Check size={14} />无需手工翻评论</span></div>
        </div>
        <div className="intro-visual">
          <div className="intro-orbit orbit-a" />
          <div className="intro-orbit orbit-b" />
          <div className="intro-center"><Sparkles size={29} /><span>Codex<br /><small>AI 挖掘引擎</small></span></div>
          <div className="intro-node node-search"><Search size={16} /><span>搜索词<br /><b>少儿编程</b></span></div>
          <div className="intro-node node-works"><Database size={16} /><span>相关作品<br /><b>2,638 条</b></span></div>
          <div className="intro-node node-leads"><Target size={16} /><span>意向线索<br /><b>186 条</b></span></div>
          <div className="intro-comment-bubble bubble-one">“怎么收费？”</div>
          <div className="intro-comment-bubble bubble-two">“有优惠吗？”</div>
          <div className="intro-comment-bubble bubble-three">“推荐哪种课程？”</div>
        </div>
      </section>

      <section className="intro-section-heading">
        <span className="eyebrow"><Zap size={14} /> 三步完成客户挖掘</span>
        <h2>把人工找客户，变成可复用的 AI 流程。</h2>
        <p>Codex 负责把公开内容中的需求信号整理出来，你只需要把时间用在真正的沟通和成交上。</p>
      </section>
      <section className="intro-step-grid">
        {steps.map((step) => (
          <div className="intro-step-card" key={step.number}>
            <span className="intro-step-number">{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
            <ArrowRight size={17} />
          </div>
        ))}
      </section>

      <section className="intro-bottom">
        <div><strong>从评论里的一个问题，开始一次有效对话。</strong><span>先用演示数据体验完整流程，再接入你的真实搜索词。</span></div>
        <button className="text-button" onClick={() => setActivePage('comments')}>查看意向评论 <ArrowRight size={15} /></button>
      </section>
    </div>
  )
}

const intentKeywords = ['怎么收费', '收费', '优惠', '推荐', '报名', '试听', '价格', '多少钱', '适合', '校区', '课程']

function HighlightedComment({ text }) {
  const pattern = new RegExp(`(${intentKeywords.map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g')
  return text.split(pattern).map((part, index) => (
    intentKeywords.includes(part)
      ? <mark className="intent-keyword" key={`${part}-${index}`}>{part}</mark>
      : <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>
  ))
}

function HomePage({ keywords, runCollect, setActivePage, setShowAddKeyword, notify }) {
  return (
    <div className="page">
      <section className="page-heading home-heading">
        <div>
          <span className="eyebrow"><span className="eyebrow-dot" /> 今日概览 · 9月29日</span>
          <h1>早上好，林小满</h1>
          <p>让每一次搜索，都变成一次有效对话。</p>
        </div>
        <button className="primary-button" onClick={runCollect}><Play size={17} fill="currentColor" />开始采集</button>
      </section>
      <section className="stats-grid">
        <StatCard icon={Target} label="累计意向线索" value="2,638" delta="+18.6%" note="较上周" tone="blue" />
        <StatCard icon={MessageCircleMore} label="今日新增评论" value="186" delta="+24.2%" note="较昨日" tone="purple" />
        <StatCard icon={Zap} label="平均意向评分" value="82.4" delta="+6.8%" note="较上周" tone="orange" />
        <StatCard icon={Users} label="待跟进线索" value="48" delta="12" note="条高优先级" tone="green" />
      </section>
      <section className="home-grid">
        <div className="panel keyword-panel">
          <PanelHeader title="我的采集任务" subtitle="持续监控关键词下的最新内容" action={<button className="text-button" onClick={() => setActivePage('collect')}>查看全部 <ArrowRight size={15} /></button>} />
          <div className="keyword-list">
            {keywords.slice(0, 5).map((item) => <KeywordRow key={item.id} item={item} />)}
          </div>
          <button className="add-row" onClick={() => setShowAddKeyword(true)}><Plus size={17} /> 添加新的关键词</button>
        </div>
        <div className="panel activity-panel">
          <PanelHeader title="最近发现" subtitle="刚刚捕捉到的意向信号" action={<button className="text-button" onClick={() => setActivePage('comments')}>查看全部 <ArrowRight size={15} /></button>} />
          <div className="mini-comment-list">
            {comments.slice(0, 5).map((item) => (
              <button className="mini-comment" key={item.id} onClick={() => setActivePage('comments')}>
                <Avatar tone={item.tone} text={item.avatar} />
                <div className="mini-comment-copy"><div><strong>{item.name}</strong><span>{item.time}</span></div><p><HighlightedComment text={item.text} /></p></div>
                <span className={`intent-pill ${item.intent === '高意向' ? 'high' : item.intent === '中意向' ? 'medium' : 'low'}`}>{item.intent}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="insight-strip">
        <div className="insight-icon"><Flame size={21} /></div>
        <div><strong>本周洞察</strong><p>“少儿编程”相关评论的意向分最高，建议优先跟进上海、深圳地区的家长。</p></div>
        <button className="text-button" onClick={() => notify('洞察报告已生成')}>查看洞察 <ArrowRight size={15} /></button>
      </section>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, delta, note, tone }) {
  return <div className="stat-card"><div className={`stat-icon ${tone}`}><Icon size={19} /></div><div className="stat-label">{label}</div><div className="stat-value">{value}</div><div className="stat-foot"><span className={tone === 'green' ? 'neutral-delta' : 'positive-delta'}>{tone !== 'green' && <BarChart3 size={13} />}{delta}</span><span>{note}</span></div></div>
}

function PanelHeader({ title, subtitle, action }) {
  return <div className="panel-header"><div><h2>{title}</h2><p>{subtitle}</p></div>{action}</div>
}

function KeywordRow({ item }) {
  return <div className="keyword-row"><div className={`platform-mark ${item.platform === '抖音' ? 'douyin' : 'redbook'}`}>{item.platform === '抖音' ? '音' : '书'}</div><div className="keyword-copy"><strong>{item.text}</strong><span>{item.platform} · 最近 7 天</span></div><div className="keyword-count"><strong>{item.count}</strong><span>条评论</span></div><span className={`status-dot ${item.status === '运行中' ? 'running' : 'paused'}`}>{item.status}</span><ChevronRight size={16} className="row-arrow" /></div>
}

function CollectPage({ keywords, running, runCollect, setShowAddKeyword, notify }) {
  const total = keywords.reduce((sum, item) => sum + Number(item.count.replace(',', '')), 0)
  return (
    <div className="page">
      <section className="page-heading">
        <div><span className="eyebrow"><Database size={14} /> 数据采集</span><h1>采集任务</h1><p>输入想要了解的搜索词，AI 会自动帮你找到相关作品和意向评论。</p></div>
        <button className="primary-button" onClick={runCollect} disabled={running}>{running ? <><span className="spinner" />采集中...</> : <><Play size={17} fill="currentColor" />立即采集</>}</button>
      </section>
      <section className="collect-hero">
        <div className="collect-hero-copy"><div className="hero-kicker"><Sparkles size={15} /> AI 智能筛选已开启</div><h2>从搜索词开始，找到<br /><span>真正有意向的人。</span></h2><p>我们会分析抖音、小红书上的相关作品，自动识别评论中的咨询、需求与购买信号。</p><div className="process-line"><ProcessStep num="01" text="搜索作品" /><div className="process-connector" /><ProcessStep num="02" text="识别评论" /><div className="process-connector" /><ProcessStep num="03" text="筛选线索" /></div></div>
        <div className="hero-visual"><div className="visual-window"><div className="window-bar"><span /><span /><span /><em>AI 正在分析评论</em></div><div className="visual-feed"><div className="fake-video"><Play size={20} fill="currentColor" /><span>相关作品</span></div><div className="fake-lines"><span /><span /><span className="short" /></div><div className="fake-ai"><Sparkles size={13} /><b>识别到高意向评论</b><span>“想了解课程怎么报名？”</span></div></div></div></div>
      </section>
      <section className="collect-layout">
        <div className="panel task-table-panel"><PanelHeader title="关键词任务" subtitle={`${keywords.length} 个任务 · 共发现 ${total.toLocaleString()} 条评论`} action={<button className="outline-button" onClick={() => setShowAddKeyword(true)}><Plus size={16} /> 新增关键词</button>} /><div className="task-table"><div className="table-head"><span>关键词</span><span>平台</span><span>已采集评论</span><span>状态</span><span /></div>{keywords.map((item) => <div className="table-row" key={item.id}><div className="table-keyword"><div className={`platform-mark small ${item.platform === '抖音' ? 'douyin' : 'redbook'}`}>{item.platform === '抖音' ? '音' : '书'}</div><strong>{item.text}</strong></div><span>{item.platform}</span><strong>{item.count}</strong><span className={`table-status ${item.status === '运行中' ? 'on' : ''}`}><i />{item.status}</span><button className="table-more" onClick={() => notify('任务操作菜单已打开')}><MoreHorizontal size={18} /></button></div>)}</div></div>
        <div className="side-summary"><div className="summary-card"><div className="summary-top"><span>本次采集预估</span><Clock3 size={17} /></div><strong>约 5 分钟</strong><p>预计分析 2,400+ 条新评论</p><div className="summary-progress"><span /></div><small>上次采集于 12 分钟前</small></div><div className="plain-note"><Lightbulb size={17} /><p>关键词越具体，筛选出的意向评论越精准。</p></div></div>
      </section>
    </div>
  )
}

function ProcessStep({ num, text }) { return <div className="process-step"><b>{num}</b><span>{text}</span></div> }

function CommentsPage({ comments, setSelectedComment, notify }) {
  const [filter, setFilter] = useState('全部')
  const [platform, setPlatform] = useState('全部平台')
  const [search, setSearch] = useState('')
  const filtered = useMemo(() => comments.filter((comment) => (filter === '全部' || comment.intent === filter) && (platform === '全部平台' || comment.platform === platform) && `${comment.text}${comment.name}`.includes(search)), [filter, platform, search])
  return (
    <div className="page">
      <section className="page-heading comments-heading"><div><span className="eyebrow"><MessageCircleMore size={14} /> 线索中心</span><h1>意向评论</h1><p>AI 已帮你从 2,638 条评论中，筛选出 186 条有价值的线索。</p></div><button className="outline-button" onClick={() => notify('已导出当前筛选结果')}><Download size={16} />导出线索</button></section>
      <section className="comment-summary"><div className="summary-stat"><span className="summary-stat-icon purple"><MessageCircleMore size={18} /></span><div><strong>186</strong><span>今日新增</span></div></div><div className="summary-stat"><span className="summary-stat-icon orange"><Flame size={18} /></span><div><strong>68</strong><span>高意向</span></div></div><div className="summary-stat"><span className="summary-stat-icon green"><Check size={18} /></span><div><strong>42</strong><span>已跟进</span></div></div><div className="summary-stat chart-stat"><div><span>本周线索增长</span><strong>+32.8%</strong></div><MiniChart /></div></section>
      <section className="panel comments-panel"><div className="comment-toolbar"><div className="filter-tabs">{['全部', '高意向', '中意向', '待确认'].map((item) => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}{item === '高意向' && <em>68</em>}</button>)}</div><div className="toolbar-actions"><div className="inline-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="搜索评论内容" /></div><select value={platform} onChange={(event) => setPlatform(event.target.value)}><option>全部平台</option><option>抖音</option><option>小红书</option></select><button className="filter-button" onClick={() => notify('更多筛选条件已打开')}><ListFilter size={16} />筛选</button></div></div><div className="comment-table"><div className="comment-table-head"><span>评论内容</span><span>意向评分</span><span>来源作品</span><span>发现时间</span><span /></div>{filtered.map((comment) => <CommentRow key={comment.id} comment={comment} open={() => setSelectedComment(comment)} />)}{filtered.length === 0 && <div className="empty-state"><Search size={22} /><strong>没有找到匹配的评论</strong><span>试试更换关键词或筛选条件</span></div>}</div><div className="table-footer"><span>显示 {filtered.length} 条，共 186 条</span><div><button className="pagination active">1</button><button className="pagination">2</button><button className="pagination">3</button><button className="pagination"><ChevronRight size={15} /></button></div></div></section>
    </div>
  )
}

function CommentRow({ comment, open }) {
  return <button className="comment-row" onClick={open}><div className="comment-main"><Avatar tone={comment.tone} text={comment.avatar} /><div className="comment-copy"><div className="comment-name"><strong>{comment.name}</strong><span className={`source-platform ${comment.platform === '抖音' ? 'douyin-text' : 'redbook-text'}`}>{comment.platform}</span></div><p><HighlightedComment text={comment.text} /></p><div className="tag-list">{comment.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></div><div className="score-cell"><strong>{comment.score}</strong><span>意向分</span></div><div className="source-cell"><strong>{comment.source}</strong><span><HeartIcon /> {comment.likes}</span></div><span className="time-cell">{comment.time}</span><ChevronRight size={16} className="row-arrow" /></button>
}

function HeartIcon() { return <span className="heart-symbol">♡</span> }

function Avatar({ tone, text }) { return <span className={`avatar ${tone}`}>{text}</span> }

function MiniChart() { return <svg className="mini-chart" viewBox="0 0 130 44" preserveAspectRatio="none"><path d="M0 34 C12 34 14 28 24 30 S36 25 46 27 S57 18 68 22 S81 12 91 18 S104 14 112 7 S123 10 130 2" fill="none" stroke="#7357e8" strokeWidth="3" strokeLinecap="round" /><path d="M0 44 L0 34 C12 34 14 28 24 30 S36 25 46 27 S57 18 68 22 S81 12 91 18 S104 14 112 7 S123 10 130 2 L130 44Z" fill="url(#chartFill)" opacity=".14" /><defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#7357e8" /><stop offset="1" stopColor="#fff" /></linearGradient></defs></svg> }

function AddKeywordModal({ close, submit }) {
  return <div className="modal-backdrop" onMouseDown={close}><div className="modal" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={close}><X size={18} /></button><div className="modal-icon"><Search size={20} /></div><h2>新增采集关键词</h2><p>添加你想要持续监控的搜索词。</p><form onSubmit={submit}><label>搜索关键词<input name="keyword" autoFocus placeholder="例如：少儿编程、办公室减脂" /></label><label>选择平台<select name="platform"><option>抖音</option><option>小红书</option></select></label><button className="primary-button modal-submit" type="submit"><Plus size={17} />添加任务</button></form></div></div>
}

function CollectProgressModal({ progress, phase, stats, done, close }) {
  const phases = [
    { title: '正在搜索相关作品', detail: '正在同步抖音、小红书的最新内容' },
    { title: '正在分析作品评论', detail: 'AI 正在识别评论里的需求和咨询信号' },
    { title: '正在筛选意向线索', detail: '正在计算意向评分并整理高价值评论' },
    { title: '采集完成', detail: '本次采集已完成，可以关闭窗口查看结果' },
  ]
  const currentPhase = phases[phase] || phases[0]

  return (
    <div className="collect-modal-backdrop" onMouseDown={close}>
      <section className="collect-modal" onMouseDown={(event) => event.stopPropagation()}>
        <div className="collect-modal-head">
          <div>
            <span className="eyebrow"><Sparkles size={14} /> AI 自动获客</span>
            <h2>{currentPhase.title}</h2>
            <p>{currentPhase.detail}</p>
          </div>
          <button className="modal-close collect-close" onClick={close} title="关闭采集窗口"><X size={19} /></button>
        </div>

        <div className={`collection-stage ${done ? 'complete' : ''}`}>
          <div className="stage-grid" />
          <div className="stage-scan-line" />
          <div className="stage-core">
            <div className="stage-core-ring ring-one" />
            <div className="stage-core-ring ring-two" />
            <div className="stage-core-center">{done ? <Check size={31} /> : <Sparkles size={29} />}</div>
          </div>
          <div className="stage-pulse pulse-one" />
          <div className="stage-pulse pulse-two" />
          <div className="stage-label label-top"><Database size={14} />作品库</div>
          <div className="stage-label label-right"><MessageCircleMore size={14} />评论流</div>
          <div className="stage-label label-bottom"><Target size={14} />意向线索</div>
          <div className="stage-data data-one">#少儿编程</div>
          <div className="stage-data data-two">高意向 96</div>
          <div className="stage-data data-three">上海 · 近期需求</div>
        </div>

        <div className="collect-progress-meta">
          <div><strong>{progress}%</strong><span>{done ? '本次任务已完成' : '实时采集进度'}</span></div>
          <span>{done ? '可关闭窗口' : '请保持页面开启'}</span>
        </div>
        <div className="collect-progress-track"><span style={{ width: `${progress}%` }} /></div>

        <div className="collect-stat-grid">
          <div><span>已扫描作品</span><strong>{stats.works.toLocaleString()}</strong><small>条</small></div>
          <div><span>已分析评论</span><strong>{stats.comments.toLocaleString()}</strong><small>条</small></div>
          <div><span>识别意向评论</span><strong>{stats.intents.toLocaleString()}</strong><small>条</small></div>
        </div>

        <div className="collect-phase-list">
          {phases.slice(0, 3).map((item, index) => (
            <div className={`${index < phase || done ? 'finished' : ''} ${index === phase && !done ? 'current' : ''}`} key={item.title}>
              <span>{index < phase || done ? <Check size={13} /> : index + 1}</span>
              <p>{item.title}</p>
            </div>
          ))}
        </div>

        <div className="collect-modal-foot">
          <span><span className={`live-dot ${done ? 'done' : ''}`} />{done ? '采集任务已完成' : '采集任务进行中'}</span>
          <button className={done ? 'primary-button' : 'outline-button'} onClick={close}>{done ? '关闭窗口' : '后台运行并关闭'}</button>
        </div>
      </section>
    </div>
  )
}

function CommentDrawer({ comment, close, notify }) {
  return <div className="drawer-backdrop" onMouseDown={close}><aside className="comment-drawer" onMouseDown={(event) => event.stopPropagation()}><div className="drawer-head"><div><span className="eyebrow">评论详情</span><h2>意向线索</h2></div><button className="modal-close" onClick={close}><X size={18} /></button></div><div className="drawer-profile"><Avatar tone={comment.tone} text={comment.avatar} /><div><strong>{comment.name}</strong><span>{comment.platform} · {comment.time}</span></div><span className={`intent-pill ${comment.intent === '高意向' ? 'high' : 'medium'}`}>{comment.intent}</span></div><div className="drawer-score"><div><span>AI 意向评分</span><strong>{comment.score}<small>/100</small></strong></div><div className="score-ring" style={{ '--score': `${comment.score * 3.6}deg` }}><b>{comment.score}</b></div></div><div className="drawer-section"><span className="drawer-label">评论原文</span><p className="original-comment">“<HighlightedComment text={comment.text} />”</p></div><div className="drawer-section"><span className="drawer-label">识别标签</span><div className="tag-list large">{comment.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><div className="drawer-section"><span className="drawer-label">来源作品</span><div className="source-preview"><div className="source-thumb"><Play size={15} fill="currentColor" /></div><strong>{comment.source}</strong><ExternalLink size={16} /></div></div><div className="drawer-actions"><button className="outline-button" onClick={() => notify('已标记为稍后跟进')}><Clock3 size={16} />稍后跟进</button><button className="primary-button" onClick={() => notify('已标记为已跟进')}><Check size={16} />标记已跟进</button></div></aside></div>
}

createRoot(document.getElementById('root')).render(<App />)
