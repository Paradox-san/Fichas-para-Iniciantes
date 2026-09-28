/* ============================================================
   MESA DOS HERÓIS — FICHA DE PERSONAGEM D&D 5E
   script.js — organizado em seções numeradas
   ============================================================ */

/* ===== 1. CONFIG (EDITÁVEL PELO MESTRE) ===== */
const CONFIG = {
  players: [
    {
      id: 'p1',
      name: 'Karol',
      password: 'presas',
      characterName: 'Nemira Lusehein',
      race: 'Tiefling',
      class: 'Ladina 2',
      levelDisplay: 'Nível 2',
      allowedSkills: [
        'Acrobacia', 'Atletismo', 'Enganação', 'Furtividade', 'Intimidação',
        'Intuição', 'Investigação', 'Percepção', 'Persuasão', 'Prestidigitação'
      ],
      reqSkills: 6
    },
    {
      id: 'p2',
      name: 'Jô',
      password: 'pacto',
      characterName: 'Mihan Kaspregg',
      race: 'Assimar',
      class: 'Bruxo 2',
      levelDisplay: 'Nível 2',
      allowedSkills: [
        'Arcanismo', 'Enganação', 'História', 'Intimidação',
        'Investigação', 'Natureza', 'Religião'
      ],
      reqSkills: 4,
      spellcasting: { list: 'bruxo', cantrips: 2, level1: 3 }
    },
    {
      id: 'p3',
      name: 'Juh',
      password: 'legado',
      characterName: 'Alura Elaria',
      race: 'Elfa',
      class: 'Nobre 2 (adaptada de Tormenta)',
      levelDisplay: 'Nível 2',
      allowedSkills: [
        'História', 'Intuição', 'Investigação', 'Medicina',
        'Percepção', 'Persuasão', 'Enganação', 'Religião'
      ],
      reqSkills: 6
    },
    {
      id: 'p4',
      name: 'Daniel',
      password: 'floresta',
      characterName: 'Kaleo',
      race: 'Humano',
      class: 'Patrulheiro 1 / Druida 1 (multiclasse)',
      levelDisplay: 'Nível 2 (Multiclasse)',
      allowedSkills: [
        'Atletismo', 'Furtividade', 'Intuição', 'Investigação',
        'Lidar com Animais', 'Natureza', 'Percepção', 'Sobrevivência'
      ],
      reqSkills: 5,
      spellcasting: { list: 'druida', cantrips: 2, level1: 3 }
    },
    {
      id: 'p5',
      name: 'Thalyson',
      password: 'acidente',
      characterName: 'Almondega Sexy',
      race: '?', // Livre para escolher
      class: 'Mago 2',
      levelDisplay: 'Nível 2',
      allowedSkills: [
        'Arcanismo', 'História', 'Intuição', 'Investigação',
        'Medicina', 'Natureza', 'Religião'
      ],
      reqSkills: 4,
      spellcasting: { list: 'mago', cantrips: 3, level1: 4 }
    }
  ],

  // Explicação dos 6 Atributos (1-2 frases)
  attrExplanations: {
    FOR: 'Poder físico e muscular: ataques corpo a corpo, capacidade de carga e testes como Atletismo.',
    DES: 'Agilidade, reflexos e equilíbrio: iniciativa, classe de armadura e perícias como Furtividade e Acrobacia.',
    CON: 'Saúde, vigor e resistência física: define seus Pontos de Vida (PV) e resistência a venenos ou fadiga.',
    INT: 'Raciocínio, memória e conhecimento acadêmico: perícias como Arcanismo, História e Investigação.',
    SAB: 'Percepção do ambiente, intuição e empatia: notar perigos, sentir mentiras e perícias como Percepção e Intuição.',
    CAR: 'Força de personalidade, eloquência e liderança: convencer, enganar, intimidar e presença social.'
  },

  allSkills: [
    { name: 'Acrobacia', attr: 'DES', desc: 'Manter o equilíbrio em superfícies estreitas, correr no gelo ou realizar piruetas e acrobacias.' },
    { name: 'Arcanismo', attr: 'INT', desc: 'Recordar conhecimentos sobre magias, itens mágicos, símbolos arcanos e planos de existência.' },
    { name: 'Atletismo', attr: 'FOR', desc: 'Escalar encostas íngremes, saltar abismos, nadar em correntes fortes ou arrombar portas.' },
    { name: 'Atuação', attr: 'CAR', desc: 'Realizar apresentações musicais, peças de teatro, danças ou entreter um público.' },
    { name: 'Enganação', attr: 'CAR', desc: 'Mentir com convicção, disfarçar intenções, enganar guardas ou se passar por outra pessoa.' },
    { name: 'Furtividade', attr: 'DES', desc: 'Mover-se em silêncio absoluto e se esconder nas sombras para não ser visto nem ouvido.' },
    { name: 'História', attr: 'INT', desc: 'Lembrar-se de fatos históricos, guerras antigas, reis, lendas e eventos do passado.' },
    { name: 'Intimidação', attr: 'CAR', desc: 'Ameaçar ou coagir outras pessoas através de força física, olhar ameaçador ou palavras duras.' },
    { name: 'Intuição', attr: 'SAB', desc: 'Sentir se alguém está mentindo, prever o próximo passo de um suspeito ou ler linguagem corporal.' },
    { name: 'Investigação', attr: 'INT', desc: 'Procurar pistas escondidas, examinar detalhes de uma cena de crime ou deduzir mecanismos ocultos.' },
    { name: 'Lidar com Animais', attr: 'SAB', desc: 'Acalmar feras assustadas, adestrar montarias, guiar animais e prever suas reações.' },
    { name: 'Medicina', attr: 'SAB', desc: 'Estabilizar aliados moribundos na batalha, diagnosticar doenças e tratar ferimentos.' },
    { name: 'Natureza', attr: 'INT', desc: 'Conhecimento acadêmico e prático sobre fauna, flora, plantas medicinais, clima e terrenos.' },
    { name: 'Percepção', attr: 'SAB', desc: 'Escutar ruídos sutis, notar emboscadas, enxergar coisas escondidas e sentir perigos no ambiente.' },
    { name: 'Persuasão', attr: 'CAR', desc: 'Convencer pessoas de forma diplomática, negociar acordos e propor alianças de boa-fé.' },
    { name: 'Prestidigitação', attr: 'DES', desc: 'Bater carteiras, trancar/destrancar fechos com agilidade e realizar truques de mãos.' },
    { name: 'Religião', attr: 'INT', desc: 'Conhecimento sobre divindades, ordens sagradas, rituais, dogmas e símbolos religiosos.' },
    { name: 'Sobrevivência', attr: 'SAB', desc: 'Rastrear pegadas, caçar caça selvagem, guiar o grupo pela selva e evitar perigos naturais.' }
  ]
};

/* ===== 1.1 LISTAS DE MAGIAS (EDITÁVEL PELO MESTRE) ===== */
const SPELL_LISTS = {
  bruxo: {
    cantrips: [
      { name: 'Raio de Fogo', desc: 'Seu ataque assinatura: feixe de energia à distância (1d10).' },
      { name: 'Prestidigitação', desc: 'Truques simples: acender velas, esfriar bebidas, criar cheiros e ilusões.' },
      { name: 'Toque Arrepiante', desc: 'Mão espectral à distância que impede o alvo de se curar por um tempo.' },
      { name: 'Ilusão Menor', desc: 'Imagem ou som ilusório pequeno — perfeito para enganar e distrair.' },
      { name: 'Luz', desc: 'Faz um objeto brilhar como lanterna, iluminando lugares escuros.' },
      { name: 'Reparo Menor', desc: 'Conserta pequenos objetos quebrados: correntes, fechaduras, fivelas.' }
    ],
    level1: [
      { name: 'Maldição (Hex)', desc: 'Amaldiçoa um inimigo: sofre dano extra dos seus ataques e piora em uma habilidade.' },
      { name: 'Comando', desc: 'Ordem de uma palavra que o alvo é obrigado a obedecer ("pare!", "caia!").' },
      { name: 'Enfeitiçar Pessoa', desc: 'Faz um humanoide ver você como amigo confiável — ótimo para evitar brigas.' },
      { name: 'Onda Trovejante', desc: 'Onda trovejante que empurra e derruba inimigos próximos.' },
      { name: 'Ilusão Disfarçada', desc: 'Muda sua aparência por 1 hora: roupas, cabelo e traços do rosto.' },
      { name: 'Sono', desc: 'Faz criaturas fracas adormecerem — indefesas até serem acordadas.' }
    ]
  },
  mago: {
    cantrips: [
      { name: 'Raio de Gelo', desc: 'Feixe congelante que fere e deixa o alvo mais lento.' },
      { name: 'Mão Mágica', desc: 'Mão espectral invisível que abre portas, pega objetos e explora à distância.' },
      { name: 'Prestidigitação', desc: 'Truques simples: acender velas, esfriar bebidas, criar cheiros e ilusões.' },
      { name: 'Ilusão Menor', desc: 'Imagem ou som ilusório pequeno — perfeito para enganar e distrair.' },
      { name: 'Toque Chocante', desc: 'Descarga elétrica no toque; alvos de metal ficam incapazes de reagir.' },
      { name: 'Luz', desc: 'Faz um objeto brilhar como lanterna, iluminando lugares escuros.' },
      { name: 'Toque Arrepiante', desc: 'Mão espectral à distância que impede o alvo de se curar por um tempo.' }
    ],
    level1: [
      { name: 'Escudo Arcano', desc: 'Barreira instantânea: +5 na defesa e imunidade a Mísseis Mágicos (reação).' },
      { name: 'Mísseis Mágicos', desc: 'Três dardos de energia que NUNCA erram o alvo (3d4+3 garantidos).' },
      { name: 'Sono', desc: 'Faz criaturas fracas adormecerem — indefesas até serem acordadas.' },
      { name: 'Detectar Magia', desc: 'Sente magia ao redor e identifica itens e criaturas encantadas.' },
      { name: 'Enfeitiçar Pessoa', desc: 'Faz um humanoide ver você como amigo confiável — ótimo para evitar brigas.' },
      { name: 'Onda Trovejante', desc: 'Onda trovejante que empurra e derruba inimigos próximos.' },
      { name: 'Feixe Ardente', desc: 'Cone de fogo que queima todos em frente a você (3d6).' }
    ]
  },
  druida: {
    cantrips: [
      { name: 'Druidismo', desc: 'Magia da natureza: prevê o tempo, acende fogueiras e faz flores brotarem.' },
      { name: 'Toque Ardente', desc: 'Chama na sua mão que ilumina e pode ser arremessada como ataque.' },
      { name: 'Raio Envenenado', desc: 'Nuvem de veneno à distância que corrói o alvo (1d12).' },
      { name: 'Moldar Água', desc: 'Controla água: agitar, congelar em gelo ou redirecionar o fluxo.' },
      { name: 'Reparo Menor', desc: 'Conserta pequenos objetos quebrados: correntes, fechaduras, fivelas.' }
    ],
    level1: [
      { name: 'Curar Ferimentos', desc: 'Cura um aliado tocado (1d8 + mod. de Sabedoria) e estabiliza moribundos.' },
      { name: 'Bênção', desc: 'Abençoa até 3 aliados: somam 1d4 em ataques e salvaguardas por 1 minuto.' },
      { name: 'Enredar', desc: 'Vinhas brotam do chão e prendem quem passar pela área.' },
      { name: 'Amizade com Animais', desc: 'Convence uma fera a se aproximar e te ver como amigo — calma e paciência ajudam.' },
      { name: 'Nevoeiro', desc: 'Nuvem de névoa que esconde o grupo dos olhares inimigos.' },
      { name: 'Palavra Curativa', desc: 'Cura rápida à distância (1d4+mod.) — lançada como reação.' }
    ]
  }
};

/* ===== 2. DADOS AUXILIARES ===== */
const SKILL_ICONS = {
  'Acrobacia': 'ico-star',
  'Arcanismo': 'ico-book',
  'Atletismo': 'ico-swords',
  'Atuação': 'ico-mask',
  'Enganação': 'ico-mask',
  'Furtividade': 'ico-eye',
  'História': 'ico-book',
  'Intimidação': 'ico-swords',
  'Intuição': 'ico-eye',
  'Investigação': 'ico-search',
  'Lidar com Animais': 'ico-paw',
  'Medicina': 'ico-shield',
  'Natureza': 'ico-paw',
  'Percepção': 'ico-eye',
  'Persuasão': 'ico-crown',
  'Prestidigitação': 'ico-star',
  'Religião': 'ico-book',
  'Sobrevivência': 'ico-paw'
};

const POINT_BUY_COSTS = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 6, 15: 7, 16: 8, 17: 9, 18: 10, 19: 11, 20: 12 };
const AVAILABLE_RACES = [
  'Humano', 'Elfo', 'Elfa', 'Anão', 'Halfling',
  'Draconato', 'Gnomo', 'Meio-Elfo', 'Meio-Orc',
  'Tiefling', 'Assimar'
];

const ATTR_FULL_NAMES = {
  FOR: 'Força',
  DES: 'Destreza',
  CON: 'Constituição',
  INT: 'Inteligência',
  SAB: 'Sabedoria',
  CAR: 'Carisma'
};

/* ===== 3. ESTADO ===== */
let currentUser = null;
let previousScreen = 'login';
let sheetData = {
  name: '',
  race: '',
  class: '',
  level: 'Nível 2',
  method: 'roll',
  attributes: { FOR: 10, DES: 10, CON: 10, INT: 10, SAB: 10, CAR: 10 },
  selectedSkills: [],
  rollAttemptsLeft: 3,
  lastRolledValues: [10, 10, 10, 10, 10, 10],
  rollAssignments: { FOR: null, DES: null, CON: null, INT: null, SAB: null, CAR: null },
  standardAssignments: { FOR: null, DES: null, CON: null, INT: null, SAB: null, CAR: null },
  spells: { cantrips: [], level1: [] }
};

/* ===== 4. INICIALIZAÇÃO ===== */
document.addEventListener('DOMContentLoaded', () => {
  populateLoginDropdown();
  renderGuideSkills();
  const activeUserId = localStorage.getItem('dnd_active_user_id');
  if (activeUserId) {
    const player = CONFIG.players.find(p => p.id === activeUserId);
    if (player) {
      currentUser = player;
      loadSavedSheet(player.id);
      updateUserPill();
      navTo('creator');
      return;
    }
  }
  navTo('login');
});

/* ===== 5. LOGIN E SESSÃO ===== */
function populateLoginDropdown() {
  const select = document.getElementById('login-player-select');
  if (!select) return;
  select.innerHTML = '<option value="">-- Selecione seu nome --</option>';
  CONFIG.players.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = `${p.name} (${p.characterName})`;
    select.appendChild(opt);
  });
}

function onPlayerSelectChange() {
  const select = document.getElementById('login-player-select');
  const previewCard = document.getElementById('player-preview-card');
  const errorMsg = document.getElementById('login-error-msg');
  if (errorMsg) errorMsg.style.display = 'none';
  const player = CONFIG.players.find(p => p.id === select.value);
  if (!player) {
    if (previewCard) previewCard.style.display = 'none';
    return;
  }
  const isRaceFree = isFieldFree(player.race);
  const isClassFree = isFieldFree(player.class);
  const isNameFree = isFieldFree(player.characterName);
  const savedSheet = localStorage.getItem('dnd_player_' + player.id);
  let statusTag = savedSheet
    ? '<span style="color:#2ecc71; font-weight:600;"><span class="ico ico-check"></span> Ficha salva no navegador</span>'
    : '<span style="color:var(--text-muted);">Nova ficha</span>';
  if (previewCard) {
    previewCard.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
        <strong style="color:var(--accent-text); font-size:0.95rem;"><span class="ico ico-user"></span> ${escapeHtml(player.name)}</strong>
        ${statusTag}
      </div>
      <div style="color:var(--text-muted); line-height:1.45;">
        <strong>Personagem:</strong> ${isNameFree ? '<span class="badge-free">Livre</span>' : `<span class="ico ico-lock"></span> ${escapeHtml(player.characterName)}`}<br>
        <strong>Espécie:</strong> ${isRaceFree ? '<span class="badge-free">Escolher depois</span>' : `<span class="ico ico-lock"></span> ${escapeHtml(player.race)}`}<br>
        <strong>Classe:</strong> ${isClassFree ? '<span class="badge-free">Escolher depois</span>' : `<span class="ico ico-lock"></span> ${escapeHtml(player.class)}`}<br>
        <strong>Nível:</strong> <span class="ico ico-lock"></span> <span style="color:var(--accent-text); font-weight:600;">${escapeHtml(player.levelDisplay || 'Nível 2')}</span><br>
        <strong>Perícias:</strong> <span style="color:var(--accent-text); font-weight:600;">Exatamente ${player.reqSkills} perícias</span>
      </div>
    `;
    previewCard.style.display = 'block';
  }
  const pwdInput = document.getElementById('login-password-single');
  if (pwdInput) {
    pwdInput.value = '';
    pwdInput.focus();
  }
}

function submitSingleLogin(e) {
  e.preventDefault();
  const select = document.getElementById('login-player-select');
  const pwdInput = document.getElementById('login-password-single');
  const errorMsg = document.getElementById('login-error-msg');
  const player = CONFIG.players.find(p => p.id === select.value);
  if (!player) {
    alert('Por favor, selecione quem é você!');
    return;
  }
  const inputVal = pwdInput ? pwdInput.value.trim().toLowerCase() : '';
  if (inputVal === player.password.toLowerCase()) {
    currentUser = player;
    localStorage.setItem('dnd_active_user_id', player.id);
    if (errorMsg) errorMsg.style.display = 'none';
    loadSavedSheet(player.id);
    updateUserPill();
    navTo('creator');
  } else {
    if (errorMsg) errorMsg.style.display = 'flex';
  }
}

function logout() {
  localStorage.removeItem('dnd_active_user_id');
  currentUser = null;
  const pwdInput = document.getElementById('login-password-single');
  if (pwdInput) pwdInput.value = '';
  const previewCard = document.getElementById('player-preview-card');
  if (previewCard) previewCard.style.display = 'none';
  const select = document.getElementById('login-player-select');
  if (select) select.value = '';
  updateUserPill();
  navTo('login');
}

function updateUserPill() {
  const container = document.getElementById('user-pill-container');
  const discreteName = document.getElementById('player-discrete-name');
  if (currentUser) {
    const charName = sheetData.name || currentUser.characterName || 'Sem nome';
    if (container) {
      container.innerHTML = `
        <div class="user-pill">
          <span><span class="ico ico-user"></span> <strong>${escapeHtml(currentUser.name)}</strong> — <em>${escapeHtml(charName)}</em></span>
          <button class="btn-logout" onclick="logout()" title="Sair da sessão">[Sair]</button>
        </div>
      `;
    }
    if (discreteName) {
      discreteName.innerText = `${currentUser.name} (${charName})`;
    }
  } else {
    if (container) container.innerHTML = '';
  }
}

/* ===== 6. NAVEGAÇÃO ENTRE TELAS ===== */
function navTo(screen) {
  const currentVisible = ['login', 'creator', 'guide'].find(s => {
    const el = document.getElementById('screen-' + s);
    return el && el.style.display !== 'none';
  });
  if (currentVisible && currentVisible !== 'guide') {
    previousScreen = currentVisible;
  }
  const screenLogin = document.getElementById('screen-login');
  const screenCreator = document.getElementById('screen-creator');
  const screenGuide = document.getElementById('screen-guide');
  if (screenLogin) screenLogin.style.display = 'none';
  if (screenCreator) screenCreator.style.display = 'none';
  if (screenGuide) screenGuide.style.display = 'none';
  const navCreator = document.getElementById('nav-btn-creator');
  const navGuide = document.getElementById('nav-btn-guide');
  if (navCreator) navCreator.classList.remove('active');
  if (navGuide) navGuide.classList.remove('active');
  if (screen === 'login') {
    if (screenLogin) screenLogin.style.display = 'block';
  } else if (screen === 'creator') {
    if (!currentUser) {
      navTo('login');
      return;
    }
    if (screenCreator) screenCreator.style.display = 'block';
    if (navCreator) navCreator.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (screen === 'guide') {
    if (screenGuide) screenGuide.style.display = 'block';
    if (navGuide) navGuide.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function backFromGuide() {
  navTo(previousScreen || (currentUser ? 'creator' : 'login'));
}

function handleNavCreatorClick() {
  if (!currentUser) {
    alert('Por favor, faça o login na mesa primeiro.');
    navTo('login');
  } else {
    navTo('creator');
  }
}

/* ===== 7. FUNÇÕES AUXILIARES ===== */
function isFieldFree(val) {
  return !val || val === '?' || val.trim() === '';
}

function formatAttrShort(attr) {
  const map = { FOR: 'For', DES: 'Des', CON: 'Con', INT: 'Int', SAB: 'Sab', CAR: 'Car' };
  return map[attr] || attr;
}

function calcMod(score) {
  return Math.floor(((score || 10) - 10) / 2);
}

function fmtMod(mod) {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

function escapeHtml(str) {
  return String(str || '').replace(/[&<>"']/g, function (m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
  });
}

/* ===== 8. CARREGAMENTO DA FICHA ===== */
function loadSavedSheet(playerId) {
  const player = currentUser;
  if (!player) return;
  const saved = localStorage.getItem('dnd_player_' + playerId);
  const masterName = isFieldFree(player.characterName) ? '' : player.characterName;
  const masterRace = isFieldFree(player.race) ? '' : player.race;
  const masterClass = isFieldFree(player.class) ? '' : player.class;
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      sheetData = Object.assign({}, sheetData, parsed);
    } catch (e) {
      console.error('Erro ao ler ficha salva', e);
    }
  } else {
    sheetData = {
      name: '',
      race: '',
      class: '',
      level: 'Nível 2',
      method: 'roll',
      attributes: { FOR: 10, DES: 10, CON: 10, INT: 10, SAB: 10, CAR: 10 },
      selectedSkills: [],
      rollAttemptsLeft: 3,
      lastRolledValues: [10, 10, 10, 10, 10, 10],
      rollAssignments: { FOR: null, DES: null, CON: null, INT: null, SAB: null, CAR: null },
      standardAssignments: { FOR: null, DES: null, CON: null, INT: null, SAB: null, CAR: null }
    };
  }
  if (!sheetData.spells) sheetData.spells = { cantrips: [], level1: [] };
  if (masterName) sheetData.name = masterName;
  if (masterRace) sheetData.race = masterRace;
  if (masterClass) sheetData.class = masterClass;
  sheetData.level = player.levelDisplay || 'Nível 2';
  const sheetEl = document.querySelector('.paper-sheet');
  if (sheetEl) {
  sheetEl.classList.remove('theme-p1', 'theme-p2', 'theme-p3', 'theme-p4', 'theme-p5');
  sheetEl.classList.add('theme-' + currentUser.id);
  }
  renderSheetTopFields();
  setAttrMethod(sheetData.method || 'roll', false);
  renderSkillsSection();
  renderSpellsSection();
  updateUserPill();
}

function renderSheetTopFields() {
  if (!currentUser) return;
  const slotName = document.getElementById('slot-char-name');
  const slotRace = document.getElementById('slot-char-race');
  const slotClass = document.getElementById('slot-char-class');
  const slotLevel = document.getElementById('slot-char-level');
  const isNameLocked = !isFieldFree(currentUser.characterName);
  const isRaceLocked = !isFieldFree(currentUser.race);
  const isClassLocked = !isFieldFree(currentUser.class);
  if (slotName) {
    if (isNameLocked) {
      slotName.innerHTML = `<div class="sheet-locked-text" title="Definido pelo Mestre"><span class="ico ico-lock"></span> ${escapeHtml(currentUser.characterName)}</div>`;
      sheetData.name = currentUser.characterName;
    } else {
      slotName.innerHTML = `<input type="text" id="input-char-name" placeholder="Nome do herói..." value="${escapeHtml(sheetData.name || '')}" oninput="sheetData.name = this.value; updateUserPill();">`;
    }
  }
  if (slotRace) {
    if (isRaceLocked) {
      slotRace.innerHTML = `<div class="sheet-locked-text" title="Definido pelo Mestre"><span class="ico ico-lock"></span> ${escapeHtml(currentUser.race)}</div>`;
      sheetData.race = currentUser.race;
    } else {
      let raceOptions = `<option value="">Escolher depois</option>`;
      AVAILABLE_RACES.forEach(r => {
        const sel = (sheetData.race === r) ? 'selected' : '';
        raceOptions += `<option value="${r}" ${sel}>${r}</option>`;
      });
      slotRace.innerHTML = `<select id="select-char-race" onchange="sheetData.race = this.value">${raceOptions}</select>`;
    }
  }
  if (slotClass) {
    if (isClassLocked) {
      slotClass.innerHTML = `<div class="sheet-locked-text" title="Definido pelo Mestre"><span class="ico ico-lock"></span> ${escapeHtml(currentUser.class)}</div>`;
      sheetData.class = currentUser.class;
    } else {
      slotClass.innerHTML = `<div class="sheet-locked-text"><span class="ico ico-lock"></span> ${escapeHtml(sheetData.class || 'Classe 2')}</div>`;
    }
  }
  if (slotLevel) {
    const lvl = currentUser.levelDisplay || 'Nível 2';
    slotLevel.innerHTML = `<div class="sheet-locked-text" title="Definido pelo Mestre"><span class="ico ico-lock"></span> ${escapeHtml(lvl)}</div>`;
    sheetData.level = lvl;
  }
}

/* ===== 9. MÉTODOS DE ATRIBUTOS ===== */
function setAttrMethod(method, updateState = true) {
  if (updateState) sheetData.method = method;
  document.querySelectorAll('.method-card').forEach(b => b.classList.remove('active'));
  const activeCard = document.getElementById(`btn-method-${method}`);
  if (activeCard) activeCard.classList.add('active');
  const panelRoll = document.getElementById('panel-method-roll');
  const panelStandard = document.getElementById('panel-method-standard');
  const panelPointbuy = document.getElementById('panel-method-pointbuy');
  if (panelRoll) panelRoll.style.display = (method === 'roll') ? 'block' : 'none';
  if (panelStandard) panelStandard.style.display = (method === 'standard') ? 'block' : 'none';
  if (panelPointbuy) panelPointbuy.style.display = (method === 'pointbuy') ? 'block' : 'none';
  if (method === 'standard') {
    renderStandardArrayControls();
  } else if (method === 'pointbuy') {
    renderPointBuyControls();
  } else if (method === 'roll') {
    renderRollControls();
  }
  renderAttributesDisplay();
}

/* --- Método 1: Rolar dados (4d6 descarta o menor) --- */
function roll4d6DropLowest() {
  const dice = [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1
  ];
  dice.sort((a, b) => a - b);
  return dice[1] + dice[2] + dice[3];
}

function rollDiceMethod() {
  if (sheetData.rollAttemptsLeft <= 0) {
    alert('Você já utilizou todas as 3 rolagens!');
    return;
  }
  const diceIco = document.getElementById('roll-dice-ico');
  if (diceIco) {
    diceIco.classList.remove('spinning');
    void diceIco.offsetWidth;
    diceIco.classList.add('spinning');
  }
  const results = [];
  for (let i = 0; i < 6; i++) {
    results.push(roll4d6DropLowest());
  }
  results.sort((a, b) => b - a);
  sheetData.lastRolledValues = results;
  sheetData.rollAttemptsLeft--;
  sheetData.rollAssignments = { FOR: null, DES: null, CON: null, INT: null, SAB: null, CAR: null };
  renderRollControls();
  renderAttributesDisplay();
  renderSkillsSection();
}

function renderRollControls() {
  const countEl = document.getElementById('roll-attempts-count');
  if (countEl) countEl.innerText = `Tentativas restantes: ${sheetData.rollAttemptsLeft} de 3`;
  const btn = document.getElementById('btn-roll-dice');
  if (btn && sheetData.rollAttemptsLeft <= 0) {
    btn.disabled = true;
    btn.innerText = 'Rolagens Esgotadas';
  }
  const container = document.getElementById('dice-roll-results');
  if (container) {
    container.innerHTML = '';
    sheetData.lastRolledValues.forEach((val, idx) => {
      const chip = document.createElement('div');
      chip.className = 'dice-chip';
      chip.innerText = `#${idx + 1}: ${val}`;
      container.appendChild(chip);
    });
  }
  const assignBox = document.getElementById('roll-assignment-box');
  if (assignBox) assignBox.style.display = 'block';
  const dropdownsContainer = document.getElementById('roll-dropdowns-container');
  if (!dropdownsContainer) return;
  dropdownsContainer.innerHTML = '';
  ['FOR', 'DES', 'CON', 'INT', 'SAB', 'CAR'].forEach(attr => {
    const box = document.createElement('div');
    box.innerHTML = `
      <label style="font-size: 0.78rem; font-weight: 800; color: #5c3a21; display:block; margin-bottom:2px;">${attr}</label>
      <select class="input" style="width:100%; font-size: 0.85rem; padding: 0.35rem 0.5rem;" onchange="assignRolledValue('${attr}', this.value)">
        <option value="">-- Escolher --</option>
        ${sheetData.lastRolledValues.map((v, i) => `
          <option value="${i}" ${sheetData.rollAssignments[attr] === i ? 'selected' : ''}>${v} (#${i + 1})</option>
        `).join('')}
      </select>
    `;
    dropdownsContainer.appendChild(box);
  });
}

function assignRolledValue(attr, indexStr) {
  const idx = indexStr === "" ? null : parseInt(indexStr);
  sheetData.rollAssignments[attr] = idx;
  if (idx !== null) {
    sheetData.attributes[attr] = sheetData.lastRolledValues[idx];
  } else {
    sheetData.attributes[attr] = 10;
  }
  renderAttributesDisplay();
  renderSkillsSection();
}

/* --- Método 2: Números padrão (15, 14, 13, 12, 10, 8) --- */
function renderStandardArrayControls() {
  const container = document.getElementById('standard-dropdowns-container');
  if (!container) return;
  container.innerHTML = '';
  ['FOR', 'DES', 'CON', 'INT', 'SAB', 'CAR'].forEach(attr => {
    const box = document.createElement('div');
    box.innerHTML = `
      <label style="font-size: 0.78rem; font-weight: 800; color: #5c3a21; display:block; margin-bottom:2px;">${attr}</label>
      <select class="input" style="width:100%; font-size: 0.85rem; padding: 0.35rem 0.5rem;" onchange="assignStandardValue('${attr}', this.value)">
        <option value="">-- Selecione --</option>
        ${STANDARD_ARRAY.map(val => `
          <option value="${val}" ${sheetData.standardAssignments[attr] == val ? 'selected' : ''}>${val}</option>
        `).join('')}
      </select>
    `;
    container.appendChild(box);
  });
}

function assignStandardValue(attr, valStr) {
  const val = valStr === "" ? null : parseInt(valStr);
  sheetData.standardAssignments[attr] = val;
  if (val !== null) {
    sheetData.attributes[attr] = val;
  } else {
    sheetData.attributes[attr] = 10;
  }
  renderAttributesDisplay();
  renderSkillsSection();
}

/* --- Método 3: Compra de pontos (27 pontos) --- */
function calculatePointBuySpent() {
  let spent = 0;
  ['FOR', 'DES', 'CON', 'INT', 'SAB', 'CAR'].forEach(a => {
    const val = sheetData.attributes[a] || 8;
    spent += POINT_BUY_COSTS[val] || 0;
  });
  return spent;
}

function renderPointBuyControls() {
  const spent = calculatePointBuySpent();
  const remaining = 27 - spent;
  const el = document.getElementById('pb-remaining-pts');
  if (el) {
    el.innerText = remaining;
    el.style.color = remaining === 0 ? '#1e824c' : (remaining < 0 ? '#e74c3c' : '#381e09');
  }
}

function changePointBuyAttr(attr, delta) {
  const current = sheetData.attributes[attr] || 8;
  const next = current + delta;
  if (next < 8 || next > 20) return;
  const currentCost = POINT_BUY_COSTS[current];
  const nextCost = POINT_BUY_COSTS[next];
  const diff = nextCost - currentCost;
  const remaining = 27 - calculatePointBuySpent();
  if (delta > 0 && diff > remaining) {
    alert('Pontos insuficientes!');
    return;
  }
  sheetData.attributes[attr] = next;
  renderPointBuyControls();
  renderAttributesDisplay();
  renderSkillsSection();
}

/* ===== 10. EXIBIÇÃO DOS ATRIBUTOS ===== */
function renderAttributesDisplay() {
  const grid = document.getElementById('attributes-display-grid');
  if (!grid) return;
  grid.innerHTML = '';
  ['FOR', 'DES', 'CON', 'INT', 'SAB', 'CAR'].forEach(attr => {
    const val = sheetData.attributes[attr] || 10;
    const mod = calcMod(val);
    const explain = CONFIG.attrExplanations[attr] || '';
    const card = document.createElement('div');
    card.className = 'paper-attr-box';
    let scoreControl = '';
    if (sheetData.method === 'pointbuy') {
      scoreControl = `
        <div style="display: flex; align-items: center; gap: 0.5rem;" class="no-print">
          <button class="btn-counter" onclick="changePointBuyAttr('${attr}', -1)" ${val <= 8 ? 'disabled' : ''}>-</button>
          <span class="paper-attr-score">${val}</span>
          <button class="btn-counter" onclick="changePointBuyAttr('${attr}', 1)" ${val >= 20 ? 'disabled' : ''}>+</button>
        </div>
      `;
    } else {
      scoreControl = `<span class="paper-attr-score">${val}</span>`;
    }
    card.innerHTML = `
      <div class="paper-attr-header">
        <span class="paper-attr-name">${ATTR_FULL_NAMES[attr]} (${attr})</span>
        <div class="paper-attr-mod-circle" title="Modificador: ${fmtMod(mod)}">
          ${fmtMod(mod)}
        </div>
      </div>
      <div class="paper-attr-body">
        <span style="font-size: 0.8rem; font-weight: 800; color: #5c3a21; text-transform: uppercase;">Valor:</span>
        ${scoreControl}
      </div>
      <div class="paper-attr-explain">
        ${explain}
      </div>
    `;
    grid.appendChild(card);
  });
  const errBanner = document.getElementById('attr-error-banner');
  if (errBanner) {
    if (sheetData.method === 'pointbuy') {
      const spent = calculatePointBuySpent();
      if (spent !== 27) {
        errBanner.style.display = 'block';
        errBanner.innerHTML = `<span class="ico ico-warn"></span> Compra de pontos: você gastou ${spent}/27 pontos. Ajuste para fechar exatamente em 27 pontos.`;
      } else {
        errBanner.style.display = 'none';
      }
    } else {
      errBanner.style.display = 'none';
    }
  }
}

/* ===== 11. PERÍCIAS ===== */
function renderSkillsSection() {
  if (!currentUser) return;
  let allowed = [];
  if (currentUser.allowedSkills && Array.isArray(currentUser.allowedSkills)) {
    allowed = CONFIG.allSkills.filter(s => currentUser.allowedSkills.includes(s.name));
  } else {
    allowed = CONFIG.allSkills;
  }
  const allowedNames = allowed.map(s => s.name);
  sheetData.selectedSkills = (sheetData.selectedSkills || []).filter(s => allowedNames.includes(s));
  const reqCount = currentUser.reqSkills;
  const currentSelected = sheetData.selectedSkills.length;
  const isExact = (currentSelected === reqCount);
  const isLimitReached = (currentSelected >= reqCount);
  const badge = document.getElementById('skills-requirement-badge');
  if (badge) {
    badge.innerText = `Selecionadas ${currentSelected} de ${reqCount}`;
    badge.style.background = isExact ? '#1e824c' : (currentSelected > reqCount ? '#c0392b' : '#6b3e19');
  }
  const reqBar = document.getElementById('skills-requirement-bar');
  if (reqBar) {
    if (isExact) {
      reqBar.className = 'alert-banner alert-success no-print';
      reqBar.innerHTML = `<span class="ico ico-check"></span> <strong>Quantidade exata!</strong> Você selecionou as ${reqCount} perícias permitidas. Salvamento liberado.`;
    } else if (currentSelected < reqCount) {
      const diff = reqCount - currentSelected;
      reqBar.className = 'alert-banner alert-warning no-print';
      reqBar.innerHTML = `<span class="ico ico-warn"></span> <strong>Faltam ${diff} perícia${diff > 1 ? 's' : ''}</strong> para atingir a quantidade de ${reqCount} exigida (Selecionadas: ${currentSelected}/${reqCount}).`;
    } else {
      const diff = currentSelected - reqCount;
      reqBar.className = 'alert-banner alert-danger no-print';
      reqBar.innerHTML = `<span class="ico ico-warn"></span> <strong>Você marcou ${diff} perícia${diff > 1 ? 's' : ''} a mais!</strong> Desmarque até ficar em exatamente ${reqCount}.`;
    }
  }
  const btnSaveSheet = document.getElementById('btn-save-sheet');
  if (btnSaveSheet) {
    btnSaveSheet.disabled = !isExact;
    btnSaveSheet.style.opacity = isExact ? '1' : '0.5';
    btnSaveSheet.style.cursor = isExact ? 'pointer' : 'not-allowed';
    btnSaveSheet.title = isExact
      ? 'Salvar Ficha'
      : (currentSelected < reqCount ? `Faltam ${reqCount - currentSelected} perícia(s)` : `Você marcou ${currentSelected - reqCount} perícia(s) a mais`);
  }
  const container = document.getElementById('skills-container-grid');
  if (!container) return;
  container.innerHTML = '';
  allowed.forEach(s => {
    const isSelected = sheetData.selectedSkills.includes(s.name);
    const isDisabled = !isSelected && isLimitReached;
    const attrMod = calcMod(sheetData.attributes[s.attr] || 10);
    const totalBonus = isSelected ? attrMod + 2 : attrMod;
    const shortAttr = formatAttrShort(s.attr);
    const card = document.createElement('div');
    card.className = `paper-skill-card ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`;
    card.onclick = (e) => {
      if (e.target.tagName === 'INPUT') return;
      if (isDisabled) {
        alert(`[Aviso] Você já selecionou o limite máximo de ${reqCount} perícias! Desmarque uma antes de escolher "${s.name}".`);
        return;
      }
      toggleSkillSelection(s.name);
    };
    const iconClass = SKILL_ICONS[s.name] || 'ico-star';
    card.innerHTML = `
      <div class="paper-skill-header">
        <div class="paper-skill-left">
          <input type="checkbox" class="paper-skill-checkbox"
                 ${isSelected ? 'checked' : ''}
                 ${isDisabled ? 'disabled' : ''}
                 onchange="toggleSkillSelection('${s.name}')">
          <span class="paper-skill-title"><span class="attr-marker attr-marker-${s.attr}" title="Atributo-chave: ${s.attr}"></span><span class="ico ${iconClass}"></span>${escapeHtml(s.name)}</span>
        </div>
        <span class="paper-skill-attr">(${shortAttr})</span>
      </div>
      <div class="paper-skill-explain">
        ${escapeHtml(s.desc)}
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:auto; padding-top:0.35rem; border-top:1px dashed #d8c6b2;">
        <span style="font-size:0.75rem; color:#6b3e19; font-weight:700;">Bônus Total:</span>
        <span class="paper-skill-bonus-tag" style="color: ${isSelected ? '#1e824c' : '#6b3e19'}; background: ${isSelected ? 'rgba(30, 130, 76, 0.12)' : 'rgba(107, 62, 25, 0.08)'};">
          ${fmtMod(totalBonus)}
        </span>
      </div>
    `;
    container.appendChild(card);
  });
}

function toggleSkillSelection(skillName) {
  if (!currentUser) return;
  const reqCount = currentUser.reqSkills;
  const idx = sheetData.selectedSkills.indexOf(skillName);
  if (idx > -1) {
    sheetData.selectedSkills.splice(idx, 1);
  } else {
    if (sheetData.selectedSkills.length >= reqCount) {
      alert(`[Aviso] Você já atingiu o limite de ${reqCount} perícias! Desmarque uma antes de escolher outra.`);
      return;
    }
    sheetData.selectedSkills.push(skillName);
  }
  renderSkillsSection();
}

/* ===== 11.1 MAGIAS & TRUQUES ===== */
function renderSpellsSection() {
  const section = document.getElementById('spells-section');
  if (!section) return;
  const sc = currentUser && currentUser.spellcasting;
  if (!sc) { section.style.display = 'none'; return; }
  section.style.display = 'block';
  if (!sheetData.spells) sheetData.spells = { cantrips: [], level1: [] };
  const list = SPELL_LISTS[sc.list];
  renderSpellGroup('cantrips', list.cantrips, sc.cantrips);
  renderSpellGroup('level1', list.level1, sc.level1);
  const bar = document.getElementById('spells-requirement-bar');
  if (bar) {
    const okC = sheetData.spells.cantrips.length === sc.cantrips;
    const okL = sheetData.spells.level1.length === sc.level1;
    if (okC && okL) {
      bar.className = 'alert-banner alert-success no-print';
      bar.innerHTML = '<span class="ico ico-check"></span> <strong>Grimório completo!</strong> Truques e magias na quantidade exata.';
    } else {
      bar.className = 'alert-banner alert-info no-print';
      bar.innerHTML = `<span class="ico ico-warn"></span> Truques: ${sheetData.spells.cantrips.length}/${sc.cantrips} • Magias de 1º nível: ${sheetData.spells.level1.length}/${sc.level1}`;
    }
  }
}

function renderSpellGroup(group, spells, limit) {
  const badge = document.getElementById('spells-' + group + '-badge');
  if (badge) {
    badge.innerText = `Selecionadas ${sheetData.spells[group].length} de ${limit}`;
    badge.style.background = sheetData.spells[group].length === limit ? '#1e824c' : '#6b3e19';
  }
  const container = document.getElementById('spells-' + group + '-grid');
  if (!container) return;
  container.innerHTML = '';
  spells.forEach(s => {
    const isSelected = sheetData.spells[group].includes(s.name);
    const isDisabled = !isSelected && sheetData.spells[group].length >= limit;
    const card = document.createElement('div');
    card.className = `paper-skill-card ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`;
    card.onclick = () => {
      if (isDisabled) {
        alert(`[Aviso] Limite de ${limit} atingido nesta lista! Desmarque uma antes de escolher "${s.name}".`);
        return;
      }
      toggleSpellSelection(group, s.name);
    };
    card.innerHTML = `
      <div class="paper-skill-header">
        <div class="paper-skill-left">
          <input type="checkbox" class="paper-skill-checkbox" ${isSelected ? 'checked' : ''} ${isDisabled ? 'disabled' : ''} onchange="toggleSpellSelection('${group}', '${s.name}')">
          <span class="paper-skill-title">${escapeHtml(s.name)}</span>
        </div>
      </div>
      <div class="paper-skill-explain">${escapeHtml(s.desc)}</div>
    `;
    container.appendChild(card);
  });
}

function toggleSpellSelection(group, spellName) {
  if (!currentUser || !currentUser.spellcasting) return;
  const arr = sheetData.spells[group];
  const idx = arr.indexOf(spellName);
  if (idx > -1) {
    arr.splice(idx, 1);
  } else {
    const limit = group === 'cantrips' ? currentUser.spellcasting.cantrips : currentUser.spellcasting.level1;
    if (arr.length >= limit) return;
    arr.push(spellName);
  }
  renderSpellsSection();
}

/* ===== 12. SALVAMENTO ===== */
function saveCharacterSheet() {
  if (!currentUser) return;
  const finalName = (sheetData.name || '').trim();
  if (!finalName) {
    alert('[Aviso] Preencha o Nome do Personagem no topo da ficha!');
    return;
  }
  if (sheetData.method === 'pointbuy') {
    const spent = calculatePointBuySpent();
    if (spent !== 27) {
      alert(`[Aviso] Na Compra de Pontos você deve usar exatamente 27 pontos (atualmente: ${spent}/27)!`);
      return;
    }
  }
  const req = currentUser.reqSkills;
  const count = sheetData.selectedSkills.length;
  if (count !== req) {
    alert(`[Aviso] Você deve escolher exatamente ${req} perícias! Atualmente selecionadas: ${count}.`);
    return;
  }
  if (currentUser.spellcasting) {
  const sc = currentUser.spellcasting;
  if (sheetData.spells.cantrips.length !== sc.cantrips || sheetData.spells.level1.length !== sc.level1) {
    alert(`[Aviso] Complete o grimório: ${sc.cantrips} truques e ${sc.level1} magias de 1º nível!`);
    return;
  }
}
  localStorage.setItem('dnd_player_' + currentUser.id, JSON.stringify(sheetData));
  alert(`Ficha de "${finalName}" (${currentUser.name}) salva com sucesso no navegador!`);
  updateUserPill();
  renderSkillsSection();
}

/* ===== 13. RESUMO PARA COPIAR ===== */
function getMethodDisplayName(methodKey) {
  const map = {
    'roll': 'Rolar dados (4d6 descarta o menor)',
    'standard': 'Números padrão (15, 14, 13, 12, 10, 8)',
    'pointbuy': 'Compra de 27 pontos'
  };
  return map[methodKey] || methodKey;
}

function copyTextSummary() {
  const charName = sheetData.name || (currentUser ? currentUser.characterName : 'Sem nome');
  const raceName = sheetData.race || 'Escolher depois';
  const className = sheetData.class || 'Classe 2';
  const levelText = sheetData.level || 'Nível 2';
  const methodName = getMethodDisplayName(sheetData.method);
  const reqCount = currentUser ? currentUser.reqSkills : 0;
  const summaryText = `
  
  === FICHA DE PERSONAGEM D&D 5E ===
Jogador: ${currentUser ? currentUser.name : 'N/A'}
Nome do Personagem: ${charName}
Espécie: ${raceName}
Classe(s): ${className}
Nível: ${levelText}
Método de Atributos: ${methodName}
--- ATRIBUTOS & MODIFICADORES ---
Força (FOR): ${sheetData.attributes.FOR} (${fmtMod(calcMod(sheetData.attributes.FOR))})
Destreza (DES): ${sheetData.attributes.DES} (${fmtMod(calcMod(sheetData.attributes.DES))})
Constituição (CON): ${sheetData.attributes.CON} (${fmtMod(calcMod(sheetData.attributes.CON))})
Inteligência (INT): ${sheetData.attributes.INT} (${fmtMod(calcMod(sheetData.attributes.INT))})
Sabedoria (SAB): ${sheetData.attributes.SAB} (${fmtMod(calcMod(sheetData.attributes.SAB))})
Carisma (CAR): ${sheetData.attributes.CAR} (${fmtMod(calcMod(sheetData.attributes.CAR))})
--- PERÍCIAS ESCOLHIDAS (${sheetData.selectedSkills.length}/${reqCount}) ---
${sheetData.selectedSkills.map(s => {
    const item = CONFIG.allSkills.find(k => k.name === s);
    const shortAttr = item ? formatAttrShort(item.attr) : '';
    const mod = calcMod(sheetData.attributes[item ? item.attr : 'FOR'] || 10) + 2;
    return `${s} (${shortAttr}) [${fmtMod(mod)}]`;
  }).join(', ') || 'Nenhuma'}
${currentUser && currentUser.spellcasting ? `
--- TRUQUES (${sheetData.spells.cantrips.length}/${currentUser.spellcasting.cantrips}) ---
${sheetData.spells.cantrips.join(', ') || 'Nenhum'}
--- MAGIAS DE 1º NÍVEL (${sheetData.spells.level1.length}/${currentUser.spellcasting.level1}) ---
${sheetData.spells.level1.join(', ') || 'Nenhuma'}
 ` : ''}
=================================
  `.trim();
  navigator.clipboard.writeText(summaryText).then(() => {
    alert('Resumo completo da ficha copiado com sucesso!');
  }).catch(err => {
    console.error('Erro ao copiar:', err);
  });
}

/* ===== 14. GUIA ===== */
function renderGuideSkills() {
  const container = document.getElementById('guide-skills-container');
  if (!container) return;
  container.innerHTML = '';
  CONFIG.allSkills.forEach(s => {
    const item = document.createElement('div');
    item.className = 'accordion-item';
    const shortAttr = formatAttrShort(s.attr);
    const iconClass = SKILL_ICONS[s.name] || 'ico-star';
    item.innerHTML = `
      <div class="accordion-header" onclick="toggleAccordion(this)">
        <span><span class="attr-marker attr-marker-${s.attr}" title="Atributo-chave: ${s.attr}"></span><span class="ico ${iconClass}"></span><strong>${escapeHtml(s.name)}</strong> (${shortAttr})</span>
        <span class="accordion-icon">▼</span>
      </div>
      <div class="accordion-content">
        <p>${escapeHtml(s.desc)}</p>
        <p><strong>Atributo-chave:</strong> ${s.attr} (${shortAttr})</p>
      </div>
    `;
    container.appendChild(item);
  });
}

function toggleAccordion(headerEl) {
  const parent = headerEl.parentElement;
  if (parent) parent.classList.toggle('open');
}