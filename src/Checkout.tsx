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

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!pickupDate || !pickupTime) {
      alert('Merci de choisir une date et un créneau de retrait.')
      return
    }

    alert(
      'Commande prête. Prochaine étape : connexion au paiement Viva.'
    )
  }

  return (
    <div className="checkoutPage">
      <div className="checkoutTop">
        <div>
          <div className="eyebrow">Finaliser</div>
          <h2>Votre commande</h2>
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
          <h3>Vos coordonnées</h3>

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
          <h3>Retrait</h3>

          <label className="checkoutChoice">
            <input
              type="radio"
              name="pickup"
              value="quai-des-amis"
              defaultChecked
            />

            <span>
              <strong>Quai des Amis</strong>
              <small>
                Retrait de votre commande sur place
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
                  setPickupDate(e.target.value)
                }
              >
                <option value="">
                  Choisir une date
                </option>

                <option value="23-decembre">
                  23 décembre
                </option>

                <option value="24-decembre">
                  24 décembre
                </option>

                <option value="30-decembre">
                  30 décembre
                </option>

                <option value="31-decembre">
                  31 décembre
                </option>
              </select>
            </label>

            <label>
              Créneau horaire
              <select
                name="pickupTime"
                required
                value={pickupTime}
                onChange={(e) =>
                  setPickupTime(e.target.value)
                }
              >
                <option value="">
                  Choisir un créneau
                </option>

                <option value="10h-11h">
                  10h00 – 11h00
                </option>

                <option value="11h-12h">
                  11h00 – 12h00
                </option>

                <option value="12h-13h">
                  12h00 – 13h00
                </option>

                <option value="15h-16h">
                  15h00 – 16h00
                </option>

                <option value="16h-17h">
                  16h00 – 17h00
                </option>

                <option value="17h-18h">
                  17h00 – 18h00
                </option>
              </select>
            </label>
          </div>
        </section>

        <section className="checkoutSection">
          <h3>Une précision ?</h3>

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
            <span>{count} article(s)</span>

            <strong>
              {(total / 100).toFixed(2)} €
            </strong>
          </div>

          <button
            className="checkoutButton"
            type="submit"
          >
            Continuer vers le paiement
          </button>

          <button
            className="continueButton"
            type="button"
            onClick={onBack}
          >
            Retour au panier
          </button>
        </div>
      </form>
    </div>
  )
}
