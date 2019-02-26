<template>
  <div class="wrapper">
    <text class="greeting">The environment is ready!</text>
  </div>
</template>

<script>
  import * as utils from '../../utils'
  import { aboutApp } from '../../utils/mock'
  import AppInfoCard from '../../components/AppInfoCard.vue'
  const picker = weex.requireModule('picker')
  const channel = new BroadcastChannel('language')
  export default {
    components: { AppInfoCard },
    data () {
      return {
        language: 'en',
        followSystemLanguage: true,
        navigationBarOptions: {
          title: {
            zh: '关于 Weex',
            en: 'About Weex'
          }
        },
        dict: {
          FOLLOW_SYSTEM: { en: 'Follow System', zh: '跟随系统' },
          LANGUAGE: { en: 'Language', zh: '语言' }
        },
        aboutApp
      }
    },
    watch: {
      language () {
        channel.postMessage({ language: this.language })
      }
    },
    computed: {
      languageName () {
        if (this.followSystemLanguage) {
          return this.i18n(this.dict.FOLLOW_SYSTEM)
        }
        return this.i18n({ en: 'English', zh: '简体中文' })
      }
    },
    created () {
      utils.readAbout(about => {
        this.aboutApp = about
      })
      utils.getStorageLanguage(
        lang => this.followSystemLanguage = false,
        () => this.followSystemLanguage = true
      )
    },
    methods: {
      chooseLanguage () {
        const options = ['', 'en', 'zh']
        const index = this.followSystemLanguage
          ? 0
          : options.indexOf(this.language)
        picker.pick({
          index,
          items: [
            this.i18n(this.dict.FOLLOW_SYSTEM),
            'English',
            '中文'
          ]
        }, ({result, data}) => {
          if (result === 'success') {
            const select = options[data]
            if (select) {
              this.followSystemLanguage = false
              this.language = select
              utils.setLanguage(select)
            } else {
              this.followSystemLanguage = true
              utils.clearStorageLanguage()
              utils.getSystemLanguage(lang => {
                this.language = lang
              }, error => {
                this.language = 'en'
              })
            }
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
