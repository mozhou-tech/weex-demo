<template>
  <div class="wrapper">
    <text>Event count: {{count}}</text>
    <text style="margin-top:20px">{{value}}</text>
    <input ref="input1" style="font-size:50px;margin-top:100px;height:100px;background-color:lightgray" @input="oninput"></input>

  </div>
</template>

<style scoped>

</style>

<script>
  import { fetchExamples, saveExamples, readExamples } from '../../utils'
  import ExampleScroller from '../../components/ExampleScroller.vue'
  // import getExamples from '../../examples'
  // const exampleMap = getExamples({ scope: 'mobile', filterTODO: true })
  const exampleMap = []
  let useStorage = false
  export default {
    components: { ExampleScroller },
    data () {
      return {
        navigationBarOptions: {
          title: {
            zh: '使用 Weex 的例子',
            en: 'Weex Examples'
          }
        },
        examples: exampleMap,
        showLoading: false,
        language: 'en',
        activeTab: 'component',
        activeGroup: 'div',
        dict: {
          READ_MORE: { en: 'read more', zh: '查看更多' }
        }
      }
    },
    beforeCreate () {
      // read examples from storage
      readExamples(examples => {
        this.examples = examples
        if (WXEnvironment.platform.toLowerCase() !== 'web') {
          useStorage = true
        }
      })

      // update examples to storage
      fetchExamples(result => {
        saveExamples(result)
        if (!useStorage) {
          this.examples = result.examples
        }
      })

      setTimeout(() => { this.showLoading = true }, 400)
    },
    computed: {
      tabs () {
        return this.examples.map(group => ({
          type: group.type,
          name: group.name
        }))
      },
      currentTab () {
        return this.examples.filter(tab => tab.type === this.activeTab)[0]
      }
    },
    methods: {
      toggleTab (tabType) {
        this.activeTab = tabType
        this.activeGroup = this.currentTab.group[0].type
      }
    }
  }
</script>
