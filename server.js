// ═══════════════════════════════════════════════════════════════════════════
//  TUTU REFERIDOS — servidor del Club de Referidos de Tutu Automotores
//  Rutas:  /referidos  ·  /referidos/bases  ·  /referidos/admin  ·  /api/referidos
//  Variables (Railway): DATABASE_URL (la pone Railway al agregar PostgreSQL),
//                       REFERIDOS_PANEL_PASS (contraseña del panel). Resto en referidos.js.
// ═══════════════════════════════════════════════════════════════════════════
const express = require('express')
const cors = require('cors')
const path = require('path')
const { Pool } = require('pg')

const app = express()
app.disable('x-powered-by')
app.use(cors())
app.use(express.json({ limit: '200kb' }))

const dbUrl = process.env.DATABASE_URL || process.env.DATABASE_PRIVATE_URL || process.env.POSTGRES_URL
if (!dbUrl) console.error('❌ Falta DATABASE_URL: agregá una base PostgreSQL al proyecto en Railway y conectala a este servicio.')
const isInternal = (dbUrl || '').includes('railway.internal') || (dbUrl || '').includes('localhost')
const pool = new Pool({ connectionString: dbUrl, ssl: isInternal ? false : { rejectUnauthorized: false } })
pool.on('error', e => console.error('❌ PostgreSQL:', e.message))
pool.query('SELECT 1').then(() => console.log('✅ PostgreSQL conectado OK')).catch(e => console.error('❌ PostgreSQL NO conectado:', e.message))

require('./referidos')(app, pool)

app.get('/', (req, res) => res.redirect('/referidos'))
app.get('/salud', (req, res) => pool.query('SELECT 1').then(() => res.json({ ok: true })).catch(e => res.status(500).json({ ok: false, error: e.message })))
app.use(express.static(path.join(__dirname, 'public'), { index: false }))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`🚀 tutu-referidos en puerto ${PORT}`))
