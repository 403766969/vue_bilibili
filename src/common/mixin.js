import { getUserInfoApi } from 'network/api'

export const getUserInfo = {
  data() {
    return {
      userInfo: {}
    }
  },
  methods: {
    async getUserInfo() {
      const userId = window.localStorage.getItem('userId')
      const { data: res } = await getUserInfoApi(userId)
      this.userInfo = res[0]
    }
  }
}
