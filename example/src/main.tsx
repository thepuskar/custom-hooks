import { createRoot } from 'react-dom/client'

import { Routes } from './routes'
import './index.css'

const container = document.getElementById('root')!
createRoot(container).render(<Routes />)
