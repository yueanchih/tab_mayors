# They Are Billions mayors API (WIP)

This is going to be an API for bots like nightbot to communicate between a server API to maintain the mayors.
Essentially it has to be an array of strings.
Be patient until this gets cooked 👨‍🍳

# Update 15.04.2021

I got all of the functionalities working. A bit of redundant code, but that's okay for now.

# Installation

You will need 3 services; a bot to execute the commands, a server to create endpoints and a database to store the mayors.

1. Clone or Fork this repo.

2. Create Netlify (or Vercel) account.

3. In Netlify, create a new site and connect the repo to it. It automatically builds it and gives you a URL. Keep it for the last step.

4. Create FaunaDB account.

   In FaunaDB create a database name it **mayors**. Create a collection called **mayors** as well.

   Under the same database, go to **Security** and create a **key**. Keep it for the next step.

5. Connect Netlify to FaunaDB

   In Netlify, go to **Site Settings** > **Build &amp; Deploy** > **Environment** > **Environment Variables**

   Create a new variable `FAUNADB_SERVER_SECRET` and assign the FaunaDB secret to it.

6. Setup 5 Nightbot (or other bots) custom commands like so:

   ⚠ Replace your Netlify site URL here.

   👉 Command `!addmayor`

   📝 Message `$(eval const api = $(urlfetch https://YOUR_NETLIFY_SUBDOMAIN.netlify.app/.netlify/functions/addmayor?mayor=$(querystring)); api)`

   <br>

   👉 Command `!deletemayor`

   📝 Message `$(eval const api = $(urlfetch https://YOUR_NETLIFY_SUBDOMAIN.netlify.app/.netlify/functions/deletemayor?mayor_index=$(querystring)); api)`

   <br>

   👉 Command `!editmayor`

   📝 Message `$(eval const api = $(urlfetch https://YOUR_NETLIFY_SUBDOMAIN.netlify.app/.netlify/functions/editmayor?mayor_index_mayor_name=$(querystring)); api)`

   <br>

   👉 Command `!mayors`

   📝 Message `$(eval const api = $(urlfetch https://YOUR_NETLIFY_SUBDOMAIN.netlify.app/.netlify/functions/mayors); api)`

   <br>

   👉 Command `!resetmayors`

   📝 Message `$(eval const api = $(urlfetch https://YOUR_NETLIFY_SUBDOMAIN.netlify.app/.netlify/functions/deletemayors); api)`

<br>

# Modifying the Bot Responses

This is managed inside the code you cloned / forked. You can easily do a global search and find them.

Example `body: JSON.stringify(["Mayor bucket is empty already."]),` in [./netlify/functions/deletemayors.js:44](netlify/functions/deletemayors.js:44)
