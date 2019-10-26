module.exports = {
    title: 'Hello VuePress',
    description: 'dianligegege\'s blog',
    base: '/',
    head: [
      ['link', { rel: 'shortcut icon', href:'/image/favicon.ico' }],
    ],
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
        ['/page', 'page页']
      ]
  },
  // webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        '@': './.vuepress/public'
      }
    }
  },
}