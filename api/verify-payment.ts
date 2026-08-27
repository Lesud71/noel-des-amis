const TOKEN_URL =
  'https://accounts.vivapayments.com/connect/token'

const TRANSACTION_URL =
  'https://api.vivapayments.com/checkout/v2/transactions'

export default async function handler(
  req: any,
  res: any
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')

    return res.status(405).json({
      error: 'Méthode non autorisée',
    })
  }

  const transactionId = req.query?.t
  const expectedOrderCode = req.query?.s

  if (
    !transactionId ||
    !expectedOrderCode
  ) {
    return res.status(400).json({
      verified: false,
      error:
        'Transaction ou référence Viva manquante.',
    })
  }

  const clientId =
    process.env.VIVA_CLIENT_ID

  const clientSecret =
    process.env.VIVA_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return res.status(500).json({
      verified: false,
      error:
        'Identifiants Viva manquants sur le serveur.',
    })
  }

  try {
    // 1. Obtenir un token OAuth Viva
    const credentials = Buffer.from(
      `${clientId}:${clientSecret}`
    ).toString('base64')

    const tokenResponse = await fetch(
      TOKEN_URL,
      {
        method: 'POST',
        headers: {
          Authorization:
            `Basic ${credentials}`,
          'Content-Type':
            'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type:
            'client_credentials',
        }),
      }
    )

    if (!tokenResponse.ok) {
      const text =
        await tokenResponse.text()

      console.error(
        'Viva token error:',
        tokenResponse.status,
        text
      )

      return res.status(502).json({
        verified: false,
        error:
          'Impossible de vérifier le paiement auprès de Viva.',
      })
    }

    const tokenData =
      await tokenResponse.json()

    const accessToken =
      tokenData.access_token

    if (!accessToken) {
      return res.status(502).json({
        verified: false,
        error:
          'Token Viva non reçu.',
      })
    }

    // 2. Récupérer la vraie transaction chez Viva
    const transactionResponse =
      await fetch(
        `${TRANSACTION_URL}/${encodeURIComponent(
          transactionId
        )}`,
        {
          headers: {
            Authorization:
              `Bearer ${accessToken}`,
          },
        }
      )

    if (!transactionResponse.ok) {
      const text =
        await transactionResponse.text()

      console.error(
        'Viva transaction error:',
        transactionResponse.status,
        text
      )

      return res.status(502).json({
        verified: false,
        error:
          'Transaction Viva introuvable ou non vérifiable.',
      })
    }

    const transaction =
      await transactionResponse.json()

    // IMPORTANT :
    // les orderCode Viva sont très grands.
    // On les compare comme chaînes.
    const vivaOrderCode =
      String(transaction.orderCode)

    const orderMatches =
      vivaOrderCode ===
      String(expectedOrderCode)

    const paymentSuccessful =
      transaction.statusId === 'F'

    const verified =
      orderMatches &&
      paymentSuccessful

    return res.status(200).json({
      verified,
      status:
        transaction.statusId,
      transactionId,
      orderCode:
        vivaOrderCode,
      amount:
        transaction.amount,
      currencyCode:
        transaction.currencyCode,
      orderMatches,
    })
  } catch (error) {
    console.error(
      'verify-payment error:',
      error
    )

    return res.status(500).json({
      verified: false,
      error:
        'Erreur serveur pendant la vérification du paiement.',
    })
  }
}
