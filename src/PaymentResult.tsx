import { Link, useSearchParams } from 'react-router-dom'

type PaymentResultProps = {
  status: 'success' | 'failure'
}

export default function PaymentResult({
  status,
}: PaymentResultProps) {
  const [params] = useSearchParams()

  const transactionId = params.get('t')
  const orderCode = params.get('s')
  const eventId = params.get('eventId')
  const cancelled = params.get('cancel')

  const success = status === 'success'

  return (
    <div className="adminShell">
      <div className="adminPanel legalPage">
        <div className="eyebrow">
          Le Noël des Amis
        </div>

        <h1>
          {success
            ? 'Merci pour votre commande'
            : 'Paiement non finalisé'}
        </h1>

        {success ? (
          <>
            <p>
              Votre paiement a été transmis à Viva.
            </p>

            <p>
              Nous vérifions maintenant la confirmation
              définitive du paiement.
            </p>

            <p>
              Votre commande sera préparée pour le créneau
              Click & Collect sélectionné après validation
              du paiement.
            </p>
          </>
        ) : (
          <>
            <p>
              {cancelled
                ? 'Vous avez annulé le paiement.'
                : 'Le paiement n’a pas pu être finalisé.'}
            </p>

            <p>
              Aucun nouveau paiement ne sera tenté
              automatiquement.
            </p>

            <p>
              Vous pouvez retourner à la boutique et
              recommencer lorsque vous le souhaitez.
            </p>
          </>
        )}

        {orderCode && (
          <p>
            Référence commande :{' '}
            <strong>{orderCode}</strong>
          </p>
        )}

        {transactionId && (
          <p>
            Référence transaction :{' '}
            <strong>{transactionId}</strong>
          </p>
        )}

        {!success && eventId && (
          <p>
            Code Viva :{' '}
            <strong>{eventId}</strong>
          </p>
        )}

        <div style={{ marginTop: '28px' }}>
          <Link
            to="/"
            className="ghost"
          >
            Retour à la boutique
          </Link>
        </div>
      </div>
    </div>
  )
}
