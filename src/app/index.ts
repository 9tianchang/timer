import { App, createApp } from 'vue'
import Main from './layout'
import 'element-plus/lib/theme-chalk/index.css'
import './styles' // global css
import installRouter from './router'
import '../common/console-logger'

const app: App = createApp(Main)

installRouter(app)
app.mount('#app')