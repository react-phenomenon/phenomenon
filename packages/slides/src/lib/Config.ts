import { Config } from '../types/Config'
import { createContext } from 'react'

export const ConfigContext = createContext<Partial<Config>>({})
