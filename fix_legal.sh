#!/bin/bash
set -e

echo "Création pages légales solides..."

cat > terms.html << 'EOT'
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Conditions d’utilisation — HÉRITAGE</title>
<link rel="stylesheet" href="heritage.css">
</head>
<body>
<div class="wrap">
<div class="card">
<div class="brand">HÉRITAGE</div>
<h1>Conditions d’utilisation</h1>

<p>Les présentes conditions régissent l’accès et l’utilisation du système HÉRITAGE OS, incluant l’accès sécurisé, l’espace privé, et toute interaction avec les services associés.</p>

<h2>Accès et responsabilité</h2>
<p>L’utilisateur est responsable de ses accès, données et activités. Toute tentative de compromission, extraction ou perturbation est interdite.</p>

<h2>Disponibilité</h2>
<p>Le service peut évoluer, être modifié ou suspendu sans préavis pour raisons techniques ou de sécurité.</p>

<h2>Données</h2>
<p>Les données restent sous contrôle utilisateur, conformément à la politique de confidentialité.</p>

<p>Contact : heritage-os@protonmail.com</p>

</div>
</div>
</body>
</html>
EOT

git add .
git commit -m "legal pages hardened"
git push

echo "Terminé. Vercel va redéployer."
