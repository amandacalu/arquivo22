/* ============================================================
   ARQUIVO 22 (do bem) — app
   (o conteúdo fica em data.js; aqui é só a lógica)
   ============================================================ */
(() => {
  'use strict';

  const D = window.ARQUIVO22;
  const CATS = D.categorias;
  const N = CATS.length;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const USER = String(D.usuario || 'voce').toLowerCase().replace(/\s+/g, '');
  const pad = n => String(n).padStart(2, '0');
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const safeUrl = u => (/^https?:\/\//i.test(String(u || '').trim()) ? String(u).trim() : '');

  /* alfabeto da mesa de encantamento (Standard Galactic Alphabet) */
  const SGA = Array.from('ᔑʖᓵ↸ᒷ⊣⍑╎⋮ꖌꖎᒲリᑑ∷ᓭℸ⚍⍊∴⨅');

  /* sonzinhos estilo Minecraft (gerados na hora, sem arquivos) */
  let AC = null;
  function tone(freqs, { type = 'triangle', gap = .09, len = .32, vol = .07 } = {}) {
    if (D.som === false) return;
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      if (AC.state === 'suspended') AC.resume();
      const now = AC.currentTime;
      freqs.forEach((f, i) => {
        const o = AC.createOscillator(), g = AC.createGain(), t0 = now + i * gap;
        o.type = type; o.frequency.value = f;
        g.gain.setValueAtTime(.0001, t0);
        g.gain.exponentialRampToValueAtTime(vol, t0 + .012);
        g.gain.exponentialRampToValueAtTime(.0001, t0 + len);
        o.connect(g).connect(AC.destination);
        o.start(t0); o.stop(t0 + len + .05);
      });
    } catch { /* sem áudio, tudo bem */ }
  }
  const sfx = {
    levelUp: () => tone([784, 988, 1175, 1568], { gap: .1, len: .45 }),
    orb: () => tone([1319, 1760], { gap: .06, len: .18, vol: .05 }),
    hurt: () => tone([180, 120], { type: 'square', gap: .06, len: .12, vol: .035 })
  };

  /* popup "Conquista feita!" */
  let advT;
  function advancement(icon, name, title = 'Conquista feita!', challenge = false) {
    const a = $('#adv');
    $('.adv-ico', a).textContent = icon || '⭐';
    $('.adv-t', a).textContent = title;
    $('.adv-n', a).textContent = name || '';
    a.classList.toggle('challenge', challenge);
    a.classList.remove('on'); void a.offsetWidth; a.classList.add('on');
    clearTimeout(advT); advT = setTimeout(() => a.classList.remove('on'), 4600);
  }

  /* ---------- progresso salvo no navegador ---------- */
  const KEY = 'arquivo22:v1';
  const store = {
    load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } },
    save(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch { /* sem storage, segue o jogo */ } },
    clear() {
      try {
        Object.keys(localStorage).filter(k => k.startsWith('arquivo22:')).forEach(k => localStorage.removeItem(k));
      } catch { /* idem */ }
    }
  };
  const params = new URLSearchParams(location.search);
  if (params.has('reset')) { store.clear(); history.replaceState(null, '', location.pathname); }
  const PREVIEW = params.has('tudo');
  let state = Object.assign({ boot: false, unlocked: [] }, store.load());
  if (PREVIEW) state = { boot: true, unlocked: CATS.map(c => c.id) };
  const save = () => { if (!PREVIEW) store.save(state); };
  const isOpen = id => state.unlocked.includes(id);
  const nextIndex = () => CATS.findIndex(c => !isOpen(c.id));

  /* ---------- tema / fundo ---------- */
  const bgEl = $('#bg');
  let rainColor = '#ff7a1a';
  function setTheme(t) {
    if (!t) return;
    ['--g1', '--g2', '--g3'].forEach((k, i) => bgEl.style.setProperty(k, t[i]));
    rainColor = t[0];
    document.documentElement.style.setProperty('--glow', t[0]);
  }
  function hubTheme() {
    const opened = CATS.filter(c => isOpen(c.id));
    return opened.length ? opened[opened.length - 1].tema : D.temas.hub;
  }

  /* ---------- chuva de caracteres (subindo) ---------- */
  function startRain() {
    const c = $('#rain');
    const ctx = c.getContext('2d');
    const CH = [...Array.from('0123456789ABCDEF<>/{}$#~22'), ...SGA, ...SGA];
    let w, h, fs, gap, cols, drops;
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = innerWidth; h = innerHeight;
      c.width = w * dpr; c.height = h * dpr;
      c.style.width = w + 'px'; c.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fs = w < 640 ? 13 : 15; gap = fs * 1.5;
      cols = Math.ceil(w / gap);
      drops = Array.from({ length: cols }, () => ({ y: Math.random() * h, v: .35 + Math.random(), on: Math.random() < .5 }));
    }
    resize();
    addEventListener('resize', resize);
    if (REDUCE) return;
    let last = 0;
    (function frame(t) {
      requestAnimationFrame(frame);
      if (t - last < 55) return;
      last = t;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,.14)';
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';
      ctx.font = `${fs}px "Monocraft", "JetBrains Mono", "Noto Sans Canadian Aboriginal", "Noto Sans Math", "Noto Sans Symbols 2", "Noto Sans Vai", "Noto Sans JP", monospace`;
      for (let i = 0; i < cols; i++) {
        const d = drops[i];
        if (!d.on) { if (Math.random() < .004) d.on = true; continue; }
        const ch = CH[(Math.random() * CH.length) | 0];
        ctx.fillStyle = rainColor;
        ctx.globalAlpha = .55;
        ctx.fillText(ch, i * gap, d.y + fs);
        ctx.fillStyle = '#fff3e6';
        ctx.globalAlpha = .8;
        ctx.fillText(ch, i * gap, d.y);
        d.y -= fs * d.v;
        if (d.y < -fs * 2) { d.y = h + Math.random() * h * .4; d.v = .35 + Math.random(); d.on = Math.random() < .55; }
      }
      ctx.globalAlpha = 1;
    })(0);
  }

  /* ---------- realce de sintaxe simplinho ---------- */
  const TOK = /('[^']*'|"[^"]*")|\b(0x[0-9a-fA-F]+|\d+)\b|\b(int|return|void|char|mov|shl|shr|add|sub|xor|printf|echo|cat|ls|tr|rev|base64|xxd|sudo|chmod|date|unlock)\b/g;
  function hl(src) {
    let code = src, comment = '';
    const m = src.match(/(^|\s)(\/\/|;|#)(\s|$)/);
    if (m) { const at = m.index + m[1].length; code = src.slice(0, at); comment = src.slice(at); }
    let out = '', last = 0, t;
    TOK.lastIndex = 0;
    while ((t = TOK.exec(code))) {
      out += esc(code.slice(last, t.index));
      if (t[1]) out += `<span class="hs">${esc(t[1])}</span>`;
      else if (t[2]) out += `<span class="hn">${esc(t[2])}</span>`;
      else out += `<span class="hk">${esc(t[3])}</span>`;
      last = TOK.lastIndex;
    }
    out += esc(code.slice(last));
    if (comment) out += `<span class="hm">${esc(comment)}</span>`;
    return out;
  }
  function logHTML(raw) {
    return esc(raw)
      .replace(/^(\[\s*\d+\.\d+\])/, '<span class="ts">$1</span>')
      .replace(/\[(\s*)OK(\s*)\]/, '[$1<span class="ok">OK</span>$2]')
      .replace(/\[(\s*)WARN(\s*)\]/, '[$1<span class="warn">WARN</span>$2]')
      .replace(/\[(\s*)INFO(\s*)\]/, '[$1<span class="info">INFO</span>$2]');
  }
  const promptHTML = (path = '~') =>
    `<span class="pu">${esc(USER)}@arquivo22</span><span class="pc">:</span><span class="pp">${esc(path)}</span><span class="pc">$</span>`;

  /* ---------- texto embaralhado que "decifra" ---------- */
  function scramble(el, text, dur = 800) {
    const G = [...SGA, ...Array.from('<>/{}#01')];
    if (REDUCE) { el.textContent = text; return Promise.resolve(); }
    const t0 = performance.now();
    return new Promise(res => {
      (function step(now) {
        const p = Math.min(1, (now - t0) / dur);
        const n = Math.floor(p * text.length);
        let s = text.slice(0, n);
        for (let i = n; i < text.length; i++) s += text[i] === ' ' ? ' ' : G[(Math.random() * G.length) | 0];
        el.textContent = s;
        p < 1 ? requestAnimationFrame(step) : res();
      })(t0);
    });
  }

  /* ============================================================
     TERMINAL
     ============================================================ */
  class Term {
    constructor(mount, { title, path = '~', onClose } = {}) {
      this.path = path; this.fast = false; this.busy = false; this.done = false; this.closed = false;
      this.hist = []; this.hi = 0; this.fails = 0; this.hintI = 0;
      const el = this.el = document.createElement('div');
      el.className = 'term';
      el.innerHTML = `
        <div class="t-bar">
          <span class="t-dot"></span>
          <span class="t-title">${esc(title)}</span>
          <span class="t-ctrl"><i></i><i></i><button class="t-x" type="button" aria-label="fechar" ${onClose ? '' : 'disabled tabindex="-1"'}></button></span>
        </div>
        <div class="t-body">
          <div class="t-out" role="log" aria-live="polite"></div>
          <div class="t-in" hidden>
            <span class="t-prompt">${promptHTML(path)}</span>
            <span class="t-field"><span class="t-mirror"></span><span class="t-cur"></span>
              <input class="t-input" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="send" aria-label="digite um comando ou a resposta">
            </span>
          </div>
        </div>
        <div class="t-status"><span><b>[arquivo22]</b> 0:bash*<span class="hide-m"> 1:amor</span></span><span class="t-clock"></span></div>`;
      mount.appendChild(el);
      this.body = $('.t-body', el); this.out = $('.t-out', el); this.row = $('.t-in', el);
      this.input = $('.t-input', el); this.mirror = $('.t-mirror', el);
      if (onClose) $('.t-x', el).addEventListener('click', onClose);
      this.input.addEventListener('input', () => { this.mirror.textContent = this.input.value; this.scroll(); });
      this.input.addEventListener('keydown', e => this.key(e));
      el.addEventListener('pointerdown', () => { if (this.busy) this.fast = true; });
      this.body.addEventListener('click', () => { if (!window.getSelection()?.toString()) this.focus(); });
      const clk = $('.t-clock', el);
      const tick = () => { clk.textContent = '♥ 22 · ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); };
      tick(); this.clock = setInterval(tick, 15000);
    }
    focus() { if (!this.row.hidden) this.input.focus({ preventScroll: true }); }
    scroll() { this.body.scrollTop = this.body.scrollHeight; }
    wait(ms) { return this.fast || REDUCE ? Promise.resolve() : sleep(ms); }
    add(html, cls = '') {
      const d = document.createElement('div');
      d.className = 'ln ' + cls; d.innerHTML = html;
      this.out.appendChild(d); this.scroll();
      return d;
    }
    clear() { this.out.innerHTML = ''; }
    async type(node, text, speed = 30) {
      if (this.fast || REDUCE) { node.textContent += text; this.scroll(); return; }
      for (let i = 0; i < text.length; i++) {
        if (this.fast || this.closed) { node.textContent += text.slice(i); break; }
        node.textContent += text[i];
        if (i % 4 === 0) this.scroll();
        await sleep(speed * (.55 + Math.random() * .9));
      }
      this.scroll();
    }
    async line(raw, { typing = true } = {}) {
      raw = String(raw);
      if (raw === '') return this.add('&nbsp;', 'blank');
      if (raw.startsWith('$ ')) {
        const cmd = raw.slice(2);
        const d = this.add(promptHTML(this.path) + ' <span class="c"></span>', 'cmd');
        const c = $('.c', d);
        if (typing) { await this.wait(260); await this.type(c, cmd, 42); await this.wait(220); }
        c.innerHTML = hl(cmd);
        return d;
      }
      if (raw.startsWith('> ') || raw === '>') return this.add(hl(raw.slice(2)) || '&nbsp;', 'code');
      if (raw.startsWith('#')) return this.add(esc(raw), 'cmt');
      if (/^\[\s*(OK|WARN|INFO)\s*\]/.test(raw) || /^\[\s*\d+\.\d+\]/.test(raw)) return this.add(logHTML(raw), 'log');
      const em = raw.startsWith('! ');
      const text = em ? raw.slice(2) : raw;
      const d = this.add('', em ? 'em' : 'out');
      if (typing) await this.type(d, text, em ? 24 : 13); else d.textContent = text;
      return d;
    }
    async print(lines, opts = {}) {
      for (const l of lines) {
        if (this.closed) return;
        await this.line(l, opts);
        await this.wait(opts.gap ?? (opts.typing === false ? 0 : 70));
      }
    }
    prompt() {
      if (this.closed || this.done) return;
      this.busy = false; this.fast = false;
      this.row.hidden = false; this.scroll(); this.focus();
    }
    async key(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (this.busy) return;
        const v = this.input.value;
        this.input.value = ''; this.mirror.textContent = '';
        if (!this.quiet || !v.trim() || !/^[a-zà-ú]{5}$/i.test(v.trim())) this.add(promptHTML(this.path) + ' <span class="c">' + esc(v) + '</span>', 'cmd echo');
        if (v.trim()) this.hist.push(v);
        this.hi = this.hist.length;
        this.row.hidden = true; this.busy = true;
        try { await this.onCommand?.(v); } finally { this.prompt(); }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        if (!this.hist.length) return;
        e.preventDefault();
        this.hi = Math.max(0, Math.min(this.hist.length, this.hi + (e.key === 'ArrowUp' ? -1 : 1)));
        this.input.value = this.hist[this.hi] ?? '';
        this.mirror.textContent = this.input.value;
      } else if (e.key.toLowerCase() === 'l' && e.ctrlKey) {
        e.preventDefault(); this.clear(); this.onClear?.();
      }
    }
    shake() { this.el.classList.remove('shake', 'okflash'); void this.el.offsetWidth; this.el.classList.add('shake'); }
    flash() { this.el.classList.remove('shake', 'okflash'); void this.el.offsetWidth; this.el.classList.add('okflash'); }
    destroy() { this.closed = true; clearInterval(this.clock); this.el.remove(); }
  }

  /* ---------- respostas ---------- */
  function norm(s) {
    return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
      .replace(/^(sudo\s+)?(echo\s+(-n\s+)?)?/, '')
      .replace(/^["'`]+|["'`]+$/g, '')
      .replace(/\s+/g, ' ').trim();
  }
  function matches(input, step) {
    const a = norm(input);
    if (!a) return false;
    return (step.respostas || []).some(r => {
      const b = norm(r);
      if (a === b) return true;
      if (step.soNumeros) {
        const x = a.replace(/\D/g, ''), y = b.replace(/\D/g, '');
        const parts = z => z.split(/\D+/).filter(Boolean).map(n => parseInt(n, 10)).join('-');
        return !!y && (x === y || parts(a) === parts(b));
      }
      const x = a.replace(/[^a-z0-9]/g, ''), y = b.replace(/[^a-z0-9]/g, '');
      return !!y && x === y;
    });
  }

  const NOPE = [
    'acesso negado.',
    'permission denied.',
    'senha incorreta. tenta de novo.',
    'segmentation fault (core dumped). brincadeira, só tá errado mesmo.',
    'nope. mas eu acredito em você.',
    'kernel panic: resposta inválida.',
    'quase. (ou não.)',
    'errno 22: EINVAL. argumento inválido. (viu? até o erro é 22.)',
    'Creeper? Aw man. 💥',
    'você morreu! causa: resposta errada. [renascer]',
    'você caiu para fora do mundo.'
  ];
  function wrong(t, v) {
    t.fails++; t.shake();
    sfx.hurt();
    navigator.vibrate?.(40);
    const msg = NOPE[(t.fails - 1) % NOPE.length];
    t.add(`<span class="err">bash: ${esc(v.trim().slice(0, 40))}:</span> ${esc(msg)}`, 'out');
    if (t.fails % 3 === 0) t.add('<span class="hm"># psst… digite </span><span class="hk">hint</span><span class="hm"> se quiser uma ajudinha.</span>', 'cmt');
  }
  function hint(t, step) {
    const ds = step.dicas || [];
    if (t.hintI >= ds.length) { t.add(esc('# acabaram as dicas. você consegue. ♥'), 'cmt'); return; }
    t.add(`<span class="hint-tag">dica ${t.hintI + 1}/${ds.length}</span>${esc(ds[t.hintI])}`, 'out');
    t.hintI++;
  }

  function neofetch() {
    const art = [
      '  ██████   ██████ ',
      '       ██       ██',
      '  ██████   ██████ ',
      '  ██       ██     ',
      '  ███████  ███████',
    ].join('\n');
    const L = (k, v) => `<span class="pu">${k}</span> ${esc(v)}`;
    const info = [
      `<span class="pu">${esc(USER)}</span>@<span class="pu">arquivo22</span>`,
      '<span class="hm">' + '-'.repeat(USER.length + 10) + '</span>',
      L('OS:', 'Arquivo 22 (do bem) x86_64'),
      L('Host:', `${D.apelido || 'coração'} v22`),
      L('Kernel:', '6.22.0-amor'),
      L('Uptime:', '22 anos'),
      L('Shell:', 'bash 5.22'),
      L('Cor:', '#FF7A1A'),
      L('Memória:', '22 GiB / ∞'),
    ].join('\n');
    const sw = ['#ff7a1a', '#ff3d6e', '#9b5cff', '#1fd1b0', '#3d8bff', '#ffcf4d', '#ff4fa3'].map(c => `<span style="background:${c}"></span>`).join('');
    return `<pre class="art">${art}</pre><div><pre>${info}</pre><div class="sw">${sw}</div></div>`;
  }

  /* comandos que funcionam em qualquer terminal do site */
  async function common(t, v, ctx) {
    const low = v.trim().toLowerCase();
    const [cmd, ...args] = low.split(/\s+/);
    if (cmd.startsWith('/')) {
      const MC = {
        '/seed': 'Seed: [22]',
        '/gamemode': 'Você não tem permissão para usar este comando. (ainda.)',
        '/give': `Deu [Diamante] × 22 a ${USER} ♥`,
        '/kill': `${USER} caiu para fora do mundo. (brincadeira. resolve o enigma.)`,
        '/tp': 'teleporte negado. o único caminho é resolver o enigma.',
        '/time': 'hora definida para: aniversário',
        '/weather': 'clima definido para: limpo, com 100% de chance de amor',
        '/xp': `${USER} já está no nível 22.`,
        '/op': `${USER} não é operador. ainda.`,
        '/help': 'comandos: /seed /give /gamemode /time /weather /xp /tp /kill'
      };
      t.add(esc(MC[cmd] || `Comando desconhecido: ${cmd}. tente /help`), MC[cmd] ? 'em' : 'out');
      return true;
    }
    switch (cmd) {
      case 'creeper': t.add('aw man. 💥', 'em'); return true;
      case '': return true;
      case 'help': case '--help': case 'man': case 'ajuda':
        await t.print([
          'comandos:',
          '  help       mostra isso',
          '  hint       uma dica (sem julgamentos)',
          '  ls / cat   olhar em volta',
          '  clear      limpa a tela e mostra o enigma de novo',
          '  whoami     ...',
          '  neofetch   info do sistema',
          '  /help      comandos do jogo ;)',
          ...(ctx.close ? ['  exit       fechar este terminal'] : []),
          '',
          '# ou só digite a resposta e aperte enter.'
        ], { typing: false });
        return true;
      case 'hint': case 'dica': case 'dicas': hint(t, ctx.step()); return true;
      case 'clear': case 'cls': t.clear(); await ctx.reprint(); return true;
      case 'whoami': t.add(esc(USER) + ` <span class="hm"># o aniversariante 🎂 (vulgo ${esc(D.apelido || '')} 🐱)</span>`, 'out'); return true;
      case 'pwd': t.add(esc('/home/' + USER + (ctx.dir ? '/' + ctx.dir : '')), 'out'); return true;
      case 'date': t.add(esc(new Date().toString()), 'out'); return true;
      case 'neofetch': case 'fastfetch': case 'screenfetch': t.add(neofetch(), 'nf'); return true;
      case 'ls': await ctx.ls(t, args); return true;
      case 'cat': case 'less': case 'more': await ctx.cat(t, args); return true;
      case 'cd': t.add(`<span class="err">cd: ${esc(args[0] || '~')}:</span> permission denied. resolva o enigma primeiro.`, 'out'); return true;
      case 'sudo':
        if (args.length) return false;
        t.add(esc(`${USER} is not in the sudoers file. This incident will be reported.`), 'out');
        t.add(esc('# brincadeira. só digite a resposta.'), 'cmt');
        return true;
      case 'rm': t.add('nem pensar. esse arquivo é protegido pelo coração. ♥', 'out'); return true;
      case 'vim': case 'vi': case 'nvim': case 'nano': case 'emacs':
        t.add(esc(`${cmd}: aqui não. você ia ficar preso pra sempre. digite a resposta.`), 'out'); return true;
      case 'history': t.add(esc(t.hist.map((h, i) => `  ${String(i + 1).padStart(3)}  ${h}`).join('\n')), 'out'); return true;
      case 'uname': t.add('Arquivo22 6.22.0-amor x86_64 GNU/Linux', 'out'); return true;
      case 'exit': case 'logout': case 'quit': case 'q': case ':q': case ':q!':
        if (ctx.close) ctx.close(); else t.add('não tem saída. só pra frente. ♥', 'out');
        return true;
      case 'love': case 'amor': t.add('♥ ♥ ♥', 'em'); return true;
    }
    return false;
  }

  /* roda um enigma (de 1 ou mais etapas) dentro de um terminal */
  function runRiddle(t, enigma, { dir, close, ls, cat, onSolved }) {
    let si = 0;
    const steps = enigma.passos;
    const step = () => steps[si];
    const printStep = async (typing = true) => {
      if (steps.length > 1) t.add(`<span class="hm"># ${steps.length > 3 ? 'pergunta' : 'etapa'} ${si + 1}/${steps.length}</span>`, 'cmt');
      await t.print(step().linhas, { typing });
      t.quiet = !!step().termo;
      if (step().termo) { lastRow = -1; drawBoard(tg.length ? `${6 - tg.length} tentativas restantes` : 'digite ou toque nas letras e aperte enter'); }
    };
    const ctx = { dir, close, step, reprint: () => printStep(false), ls, cat };
    t.onClear = () => printStep(false);
    const advance = async () => {
      t.fails = 0; t.hintI = 0; t.flash(); sfx.orb();
      navigator.vibrate?.([20, 30, 20]);
      if (si < steps.length - 1) {
        si++;
        t.add(logHTML(steps.length > 3 ? `[  OK  ] acertou! ${si}/${steps.length}` : `[  OK  ] chave ${si}/${steps.length} aceita.`), 'log');
        await t.wait(500);
        t.add('&nbsp;', 'blank');
        await printStep(true);
        return;
      }
      t.done = true;
      await onSolved();
    };
    /* termo (wordle) dentro do terminal: tabuleiro fixo + teclado */
    const TERMO_CMDS = ['clear', 'uname', 'help', 'hint', 'dica'];
    const KB = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
    let tg = [], keys = {}, boardEl = null, lastRow = -1;
    const termoTarget = () => norm(step().termo || '').replace(/[^a-z]/g, '');
    const tmsg = (txt, cls = '') => { const m = boardEl && $('.tmb-msg', boardEl); if (m) { m.className = 'tmb-msg ' + cls; m.textContent = txt; } };
    function onKey(e) {
      e.stopPropagation();
      const b = e.target.closest('.tmk');
      if (!b || t.busy || t.done) return;
      const k = b.dataset.k, inp = t.input;
      if (k === 'enter') { t.key({ key: 'Enter', preventDefault() {} }); return; }
      if (k === 'back') inp.value = inp.value.slice(0, -1);
      else if (inp.value.length < termoTarget().length) inp.value += k;
      t.mirror.textContent = inp.value;
    }
    function drawBoard(msg = '', cls = '') {
      const n = termoTarget().length;
      const rows = Array.from({ length: 6 }, (_, r) => {
        const gs = tg[r];
        return `<div class="tmb-row${r === lastRow ? ' new' : ''}">${Array.from({ length: n }, (_, k) => gs
          ? `<span class="tm ${gs.res[k]}" style="--k:${k}">${esc(gs.g[k].toUpperCase())}</span>`
          : '<span class="tm e"></span>').join('')}</div>`;
      }).join('');
      const kb = KB.map((row, ri) => `<div class="tmk-row">${ri === 2 ? '<button type="button" class="tmk wide" data-k="enter">enter</button>' : ''}${[...row].map(ch => `<button type="button" class="tmk ${keys[ch] || ''}" data-k="${ch}" aria-label="${ch}">${ch.toUpperCase()}</button>`).join('')}${ri === 2 ? '<button type="button" class="tmk wide" data-k="back" aria-label="apagar">⌫</button>' : ''}</div>`).join('');
      const html = `<div class="tmb">${rows}</div><div class="tmb-msg ${cls}">${esc(msg)}</div><div class="tmk-wrap">${kb}</div>`;
      if (boardEl && boardEl.isConnected) boardEl.innerHTML = html;
      else { boardEl = t.add(html, 'tm-board'); boardEl.addEventListener('click', onKey); }
      t.scroll();
    }
    function termoGuess(v) {
      const target = termoTarget();
      const g = norm(v).replace(/[^a-z]/g, '');
      if (g.length !== target.length || TERMO_CMDS.includes(g) || /\s/.test(norm(v))) return null;
      const res = Array(target.length).fill('x'), used = Array(target.length).fill(false);
      for (let k = 0; k < g.length; k++) if (g[k] === target[k]) { res[k] = 'g'; used[k] = true; }
      for (let k = 0; k < g.length; k++) {
        if (res[k] === 'g') continue;
        const q = [...target].findIndex((ch, p) => !used[p] && ch === g[k]);
        if (q >= 0) { res[k] = 'y'; used[q] = true; }
      }
      tg.push({ g, res });
      [...g].forEach((ch, k) => { const r = res[k], prev = keys[ch]; if (r === 'g' || (r === 'y' && prev !== 'g') || (r === 'x' && !prev)) keys[ch] = r; });
      lastRow = tg.length - 1;
      return g === target;
    }
    t.onCommand = async v => {
      const sp = step();
      if (sp.termo) {
        const r = termoGuess(v);
        if (r !== null) {
          if (r) {
            drawBoard('ACERTOU! 🎉', 'ok');
            await t.wait(1600);
            tg = []; keys = {}; lastRow = -1; t.quiet = false;
            return advance();
          }
          sfx.hurt();
          if (tg.length >= 6) {
            drawBoard('você morreu! acabaram as 6 tentativas. [renascer]', 'err');
            await sleep(2200);
            tg = []; keys = {}; lastRow = -1;
            drawBoard('tabuleiro zerado. mesma palavra, tenta de novo!');
          } else {
            drawBoard(`${6 - tg.length} ${6 - tg.length === 1 ? 'tentativa restante' : 'tentativas restantes'}`);
          }
          return;
        }
        if (await common(t, v, ctx)) return;
        t.shake();
        if (boardEl && boardEl.isConnected) tmsg(`a palavra tem ${termoTarget().length} letras.`, 'err');
        else t.add(`<span class="err">termo:</span> a palavra tem ${termoTarget().length} letras.`, 'out');
        return;
      }
      if (matches(v, sp)) return advance();
      if (await common(t, v, ctx)) return;
      wrong(t, v);
    };
    return printStep;
  }

  /* ============================================================
     ANIMAÇÃO DE DESBLOQUEIO
     ============================================================ */
  const LOCK_SVG = `
    <svg class="lock" viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true">
      <g class="shackle" fill="currentColor">
        <rect x="5" y="1" width="6" height="2"/><rect x="4" y="2" width="2" height="2"/><rect x="10" y="2" width="2" height="2"/>
        <rect x="3" y="3" width="2" height="5"/><rect x="11" y="3" width="2" height="5"/>
      </g>
      <rect x="2" y="7" width="12" height="8" fill="currentColor"/>
      <rect x="2" y="7" width="12" height="1" fill="#fff" opacity=".35"/>
      <rect x="2" y="13" width="12" height="2" fill="#000" opacity=".28"/>
      <rect x="7" y="9" width="2" height="2" fill="#0b0908"/>
      <rect x="7" y="11" width="2" height="2" fill="#0b0908" opacity=".8"/>
    </svg>`;

  let fxRunning = false;
  async function unlockFX({ title, sub, theme, onOpen }) {
    fxRunning = true;
    const fx = $('#fx');
    const R = 98, C = +(2 * Math.PI * R).toFixed(2);
    fx.innerHTML = `
      <div class="fx-flash"></div>
      <div class="fx-center">
        <div class="fx-dial">
          <svg class="fx-ring" viewBox="0 0 230 230">
            <circle class="ticks" cx="115" cy="115" r="110"/>
            <circle class="track" cx="115" cy="115" r="${R}"/>
            <circle class="prog" cx="115" cy="115" r="${R}" style="stroke-dasharray:${C};stroke-dashoffset:${C}"/>
          </svg>
          <div class="fx-wave"></div><div class="fx-wave w2"></div>
          <div class="fx-lock">${LOCK_SVG}</div>
          <div class="fx-digits">00</div>
          <div class="fx-parts"></div>
        </div>
        <div class="fx-title"></div>
        <div class="fx-sub"></div>
      </div>`;
    fx.className = 'on';
    const prog = $('.prog', fx), dig = $('.fx-digits', fx);
    await sleep(60);
    fx.classList.add('s1');
    prog.style.strokeDashoffset = '0';
    const dur = REDUCE ? 0 : 1150, t0 = performance.now();
    await new Promise(res => {
      (function f(now) {
        const p = dur ? Math.min(1, (now - t0) / dur) : 1;
        dig.textContent = pad(Math.round(p * 22));
        p < 1 ? requestAnimationFrame(f) : res();
      })(t0);
    });
    fx.classList.remove('s1');
    fx.classList.add('s2');
    navigator.vibrate?.([30, 40, 80]);
    burst($('.fx-parts', fx));
    sfx.levelUp();
    setTheme(theme);
    onOpen?.();
    scramble($('.fx-title', fx), title, 700);
    setTimeout(() => scramble($('.fx-sub', fx), sub, 700), 260);
    await sleep(REDUCE ? 900 : 2100);
    fx.classList.add('s3');
    await sleep(700);
    fx.className = ''; fx.innerHTML = '';
    fxRunning = false;
  }
  function burst(box) {
    if (REDUCE) return;
    const G = [...SGA, '♥', '22'];
    for (let i = 0; i < 50; i++) {
      const s = document.createElement('span');
      const orb = i % 2 === 0;
      s.className = orb ? 'pt orb' : 'pt';
      if (!orb) s.textContent = G[(Math.random() * G.length) | 0];
      const a = Math.random() * Math.PI * 2, r = 110 + Math.random() * 280;
      s.style.setProperty('--dx', (Math.cos(a) * r).toFixed(0) + 'px');
      s.style.setProperty('--dy', (Math.sin(a) * r).toFixed(0) + 'px');
      s.style.setProperty('--r', (Math.random() * 360 - 180).toFixed(0) + 'deg');
      s.style.setProperty('--d', (Math.random() * .22).toFixed(2) + 's');
      s.style.fontSize = (11 + Math.random() * 15).toFixed(0) + 'px';
      box.appendChild(s);
    }
  }

  let toastT;
  function toast(msg, ms = 2600) {
    const el = $('#toast');
    el.textContent = msg; el.classList.add('on');
    clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('on'), ms);
  }

  /* ============================================================
     1) BOOT + ENIGMA 00
     ============================================================ */
  const BOOTLOG = [
    '[    0.000000] Linux version 6.22.0-arquivo22 (amor@coracao) (gcc 22.1) #22 SMP PREEMPT',
    `[    0.000022] Command line: BOOT_IMAGE=/vmlinuz-22 root=/dev/coracao ro quiet user=${USER}`,
    '[    0.104221] Memory: 22 anos disponíveis, 0K reservados',
    '[    0.220022] smpboot: 1 aniversariante detectado',
    '[    0.322000] random: crng init done (com carinho)',
    '[  OK  ] Started Arquivo 22 (do bem).',
    '[ INFO ] Gerando mundo... seed: 22',
    '[ INFO ] Preparando área de spawn: 100%',
    `[  OK  ] Mounted /home/${USER}/memorias.`,
    '[ WARN ] Creeper detectado nas proximidades. (ignorando)',
    '[  OK  ] Reached target Feliz Aniversário.',
    '[ WARN ] 6 pastas criptografadas encontradas.',
    '[ INFO ] aguardando chave de acesso...'
  ];

  async function runBoot() {
    $('#boot').hidden = false;
    setTheme(D.temas.boot);
    const t = new Term($('#bootMount'), { title: `${USER}@arquivo22: ~` });
    t.busy = true;
    const speed = () => { if (t.busy) t.fast = true; };
    document.addEventListener('keydown', speed);

    await sleep(700);
    for (const l of BOOTLOG) { t.add(logHTML(l), 'log'); await t.wait(60 + Math.random() * 140); }
    await t.wait(900);
    t.clear();

    let d = t.add('<span class="hm">arquivo22 login: </span><span class="c"></span>', 'out');
    await t.wait(350); await t.type($('.c', d), USER, 80);
    d = t.add('<span class="hm">Password: </span><span class="c"></span>', 'out');
    await t.wait(300); await t.type($('.c', d), '••••••••••', 55);
    await t.wait(400);
    t.add(`<span class="hm">Last login: ${esc(new Date().toLocaleString('pt-BR'))} on tty22</span>`, 'out');
    await t.wait(500);
    t.add(`<div class="motd-t">Arquivo <em>22</em></div><div class="motd-s"><span class="hk">(do bem)</span> · v22.0 · by: ${esc(D.de)}</div>`, 'motd');
    await t.wait(1100);
    await t.print(D.intro.mensagem);

    const ls = (tt) => {
      tt.add(`<span class="pp">enigma_00.c</span>   ${CATS.map(c => `<span class="hm">${esc(c.id)}/</span>`).join('  ')}`, 'out');
      tt.add(esc('# as pastas estão trancadas. comece pelo enigma_00.c'), 'cmt');
    };
    const cat = async (tt, args) => {
      const f = (args[0] || '').replace(/^\.\//, '');
      if (f === 'enigma_00.c' || f === 'enigma_00') return printStep(false);
      if (f === '/etc/motd') return tt.print(D.intro.mensagem.slice(1), { typing: false, gap: 0 });
      tt.add(`<span class="err">cat: ${esc(args[0] || '')}:</span> ${args[0] ? 'Permission denied' : 'qual arquivo?'}`, 'out');
    };
    const printStep = runRiddle(t, D.intro.enigma, {
      dir: '', ls, cat,
      onSolved: async () => {
        t.add(logHTML('[  OK  ] chave aceita: 22'), 'log');
        await sleep(300);
        const p = t.add('', 'out');
        for (let i = 0; i <= 22; i++) {
          p.innerHTML = `descriptografando /home/${esc(USER)} <span class="bar">[${'█'.repeat(i)}${'░'.repeat(22 - i)}]</span> ${Math.round(i / 22 * 100)}%`;
          await sleep(REDUCE ? 0 : 55);
        }
        await sleep(450);
        state.boot = true; save();
        $('#boot').classList.add('leave');
        await unlockFX({
          title: 'ACESSO CONCEDIDO',
          sub: `arquivo 22 montado em /home/${USER}`,
          theme: D.temas.hub,
          onOpen: () => { t.destroy(); showHub(true); }
        });
        const ic = D.intro.conquista || {};
        setTimeout(() => advancement(ic.icone || '🪵', ic.nome || 'Pegando madeira'), 300);
        setTimeout(() => toast(`dica: comece por ~/${CATS[0].id}`), 5200);
      }
    });
    await printStep(true);
    document.removeEventListener('keydown', speed);
    $('#skip').classList.add('off');
    t.prompt();
  }

  /* ============================================================
     2) HUB / CARROSSEL
     ============================================================ */
  const track = $('#track');
  let cards = [], active = 0;

  function previewHTML(c) {
    if (c.tipo === 'fotos') {
      const imgs = c.itens.slice(0, 9).map(x => `<img src="${esc(x.src)}" alt="" loading="lazy" onerror="this.style.visibility='hidden'">`).join('');
      return `<div class="pv-blob"></div><div class="pv-grid">${imgs}</div>`;
    }
    const label = x => typeof x === 'string' ? x : (x.titulo || x.nome || '');
    return `<div class="pv-blob"></div><div class="pv-text">${c.itens.slice(0, 14).map(x => `<span>${esc(label(x))}</span>`).join('')}</div>`;
  }

  function cardState(i) {
    const c = CATS[i];
    if (isOpen(c.id)) return 'open';
    return i === nextIndex() ? 'next' : 'future';
  }

  function buildHub() {
    $('#hubWho').textContent = `${USER}@arquivo22:~ · montado`;
    $('#footSig').textContent = `feito com ♥ por ${D.de} · só pra ${D.nome}`;
    $('#mailPath').textContent = `/var/mail/${USER}`;
    const sp = D.splash || ['Feliz 22!'];
    $('#splash').textContent = sp[(Math.random() * sp.length) | 0];
    track.innerHTML = CATS.map((c, i) => `
      <article class="card" data-i="${i}" tabindex="0" style="--k:${i};--c1:${c.tema[0]};--c2:${c.tema[1]};--c3:${c.tema[2]}">
        <div class="card-preview">${previewHTML(c)}</div>
        <div class="card-shade"></div>
        <div class="card-body">
          <div class="card-top"><span><span class="ico">${esc(c.icone || '')}</span>${pad(i + 1)} / ${pad(N)}</span><span class="perm"></span></div>
          <div class="card-lock">${LOCK_SVG}</div>
          <div class="card-info">
            <h3><span class="n">22</span><span class="t">${esc(c.titulo)}</span></h3>
            <p class="path">~/${esc(c.id)}</p>
            <div class="lvl"><span>nível</span>${Array.from({ length: N }, (_, k) => `<i class="${k < (c.nivel || i + 1) ? 'on' : ''}"></i>`).join('')}</div>
            <div class="card-btn"><span class="b-l"></span><span class="b-r"></span></div>
          </div>
        </div>
      </article>`).join('');
    cards = $$('.card', track);
    $('#dots').innerHTML = CATS.map((c, i) => `<button type="button" aria-label="${esc(c.titulo)}" data-i="${i}">${esc(c.icone || '')}</button>`).join('');
    refresh();
  }

  function refresh(justIndex = -1) {
    cards.forEach((el, i) => {
      const st = cardState(i);
      const was = el.dataset.st;
      el.classList.remove('open', 'next', 'future');
      el.classList.add(st);
      el.dataset.st = st;
      const c = CATS[i];
      const perm = $('.perm', el);
      const permTxt = st === 'open' ? 'drwxr-xr-x' : 'd---------';
      if (i === justIndex && was !== 'open') scramble(perm, permTxt, 900); else perm.textContent = permTxt;
      const prev = CATS[i - 1];
      $('.b-l', el).textContent = st === 'open' ? `cd ~/${c.id}` : st === 'next' ? 'sudo unlock' : `requer ~/${prev ? prev.id : ''}`;
      $('.b-r', el).textContent = st === 'open' ? '→' : st === 'next' ? '⏎' : '🔒';
      el.setAttribute('aria-label', `22 ${c.titulo}: ${st === 'open' ? 'desbloqueado' : 'trancado'}`);
      if (i === justIndex) { el.classList.remove('just'); void el.offsetWidth; el.classList.add('just'); }
    });
    $$('#dots button').forEach((b, i) => b.classList.toggle('open', isOpen(CATS[i].id)));
    const done = state.unlocked.length;
    $('#xpFill').style.width = (done / N * 100) + '%';
    $('#progTxt').textContent = done === N ? `${N}/${N} desbloqueados · sistema 100% seu` : `${done}/${N} desbloqueados`;
    $('#mail').hidden = nextIndex() !== -1;
    updateCar();
  }

  function updateCar() {
    if (!cards.length) return;
    const mid = track.scrollLeft + track.clientWidth / 2;
    let best = 0, bd = Infinity;
    cards.forEach((c, i) => {
      const cc = c.offsetLeft + c.offsetWidth / 2;
      const d = Math.abs(cc - mid);
      c.style.setProperty('--p', Math.min(1, d / (c.offsetWidth + 22)).toFixed(3));
      if (d < bd) { bd = d; best = i; }
    });
    active = best;
    $$('#dots button').forEach((b, i) => b.classList.toggle('on', i === active));
  }
  function goTo(i, smooth = true) {
    i = Math.max(0, Math.min(N - 1, i));
    const c = cards[i];
    if (!c) return;
    track.scrollTo({ left: c.offsetLeft - (track.clientWidth - c.offsetWidth) / 2, behavior: smooth && !REDUCE ? 'smooth' : 'auto' });
  }

  let scrollRaf = 0;
  track.addEventListener('scroll', () => { cancelAnimationFrame(scrollRaf); scrollRaf = requestAnimationFrame(updateCar); }, { passive: true });
  addEventListener('resize', () => { updateCar(); });
  $('#prev').addEventListener('click', () => goTo(active - 1));
  $('#next').addEventListener('click', () => goTo(active + 1));
  $('#dots').addEventListener('click', e => { const b = e.target.closest('button'); if (b) goTo(+b.dataset.i); });

  // arrastar com o mouse
  let drag = null, moved = false;
  track.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    drag = { x: e.clientX, s: track.scrollLeft }; moved = false;
  });
  addEventListener('pointermove', e => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    if (!moved && Math.abs(dx) > 6) { moved = true; track.classList.add('drag'); }
    if (moved) track.scrollLeft = drag.s - dx;
  });
  addEventListener('pointerup', () => {
    if (!drag) return;
    drag = null;
    if (moved) { track.classList.remove('drag'); updateCar(); goTo(active); }
  });

  track.addEventListener('click', e => {
    if (moved) { moved = false; return; }
    const el = e.target.closest('.card');
    if (!el) return;
    const i = +el.dataset.i;
    if (i !== active) { goTo(i); return; }
    activate(i);
  });
  track.addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.target.classList.contains('card')) activate(+e.target.dataset.i);
  });

  function activate(i) {
    const c = CATS[i], st = cardState(i);
    if (st === 'open') openViewer(c);
    else if (st === 'next') (c.enigma && c.enigma.tipo === 'logica' ? openLogic : openRiddle)(c, i);
    else toast(`🔒 primeiro desbloqueie ~/${CATS[nextIndex()].id}`);
  }

  function showHub(enter) {
    $('#boot').hidden = true;
    const hub = $('#hub');
    hub.hidden = false;
    document.body.classList.add('in-hub');
    buildHub();
    if (enter) { hub.classList.remove('enter'); void hub.offsetWidth; hub.classList.add('enter'); }
    setTimeout(() => hub.classList.remove('enter'), 2600);
    setTheme(hubTheme());
    const ni = nextIndex();
    requestAnimationFrame(() => { goTo(ni === -1 ? N - 1 : ni, false); updateCar(); });
  }

  /* ============================================================
     3) TERMINAL DO ENIGMA DE CADA CATEGORIA
     ============================================================ */
  let modalTerm = null;
  function openRiddle(c, i) {
    const m = $('#modal');
    m.classList.remove('out'); m.hidden = false;
    document.body.classList.add('noscroll');
    const mount = $('#modalMount');
    mount.innerHTML = ''; mount.className = 'modal-mount';
    const t = modalTerm = new Term(mount, { title: `sudo unlock ~/${c.id}`, onClose: closeModal });
    t.busy = true;
    const ls = tt => {
      tt.add(`<span class="pp">.senha</span>  <span class="hm">${esc(c.id)}/</span>`, 'out');
      tt.add(esc('# use clear pra ver o enigma de novo.'), 'cmt');
    };
    const cat = (tt, args) => {
      if (!args[0]) { tt.add('<span class="err">cat:</span> qual arquivo?', 'out'); return; }
      return printStep(false);
    };
    const printStep = runRiddle(t, c.enigma, {
      dir: c.id, close: closeModal, ls, cat,
      onSolved: async () => {
        t.add(logHTML('[  OK  ] senha aceita. removendo criptografia...'), 'log');
        await sleep(REDUCE ? 200 : 800);
        closeModal();
        await sleep(200);
        unlockCategory(c, i);
      }
    });
    (async () => {
      await t.line(`$ sudo unlock ~/${c.id}`);
      t.add(`<span class="hm">[sudo] senha para ${esc(USER)}: resolva o enigma abaixo</span>`, 'out');
      const extra = c.enigma.passos.length > 1 ? ` · ${c.enigma.passos.length} chaves` : '';
      t.add(`<span class="hm"># ~/${esc(c.id)} · nível ${c.nivel || i + 1} de ${N}${extra}</span>`, 'cmt');
      t.add('&nbsp;', 'blank');
      await printStep(true);
      t.prompt();
    })();
  }
  /* enigma de lógica: tabela interativa */
  function openLogic(c, i) {
    const E = c.enigma, P = E.pessoas, AT = E.atributos, N3 = P.length * AT.length;
    const LKEY = 'arquivo22:logica:' + c.id;
    const st = (() => { try { return JSON.parse(localStorage.getItem(LKEY)) || {}; } catch { return {}; } })();
    st.sel = st.sel || {}; st.done = st.done || []; st.locked = st.locked || [];
    if (typeof st.hints !== 'number') st.hints = E.dicas ?? 3;
    const saveSt = () => { try { localStorage.setItem(LKEY, JSON.stringify(st)); } catch { /* sem storage */ } };
    let fails = 0;

    const m = $('#modal');
    m.classList.remove('out'); m.hidden = false;
    document.body.classList.add('noscroll');
    const mount = $('#modalMount');
    mount.innerHTML = ''; mount.className = 'modal-mount wide';
    const el = document.createElement('div');
    el.className = 'term lg';
    el.innerHTML = `
      <div class="t-bar">
        <span class="t-dot"></span>
        <span class="t-title">sudo unlock ~/${esc(c.id)} — enigma_01.lp</span>
        <span class="t-ctrl"><i></i><i></i><button class="t-x" type="button" aria-label="fechar"></button></span>
      </div>
      <div class="lg-body">
        <div class="lg-head">
          <div class="lg-k"># ~/${esc(c.id)} · nível ${c.nivel || i + 1} de ${N} · lógica</div>
          <h3>${esc(E.titulo || 'enigma')}</h3>
          <p>${esc(E.intro || '')}</p>
        </div>
        <div class="lg-grid">
          <section class="lg-clues">
            <div class="lg-h"><span>// pistas</span><span>toque pra riscar</span></div>
            <ol>${E.pistas.map((p, k) => `<li data-k="${k}" class="${st.done.includes(k) ? 'done' : ''}">${esc(p)}</li>`).join('')}</ol>
          </section>
          <section class="lg-table">
            <div class="lg-h"><span>// tabela</span><span class="lg-prog"></span></div>
            <div class="lg-hd"><div></div>${AT.map(x => `<div>${esc(x.nome)}</div>`).join('')}</div>
            <div class="lg-rows"></div>
            <div class="lg-msg" role="status"></div>
            <div class="lg-foot">
              <div class="lg-actions">
                <button class="lg-btn lg-hint" type="button"></button>
                <button class="lg-btn lg-clear" type="button">limpar</button>
              </div>
              <button class="lg-btn go lg-check" type="button">./verificar ⏎</button>
            </div>
          </section>
        </div>
      </div>
      <div class="t-status"><span><b>[arquivo22]</b> 0:logica*</span><span>♥ só existe uma solução</span></div>`;
    mount.appendChild(el);
    $('.t-x', el).addEventListener('click', closeModal);

    const rowsEl = $('.lg-rows', el), msg = $('.lg-msg', el), hintBtn = $('.lg-hint', el);
    const say = (html, cls = '') => { msg.className = 'lg-msg ' + cls; msg.innerHTML = html; };
    const shake = () => { el.classList.remove('shake', 'okflash'); void el.offsetWidth; el.classList.add('shake'); };
    function render() {
      rowsEl.innerHTML = P.map(p => `<div class="lg-row"><div class="lg-p">${esc(p)}</div>${AT.map((x, k) => {
        const key = p + '|' + k, v = st.sel[key] || '', lk = st.locked.includes(key);
        return `<label class="lg-cell${lk ? ' locked' : ''}"><span class="lg-cap">${esc(x.nome)}</span>
          <select data-key="${esc(key)}"${lk ? ' disabled' : ''} aria-label="${esc(p + ' · ' + x.nome)}">
            <option value="">—</option>${x.opcoes.map(o => `<option${o === v ? ' selected' : ''}>${esc(o)}</option>`).join('')}
          </select></label>`;
      }).join('')}</div>`).join('');
      marks();
    }
    function marks() {
      AT.forEach((x, k) => {
        const cnt = {};
        P.forEach(p => { const v = st.sel[p + '|' + k]; if (v) cnt[v] = (cnt[v] || 0) + 1; });
        P.forEach(p => {
          const s = rowsEl.querySelector(`select[data-key="${CSS.escape(p + '|' + k)}"]`);
          s.closest('.lg-cell').classList.toggle('dup', !!s.value && cnt[s.value] > 1);
        });
      });
      const filled = Object.keys(st.sel).filter(k => st.sel[k]).length;
      $('.lg-prog', el).textContent = `${filled}/${N3} preenchidos`;
      hintBtn.textContent = st.hints > 0 ? `dica (${st.hints})` : 'sem dicas';
    }
    rowsEl.addEventListener('change', e => {
      const s = e.target.closest('select'); if (!s) return;
      st.sel[s.dataset.key] = s.value; saveSt(); marks(); say('');
    });
    $('.lg-clues ol', el).addEventListener('click', e => {
      const li = e.target.closest('li'); if (!li) return;
      const k = +li.dataset.k;
      li.classList.toggle('done');
      st.done = li.classList.contains('done') ? [...new Set([...st.done, k])] : st.done.filter(x => x !== k);
      saveSt();
    });
    $('.lg-clear', el).addEventListener('click', () => {
      Object.keys(st.sel).forEach(k => { if (!st.locked.includes(k)) delete st.sel[k]; });
      saveSt(); render(); say('tabela limpa.');
    });
    hintBtn.addEventListener('click', () => {
      if (st.hints <= 0) { say('acabaram as dicas. você consegue. ♥', 'warn'); return; }
      const wrongs = [];
      P.forEach(p => AT.forEach((x, k) => { if (st.sel[p + '|' + k] !== E.solucao[p][k]) wrongs.push([p, k]); }));
      if (!wrongs.length) { say('tá tudo certo já. aperta ./verificar ;)', 'ok'); return; }
      const [p, k] = wrongs[(Math.random() * wrongs.length) | 0];
      const val = E.solucao[p][k];
      P.forEach(q => { const kk = q + '|' + k; if (q !== p && st.sel[kk] === val && !st.locked.includes(kk)) delete st.sel[kk]; });
      st.sel[p + '|' + k] = val; st.locked.push(p + '|' + k); st.hints--;
      saveSt(); render(); sfx.orb();
      hintBtn.classList.remove('pulse');
      say(`dica: <b>${esc(p)}</b> → ${esc(AT[k].nome)}: <b>${esc(val)}</b> (travado em verde)`, 'ok');
    });
    $('.lg-check', el).addEventListener('click', async () => {
      const empty = P.some(p => AT.some((x, k) => !st.sel[p + '|' + k]));
      if (empty) { say('ainda tem espaço vazio na tabela.', 'warn'); shake(); return; }
      if ($('.dup', el)) { say('tem coisa repetida: cada item é de uma pessoa só.', 'err'); shake(); sfx.hurt(); return; }
      const ok = P.every(p => AT.every((x, k) => st.sel[p + '|' + k] === E.solucao[p][k]));
      if (!ok) {
        fails++; shake(); sfx.hurt(); navigator.vibrate?.(40);
        const L = ['não fecha. alguma pista tá sendo violada.', 'quase. confere as pistas de novo, uma por uma.', 'Creeper? Aw man. 💥 ainda não.', 'você morreu! causa: contradição lógica. [renascer]'];
        say(L[(fails - 1) % L.length], 'err');
        if (fails >= 2 && st.hints > 0) hintBtn.classList.add('pulse');
        return;
      }
      el.classList.remove('shake'); void el.offsetWidth; el.classList.add('okflash');
      sfx.orb();
      say('[  OK  ] solução única encontrada. ∎', 'ok');
      $$('select', el).forEach(s => { s.disabled = true; });
      await sleep(REDUCE ? 300 : 1300);
      closeModal();
      await sleep(200);
      unlockCategory(c, i);
    });
    render();
  }

  function closeModal() {
    const m = $('#modal');
    if (m.hidden || m.classList.contains('out')) return;
    m.classList.add('out');
    const t = modalTerm; modalTerm = null;
    if (t) t.closed = true;
    setTimeout(() => { t?.destroy(); m.hidden = true; m.classList.remove('out'); if ($('#viewer').hidden) document.body.classList.remove('noscroll'); }, 280);
  }
  $('#modal .modal-back').addEventListener('click', closeModal);

  async function unlockCategory(c, i) {
    if (!isOpen(c.id)) state.unlocked.push(c.id);
    save();
    await unlockFX({
      title: 'ACESSO CONCEDIDO',
      sub: `~/${c.id} desbloqueado · ${c.itens.length} itens`,
      theme: c.tema,
      onOpen: () => refresh(i)
    });
    const cq = c.conquista || {};
    advancement(c.icone, cq.nome || `22 ${c.titulo}`, cq.desafio ? 'Desafio concluído!' : 'Conquista feita!', !!cq.desafio);
    const ni = nextIndex();
    if (ni === -1) {
      setTimeout(() => toast('📬 você tem 1 nova mensagem', 4000), 4800);
    } else {
      setTimeout(() => goTo(ni), 2600);
      setTimeout(() => toast(`próximo alvo: ~/${CATS[ni].id}`), 4800);
    }
  }

  /* ============================================================
     4) CONTEÚDO DESBLOQUEADO
     ============================================================ */
  const RENDER = {
    fotos: c => `<div class="g-fotos">${c.itens.map((x, i) => `
      <figure class="ph it" style="--i:${i}" data-i="${i}">
        <div class="ph-img"><img src="${esc(x.src)}" alt="${esc(x.legenda || 'foto ' + pad(i + 1))}" loading="lazy" onerror="this.closest('.ph').classList.add('missing')"><span class="ph-miss">${esc(x.src)}</span></div>
        ${x.legenda ? `<figcaption><span>${pad(i + 1)}</span>${esc(x.legenda)}</figcaption>` : ''}
      </figure>`).join('')}</div>`,

    musicas: c => `<div class="g-list">${c.itens.map((x, i) => {
      const u = safeUrl(x.link);
      const cm = coms['m' + i] || '';
      return `<div class="tr it${cm.trim() ? ' has-com' : ''}" style="--i:${i}" data-i="${i}" data-cw>
        <span class="tr-n">${pad(i + 1)}</span>
        <div class="tr-main"><div class="tr-t">${esc(x.titulo)}</div><div class="tr-a">${esc(x.artista)}</div>${x.nota ? `<div class="tr-note">${esc(x.nota)}</div>` : ''}</div>
        <div class="tr-act">
          ${u ? `<a class="pill" href="${esc(u)}" target="_blank" rel="noopener">▶ ${/music\.youtube\.com/i.test(u) ? 'ouvir no YT Music' : 'ouvir'}</a>` : ''}
          <button class="pill c-btn" type="button" aria-label="comentar">💬</button>
        </div>
        ${comBox('m' + i, `🎵 ${x.titulo} (${x.artista})`, 'o que essa música te lembra?')}
      </div>`;
    }).join('')}</div>`,

    lugares: c => `<div class="g-cards">${c.itens.map((x, i) => {
      const u = safeUrl(x.mapa);
      const b = !!been[i], cm = coms['l' + i] || '';
      return `<article class="pl it${b ? ' been' : ''}${cm.trim() ? ' has-com' : ''}" style="--i:${i}" data-cw>
        <div class="pl-top">
          <label class="pl-chk"><input type="checkbox" data-i="${i}"${b ? ' checked' : ''}><span class="box"></span><span class="lbl">${b ? 'já fomos ✓' : 'ainda vamos'}</span></label>
          <span class="pl-k">loc[${pad(i + 1)}]</span>
        </div>
        <h4>${esc(x.nome)}</h4>
        ${x.nota ? `<p>${esc(x.nota)}</p>` : ''}
        <div class="pl-act">
          ${u ? `<a class="pill" href="${esc(u)}" target="_blank" rel="noopener">abrir no mapa ↗</a>` : ''}
          <button class="pill c-btn" type="button" aria-label="comentar">💬</button>
        </div>
        ${comBox('l' + i, `📍 ${x.nome}`, 'uma lembrança (ou um plano) desse lugar...')}
      </article>`;
    }).join('')}</div>`,

    midias: c => `<div class="g-cards">${c.itens.map((x, i) => {
      const u = safeUrl(x.link);
      const cm = coms['d' + i] || '';
      return `<article class="pl md it${cm.trim() ? ' has-com' : ''}" style="--i:${i}" data-cw>
        ${x.img ? `<div class="md-img" style="--src:url('${esc(x.img)}')"><img src="${esc(x.img)}" alt="${esc(x.titulo)}" loading="lazy"></div>` : ''}
        <div class="pl-top"><span class="tag">${esc(x.tipo || 'mídia')}</span><span class="pl-k">${pad(i + 1)}</span></div>
        <h4>${esc(x.titulo)}</h4>
        ${x.nota ? `<p>${esc(x.nota)}</p>` : ''}
        <div class="pl-act">
          ${u ? `<a class="pill" href="${esc(u)}" target="_blank" rel="noopener">abrir ↗</a>` : ''}
          <button class="pill c-btn" type="button" aria-label="comentar">💬</button>
        </div>
        ${comBox('d' + i, `🎮 ${x.titulo}`, 'o que você lembra disso?')}
      </article>`;
    }).join('')}</div>`,

    receitas: c => `<div class="g-rc">${c.itens.map((x, i) => `
      <details class="rc it" style="--i:${i}">
        <summary><span class="pl-k">${pad(i + 1)}</span><span class="rc-n">${esc(x.nome)}</span><span class="rc-t">${esc(x.tempo)}</span><span class="rc-plus"></span></summary>
        <div class="rc-b">
          ${(x.ingredientes || []).length ? `<div class="rc-h">INGREDIENTES</div><ul>${x.ingredientes.map(g => `<li>${esc(g)}</li>`).join('')}</ul>` : ''}
          ${x.preparo ? `<div class="rc-h">MODO DE PREPARO</div><p>${esc(x.preparo)}</p>` : ''}
          ${x.nota ? `<p class="rc-note">${esc(x.nota)}</p>` : ''}
        </div>
      </details>`).join('')}</div>`,

    motivos: c => `<ol class="g-mot">${c.itens.map((x, i) => `
      <li class="it" style="--i:${i}"><span class="mk">motivo[${pad(i + 1)}]</span><span class="mv">${esc(x)}</span></li>`).join('')}</ol>
      ${D.motivosFim ? `<p class="mot-end">${esc(D.motivosFim)}</p>` : ''}`
  };

  let viewerCat = null;
  function openViewer(c) {
    viewerCat = c;
    const v = $('#viewer');
    v.style.setProperty('--c1', c.tema[0]);
    v.style.setProperty('--c2', c.tema[1]);
    $('#vPath').innerHTML = promptHTML('~/' + c.id) + ' <span class="c">ls -la</span>';
    $('#vBody').innerHTML = `
      <header class="v-hero">
        <div class="v-k">drwxr-xr-x · ~/${esc(c.id)} · ${pad(c.itens.length)} itens</div>
        <h2><em>22</em> ${esc(c.titulo)}</h2>
        ${c.descricao ? `<p>${esc(c.descricao)}</p>` : ''}
        ${safeUrl(c.playlist) ? `<a class="pill big" href="${esc(safeUrl(c.playlist))}" target="_blank" rel="noopener">▶ abrir a playlist inteira no YouTube Music</a>` : ''}
      </header>` + (RENDER[c.tipo] || RENDER.motivos)(c);
    if (c.tipo === 'fotos') markComments();
    if (c.tipo === 'lugares') { $('.v-hero', $('#vBody')).insertAdjacentHTML('beforeend', '<div class="v-k pl-count" id="plCount"></div>'); placeCount(); }
    v.classList.remove('out'); v.hidden = false; v.scrollTop = 0;
    document.body.classList.add('noscroll');
    setTheme(c.tema);
  }
  function closeViewer() {
    const v = $('#viewer');
    if (v.hidden || v.classList.contains('out')) return;
    v.classList.add('out');
    letterRun++;
    setTimeout(() => { v.hidden = true; v.classList.remove('out'); $('#vBody').innerHTML = ''; document.body.classList.remove('noscroll'); }, 300);
    viewerCat = null;
    setTheme(hubTheme());
  }
  $('#vClose').addEventListener('click', closeViewer);
  $('#vBody').addEventListener('click', e => {
    const f = e.target.closest('.ph');
    if (!f || f.classList.contains('missing') || !viewerCat) return;
    openLight(+f.dataset.i);
  });

  /* carta final */
  let letterRun = 0;
  async function openLetter() {
    const run = ++letterRun;
    const theme = CATS[N - 1].tema;
    const v = $('#viewer');
    v.style.setProperty('--c1', theme[0]);
    v.style.setProperty('--c2', theme[1]);
    $('#vPath').innerHTML = promptHTML('/var/mail') + ` <span class="c">cat ${esc(USER)}</span>`;
    $('#vBody').innerHTML = `
      <header class="v-hero">
        <div class="v-k">de: ${esc(D.de)} · para: ${esc(D.nome)} · assunto: 22</div>
        <h2>uma última <em>coisa</em></h2>
      </header>
      <div class="letter" id="letter"></div>`;
    v.classList.remove('out'); v.hidden = false; v.scrollTop = 0;
    document.body.classList.add('noscroll');
    setTheme(theme);
    const box = $('#letter');
    const cur = document.createElement('span'); cur.className = 'cur-inline';
    await sleep(900);
    const paras = [...D.carta, `— ${D.de}${D.meuApelido ? ', sua ' + D.meuApelido : ''}`];
    for (let k = 0; k < paras.length; k++) {
      if (run !== letterRun) return;
      const p = document.createElement('p');
      if (k === paras.length - 1) p.className = 'sig';
      box.appendChild(p);
      p.appendChild(cur);
      const txt = paras[k];
      for (let j = 0; j < txt.length; j++) {
        if (run !== letterRun) return;
        cur.before(txt[j]);
        if (!REDUCE) await sleep(txt[j] === '.' || txt[j] === ',' ? 160 : 28 + Math.random() * 30);
      }
      await sleep(REDUCE ? 0 : 520);
    }
    cur.remove();
    if (run !== letterRun) return;
    box.insertAdjacentHTML('afterend', `<div class="bday">feliz <em>22</em></div>`);
    burstScreen();
  }
  function burstScreen() {
    if (REDUCE) return;
    const fx = $('#fx');
    fx.innerHTML = '<div class="fx-flash"></div><div class="fx-center"><div class="fx-dial" style="opacity:1"><div class="fx-wave"></div><div class="fx-wave w2"></div><div class="fx-parts"></div></div></div>';
    fx.className = 'on s2';
    fx.style.background = 'none';
    fx.style.pointerEvents = 'none';
    burst($('.fx-parts', fx));
    setTimeout(() => { fx.className = ''; fx.innerHTML = ''; fx.style.background = ''; fx.style.pointerEvents = ''; }, 1800);
  }
  $('#mail').addEventListener('click', openLetter);

  /* comentários nas fotos (salvos no navegador dele) */
  const CKEY = 'arquivo22:comentarios';
  const coms = (() => { try { return JSON.parse(localStorage.getItem(CKEY)) || {}; } catch { return {}; } })();
  const saveComs = () => { try { localStorage.setItem(CKEY, JSON.stringify(coms)); } catch { /* sem storage */ } };
  const contato = D.contato || {};
  const wpp = String(contato.whatsapp || '').replace(/\D/g, '');
  const quem = D.meuApelido || D.de;
  $('#lSend').textContent = wpp ? `enviar pra ${quem} no WhatsApp →` : contato.email ? `enviar pra ${quem} por e-mail →` : 'salvar ✓';
  let savedT;
  function flashSaved(msg = 'salvo ✓') {
    const el = $('#lSaved'); el.textContent = msg; el.classList.add('on');
    clearTimeout(savedT); savedT = setTimeout(() => el.classList.remove('on'), 1800);
  }
  function markComments() {
    $$('#vBody .ph').forEach(f => {
      const has = !!(coms['f' + f.dataset.i] || '').trim();
      let b = $('.com-badge', f);
      if (has && !b) { b = document.createElement('span'); b.className = 'com-badge'; b.textContent = '💬'; $('.ph-img', f).appendChild(b); }
      if (!has && b) b.remove();
    });
  }
  function sendComment(label, txt) {
    const msg = `[arquivo22] ${label}: ${txt}`;
    if (wpp) window.open(`https://wa.me/${wpp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
    else if (contato.email) location.href = `mailto:${contato.email}?subject=${encodeURIComponent('[arquivo22] ' + label)}&body=${encodeURIComponent(txt)}`;
    return !!(wpp || contato.email);
  }
  const sendLabel = $('#lSend').textContent;
  const shortSend = (wpp || contato.email) ? `enviar pra ${quem.split(' ')[0]} →` : 'salvar ✓';
  $('#lText').addEventListener('input', e => {
    coms['f' + li] = e.target.value; saveComs(); markComments(); flashSaved();
  });
  $('#lSend').addEventListener('click', () => {
    const txt = ($('#lText').value || '').trim();
    if (!txt) { $('#lText').focus(); return; }
    coms['f' + li] = txt; saveComs(); markComments();
    flashSaved(sendComment(`📸 foto ${pad(li + 1)}`, txt) ? 'salvo ✓ abrindo...' : 'salvo ✓');
  });

  /* comentários embutidos (músicas e lugares) */
  const comBox = (key, label, ph) => {
    const cm = coms[key] || '';
    return `<div class="c-box">
      <textarea rows="2" maxlength="600" data-key="${key}" data-label="${esc(label)}" placeholder="${esc(ph)}">${esc(cm)}</textarea>
      <div class="l-com-row"><span class="l-saved c-saved"></span><button class="pill c-send" type="button">${esc(shortSend)}</button></div>
    </div>`;
  };
  let cSavedT;
  $('#vBody').addEventListener('click', e => {
    const tg = e.target.closest('.c-btn');
    if (tg) {
      const w = tg.closest('[data-cw]'); w.classList.toggle('com-open');
      if (w.classList.contains('com-open')) $('textarea', w).focus({ preventScroll: true });
      return;
    }
    const sb = e.target.closest('.c-send');
    if (sb) {
      const w = sb.closest('[data-cw]'), ta = $('textarea', w), txt = ta.value.trim();
      if (!txt) { ta.focus(); return; }
      coms[ta.dataset.key] = txt; saveComs();
      const ok = sendComment(ta.dataset.label, txt);
      const sv = $('.c-saved', w); sv.textContent = ok ? 'salvo ✓ abrindo...' : 'salvo ✓'; sv.classList.add('on');
    }
  });
  $('#vBody').addEventListener('input', e => {
    const ta = e.target.closest('.c-box textarea');
    if (!ta) return;
    coms[ta.dataset.key] = ta.value; saveComs();
    const w = ta.closest('[data-cw]');
    w.classList.toggle('has-com', !!ta.value.trim());
    const sv = $('.c-saved', w); sv.textContent = 'salvo ✓'; sv.classList.add('on');
    clearTimeout(cSavedT); cSavedT = setTimeout(() => sv.classList.remove('on'), 1600);
  });

  /* lugares: já fomos / ainda vamos */
  const VKEY = 'arquivo22:visitados';
  const been = (() => { try { return JSON.parse(localStorage.getItem(VKEY)) || {}; } catch { return {}; } })();
  function placeCount() {
    const el = $('#plCount'); if (!el) return;
    const tot = CATS.find(c => c.tipo === 'lugares').itens.length;
    const n = Object.values(been).filter(Boolean).length;
    el.textContent = `${n} já fomos · ${tot - n} ainda vamos`;
  }
  $('#vBody').addEventListener('change', e => {
    const cb = e.target.closest('.pl-chk input');
    if (!cb) return;
    been[cb.dataset.i] = cb.checked;
    try { localStorage.setItem(VKEY, JSON.stringify(been)); } catch { /* sem storage */ }
    const card = cb.closest('.pl');
    card.classList.toggle('been', cb.checked);
    $('.pl-chk .lbl', card).textContent = cb.checked ? 'já fomos ✓' : 'ainda vamos';
    if (cb.checked) sfx.orb();
    placeCount();
  });

  /* lightbox das fotos */
  let li = 0;
  function openLight(i) {
    li = i;
    const fotos = CATS.find(c => c.tipo === 'fotos').itens;
    const x = fotos[li];
    const img = $('#lImg');
    img.src = x.src; img.alt = x.legenda || '';
    img.style.animation = 'none'; void img.offsetWidth; img.style.animation = '';
    $('#lCap').textContent = `${pad(li + 1)} / ${pad(fotos.length)}${x.legenda ? '  ·  ' + x.legenda : ''}`;
    $('#lText').value = coms['f' + li] || '';
    $('#lSaved').classList.remove('on');
    $('#light').hidden = false;
  }
  const lightStep = d => {
    const fotos = CATS.find(c => c.tipo === 'fotos').itens;
    openLight((li + d + fotos.length) % fotos.length);
  };
  const closeLight = () => { $('#light').hidden = true; };
  $('#lPrev').addEventListener('click', () => lightStep(-1));
  $('#lNext').addEventListener('click', () => lightStep(1));
  $('#lClose').addEventListener('click', closeLight);
  $('#light').addEventListener('click', e => { if (e.target.id === 'light' || e.target.classList.contains('l-fig')) closeLight(); });
  let tx = null;
  $('#light').addEventListener('touchstart', e => { tx = e.target.closest('.l-com') ? null : e.touches[0].clientX; }, { passive: true });
  $('#light').addEventListener('touchend', e => {
    if (tx == null) return;
    const dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 50) lightStep(dx < 0 ? 1 : -1);
  });

  /* teclado global */
  addEventListener('keydown', e => {
    if (fxRunning) return;
    if (!$('#light').hidden) {
      if (e.key === 'Escape') closeLight();
      else if (e.target.matches('textarea, input')) return;
      else if (e.key === 'ArrowLeft') lightStep(-1);
      else if (e.key === 'ArrowRight') lightStep(1);
      return;
    }
    if (e.key === 'Escape') {
      if (!$('#modal').hidden) closeModal();
      else if (!$('#viewer').hidden) closeViewer();
      return;
    }
    if ($('#hub').hidden || !$('#modal').hidden || !$('#viewer').hidden) return;
    if (e.target.matches('input, textarea')) return;
    if (e.key === 'ArrowLeft') goTo(active - 1);
    else if (e.key === 'ArrowRight') goTo(active + 1);
    else if (e.key === 'Enter' && !e.target.closest('button, .card')) activate(active);
  });

  let resetArmed = null;
  $('#reset').addEventListener('click', e => {
    const btn = e.currentTarget;
    if (!resetArmed) {
      btn.textContent = 'tem certeza? clica de novo pra apagar tudo';
      btn.style.color = '#ff6b5a';
      resetArmed = setTimeout(() => { resetArmed = null; btn.textContent = 'rm -rf ~/.progresso'; btn.style.color = ''; }, 5000);
      return;
    }
    clearTimeout(resetArmed);
    store.clear();
    btn.textContent = 'apagando...';
    setTimeout(() => location.reload(), 300);
  });

  /* ============================================================
     START
     ============================================================ */
  console.log('%c ei. ', 'background:#ff7a1a;color:#140a04;font:700 14px monospace;padding:4px 2px;border-radius:4px',
    'abriu o devtools, né? eu sabia. 😏 volta pro terminal e joga direito.');

  startRain();
  if (state.boot) {
    showHub(true);
  } else {
    runBoot();
  }
})();
