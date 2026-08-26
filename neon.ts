import { createClient } from '@neondatabase/neon-js'
import { BetterAuthReactAdapter } from '@neondatabase/neon-js/auth/react/adapters'

const authUrl = import.meta.env.VITE_NEON_AUTH_URL
const dataApiUrl = import.meta.env.VITE_NEON_DATA_API_URL

if (!authUrl) {
  console.warn('VITE_NEON_AUTH_URL manquant')
}

export const neon = createClient({
  auth: {
    url: authUrl,
    adapter: BetterAuthReactAdapter(),
  },
  // Le client unifié Neon Auth/Data API est la base de la V4.
  // La configuration Data API exacte peut évoluer pendant la bêta Neon.
  // On garde également l'URL REST publique dans l'environnement pour la couche serveur.
})

export { dataApiUrl }
