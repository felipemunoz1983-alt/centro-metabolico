# Esta carpeta es un build, no código fuente

`public/inbody/` es la **landing InBody 970 de las campañas**, exportada con
`next build && next export` desde un proyecto que **no está en este repo**.
Entró completa el 11-jun-2026 en el commit `1b34181`, 145 archivos ya
compilados: HTML renderizado, chunks de `_next`, fuentes y 100 fotogramas.

Se buscó el proyecto original el 30-oct-2026 y no aparece: ni en el disco, ni
en los 16 repos de la cuenta de GitHub, ni en otra rama, ni borrado en la
historia de este repo. Lo que se sabe de él, leyendo lo compilado: Next.js con
Turbopack, fuentes Geist y Geist Mono, y `basePath` fijado en
`/centro-metabolico/inbody` (la ruta de los frames va incrustada en el bundle).

**No borrar esta carpeta.** Es la página que reciben los anuncios pagados, y es
la buena: 907 palabras y 7 secciones, contra las 449 palabras de
`/evaluaciones/inbody/`, que es la del sitio. Lleva `noindex, follow` y canonical
hacia la del sitio para que no compitan en Google.

## Parche aplicado el 30-oct-2026

**Archivo:** `_next/static/chunks/0nys1ha9_0615.js` — componente `BackgroundCanvas`.

**El problema.** El fondo es una animación de scroll de 100 fotogramas, unos
5,5 MB en total. El código esperaba a que cargaran **los 100** antes de mostrar
nada:

```js
n.onload = () => { ... h((e+=1)/100), 100===e && c(!0) }
```

Medido contra producción: **9 segundos** con buena conexión, y mientras tanto la
persona veía un degradado vacío con una píldora de "Cargando · 0%". En datos
móviles es bastante peor. Para una landing de campañas pagadas, eso es tráfico
que se va antes de leer una línea.

**El cambio.** Mostrar apenas hay cuadros suficientes para que se vea algo, y
seguir cargando el resto de fondo:

```js
n.onload = () => { ... h((e+=1)/100), e>=10 && c(!0), d() }
```

Dos detalles que importan:

- `e>=10` y no `10===e`: si los diez primeros fallaran, igual se revela.
  Llamar al setter de más es inocuo — React descarta el mismo valor.
- El `d()` repinta en cada cuadro que llega. Sin él, al revelar temprano el
  canvas quedaba en blanco hasta que la persona hiciera scroll, porque el
  dibujado solo se dispara con el scroll y el cuadro 0 podía no haber llegado.

Verificado tras el parche: fondo visible en **menos de 1 segundo**, píldora de
carga ya oculta, y la animación de scroll intacta.

## Si alguien reexporta esta landing

**El parche se pierde.** Hay que volver a aplicarlo sobre el bundle nuevo, o
mejor, arreglarlo en el proyecto original: que el velo se levante con los
primeros cuadros y el resto se precargue de fondo.

Y de paso, ahí sí conviene atacar la causa: 55 KB por fotograma es mucho.
Convertidos a WebP quedarían en un tercio sin pérdida visible.

## Cómo probarla local

El bundle tiene el `basePath` incrustado, así que servir `out/` en la raíz
devuelve 404 en todos sus assets. Hay que servirlo bajo `/centro-metabolico`:

```python
import http.server, functools
PREF = "/centro-metabolico"
class H(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        if path.startswith(PREF):
            path = path[len(PREF):] or "/"
        return super().translate_path(path)
http.server.test(HandlerClass=functools.partial(H, directory="out"), port=8099)
```

Luego abrir `http://127.0.0.1:8099/centro-metabolico/inbody/`.
