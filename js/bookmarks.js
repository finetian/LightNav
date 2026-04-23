(function() {
  const STORAGE_KEY = 'lightnav_bookmarks';

  const defaultBookmarksData = {
    常用: [
      { name: '百度', url: 'https://www.baidu.com', icon: 'ri-link' },
      { name: '哔哩哔哩', url: 'https://www.bilibili.com', icon: 'ri-link' },
      { name: '知乎', url: 'https://www.zhihu.com', icon: 'ri-link' },
      { name: 'GitHub', url: 'https://github.com', icon: 'ri-link' },
      { name: 'Gmail', url: 'https://mail.google.com', icon: 'ri-link' },
      { name: 'YouTube', url: 'https://youtube.com', icon: 'ri-link' }
    ],
    工具: [
      { name: 'DeepL', url: 'https://www.deepl.com/translator', icon: 'ri-link' },
      { name: '腾讯文档', url: 'https://docs.qq.com', icon: 'ri-link' },
      { name: '石墨文档', url: 'https://shimo.im', icon: 'ri-link' },
      { name: 'Canva', url: 'https://www.canva.com', icon: 'ri-link' },
      { name: 'ProcessOn', url: 'https://www.processon.com', icon: 'ri-link' },
      { name: '草料二维码', url: 'https://cli.im', icon: 'ri-link' }
    ],
    社交: [
      { name: '微博', url: 'https://weibo.com', icon: 'ri-link' },
      { name: '豆瓣', url: 'https://www.douban.com', icon: 'ri-link' },
      { name: '小红书', url: 'https://www.xiaohongshu.com', icon: 'ri-link' },
      { name: 'Instagram', url: 'https://instagram.com', icon: 'ri-link' },
      { name: 'Telegram', url: 'https://telegram.org', icon: 'ri-link' },
      { name: 'Discord', url: 'https://discord.com', icon: 'ri-link' }
    ],
    学习: [
      { name: 'MDN', url: 'https://developer.mozilla.org', icon: 'ri-link' },
      { name: '菜鸟教程', url: 'https://www.runoob.com', icon: 'ri-link' },
      { name: 'W3School', url: 'https://www.w3school.com.cn', icon: 'ri-link' },
      { name: '中国大学MOOC', url: 'https://www.icourse163.org', icon: 'ri-link' },
      { name: '学堂在线', url: 'https://www.xuetangx.com', icon: 'ri-link' },
      { name: 'Stack Overflow', url: 'https://stackoverflow.com', icon: 'ri-link' }
    ],
    新闻: [
      { name: '新浪新闻', url: 'https://news.sina.com.cn', icon: 'ri-link' },
      { name: '网易新闻', url: 'https://news.163.com', icon: 'ri-link' },
      { name: '腾讯新闻', url: 'https://news.qq.com', icon: 'ri-link' },
      { name: '澎湃新闻', url: 'https://www.thepaper.cn', icon: 'ri-link' },
      { name: 'BBC News', url: 'https://bbc.com/news', icon: 'ri-link' },
      { name: '路透社', url: 'https://reuters.com', icon: 'ri-link' }
    ],
    购物: [
      { name: '淘宝', url: 'https://www.taobao.com', icon: 'ri-link' },
      { name: '京东', url: 'https://www.jd.com', icon: 'ri-link' },
      { name: '拼多多', url: 'https://www.pinduoduo.com', icon: 'ri-link' },
      { name: '天猫', url: 'https://www.tmall.com', icon: 'ri-link' },
      { name: 'Amazon', url: 'https://amazon.com', icon: 'ri-link' },
      { name: '什么值得买', url: 'https://www.smzdm.com', icon: 'ri-link' }
    ],
    娱乐: [
      { name: '爱奇艺', url: 'https://www.iqiyi.com', icon: 'ri-link' },
      { name: '腾讯视频', url: 'https://v.qq.com', icon: 'ri-link' },
      { name: '优酷', url: 'https://www.youku.com', icon: 'ri-link' },
      { name: '网易云音乐', url: 'https://music.163.com', icon: 'ri-link' },
      { name: 'QQ音乐', url: 'https://y.qq.com', icon: 'ri-link' },
      { name: 'Steam', url: 'https://store.steampowered.com', icon: 'ri-link' }
    ],
    开发: [
      { name: 'GitHub', url: 'https://github.com', icon: 'ri-link' },
      { name: 'Gitee', url: 'https://gitee.com', icon: 'ri-link' },
      { name: '掘金', url: 'https://juejin.cn', icon: 'ri-link' },
      { name: 'SegmentFault', url: 'https://segmentfault.com', icon: 'ri-link' },
      { name: 'NPM', url: 'https://www.npmjs.com', icon: 'ri-link' },
      { name: 'Vercel', url: 'https://vercel.com', icon: 'ri-link' }
    ]
  };

  let bookmarksData = loadBookmarks();
  let activeCategory = Object.keys(bookmarksData)[0] || '搜索与AI';

  const categoryPanel = document.getElementById('categoryPanel');
  const bookmarksContainer = document.getElementById('bookmarksContainer');
  const manageModal = document.getElementById('manageModal');
  const closeModal = document.getElementById('closeModal');
  const modalTabs = document.querySelectorAll('.modal-tab');
  const tabCategories = document.getElementById('tabCategories');
  const tabBookmarks = document.getElementById('tabBookmarks');
  const tabData = document.getElementById('tabData');
  const manageCategoryList = document.getElementById('manageCategoryList');
  const manageBookmarkList = document.getElementById('manageBookmarkList');
  const bookmarkFilterSelect = document.getElementById('bookmarkFilterSelect');
  const newCategoryInput = document.getElementById('newCategoryInput');
  const addCategoryBtn = document.getElementById('addCategoryBtn');
  const bookmarkCategorySelect = document.getElementById('bookmarkCategorySelect');
  const newBookmarkName = document.getElementById('newBookmarkName');
  const newBookmarkUrl = document.getElementById('newBookmarkUrl');
  const addBookmarkBtn = document.getElementById('addBookmarkBtn');
  const exportBtn = document.getElementById('exportBtn');
  const importBtn = document.getElementById('importBtn');
  const importFileInput = document.getElementById('importFileInput');
  const resetBtn = document.getElementById('resetBtn');

  let currentBookmarkFilter = 'all';

  function loadBookmarks() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to load bookmarks from localStorage:', e);
    }
    return JSON.parse(JSON.stringify(defaultBookmarksData));
  }

  function saveBookmarks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarksData));
    } catch (e) {
      console.warn('Failed to save bookmarks to localStorage:', e);
    }
  }

  function getCategoryIcon(cat) {
    return 'ri-star-line';
  }

  window.renderCategories = function() {
    const categories = Object.keys(bookmarksData);
    categoryPanel.innerHTML = '';
    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `category-btn ${cat === activeCategory ? 'active' : ''}`;
      btn.innerHTML = `<i class="${getCategoryIcon(cat)}"></i> ${cat}`;

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        activeCategory = cat;
        window.renderCategories();
        window.renderBookmarks(cat);
      });

      categoryPanel.appendChild(btn);
    });

    const manageBtn = document.createElement('button');
    manageBtn.className = 'manage-btn';
    manageBtn.innerHTML = '<i class="ri-settings-3-line"></i> 设置';
    manageBtn.addEventListener('click', openManageModal);
    categoryPanel.appendChild(manageBtn);
  };

  window.renderBookmarks = function(category) {
    const items = bookmarksData[category] || [];
    bookmarksContainer.innerHTML = '';
    items.forEach(item => {
      const a = document.createElement('a');
      a.className = 'bookmark-item';
      a.href = item.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.innerHTML = `<i class="${item.icon}"></i><span>${item.name}</span>`;
      bookmarksContainer.appendChild(a);
    });
  };

  function openManageModal() {
    manageModal.classList.add('active');
    renderManageCategoryList();
    renderManageBookmarkList();
    updateCategorySelect();
  }

  function closeManageModal() {
    manageModal.classList.remove('active');
  }

  function renderManageCategoryList() {
    const categories = Object.keys(bookmarksData);
    manageCategoryList.innerHTML = '';
    categories.forEach(cat => {
      const item = document.createElement('div');
      item.className = 'category-item';
      item.innerHTML = `
        <div class="category-item-info">
          <i class="${getCategoryIcon(cat)}"></i>
          <span>${cat}</span>
        </div>
        <button class="delete-btn" data-category="${cat}"><i class="ri-delete-bin-line"></i></button>
      `;
      manageCategoryList.appendChild(item);
    });

    manageCategoryList.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const catToDelete = btn.dataset.category;
        if (confirm(`确定要删除分类「${catToDelete}」及其所有网址吗？`)) {
          deleteCategory(catToDelete);
        }
      });
    });
  }

  function renderManageBookmarkList() {
    manageBookmarkList.innerHTML = '';
    const categories = currentBookmarkFilter === 'all'
      ? Object.keys(bookmarksData)
      : [currentBookmarkFilter];

    categories.forEach(cat => {
      if (!bookmarksData[cat]) return;
      const groupDiv = document.createElement('div');
      groupDiv.className = 'bookmark-group';

      const titleDiv = document.createElement('div');
      titleDiv.className = 'bookmark-group-title';
      titleDiv.innerHTML = `<i class="${getCategoryIcon(cat)}"></i> ${cat}`;
      groupDiv.appendChild(titleDiv);

      bookmarksData[cat].forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'bookmark-item-manage';
        itemDiv.innerHTML = `
          <div class="bookmark-item-info">
            <i class="${item.icon}"></i>
            <span class="name">${item.name}</span>
            <span class="url">${item.url}</span>
          </div>
          <button class="delete-btn" data-category="${cat}" data-index="${index}"><i class="ri-delete-bin-line"></i></button>
        `;
        groupDiv.appendChild(itemDiv);
      });

      manageBookmarkList.appendChild(groupDiv);
    });

    manageBookmarkList.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.category;
        const index = parseInt(btn.dataset.index);
        if (confirm(`确定要删除「${bookmarksData[cat][index].name}」吗？`)) {
          deleteBookmark(cat, index);
        }
      });
    });
  }

  function updateBookmarkFilterSelect() {
    const categories = Object.keys(bookmarksData);
    bookmarkFilterSelect.innerHTML = '';
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = '全部分类';
    bookmarkFilterSelect.appendChild(allOption);
    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      bookmarkFilterSelect.appendChild(option);
    });
    bookmarkFilterSelect.value = currentBookmarkFilter;
  }

  function updateCategorySelect() {
    const categories = Object.keys(bookmarksData);
    bookmarkCategorySelect.innerHTML = '';
    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      bookmarkCategorySelect.appendChild(option);
    });
  }

  function addCategory() {
    const name = newCategoryInput.value.trim();
    if (!name) {
      alert('请输入分类名称');
      return;
    }
    if (bookmarksData[name]) {
      alert('分类已存在');
      return;
    }
    bookmarksData[name] = [];
    saveBookmarks();
    newCategoryInput.value = '';
    renderManageCategoryList();
    window.renderCategories();
    updateCategorySelect();
  }

  function deleteCategory(category) {
    delete bookmarksData[category];
    if (activeCategory === category) {
      activeCategory = Object.keys(bookmarksData)[0];
    }
    saveBookmarks();
    renderManageCategoryList();
    renderManageBookmarkList();
    window.renderCategories();
    window.renderBookmarks(activeCategory);
    updateCategorySelect();
  }

  function addBookmark() {
    const category = bookmarkCategorySelect.value;
    const name = newBookmarkName.value.trim();
    const url = newBookmarkUrl.value.trim();
    const icon = 'ri-link';

    if (!name || !url) {
      alert('请输入网站名称和地址');
      return;
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      alert('请输入有效的网址（以 http:// 或 https:// 开头）');
      return;
    }

    bookmarksData[category].push({ name, url, icon });
    saveBookmarks();
    newBookmarkName.value = '';
    newBookmarkUrl.value = '';
    renderManageBookmarkList();
    window.renderBookmarks(activeCategory);
  }

  function deleteBookmark(category, index) {
    bookmarksData[category].splice(index, 1);
    saveBookmarks();
    renderManageBookmarkList();
    window.renderBookmarks(activeCategory);
  }

  closeModal.addEventListener('click', (e) => {
    e.stopPropagation();
    closeManageModal();
  });
  manageModal.addEventListener('click', (e) => {
    e.stopPropagation();
    if (e.target === manageModal) {
      closeManageModal();
    }
  });
  document.querySelector('.modal-content').addEventListener('click', (e) => {
    e.stopPropagation();
  });

  modalTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      modalTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      if (tab.dataset.tab === 'categories') {
        tabCategories.classList.remove('hidden');
        tabBookmarks.classList.add('hidden');
        tabData.classList.add('hidden');
      } else if (tab.dataset.tab === 'bookmarks') {
        tabCategories.classList.add('hidden');
        tabBookmarks.classList.remove('hidden');
        tabData.classList.add('hidden');
        updateBookmarkFilterSelect();
      } else if (tab.dataset.tab === 'data') {
        tabCategories.classList.add('hidden');
        tabBookmarks.classList.add('hidden');
        tabData.classList.remove('hidden');
      }
    });
  });

  addCategoryBtn.addEventListener('click', addCategory);
  newCategoryInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addCategory();
  });

  addBookmarkBtn.addEventListener('click', addBookmark);

  bookmarkFilterSelect.addEventListener('change', (e) => {
    currentBookmarkFilter = e.target.value;
    renderManageBookmarkList();
  });

  function exportData() {
    const dataStr = JSON.stringify(bookmarksData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lightnav-bookmarks.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function importData(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const importedData = JSON.parse(e.target.result);
        if (typeof importedData === 'object' && importedData !== null) {
          if (confirm('导入将覆盖当前所有数据，确定要继续吗？')) {
            bookmarksData = importedData;
            saveBookmarks();
            activeCategory = Object.keys(bookmarksData)[0];
            window.renderCategories();
            window.renderBookmarks(activeCategory);
            renderManageCategoryList();
            renderManageBookmarkList();
            updateCategorySelect();
            alert('导入成功！');
          }
        } else {
          alert('文件格式不正确');
        }
      } catch (err) {
        alert('文件读取失败：' + err.message);
      }
    };
    reader.readAsText(file);
  }

  function resetToDefault() {
    if (confirm('确定要恢复默认数据吗？这将覆盖当前所有自定义数据。')) {
      bookmarksData = JSON.parse(JSON.stringify(defaultBookmarksData));
      saveBookmarks();
      activeCategory = Object.keys(bookmarksData)[0];
      window.renderCategories();
      window.renderBookmarks(activeCategory);
      renderManageCategoryList();
      renderManageBookmarkList();
      updateCategorySelect();
      alert('已恢复默认数据！');
    }
  }

  exportBtn.addEventListener('click', exportData);
  importBtn.addEventListener('click', () => {
    importFileInput.click();
  });
  importFileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      importData(e.target.files[0]);
      e.target.value = '';
    }
  });
  resetBtn.addEventListener('click', resetToDefault);

  window.renderCategories();
  window.renderBookmarks(activeCategory);
})();
