<template>
  <div class="app-shell">
    <header class="app-header">
      <div class="brand-block">
        <div class="brand-mark">✦</div>
        <div>
          <p class="eyebrow">PROMPT WORKSPACE</p>
          <h1>Prompt Store</h1>
        </div>
      </div>
      <div class="header-content-heading content-heading">
        <div>
          <p class="section-kicker">CREATIVE LIBRARY</p>
          <h2>组合你的灵感提示词</h2>
          <p class="content-subtitle">选择标签，调整权重，快速复制到你的绘图工作流。</p>
        </div>
        <div class="mini-stats">
          <div class="mini-stat"><span class="mini-stat-value">{{ store.totalCount }}</span><span>已选</span></div>
          <div class="mini-stat accent"><span class="mini-stat-value">{{ store.showNSFW ? 'ALL' : 'SFW' }}</span><span>内容模式</span></div>
        </div>
      </div>
      <div class="header-meta">
        <span class="header-status"><span class="status-dot"></span> 本地工作区</span>
        <span class="header-divider"></span>
        <span class="header-count"><strong>{{ store.totalCount }}</strong> 个已选提示词</span>
      </div>
    </header>

    <div class="workspace">
      <aside class="sidebar">
        <div class="sidebar-heading">
          <span class="section-kicker">BROWSE</span>
          <span class="section-label">提示词分类</span>
        </div>
        <LeftPanel />
      </aside>

      <main class="main-content">
        <section class="formula-guide" aria-labelledby="formula-title">
          <div class="formula-guide-head">
            <div>
              <span class="section-kicker">PROMPT FORMULA</span>
              <h3 id="formula-title">提示词构成公式</h3>
            </div>
            <span class="formula-example">主体 + 场景 + 风格 + 镜头语言 + 氛围词 + 细节修饰</span>
          </div>
          <div class="formula-steps">
            <div v-for="step in formulaSteps" :key="step.title" class="formula-step">
              <span class="formula-step-index">{{ step.index }}</span>
              <div>
                <strong>{{ step.title }}</strong>
                <p>{{ step.description }}</p>
              </div>
            </div>
          </div>
        </section>
        <RightPanel />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePromptStore } from './stores/promptStore'
import LeftPanel from './components/LeftPanel.vue'
import RightPanel from './components/RightPanel.vue'

const store = usePromptStore()

const formulaSteps = [
  { index: '01', title: '主体', description: '人物、物体与动作，先确定画面主角' },
  { index: '02', title: '场景', description: '环境、地点与空间特征，补充画面背景' },
  { index: '03', title: '风格', description: '艺术风格、媒介与表现手法' },
  { index: '04', title: '镜头语言', description: '景别、视角、构图与镜头方向' },
  { index: '05', title: '氛围词', description: '梦幻、孤独、宏伟等情绪与气质' },
  { index: '06', title: '细节修饰', description: '光线、道具、质感与高分辨率细节' },
]
</script>
