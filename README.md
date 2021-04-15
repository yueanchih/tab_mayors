# They Are Billions mayors API (WIP)

This is going to be an API for bots like nightbot to communicate between a server API to maintain the mayors.
Essentially it has to be an array of strings.
Be patient until this gets cooked 👨‍🍳

<br>

## Update 15.04.2021

I got all of the functionalities working. A bit of redundant code, but that's okay for now.

<br>

# Installation

You will need 3 services; a bot to execute the commands, a server to create endpoints and a database to store the mayors.

A bot for Twitch like Nightbot or Streamlabs.

Serverless services like Netlify or Vercel.

A database like FaunaDB, DynamoDB or Firebase.

## Steps

1. Fork this repo.

2. Create Netlify account.

3. In Netlify, create a new site and connect the repo to it. It automatically builds it and gives you a URL. Keep it for the last step.

4. Create FaunaDB account.

   In FaunaDB create a database and name it **mayors**. Create a collection called **mayors** as well.

   Under the same database, go to **Security** and create a **key**. Keep it for the next step.

5. Connect Netlify to FaunaDB

   In Netlify, go to **Site Settings** > **Build &amp; Deploy** > **Environment** > **Environment Variables**

   Create a new variable `FAUNADB_SERVER_SECRET` and assign the FaunaDB secret to it.

6. Setup 5 custom commands in Nightbot

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

Although it is possible to have the messages managed by the bots, but it's better to have it managed by the code. There are different scenarios where the bot custom command string gets too long and hard to maintain.

To change them, you can search and modify in github or locally in your code editor. All 5 files are under [./netlify/functions](./netlify/functions)

Example `body: JSON.stringify(["Mayor bucket is empty already."]),` in [./netlify/functions/deletemayors.js:44](netlify/functions/deletemayors.js#L44)
