import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { NewOrder } from './routes/NewOrder';
import { MantineProvider, Global } from '@mantine/core';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
  chain
} from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'


const { chains, provider, webSocketProvider } = configureChains([chain.polygonMumbai], [
  alchemyProvider({ apiKey: '086ZUsuh8TyfsiUGV20zeiigLhmDOFCF' }),
  publicProvider()
])

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains })
  ],
  provider,
  webSocketProvider,
})

function GlobalStyles() {
  return (
    <Global
      styles={(theme) => ({
        body: {
          backgroundImage: "url('background4.jpg')",
          backgroundSize: "cover"
        }
      })}
    />
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  
  <WagmiConfig client={client}>
    <MantineProvider theme={{colorScheme: 'light'}} withGlobalStyles withNormalizeCSS>
      <GlobalStyles />
      <BrowserRouter basename='/'>

  <Routes>
    <Route path="/" element={<App />} />
    <Route path='/newOrder' element={<NewOrder />} />
  </Routes>
  </BrowserRouter>
    </MantineProvider>
  </WagmiConfig>

);

