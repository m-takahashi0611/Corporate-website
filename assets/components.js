// SELF-CONSULTING static site shared components

const SITE_NAME = 'SELF-CONSULTING';

const NAV_ITEMS = [
  { href: '/', label: 'TOP' },
  { href: '/service/', label: 'サービス' },
  { href: '/works/', label: '開発実績' },
  { href: '/company/', label: '会社概要' },
  { href: '/blog/', label: 'ブログ' },
];

function renderHeader() {
  const current = window.location.pathname;
  const logoSrc = '/images/logo.png';

  const navLinks = NAV_ITEMS.map(item => {
    const isActive = item.href === '/' ? current === '/' : current.startsWith(item.href);
    return `<a href="${item.href}" class="nav-link${isActive ? ' active' : ''}">${item.label}</a>`;
  }).join('');

  return `
<header id="site-header">
  <div class="container" style="display:flex;align-items:center;justify-content:space-between;padding-top:14px;padding-bottom:14px;">
    <a href="/" style="display:flex;align-items:center;gap:10px;text-decoration:none;">
      <img src="${logoSrc}" alt="${SITE_NAME}" style="height:44px;width:auto;object-fit:contain;">
    </a>
    <nav style="display:none;gap:32px;align-items:center;" id="desktop-nav">
      ${navLinks}
      <a href="/contact/" class="btn-primary" style="padding:8px 20px;font-size:0.875rem;">お問い合わせ</a>
    </nav>
    <button id="menu-toggle" aria-label="メニュー" style="display:flex;padding:8px;background:none;border:none;cursor:pointer;color:#003366;">
      <svg id="menu-icon-open" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      <svg id="menu-icon-close" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  </div>
  <div id="mobile-menu">
    ${NAV_ITEMS.map(i => `<a href="${i.href}">${i.label}</a>`).join('')}
    <a href="/contact/" style="display:block;margin-top:12px;text-align:center;" class="btn-primary">お問い合わせ</a>
  </div>
</header>`;
}

function renderFooter() {
  return `
<footer id="site-footer">
  <div class="container" style="padding-top:56px;padding-bottom:32px;">
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:40px;margin-bottom:40px;">
      <div>
        <a href="/"><img src="/images/logo-white.png" alt="${SITE_NAME}" style="height:40px;width:auto;object-fit:contain;margin-bottom:16px;display:block;filter:brightness(0) invert(1);"></a>
        <p style="font-size:0.875rem;line-height:1.7;color:rgba(255,255,255,0.6);">AIとオフショア開発の融合で、<br>企業のDXを強力にサポートします。</p>
      </div>
      <div>
        <p style="font-size:0.7rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.4);margin-bottom:16px;">サービス</p>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <a href="/service/">受託開発</a>
          <a href="/service/">ラボ型開発</a>
          <a href="/service/">AIソリューション</a>
          <a href="/service/">LINE × AI連携</a>
        </div>
      </div>
      <div>
        <p style="font-size:0.7rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.4);margin-bottom:16px;">会社情報</p>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <a href="/company/">会社概要</a>
          <a href="/works/">開発実績</a>
          <a href="/blog/">ブログ</a>
          <a href="/contact/">お問い合わせ</a>
        </div>
      </div>
      <div>
        <p style="font-size:0.7rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.4);margin-bottom:16px;">お問い合わせ</p>
        <p style="font-size:0.875rem;line-height:1.7;color:rgba(255,255,255,0.6);">〒110-0015<br>東京都台東区東上野3-32-14</p>
        <a href="/contact/" class="btn-primary" style="margin-top:16px;font-size:0.875rem;display:inline-block;">無料相談はこちら</a>
      </div>
    </div>
    <div style="border-top:1px solid rgba(255,255,255,0.1);padding-top:24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
      <p style="font-size:0.8rem;color:rgba(255,255,255,0.4);">© ${new Date().getFullYear()} 株式会社SELF-CONSULTING All rights reserved.</p>
      <div style="display:flex;gap:20px;">
        <a href="/privacy/" style="font-size:0.8rem;">プライバシーポリシー</a>
      </div>
    </div>
  </div>
</footer>`;
}

function initComponents() {
  const headerEl = document.getElementById('header-placeholder');
  const footerEl = document.getElementById('footer-placeholder');
  if (headerEl) headerEl.innerHTML = renderHeader();
  if (footerEl) footerEl.innerHTML = renderFooter();

  // Mobile menu toggle
  const toggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const openIcon = document.getElementById('menu-icon-open');
  const closeIcon = document.getElementById('menu-icon-close');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      if (openIcon) openIcon.style.display = isOpen ? 'none' : 'block';
      if (closeIcon) closeIcon.style.display = isOpen ? 'block' : 'none';
    });
  }

  // Show desktop nav on larger screens
  function handleResize() {
    const nav = document.getElementById('desktop-nav');
    if (nav) nav.style.display = window.innerWidth >= 768 ? 'flex' : 'none';
    const menuBtn = document.getElementById('menu-toggle');
    if (menuBtn) menuBtn.style.display = window.innerWidth >= 768 ? 'none' : 'flex';
  }
  handleResize();
  window.addEventListener('resize', handleResize);

  // Scroll animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// Simple Markdown to HTML parser for blog posts
function markdownToHtml(md) {
  if (!md) return '';
  let html = md
    // Escape HTML
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Code inline
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Unordered list items
    .replace(/^\*   (.+)$/gm, '<li>$1</li>')
    .replace(/^\*  (.+)$/gm, '<li>$1</li>')
    .replace(/^\* (.+)$/gm, '<li>$1</li>')
    .replace(/^-   (.+)$/gm, '<li>$1</li>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // Ordered list items
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    // Blockquote
    .replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>')
    // Horizontal rule
    .replace(/^---$/gm, '<hr>')
    // Paragraphs and line breaks
    .split('\n\n')
    .map(block => {
      block = block.trim();
      if (!block) return '';
      if (block.match(/^<(h[1-6]|ul|ol|li|blockquote|hr|pre)/)) return block;
      if (block.includes('<li>')) return '<ul>' + block + '</ul>';
      return '<p>' + block.replace(/\n/g, '<br>') + '</p>';
    })
    .join('\n');
  return html;
}

document.addEventListener('DOMContentLoaded', initComponents);
