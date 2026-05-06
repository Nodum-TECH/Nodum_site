const SCENARIOS =[
  {
    id: "faq",
    flow: {
      nodes:[
        { id: "q", label: "Вопрос\nклиента", color: "#1e3a5f" },
        { id: "ai", label: "AI ищет\nв базе знаний", color: "#1A5FA8", diamond: true },
        { id: "found", label: "Ответ\nнайден", color: "#0d3320" },
        { id: "notfound", label: "Не\nнайдено", color: "#2a1f1f" },
        { id: "reply", label: "Ответ +\nисточник", color: "#0d3320" },
        { id: "manager", label: "Передать\nменеджеру", color: "#3a2a0a" }
      ],
      edges:[
        { from: "q", to: "ai" },
        { from: "ai", to: "found", label: "Есть" },
        { from: "ai", to: "notfound", label: "Нет" },
        { from: "found", to: "reply" },
        { from: "notfound", to: "manager" }
      ],
      accent: "#1A5FA8",
      layout: { q:[70,80], ai:[220,80], found:[355,50], notfound:[355,115], reply:[490,50], manager:[490,115] }
    }
  },
  {
    id: "leads",
    flow: {
      nodes:[
        { id: "msg", label: "Сообщение\nклиента", color: "#1e3a5f" },
        { id: "ai", label: "AI уточняет\nзадачу", color: "#1A5FA8", diamond: true },
        { id: "dialog", label: "Диалог\nс клиентом", color: "#1e3a5f" },
        { id: "lead", label: "Лид\nготов", color: "#0d3320" },
        { id: "crm", label: "Карточка\nв CRM", color: "#0d3320" },
        { id: "notify", label: "Уведомление\nменеджеру", color: "#1e2a0a" },
      ],
      edges:[
        { from: "msg", to: "ai" },
        { from: "ai", to: "dialog", label: "Уточнение" },
        { from: "dialog", to: "ai" },
        { from: "ai", to: "lead", label: "Готово" },
        { from: "lead", to: "crm" },
        { from: "crm", to: "notify" },
      ],
      accent: "#1A5FA8",
      layout: { msg:[65,80], ai:[210,80], dialog:[340,45], lead:[340,115], crm:[470,115], notify:[470,45] },
    }
  },
  {
    id: "schedule",
    flow: {
      nodes:[
        { id: "client", label: "Клиент\nвыбирает услугу", color: "#1e3a5f" },
        { id: "ai", label: "AI показывает\nсвободные слоты", color: "#27500A", diamond: true },
        { id: "book", label: "Клиент\nбронирует", color: "#1e3a5f" },
        { id: "confirm", label: "Подтверждение\nклиенту", color: "#0d3320" },
        { id: "remind", label: "Напоминание\nнакануне", color: "#0d3320" },
        { id: "master", label: "Уведомление\nмастеру", color: "#1e2a0a" },
      ],
      edges:[
        { from: "client", to: "ai" },
        { from: "ai", to: "book" },
        { from: "book", to: "confirm" },
        { from: "book", to: "master" },
        { from: "confirm", to: "remind" },
      ],
      accent: "#27500A",
      layout: { client:[70,80], ai:[210,80], book:[350,80], confirm:[475,45], master:[475,115], remind:[590,45] },
    }
  },
  {
    id: "winback",
    flow: {
      nodes:[
        { id: "gone", label: "Клиент\nпропал", color: "#3a2000" },
        { id: "ai", label: "AI возвращается\nи выясняет", color: "#B06A10", diamond: true },
        { id: "simple", label: "Типовое\nвозражение", color: "#2a1a00" },
        { id: "complex", label: "Сложная\nситуация", color: "#2a1f1f" },
        { id: "answer", label: "AI отвечает\nна возражение", color: "#0d3320" },
        { id: "handoff", label: "Сотрудник +\nистория диалога", color: "#1e2a0a" },
      ],
      edges:[
        { from: "gone", to: "ai" },
        { from: "ai", to: "simple", label: "Стандарт" },
        { from: "ai", to: "complex", label: "Нестандарт" },
        { from: "simple", to: "answer" },
        { from: "complex", to: "handoff" },
      ],
      accent: "#B06A10",
      layout: { gone:[70,80], ai:[220,80], simple:[360,45], complex:[360,115], answer:[500,45], handoff:[500,115] },
    }
  },
  {
    id: "assistant",
    flow: {
      nodes:[
        { id: "group", label: "Групповой\nчат", color: "#2a1e5f" },
        { id: "personal", label: "Личные\nсообщения", color: "#2a1e5f" },
        { id: "ai", label: "AI-ассистент\nв Telegram", color: "#4A43B0", diamond: true },
        { id: "answer", label: "Ответ\nна вопрос", color: "#0d3320" },
        { id: "task", label: "Фиксация\nзадачи", color: "#0d3320" },
        { id: "remind", label: "Напоминание\nсотруднику", color: "#1e2a4a" },
      ],
      edges:[
        { from: "group", to: "ai" },
        { from: "personal", to: "ai" },
        { from: "ai", to: "answer" },
        { from: "ai", to: "task" },
        { from: "ai", to: "remind" },
      ],
      accent: "#4A43B0",
      layout: { group:[80,45], personal:[80,115], ai:[240,80], answer:[390,35], task:[390,80], remind:[390,125] },
    }
  }
];

function getExit(layout, id, toId, diamond) {
  const p = layout[id], t = layout[toId];
  if (!p || !t) return p ||[0, 0];
  const dx = t[0] - p[0], dy = t[1] - p[1];
  if (diamond) {
    return Math.abs(dx) > Math.abs(dy)
      ? (dx > 0 ? [p[0] + 35, p[1]] : [p[0] - 35, p[1]])
      : (dy > 0 ? [p[0], p[1] + 35] : [p[0], p[1] - 35]);
  }
  return Math.abs(dx) > Math.abs(dy)
    ? (dx > 0 ? [p[0] + 65, p[1]] : [p[0] - 65, p[1]])
    : (dy > 0 ? [p[0], p[1] + 28] : [p[0], p[1] - 28]);
}

function getEntry(layout, id, fromId, diamond) {
  const p = layout[id], f = layout[fromId];
  if (!p || !f) return p || [0, 0];
  const dx = p[0] - f[0], dy = p[1] - f[1];
  if (diamond) {
    return Math.abs(dx) > Math.abs(dy)
      ? (dx > 0 ? [p[0] - 35, p[1]] : [p[0] + 35, p[1]])
      : (dy > 0 ? [p[0], p[1] - 35] : [p[0], p[1] + 35]);
  }
  return Math.abs(dx) > Math.abs(dy)
    ? (dx > 0 ? [p[0] - 65, p[1]] : [p[0] + 65, p[1]])
    : (dy > 0 ? [p[0], p[1] - 28] :[p[0], p[1] + 28]);
}

const STROKE_MAP = {
  "#1A5FA8": "#4a9de0",
  "#27500A": "#5aaa2a",
  "#B06A10": "#e09a30",
  "#4A43B0": "#8a83e0",
};

function renderFlowchart(flow) {
  const { layout, nodes, edges, accent } = flow;
  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));
  const mid = accent.replace("#", "");
  
  // Создаем SVG элемент
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('viewBox', '0 0 640 168');
  svg.style.minWidth = '600px';
  svg.style.overflow = 'visible';
  svg.style.maxWidth = '100%';
  
  // Создаем defs с маркером
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
  marker.setAttribute('id', `m${mid}`);
  marker.setAttribute('markerWidth', '7');
  marker.setAttribute('markerHeight', '7');
  marker.setAttribute('refX', '3');
  marker.setAttribute('refY', '3.5');
  marker.setAttribute('orient', 'auto');
  
  const markerPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  markerPath.setAttribute('d', 'M0,1 L6,3.5 L0,6 Z');
  markerPath.setAttribute('fill', 'rgba(255,255,255,0.3)');
  
  marker.appendChild(markerPath);
  defs.appendChild(marker);
  svg.appendChild(defs);
  
  // Рендерим ребра
  edges.forEach((e, i) => {
    const fn = nodeMap[e.from];
    const tn = nodeMap[e.to];
    if (!fn || !tn || !layout[e.from] || !layout[e.to]) return;
    
    const [x1, y1] = getExit(layout, e.from, e.to, fn.diamond);
    const [x2, y2] = getEntry(layout, e.to, e.from, tn.diamond);
    
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', 'rgba(255,255,255,0.2)');
    line.setAttribute('stroke-width', '1.5');
    line.setAttribute('stroke-dasharray', '4 2');
    line.setAttribute('marker-end', `url(#m${mid})`);
    
    g.appendChild(line);
    
    if (e.label) {
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', (x1 + x2) / 2 + 5);
      text.setAttribute('y', (y1 + y2) / 2 - 5);
      text.setAttribute('fill', 'rgba(255,255,255,0.6)');
      text.setAttribute('font-size', '10');
      text.textContent = e.label;
      g.appendChild(text);
    }
    
    svg.appendChild(g);
  });
  
  // Рендерим узлы
  nodes.forEach(node => {
    const pos = layout[node.id];
    if (!pos) return;
    
    const [cx, cy] = pos;
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    
    if (node.diamond) {
      const s = 70;
      const sc = STROKE_MAP[node.color] || "#4a9de0";
      
      const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      polygon.setAttribute('points', `${cx},${cy - s / 2} ${cx + s / 2},${cy} ${cx},${cy + s / 2} ${cx - s / 2},${cy}`);
      polygon.setAttribute('fill', node.color);
      polygon.setAttribute('stroke', sc);
      polygon.setAttribute('stroke-width', '1.5');
      g.appendChild(polygon);
      
      // Добавляем текст для ромба
      node.label.split("\n").forEach((l, i, a) => {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', cx);
        text.setAttribute('y', cy + (i - (a.length - 1) / 2) * 10);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('fill', '#fff');
        text.setAttribute('font-size', '10');
        text.setAttribute('font-weight', '500');
        text.textContent = l;
        g.appendChild(text);
      });
    } else {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', cx - 65);
      rect.setAttribute('y', cy - 28);
      rect.setAttribute('width', 130);
      rect.setAttribute('height', 56);
      rect.setAttribute('rx', '6');
      rect.setAttribute('fill', node.color);
      rect.setAttribute('stroke', 'rgba(255,255,255,0.09)');
      rect.setAttribute('stroke-width', '1');
      g.appendChild(rect);
      
      // Добавляем текст для прямоугольника
      node.label.split("\n").forEach((l, i, a) => {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', cx);
        text.setAttribute('y', cy + (i - (a.length - 1) / 2) * 11);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('fill', '#ffffff');
        text.setAttribute('font-size', '10');
        text.textContent = l;
        g.appendChild(text);
      });
    }
    
    svg.appendChild(g);
  });
  
  return svg;
}

window.renderReactFlowchart = function(scenarioId) {
  const scenario = SCENARIOS.find(s => s.id === scenarioId);
  if (!scenario) return;
  
  const domNode = document.getElementById('react-flowchart-container');
  if (!domNode) return;
  
  // Очищаем контейнер
  domNode.innerHTML = '';
  
  // Создаем и добавляем SVG
  const svg = renderFlowchart(scenario.flow);
  domNode.appendChild(svg);
};
