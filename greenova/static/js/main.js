(function (window, document) {
  'use strict';

  // Feature detection
  const supports = {
    touch: 'ontouchstart' in window,
    reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
    containerQueries: CSS.supports('container-type: inline-size'),
  };

  // Chart initialization with theme support
  const initializeChart = (element, config) => {
    if (!element || !(element instanceof HTMLCanvasElement)) return null;

    const isDark = document.documentElement.dataset.theme === 'dark';
    const textColor = isDark ? '#fff' : '#000';

    const defaultConfig = {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: textColor,
              padding: 20,
            },
          },
        },
      },
    };

    return new Chart(element, { ...defaultConfig, ...config });
  };

  // Initialize lazy-loaded charts
  const initializeLazyCharts = () => {
    document.querySelectorAll('[data-chart]').forEach((canvas) => {
      if (!canvas.initialized && canvas instanceof HTMLCanvasElement) {
        const config = JSON.parse(canvas.dataset.chart);
        canvas.initialized = true;
        initializeChart(canvas, config);
      }
    });
  };

  // HTMX event handlers
  document.body.addEventListener('htmx:configRequest', (event) => {
    const token = document.querySelector('[name=csrfmiddlewaretoken]')?.value;
    if (token) {
      event.detail.headers['X-CSRFToken'] = token;
    }
  });

  document.body.addEventListener('htmx:afterSwap', (event) => {
    if (event.detail.target.querySelector('[data-chart]')) {
      initializeLazyCharts();
    }
  });

  // Responsive chart handling
  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const chart = entry.target.chart;
        if (chart) {
          chart.resize();
        }
      });
    });

    document.querySelectorAll('[data-chart]').forEach((el) => {
      ro.observe(el);
    });
  }

  // Initialize on page load
  document.addEventListener(
    'DOMContentLoaded',
    () => {
      initializeLazyCharts();

      // Add reduced motion class if needed
      if (supports.reducedMotion) {
        document.body.classList.add('reduce-motion');
      }
    },
    { once: true, passive: true }
  );
})(window, document);
