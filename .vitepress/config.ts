import { defineConfig } from 'vitepress';

const siteName = 'Vinaykumar V A';
const siteDescription =
  'Backend Engineer with 4.5+ years building scalable, cloud-native backend services in Go.';
const siteUrl = 'https://vinaycharlie01.github.io/';

export default defineConfig({
  title: siteName,
  description: siteDescription,
  lang: 'en-US',
  head: [
    ['link', { rel: 'icon', href: '/avatar.jpg' }],
    ['meta', { name: 'author', content: 'Vinaykumar V A' }],
    ['meta', { property: 'og:site_name', content: siteName }],
    ['meta', { property: 'og:title', content: siteName }],
    ['meta', { property: 'og:description', content: siteDescription }],
    ['meta', { property: 'og:url', content: siteUrl }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:site', content: '@VinayKshatriy12' }],
    ['meta', { name: 'twitter:title', content: siteName }],
    ['meta', { name: 'twitter:description', content: siteDescription }]
  ],
  srcDir: 'src',
  cleanUrls: true,
  themeConfig: {
    logo: '/avatar.jpg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Work', link: '/#work' },
      { text: 'Projects', link: '/#projects' },
      { text: 'Blog', link: '/blog/' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vinaycharlie01' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/vinaycharlie01' },
      { icon: 'x', link: 'https://x.com/VinayKshatriy12' },
      {
        icon: {
          svg: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="currentColor" d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>'
        },
        link: 'https://vinaycharlie07.medium.com/',
        ariaLabel: 'Medium'
      }
    ],
    footer: {
      message:
        '© Vinaykumar V A. Built with <a target="_blank" href="https://vitepress.dev">VitePress</a>'
    }
  },
  sitemap: {
    hostname: 'https://vinaycharlie01.github.io'
  }
});
