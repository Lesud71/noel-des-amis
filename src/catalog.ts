import type { Product, ShopSection } from './types'

export const fallbackSections: ShopSection[] = [
  { id: 'foie', title_fr: 'Foie gras', sort_order: 10, visible: true },
  { id: 'saumons', title_fr: 'Saumons', sort_order: 20, visible: true },
  { id: 'pains', title_fr: 'Pains', sort_order: 30, visible: true },
  { id: 'chutneys', title_fr: 'Chutneys', sort_order: 40, visible: true },
  { id: 'fromage', title_fr: 'Fromage', sort_order: 50, visible: true },
  { id: 'caviar', title_fr: 'Caviar', sort_order: 60, visible: true }
]

export const fallbackProducts: Product[] = [
  ['fg125','Foie gras mi-cuit','foie',125,2000],
  ['fg250','Foie gras mi-cuit','foie',250,4000],
  ['fg500','Foie gras mi-cuit','foie',500,8000],
  ['fg1000','Foie gras mi-cuit','foie',1000,16000],
  ['sf125','Saumon fumé maison','saumons',125,1000],
  ['sf250','Saumon fumé maison','saumons',250,2000],
  ['sf500','Saumon fumé maison','saumons',500,4000],
  ['sf1000','Saumon fumé maison','saumons',1000,8000],
  ['gr125','Gravlax de saumon aux herbes','saumons',125,1000],
  ['gr250','Gravlax de saumon aux herbes','saumons',250,1900],
  ['gr500','Gravlax de saumon aux herbes','saumons',500,3800],
  ['pb250','Pain brioché maison','pains',250,1000],
  ['pb500','Pain brioché maison','pains',500,2000],
  ['pe250','Pain d’épices maison','pains',250,800],
  ['pe500','Pain d’épices maison','pains',500,1500],
  ['cf150','Chutney de figues','chutneys',150,500],
  ['cp150','Chutney de poire','chutneys',150,500],
  ['bt250','Brie truffé','fromage',250,2000],
  ['bt500','Brie truffé','fromage',500,4000],
  ['ca30','Caviar Antonius','caviar',30,7500],
  ['ca50','Caviar Antonius','caviar',50,12500],
  ['ca100','Caviar Antonius','caviar',100,25000],
  ['ca250','Caviar Antonius','caviar',250,50000]
].map((p, i) => ({
  id: p[0] as string,
  name_fr: p[1] as string,
  category: '',
  section_id: p[2] as string,
  grams: p[3] as number,
  price_cents: p[4] as number,
  state: 'published',
  sort_order: (i + 1) * 10,
  product_type: 'food',
  stock_mode: 'unlimited',
  image_url: '',
  archived: false,
  variants: []
}))
