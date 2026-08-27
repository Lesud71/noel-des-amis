import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

type PaymentResultProps = {
  status: 'success' | 'failure'
}

type VerificationState =
  | 'checking'
  | 'verified'
  | 'rejected'
  | 'error'

export default function PaymentResult({
  status,
}: PaymentResultProps) {
  const location = useLocation()

  const [verification, setVerification] =
    useState<VerificationState>(
      status === 'success'
        ? 'checking'
        : 'rejected'
    )

  const [message, setMessage] =
    useState('')

  useEffect(() => {
    if (status !== 'success') {
      return
    }

    const params = new URLSearchParams(
      location.search
    )

    const transactionId =
      params.get('t')

    const orderCode =
      params.get('s')

    if (!transactionId || !orderCode) {
      setVerification('rejected')
      setMessage(
        'Les informations de paiement Viva sont manquantes.'
      )
      return
    }

    async function verifyPayment() {
      try {
        const response = await fetch(
          `/api/verify-payment?t=${encodeURIComponent(
            transactionId!
          )}&s=${encodeURIComponent(
            orderCode!
          )}`
        )

        const data =
          await response.json()

        if (
          response.ok &&
          data.verified === true
        ) {
          setVerification('verified')

          // Le panier n'est vidé qu'après
          // confirmation serveur de Viva.
          localStorage.removeItem(
            'nda-cart'
          )

          return
        }

        setVerification('rejected')

        setMessage(
          data.error ||
            'Le paiement n’a pas pu être confirmé.'
        )
      } catch (error) {
        console.error(
          'Payment verification error:',
          error
        )

        setVerification('error')

        setMessage(
          'Impossible de vérifier le paiement pour le moment.'
        )
      }
    }

    verifyPayment()
  }, [status, location.search])

  if (status === 'failure') {
    return (
      <div className="legalPage">
        <div className="eyebrow">
          LE NOËL DES AMIS
        </div>

        <h1>Paiement non finalisé</h1>

        <p>
          Votre paiement n’a pas été
          confirmé.
        </p>

        <p>
          Aucun paiement validé ne sera
          considéré comme reçu tant que
          Viva ne l’aura pas confirmé.
        </p>

        <Link to="/" className="ghost">
          Retour à la boutique
        </Link>
      </div>
    )
  }

  if (verification === 'checking') {
    return (
      <div className="legalPage">
        <div className="eyebrow">
          LE NOËL DES AMIS
        </div>

        <h1>
          Vérification du paiement…
        </h1>

        <p>
          Nous vérifions directement
          votre paiement auprès de Viva.
        </p>

        <p>
          Merci de patienter quelques
          instants.
        </p>
      </div>
    )
  }

  if (verification === 'verified') {
    return (
      <div className="legalPage">
        <div className="eyebrow">
          LE NOËL DES AMIS
        </div>

        <h1>Paiement confirmé</h1>

        <p>
          Merci pour votre commande.
        </p>

        <p>
          Votre paiement a été confirmé
          par Viva.
        </p>

        <p>
          Votre commande sera préparée
          pour le créneau Click & Collect
          sélectionné.
        </p>

        <Link to="/" className="ghost">
          Retour à la boutique
        </Link>
      </div>
    )
  }

  return (
    <div className="legalPage">
      <div className="eyebrow">
        LE NOËL DES AMIS
      </div>

      <h1>
        Paiement non confirmé
      </h1>

      <p>
        Nous n’avons pas pu confirmer
        définitivement votre paiement.
      </p>

      {message && <p>{message}</p>}

      <p>
        Si votre compte a été débité,
        conservez votre confirmation Viva.
      </p>

      <Link to="/" className="ghost">
        Retour à la boutique
      </Link>
    </div>
  )
}
