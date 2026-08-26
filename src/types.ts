export type Variant = {
  id?: number
  product_id?: string
  label: string
  sku?: string | null
  sort_order?: number
  stock_qty?: number | null
  stock_state?: 'in_stock' | 'out_of_stock'
  price_cents?: number | null
  active?: boolean
}

export type Product = {
  id: string
  name_fr: string
  name_en?: string | null
  category: string
  section_id?: string | null
  grams?: number | null
  price_cents: number
  description_fr?: string | null
  description_en?: string | null
  state: string
  sort_order: number
  image_url?: string | null
  featured?: boolean
  sku?: string | null
  product_type?: string
  stock_mode?: string
  stock_qty?: number | null
  options?: unknown[]
  archived?: boolean
  variants?: Variant[]
}

export type ShopSection = {
  id: string
  title_fr: string
  title_en?: string | null
  sort_order: number
  visible: boolean
  description_fr?: string | null
  description_en?: string | null
  image_url?: string | null
  layout?: string
}
