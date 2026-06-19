# Agentes del proyecto Centro Metabólico

Agentes Claude Code scoped a este repo. Disponibles cuando trabajas con cwd = raíz del proyecto.

| Agente | Tools | Cuándo usarlo |
|--------|-------|---------------|
| [pricing-sync](pricing-sync.md) | Read, Grep, Glob | Después de cambios de precios; antes de release. Detecta tiers desincronizados, datos muertos, eyebrow vs tabla. |
| [copy-reviewer](copy-reviewer.md) | Read, Grep, Glob | Antes de commits con cambios de copy. Revisa voz, claims, typos, consistencia chilena. |
| [seo-audit](seo-audit.md) | Read, Grep, Glob, WebFetch | Antes de releases importantes; al agregar páginas nuevas. Audita metadata, schema, sitemap, alts. |

## Invocación

```
Agent(subagent_type="pricing-sync", prompt="audita todos los precios del sitio")
```

Todos son **read-only** — reportan pero no editan. El usuario o el agente principal aplica los cambios.
