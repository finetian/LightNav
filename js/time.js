/*
 * time.js
 * 时间与日期显示模块。
 * 每分钟更新一次，页面可见性变化时立即校正。
 */

(function() {
  const timeText = document.getElementById('timeText');
  const dateText = document.getElementById('dateText');

  // 更新时间和日期
  function updateDateTime() {
    const now = new Date();
    // 时间格式：HH:MM
    timeText.textContent = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    // 日期格式：X月X日 周X
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    dateText.textContent = `${month}月${day}日 ${weekdays[now.getDay()]}`;
  }

  // 立即执行一次
  updateDateTime();
  // 每分钟更新一次
  setInterval(updateDateTime, 60000);
  // 当页面从隐藏变为可见时，立即校正时间
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) updateDateTime();
  });
})();