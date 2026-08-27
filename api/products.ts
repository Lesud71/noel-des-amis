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

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')

    return res.status(405).json({
      error: 'Méthode non autorisée',
    })
  }

  try {
    const products = await sql`
      SELECT
        id,
        section_id,
        name_fr,
        category,
        grams,
        price_cents,
        image_url,
        stock_mode,
        stock_qty,
        sort_order
      FROM products
      WHERE
        archived = false
        AND state = 'published'
      ORDER BY sort_order ASC, name_fr ASC
    `

    return res.status(200).json(products)
  } catch (error) {
    console.error(
      'products api error:',
      error
    )

    return res.status(500).json({
      error: 'Erreur serveur',
    })
  }
}
