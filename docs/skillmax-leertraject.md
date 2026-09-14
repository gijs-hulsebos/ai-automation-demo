# Skillmax: openbaar Leertraject

De bentogrid gebruikt de bestaande lege positie `a` voor Leertraject. De kaart haalt gepubliceerde voortgang op; `/leertraject` en de bestaande navigatieroute `/learning-trajectory` tonen het volledige overzicht. Er worden geen voorbeeldcijfers getoond bij een lege publicatie.

Stel in Vercel de servervariabele `SKILLMAX_PUBLIC_API_URL` in op:

`https://skillmax-135087328412.europe-west4.run.app/api/public/learning-report`

De website stuurt geen login, cookies of Google-credentials mee. `/api/leertraject` haalt uitsluitend de aparte openbare projectie op. Zonder configuratie of publicatie toont de pagina een lege toestand; tijdelijke storingen worden als fout weergegeven. De server en browser gebruiken geen gegevenscache, zodat intrekken bij de volgende paginalaad zichtbaar wordt.

Alle invoer en publicatiebeheer blijven in de privé-Skillmax-app. Google-accountcontrole en Firestore-opslag draaien op Cloud Run in project `gen-lang-client-0180829425`.

De oorspronkelijke PortfolioSubpage met Header, navigatie, typografie en spacing blijft behouden. De rapportage wordt uitsluitend binnen die bestaande pagina geplaatst. Het servercontract gebruikt schemaVersion 1 en lastUpdated/generatedAt; er worden geen cursus- of certificaataantallen afgeleid wanneer het bronmodel dat onderscheid niet kent.
