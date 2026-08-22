// ---------- Catálogo de Pokébolas (Cobblemon) ----------
// Todas as bolas disponíveis no mod, exceto Master Ball, Ancient Origin Ball e Cherish Ball.
// As imagens são carregadas direto da wiki oficial do Cobblemon (wiki.cobblemon.com),
// então não precisam ser baixadas nem guardadas neste projeto.
const BALL_IMG_FALLBACK = "data:image/svg+xml;utf8," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
  '<circle cx="32" cy="32" r="28" fill="#2a262b" stroke="#332c30" stroke-width="3"/>' +
  '<circle cx="32" cy="32" r="10" fill="#131114" stroke="#332c30" stroke-width="2"/>' +
  '</svg>'
);

const BALL_CATALOG = [
  { id: "pokeball", label: "Poké Ball", img: "https://wiki.cobblemon.com/images/6/6f/Poke_Ball.png" },
  { id: "citrineball", label: "Citrine Ball", img: "https://wiki.cobblemon.com/images/7/7e/Citrine_Ball.png" },
  { id: "verdantball", label: "Verdant Ball", img: "https://wiki.cobblemon.com/images/1/15/Verdant_Ball.png" },
  { id: "azureball", label: "Azure Ball", img: "https://wiki.cobblemon.com/images/3/38/Azure_Ball.png" },
  { id: "roseateball", label: "Roseate Ball", img: "https://wiki.cobblemon.com/images/d/d7/Roseate_Ball.png" },
  { id: "slateball", label: "Slate Ball", img: "https://wiki.cobblemon.com/images/3/3a/Slate_Ball.png" },
  { id: "premierball", label: "Premier Ball", img: "https://wiki.cobblemon.com/images/8/8d/Premier_Ball.png" },
  { id: "greatball", label: "Great Ball", img: "https://wiki.cobblemon.com/images/4/45/Great_Ball.png" },
  { id: "ultraball", label: "Ultra Ball", img: "https://wiki.cobblemon.com/images/3/34/Ultra_Ball.png" },
  { id: "safariball", label: "Safari Ball", img: "https://wiki.cobblemon.com/images/4/46/Safari_Ball.png" },
  { id: "fastball", label: "Fast Ball", img: "https://wiki.cobblemon.com/images/f/f8/Fast_Ball.png" },
  { id: "levelball", label: "Level Ball", img: "https://wiki.cobblemon.com/images/5/5b/Level_Ball.png" },
  { id: "lureball", label: "Lure Ball", img: "https://wiki.cobblemon.com/images/0/0a/Lure_Ball.png" },
  { id: "heavyball", label: "Heavy Ball", img: "https://wiki.cobblemon.com/images/1/13/Heavy_Ball.png" },
  { id: "loveball", label: "Love Ball", img: "https://wiki.cobblemon.com/images/0/0d/Love_Ball.png" },
  { id: "friendball", label: "Friend Ball", img: "https://wiki.cobblemon.com/images/3/30/Friend_Ball.png" },
  { id: "moonball", label: "Moon Ball", img: "https://wiki.cobblemon.com/images/b/b0/Moon_Ball.png" },
  { id: "sportball", label: "Sport Ball", img: "https://wiki.cobblemon.com/images/7/7d/Sport_Ball.png" },
  { id: "parkball", label: "Park Ball", img: "https://wiki.cobblemon.com/images/0/04/Park_Ball.png" },
  { id: "netball", label: "Net Ball", img: "https://wiki.cobblemon.com/images/b/bb/Net_Ball.png" },
  { id: "diveball", label: "Dive Ball", img: "https://wiki.cobblemon.com/images/1/10/Dive_Ball.png" },
  { id: "nestball", label: "Nest Ball", img: "https://wiki.cobblemon.com/images/a/a6/Nest_Ball.png" },
  { id: "repeatball", label: "Repeat Ball", img: "https://wiki.cobblemon.com/images/7/75/Repeat_Ball.png" },
  { id: "timerball", label: "Timer Ball", img: "https://wiki.cobblemon.com/images/4/46/Timer_Ball.png" },
  { id: "luxuryball", label: "Luxury Ball", img: "https://wiki.cobblemon.com/images/8/8d/Luxury_Ball.png" },
  { id: "duskball", label: "Dusk Ball", img: "https://wiki.cobblemon.com/images/5/50/Dusk_Ball.png" },
  { id: "healball", label: "Heal Ball", img: "https://wiki.cobblemon.com/images/2/24/Heal_Ball.png" },
  { id: "quickball", label: "Quick Ball", img: "https://wiki.cobblemon.com/images/b/be/Quick_Ball.png" },
  { id: "dreamball", label: "Dream Ball", img: "https://wiki.cobblemon.com/images/a/a1/Dream_Ball.png" },
  { id: "beastball", label: "Beast Ball", img: "https://wiki.cobblemon.com/images/f/f9/Beast_Ball.png" },
  { id: "ancient_pokeball", label: "Ancient Poké Ball", img: "https://wiki.cobblemon.com/images/4/4e/Ancient_Poke_Ball.png" },
  { id: "ancient_citrineball", label: "Ancient Citrine Ball", img: "https://wiki.cobblemon.com/images/c/cd/Ancient_Citrine_Ball.png" },
  { id: "ancient_verdantball", label: "Ancient Verdant Ball", img: "https://wiki.cobblemon.com/images/6/6e/Ancient_Verdant_Ball.png" },
  { id: "ancient_azureball", label: "Ancient Azure Ball", img: "https://wiki.cobblemon.com/images/7/7f/Ancient_Azure_Ball.png" },
  { id: "ancient_roseateball", label: "Ancient Roseate Ball", img: "https://wiki.cobblemon.com/images/6/68/Ancient_Roseate_Ball.png" },
  { id: "ancient_slateball", label: "Ancient Slate Ball", img: "https://wiki.cobblemon.com/images/5/52/Ancient_Slate_Ball.png" },
  { id: "ancient_greatball", label: "Ancient Great Ball", img: "https://wiki.cobblemon.com/images/c/c9/Ancient_Great_Ball.png" },
  { id: "ancient_ultraball", label: "Ancient Ultra Ball", img: "https://wiki.cobblemon.com/images/7/79/Ancient_Ultra_Ball.png" },
  { id: "ancient_heavyball", label: "Ancient Heavy Ball", img: "https://wiki.cobblemon.com/images/7/72/Ancient_Heavy_Ball.png" },
  { id: "ancient_ivoryball", label: "Ancient Ivory Ball", img: "https://wiki.cobblemon.com/images/6/6a/Ancient_Ivory_Ball.png" },
  { id: "ancient_featherball", label: "Ancient Feather Ball", img: "https://wiki.cobblemon.com/images/b/b8/Ancient_Feather_Ball.png" },
  { id: "ancient_wingball", label: "Ancient Wing Ball", img: "https://wiki.cobblemon.com/images/6/6f/Ancient_Wing_Ball.png" },
  { id: "ancient_jetball", label: "Ancient Jet Ball", img: "https://wiki.cobblemon.com/images/d/df/Ancient_Jet_Ball.png" },
  { id: "ancient_leadenball", label: "Ancient Leaden Ball", img: "https://wiki.cobblemon.com/images/d/d9/Ancient_Leaden_Ball.png" },
  { id: "ancient_gigatonball", label: "Ancient Gigaton Ball", img: "https://wiki.cobblemon.com/images/3/32/Ancient_Gigaton_Ball.png" }
];

// ---------- Combobox de seleção de Pokébola ----------
const ballInput = document.getElementById('order-pokebola-input');
const ballHidden = document.getElementById('order-pokebola');
const ballDropdown = document.getElementById('ball-dropdown');
const ballPickerWrap = document.getElementById('ball-picker');

function renderBallOptions(filterText){
  const term = (filterText || '').trim().toLowerCase();
  const matches = BALL_CATALOG.filter(b => b.label.toLowerCase().includes(term));

  ballDropdown.innerHTML = '';

  if(matches.length === 0){
    const empty = document.createElement('li');
    empty.className = 'ball-option ball-option-empty';
    empty.textContent = 'Nenhuma pokébola encontrada.';
    ballDropdown.appendChild(empty);
    return;
  }

  matches.forEach(ball => {
    const li = document.createElement('li');
    li.className = 'ball-option';
    li.setAttribute('role', 'option');
    li.dataset.id = ball.id;

    const img = document.createElement('img');
    img.src = ball.img;
    img.alt = ball.label;
    img.loading = 'lazy';
    img.referrerPolicy = 'no-referrer';
    img.addEventListener('error', () => { img.src = BALL_IMG_FALLBACK; }, { once: true });

    const span = document.createElement('span');
    span.textContent = ball.label;

    li.appendChild(img);
    li.appendChild(span);

    li.addEventListener('click', () => selectBall(ball));
    ballDropdown.appendChild(li);
  });
}

function selectBall(ball){
  ballHidden.value = ball.id;
  ballInput.value = ball.label;
  ballInput.dataset.selectedId = ball.id;
  closeBallDropdown();
}

function openBallDropdown(){
  ballPickerWrap.classList.add('open');
  renderBallOptions(ballInput.value === ballInput.dataset.selectedLabel ? '' : ballInput.value);
}

function closeBallDropdown(){
  ballPickerWrap.classList.remove('open');
}

ballInput.addEventListener('focus', () => {
  renderBallOptions('');
  ballPickerWrap.classList.add('open');
});

ballInput.addEventListener('input', () => {
  ballHidden.value = '';
  ballPickerWrap.classList.add('open');
  renderBallOptions(ballInput.value);
});

document.addEventListener('click', (e) => {
  if(!ballPickerWrap.contains(e.target)) closeBallDropdown();
});

// ---------- Combobox de seleção de Pokémon (Pokédex do Cobblemon) ----------
// POKEDEX_CATALOG vem do arquivo pokedex.js (carregado antes deste script).
const POKEMON_MAX_RESULTS = 40;

const pokemonInput = document.getElementById('order-pokemon-input');
const pokemonHidden = document.getElementById('order-pokemon');
const pokemonDropdown = document.getElementById('pokemon-dropdown');
const pokemonPickerWrap = document.getElementById('pokemon-picker');

const pokemonPreviewImgWrap = document.getElementById('pokemon-preview-img-wrap');
const pokemonPreviewPlaceholder = document.getElementById('pokemon-preview-placeholder');
const pokemonPreviewName = document.getElementById('pokemon-preview-name');
const pokemonPreviewDex = document.getElementById('pokemon-preview-dex');
let pokemonPreviewImgEl = null;

function renderPokemonOptions(filterText){
  const term = (filterText || '').trim().toLowerCase();
  pokemonDropdown.innerHTML = '';

  if(term.length === 0){
    const hint = document.createElement('li');
    hint.className = 'ball-option ball-option-empty';
    hint.textContent = 'Digite ao menos 1 letra para buscar (900 espécies reprodutíveis).';
    pokemonDropdown.appendChild(hint);
    return;
  }

  const startsWith = [];
  const contains = [];
  for(const p of POKEDEX_CATALOG){
    const label = p.label.toLowerCase();
    if(label.startsWith(term)) startsWith.push(p);
    else if(label.includes(term)) contains.push(p);
    if(startsWith.length >= POKEMON_MAX_RESULTS) break;
  }

  const matches = startsWith.concat(contains).slice(0, POKEMON_MAX_RESULTS);

  if(matches.length === 0){
    const empty = document.createElement('li');
    empty.className = 'ball-option ball-option-empty';
    empty.textContent = 'Nenhum Pokémon encontrado.';
    pokemonDropdown.appendChild(empty);
    return;
  }

  matches.forEach(mon => {
    const li = document.createElement('li');
    li.className = 'ball-option';
    li.setAttribute('role', 'option');
    li.dataset.id = mon.id;

    const img = document.createElement('img');
    img.src = mon.img;
    img.alt = mon.label;
    img.loading = 'lazy';
    img.referrerPolicy = 'no-referrer';
    img.addEventListener('error', () => { img.src = BALL_IMG_FALLBACK; }, { once: true });

    const span = document.createElement('span');
    span.textContent = `#${mon.dex} ${mon.label}`;

    li.appendChild(img);
    li.appendChild(span);

    li.addEventListener('click', () => selectPokemon(mon));
    pokemonDropdown.appendChild(li);
  });

  const totalMatches = POKEDEX_CATALOG.filter(p => p.label.toLowerCase().includes(term)).length;
  if(totalMatches > matches.length){
    const more = document.createElement('li');
    more.className = 'ball-option ball-option-empty';
    more.textContent = `+${totalMatches - matches.length} resultados — continue digitando para refinar.`;
    pokemonDropdown.appendChild(more);
  }
}

function selectPokemon(mon){
  pokemonHidden.value = mon.id;
  pokemonInput.value = mon.label;
  updatePokemonPreview(mon);
  closePokemonDropdown();
}

function updatePokemonPreview(mon){
  // A imagem só é criada (e inserida no DOM) quando existe um Pokémon
  // selecionado, então nunca há um <img> "quebrado" visível no estado vazio.
  if(!mon){
    if(pokemonPreviewImgEl){ pokemonPreviewImgEl.remove(); pokemonPreviewImgEl = null; }
    pokemonPreviewPlaceholder.hidden = false;
    pokemonPreviewName.textContent = 'Selecione um Pokémon';
    pokemonPreviewDex.textContent = 'A prévia aparece aqui assim que você escolher na lista ao lado.';
    return;
  }

  // Mantém o placeholder visível até a imagem terminar de carregar (evita
  // mostrar o ícone de "imagem quebrada" caso o carregamento falhe).
  pokemonPreviewPlaceholder.hidden = false;

  if(!pokemonPreviewImgEl){
    pokemonPreviewImgEl = document.createElement('img');
    pokemonPreviewImgWrap.insertBefore(pokemonPreviewImgEl, pokemonPreviewPlaceholder);
  }
  pokemonPreviewImgEl.onload = () => { pokemonPreviewPlaceholder.hidden = true; };
  pokemonPreviewImgEl.onerror = () => {
    if(pokemonPreviewImgEl){ pokemonPreviewImgEl.remove(); pokemonPreviewImgEl = null; }
    pokemonPreviewPlaceholder.hidden = false;
  };
  pokemonPreviewImgEl.alt = mon.label;
  pokemonPreviewImgEl.src = mon.img;

  pokemonPreviewName.textContent = mon.label;
  pokemonPreviewDex.textContent = `Nº ${mon.dex} na Pokédex Nacional`;
}

function closePokemonDropdown(){
  pokemonPickerWrap.classList.remove('open');
}

pokemonInput.addEventListener('focus', () => {
  renderPokemonOptions(pokemonInput.value);
  pokemonPickerWrap.classList.add('open');
});

pokemonInput.addEventListener('input', () => {
  pokemonHidden.value = '';
  updatePokemonPreview(null);
  pokemonPickerWrap.classList.add('open');
  renderPokemonOptions(pokemonInput.value);
});

document.addEventListener('click', (e) => {
  if(!pokemonPickerWrap.contains(e.target)) closePokemonDropdown();
});

// ---------- Formulário de Encomenda ----------
const orderForm = document.getElementById('order-form');
const submitBtn = orderForm.querySelector('button[type="submit"]');
const summaryBox = document.getElementById('summary-box');
const summaryText = document.getElementById('summary-text');
const copyBtn = document.getElementById('copy-summary-btn');
const copyFeedback = document.getElementById('copy-feedback');
const sendStatus = document.getElementById('send-status');

// Webhook do Discord da loja: toda encomenda enviada aqui cai direto no canal.
// Atenção: como o site é 100% front-end (sem backend), esta URL fica visível
// no código-fonte da página. Qualquer pessoa que a encontre pode usá-la para
// postar mensagens no seu canal. Para bloquear isso de vez, o ideal no futuro
// é mover esse envio para um pequeno backend/proxy que guarde a URL em sigilo.
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1539196466604806247/I2PYAiKt-fau6UeuOv97friZyIn3HL60sJeSTUOETuQRQNdF_IUBR4IlR7xz0cGNCMur';

async function sendOrderToDiscord(order){
  const embed = {
    title: '📋 Nova Encomenda — Nokron',
    color: 0xE2321F,
    fields: [
      { name: 'Nick', value: order.nick || '—', inline: true },
      { name: 'Discord', value: order.discord || '—', inline: true },
      { name: 'Pokémon', value: order.pokemon || '—', inline: true },
      { name: 'Habilidade', value: order.habilidade || '—', inline: true },
      { name: 'IVs', value: order.ivs || '—', inline: true },
      { name: 'Pokébola', value: order.pokebola || '—', inline: true }
    ],
    timestamp: new Date().toISOString()
  };

  const response = await fetch(DISCORD_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ embeds: [embed] })
  });

  if(!response.ok) throw new Error('Discord respondeu com status ' + response.status);
}

orderForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  if(!ballHidden.value){
    ballInput.setCustomValidity('Selecione uma pokébola da lista.');
  } else {
    ballInput.setCustomValidity('');
  }

  if(!pokemonHidden.value){
    pokemonInput.setCustomValidity('Selecione um Pokémon da lista.');
  } else {
    pokemonInput.setCustomValidity('');
  }

  if(!orderForm.reportValidity()) return;

  const order = {
    nick: document.getElementById('order-nick').value.trim(),
    discord: document.getElementById('order-discord').value.trim(),
    pokemon: pokemonInput.value.trim(),
    habilidade: document.getElementById('order-habilidade').value.trim(),
    ivs: document.getElementById('order-ivs').value.trim(),
    pokebola: ballInput.value.trim()
  };

  const resumo =
`📋 Modelo de Encomenda de Pokémon
Nick: ${order.nick}
Discord: ${order.discord}
Pokémon: ${order.pokemon}
Habilidade: ${order.habilidade}
IVs: ${order.ivs}
Pokebola: ${order.pokebola}`;

  summaryText.textContent = resumo;
  summaryBox.hidden = false;
  summaryBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';
  sendStatus.className = 'send-status send-status-pending';
  sendStatus.textContent = 'Enviando encomenda para a loja...';

  try{
    await sendOrderToDiscord(order);
    sendStatus.className = 'send-status send-status-ok';
    sendStatus.textContent = '✅ Encomenda enviada com sucesso para a loja no Discord!';
    copyFeedback.textContent = 'Você também pode copiar o resumo abaixo, caso precise reenviar.';
  }catch(err){
    sendStatus.className = 'send-status send-status-error';
    sendStatus.textContent = '⚠️ Não foi possível enviar automaticamente (pode ser bloqueio de rede/ad-blocker). Copie o resumo abaixo e envie manualmente para a loja.';
    copyFeedback.textContent = 'Copie e envie este resumo para a loja no Discord para confirmar a encomenda.';
  }finally{
    submitBtn.disabled = false;
    submitBtn.textContent = 'Gerar encomenda';
  }
});

copyBtn.addEventListener('click', async () => {
  const text = summaryText.textContent;
  try{
    await navigator.clipboard.writeText(text);
    copyFeedback.textContent = 'Resumo copiado! Agora é só colar no Discord da loja.';
  }catch(err){
    // Fallback para navegadores/contextos sem acesso ao Clipboard API
    const temp = document.createElement('textarea');
    temp.value = text;
    temp.style.position = 'fixed';
    temp.style.opacity = '0';
    document.body.appendChild(temp);
    temp.select();
    try{
      document.execCommand('copy');
      copyFeedback.textContent = 'Resumo copiado! Agora é só colar no Discord da loja.';
    }catch(err2){
      copyFeedback.textContent = 'Não foi possível copiar automaticamente. Selecione o texto acima manualmente.';
    }
    document.body.removeChild(temp);
  }
});

// ---------- Integração com o perfil (script.js) ----------
function prefillOrderForm(){
  if(typeof currentUser === 'undefined' || !currentUser) return;
  const nickField = document.getElementById('order-nick');
  const discordField = document.getElementById('order-discord');
  if(nickField && !nickField.value) nickField.value = currentUser.nick;
  if(discordField && !discordField.value && currentUser.discord) discordField.value = currentUser.discord;
}

window.onProfileUpdate = prefillOrderForm;
prefillOrderForm();
