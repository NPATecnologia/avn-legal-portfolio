# PANE-DONE — AVN Legal

## Status
**CONCLUÍDO** — commit `f55c7f5` em `main`

## O que foi construído / melhorado

### Hero copy
- **Eyebrow** home: `"Portfólio demonstrativo para escritórios premium"` → `"Boutique jurídico | São Paulo — SP"` — remove linguagem meta, estabelece localização e posicionamento de imediato.
- **Title** home: título reescrito para falar diretamente ao cliente: *"Proteção estratégica para o patrimônio, a reputação e o futuro da empresa."*
- **Lead** home: foco em sócios/diretores + âncora de urgência (diagnóstico em 36h).
- **CTA band** (em todas as páginas): eyebrow `"Próximo passo"`, h2 com oferta concreta de diagnóstico em 36h — substituiu o texto de portfólio-demo anterior.
- **Páginas internas**: removidas referências meta ("equipe fictícia", "portfólio institucional") nas páginas `equipe`, `resultados` e `contato`.

### Scroll reveals via CSS
- Adicionado stagger delay progressivo (90 → 450 ms) para filhos diretos de grids: `.feature-grid`, `.cards-grid`, `.practice-grid`, `.metrics-grid`, `.testimonial-grid`, `.result-grid`, `.team-grid`, `.dual-card-grid`.
- Implementado com seletor `:is()` — escopo preciso, sem afetar elementos fora de grids.
- Respeitado `prefers-reduced-motion` via regra `transition: none !important` já existente.

### WhatsApp CTA fortalecido
- **SVG icon** inline adicionado ao botão float (logo oficial do WhatsApp).
- **Label desktop** alterado de `"WhatsApp"` para `"Consulta rápida"` — mais ação, menos genérico.
- **Pulse animation** `@keyframes waPulse` sutil (3s, ease-in-out) — chama atenção sem irritar.
- **Gap 8px** entre ícone e label.
- **`aria-label`** atualizado para `"Consultar no WhatsApp"`.
- **`ctaSecondary.label`** e botões CTA band uniformizados: `"Consultar no WhatsApp"`.

### Mobile nav
- **Fechar ao clicar fora**: `document.addEventListener("click")` — verifica se clique não está dentro do `nav` nem do `toggle`.
- **Fechar ao pressionar Escape**: `document.addEventListener("keydown")` — foca o toggle após fechar (acessibilidade).
- **Fechar ao clicar em link**: `nav.querySelectorAll("a")` com `addEventListener("click", closeMenu)`.
- Função `closeMenu()` centraliza o estado (aria-expanded, classes is-open e menu-open).

## O que não mudou
- Paleta, tipografia, breakpoints (DECISION.md preservado)
- Arquitetura de componentes JS, IDs, classes, rotas
- Pipeline de geração de mídia (`scripts/generate-media.mjs`)
- Conteúdo das áreas de atuação, equipe, resultados, FAQs, métricas

## Build
Site estático — sem etapa de build. Servir via WAMP (`http://localhost/projects/npa/pipeline/juridico/avn-legal/`) ou Vercel.
