import { defineConfig } from '@prisma/config'

export default defineConfig({
  datasource: {
    url: 'file:./prisma/dev.db', // O caminho para o seu banco SQLite
  },
})
