/*
 * search.js
 * 搜索引擎切换与搜索执行模块。
 * 支持必应、谷歌、百度三个引擎，默认必应。
 * 支持搜索建议功能。
 */

(function() {
  const ENGINES = [
    { name: '必应', iconClass: 'ri-microsoft-line', searchUrl: 'https://www.bing.com/search?q=' },
    { name: '谷歌', iconClass: 'ri-google-line', searchUrl: 'https://www.google.com/search?q=' },
    { name: '百度', iconClass: 'ri-baidu-line', searchUrl: 'https://www.baidu.com/s?wd=' }
  ];

  let currentEngineIndex = 0;
  const engineBox = document.getElementById('engineSwitcher');
  const engineIcon = document.getElementById('engineIcon');
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchButton');
  const searchSuggestions = document.getElementById('searchSuggestions');

  let currentSuggestions = [];
  let highlightedIndex = -1;
  let debounceTimer = null;
  let isSuggestionSelected = false;
  let currentScript = null;

  function updateEngineDisplay() {
    const engine = ENGINES[currentEngineIndex];
    engineIcon.className = engine.iconClass;
    engineBox.setAttribute('title', `点击切换搜索引擎 (当前: ${engine.name})`);
  }

  function switchEngine() {
    currentEngineIndex = (currentEngineIndex + 1) % ENGINES.length;
    updateEngineDisplay();
    searchInput.focus();
  }

  function performSearch(query) {
    const searchQuery = query || searchInput.value.trim();
    if (!searchQuery) {
      searchInput.style.boxShadow = 'inset 0 1px 4px rgba(200, 30, 30, 0.1), 0 0 0 3px rgba(255, 120, 120, 0.25)';
      searchInput.style.borderColor = 'rgba(255, 100, 100, 0.6)';
      setTimeout(() => {
        searchInput.style.boxShadow = '';
        searchInput.style.borderColor = '';
      }, 250);
      searchInput.focus();
      return;
    }
    hideSuggestions();
    window.location.href = ENGINES[currentEngineIndex].searchUrl + encodeURIComponent(searchQuery);
  }

  function removeCurrentScript() {
    if (currentScript) {
      currentScript.remove();
      currentScript = null;
    }
  }

  function fetchSuggestions(query) {
    if (!query || query.length < 1) {
      hideSuggestions();
      return;
    }

    removeCurrentScript();
    const engineIndex = currentEngineIndex;

    if (engineIndex === 0) {
      fetchBingSuggestions(query, engineIndex);
    } else if (engineIndex === 1) {
      fetchGoogleSuggestions(query, engineIndex);
    } else {
      fetchBaiduSuggestions(query, engineIndex);
    }
  }

  function fetchBingSuggestions(query, engineIndex) {
    window.bing = {
      sug: function(data) {
        if (currentEngineIndex !== engineIndex) return;

        const suggestions = [];
        if (data && data.AS && data.AS.Results) {
          data.AS.Results.forEach(function(item) {
            if (item.Suggests) {
              item.Suggests.forEach(function(sug) {
                suggestions.push(sug.Txt);
              });
            }
          });
        }

        currentSuggestions = suggestions.slice(0, 8);
        renderSuggestions(currentSuggestions);
      }
    };

    currentScript = document.createElement('script');
    currentScript.src = 'https://api.bing.com/qsonhs.aspx?type=cb&q=' + encodeURIComponent(query) + '&cb=window.bing.sug';
    currentScript.onerror = function() {
      removeCurrentScript();
      if (currentEngineIndex === engineIndex) {
        currentSuggestions = [];
        hideSuggestions();
      }
    };
    document.head.appendChild(currentScript);

    setTimeout(function() {
      if (currentEngineIndex === engineIndex && currentSuggestions.length === 0) {
        removeCurrentScript();
        hideSuggestions();
      }
    }, 3000);
  }

  function fetchGoogleSuggestions(query, engineIndex) {
    window.google = {
      ac: {
        h: function(data) {
          if (currentEngineIndex !== engineIndex) return;

          const suggestions = [];
          if (data && data[1]) {
            data[1].forEach(function(item) {
              if (item[0]) suggestions.push(item[0]);
            });
          }

          currentSuggestions = suggestions.slice(0, 8);
          renderSuggestions(currentSuggestions);
        }
      }
    };

    currentScript = document.createElement('script');
    currentScript.src = 'https://suggestqueries.google.com/complete/search?client=youtube&q=' + encodeURIComponent(query) + '&jsonp=window.google.ac.h';
    currentScript.onerror = function() {
      removeCurrentScript();
      if (currentEngineIndex === engineIndex) {
        currentSuggestions = [];
        hideSuggestions();
      }
    };
    document.head.appendChild(currentScript);

    setTimeout(function() {
      if (currentEngineIndex === engineIndex && currentSuggestions.length === 0) {
        removeCurrentScript();
        hideSuggestions();
      }
    }, 3000);
  }

  function fetchBaiduSuggestions(query, engineIndex) {
    window.baidu = {
      sug: function(data) {
        if (currentEngineIndex !== engineIndex) return;

        const suggestions = [];
        if (data && data.s) {
          data.s.forEach(function(item) {
            suggestions.push(item);
          });
        }

        currentSuggestions = suggestions.slice(0, 8);
        renderSuggestions(currentSuggestions);
      }
    };

    currentScript = document.createElement('script');
    currentScript.src = 'https://suggestion.baidu.com/su?wd=' + encodeURIComponent(query) + '&cb=window.baidu.sug';
    currentScript.onerror = function() {
      removeCurrentScript();
      if (currentEngineIndex === engineIndex) {
        currentSuggestions = [];
        hideSuggestions();
      }
    };
    document.head.appendChild(currentScript);

    setTimeout(function() {
      if (currentEngineIndex === engineIndex && currentSuggestions.length === 0) {
        removeCurrentScript();
        hideSuggestions();
      }
    }, 3000);
  }

  function renderSuggestions(suggestions) {
    searchSuggestions.innerHTML = '';

    if (suggestions.length === 0) {
      hideSuggestions();
      return;
    }

    suggestions.forEach(function(text, index) {
      var item = document.createElement('div');
      item.className = 'suggestion-item';
      item.innerHTML = '<i class="ri-search-line"></i><span>' + escapeHtml(text) + '</span><i class="ri-arrow-right-line search-icon"></i>';

      item.addEventListener('click', function() {
        selectSuggestion(index);
      });

      item.addEventListener('mouseenter', function() {
        setHighlight(index);
      });

      searchSuggestions.appendChild(item);
    });

    highlightedIndex = -1;
    searchSuggestions.classList.add('active');
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function setHighlight(index) {
    var items = searchSuggestions.querySelectorAll('.suggestion-item');
    items.forEach(function(item) {
      item.classList.remove('highlighted');
    });

    if (index >= 0 && index < items.length) {
      items[index].classList.add('highlighted');
      highlightedIndex = index;
    } else {
      highlightedIndex = -1;
    }
  }

  function selectSuggestion(index) {
    if (index >= 0 && index < currentSuggestions.length) {
      isSuggestionSelected = true;
      searchInput.value = currentSuggestions[index];
      hideSuggestions();
      performSearch(currentSuggestions[index]);
    }
  }

  function hideSuggestions() {
    searchSuggestions.classList.remove('active');
    searchSuggestions.innerHTML = '';
    currentSuggestions = [];
    highlightedIndex = -1;
    removeCurrentScript();
  }

  function handleKeyDown(e) {
    var items = searchSuggestions.querySelectorAll('.suggestion-item');
    var itemCount = items.length;

    if (!searchSuggestions.classList.contains('active') || itemCount === 0) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentSuggestions.length > 0) {
          searchSuggestions.classList.add('active');
          highlightedIndex = -1;
        }
        return;
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      var newIndex = highlightedIndex < itemCount - 1 ? highlightedIndex + 1 : 0;
      setHighlight(newIndex);
      items[newIndex].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      var newIndex = highlightedIndex > 0 ? highlightedIndex - 1 : itemCount - 1;
      setHighlight(newIndex);
      items[newIndex].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0) {
        selectSuggestion(highlightedIndex);
      } else {
        performSearch();
      }
    } else if (e.key === 'Escape') {
      hideSuggestions();
    }
  }

  function handleInput() {
    if (isSuggestionSelected) {
      isSuggestionSelected = false;
      return;
    }

    var query = searchInput.value.trim();

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function() {
      fetchSuggestions(query);
    }, 200);
  }

  engineBox.addEventListener('click', function(e) {
    e.stopPropagation();
    switchEngine();
  });

  engineBox.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      switchEngine();
    }
  });

  searchBtn.addEventListener('click', function(e) {
    e.preventDefault();
    performSearch();
  });

  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      performSearch();
    } else {
      handleKeyDown(e);
    }
  });

  searchInput.addEventListener('input', handleInput);

  searchInput.addEventListener('focus', function() {
    if (currentSuggestions.length > 0) {
      searchSuggestions.classList.add('active');
    }
  });

  document.body.addEventListener('click', function(e) {
    if (!e.target.closest('.search-bar') && !e.target.closest('.search-suggestions')) {
      hideSuggestions();
    }
  });

  document.querySelector('.modal-content').addEventListener('click', function(e) {
    e.stopPropagation();
  });

  updateEngineDisplay();

  engineBox.addEventListener('touchstart', function() {}, { passive: true });
})();