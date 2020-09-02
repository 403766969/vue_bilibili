import Vue from 'vue'
import {
  ActionSheet,
  Button,
  Cell,
  CellGroup,
  Dialog,
  Empty,
  Field,
  Form,
  Icon,
  Lazyload,
  List,
  NoticeBar,
  Pagination,
  Search,
  Swipe,
  SwipeItem,
  Tab,
  Tabs,
  Toast,
  Uploader
} from 'vant'

Vue.use(ActionSheet)
Vue.use(Button)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Dialog)
Vue.use(Empty)
Vue.use(Field)
Vue.use(Form)
Vue.use(Icon)
Vue.use(Lazyload, {
  loading: require('assets/img/loading.gif')
})
Vue.use(List)
Vue.use(NoticeBar)
Vue.use(Pagination)
Vue.use(Search)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Toast)
Vue.use(Uploader)
