# Boilerplate for Nextjs 14 app using Tailwindcss and Shadcn/ui with PrismaORM

## Requirement

Nodejs 18+ and NPM

## Installation

First clone the project
use NPM ( in my case ) to install the project

```bash
git clone https://github.com/tuon1602/nextjs14-boilerplate.git "Your app name"
cd "Your app name"
npm install
npm run dev
```

## Build

I'm currently using docker for building, so you need to install docker app first then use these commands

```bash
docker build -t "Your app name" .
docker run -p 3000:3000 "Your app name"
```

## Features

- [Nextjs 14](https://nextjs.org/) ( of course it's core )
- [TailwindCss](https://tailwindcss.com/) + [Shadcn/Ui](https://ui.shadcn.com/) for better UI experience
- [PrismaORM](https://www.prisma.io/) for interacting with database
- [React Query](https://tanstack.com/query/latest/docs/framework/react/overview) for fetching client side
- [NextAuth V5](https://authjs.dev/getting-started) for authentication and authorization
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) for global state management
- [Zod](https://zod.dev/) + [React-Hook-Form](https://react-hook-form.com/) for form validation
- [next-intl](https://next-intl-docs.vercel.app/) Added language modlification for the project
- [Lucide-icons](https://lucide.dev/icons/) for icons
- [Next-safe-action](https://next.next-safe-action.dev/) for server action type safe
- Testing with [Jest](https://jestjs.io/docs/getting-started)

### I will update this docs later, please support me <3
