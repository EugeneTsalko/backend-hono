import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = new Hono()

app.get('/users', async (c) => {
  const allUsers = await prisma.users.findMany()
  return c.json({ data: allUsers, ok: true })
})

app.get('/users/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const user = await prisma.users.findUnique({
    where: { id },
  })

  if (!user) {
    return c.json({ error: 'Not Found', ok: false, data: user }, 404)
  }

  return c.json({ data: user, ok: true })
})

app.post('/users', async (c) => {
  const { login, email } = c.req.query()
  const isUserExists = await prisma.users.findMany({
    where: {
      OR: [{ email }, { login }],
    },
  })

  if (isUserExists.length > 0) {
    return c.json(
      {
        error: 'User with same login or email is already exists',
        ok: false,
      },
      409
    )
  }

  const newUser = await prisma.users.create({ data: { login, email } })

  return c.json({ data: newUser, ok: true }, 201)
})

app.patch('/users/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const { login, email } = c.req.query()
  const user = await prisma.users.findUnique({
    where: { id },
  })

  if (!user) {
    return c.json({ error: 'Not Found', ok: false }, 404)
  }

  const updatedUser = await prisma.users.update({
    where: { id },
    data: { login, email },
  })

  return c.json({ data: updatedUser, ok: true }, 200)
})

app.delete('/users/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const user = await prisma.users.findUnique({
    where: { id },
  })

  if (!user) {
    return c.json({ error: 'Not Found', ok: false }, 404)
  }

  const deletedUser = await prisma.users.delete({
    where: { id },
  })

  return c.json({ ok: true, data: deletedUser })
})

serve(app)
