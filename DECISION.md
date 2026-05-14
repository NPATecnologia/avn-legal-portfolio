# DECISION.md — AVN Legal Landing

Registro das decisões de design vinculantes. Toda escolha que destoa da convenção mobile-first ou que pertence ao clichê visual "navy/dourado" do segmento jurídico precisa estar justificada aqui.

> Última atualização: 2026-05-13
> Autor: NPA Tecnologia
> Status: vigente para o portfólio demonstrativo `avn-legal`

---

## 1. Princípios

1. **Mobile-first:** todo CSS é declarado para o menor viewport primeiro. Variações para telas maiores usam `@media (min-width: ...)`. Não usamos `max-width` exceto para desligar interações específicas (parallax, vídeo decorativo).
2. **PT-BR:** toda copy de marca, navegação, formulários, microcopy de erro e CTA em português brasileiro. Termos técnicos jurídicos em PT-BR (`tutelas urgentes`, `compliance`, `M&A` permitidos como anglicismo consagrado).
3. **Hierarquia de leitura no mobile:** cada seção tem um único foco visual e um único CTA por viewport. Empilhamento vertical é o estado canônico.
4. **Reduced motion respeitado:** animações de revelação e parallax são desligadas via `prefers-reduced-motion`.
5. **Toque acessível:** alvos interativos com mínimo 44×44px (Material WCAG AA). Componentes táteis (`button`, `.faq-trigger`, `.menu-toggle`) já cumprem 48–52px.

---

## 2. Paleta — justificativa para uso de "warm-dark + dourado"

A diretriz da NPA bane explicitamente o gradiente **navy + dourado** sem justificativa em DECISION.md. Esta seção justifica.

### Decisão

| Token | Valor | Função |
|---|---|---|
| `--bg` | `#0f0d0b` | Fundo base — preto quente, **não navy** |
| `--bg-soft` | `#171411` | Variante elevada |
| `--gold` | `#d7b77c` | Acento institucional (eyebrow, ícones, foco) |
| `--ivory` | `#f6eddc` | Texto principal contrastante (não branco puro) |
| `--text` | `#f7ead7` | Texto corpo |
| `--text-soft` | `rgba(247,234,215,0.72)` | Texto secundário |
| `--line` | `rgba(215,183,124,0.18)` | Divisores e contornos |

### Por que NÃO é o clichê banido

- **Não há azul-marinho.** O fundo é `#0f0d0b` (preto quente com pigmento ocre), não `#0a1f44` ou similar. Verificado com olho HSL: H=24°, S=12%, L=5%.
- **O dourado é dessaturado e quente** (H=37°, S=51%, L=66%), próximo de oliva-claro. Não é o gold-metálico saturado típico de portais jurídicos.
- **Gradiente decorativo (`body`) é radial-quente sobre preto quente**, não linear navy → gold. Comprovação no `styles.css`: o gradiente combina dois radials de gold semi-transparente sobre linear de pretos quentes.

### Quando o uso seria proibido (para guardar evolução futura)

Banido sem nova justificativa:
- Adicionar qualquer cor `hsl(220, *, 20–40%)` (faixa navy) ao escopo da landing.
- Trocar o gradiente atual por linear-gradient navy → gold (gradiente direto entre dois tons saturados).
- Usar dourado metálico saturado (`#FFD700`, `#C5A028`) como cor de marca.

---

## 3. Tipografia

| Família | Uso | Justificativa |
|---|---|---|
| `Cormorant Garamond` (600/700) | H1/H2/H3 | Serifa display com pouca terminal mecânica; carrega autoridade sem cair na "Trajan/Times advocatício". |
| `Instrument Sans` (400/500/600/700) | Corpo, UI, microcopy | Sans humanista contemporâneo, neutro e legível em telas pequenas. |

**Escala tipográfica mobile-first (base 16px):**
- H1: `clamp(2rem, 8vw, 5rem)` — começa 32px no mobile, escala até 80px no desktop.
- H2: `clamp(1.6rem, 5vw, 2.95rem)` — começa 26px no mobile.
- H3: `clamp(1.15rem, 3vw, 1.72rem)` — começa 18px no mobile.
- Corpo: 16px base, 1.6 line-height, `--text-soft` para parágrafos secundários.

**Banidos:**
- Trajan, Times New Roman, Playfair Display (clichê advocatício).
- Tracking exagerado em corpo (>0.02em em parágrafo).

---

## 4. Layout e breakpoints

Mobile-first, três pontos de corte:

| Token | Min-width | Uso |
|---|---|---|
| `--bp-md` | `720px` | Tablet pequeno — grids 2 colunas, hero ainda empilhado |
| `--bp-lg` | `1024px` | Desktop — grids 3 colunas, hero side-by-side, nav inline |
| `--bp-xl` | `1280px` | Desktop largo — refinamentos opcionais |

**Container fluido:**
- Mobile: `calc(100vw - 32px)` (16px margem cada lado).
- ≥720px: `min(1140px, calc(100vw - 48px))`.

Layouts complexos (split panels, hero, contact grid) são single-column no mobile e ganham segunda coluna em `--bp-lg`.

---

## 5. Componentes — regras mobile-first

| Componente | Default mobile | Variação maior |
|---|---|---|
| `.site-nav` | Drawer overlay acionado por `.menu-toggle` | Inline horizontal em `--bp-lg` |
| `.hero-grid` | Coluna única, copy → media | 2 colunas em `--bp-lg` |
| `.hero-stats` | Coluna única | 3 colunas em `--bp-md` |
| `.feature-grid` | Coluna única | 3 colunas em `--bp-lg` |
| `.practice-grid` / `.metrics-grid` / `.testimonial-grid` / `.result-grid` / `.team-grid` | Coluna única | 2 colunas em `--bp-md` |
| `.split-panel` / `.story-grid` / `.editorial-grid` / `.contact-grid` | Coluna única, media depois de copy (ou antes em variantes) | 2 colunas em `--bp-lg` |
| `.timeline-item` / `.service-row` | Coluna única, número acima | Coluna 1 vez | Coluna 2 (número à esquerda) em `--bp-md` |
| `.cta-band` | Empilhado vertical | Row + spread em `--bp-lg` |
| `.footer-grid` | Coluna única | 3 colunas em `--bp-lg` |
| `.site-frame` | Oculto (borda decorativa) | Visível em `--bp-lg` |

---

## 6. Mídia

- **Hero video** (`hero-loop.mp4`): aparece em todos os viewports. No mobile, o vídeo carrega com `preload="metadata"` e `poster` para evitar custo de banda. Banimos esconder o vídeo por viewport — o reel de imagens cobre o fallback.
- **Imagens estáticas**: `loading="lazy"`, dimensões `aspect-ratio` definidas, fallback de cor de fundo quente.
- **Texturas decorativas** (`grain.svg`, `contour.svg`): mantidas em todos os viewports; impacto de banda mínimo.

---

## 7. Performance e acessibilidade

- Sem JS bloqueante. `app.js` é vanilla, ~20KB.
- Fonts via Google Fonts com `preconnect` — manter.
- Imagens geradas via `scripts/generate-media.mjs` (Gemini); compressão `sharp` para servir abaixo de 200KB cada.
- Alvos táteis ≥44px. Labels `aria-label` em ícones. `aria-current="page"` em nav. `tabindex="-1"` em `main` com `skip-link`.

---

## 8. Copy guidelines

- Voz: institucional sem ser engessada. Frases curtas (≤22 palavras).
- CTAs verbalizam ação concreta: `Agendar Consulta Estratégica`, `Falar no WhatsApp`, `Solicitar Consulta Estratégica`.
- Banido: "Entre em contato", "Saiba mais", "Clique aqui" — verbos vagos.
- Microcopy de formulário em PT-BR objetivo, sem "Por favor".

---

## 9. Mudanças não-cobertas requerem novo DECISION

Qualquer das alterações abaixo exige uma nova seção neste documento antes da implementação:

- Mudança de paleta primária.
- Substituição de família tipográfica.
- Adição de animação fora de `[data-reveal]` ou parallax sutil.
- Remoção de breakpoint canônico ou adição de novo.
- Quebra do princípio mobile-first em qualquer componente.
