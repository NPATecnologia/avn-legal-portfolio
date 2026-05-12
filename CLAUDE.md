# AVN Legal — Site NPA

Site institucional jurídico (estático, HTML/CSS/JS) com pipeline de geração de mídia via Google GenAI.

## Stack
- Estático (HTML/CSS/JS) — abrir no browser ou servir via WAMP/Vercel
- Pipeline de mídia: Node + `@google/genai` + `sharp` em `scripts/generate-media.mjs`

## Comandos
```bash
npm install
npm run generate:media   # gera assets via Google GenAI
```

## Contexto
- Cliente: AVN Legal (escritório jurídico)
- Repo: `NPATecnologia/avn-legal-site` (público)
- Vault: `C:\Users\napag\npa-vault`

## Convenções NPA
- PT-BR no conteúdo, inglês no código
- Footer: "Desenvolvido por NPA Tecnologia"
- Email git: `nathan@npatecnologia.com.br`
