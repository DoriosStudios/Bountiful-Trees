# Changelog

Todos los cambios importantes de Bountiful Trees se documentan en este archivo.

## [1.2.0] - 2026-07-29

### Rework completo

- Reconstruido el funcionamiento interno de los árboles, saplings y bonsáis.
- Renovados los modelos, animaciones y texturas de las 12 variantes de árboles.
- Rebalanceados los tiempos de crecimiento, costos y recompensas de cada tier.
- Actualizadas las tablas de loot para ofrecer una progresión más consistente.

### Compatibilidad

- Añadida compatibilidad completa con Bountiful Bonsais.
- Los 12 saplings de Bountiful Trees ahora pueden utilizarse en bonsáis.
- Cada bonsái cuenta con su propio modelo animado, tiempo de crecimiento y tabla de drops.
- Añadida integración con el registro de plantas de UtilityCraft.
- Los árboles avanzados ahora producen correctamente materiales de UtilityCraft, incluidos fragmentos de diamante y esmeralda, hierro energizado, netherite y acero.

### Saplings

- Los saplings ahora utilizan un único ítem para el inventario y la colocación del bloque.
- Añadido `replace_block_item` para evitar entradas duplicadas.
- Movidos correctamente a la categoría de saplings dentro del inventario creativo.
- Conservada la colocación únicamente sobre suelos compatibles.

### Hojas

- Rehecho el sistema de conexión y decay natural de las hojas.
- Las hojas colocadas por jugadores permanecen persistentes.
- Las hojas ya no se destruyen cuando la comprobación alcanza chunks sin cargar.
- Los cálculos incompletos se posponen hasta que el área esté disponible.
- Corregidos errores producidos al intentar actualizar bloques que ya cambiaron a aire.

### Árboles

- Mejorada la generación de troncos y copas para producir formas más naturales.
- Conservado el crecimiento mediante random ticks y bone meal.
- Actualizados los drops de troncos, hojas, recursos y saplings.

