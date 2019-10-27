module.exports = {
	title: '电里',
	description: 'dianligegege\'s blog',
	base: '/',
	head: [
		['link', { rel: 'shortcut icon', href: '/image/favicon.ico' }],
	],
	// 默认样式配置
	themeConfig: {
		// 导航栏
		nav: [
			{ text: 'Home', link: '/' },
			{
				text: '文档',
				items: [
					{ text: '旧文章', link: '/old/' },
					{ text: '新文章', link: '/new/' }
				]
			},
			{ text: 'github', link: 'https://github.com/dianligegege/my-blog' },
		],
		sidebar: {
			'/old/': [
				{
					title: '一些旧文章',   // 必要的
					path: '/old/',    // 可选的, 应该是一个绝对路径
					collapsable: false, // 可选的, 默认值是 true,
					sidebarDepth: 1,    // 可选的, 默认值是 1
					children: [
						['document', '旧文章一'],
						['document1', '旧文章二']
					]
				},
			],

			'/new/': [
				['', '新文章'],
				['page', '新文章1'],
				['page1', '新文章2']
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