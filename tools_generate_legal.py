from pathlib import Path
from datetime import date

MAIL="heritage-os@protonmail.com"
TEL="0778396560"
ENTITY="Auto-entreprise (France)"
DPO="heritage-os@protonmail.com"
MAJ=date.today().strftime("%d/%m/%Y")

CSS_LINK='/heritage.css'

def page(title, body):
    return f"""<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>{title} — HÉRITAGE</title>
  <link rel="stylesheet" href="{CSS_LINK}" />
</head>
<body>
<main class="wrap">
  <section class="card">
    <div class="brand">HÉRITAGE</div>
    <h1>{title}</h1>
    <p class="muted">Dernière mise à jour : {MAJ}</p>
    {body}
    <hr style="border:none;border-top:1px solid rgba(255,255,255,.10);margin:18px 0" />
    <p class="muted">Éditeur : {ENTITY} • Contact : {MAIL} • {TEL}</p>
    <p class="muted">DPO (contact) : {DPO}</p>
    <p class="muted"><a href="/">Accueil</a> • <a href="/terms.html">Conditions</a> • <a href="/privacy.html">Confidentialité</a> • <a href="/cookies.html">Cookies</a></p>
  </section>
</main>
</body>
</html>
"""

def h2(t): return f"<h2>{t}</h2>"
def p(t): return f"<p>{t}</p>"
def ul(items): return "<ul>" + "".join(f"<li>{x}</li>" for x in items) + "</ul>"
def ol(items): return "<ol>" + "".join(f"<li>{x}</li>" for x in items) + "</ol>"

# ============ TERMS (long + dense) ============
terms_sections = []
terms_sections.append(h2("1. Objet et périmètre"))
terms_sections.append(p("Les présentes Conditions d’utilisation (les « Conditions ») régissent l’accès et l’usage du service HÉRITAGE OS (le « Service »), incluant le site, l’authentification, l’espace privé, les pages légales, et toute fonctionnalité associée."))

terms_sections.append(h2("2. Définitions"))
terms_sections.append(ul([
"« Utilisateur » : toute personne accédant au Service, qu’elle dispose ou non d’un compte.",
"« Compte » : identifiants permettant l’accès à l’espace privé.",
"« Contenu » : toute donnée transmise, stockée ou affichée via le Service (textes, images, médias, métadonnées).",
"« Espace privé » : zone authentifiée, accessible uniquement après validation d’accès."
]))

terms_sections.append(h2("3. Accès au Service, compte et sécurité"))
terms_sections.append(ul([
"L’accès à certaines fonctionnalités requiert un Compte. Vous êtes responsable de la confidentialité de vos identifiants et de toute action réalisée via votre Compte.",
"Il est interdit de tenter d’accéder aux comptes d’autrui, de contourner les protections, de scanner/attaquer le Service, d’extraire des données ou d’exploiter des vulnérabilités.",
"En cas de suspicion de compromission, vous devez notifier immédiatement le contact indiqué. Des mesures conservatoires (suspension, réinitialisation, restrictions) peuvent être appliquées pour protéger le Service et les Utilisateurs."
]))

terms_sections.append(h2("4. Usage acceptable et interdictions"))
terms_sections.append(ul([
"Contenus illégaux, atteintes aux droits de tiers (droit d’auteur, vie privée), incitation à la haine, harcèlement, menaces, ou contenus violents : interdits.",
"Collecte automatisée non autorisée (scraping), reverse engineering, tests de charge non convenus, injection de code : interdits.",
"Toute utilisation visant à nuire à la disponibilité, l’intégrité ou la confidentialité du Service : interdite."
]))

terms_sections.append(h2("5. Contenus, droits et licences techniques"))
terms_sections.append(ul([
"Vous conservez vos droits sur vos Contenus. Vous accordez au Service uniquement une licence technique non exclusive, mondiale, et limitée au temps nécessaire pour stocker, traiter et afficher les Contenus dans le cadre de la fourniture du Service.",
"Vous garantissez disposer des droits nécessaires sur les Contenus et assumer la responsabilité de toute violation de droits de tiers.",
"Le Service peut supprimer, masquer ou restreindre tout Contenu manifestement illégal, abusif, ou à risque, sans préavis lorsque requis pour la sécurité ou la conformité."
]))

terms_sections.append(h2("6. Disponibilité, maintenance, évolution"))
terms_sections.append(p("Le Service peut évoluer. Des opérations de maintenance, mises à jour, limitations temporaires ou interruptions peuvent survenir pour raisons techniques, de sécurité ou de conformité. Objectif : continuité et protection, sans garantie d’absence d’interruption."))

terms_sections.append(h2("7. Limitation de responsabilité"))
terms_sections.append(ul([
"Le Service est fourni « en l’état ». Les mesures de sécurité sont mises en œuvre de manière raisonnable, sans garantie absolue.",
"Le Service ne saurait être tenu responsable des pertes indirectes (perte d’opportunité, d’image, de revenus), ni des dommages liés aux équipements, réseaux, navigateurs, extensions, VPN ou configurations de l’Utilisateur.",
"En toute hypothèse, la responsabilité du Service, si engagée, est limitée aux montants effectivement versés pour le Service sur les 12 derniers mois (ou zéro si Service gratuit)."
]))

terms_sections.append(h2("8. Suspension, résiliation, mesures de protection"))
terms_sections.append(ul([
"En cas de violation des Conditions ou risque de sécurité, le Service peut suspendre ou restreindre l’accès, temporairement ou définitivement.",
"En cas d’urgence sécurité (intrusion, fuite de données, attaque active), des actions immédiates peuvent être prises (désactivation de modules, rotation de clés, blocage IP, fermeture temporaire).",
"Vous pouvez cesser d’utiliser le Service à tout moment."
]))

terms_sections.append(h2("9. Données personnelles et cookies"))
terms_sections.append(p("Le traitement des données personnelles est décrit dans la Politique de confidentialité. Les cookies et traceurs sont décrits dans la page Cookies. Les traceurs non essentiels (ex. analytics) ne sont activés qu’après consentement."))

terms_sections.append(h2("10. Droit applicable et juridiction"))
terms_sections.append(p("Les présentes Conditions sont régies par le droit français. Sauf dispositions impératives contraires, tout litige relève des juridictions compétentes du ressort de l’éditeur."))

terms_html = page("Conditions d’utilisation", "\n".join(terms_sections))

# ============ PRIVACY (GDPR complete) ============
privacy_sections = []
privacy_sections.append(h2("1. Responsable de traitement"))
privacy_sections.append(p(f"Le responsable de traitement est {ENTITY}. Contact : {MAIL}. DPO (contact) : {DPO}."))

privacy_sections.append(h2("2. Données traitées"))
privacy_sections.append(ul([
"Données de compte : e-mail, identifiants techniques, paramètres de session.",
"Données d’usage : journaux techniques (sécurité, anti-abus), horodatages, événements de connexion.",
"Données de contenu : informations que vous déposez volontairement dans l’espace privé (selon usage).",
"Support : échanges e-mail et éléments transmis pour diagnostic."
]))

privacy_sections.append(h2("3. Finalités"))
privacy_sections.append(ul([
"Fourniture du Service (authentification, espace privé, affichage).",
"Sécurité, prévention fraude/abus, détection d’intrusion et traçabilité.",
"Support, communication opérationnelle et conformité légale.",
"Statistiques d’usage non essentielles (uniquement après consentement explicite)."
]))

privacy_sections.append(h2("4. Bases légales (RGPD)"))
privacy_sections.append(ul([
"Exécution du contrat / mesures précontractuelles (accès, compte, espace privé).",
"Intérêt légitime (sécurité, prévention abus, défense en justice).",
"Obligation légale (conservation et réponses aux demandes légales).",
"Consentement (traceurs/analytics non essentiels)."
]))

privacy_sections.append(h2("5. Destinataires et sous-traitants"))
privacy_sections.append(ul([
"Prestataires techniques d’hébergement et de base de données (ex. infrastructure de stockage/DB).",
"Fournisseurs e-mail (contact et support).",
"Accès interne strictement limité au besoin de fournir et sécuriser le Service."
]))

privacy_sections.append(h2("6. Transferts hors UE"))
privacy_sections.append(p("Selon les prestataires choisis, certains traitements peuvent impliquer des transferts hors UE. Dans ce cas, des garanties appropriées sont mises en place (clauses contractuelles types, mesures complémentaires) conformément au RGPD."))

privacy_sections.append(h2("7. Durées de conservation"))
privacy_sections.append(ul([
"Données de compte : durée d’activité du compte + période de sécurité raisonnable.",
"Journaux de sécurité : durée proportionnée à la prévention et à l’investigation (puis purge/agrégation).",
"Données de support : durée nécessaire au traitement + archivage limité.",
"Obligations légales : conservation selon délais légaux applicables."
]))

privacy_sections.append(h2("8. Sécurité"))
privacy_sections.append(ul([
"Mesures techniques et organisationnelles raisonnables : contrôle d’accès, segmentation, limitation des permissions, journalisation sécurité.",
"Rotation/gestion des secrets et clés, durcissement des accès, surveillance d’anomalies.",
"En cas d’incident, procédures de confinement et notification selon obligations."
]))

privacy_sections.append(h2("9. Vos droits"))
privacy_sections.append(ol([
"Droit d’accès, rectification, effacement, limitation, opposition, portabilité (selon conditions).",
"Droit de retirer le consentement à tout moment pour les traitements fondés sur le consentement.",
"Droit d’introduire une réclamation auprès de la CNIL."
]))
privacy_sections.append(p(f"Pour exercer vos droits : {MAIL}. Une preuve d’identité peut être demandée si nécessaire, uniquement pour protéger vos données."))

privacy_sections.append(h2("10. Cookies / traceurs et consentement"))
privacy_sections.append(p("Les traceurs strictement nécessaires peuvent être déposés pour assurer le fonctionnement (session, sécurité). Les analytics non essentiels ne sont activés qu’après consentement explicite (voir page Cookies)."))

privacy_html = page("Politique de confidentialité", "\n".join(privacy_sections))

# ============ COOKIES (clean + conversion without dark patterns) ============
cookies_sections = []
cookies_sections.append(h2("1. Ce que sont les cookies et traceurs"))
cookies_sections.append(p("Un cookie est un petit fichier stocké sur votre appareil. Certains sont nécessaires au fonctionnement (session, sécurité). D’autres servent à mesurer l’audience (analytics)."))

cookies_sections.append(h2("2. Traceurs nécessaires (sans consentement)"))
cookies_sections.append(ul([
"Cookies de session/authentification (maintenir la session).",
"Cookies de sécurité (prévention fraude/abus, intégrité).",
"Préférences essentielles (ex. langue si applicable)."
]))

cookies_sections.append(h2("3. Analytics (uniquement après consentement)"))
cookies_sections.append(p("Par défaut, aucun analytics non essentiel n’est activé. Après consentement, un outil de mesure d’audience peut être activé (recommandation : Matomo auto-hébergé ou configuré de manière respectueuse)."))
cookies_sections.append(ul([
"Finalité : comprendre l’usage pour améliorer le Service.",
"Données : événements de navigation agrégés, pages vues, métriques techniques.",
"Durée : limitée et paramétrable.",
"Retrait : possible à tout moment en refusant/désactivant les analytics."
]))

cookies_sections.append(h2("4. Gestion du consentement"))
cookies_sections.append(p("Un bandeau de consentement permet d’accepter ou refuser les analytics. Tant que vous n’avez pas accepté, les analytics restent désactivés. Vous pouvez changer d’avis à tout moment."))

cookies_sections.append(h2("5. Contact"))
cookies_sections.append(p(f"Questions : {MAIL}."))

cookies_html = page("Cookies", "\n".join(cookies_sections))

Path("terms.html").write_text(terms_html, encoding="utf-8")
Path("privacy.html").write_text(privacy_html, encoding="utf-8")
Path("cookies.html").write_text(cookies_html, encoding="utf-8")

print("OK: generated terms.html privacy.html cookies.html (long versions)")
