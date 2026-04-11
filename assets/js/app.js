(function () {
  const data = window.SITE_DATA;
  const body = document.body;
  const pageKey = body.dataset.page;
  const headerRoot = document.querySelector("[data-site-header]");
  const heroRoot = document.querySelector("[data-page-hero]");
  const contentRoot = document.querySelector("[data-page-content]");
  const footerRoot = document.querySelector("[data-site-footer]");
  const whatsappRoot = document.querySelector("[data-whatsapp-float]");
  const pageHero = data.pages[pageKey]?.hero || data.pages.home.hero;

  const formatList = (items) => items.map((item) => `<li>${item}</li>`).join("");

  function renderHeader() {
    headerRoot.innerHTML = `
      <a class="skip-link" href="#main-content">Ir para o conteúdo</a>
      <header class="site-header">
        <div class="container header-inner">
          <a class="brand" href="index.html" aria-label="${data.brand.legalName}">
            <img class="brand-mark-image" src="assets/images/logo-mark.svg" alt="" width="38" height="38">
            <span class="brand-copy">
              <strong>${data.brand.name}</strong>
              <small>Advocacia Empresarial Estratégica</small>
            </span>
          </a>
          <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
            <span></span><span></span><span></span>
            <span class="sr-only">Abrir menu</span>
          </button>
          <nav id="site-nav" class="site-nav" aria-label="Principal">
            ${data.navigation.map((item) => `
              <a href="${item.href}" ${item.key === pageKey ? 'aria-current="page"' : ""}>${item.label}</a>
            `).join("")}
            <a class="button button-small" href="${data.brand.ctaPrimary.href}">${data.brand.ctaPrimary.label}</a>
          </nav>
        </div>
      </header>
    `;
  }

  function renderHero() {
    const isHome = pageKey === "home";
    const metricMarkup = data.metrics.slice(0, 3).map((item) => `
      <div class="hero-stat">
        <strong>${item.value}</strong>
        <span>${item.label}</span>
      </div>
    `).join("");

    heroRoot.innerHTML = `
      <section class="hero ${isHome ? "hero-home" : "hero-inner"}">
        <div class="container hero-grid">
          <div class="hero-copy" data-reveal>
            <span class="eyebrow">${pageHero.eyebrow}</span>
            <h1>${pageHero.title}</h1>
            <p class="lead">${pageHero.lead}</p>
            <p class="manifesto">${data.brand.manifesto}</p>
            <div class="hero-actions">
              <a class="button" href="${data.brand.ctaPrimary.href}">${data.brand.ctaPrimary.label}</a>
              <a class="button button-ghost" href="${data.brand.ctaSecondary.href}" target="_blank" rel="noreferrer">${data.brand.ctaSecondary.label}</a>
            </div>
            <div class="hero-stats">${metricMarkup}</div>
          </div>
          <div class="hero-media-wrap" data-reveal>
            ${isHome ? `
              <div class="hero-media cinematic-shell">
                <video class="hero-video" autoplay muted loop playsinline preload="metadata" poster="${pageHero.poster}">
                  <source src="${pageHero.video}" type="video/mp4">
                </video>
                <div class="hero-reel" aria-hidden="true">
                  ${pageHero.reel.map((src, index) => `<img src="${src}" alt="" ${index === 0 ? 'class="is-visible"' : ""}>`).join("")}
                </div>
                <div class="hero-overlay-card">
                  <span>Diagnóstico inicial em 36h</span>
                  <strong>Direção jurídica clara para sócios, conselho e operação.</strong>
                </div>
              </div>
            ` : `
              <div class="inner-hero-card">
                <img src="assets/images/generated/escritorio-detalhe.jpg" alt="Detalhe sofisticado do escritório fictício" loading="lazy">
                <div>
                  <span class="eyebrow">Atendimento reservado</span>
                  <p>${data.contact.mapLabel}</p>
                </div>
              </div>
            `}
          </div>
        </div>
      </section>
    `;
  }

  function sectionShell(title, eyebrow, content, extraClass = "") {
    return `
      <section class="section ${extraClass}">
        <div class="container">
          <div class="section-heading" data-reveal>
            ${eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : ""}
            <h2>${title}</h2>
          </div>
          ${content}
        </div>
      </section>
    `;
  }

  function renderCtaBand() {
    return `
      <section class="section">
        <div class="container">
          <div class="cta-band" data-reveal>
            <div>
              <span class="eyebrow">Projeto de portfólio</span>
              <h2>Pronto para ser mostrado a escritórios que querem presença premium e geração de demanda.</h2>
            </div>
            <div class="cta-actions">
              <a class="button" href="${data.brand.ctaPrimary.href}">${data.brand.ctaPrimary.label}</a>
              <a class="button button-ghost" href="${data.brand.ctaSecondary.href}" target="_blank" rel="noreferrer">Abrir WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderHome() {
    return [
      sectionShell(
        "Percepção de valor construída em cada camada",
        "Por que este site convence",
        `
          <div class="feature-grid">
            <article class="feature-card" data-reveal>
              <span class="feature-index">01</span>
              <h3>Marca fictícia, execução real</h3>
              <p>Nome, monograma, linguagem e visual foram construídos como se o escritório estivesse pronto para captar clientes amanhã.</p>
            </article>
            <article class="feature-card" data-reveal>
              <span class="feature-index">02</span>
              <h3>Conversão sem cara de template</h3>
              <p>WhatsApp, CTAs e formulário aparecem como parte de uma experiência premium, e não como um bloco comercial improvisado.</p>
            </article>
            <article class="feature-card" data-reveal>
              <span class="feature-index">03</span>
              <h3>Mídia IA com direção editorial</h3>
              <p>As imagens e o hero em movimento ajudam a vender um produto de alto valor sem sacrificar fluidez em mobile e desktop.</p>
            </article>
          </div>
        `,
        "section-tight"
      ),
      sectionShell(
        "Áreas desenhadas para empresas e sócios",
        "Atuação principal",
        `
          <div class="cards-grid practice-grid">
            ${data.practiceAreas.map((area) => `
              <article class="practice-card" data-reveal>
                <h3>${area.title}</h3>
                <p>${area.description}</p>
                <ul>${formatList(area.highlights)}</ul>
              </article>
            `).join("")}
          </div>
        `
      ),
      `
        <section class="section section-highlight">
          <div class="container split-panel">
            <div class="split-media" data-reveal>
              <img src="assets/images/generated/reuniao-estrategica.jpg" alt="Reunião estratégica em escritório jurídico corporativo fictício" loading="lazy">
            </div>
            <div class="split-copy" data-reveal>
              <span class="eyebrow">Método AVN</span>
              <h2>Diagnóstico, desenho, implementação e preservação de posição.</h2>
              <p>O escritório trabalha com uma cadência clara: primeiro lê o contexto e a urgência, depois organiza cenários, define o arranjo jurídico e acompanha a execução com visão de negócio.</p>
              <ol class="method-list">
                <li>Leitura executiva do caso, risco e janela decisória.</li>
                <li>Estratégia jurídica com cenário principal e alternativas.</li>
                <li>Execução coordenada com diretoria, sócios ou family office.</li>
                <li>Documentação e governança para reduzir recorrência do problema.</li>
              </ol>
            </div>
          </div>
        </section>
      `,
      sectionShell(
        "Números institucionais",
        "Prova social",
        `
          <div class="metrics-grid">
            ${data.metrics.map((metric) => `
              <article class="metric-card" data-reveal>
                <strong>${metric.value}</strong>
                <p>${metric.label}</p>
              </article>
            `).join("")}
          </div>
        `
      ),
      sectionShell(
        "Depoimentos fictícios, tom de projeto real",
        "Confiança executiva",
        `
          <div class="testimonial-grid">
            ${data.testimonials.map((item) => `
              <blockquote class="testimonial-card" data-reveal>
                <p>“${item.quote}”</p>
                <footer>
                  <strong>${item.author}</strong>
                  <span>${item.role}</span>
                </footer>
              </blockquote>
            `).join("")}
          </div>
        `
      ),
      sectionShell(
        "Perguntas que um cliente realmente faria",
        "FAQ",
        `
          <div class="faq-list">
            ${data.faq.map((item, index) => `
              <article class="faq-item" data-reveal>
                <button class="faq-trigger" type="button" aria-expanded="${index === 0 ? "true" : "false"}">
                  <span>${item.question}</span>
                  <span class="faq-icon"></span>
                </button>
                <div class="faq-panel" ${index === 0 ? "" : "hidden"}>
                  <p>${item.answer}</p>
                </div>
              </article>
            `).join("")}
          </div>
        `,
        "section-tight"
      ),
      renderCtaBand()
    ].join("");
  }

  function renderOffice() {
    return [
      sectionShell(
        "História e posicionamento",
        "Escritório",
        `
          <div class="story-grid">
            <div class="story-copy" data-reveal>
              <p>Fundado para atender empresas e famílias empresárias em momentos nos quais o jurídico precisa deixar de ser apenas técnico e passar a ser decisivo, o AVN nasce com lógica de boutique: poucos mandatos, alta senioridade e desenho cirúrgico de estratégia.</p>
              <p>O foco não está em volume. Está em repertório, discrição, velocidade e capacidade de conversar com quem decide.</p>
            </div>
            <aside class="story-card" data-reveal>
              <h3>Diferenciais</h3>
              <ul>${formatList(data.differentiators)}</ul>
            </aside>
          </div>
        `
      ),
      `
        <section class="section section-dark">
          <div class="container editorial-grid">
            <div class="editorial-copy" data-reveal>
              <span class="eyebrow">Atmosfera</span>
              <h2>Arquitetura, detalhe e comportamento como parte da marca.</h2>
              <p>Em um projeto de advocacia premium, espaço e imagem também comunicam confiança. Por isso o site trabalha madeira escura, pedra, latão, vazios generosos e fotografia editorial para apoiar a autoridade institucional.</p>
            </div>
            <div class="editorial-stack" data-reveal>
              <img src="assets/images/generated/fachada-noturna.jpg" alt="Fachada noturna de escritório jurídico premium fictício" loading="lazy">
              <img src="assets/images/generated/recepcao.jpg" alt="Recepção refinada de escritório empresarial fictício" loading="lazy">
            </div>
          </div>
        </section>
      `,
      sectionShell(
        "Como o atendimento funciona",
        "Fluxo",
        `
          <div class="timeline">
            <article class="timeline-item" data-reveal><strong>1</strong><div><h3>Briefing executivo</h3><p>Leitura do contexto, histórico, pessoas-chave, urgência e risco reputacional.</p></div></article>
            <article class="timeline-item" data-reveal><strong>2</strong><div><h3>Mapa de decisão</h3><p>Cenários de curto e médio prazo, travas jurídicas e impacto sobre operação e patrimônio.</p></div></article>
            <article class="timeline-item" data-reveal><strong>3</strong><div><h3>Execução coordenada</h3><p>Documentos, negociação, governança interna e condução de crise sob uma mesma narrativa.</p></div></article>
            <article class="timeline-item" data-reveal><strong>4</strong><div><h3>Consolidação</h3><p>Padronização contratual, ritos e mecanismos preventivos para reduzir recorrência.</p></div></article>
          </div>
        `
      ),
      sectionShell(
        "Setores acompanhados de perto",
        "Especialidade setorial",
        `
          <div class="sector-cloud">
            ${data.sectors.map((sector) => `<span data-reveal>${sector}</span>`).join("")}
          </div>
        `
      ),
      renderCtaBand()
    ].join("");
  }

  function renderServices() {
    return [
      sectionShell(
        "Mapa completo de atuação",
        "Práticas",
        `
          <div class="service-list">
            ${data.practiceAreas.map((area, index) => `
              <article class="service-row" data-reveal>
                <div class="service-index">0${index + 1}</div>
                <div class="service-body">
                  <h3>${area.title}</h3>
                  <p>${area.description}</p>
                  <div class="pill-row">${area.highlights.map((item) => `<span>${item}</span>`).join("")}</div>
                </div>
              </article>
            `).join("")}
          </div>
        `
      ),
      `
        <section class="section">
          <div class="container dual-card-grid">
            <article class="glass-card" data-reveal>
              <span class="eyebrow">Consultivo recorrente</span>
              <h3>Diretoria e sócios com apoio jurídico contínuo.</h3>
              <p>Modelo para clientes que precisam de leitura rápida, desenho preventivo e parecer prático na rotina empresarial.</p>
            </article>
            <article class="glass-card" data-reveal>
              <span class="eyebrow">Mandatos críticos</span>
              <h3>Operações, litígios e crises com senioridade direta.</h3>
              <p>Modelo para situações que exigem construção acelerada de estratégia, documentação e condução sob pressão.</p>
            </article>
          </div>
        </section>
      `,
      sectionShell(
        "O que este portfólio demonstra",
        "Leitura comercial",
        `
          <div class="story-grid">
            <div class="story-copy" data-reveal>
              <p>Para vender sites a escritórios, não basta mostrar design. Este projeto demonstra entendimento do setor: quais áreas precisam aparecer, como organizar linguagem de autoridade e como tratar captação sem vulgarizar a marca.</p>
            </div>
            <aside class="story-card" data-reveal>
              <h3>Itens indispensáveis em um site jurídico premium</h3>
              <ul>
                <li>Posicionamento institucional claro</li>
                <li>Áreas de atuação com profundidade suficiente</li>
                <li>Equipe com legitimidade visual e textual</li>
                <li>Fluxo de contato visível, elegante e confiável</li>
              </ul>
            </aside>
          </div>
        `
      ),
      renderCtaBand()
    ].join("");
  }

  function renderTeam() {
    return [
      sectionShell(
        "Equipe principal",
        "Perfis",
        `
          <div class="team-grid">
            ${data.team.map((member) => `
              <article class="team-card" data-reveal>
                <img src="${member.image}" alt="Retrato fictício de ${member.name}" loading="lazy">
                <div class="team-card-body">
                  <h3>${member.name}</h3>
                  <span>${member.role}</span>
                  <p>${member.bio}</p>
                  <small>${member.credentials}</small>
                </div>
              </article>
            `).join("")}
          </div>
        `
      ),
      `
        <section class="section section-dark">
          <div class="container split-panel reverse">
            <div class="split-copy" data-reveal>
              <span class="eyebrow">Senioridade visível</span>
              <h2>Retratos e microcopy feitos para parecerem institucionais de verdade.</h2>
              <p>Ao apresentar um portfólio para escritórios, a equipe precisa transmitir repertório. Por isso os perfis combinam credenciais plausíveis, texto enxuto e retratos em linguagem visual consistente.</p>
            </div>
            <div class="split-media mosaic" data-reveal>
              <img src="assets/images/team/helena-althaus.jpg" alt="" loading="lazy">
              <img src="assets/images/team/marina-nogueira.jpg" alt="" loading="lazy">
            </div>
          </div>
        </section>
      `,
      renderCtaBand()
    ].join("");
  }

  function renderResults() {
    return [
      sectionShell(
        "Experiências exemplificativas",
        "Resultados",
        `
          <div class="result-grid">
            ${data.results.map((item) => `
              <article class="result-card" data-reveal>
                <span class="result-category">${item.category}</span>
                <h3>${item.title}</h3>
                <p>${item.summary}</p>
                <strong>${item.impact}</strong>
              </article>
            `).join("")}
          </div>
        `
      ),
      `
        <section class="section">
          <div class="container split-panel">
            <div class="split-media" data-reveal>
              <img src="assets/images/generated/boardroom.jpg" alt="Sala de reunião corporativa fictícia em tons dourados" loading="lazy">
            </div>
            <div class="split-copy" data-reveal>
              <span class="eyebrow">Observação ética</span>
              <h2>Casos apresentados como narrativa institucional.</h2>
              <p>Para um projeto de advocacia, resultado não deve soar apelativo. Aqui, os exemplos foram escritos com o grau certo de discrição, impacto e plausibilidade para sustentar valor sem perder sofisticação.</p>
            </div>
          </div>
        </section>
      `,
      sectionShell(
        "Depoimentos e recorrência",
        "Retenção",
        `
          <div class="metrics-grid">
            <article class="metric-card" data-reveal><strong>81%</strong><p>dos mandatos pontuais evoluem para nova demanda ou acompanhamento recorrente.</p></article>
            <article class="metric-card" data-reveal><strong>7,8/8</strong><p>média interna de percepção de clareza estratégica em reuniões de fechamento.</p></article>
            <article class="metric-card" data-reveal><strong>100%</strong><p>dos textos e cases do projeto são fictícios e prontos para adaptação comercial.</p></article>
          </div>
        `
      ),
      renderCtaBand()
    ].join("");
  }

  function renderContact() {
    return [
      `
        <section class="section">
          <div class="container contact-grid">
            <div class="contact-panel" data-reveal>
              <span class="eyebrow">Canais de contato</span>
              <h2>Atendimento com linguagem executiva desde o primeiro clique.</h2>
              <div class="contact-list">
                <a href="${data.contact.phoneHref}">${data.contact.phone}</a>
                <a href="${data.contact.emailHref}">${data.contact.email}</a>
                <a href="${data.contact.whatsappHref}" target="_blank" rel="noreferrer">${data.contact.whatsapp}</a>
                <p>${data.contact.address}</p>
                <p>${data.contact.hours}</p>
              </div>
              <div class="office-cards">
                ${data.offices.map((office) => `
                  <article class="office-card">
                    <strong>${office.city}</strong>
                    <h3>${office.title}</h3>
                    <p>${office.description}</p>
                  </article>
                `).join("")}
              </div>
            </div>
            <div class="form-shell" data-reveal id="formulario">
              <span class="eyebrow">Consulta estratégica</span>
              <h2>Conte seu contexto e receba um retorno inicial.</h2>
              <form class="lead-form" novalidate>
                <label>Nome completo<input type="text" name="nome" autocomplete="name" required></label>
                <label>E-mail corporativo<input type="email" name="email" autocomplete="email" spellcheck="false" inputmode="email" required></label>
                <label>Telefone<input type="tel" name="telefone" autocomplete="tel" inputmode="tel" placeholder="(11) 99999-9999" required></label>
                <label>Empresa<input type="text" name="empresa" autocomplete="organization"></label>
                <label>Área de interesse
                  <select name="areaInteresse" required>
                    <option value="">Selecione</option>
                    ${data.practiceAreas.map((area) => `<option value="${area.title}">${area.title}</option>`).join("")}
                  </select>
                </label>
                <label>Mensagem<textarea name="mensagem" rows="5" required placeholder="Explique brevemente o contexto, a urgência e o objetivo."></textarea></label>
                <button class="button" type="submit">Solicitar Consulta Estratégica</button>
                <p class="form-feedback" aria-live="polite"></p>
              </form>
            </div>
          </div>
        </section>
      `,
      sectionShell(
        "FAQ de contratação",
        "Dúvidas comuns",
        `
          <div class="faq-list">
            ${data.faq.map((item) => `
              <article class="faq-item" data-reveal>
                <button class="faq-trigger" type="button" aria-expanded="false">
                  <span>${item.question}</span>
                  <span class="faq-icon"></span>
                </button>
                <div class="faq-panel" hidden>
                  <p>${item.answer}</p>
                </div>
              </article>
            `).join("")}
          </div>
        `
      )
    ].join("");
  }

  function renderFooter() {
    footerRoot.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div>
            <img class="footer-logo" src="assets/images/logo-full.svg" alt="${data.brand.legalName}">
            <p>${data.brand.tagline}</p>
            <small>Projeto demonstrativo com conteúdo e marca fictícios.</small>
          </div>
          <div>
            <span class="footer-title">Navegação</span>
            <div class="footer-links">${data.navigation.map((item) => `<a href="${item.href}">${item.label}</a>`).join("")}</div>
          </div>
          <div>
            <span class="footer-title">Contato</span>
            <div class="footer-links">
              <a href="${data.contact.phoneHref}">${data.contact.phone}</a>
              <a href="${data.contact.emailHref}">${data.contact.email}</a>
              <a href="${data.contact.whatsappHref}" target="_blank" rel="noreferrer">WhatsApp</a>
              <span>${data.contact.address}</span>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  function renderWhatsappFloat() {
    whatsappRoot.innerHTML = `
      <a class="whatsapp-float" href="${data.contact.whatsappHref}" target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp">
        <span class="whatsapp-float-label">WhatsApp</span>
      </a>
    `;
  }

  function renderContent() {
    const markup = {
      home: renderHome(),
      office: renderOffice(),
      services: renderServices(),
      team: renderTeam(),
      results: renderResults(),
      contact: renderContact()
    };
    contentRoot.innerHTML = markup[pageKey] || markup.home;
  }

  function setupMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".site-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("is-open");
      body.classList.toggle("menu-open");
    });
  }

  function setupFaq() {
    document.querySelectorAll(".faq-trigger").forEach((button) => {
      button.addEventListener("click", () => {
        const panel = button.nextElementSibling;
        const expanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!expanded));
        if (panel) panel.hidden = expanded;
      });
    });
  }

  function setupReveal() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = document.querySelectorAll("[data-reveal]");
    if (reduceMotion) {
      targets.forEach((target) => target.classList.add("revealed"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });
    targets.forEach((target) => observer.observe(target));
  }

  function setupHeroReel() {
    const video = document.querySelector(".hero-video");
    const images = Array.from(document.querySelectorAll(".hero-reel img"));
    if (!images.length) return;

    if (video) {
      video.addEventListener("playing", () => {
        video.closest(".hero-media")?.classList.add("video-ready");
      }, { once: true });
      video.addEventListener("error", () => {
        video.closest(".hero-media")?.classList.add("video-fallback");
      }, { once: true });
    }

    let index = 0;
    window.setInterval(() => {
      images[index].classList.remove("is-visible");
      index = (index + 1) % images.length;
      images[index].classList.add("is-visible");
    }, 3200);
  }

  function setupParallax() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const media = document.querySelector(".hero-media");
    if (reduceMotion || !media) return;
    window.addEventListener("scroll", () => {
      const offset = Math.min(window.scrollY * 0.08, 22);
      media.style.transform = `translateY(${offset}px)`;
    }, { passive: true });
  }

  function setupForm() {
    const form = document.querySelector(".lead-form");
    if (!form) return;
    const feedback = form.querySelector(".form-feedback");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) {
        feedback.textContent = "Revise os campos obrigatórios antes de enviar.";
        return;
      }
      const formData = Object.fromEntries(new FormData(form).entries());
      feedback.textContent = `Solicitação registrada para ${formData.nome}. Em um projeto real, este lead seguiria para CRM, e-mail ou WhatsApp.`;
      form.reset();
    });
  }

  renderHeader();
  renderHero();
  renderContent();
  renderFooter();
  renderWhatsappFloat();
  setupMenu();
  setupFaq();
  setupReveal();
  setupHeroReel();
  setupParallax();
  setupForm();
})();
