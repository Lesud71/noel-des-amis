type PaymentRequestBody = {
  amount: number
  firstname?: string
  lastname?: string
  email?: string
  phone?: string
  pickupDate?: string
  pickupTime?: string
}

type VercelRequest = {
  method?: string
  body?: PaymentRequestBody
}

type VercelResponse = {
  status: (code: number) => VercelResponse
  json: (data: unknown) => void
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
    })
  }

  try {
    const clientId = process.env.VIVA_CLIENT_ID
    const clientSecret = process.env.VIVA_CLIENT_SECRET
    const sourceCode = process.env.VIVA_SOURCE_CODE

    if (!clientId || !clientSecret || !sourceCode) {
      return res.status(500).json({
        error: 'Configuration Viva manquante',
      })
    }

    const {
      amount,
      firstname = '',
      lastname = '',
      email = '',
      phone = '',
      pickupDate = '',
      pickupTime = '',
    } = req.body || {}

    if (!amount || amount < 30) {
      return res.status(400).json({
        error: 'Montant invalide',
      })
    }

    const basicAuth = Buffer.from(
      `${clientId}:${clientSecret}`
    ).toString('base64')

    const tokenResponse = await fetch(
      'https://accounts.vivapayments.com/connect/token',
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${basicAuth}`,
          'Content-Type':
            'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
      }
    )

    if (!tokenResponse.ok) {
      const tokenError = await tokenResponse.text()

      console.error(
        'Erreur token Viva:',
        tokenResponse.status,
        tokenError
      )

      return res.status(502).json({
        error: 'Impossible de se connecter à Viva',
      })
    }

    const tokenData = await tokenResponse.json() as {
      access_token?: string
    }

    if (!tokenData.access_token) {
      return res.status(502).json({
        error: 'Token Viva absent',
      })
    }

    const fullName =
      `${firstname} ${lastname}`.trim()

    const pickupDescription =
      pickupDate && pickupTime
        ? `Retrait ${pickupDate} - ${pickupTime}`
        : 'Click & Collect Quai des Amis'

    const orderResponse = await fetch(
      'https://api.vivapayments.com/checkout/v2/orders',
      {
        method: 'POST',
        headers: {
          Authorization:
            `Bearer ${tokenData.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          sourceCode,
          customerTrns:
            `Le Noël des Amis - ${pickupDescription}`,
          merchantTrns:
            `Commande Le Noël des Amis - ${pickupDescription}`,
          customer: {
            email,
            fullName,
            phone,
            countryCode: 'FR',
            requestLang: 'fr-FR',
          },
        }),
      }
    )

    const orderData = await orderResponse.json() as {
      orderCode?: number | string
      message?: string
    }

    if (!orderResponse.ok || !orderData.orderCode) {
      console.error(
        'Erreur création commande Viva:',
        orderResponse.status,
        orderData
      )

      return res.status(502).json({
        error:
          orderData.message ||
          'Impossible de créer la commande Viva',
      })
    }

    const paymentUrl =
      `https://www.vivapayments.com/web/checkout?ref=${orderData.orderCode}`

    return res.status(200).json({
      orderCode: orderData.orderCode,
      paymentUrl,
    })
  } catch (error) {
    console.error('Erreur create-payment:', error)

    return res.status(500).json({
      error: 'Erreur interne du serveur',
    })
  }
}
