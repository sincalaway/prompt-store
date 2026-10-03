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
        <div class="content-heading">
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
</script>
