import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve('public/images/pictures')

// [regex to match relative path, max width, jpeg/webp quality]
const RULES = [
    { test: /^photo\d+\.jpg$/i, maxWidth: 1920, quality: 78 },
    { test: /^screenshot\d+\.png$/i, maxWidth: 1600, quality: 80 },
    { test: /^logo\/logo\d+\.webp$/i, maxWidth: 400, quality: 78 },
    { test: /^project-python\d+\.png$/i, maxWidth: 1600, quality: 80 },
    { test: /^project-logo-\d+\.png$/i, maxWidth: 500, quality: 80 },
    { test: /^person-\d+\.png$/i, maxWidth: 500, quality: 80 },
    { test: /^(avatar\.jpg|photo\.alexjoita\.png|aj-logo-profile\.png|camera\.png|daune360_logo\.png|logo-lthc\.png|logo-jro\.png|logo-imosolas\.webp|logo-logo\.jpg|un-logo\.png)$/i, maxWidth: 600, quality: 80 },
]

function pickRule(rel) {
    const norm = rel.replace(/\\/g, '/')
    for (const rule of RULES) {
        if (rule.test.test(norm)) return rule
    }
    return null
}

function walk(dir, base = '') {
    const out = []
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name)
        const rel = path.join(base, entry.name)
        if (entry.isDirectory()) out.push(...walk(full, rel))
        else out.push(rel)
    }
    return out
}

const files = walk(ROOT)
let totalBefore = 0
let totalAfter = 0
const results = []

for (const rel of files) {
    const rule = pickRule(rel)
    if (!rule) continue

    const full = path.join(ROOT, rel)
    const beforeSize = fs.statSync(full).size
    const ext = path.extname(full).toLowerCase()
    const buf = fs.readFileSync(full)

    let pipeline = sharp(buf).rotate().resize({ width: rule.maxWidth, withoutEnlargement: true })

    if (ext === '.jpg' || ext === '.jpeg') {
        pipeline = pipeline.jpeg({ quality: rule.quality, mozjpeg: true })
    } else if (ext === '.png') {
        pipeline = pipeline.png({ quality: rule.quality, compressionLevel: 9, palette: true })
    } else if (ext === '.webp') {
        pipeline = pipeline.webp({ quality: rule.quality })
    } else {
        continue
    }

    const outBuf = await pipeline.toBuffer()

    if (outBuf.length < beforeSize) {
        fs.writeFileSync(full, outBuf)
        totalBefore += beforeSize
        totalAfter += outBuf.length
        results.push({ rel, beforeSize, afterSize: outBuf.length })
    } else {
        // Not smaller (already optimized) - skip
        totalBefore += beforeSize
        totalAfter += beforeSize
    }
}

results.sort((a, b) => (b.beforeSize - b.afterSize) - (a.beforeSize - a.afterSize))
for (const r of results) {
    const pct = (100 * (1 - r.afterSize / r.beforeSize)).toFixed(0)
    console.log(`${r.rel}: ${(r.beforeSize/1024).toFixed(0)}KB -> ${(r.afterSize/1024).toFixed(0)}KB (-${pct}%)`)
}
console.log(`\nTOTAL processed: ${(totalBefore/1024/1024).toFixed(1)}MB -> ${(totalAfter/1024/1024).toFixed(1)}MB`)
