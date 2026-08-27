import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export default async function handler(
  req: any,
  res: any
) {
  if (!process.env.DATABASE_URL) {
    return res.status(500).json({
      error: 'DATABASE_URL manquant',
    })
  }

  try {
    // =========================
    // GET — Liste des produits
    // =========================
    if (req.method === 'GET') {
      const products = await sql`
        SELECT
          id,
          section_id,
          name_fr,
          price_cents,
          grams,
          image_url,
          stock_qty,
          is_published,
          is_archived,
          sort_order
        FROM products
        WHERE is_archived = false
        ORDER BY sort_order ASC, name_fr ASC
      `

      return res.status(200).json(products)
    }

    // =========================
    // POST — Nouveau produit
    // =========================
    if (req.method === 'POST') {
      const {
        section_id,
        name_fr,
        price_cents,
        grams,
        image_url,
        stock_qty,
        is_published,
      } = req.body ?? {}

      if (
        !name_fr ||
        price_cents === undefined ||
        price_cents === null
      ) {
        return res.status(400).json({
          error: 'Nom et prix obligatoires',
        })
      }

      const price = Number(price_cents)

      if (
        !Number.isInteger(price) ||
        price < 0
      ) {
        return res.status(400).json({
          error: 'Prix invalide',
        })
      }

      const created = await sql`
        INSERT INTO products (
          section_id,
          name_fr,
          price_cents,
          grams,
          image_url,
          stock_qty,
          is_published,
          is_archived
        )
        VALUES (
          ${section_id || null},
          ${String(name_fr).trim()},
          ${price},
          ${
            grams === '' ||
            grams === undefined ||
            grams === null
              ? null
              : Number(grams)
          },
          ${image_url || null},
          ${
            stock_qty === '' ||
            stock_qty === undefined ||
            stock_qty === null
              ? null
              : Number(stock_qty)
          },
          ${Boolean(is_published)},
          false
        )
        RETURNING *
      `

      return res.status(201).json(created[0])
    }

    // =========================
    // PUT — Modifier un produit
    // =========================
    if (req.method === 'PUT') {
      const {
        id,
        section_id,
        name_fr,
        price_cents,
        grams,
        image_url,
        stock_qty,
        is_published,
      } = req.body ?? {}

      if (!id) {
        return res.status(400).json({
          error: 'ID produit manquant',
        })
      }

      if (
        !name_fr ||
        price_cents === undefined ||
        price_cents === null
      ) {
        return res.status(400).json({
          error: 'Nom et prix obligatoires',
        })
      }

      const price = Number(price_cents)

      if (
        !Number.isInteger(price) ||
        price < 0
      ) {
        return res.status(400).json({
          error: 'Prix invalide',
        })
      }

      const updated = await sql`
        UPDATE products
        SET
          section_id = ${section_id || null},
          name_fr = ${String(name_fr).trim()},
          price_cents = ${price},
          grams = ${
            grams === '' ||
            grams === undefined ||
            grams === null
              ? null
              : Number(grams)
          },
          image_url = ${image_url || null},
          stock_qty = ${
            stock_qty === '' ||
            stock_qty === undefined ||
            stock_qty === null
              ? null
              : Number(stock_qty)
          },
          is_published = ${Boolean(is_published)}
        WHERE id = ${id}
        RETURNING *
      `

      if (!updated.length) {
        return res.status(404).json({
          error: 'Produit introuvable',
        })
      }

      return res.status(200).json(updated[0])
    }

    // =========================
    // DELETE — Archiver
    // =========================
    if (req.method === 'DELETE') {
      const id =
        req.body?.id ??
        req.query?.id

      if (!id) {
        return res.status(400).json({
          error: 'ID produit manquant',
        })
      }

      const archived = await sql`
        UPDATE products
        SET
          is_archived = true,
          is_published = false
        WHERE id = ${id}
        RETURNING id
      `

      if (!archived.length) {
        return res.status(404).json({
          error: 'Produit introuvable',
        })
      }

      return res.status(200).json({
        success: true,
      })
    }

    res.setHeader(
      'Allow',
      'GET, POST, PUT, DELETE'
    )

    return res.status(405).json({
      error: 'Méthode non autorisée',
    })
  } catch (error) {
    console.error(
      'admin-products error:',
      error
    )

    return res.status(500).json({
      error: 'Erreur serveur',
    })
  }
}
