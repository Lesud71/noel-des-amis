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
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

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
              />
            </label>

            <label>
              Nom
              <input
                name="lastname"
                required
              />
            </label>

            <label>
              E-mail
              <input
                name="email"
                type="email"
                required
              />
            </label>

            <label>
              Téléphone
              <input
                name="phone"
                type="tel"
                required
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
              defaultChecked
            />

            <span>
              <strong>Quai des Amis</strong>
              <small>
                Retrait de votre commande sur place
              </small>
            </span>
          </label>
        </section>

        <section className="checkoutSection">
          <h3>Une précision ?</h3>

          <label>
            Note pour la commande
            <textarea
              name="note"
              rows={3}
              placeholder="Horaire souhaité, information utile…"
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
