/*
 * search.js
 * 搜索引擎切换与搜索执行模块。
 * 支持必应、谷歌、百度三个引擎，默认必应。
 */

(function() {
  // 搜索引擎配置数组
  const ENGINES = [
    { name: '必应', iconClass: 'ri-microsoft-line', searchUrl: 'https://www.bing.com/search?q=' },
    { name: '谷歌', iconClass: 'ri-google-line', searchUrl: 'https://www.google.com/search?q=' },
    { name: '百度', iconClass: 'ri-baidu-line', searchUrl: 'https://www.baidu.com/s?wd=' }
  ];

  let currentEngineIndex = 0;  // 0 代表必应
  const engineBox = document.getElementById('engineSwitcher');
  const engineIcon = document.getElementById('engineIcon');
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchButton');

  // 更新引擎图标和提示文字
  function updateEngineDisplay() {
    const engine = ENGINES[currentEngineIndex];
    engineIcon.className = engine.iconClass;
    engineBox.setAttribute('title', `点击切换搜索引擎 (当前: ${engine.name})`);
  }

  // 切换到下一个引擎
  function switchEngine() {
    currentEngineIndex = (currentEngineIndex + 1) % ENGINES.length;
    updateEngineDisplay();
    searchInput.focus();
  }

  // 执行搜索
  function performSearch() {
    const query = searchInput.value.trim();
    if (!query) {
      // 空输入时给予视觉提示
      searchInput.style.boxShadow = 'inset 0 1px 4px rgba(200, 30, 30, 0.1), 0 0 0 3px rgba(255, 120, 120, 0.25)';
      searchInput.style.borderColor = 'rgba(255, 100, 100, 0.6)';
      setTimeout(() => {
        searchInput.style.boxShadow = '';
        searchInput.style.borderColor = '';
      }, 250);
      searchInput.focus();
      return;
    }
    // 跳转到搜索引擎结果页
    window.location.href = ENGINES[currentEngineIndex].searchUrl + encodeURIComponent(query);
  }

  // ----- 事件绑定 -----
  engineBox.addEventListener('click', (e) => {
    e.stopPropagation();
    switchEngine();
  });

  engineBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      switchEngine();
    }
  });

  searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    performSearch();
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      performSearch();
    }
  });

  // 点击页面空白区域自动聚焦输入框（不干扰按钮点击）
  document.body.addEventListener('click', (e) => {
    if (!e.target.closest('.search-input') && !e.target.closest('.engine-box') && !e.target.closest('.search-btn')) {
      searchInput.focus();
    }
  });

  // 输入框获得焦点时清除错误样式
  searchInput.addEventListener('focus', () => {
    searchInput.style.boxShadow = '';
    searchInput.style.borderColor = '';
  });

  // 初始化显示
  updateEngineDisplay();

  // 触摸设备优化，防止 :active 样式异常
  engineBox.addEventListener('touchstart', () => {}, { passive: true });
})();