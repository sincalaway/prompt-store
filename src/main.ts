import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './components/styles/index.scss'
import './style.css'
import { preloadAllPromptItems } from './data/loader'

// 预加载所有提示词数据，减少首次切换分类时的等待
preloadAllPromptItems().then(() => {
  console.log('所有提示词数据预加载完成')
})

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
