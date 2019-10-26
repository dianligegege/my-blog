module.exports = {
    title: 'Hello VuePress',
    description: 'Just playing around',
    base: '/my-blog/',
    // 默认样式配置
    themeConfig: {
      // 导航栏
      nav: [
        { text: 'Home', link: '/' },
        { text: 'demo', link: '/demo' },
        { text: 'github', link: 'https://github.com/dianligegege/my-blog'},
        {
          text: 'Languages',
          // 网页阅读
          ariaLabel: 'Language Menu',
          items: [
            { text: 'Chinese', link: '/language/chinese/' },
            { text: 'Japanese', link: '/language/japanese/' }
          ]
        }
      ],
      // 侧边栏
      sidebar: [
        ['/', 'home页'],
        ['/demo', 'demo页'],
        ['/pagea', 'pagea页']
      ]
  },
  // webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        '@fuck': 'image'
      }
    }
  },
}