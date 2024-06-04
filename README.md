# Development
Pasos par alevnatar el app a Desarrollo

1. Levantar la base de datos
```
docker compose up -d
```

2. Renombrar el .env.template a .env
3. Reemplazar Variables
4. Ejecutar Comando ```npm install```
5. Ejcutar comando ```npm run dev```
6. Ejecutar el SEED para [crear la base de datos local](localhost:3000/api/sed)

## Note
Usuario por defecto: carlos@mail.com
CPntrasena: 12345678


# Prisma Commands
1. Para inicializar el Prixma configutre
```npx prisma init```

2. Para crear una migracion
```npx prisma migrate dev```

3. Para Generar el cliente de Prisma
```npx prisma generate```

# Prod