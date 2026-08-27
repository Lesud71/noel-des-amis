import { Link } from 'react-router-dom'

function LegalLayout({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="adminShell">
      <div className="adminTop">
        <div>
          <div className="eyebrow">Le Noël des Amis</div>
          <h1>{title}</h1>
        </div>

        <Link to="/" className="ghost">
          Retour à la boutique
        </Link>
      </div>

      <div className="adminPanel legalPage">
        {children}
      </div>
    </div>
  )
}

export function MentionsLegales() {
  return (
    <LegalLayout title="Mentions légales">
      <h2>Éditeur du site</h2>

      <p>
        Le site « Le Noël des Amis » est édité par :
      </p>

      <p>
        <strong>SUN SEA BLUE</strong><br />
        Société par actions simplifiée (SAS)<br />
        71 quai des États-Unis<br />
        06300 Nice<br />
        France
      </p>

      <p>
        SIREN : 451 786 255<br />
        E-mail : comamisgroup@gmail.com<br />
        Téléphone : 06 01 06 77 01
      </p>

      <h2>Enseigne</h2>

      <p>
        Quai des Amis
      </p>

      <h2>Hébergement</h2>

      <p>
        Le site est hébergé par Vercel Inc.
      </p>

      <h2>Propriété intellectuelle</h2>

      <p>
        Les contenus présents sur ce site, notamment les textes,
        photographies, éléments graphiques, logos et présentation
        générale, sont protégés par les règles applicables en matière
        de propriété intellectuelle.
      </p>
    </LegalLayout>
  )
}

export function Confidentialite() {
  return (
    <LegalLayout title="Politique de confidentialité">
      <h2>Données personnelles</h2>

      <p>
        Dans le cadre d'une commande sur Le Noël des Amis,
        SUN SEA BLUE peut collecter les informations nécessaires
        au traitement de la commande : prénom, nom, adresse
        e-mail, numéro de téléphone, informations relatives à la
        commande, date et créneau de retrait ainsi que les
        éventuelles précisions communiquées par le client.
      </p>

      <h2>Pourquoi utilisons-nous ces données ?</h2>

      <p>
        Ces informations sont utilisées pour enregistrer et
        préparer la commande, organiser son retrait, communiquer
        avec le client lorsque cela est nécessaire et assurer le
        suivi administratif et comptable des transactions.
      </p>

      <h2>Paiement</h2>

      <p>
        Le paiement en ligne est réalisé par l'intermédiaire du
        prestataire de paiement Viva. Les données de carte bancaire
        ne sont pas enregistrées directement par Le Noël des Amis.
      </p>

      <h2>Destinataires</h2>

      <p>
        Les données sont accessibles uniquement aux personnes et
        prestataires qui en ont besoin pour assurer le traitement
        de la commande, le paiement et le fonctionnement technique
        du service.
      </p>

      <h2>Durée de conservation</h2>

      <p>
        Les données sont conservées pendant la durée nécessaire au
        traitement des commandes puis, lorsque la réglementation
        l'exige, pendant les durées légales applicables aux documents
        commerciaux, comptables et fiscaux.
      </p>

      <h2>Vos droits</h2>

      <p>
        Conformément à la réglementation applicable en matière de
        protection des données personnelles, vous pouvez demander
        l'accès, la rectification ou, lorsque les conditions légales
        sont réunies, l'effacement de vos données ou la limitation
        de leur traitement.
      </p>

      <p>
        Pour toute demande concernant vos données personnelles :
        <br />
        <strong>comamisgroup@gmail.com</strong>
      </p>

      <h2>Réclamation</h2>

      <p>
        Si vous estimez que vos droits relatifs à vos données
        personnelles ne sont pas respectés, vous pouvez également
        introduire une réclamation auprès de la CNIL.
      </p>
    </LegalLayout>
  )
}

export function CGV() {
  return (
    <LegalLayout title="Conditions générales de vente">
      <h2>1. Objet</h2>

      <p>
        Les présentes conditions générales de vente régissent les
        commandes effectuées sur le site Le Noël des Amis, exploité
        par SUN SEA BLUE sous l'enseigne Quai des Amis.
      </p>

      <h2>2. Produits et prix</h2>

      <p>
        Les produits proposés à la vente sont présentés sur le site
        avec leur prix en euros. Les prix applicables sont ceux
        affichés au moment de la validation de la commande.
      </p>

      <h2>3. Commande</h2>

      <p>
        Le client sélectionne les produits souhaités, renseigne ses
        coordonnées et choisit une date et un créneau de retrait.
        La commande devient définitive après validation du paiement.
      </p>

      <h2>4. Paiement</h2>

      <p>
        Le règlement est effectué en ligne par l'intermédiaire du
        système de paiement sécurisé Viva. La commande n'est
        considérée comme validée qu'après confirmation du paiement.
      </p>

      <h2>5. Retrait des commandes</h2>

      <p>
        Les commandes sont proposées en retrait Click & Collect
        auprès de Quai des Amis, 71 quai des États-Unis,
        06300 Nice.
      </p>

      <p>
        Le client doit sélectionner lors de sa commande la date et
        le créneau de retrait disponibles sur le site. Il lui
        appartient de se présenter pendant le créneau sélectionné.
      </p>

      <h2>6. Annulation et droit de rétractation</h2>

      <p>
        Une commande validée et payée est ferme.
      </p>

      <p>
        Pour les produits susceptibles de se détériorer ou de se
        périmer rapidement ainsi que, lorsqu'il y a lieu, les
        produits confectionnés selon les spécifications du client
        ou nettement personnalisés, le droit de rétractation peut
        ne pas s'appliquer conformément aux exceptions prévues par
        la législation applicable.
      </p>

      <p>
        En dehors des droits impérativement prévus par la loi,
        aucune annulation de convenance n'est acceptée après
        validation de la commande.
      </p>

      <p>
        Cette disposition ne prive pas le client de ses droits
        légaux notamment en cas de produit non conforme ou de
        manquement imputable au vendeur.
      </p>

      <h2>7. Réclamation</h2>

      <p>
        Toute difficulté concernant une commande peut être signalée
        au service client :
      </p>

      <p>
        E-mail : <strong>comamisgroup@gmail.com</strong><br />
        Téléphone : <strong>06 01 06 77 01</strong>
      </p>

      <h2>8. Médiation de la consommation</h2>

      <p>
        En cas de litige non résolu après une réclamation préalable
        auprès de SUN SEA BLUE, le consommateur peut recourir
        gratuitement au médiateur de la consommation dont relève
        l'entreprise.
      </p>

      <p>
        <strong>
          Coordonnées du médiateur : à compléter avant l'ouverture
          définitive des ventes.
        </strong>
      </p>

      <h2>9. Droit applicable</h2>

      <p>
        Les présentes conditions sont soumises au droit français,
        sous réserve des dispositions impératives protégeant les
        consommateurs.
      </p>
    </LegalLayout>
  )
}

export function Contact() {
  return (
    <LegalLayout title="Contact">
      <h2>Service client</h2>

      <p>
        Pour toute question concernant votre commande ou votre
        retrait, vous pouvez contacter :
      </p>

      <p>
        <strong>Quai des Amis — SUN SEA BLUE</strong><br />
        71 quai des États-Unis<br />
        06300 Nice<br />
        France
      </p>

      <p>
        E-mail : <strong>comamisgroup@gmail.com</strong><br />
        Téléphone : <strong>06 01 06 77 01</strong>
      </p>
    </LegalLayout>
  )
}
