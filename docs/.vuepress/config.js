module.exports = {
	title: '电里',
	description: 'dianligegege\'s blog',
	base: '/',
	head: [
		['link', {rel: 'stylesheet', href: '/styles/home.css'}],
		['link', { rel: 'shortcut icon', href: '/image/favicon.ico' }],
	],
	// 默认样式配置
	themeConfig: {
		lastUpdated: '上次更新时间',
		// 导航栏
		nav: [
			{ text: 'Home', link: '/' },
			{
				text: '文档',
				items: [
					{ text: '旧文章', link: '/old/destructuringAssignment' },
					{ text: '新文章', link: '/new/import-export' }
				]
			},
			{ text: 'github', link: 'https://github.com/dianligegege/my-blog' },
		],
		sidebar: {
			'/old/': [
				{
					title: '一些旧文章',   // 必要的
					// path: '/old/',    // 可选的, 应该是一个绝对路径
					collapsable: true, // 可选的, 默认值是 true,
					sidebarDepth: 1,    // 可选的, 默认值是 1
					children: [
						['destructuringAssignment', '解构赋值'],
						['objectExpend', '对象的扩展'],
						['class', 'Class类'],
						['websocketBase', 'WebSocket基础'],
					]
				},
			],

			'/new/': [
				{
					title: '一些新文章',
					children: [
						['import-export', 'import与export'],
						['Object', '对象的创建'],
					],
				},
			],

			// fallback
			'/': [
				'',        /* / */
			]
		}
	},
	// webpack配置
	configureWebpack: {
		resolve: {
			alias: {
				'@': '../.vuepress/public'
			}
		}
	},
}