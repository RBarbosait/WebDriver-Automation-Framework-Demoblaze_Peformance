Prueba de Carga – Login API (K6)
1️⃣ Requisitos

Node.js (para edición de scripts opcional)

K6: https://k6.io/docs/getting-started/installation/

CSV con credenciales de prueba: loginUsers.csv

user,passwd
donero,ewedon
kevinryan,kev02937@
johnd,m38rmF$
derek,jklg*_56
mor_2314,83r5^_

2️⃣ Archivos del proyecto
Performance-Tests/
├── loginLoadTest.js       # Script de K6 para pruebas de carga
├── loginUsers.csv         # Datos parametrizados de usuarios
├── textSummary.json       # Reporte generado automáticamente
├── README_k6.md           # Este archivo
├── conclusiones.txt       # Hallazgos y recomendaciones

3️⃣ Estructura del script loginLoadTest.js

Endpoint: https://fakestoreapi.com/auth/login

Método: POST

Headers: Content-Type: application/json

Datos parametrizados desde CSV

Validaciones:

status === 200

response_time < 1.5s

Carga: 20 VUs escalando durante 1 minuto

4️⃣ Ejecución de la prueba

Abrir terminal en la carpeta del proyecto.

Ejecutar K6 con exportación de resumen en JSON:

k6 run loginLoadTest.js --summary-export=textSummary.json


Revisar la salida en consola para métricas rápidas.

El archivo textSummary.json contendrá las métricas completas para análisis posterior.

5️⃣ Métricas y validaciones

Tiempo de respuesta máximo: 1,5 segundos

Tasa de error aceptable: < 3%

TPS objetivo: 20 requests/segundo

VUs máximos: 20

Nota: Se recomienda abrir textSummary.json para análisis detallado de:

TPS promedio

Tiempos de respuesta: min, med, max, p90, p95

Tasa de error

Relación VUs – TPS

6️⃣ Reportes y conclusiones

El análisis de los resultados se documenta en InformeResultados.doc y conclusiones.txt.

Incluye: hallazgos, conclusiones, recomendaciones y gráficos de relación entre usuarios virtuales y TPS.

7️⃣ Recomendaciones para reproducibilidad

Instalar K6 correctamente en el sistema

Mantener el archivo loginUsers.csv actualizado

Ejecutar la prueba en un entorno con buena conexión a internet para evitar latencias externas
