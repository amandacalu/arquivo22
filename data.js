/* ============================================================
   ARQUIVO 22 (do bem) — CONTEÚDO
   ------------------------------------------------------------
   Este é o ÚNICO arquivo que você precisa editar.
   Troque os textos entre aspas "assim". Cuidado pra não apagar
   vírgulas, aspas ou chaves { } [ ].

   Como escrever as linhas dos enigmas (campo "linhas"):
     "$ comando"   -> aparece como comando digitado no terminal
     "> código"    -> aparece como bloco de código destacado
     "# texto"     -> comentário (cinza)
     "! texto"     -> texto em destaque
     ""            -> linha em branco
     qualquer outro texto -> saída normal do terminal

   Respostas: maiúsculas, acentos e espaços extras não importam.
   ============================================================ */

window.ARQUIVO22 = {

  nome: "Rafael",        // nome dele
  apelido: "gatinho",    // como você chama ele
  usuario: "rafael",     // login dele no terminal (minúsculo, sem espaço)
  de: "Amanda",
  meuApelido: "gatinha preta franjuda",  // como ele te chama          // seu nome (assina a carta)
  som: true,             // sonzinhos de XP / level up (false pra desligar)

  // pra onde vão os comentários que ele escrever nas fotos
  // whatsapp: seu número com DDI + DDD, só números (ex: "5511999998888")
  // se deixar vazio, o comentário só fica salvo no navegador dele
  contato: { whatsapp: "", email: "" },   // vazio = comentários ficam salvos só no site

  // frases amarelas que piscam do lado do título (sorteia uma por visita)
  splash: [
    "Feliz 22!",
    "Feliz 22, gatinho!",
    "Agora no nível 22!",
    "Também tente Linux!",
    "100% do bem!",
    "Creeper? Aw man",
    "sudo make me a bolo",
    "Feito à mão!",
    "Edição de aniversário!"
  ],

  /* ---------- tela de entrada + primeiro enigma ---------- */
  intro: {
    mensagem: [
      "$ cat /etc/motd",
      "! Oi, gatinho. Bem-vindo ao Arquivo 22 (do bem).",
      "Um site feito especialmente de aniversário, só pra você.",
      "Aqui dentro existem 6 pastas criptografadas. Cada uma guarda 22 coisas sobre a gente.",
      "Pra abrir cada uma, você vai ter que quebrar um enigma. E eles ficam mais difíceis.",
      "Pode usar o seu terminal de verdade. Eu sei que você vai.",
      "# digite help se ficar perdido. comandos com / também funcionam ;)",
      ""
    ],
    conquista: { icone: "🪵", nome: "Pegando madeira" },
    enigma: {
      passos: [
        {
          linhas: [
            "$ cat enigma_00.c",
            "> int f(int x) {",
            ">     return (x << 1) + 2;",
            "> }",
            "",
            "# qual é o valor de f(10)?"
          ],
          respostas: ["22"],
          dicas: ["x << 1 é o mesmo que x * 2.", "(10 * 2) + 2 = ..."]
        }
      ]
    }
  },

  /* ---------- cores de fundo antes de desbloquear categorias ---------- */
  temas: {
    boot: ["#5a2a10", "#2a1408", "#140a05"],
    hub:  ["#ff7a1a", "#7a2e0e", "#2a1206"]
  },

  /* ---------- as 6 categorias (na ordem em que ele desbloqueia) ---------- */
  categorias: [

    /* ===================== 1. FOTOS ===================== */
    {
      id: "fotos", tipo: "fotos", titulo: "fotos", nivel: 1,
      icone: "🖼️", conquista: { nome: "Diga xis!" },
      descricao: "22 de infinitos frames de nós dois.",
      tema: ["#ff7a1a", "#ff3d6e", "#5b1a3a"],
      // enigma de lógica (tabela interativa). Só existe UMA solução com essas pistas.
      enigma: {
        tipo: "logica",
        titulo: "Estruturas Discretas",
        intro: "5 pessoas, 5 matérias, 5 jogos e 5 comidas favoritas. Cada coisa é de exatamente uma pessoa. Use as pistas (toque pra riscar as que já usou) e monte a tabela. Só existe uma solução.",
        pessoas: ["Amanda", "Rafael", "Aly", "Maria", "Marcos"],
        atributos: [
          { nome: "matéria", opcoes: ["Estruturas Discretas", "Cálculo", "Física", "Algoritmos", "Álgebra Linear"] },
          { nome: "jogo",    opcoes: ["Minecraft", "Hades", "Balatro", "Overwatch", "Codenames"] },
          { nome: "comida",  opcoes: ["Coxinha", "Pastel", "Lasanha", "Moqueca", "Panqueca"] }
        ],
        solucao: {
          Amanda: ["Álgebra Linear", "Balatro", "Panqueca"],
          Rafael: ["Estruturas Discretas", "Minecraft", "Lasanha"],
          Aly:    ["Física", "Overwatch", "Pastel"],
          Maria:  ["Cálculo", "Codenames", "Moqueca"],
          Marcos: ["Algoritmos", "Hades", "Coxinha"]
        },
        pistas: [
          "O Rafael estuda a matéria que dá nome a este enigma.",
          "Se alguém joga Minecraft, então essa pessoa estuda Estruturas Discretas.",
          "Quem estuda Física joga Overwatch.",
          "Quem estuda Álgebra Linear joga Balatro.",
          "Quem joga Hades come coxinha.",
          "Quem come moqueca estuda Cálculo.",
          "O Aly come pastel.",
          "A Amanda não estuda Algoritmos.",
          "Quem come panqueca não joga Minecraft nem Overwatch.",
          "A Maria joga Codenames ou estuda Física, mas não as duas coisas (ou exclusivo)."
        ],
        dicas: 3
      },
      // Coloque as fotos na pasta "fotos" com os nomes 01.jpg, 02.jpg ... 22.jpg
      // (se forem .png ou .jpeg, troque o final do nome aqui embaixo também)
      itens: [
        { src: "fotos/01.jpg", legenda: "" },
        { src: "fotos/02.jpg", legenda: "" },
        { src: "fotos/03.jpg", legenda: "" },
        { src: "fotos/04.jpg", legenda: "" },
        { src: "fotos/05.jpg", legenda: "" },
        { src: "fotos/06.jpg", legenda: "" },
        { src: "fotos/07.jpg", legenda: "" },
        { src: "fotos/08.jpg", legenda: "" },
        { src: "fotos/09.jpg", legenda: "" },
        { src: "fotos/10.jpg", legenda: "" },
        { src: "fotos/11.jpg", legenda: "" },
        { src: "fotos/12.jpg", legenda: "" },
        { src: "fotos/13.jpg", legenda: "" },
        { src: "fotos/14.jpg", legenda: "" },
        { src: "fotos/15.jpg", legenda: "" },
        { src: "fotos/16.jpg", legenda: "" },
        { src: "fotos/17.jpg", legenda: "" },
        { src: "fotos/18.jpg", legenda: "" },
        { src: "fotos/19.jpg", legenda: "" },
        { src: "fotos/20.jpg", legenda: "" },
        { src: "fotos/21.jpg", legenda: "" },
        { src: "fotos/22.jpg", legenda: "" }
      ]
    },

    /* ===================== 2. MÚSICAS ===================== */
    {
      id: "musicas", tipo: "musicas", titulo: "músicas", nivel: 2,
      icone: "💿", conquista: { nome: "Disco raro" },
      descricao: "a trilha sonora. toca em qualquer uma e deixa um comentário.",
      tema: ["#ff8a3d", "#9b5cff", "#2a1550"],
      // quiz: 10 perguntas sobre os artistas (responde com a letra ou o nome)
      enigma: {
        passos: [
          {
            "linhas": [
              "$ ./quiz_playlist.sh",
              "! quiz: os artistas da sua playlist.",
              "10 perguntas. responda com a letra (ou com o nome). só avança quando acertar.",
              "",
              "! A banda Franz Ferdinand (Take Me Out) é de qual país?",
              "  a) Inglaterra",
              "  b) Escócia",
              "  c) Irlanda",
              "  d) Estados Unidos"
            ],
            "respostas": [
              "b",
              "escocia",
              "scotland"
            ],
            "dicas": [
              "Glasgow fica lá."
            ]
          },
          {
            "linhas": [
              "! A Marina Sena (Lua Cheia) nasceu em qual estado?",
              "  a) Bahia",
              "  b) São Paulo",
              "  c) Minas Gerais",
              "  d) Pernambuco"
            ],
            "respostas": [
              "c",
              "minas gerais",
              "mg",
              "minas"
            ],
            "dicas": [
              "uai."
            ]
          },
          {
            "linhas": [
              "! A DUDA BEAT (Bixinho) é de qual cidade?",
              "  a) Recife",
              "  b) Salvador",
              "  c) Fortaleza",
              "  d) Belém"
            ],
            "respostas": [
              "a",
              "recife"
            ],
            "dicas": [
              "capital de Pernambuco."
            ]
          },
          {
            "linhas": [
              "! A Laufey (From The Start) é de qual país?",
              "  a) Noruega",
              "  b) Dinamarca",
              "  c) Finlândia",
              "  d) Islândia"
            ],
            "respostas": [
              "d",
              "islandia",
              "iceland"
            ],
            "dicas": [
              "terra de vulcões e geleiras."
            ]
          },
          {
            "linhas": [
              "! Antes da carreira solo, o Cazuza (Exagerado) era vocalista de qual banda?",
              "  a) Barão Vermelho",
              "  b) Legião Urbana",
              "  c) Titãs",
              "  d) Paralamas do Sucesso"
            ],
            "respostas": [
              "a",
              "barao vermelho",
              "barao"
            ],
            "dicas": [
              "a banda tem nome de piloto de avião."
            ]
          },
          {
            "linhas": [
              "! A Rita Lee (Doce Vampiro) começou a carreira em qual banda dos anos 60?",
              "  a) Secos & Molhados",
              "  b) Os Mutantes",
              "  c) Novos Baianos",
              "  d) Os Incríveis"
            ],
            "respostas": [
              "b",
              "os mutantes",
              "mutantes"
            ],
            "dicas": [
              "tropicália + rock psicodélico."
            ]
          },
          {
            "linhas": [
              "! The Strokes (Selfless) surgiram em qual cidade?",
              "  a) Londres",
              "  b) Los Angeles",
              "  c) Nova York",
              "  d) Chicago"
            ],
            "respostas": [
              "c",
              "nova york",
              "nova iorque",
              "new york",
              "ny",
              "nyc"
            ],
            "dicas": [
              "a cidade que nunca dorme."
            ]
          },
          {
            "linhas": [
              "! O Tyler, The Creator (Like Him) fundou qual coletivo de rap?",
              "  a) Odd Future",
              "  b) Wu-Tang Clan",
              "  c) A$AP Mob",
              "  d) Brockhampton"
            ],
            "respostas": [
              "a",
              "odd future",
              "ofwgkta"
            ],
            "dicas": [
              "OFWGKTA."
            ]
          },
          {
            "linhas": [
              "! A Kali Uchis (Heladito) tem raízes em qual país?",
              "  a) México",
              "  b) Colômbia",
              "  c) Argentina",
              "  d) Chile"
            ],
            "respostas": [
              "b",
              "colombia"
            ],
            "dicas": [
              "terra do café e da cumbia."
            ]
          },
          {
            "linhas": [
              "! \"American Pie\" fala do \"dia em que a música morreu\". Isso se refere à morte de quem?",
              "  a) Elvis Presley",
              "  b) John Lennon",
              "  c) Buddy Holly",
              "  d) Jimi Hendrix"
            ],
            "respostas": [
              "c",
              "buddy holly",
              "holly"
            ],
            "dicas": [
              "acidente de avião em 1959."
            ]
          }
        ]
      },
      // playlist: link da playlist inteira no YouTube Music (ou "" pra não mostrar)
      playlist: "",
      // link de cada música: no YouTube Music, toque nos 3 pontinhos > Compartilhar > Copiar link
      // (fica tipo "https://music.youtube.com/watch?v=..."). Deixe "" pra não mostrar botão.
      itens: [
        { titulo: "Take Me Out", artista: "Franz Ferdinand", link: "https://music.youtube.com/watch?v=d11xns8lE4w" },
        { titulo: "Lua Cheia", artista: "Marina Sena", link: "https://music.youtube.com/watch?v=V9EUmduEtwU" },
        { titulo: "Bixinho", artista: "DUDA BEAT", link: "https://music.youtube.com/watch?v=upLwHDQTbqE" },
        { titulo: "Blue Moon", artista: "Zara Larsson", link: "https://music.youtube.com/watch?v=HJ-3MI_absQ" },
        { titulo: "João E Maria", artista: "Nara Leão, Chico Buarque", link: "https://music.youtube.com/watch?v=wqiKeSfdsrc" },
        { titulo: "Meu Pedaço de Pecado", artista: "João Gomes", link: "https://music.youtube.com/watch?v=NSI5FO4wimI" },
        { titulo: "Entre Seus Rins", artista: "Ira!", link: "https://music.youtube.com/watch?v=hlCQVPEyrY0" },
        { titulo: "Doce Vampiro", artista: "Rita Lee, Roberto De Carvalho", link: "https://music.youtube.com/watch?v=bY0dFGo-XnQ" },
        { titulo: "Cowboy Maluco", artista: "JIRAYAUAI, Mc Rd, SAM SAM", link: "https://music.youtube.com/watch?v=MpS9qep0FSQ" },
        { titulo: "Quando Bate Aquela Saudade", artista: "Rubel", link: "https://music.youtube.com/watch?v=8jWoDkcuB6A" },
        { titulo: "From The Start", artista: "Laufey", link: "https://music.youtube.com/watch?v=h8DeZSB2o-c" },
        { titulo: "Heladito", artista: "Kali Uchis", link: "https://music.youtube.com/watch?v=AdrLhje8ke4" },
        { titulo: "Exagerado", artista: "Cazuza", link: "https://music.youtube.com/watch?v=Qi5I7_RDd-8" },
        { titulo: "Rap do Itachi: Essa Dor Que Causei... (NERD HITS)", artista: "7 Minutoz", link: "https://music.youtube.com/watch?v=TJrY-iqxopY" },
        { titulo: "Like Him (feat. Lola Young)", artista: "Tyler, The Creator, Lola Young", link: "https://music.youtube.com/watch?v=Z0CQf3JDKAY" },
        { titulo: "Carta de Maria", artista: "Rubel, Marina Sena", link: "https://music.youtube.com/watch?v=IFSO2XDO1PA" },
        { titulo: "Insista Em Mim", artista: "Ana Frango Elétrico", link: "https://music.youtube.com/watch?v=f8HZKIdUECc" },
        { titulo: "Selfless", artista: "The Strokes", link: "https://music.youtube.com/watch?v=qEygdC7nmcU" },
        { titulo: "Flash Delirium", artista: "MGMT", link: "https://music.youtube.com/watch?v=oXmPYbap2Qo" },
        { titulo: "American Pie", artista: "Don McLean", link: "https://music.youtube.com/watch?v=iX_TFkut1PM" },
        { titulo: "Brazilian Gold 1", artista: "Klaf", link: "https://music.youtube.com/watch?v=9XPdI8u-124" },
        { titulo: "rises the moon", artista: "Liana Flores", link: "https://music.youtube.com/watch?v=5e1zT7miep8" }
      ]
    },

    /* ===================== 3. LUGARES ===================== */
    {
      id: "lugares", tipo: "lugares", titulo: "lugares", nivel: 3,
      icone: "🧭", conquista: { nome: "Explorador" },
      descricao: "22 lugares que a gente já foi ou ainda vamos.",
      tema: ["#ffb067", "#1fd1b0", "#0a3a3a"],
      // termo (wordle) no terminal: a palavra é "paris"
      enigma: {
          "passos": [
            {
              "linhas": [
                "$ ./termo --dicionario=nosso",
                "! termo, edição Arquivo 22.",
                "adivinhe a palavra de 5 letras em 6 tentativas.",
                "# verde: letra certa no lugar certo · amarelo: tem a letra, mas em outro lugar · cinza: não tem"
              ],
              "termo": "paris",
              "respostas": [
                "paris"
              ],
              "dicas": [
                "é um dos nossos lugares.",
                "capital europeia. tem uma torre bem famosa."
              ]
            }
          ]
        },
      // mapa: link do Google Maps (ou "" pra não mostrar botão)
      itens: [
        { nome: "Serra da Estrela", nota: "", mapa: "https://www.google.com/maps/place/Serra+da+Estrela/@40.3218824,-7.6232882,15z/data=!3m1!4b1!4m6!3m5!1s0xd3d28a040fe06c3:0xb9adad1bacdd4926!8m2!3d40.321867!4d-7.612967!16s%2Fg%2F11bymxnwjj" },
        { nome: "Madrid", nota: "", mapa: "https://www.google.com/maps/place/Madrid,+Madri,+Espanha/@40.4380981,-3.84469,11z/data=!3m1!4b1!4m6!3m5!1s0xd422997800a3c81:0xc436dec1618c2269!8m2!3d40.4167279!4d-3.7032905!16zL20vMDU2X3k" },
        { nome: "Paris", nota: "", mapa: "https://www.google.com/maps/place/Paris,+Fran%C3%A7a/@48.8589384,2.2644617,12z/data=!3m1!4b1!4m6!3m5!1s0x47e66e1f06e2b70f:0x40b82c3688c9460!8m2!3d48.8575475!4d2.3513765!16zL20vMDVxdGo" },
        { nome: "Braga", nota: "", mapa: "https://www.google.com/maps/place/Braga/@41.5473317,-8.4527067,13z/data=!3m1!4b1!4m6!3m5!1s0xd24febc6cf5d867:0xbc5d054162d1e218!8m2!3d41.5454486!4d-8.426507!16zL20vMDI2eGdz" },
        { nome: "E-learning", nota: "", mapa: "https://www.google.com/maps/place/E-learning/@41.1541193,-8.6458313,17z/data=!3m1!4b1!4m6!3m5!1s0xd2465767fe2840d:0x73c5330ddb825a72!8m2!3d41.1541153!4d-8.643251!16s%2Fg%2F11c0vly1z6" },
        { nome: "Quebra-Dados - Espaço Tabuleiro", nota: "", mapa: "https://www.google.com/maps/place/Quebra-Dados+-+Espa%C3%A7o+Tabuleiro/@41.1541193,-8.6458313,17z/data=!4m6!3m5!1s0xd24651f8d0a5ae7:0x4dd5bb9794bf1832!8m2!3d41.1621614!4d-8.6194361!16s%2Fg%2F11fsvrr1jw" },
        { nome: "Café Cifrão", nota: "", mapa: "https://www.google.com/maps/place/Caf%C3%A9+Cifr%C3%A3o/@41.1458179,-8.6006646,17z/data=!3m1!4b1!4m6!3m5!1s0xd2464ec6d71953b:0x6e32bd89f6d45298!8m2!3d41.1458139!4d-8.5980843!16s%2Fg%2F11fz9ykwc5" },
        { nome: "Parque das Virtudes", nota: "", mapa: "https://www.google.com/maps/place/Parque+das+Virtudes/@41.1439037,-8.6213047,17z/data=!4m10!1m2!2m1!1svirtudes!3m6!1s0xd24651dc550735b:0x2f520bff366da7df!8m2!3d41.1447!4d-8.6189879!16s%2Fg%2F12377hg6" },
        { nome: "Rua Germano Campos Monteiro (São Mamede de Infesta)", nota: "", mapa: "https://www.google.com/maps/place/R.+Germano+Campos+Monteiro+10,+4465-144+S%C3%A3o+Mamede+de+Infesta/@41.1921676,-8.5977099,16z/data=!4m5!3m4!1s0xd246423729494c9:0x95bff8f364988753!8m2!3d41.1923176!4d-8.5979994" },
        { nome: "Marrocos", nota: "", mapa: "https://www.google.com/maps/place/Marrocos/@31.7002541,-12.4542676,6z/data=!3m1!4b1!4m6!3m5!1s0xd0b88619651c58d:0xd9d39381c42cffc3!8m2!3d31.791702!4d-7.09262!16zL20vMDR3Z2g" },
        { nome: "Barcelona", nota: "", mapa: "https://www.google.com/maps/place/Barcelona,+Espanha/@41.3925057,1.8286988,11z/data=!3m1!4b1!4m6!3m5!1s0x12a49816718e30e5:0x44b0fb3d4f47660a!8m2!3d41.3874374!4d2.1686496!16zL20vMDFmNjI" },
        { nome: "Rua da Banda da Música de Moreira", nota: "", mapa: "https://www.google.com/maps/place/R.+da+Banda+da+M%C3%BAsica+de+Moreira+45,+4470-197+Moreira/@41.2323061,-8.6167579,13.42z/data=!4m6!3m5!1s0xd2467c4d27bf4f5:0xa60bd664863e2512!8m2!3d41.2492081!4d-8.6487897!16s%2Fg%2F11f3_75t69" },
        { nome: "Faro", nota: "", mapa: "https://www.google.com/maps/place/Faro/@37.2446782,-8.8562285,9z/data=!3m1!4b1!4m6!3m5!1s0xd0554ee55d1cfef:0x80e2652e12910e45!8m2!3d37.2555153!4d-8.3964938!16zL20vMDFnZzg0" },
        { nome: "Nossa lista no mapa", nota: "", mapa: "https://www.google.com/maps/@41.1923175,-28.1097181,5z/data=!4m3!11m2!2selfgLzS9JLU9uqHUiZ2vjYlM5OhTTA!3e8" },
        { nome: "Tasca do Luís", nota: "", mapa: "https://www.google.com/maps/place/Tasca+do+Lu%C3%ADs.+O+panado+maior+cupom./@41.149743,-8.6175062,17z/data=!3m1!4b1!4m6!3m5!1s0xd246509312665f7:0xeda593e4b356b7e3!8m2!3d41.149739!4d-8.6149259!16s%2Fg%2F11p5bmw6r5" },
        { nome: "Maior Árvore de Natal de Portugal", nota: "", mapa: "https://www.google.com/maps/place/Maior+%C3%81rvore+de+Natal+de+Portugal/@41.2082517,-8.4801141,11.53z/data=!4m6!3m5!1s0xd2461004f9e0909:0x972a4d8f76d5ddae!8m2!3d41.2153391!4d-8.5511687!16s%2Fg%2F11lcprszgv" },
        { nome: "Itália", nota: "", mapa: "https://www.google.com/maps/place/It%C3%A1lia/@41.6408309,-8.3864798,7.75z/data=!4m6!3m5!1s0x12d4fe82448dd203:0xe22cf55c24635e6f!8m2!3d41.87194!4d12.56738!16zL20vMDNyamo" },
        { nome: "Países Baixos", nota: "", mapa: "https://www.google.com/maps/place/Pa%C3%ADses+Baixos/@52.1867952,2.6347872,7z/data=!3m1!4b1!4m6!3m5!1s0x47c609c3db87e4bb:0xb3a175ceffbd0a9f!8m2!3d52.132633!4d5.291266!16zL20vMDU5ajI" },
        { nome: "Berlim", nota: "", mapa: "https://www.google.com/maps/place/Berlim,+Alemanha/@52.5068348,13.0944291,10z/data=!3m1!4b1!4m6!3m5!1s0x47a84e373f035901:0x42120465b5e3b70!8m2!3d52.5200066!4d13.404954!16zL20vMDE1NnE" },
        { nome: "Berlim", nota: "", mapa: "https://www.google.com/maps/place/Berlim,+Alemanha/@52.5068348,13.0944291,10z/data=!3m1!4b1!4m6!3m5!1s0x47a84e373f035901:0x42120465b5e3b70!8m2!3d52.5200066!4d13.404954!16zL20vMDE1NnE" },
        { nome: "China", nota: "", mapa: "https://www.google.com/maps/place/China/@33.8965025,82.7234396,4z/data=!3m1!4b1!4m6!3m5!1s0x31508e64e5c642c1:0x951daa7c349f366f!8m2!3d35.86166!4d104.195397!16zL20vMGQwNXcz" },
        { nome: "Bósnia e Herzegovina", nota: "", mapa: "https://www.google.com/maps/place/B%C3%B3snia+e+Herzegovina/@43.9103437,16.3542408,8z/data=!3m1!4b1!4m6!3m5!1s0x134ba215c737a9d7:0x6df7e20343b7e90c!8m2!3d43.915886!4d17.679076!16zL20vMDE2NmI" }
      ]
    },

    /* ===================== 4. MÍDIAS ===================== */
    {
      id: "midias", tipo: "midias", titulo: "mídias", nivel: 4,
      icone: "📺", conquista: { nome: "Maratonista" },
      descricao: "jogos, séries, filmes, vídeos e coisas aleatórias que viraram nossas.",
      tema: ["#ff7a1a", "#3d8bff", "#0f1f4a"],
      // quiz: 10 perguntas sobre as mídias
      enigma: {
          "passos": [
            {
              "linhas": [
                "$ ./quiz_midias.sh",
                "! quiz: as nossas mídias.",
                "10 perguntas. responda com a letra (ou com o nome). só avança quando acertar.",
                "",
                "! Em Hades, o Zagreus é filho de quem?",
                "  a) Zeus",
                "  b) Poseidon",
                "  c) Hades",
                "  d) Ares"
              ],
              "respostas": [
                "c",
                "hades"
              ],
              "dicas": [
                "tá no nome do jogo."
              ]
            },
            {
              "linhas": [
                "! Balatro é um roguelike baseado em qual jogo de cartas?",
                "  a) Truco",
                "  b) Pôquer",
                "  c) Blackjack",
                "  d) Uno"
              ],
              "respostas": [
                "b",
                "poquer",
                "poker"
              ],
              "dicas": [
                "full house, flush, straight..."
              ]
            },
            {
              "linhas": [
                "! Em Donnie Darko, qual é o nome do coelho?",
                "  a) Frank",
                "  b) Roger",
                "  c) Bugs",
                "  d) Harvey"
              ],
              "respostas": [
                "a",
                "frank"
              ],
              "dicas": [
                "começa com F."
              ]
            },
            {
              "linhas": [
                "! No Minecraft, qual o mínimo de blocos de obsidiana pra um portal do Nether?",
                "  a) 8",
                "  b) 10",
                "  c) 12",
                "  d) 14"
              ],
              "respostas": [
                "b",
                "10",
                "dez"
              ],
              "dicas": [
                "dá pra pular os 4 cantos."
              ]
            },
            {
              "linhas": [
                "! Quem é a protagonista de The Amazing Digital Circus?",
                "  a) Ragatha",
                "  b) Jax",
                "  c) Pomni",
                "  d) Gangle"
              ],
              "respostas": [
                "c",
                "pomni"
              ],
              "dicas": [
                "a de roupa de bobo da corte."
              ]
            },
            {
              "linhas": [
                "! Em Avatar, o Aang é o último dos nômades do...",
                "  a) Fogo",
                "  b) Água",
                "  c) Terra",
                "  d) Ar"
              ],
              "respostas": [
                "d",
                "ar"
              ],
              "dicas": [
                "ele voa de planador."
              ]
            },
            {
              "linhas": [
                "! Qual herói de Overwatch é um gorila cientista?",
                "  a) Winston",
                "  b) Reinhardt",
                "  c) Torbjörn",
                "  d) Lúcio"
              ],
              "respostas": [
                "a",
                "winston"
              ],
              "dicas": [
                "ele veio da Lua."
              ]
            },
            {
              "linhas": [
                "! Quem apresenta o MasterChef Brasil?",
                "  a) Fátima Bernardes",
                "  b) Ana Paula Padrão",
                "  c) Ana Maria Braga",
                "  d) Angélica"
              ],
              "respostas": [
                "b",
                "ana paula padrao",
                "ana paula"
              ],
              "dicas": [
                "jornalista, Ana Paula..."
              ]
            },
            {
              "linhas": [
                "! Bob Ross dizia que não cometemos erros, só...",
                "  a) Pinceladas tortas",
                "  b) Acidentes felizes",
                "  c) Árvores tristes",
                "  d) Nuvens sem rumo"
              ],
              "respostas": [
                "b",
                "acidentes felizes"
              ],
              "dicas": [
                "happy little ..."
              ]
            },
            {
              "linhas": [
                "! E no \"O Jogo\", o que acontece quando você pensa nele?",
                "  a) Você ganha",
                "  b) Ninguém sabe",
                "  c) Você perde",
                "  d) Começa de novo"
              ],
              "respostas": [
                "c",
                "voce perde",
                "perde"
              ],
              "dicas": [
                "desculpa. 😏"
              ]
            }
          ]
        },
      // tipo: "filme", "série", "jogo", "anime", "livro"...
      // img: imagem na pasta "midias"
      itens: [
        { titulo: "Minecraft", tipo: "jogo", nota: "O jogo favorito. Precisa dizer mais? Esse site inteiro é uma carta de amor pra ele.", img: "midias/01.jpg", link: "" },
        { titulo: "Overwatch", tipo: "jogo", nota: "Heróis, ultimates e \"alguém empurra o payload pelo amor de deus\".", img: "midias/02.jpg", link: "" },
        { titulo: "Coisas Naturais", tipo: "álbum · Marina Sena", nota: "O álbum da Lua Cheia e da Carta de Maria (que também estão nas músicas, viu?).", img: "midias/03.jpg", link: "" },
        { titulo: "Donnie Darko", tipo: "filme · 2001", nota: "Um coelho chamado Frank, viagem no tempo e um final pra discutir por horas.", img: "midias/04.jpg", link: "" },
        { titulo: "Avatar: A Lenda de Aang", tipo: "série", nota: "Água, Terra, Fogo, Ar. E o Appa. E o Tio Iroh com o chá dele.", img: "midias/05.jpg", link: "" },
        { titulo: "Balatro", tipo: "jogo", nota: "Roguelike de pôquer. Só mais uma partida. (Mentira.)", img: "midias/06.jpg", link: "" },
        { titulo: "O Jogo", tipo: "jogo mental", nota: "Você acabou de perder. 😏", img: "midias/07.jpg", link: "" },
        { titulo: "The Amazing Digital Circus", tipo: "série", nota: "Pomni, Caine e um circo digital do qual ninguém consegue sair.", img: "midias/08.jpg", link: "" },
        { titulo: "Guitar Hero", tipo: "jogo · PS2", nota: "Guitarra de plástico, cinco botões coloridos e muita dignidade perdida no Expert.", img: "midias/09.jpg", link: "" },
        { titulo: "Secret Hitler", tipo: "jogo de tabuleiro", nota: "Dedução social: ninguém confia em ninguém e todo mundo mente com a cara mais séria.", img: "midias/10.jpg", link: "" },
        { titulo: "Codenames", tipo: "jogo de tabuleiro", nota: "Uma palavra, um número e a fé de que o outro vai entender a associação.", img: "midias/11.jpg", link: "" },
        { titulo: "WhenTaken", tipo: "jogo · web", nota: "Uma foto por rodada: adivinhar onde e quando ela foi tirada.", img: "midias/12.jpg", link: "https://whentaken.com/" },
        { titulo: "Viniccius13", tipo: "canal · YouTube", nota: "O youtuber de Minecraft das tardes inteiras.", img: "midias/13.jpg", link: "https://www.youtube.com/results?search_query=Viniccius13" },
        { titulo: "MasterChef Brasil", tipo: "reality", nota: "\"Vocês têm 60 minutos.\" E a gente julgando prato pela TV como se fosse jurado.", img: "midias/14.jpg", link: "" },
        { titulo: "3Blue1Brown: Álgebra Linear", tipo: "playlist · YouTube", nota: "Vetores, matrizes e transformações lineares do jeito mais bonito que já explicaram.", img: "midias/15.jpg", link: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab" },
        { titulo: "Comercial do Pingo Doce", tipo: "comercial", nota: "Batatas camponesas onduladas. Um clássico da publicidade portuguesa (pra gente, pelo menos).", img: "midias/16.jpg", link: "https://www.youtube.com/results?search_query=pingo+doce+batatas+camponesas+onduladas+an%C3%BAncio" },
        { titulo: "Bob Ross", tipo: "playlist · YouTube", nota: "The Joy of Painting: arvorezinhas felizes e zero pressa.", img: "midias/17.jpg", link: "https://www.youtube.com/results?search_query=bob+ross+the+joy+of+painting" },
        { titulo: "O Homem da Terra", tipo: "filme · 2007", nota: "Uma sala, uma conversa e uma pergunta: e se ele tivesse 14 mil anos?", img: "midias/18.jpg", link: "" },
        { titulo: "Hades", tipo: "jogo", nota: "Roguelike da Supergiant: fugir do submundo, morrer, tentar de novo. E de novo.", img: "midias/19.jpg", link: "" },
        { titulo: "My Melody & Kuromi", tipo: "série · Netflix", nota: "Stop-motion da Sanrio: a My Melody, o café dela, os smoothies e a Kuromi aprontando.", img: "midias/20.jpg", link: "" },
        { titulo: "God of War II", tipo: "jogo · PS2", nota: "Kratos contra o Olimpo inteiro, na era de ouro do PS2.", img: "midias/21.jpg", link: "" },
        { titulo: "Termo", tipo: "jogo · web", nota: "Cinco letras, seis tentativas, uma palavra por dia.", img: "midias/22.jpg", link: "https://term.ooo/" }
      ]
    },

    /* ===================== 5. RECEITAS ===================== */
    {
      id: "receitas", tipo: "receitas", titulo: "receitas", nivel: 5,
      icone: "🍰", conquista: { nome: "O bolo não é uma mentira" },
      descricao: "22 receitas pra gente fazer junto. compila com amor, roda na cozinha.",
      tema: ["#ffcf4d", "#ff5a1f", "#4a1206"],
      // problema de programação: a saída é "bolo de morango"
      enigma: {
          "passos": [
            {
              "linhas": [
                "$ cat escolhe_receita.py",
                "> receitas = [\"coxinha\", \"pastel\", \"muesli\", \"bolo de morango\", \"pao brioche\"]",
                ">",
                "> def escolhe(xs):",
                ">     i = 0",
                ">     for n in range(1, 23):",
                ">         i = (i + n) % len(xs)",
                ">     return xs[i]",
                ">",
                "> print(escolhe(receitas))",
                "",
                "# o que esse programa imprime?"
              ],
              "respostas": [
                "bolo de morango"
              ],
              "dicas": [
                "range(1, 23) vai de 1 até 22. no fim, i = (1 + 2 + ... + 22) % 5.",
                "1 + 2 + ... + 22 = 253. e 253 % 5 = 3 (lembra que o índice começa em 0)."
              ]
            }
          ]
        },
      itens: [
        {
          nome: "Focaccia enfeitada", tempo: "3h (com fermentação)",
          ingredientes: ["500 g de farinha de trigo", "400 ml de água morna", "10 g de fermento biológico seco", "10 g de sal", "1 colher (chá) de açúcar", "80 ml de azeite (e mais pra regar)", "pra enfeitar: tomate-cereja, cebola roxa, pimentões coloridos, azeitonas, alecrim, cebolinha e flor de sal"],
          preparo: "1. Misture a água morna, o açúcar e o fermento. Espere 5 minutos.\n2. Junte a farinha e o sal e misture até virar uma massa mole e grudenta (não precisa sovar).\n3. Regue com 2 colheres de azeite, cubra e deixe crescer por 1h30, até dobrar.\n4. Unte uma forma de 30×40 cm com bastante azeite, espalhe a massa com os dedos e deixe descansar mais 30 minutos.\n5. Afunde os dedos na massa toda, regue com azeite e monte o \"jardim\": cebola roxa vira flor, cebolinha vira caule, tomate e pimentão viram pétalas, alecrim vira folhagem.\n6. Salpique flor de sal e asse a 220 °C por 20 a 25 minutos, até dourar.",
          nota: ""
        },
        {
          nome: "Croque monsieur", tempo: "25 min",
          ingredientes: ["4 fatias de pão de forma", "4 fatias de presunto", "150 g de queijo gruyère (ou emmental) ralado", "1 colher (sopa) de mostarda Dijon", "manteiga pra dourar", "bechamel: 20 g de manteiga, 1 colher (sopa) de farinha, 250 ml de leite, sal, pimenta e noz-moscada"],
          preparo: "1. Bechamel: derreta a manteiga, junte a farinha e mexa por 1 minuto. Adicione o leite aos poucos, mexendo até engrossar. Tempere com sal, pimenta e noz-moscada.\n2. Passe mostarda em 2 fatias de pão, coloque o presunto e um pouco do queijo e feche com as outras fatias.\n3. Doure os sanduíches na frigideira com manteiga, dos dois lados.\n4. Coloque numa assadeira e cubra com a bechamel e o resto do queijo.\n5. Gratine no forno a 220 °C por 8 a 10 minutos, até borbulhar e dourar.\n(Com um ovo frito em cima, vira croque madame.)",
          nota: ""
        },
        {
          nome: "Bolo de morango", tempo: "1h30 + 3h de geladeira",
          ingredientes: ["massa: 4 ovos, 1 xícara de açúcar, ½ xícara de leite morno, ½ xícara de óleo, 2 xícaras de farinha de trigo, 1 colher (sopa) de fermento em pó", "recheio: 1 lata de leite condensado, 1 caixinha de creme de leite, 1 colher (sopa) de manteiga", "500 g de morangos", "calda: ½ xícara de leite com 1 colher (sopa) de açúcar", "cobertura: 400 ml de chantilly bem gelado"],
          preparo: "1. Bata os ovos com o açúcar até ficar claro e fofo (uns 5 minutos).\n2. Junte o leite e o óleo, depois a farinha peneirada aos poucos e, por último, o fermento.\n3. Asse em forma de 22 cm untada, a 180 °C, por 35 a 40 minutos. Espere esfriar e corte em 2 ou 3 discos.\n4. Recheio: leve o leite condensado e a manteiga ao fogo baixo, mexendo até desgrudar do fundo. Fora do fogo, misture o creme de leite. Deixe esfriar.\n5. Umedeça os discos com a calda, recheie com o creme e morangos fatiados.\n6. Cubra com chantilly e decore com morangos inteiros. Leve à geladeira por pelo menos 3 horas.",
          nota: ""
        },
        {
          nome: "Bolo red velvet", tempo: "1h30",
          ingredientes: ["2 ½ xícaras de farinha de trigo", "1 ½ xícara de açúcar", "1 colher (sopa) de cacau em pó", "1 colher (chá) de bicarbonato", "1 pitada de sal", "2 ovos", "1 xícara de óleo", "1 xícara de leitelho (1 xícara de leite + 1 colher de sopa de vinagre, descansa 10 min)", "1 colher (sopa) de corante vermelho em gel", "1 colher (chá) de baunilha", "1 colher (chá) de vinagre branco", "cobertura: 300 g de cream cheese, 100 g de manteiga em temperatura ambiente, 2 xícaras de açúcar de confeiteiro, 1 colher (chá) de baunilha"],
          preparo: "1. Misture os secos: farinha, açúcar, cacau, bicarbonato e sal.\n2. Em outra tigela, bata os ovos, o óleo, o leitelho, o corante, a baunilha e o vinagre.\n3. Junte tudo, sem bater demais.\n4. Divida em 2 formas de 20 cm untadas e asse a 175 °C por 25 a 30 minutos.\n5. Cobertura: bata a manteiga com o cream cheese, junte o açúcar de confeiteiro e a baunilha até ficar liso.\n6. Com os bolos bem frios, recheie e cubra. Esfarele as aparas das bordas e use pra decorar por cima.",
          nota: ""
        },
        {
          nome: "Pão brioche", tempo: "4h (com fermentação)",
          ingredientes: ["500 g de farinha de trigo", "10 g de fermento biológico seco", "60 g de açúcar", "10 g de sal", "4 ovos (e mais 1 gema pra pincelar)", "100 ml de leite morno", "200 g de manteiga em temperatura ambiente, em cubos"],
          preparo: "1. Misture a farinha, o fermento, o açúcar e o sal.\n2. Junte os ovos e o leite e sove por 10 minutos (a batedeira com gancho ajuda muito).\n3. Adicione a manteiga aos poucos, sovando até a massa ficar lisa, brilhante e elástica (mais uns 10 minutos).\n4. Cubra e deixe crescer por 1h30, ou de um dia pro outro na geladeira (fica ainda melhor).\n5. Divida em 3 bolas e coloque lado a lado numa forma de pão untada. Deixe crescer por mais 1 hora.\n6. Pincele a gema misturada com um pouco de leite e asse a 180 °C por 30 a 35 minutos.",
          nota: ""
        },
        {
          nome: "Coxinha", tempo: "2h",
          ingredientes: ["recheio: 500 g de peito de frango, 1 cebola, 2 dentes de alho, 2 colheres (sopa) de extrato de tomate, cheiro-verde, sal, pimenta e requeijão cremoso (opcional)", "massa: 500 ml do caldo do cozimento do frango, 500 ml de leite, 2 colheres (sopa) de manteiga, 500 g de farinha de trigo e sal", "pra empanar: 2 ovos batidos e farinha de rosca", "óleo pra fritar"],
          preparo: "1. Cozinhe o frango em água com sal, cebola e alho. Guarde 500 ml do caldo e desfie o frango.\n2. Refogue cebola e alho, junte o frango, o extrato de tomate, sal, pimenta e cheiro-verde. Deixe esfriar.\n3. Massa: ferva o caldo com o leite e a manteiga. Jogue a farinha de uma vez e mexa com força até desgrudar da panela.\n4. Sove a massa ainda morna numa bancada untada até ficar lisa.\n5. Abra bolinhas na mão, recheie (com um pouco de requeijão) e feche puxando em formato de gota.\n6. Passe no ovo e na farinha de rosca e frite em óleo a 170–180 °C até dourar.",
          nota: ""
        },
        {
          nome: "Cordon bleu", tempo: "50 min",
          ingredientes: ["4 filés de peito de frango", "4 fatias de presunto", "4 fatias de queijo (mussarela, gruyère ou prato)", "sal, pimenta e limão", "2 ovos", "farinha de trigo", "farinha panko ou de rosca", "palitos de dente", "óleo pra fritar (ou forno)"],
          preparo: "1. Abra os filés com um martelo de carne até ficarem finos. Tempere com sal, pimenta e limão.\n2. Coloque o presunto e o queijo, enrole bem apertado e prenda com palitos.\n3. Empane: farinha de trigo, ovo batido e panko.\n4. Frite em óleo médio até dourar, ou asse a 200 °C por 25 a 30 minutos, virando na metade.\n5. Tire os palitos e corte em rodelas pra mostrar a espiral de queijo derretido.",
          nota: ""
        },
        {
          nome: "Pão de abóbora", tempo: "3h",
          ingredientes: ["500 g de farinha de trigo", "300 g de abóbora cabotiá cozida, amassada e fria", "10 g de fermento biológico seco", "2 colheres (sopa) de açúcar", "1 ovo", "50 g de manteiga", "1 colher (chá) de sal", "leite, se precisar", "1 gema pra pincelar"],
          preparo: "1. Misture a abóbora, o ovo, o açúcar, a manteiga e o fermento.\n2. Junte a farinha e o sal aos poucos e sove por 10 minutos, até ficar macia e lisa (se ficar seca, coloque um pouco de leite).\n3. Cubra e deixe crescer por 1 hora.\n4. Modele bolinhas. Se quiser, amarre cada uma com barbante em 6 gomos pra parecer uma abóbora (e um pedacinho de canela no topo vira o cabinho).\n5. Deixe crescer mais 40 minutos, pincele a gema e asse a 180 °C por 25 a 30 minutos.",
          nota: ""
        },
        {
          nome: "Moqueca baiana", tempo: "1h",
          ingredientes: ["1 kg de peixe firme em postas (robalo, badejo ou cação)", "suco de 1 limão", "3 dentes de alho", "sal", "1 cebola grande em rodelas", "2 tomates em rodelas", "1 pimentão vermelho e 1 amarelo em rodelas", "200 ml de leite de coco", "3 colheres (sopa) de azeite de dendê", "coentro e cebolinha", "pimenta dedo-de-moça (opcional)"],
          preparo: "1. Tempere o peixe com limão, alho e sal e deixe descansar por 30 minutos.\n2. Na panela (de barro, se tiver), faça camadas: cebola, tomate, pimentões e peixe. Repita.\n3. Regue com o leite de coco e o dendê.\n4. Tampe e cozinhe em fogo médio por 15 a 20 minutos, sem mexer (só balance a panela).\n5. Finalize com coentro e cebolinha. Sirva com arroz branco e pirão.",
          nota: ""
        },
        {
          nome: "Bolo toalha felpuda", tempo: "1h + 4h de geladeira",
          ingredientes: ["massa: 3 ovos, 1 xícara de açúcar, 1 xícara de leite, ½ xícara de óleo, 2 xícaras de farinha de trigo, 1 colher (sopa) de fermento em pó", "calda: 200 ml de leite de coco, 1 xícara de leite, ½ lata de leite condensado", "cobertura: 100 g de coco ralado", "papel-alumínio pra embrulhar"],
          preparo: "1. Bata os ovos, o açúcar, o leite e o óleo. Junte a farinha e, por último, o fermento.\n2. Asse em assadeira retangular untada, a 180 °C, por 30 a 35 minutos.\n3. Misture os ingredientes da calda.\n4. Com o bolo ainda quente, fure tudo com um garfo e regue com a calda.\n5. Cubra com bastante coco ralado, bem fofo, pra parecer a toalha felpuda.\n6. Corte em quadrados, embrulhe cada um em papel-alumínio e leve à geladeira por 4 horas. Sirva bem gelado.",
          nota: ""
        },
        {
          nome: "Lasanha à bolonhesa", tempo: "1h45",
          ingredientes: ["500 g de massa de lasanha pré-cozida", "bolonhesa: 500 g de carne moída, 1 cebola, 3 dentes de alho, 1 cenoura ralada, 700 ml de passata de tomate, sal, pimenta, orégano e manjericão", "bechamel: 40 g de manteiga, 3 colheres (sopa) de farinha, 700 ml de leite, sal e noz-moscada", "300 g de mussarela", "300 g de presunto (opcional)", "100 g de parmesão ralado"],
          preparo: "1. Bolonhesa: refogue a cebola, o alho e a cenoura, junte a carne e doure bem. Adicione o tomate e os temperos e cozinhe por 30 minutos em fogo baixo.\n2. Bechamel: manteiga e farinha por 1 minuto, depois o leite aos poucos, mexendo até engrossar. Tempere.\n3. Num refratário, faça camadas: molho, massa, bolonhesa, bechamel e mussarela (e presunto). Repita.\n4. Termine com bechamel e parmesão.\n5. Cubra com papel-alumínio e asse a 200 °C por 30 minutos. Tire o alumínio e deixe mais 15 minutos pra gratinar.\n6. Descanse 10 minutos antes de cortar.",
          nota: ""
        },
        {
          nome: "Gelatina com formatos bonitos", tempo: "30 min + 7h de geladeira",
          ingredientes: ["3 caixinhas de gelatina de cores e sabores diferentes", "1 envelope de gelatina incolor sem sabor", "1 lata de leite condensado", "1 caixinha de creme de leite", "água", "forminhas de silicone (corações, estrelas, flores) ou cortadores de biscoito"],
          preparo: "1. Prepare cada gelatina colorida com metade da água fria indicada na caixa (fica mais firme pra desenformar).\n2. Despeje nas forminhas de silicone, ou numa forma rasa pra cortar depois com os cortadores. Geladeira por 3 horas.\n3. Desenforme os formatos.\n4. Creme branco: hidrate e dissolva a gelatina incolor como diz a embalagem e bata com o leite condensado, o creme de leite e 1 xícara de água quente.\n5. Arrume os formatos coloridos numa forma e cubra com o creme branco já morno (não quente).\n6. Geladeira por 4 horas e desenforme: fica parecendo um vitral. Ou sirva só os formatos num prato bonito.",
          nota: ""
        },
        {
          nome: "Panqueca com maple syrup", tempo: "30 min",
          ingredientes: ["1 ½ xícara de farinha de trigo", "1 colher (sopa) de açúcar", "1 colher (sopa) de fermento em pó", "1 pitada de sal", "1 ¼ xícara de leite", "1 ovo", "3 colheres (sopa) de manteiga derretida", "1 colher (chá) de baunilha", "pra servir: maple syrup, manteiga e frutas vermelhas (mirtilo, amora, framboesa)"],
          preparo: "1. Misture os secos. Em outra tigela, misture o leite, o ovo, a manteiga e a baunilha.\n2. Junte tudo só até incorporar. Pode ficar com grumos: é isso que deixa a panqueca fofa. Descanse 5 minutos.\n3. Aqueça uma frigideira antiaderente em fogo médio-baixo com um pouquinho de manteiga e despeje ¼ de xícara de massa.\n4. Vire quando aparecerem bolhinhas na superfície e doure o outro lado.\n5. Empilhe, coloque uma lasca de manteiga em cima, regue com bastante maple syrup e as frutas.",
          nota: ""
        },
        {
          nome: "Pastel", tempo: "1h",
          ingredientes: ["massa: 500 g de farinha de trigo, 1 colher (chá) de sal, 1 colher (sopa) de óleo, 1 dose de cachaça (deixa crocante e cheio de bolhinhas), cerca de 200 ml de água morna", "recheios: carne moída refogada com cebola e azeitona; mussarela; pizza (queijo, presunto, tomate e orégano); frango com catupiry", "óleo pra fritar"],
          preparo: "1. Misture a farinha e o sal. Junte o óleo, a cachaça e a água aos poucos até a massa ficar lisa e desgrudar das mãos.\n2. Cubra e descanse por 30 minutos.\n3. Abra bem fino, com rolo ou cilindro, e corte em retângulos.\n4. Recheie de um lado, feche e aperte as bordas com um garfo.\n5. Frite em óleo bem quente (180 °C) até estufar e dourar. Escorra em papel-toalha. Com caldo de cana, se der.",
          nota: ""
        },
        {
          nome: "Carré de cordeiro com geleia de menta", tempo: "1h",
          ingredientes: ["1 carré de cordeiro (8 costeletas)", "2 dentes de alho", "alecrim e tomilho", "sal grosso e pimenta", "azeite", "2 colheres (sopa) de mostarda Dijon", "½ xícara de farinha panko com ervas picadas (opcional)", "geleia de menta: 1 xícara de folhas de hortelã, ½ xícara de açúcar, ½ xícara de água, 2 colheres (sopa) de vinagre de maçã, suco de ½ limão"],
          preparo: "1. Geleia: ferva a água, o açúcar e o vinagre até virar calda (uns 8 minutos). Junte a hortelã picada e o limão, cozinhe mais 5 minutos e deixe esfriar (engrossa ao esfriar).\n2. Tempere o carré com alho, sal, pimenta, alecrim e tomilho.\n3. Sele numa frigideira bem quente com azeite, de todos os lados, começando pela gordura.\n4. Pincele mostarda na parte da gordura e passe no panko com ervas.\n5. Asse a 200 °C por 15 a 20 minutos (ao ponto: 57 °C por dentro).\n6. Descanse 10 minutos, corte entre os ossos e sirva com a geleia de menta.",
          nota: ""
        },
        {
          nome: "Berinjela empanada frita", tempo: "40 min",
          ingredientes: ["2 berinjelas", "sal", "2 ovos", "1 xícara de farinha de trigo", "1 ½ xícara de farinha panko ou de rosca", "½ xícara de parmesão ralado", "orégano, alho em pó e pimenta", "óleo pra fritar"],
          preparo: "1. Corte as berinjelas em rodelas de 1 cm (ou em palitos). Salpique sal e deixe 20 minutos pra soltar o amargor. Seque bem com papel.\n2. Misture o panko com o parmesão e os temperos.\n3. Empane: farinha de trigo, ovo batido e a mistura de panko.\n4. Frite em óleo quente até dourar dos dois lados. Escorra.\n5. Sirva com maionese de alho ou molho de tomate.",
          nota: ""
        },
        {
          nome: "Bolo plain enfeitado com frutas", tempo: "1h30",
          ingredientes: ["massa (pão de ló): 5 ovos, 1 xícara de açúcar, 1 xícara de farinha de trigo, 1 colher (sopa) de fermento em pó, 1 colher (chá) de baunilha", "calda: ½ xícara de água com 2 colheres (sopa) de açúcar", "creme: 500 ml de chantilly (ou creme de leite fresco batido com açúcar)", "decoração: morangos, mirtilos, framboesas, kiwi, uvas, flores comestíveis, folhas de hortelã e açúcar de confeiteiro"],
          preparo: "1. Bata os ovos com o açúcar até triplicar de volume (uns 10 minutos).\n2. Incorpore delicadamente, com espátula, a farinha peneirada com o fermento e a baunilha.\n3. Asse em forma de 20 cm a 180 °C por 30 a 35 minutos. Esfrie e corte em 2 discos.\n4. Umedeça com a calda e recheie com chantilly e frutas picadas.\n5. Cubra o bolo com chantilly bem liso (ou deixe meio \"naked\", com a massa aparecendo).\n6. Decore o topo com uma coroa de frutas inteiras, flores e hortelã, e polvilhe açúcar de confeiteiro.",
          nota: ""
        },
        {
          nome: "Muesli", tempo: "15 min (+ 1 noite pro bircher)",
          ingredientes: ["2 xícaras de aveia em flocos", "½ xícara de amêndoas ou nozes picadas", "¼ xícara de sementes (girassol, abóbora, chia)", "½ xícara de frutas secas (uva-passa, damasco, cranberry)", "¼ xícara de coco em lascas", "1 colher (chá) de canela", "pra servir: leite ou iogurte, maçã ralada, mel e frutas frescas"],
          preparo: "1. (Opcional) Toste a aveia, as castanhas e o coco numa frigideira seca por uns 5 minutos, até cheirar. Deixe esfriar.\n2. Misture tudo com as frutas secas, as sementes e a canela. Guarde num pote fechado (dura umas 3 semanas).\n3. Pra comer: muesli com leite ou iogurte, maçã ralada e um fio de mel.\n4. Versão bircher: misture ½ xícara de muesli com ½ xícara de leite e 2 colheres de iogurte, deixe na geladeira de um dia pro outro e sirva com frutas.",
          nota: ""
        },
        {
          nome: "Bife bourguignon (boeuf bourguignon)", tempo: "3h30",
          ingredientes: ["1,2 kg de acém ou músculo em cubos grandes", "150 g de bacon em tiras", "1 cebola picada", "2 cenouras em rodelas", "3 dentes de alho", "2 colheres (sopa) de farinha de trigo", "2 colheres (sopa) de extrato de tomate", "750 ml de vinho tinto seco (tipo Pinot Noir)", "500 ml de caldo de carne", "louro, tomilho e salsinha amarrados", "250 g de cogumelos-paris", "12 cebolas pérola", "manteiga, sal e pimenta"],
          preparo: "1. Seque bem a carne e tempere com sal e pimenta.\n2. Frite o bacon numa panela pesada e reserve. Na mesma gordura, sele a carne em partes, até dourar bem. Reserve.\n3. Refogue a cebola, a cenoura e o alho. Volte a carne e o bacon, polvilhe a farinha e mexa por 2 minutos.\n4. Junte o extrato de tomate, o vinho, o caldo e o maço de ervas. O líquido deve quase cobrir a carne.\n5. Tampe e cozinhe em fogo bem baixo (ou no forno a 160 °C) por 2h30 a 3h, até a carne desmanchar.\n6. Doure na manteiga os cogumelos e as cebolas pérola e junte no final. Sirva com purê ou pão.",
          nota: ""
        },
        {
          nome: "Beef Wellington", tempo: "2h30",
          ingredientes: ["800 g de filé mignon (peça do centro)", "sal, pimenta e azeite", "2 colheres (sopa) de mostarda Dijon", "duxelles: 500 g de cogumelos-paris bem picados, 2 chalotas, 2 dentes de alho, tomilho", "8 fatias de presunto cru (tipo parma)", "1 rolo de massa folhada", "2 gemas", "sal grosso"],
          preparo: "1. Tempere o filé com sal e pimenta e sele numa frigideira muito quente, todos os lados (2 minutos cada). Ainda quente, pincele a mostarda. Deixe esfriar.\n2. Duxelles: refogue a chalota e o alho, junte os cogumelos e o tomilho e cozinhe até secar toda a água (vira uma pasta). Deixe esfriar.\n3. Sobre plástico-filme, arrume o presunto cru em fileiras, espalhe a duxelles, coloque o filé e enrole bem apertado. Geladeira por 30 minutos.\n4. Abra a massa folhada, tire o plástico e envolva o rolo na massa, selando as pontas. Geladeira por mais 15 minutos.\n5. Pincele as gemas, risque um xadrez leve com a faca e salpique sal grosso.\n6. Asse a 200 °C por 35 a 40 minutos (52 °C por dentro fica ao ponto pra mal). Descanse 10 minutos antes de fatiar.",
          nota: ""
        },
        {
          nome: "Milkshake de morango", tempo: "10 min",
          ingredientes: ["300 g de sorvete de creme (ou de morango)", "200 g de morangos frescos ou congelados", "150 ml de leite gelado", "2 colheres (sopa) de açúcar ou leite condensado (opcional)", "calda de morango", "chantilly e um morango pra decorar"],
          preparo: "1. Bata no liquidificador os morangos, o leite e o açúcar.\n2. Junte o sorvete e bata rapidinho, só até ficar cremoso (bater demais deixa ralo).\n3. Escorra calda de morango pelas paredes do copo.\n4. Sirva com chantilly, um morango em cima e canudo largo.",
          nota: ""
        },
        {
          nome: "Éclair de café", tempo: "2h",
          ingredientes: ["massa choux: 125 ml de água, 125 ml de leite, 100 g de manteiga, 1 pitada de sal, 1 colher (chá) de açúcar, 150 g de farinha de trigo, 4 ovos", "creme de café: 500 ml de leite, 2 colheres (sopa) de café solúvel, 5 gemas, 100 g de açúcar, 40 g de amido de milho, 30 g de manteiga", "cobertura: 200 g de fondant (ou açúcar de confeiteiro com um pouquinho de água) + 1 colher (chá) de café solúvel dissolvido"],
          preparo: "1. Choux: ferva a água, o leite, a manteiga, o sal e o açúcar. Jogue a farinha de uma vez e mexa até formar uma bola e uma película no fundo da panela (uns 2 minutos).\n2. Passe pra uma tigela, deixe amornar e junte os ovos um a um, batendo bem. A massa fica lisa e cai da colher formando um \"V\".\n3. Com saco de confeitar e bico pitanga grande, faça palitos de 12 cm na assadeira. Asse a 180 °C por 30 a 35 minutos, sem abrir o forno. Deixe esfriar.\n4. Creme: aqueça o leite com o café. Bata as gemas com o açúcar e o amido, junte o leite quente aos poucos e volte ao fogo, mexendo até engrossar. Fora do fogo, junte a manteiga. Cubra com plástico encostado no creme e leve pra gelar.\n5. Faça furinhos nas pontas dos éclairs e recheie com o creme.\n6. Mergulhe o topo na cobertura de café e deixe firmar.",
          nota: ""
        }
      ]
    },

    /* ===================== 6. MOTIVOS (o mais difícil) ===================== */
    {
      id: "motivos", tipo: "motivos", titulo: "motivos pra eu te amar", nivel: 6,
      icone: "❤️", conquista: { nome: "O Fim? Não. O começo.", desafio: true },
      descricao: "a pasta mais protegida do sistema.",
      tema: ["#ff9a5a", "#ff4fa3", "#6a0f3a"],
      enigma: {
        passos: [
          {
            linhas: [
              "$ cat ~/motivos/chave_1.bin",
              "01100001 01101101 01101111 01110010",
              "",
              "# primeira chave. 8 bits por letra."
            ],
            respostas: ["amor"],
            dicas: ["cada grupo de 8 bits é um caractere ASCII.", "01100001 = 97 = 'a'"]
          },
          {
            linhas: [
              "$ date -d \"$(cat ~/motivos/chave_2)\" +%d/%m",
              "# segunda chave: essa só você sabe.",
              "# em que dia foi o nosso primeiro beijo? (dd/mm)"
            ],
            respostas: ["03/01", "03/01/2026", "03/01/26"],
            soNumeros: true,
            dicas: ["foi logo depois de um ano novo...", "janeiro de 2026. qual dia?"]
          },
          {
            linhas: [
              "$ cat ~/motivos/chave_3.sh",
              "> printf '\\145\\165\\040\\164\\145\\040\\141\\155\\157'",
              "",
              "# última chave. o que ele imprime?"
            ],
            respostas: ["eu te amo"],
            dicas: ["o printf entende barras invertidas com números em base 8.", "\\145 = 101 = 'e'"]
          }
        ]
      },
      itens: [
        "você é carinhoso",
        "você é atencioso",
        "você é lindo",
        "você é esforçado",
        "você é muito inteligente",
        "você é habilidoso",
        "você é calmo",
        "você é romântico",
        "você é o melhor cozinheiro do mundo",
        "você é o melhor professor do mundo",
        "você é sensível",
        "você é feliz",
        "você é divo",
        "você é cuidadoso",
        "você é batalhador",
        "você é alta performance",
        "você é muito bom em tudo o que faz",
        "você é justo",
        "você é confeiteiro",
        "você é corinthiano",
        "você é gentil",
        "você é o amor da minha vida"
      ]
    }
  ],

  // frase que aparece depois do motivo 22
  motivosFim: "e mais um monte que não cabe em 22.",

  /* ---------- carta final (aparece quando ele abre tudo) ---------- */
  // cada linha vira um parágrafo
  carta: [
    "Se você chegou até aqui, quebrou todos os enigmas. Eu sabia que ia.",
    "Feliz aniversário, gatinhooo!",
    "Eu te desejo tudo de bão no mundo. Que você siga sempre sendo essa doce de pessoa que você é.",
    "E saiba que você pode contar comigo pra sempre, sempre!!",
    "Parabénss, te amo muito."
  ]
};
