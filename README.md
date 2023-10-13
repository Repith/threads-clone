
# <img src="https://github.com/Repith/threads-clone/blob/main/public/logo.svg" width=25px height=auto alt="Logo"> ThreadsClone 



Application based on the popular Threads platform that allows to share thoughts, ideas and opinions. 


## Features

- allows users to create posts, comments and react to content
- via Clerk Organization connects people into communities


## Tech Stack

**Client:** React, Next.js, TailwindCSS, shadcn/ui

**Database:** MongoDB

**Other:** Clerk with organizations

## Demo

Try it: https://threads-clone-git-main-repith.vercel.app


## Installation

First, run the development server:

```bash 
  npm install
```
Open your broweser and by default server should run on http://localhost:3000.

Configure your **.env** file with your own keys from Clerk, MongoDB and Uploadthing.

```bash
# Environment Variables
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_CLERK_WEBHOOK_

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# MongoDB
MONGODB_URL=

# Uploadthing
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
```

Login via Clerk authentication and join your own community!

## Screenshots

![Main](https://github.com/Repith/Repith/blob/main/public/Threads/main.png)
![User profile](https://github.com/Repith/Repith/blob/main/public/Threads/profile.png)
![Comments and reactions](https://github.com/Repith/Repith/blob/main/public/Threads/comments.png)
![Responsivness](https://github.com/Repith/Repith/blob/main/public/Threads/responsive.png)


## Credits

Special thanks to [Adrian Hajdin - JS Mastery](https://github.com/adrianhajdin) for this [project](https://github.com/adrianhajdin/threads) I co-coded :star: 
