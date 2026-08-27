import { useState } from 'react'

type CheckoutProps = {
  total: number
  count: number
  onBack: () => void
}

export default function Checkout({
  total,
  count,
  onBack,
}: CheckoutProps) {
  const [pickupDate, setPickupDate] = useState('')
  const [pickupTime, setPickupTime] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault()

    if (!pickupDate || !pickupTime) {
      alert(
        'Merci de choisir une date et un créneau de retrait.'
      )
      return
    }

    const form = new FormData(e.currentTarget)

    const firstname =
      String(form.get('firstname') || '').trim()

    const lastname =
      String(form.get('lastname') || '').trim()

    const email =
      String(form.get('email') || '').trim()

    const phone =
      String(form.get('phone') || '').trim()

    if (
      !firstname ||
      !lastname ||
      !email ||
      !phone
    ) {
      alert(
        'Merci de compléter vos coordonnées.'
      )
      return
    }

    try {
      setLoading(true)

      const response = await fetch(
        '/api/create-payment',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            amount: total,
            firstname,
            lastname,
            email,
            phone,
            pickupDate,
            pickupTime,
          }),
        }
      )

      const data = await response.json()

      if (
        !response.ok ||
        !data.paymentUrl
      ) {
        console.error(
          'Erreur paiement Viva:',
          data
        )

        alert(
          data.error ||
            'Impossible de lancer le paiement.'
        )

        return
      }

      window.location.href =
        data.paymentUrl
    } catch (error) {
      console.error(
        'Erreur paiement:',
        error
      )

      alert(
        'Une erreur est survenue pendant la préparation du paiement.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="checkoutPage">
      <div className="checkoutTop">
        <div>
          <div className="eyebrow">
            Finaliser
          </div>

          <h2>
            Votre commande
          </h2>
        </div>

        <button
          type="button"
          className="cartClose"
          onClick={onBack}
          aria-label="Fermer"
        >
          ×
        </button>
      </div>

      <form
        className="checkoutForm"
        onSubmit={submit}
      >
        <section className="checkoutSection">
          <h3>
            Vos coordonnées
          </h3>

          <div className="checkoutGrid">
            <label>
              Prénom
              <input
                name="firstname"
                required
                autoComplete="given-name"
              />
            </label>

            <label>
              Nom
              <input
                name="lastname"
                required
                autoComplete="family-name"
              />
            </label>

            <label>
              E-mail
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
              />
            </label>

            <label>
              Téléphone
              <input
                name="phone"
                type="tel"
                required
                autoComplete="tel"
              />
            </label>
          </div>
        </section>

        <section className="checkoutSection">
          <h3>
            Retrait
          </h3>

          <label className="checkoutChoice">
            <input
              type="radio"
              name="pickup"
              value="quai-des-amis"
              defaultChecked
            />

            <span>
              <strong>
                Quai des Amis
              </strong>

              <small>
                Retrait de votre commande
                sur place
              </small>
            </span>
          </label>

          <div className="checkoutGrid pickupGrid">
            <label>
              Date de retrait

              <select
                name="pickupDate"
                required
                value={pickupDate}
                onChange={(e) =>
                  setPickupDate(
                    e.target.value
                  )
                }
              >
                <option value="">
                  Choisir une date
                </option>

                {Array.from(
                  { length: 27 },
                  (_, i) => {
                    const date =
                      new Date(
                        2026,
                        11,
                        10 + i
                      )

                    const value =
                      date
                        .toISOString()
                        .slice(0, 10)

                    const label =
                      date.toLocaleDateString(
                        'fr-FR',
                        {
                          day: 'numeric',
                          month: 'long',
                        }
                      )

                    return (
                      <option
                        key={value}
                        value={value}
                      >
                        {label}
                      </option>
                    )
                  }
                )}
              </select>
            </label>

            <label>
              Créneau horaire

              <select
                name="pickupTime"
                required
                value={pickupTime}
                onChange={(e) =>
                  setPickupTime(
                    e.target.value
                  )
                }
              >
                <option value="">
                  Choisir un créneau
                </option>

                <option value="08h-10h">
                  8h00 – 10h00
                </option>

                <option value="10h-12h">
                  10h00 – 12h00
                </option>

                <option value="12h-14h">
                  12h00 – 14h00
                </option>

                <option value="14h-16h">
                  14h00 – 16h00
                </option>

                <option value="16h-18h">
                  16h00 – 18h00
                </option>

                <option value="18h-20h">
                  18h00 – 20h00
                </option>
              </select>
            </label>
          </div>
        </section>

        <section className="checkoutSection">
          <h3>
            Une précision ?
          </h3>

          <label>
            Note pour la commande

            <textarea
              name="note"
              rows={3}
              placeholder="Allergie, information utile, demande particulière…"
            />
          </label>
        </section>

        <div className="checkoutSummary">
          <div>
            <span>
              {count} article(s)
            </span>

            <strong>
              {(total / 100).toFixed(2)} €
            </strong>
          </div>

          <button
            className="checkoutButton"
            type="submit"
            disabled={loading}
          >
            {loading
              ? 'Connexion à Viva…'
              : 'Continuer vers le paiement'}
          </button>

          <button
            className="continueButton"
            type="button"
            onClick={onBack}
            disabled={loading}
          >
            Retour au panier
          </button>
        </div>
      </form>
    </div>
  )
}
