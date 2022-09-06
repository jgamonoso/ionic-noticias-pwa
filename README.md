# First install dependencies
npm i

# Preparations
# Prepare app to run on Android studio
"target": "es6" (tsconfig.json)
Habilitar modo desarrollador
Habilitar "Instalar via USB" (en móvil físico)

# Start on VSC
ionic serve

# Generate the www folder
ionic build

# Generate the native project, if it does not already exist
  # Install the Capacitor platform package
  # Copy the native platform template into your project
ionic capacitor add android

# live reload capacitor
ionic capacitor run android --livereload --external

# ---------- ---------- ---------- ---------- ---------- #
# Despues de hacer npm i
# generación de la carpeta www
ionic build --prod

# Instalar herramients de firebase
npm install -g firebase-tools

# Firebase Login
firebase login

# Firebase Init
firebase init

# Firebase deploy
firebase deploy
# (Si se cambia algo --> ionic build --prod y luego firebase deploy)
