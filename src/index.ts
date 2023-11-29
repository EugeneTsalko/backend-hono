import { serve } from '@hono/node-server'
import { userRoute } from './routes'

serve(userRoute)
