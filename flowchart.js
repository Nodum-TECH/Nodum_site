
// Load scenarios data
let SCENARIOS = [];

// Load scenarios from data.json
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    SCENARIOS = data;
    // Автоматически рендерим все flowcharts при загрузке данных
    SCENARIOS.forEach(scenario => {
      renderReactFlowchart(scenario.id);
    });
  })
  .catch(error => {
    console.error('Error loading scenarios:', error);
  });

window.renderReactFlowchart = function(scenarioId) {
  const domNode = document.getElementById('react-flowchart-container');
  if (!domNode) return;
  
  // Очищаем контейнер
  domNode.innerHTML = '';
  
  // Проверяем наличие SVG файла для сценария
  const svgFileName = `images/flow/${scenarioId}.svg`;
  
  // Создаем img элемент для проверки загрузки SVG
  const img = new Image();
  img.onload = function() {
    // SVG файл существует, используем его
    renderSVGImage(svgFileName, domNode);
  };
  img.onerror = function() {
    // SVG файл не найден, используем динамический flowchart
    // Wait a bit for data to load, then render
    setTimeout(() => {
      renderDynamicFlowchart(scenarioId, domNode);
    }, 100);
  };
  
  // Начинаем загрузку SVG
  img.src = svgFileName;
};

// Функция для отображения SVG изображения
function renderSVGImage(svgPath, domNode) {
  // Создаем контейнер для SVG с правильными стилями
  const svgContainer = document.createElement('div');
  svgContainer.style.width = '100%';
  svgContainer.style.display = 'flex';
  svgContainer.style.justifyContent = 'center';
  svgContainer.style.alignItems = 'center';
  svgContainer.style.overflow = 'visible';
  svgContainer.style.minHeight = '200px';
  
  // Создаем img элемент для SVG
  const img = document.createElement('img');
  img.src = svgPath;
  img.style.width = '100%';
  img.style.maxWidth = '600px';
  img.style.height = 'auto';
  img.style.display = 'block';
  
  svgContainer.appendChild(img);
  domNode.appendChild(svgContainer);
}

// Функция для отображения динамического flowchart
function renderDynamicFlowchart(scenarioId, domNode) {
  const scenario = SCENARIOS.find(s => s.id === scenarioId);
  if (!scenario) return;
  
  // Показываем сообщение, что SVG файл не найден
  const message = document.createElement('div');
  message.style.textAlign = 'center';
  message.style.padding = '20px';
  message.style.color = '#666';
  message.innerHTML = `<p>Flowchart для "${scenario.title}" не найден</p>`;
  domNode.appendChild(message);
}
