Learning materials:
nextjs: https://www.youtube.com/watch?v=843nec-IvW0&t=13021s
react: https://www.youtube.com/watch?v=CgkZ7MvWUAA
typescript: https://www.youtube.com/watch?v=gieEQFIfgYc&t=4s
nextauth: https://www.youtube.com/watch?v=w2h54xz6Ndw

Useful Doc:
nextjs: https://nextjs.org/docs
nextauth: https://next-auth.js.org/getting-started/introduction
react: https://react.dev/reference/react
prisam: https://www.prisma.io/docs
tailwindcss: https://tailwindcss.com/docs/installation

Dev environment setups:
1. Install dev tools:
    a. Install nodejs: https://nodejs.org/en
    b. Install visual studio code: https://code.visualstudio.com/
    c. Install useful VS code extension:
         GitHub Copilot: AI coding assistant
         Prettier: code formatter
         Svg Preview
         Thunder client: rest client
2. Init DB:
    a. Install SQL server
    b. Init db from .\sql\CCOKRDBGenerate.sql
    c. Seed db from .\sql\seed.sql
3. Setup prisam:
    a. Open new terminal
    b. Run 'npm install prisma'
    c. Run 'npx prisma init'
    d. Add 'DATABASE_URL' in the new created .env
    e. Run 'npx prisma db pull'
    f. Run 'npm install @prisma/client'
    g. Run 'npx prisma generate'
4. Add 'NEXTAUTH_SECRET' in the .env from tool like openssl
5. Run 'npm run dev'
