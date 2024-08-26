# Development
Pasos para levantar la app en desarrollo 

1. levnatar la base de datos
```
docker compose up -d
```

2. Crear una copia del .env.template y renombrarlo a .env
3. Remplazar las variables de entrono
4. Ejecutar el comando ```npm install```
5. Ejecutar el comando ```npm run dev```
6. Ejecutar estos comandos de prisma 
```
npx prisma migrate dev
npx prisma generate
```
7. Ejecutar el SEED para [crear la base de datos local](http://localhost:3000/api/seed)

## Nota:
usuario: test@google.com
pass: 123456789

# Prisma commands
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

# Prod

# Stage