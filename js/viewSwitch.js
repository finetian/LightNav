/*
 * viewSwitch.js
 * 控制上下区域切换（通过 transform 平移），并同步更新右下角按钮箭头。
 * 导航栏已固定半透明，无需额外样式切换。
 */

(function() {
  const viewContainer = document.getElementById('viewContainer');
  const scrollBtn = document.getElementById('scrollBtn');
  const scrollIcon = document.getElementById('scrollIcon');
  
  let isAtTop = true;   // true: 搜索区, false: 导航区

  // 切换视图函数（由右下角按钮调用）
  window.switchView = function(goToNav) {
    if (goToNav && isAtTop) {
      // 切换到导航区
      viewContainer.style.transform = 'translateY(-100vh)';
      scrollIcon.className = 'ri-arrow-up-line';
      scrollBtn.setAttribute('title', '返回顶部搜索');
      isAtTop = false;
    } else if (!goToNav && !isAtTop) {
      // 切换到搜索区
      viewContainer.style.transform = 'translateY(0)';
      scrollIcon.className = 'ri-arrow-down-line';
      scrollBtn.setAttribute('title', '向下浏览网址导航');
      isAtTop = true;
    }
  };

  // 点击右下角按钮执行切换
  scrollBtn.addEventListener('click', () => {
    window.switchView(isAtTop);
  });

  // 键盘支持：Enter 或 Space 触发
  scrollBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.switchView(isAtTop);
    }
  });

  // 触摸优化
  scrollBtn.addEventListener('touchstart', () => {}, { passive: true });
})();