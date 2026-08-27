import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type LegalLayoutProps = {
  title: string
  children: ReactNode
}

function LegalLayout({
  title,
  children,
}: LegalLayoutProps) {
  return (
    <div className="adminShell">
      <div className="adminTop">
        <div>
          <div className="eyebrow">
            Le Noël des Amis
          </div>

          <h1>{title}</h1>
        </div>

        <Link
          to="/"
          className="ghost"
        >
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
        <strong>SUN SEA BLUE</strong>
        <br />
        Société par actions simplifiée (SAS)
        <br />
        71 quai des États-Unis
        <br />
        06300 Nice
        <br />
        France
      </p>

      <p>
        SIREN : 451 786 255
        <br />

        E-mail :{' '}
        <a href="mailto:comamisgroup@gmail.com">
          comamisgroup@gmail.com
        </a>
        <br />

        Téléphone :{' '}
        <a href="tel:+33601067701">
          06 01 06 77 01
        </a>
      </p>

      <h2>Enseigne</h2>

      <p>Quai des Amis</p>

      <h2>Responsabilité éditoriale</h2>

      <p>
        La publication et l’exploitation du site sont
        assurées par SUN SEA BLUE.
      </p>

      <h2>Hébergement</h2>

      <p>
        Le site est hébergé par Vercel Inc.
      </p>

      <h2>Propriété intellectuelle</h2>

      <p>
        Les contenus présents sur ce site, notamment les
        textes, photographies, éléments graphiques, logos,
        noms commerciaux et présentation générale, sont
        protégés par les règles applicables en matière de
        propriété intellectuelle.
      </p>

      <p>
        Toute reproduction ou utilisation non autorisée de
        ces éléments est susceptible de constituer une
        atteinte aux droits de leur titulaire.
      </p>
    </LegalLayout>
  )
}

export function Confidentialite() {
  return (
    <LegalLayout title="Politique de confidentialité">
      <h2>Responsable du traitement</h2>

      <p>
        Le responsable du traitement des données collectées
        sur Le Noël des Amis est SUN SEA BLUE, 71 quai des
        États-Unis, 06300 Nice.
      </p>

      <h2>Données personnelles collectées</h2>

      <p>
        Dans le cadre d’une commande, SUN SEA BLUE peut
        collecter les informations nécessaires à son
        traitement, notamment :
      </p>

      <ul>
        <li>prénom et nom ;</li>
        <li>adresse e-mail ;</li>
        <li>numéro de téléphone ;</li>
        <li>contenu et montant de la commande ;</li>
        <li>date et créneau de retrait ;</li>
        <li>
          éventuelles informations complémentaires
          communiquées par le client.
        </li>
      </ul>

      <h2>Finalités</h2>

      <p>
        Les données sont utilisées notamment pour :
      </p>

      <ul>
        <li>enregistrer et préparer les commandes ;</li>
        <li>organiser le Click & Collect ;</li>
        <li>
          communiquer avec le client concernant sa commande ;
        </li>
        <li>gérer les paiements ;</li>
        <li>
          respecter les obligations administratives,
          comptables et fiscales applicables.
        </li>
      </ul>

      <h2>Paiement</h2>

      <p>
        Le paiement en ligne est réalisé par
        l’intermédiaire du prestataire de paiement Viva.
        Les données de carte bancaire ne sont pas
        enregistrées directement par Le Noël des Amis.
      </p>

      <h2>Destinataires</h2>

      <p>
        Les données sont accessibles uniquement aux
        personnes et prestataires qui en ont besoin pour le
        traitement de la commande, le paiement et le
        fonctionnement technique du service.
      </p>

      <h2>Durée de conservation</h2>

      <p>
        Les données sont conservées pendant la durée
        nécessaire à la gestion de la commande puis,
        lorsque la réglementation l’exige, pendant les
        durées légales applicables aux documents
        commerciaux, comptables et fiscaux.
      </p>

      <h2>Vos droits</h2>

      <p>
        Conformément à la réglementation applicable en
        matière de protection des données personnelles,
        vous pouvez notamment demander l’accès et la
        rectification de vos données ainsi que, lorsque les
        conditions légales sont réunies, leur effacement ou
        la limitation de leur traitement.
      </p>

      <p>
        Pour exercer vos droits :
        <br />

        <a href="mailto:comamisgroup@gmail.com">
          <strong>
            comamisgroup@gmail.com
          </strong>
        </a>
      </p>

      <h2>Réclamation</h2>

      <p>
        Si vous estimez que le traitement de vos données
        personnelles ne respecte pas la réglementation
        applicable, vous pouvez introduire une réclamation
        auprès de la CNIL.
      </p>
    </LegalLayout>
  )
}

export function CGV() {
  return (
    <LegalLayout title="Conditions générales de vente">
      <h2>1. Objet</h2>

      <p>
        Les présentes conditions générales de vente
        régissent les commandes effectuées sur le site Le
        Noël des Amis, exploité par SUN SEA BLUE sous
        l’enseigne Quai des Amis.
      </p>

      <h2>2. Produits</h2>

      <p>
        Les caractéristiques essentielles des produits
        proposés sont présentées sur le site au moment de
        la commande.
      </p>

      <p>
        Les photographies sont présentées à titre
        d’illustration et peuvent présenter de légères
        différences avec les produits effectivement
        préparés ou livrés au retrait.
      </p>

      <h2>3. Prix</h2>

      <p>
        Les prix sont indiqués en euros. Les prix
        applicables sont ceux affichés au moment de la
        validation de la commande.
      </p>

      <h2>4. Commande</h2>

      <p>
        Le client sélectionne les produits souhaités,
        vérifie son panier, renseigne ses coordonnées et
        choisit une date ainsi qu’un créneau de retrait.
      </p>

      <p>
        La commande devient définitive après validation du
        paiement.
      </p>

      <h2>5. Paiement</h2>

      <p>
        Le règlement est effectué en ligne par
        l’intermédiaire du système de paiement sécurisé
        Viva.
      </p>

      <p>
        Une commande n’est considérée comme validée
        qu’après confirmation du paiement.
      </p>

      <h2>6. Click & Collect</h2>

      <p>
        Les commandes sont proposées en retrait auprès de :
      </p>

      <p>
        <strong>Quai des Amis</strong>
        <br />
        71 quai des États-Unis
        <br />
        06300 Nice
      </p>

      <p>
        Le client sélectionne une date et un créneau de
        retrait disponibles au moment de sa commande.
      </p>

      <p>
        Il appartient au client de se présenter pendant le
        créneau sélectionné.
      </p>

      <h2>
        7. Annulation et droit de rétractation
      </h2>

      <p>
        Toute commande validée et payée est ferme.
      </p>

      <p>
        Pour les produits susceptibles de se détériorer ou
        de se périmer rapidement ainsi que, lorsqu’il y a
        lieu, les produits confectionnés selon les
        spécifications du consommateur ou nettement
        personnalisés, le droit de rétractation peut ne pas
        s’appliquer conformément aux exceptions prévues par
        la législation applicable.
      </p>

      <p>
        En dehors des droits impérativement prévus par la
        loi, aucune annulation de convenance n’est acceptée
        après validation et paiement de la commande.
      </p>

      <p>
        Cette disposition ne prive pas le client de ses
        droits légaux, notamment en cas de produit non
        conforme ou de manquement imputable au vendeur.
      </p>

      <h2>8. Réclamation</h2>

      <p>
        Toute difficulté concernant une commande peut être
        signalée au service client :
      </p>

      <p>
        E-mail :{' '}
        <a href="mailto:comamisgroup@gmail.com">
          <strong>
            comamisgroup@gmail.com
          </strong>
        </a>
        <br />

        Téléphone :{' '}
        <a href="tel:+33601067701">
          <strong>
            06 01 06 77 01
          </strong>
        </a>
      </p>

      <h2>9. Médiation de la consommation</h2>

      <p>
        En cas de litige non résolu après une réclamation
        préalable auprès de SUN SEA BLUE, le consommateur
        peut recourir gratuitement au médiateur de la
        consommation dont relève l’entreprise.
      </p>

      <p className="legalWarning">
        <strong>
          Coordonnées du médiateur de la consommation :
          à compléter avant l’ouverture définitive des
          ventes en ligne.
        </strong>
      </p>

      <h2>10. Droit applicable</h2>

      <p>
        Les présentes conditions générales sont soumises
        au droit français, sous réserve des dispositions
        impératives applicables à la protection des
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
        Pour toute question concernant votre commande,
        votre paiement ou votre retrait, vous pouvez
        contacter :
      </p>

      <p>
        <strong>
          Quai des Amis — SUN SEA BLUE
        </strong>
        <br />
        71 quai des États-Unis
        <br />
        06300 Nice
        <br />
        France
      </p>

      <p>
        E-mail :{' '}
        <a href="mailto:comamisgroup@gmail.com">
          <strong>
            comamisgroup@gmail.com
          </strong>
        </a>
        <br />

        Téléphone :{' '}
        <a href="tel:+33601067701">
          <strong>
            06 01 06 77 01
          </strong>
        </a>
      </p>
    </LegalLayout>
  )
}
