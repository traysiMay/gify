import React from 'react'
import { Drizzle, generateStore } from 'drizzle'
import Context from './Context'
import Mycelium from '../contracts/Mycelium.json'
import Toadstool from '../contracts/Toadstool.json'

const options = {
  contracts: [Mycelium],
  web3: {
    fallback: {
      type: 'ws',
      url: 'ws://localhost:8545',
    },
  },
}
// wss://ropsten.infura.io/ws
const drizzleStore = generateStore(options)
const drizzle = new Drizzle(options, drizzleStore)
const Provider = ({ children }) => {
  return <Context.Provider drizzle={drizzle}>{children}</Context.Provider>
}

export default Provider
