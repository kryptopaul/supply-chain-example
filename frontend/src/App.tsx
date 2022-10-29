import { useState, useEffect } from 'react';
import './App.css';
import { Container, Title, Grid, Table, BackgroundImage } from '@mantine/core';
import { HeaderResponsive } from './HeaderResponsive';
import { useContractReads } from 'wagmi'
import config from './config.json'

    // RANDOM ADDRESSES!!
    // Tesco: 0xaA1ff6275788BA755bECEeb1161e24c3164072c9
    // Waitrose: 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
    // Sainsbury's: 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db
    // Morrisons: 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB


function App() {


  // Well it seems that Mantine overrides the default css (?)


  const supplyChainContract = {
    address: config.contract,
    abi: config.abi,
    chainID: 80001
  }

  const {} = useContractReads({
    contracts: [
      {
        ...supplyChainContract,
        functionName: 'getOrderByStoreName',
        args: ['Tesco'],
      },
      {
        ...supplyChainContract,
        functionName: 'getOrderByStoreName',
        args: ['Waitrose'],
      },
      {
        ...supplyChainContract,
        functionName: 'getOrderByStoreName',
        args: ["Sainsbury's"],
      },
      {
        ...supplyChainContract,
        functionName: 'getOrderByStoreName',
        args: ['Morrisons'],
      }
    ],
    onSuccess: (data) => {
      // Change any to something else later
      const tesco:any = data[0]
      const waitrose:any = data[1]
      const sainsburys:any = data[2]
      const morrisons:any = data[3]

      console.log("tesco", tesco)
      console.log("waitrose", waitrose)
      console.log("sainsburys", sainsburys)
      console.log("morrisons", morrisons)

      // Prepare Tesco data and update State
      for (let i = 0; i < tesco.length; i++) {   
        const tescoOrder:Order = {
          date: new Date(tesco[i][0] * 1000).toLocaleString(),
          name: tesco[i][1],
          priceGBP: `£${parseInt(tesco[i][2])}`,
          status: tesco[i][3]
        }
        setTescoOrders(tescoOrders => [...tescoOrders, tescoOrder])
      }

      // Prepare Waitrose data and update State
      for (let i = 0; i < waitrose.length; i++) {
        const waitroseOrder:Order = {
          date: new Date(waitrose[i][0] * 1000).toLocaleString(),
          name: waitrose[i][1],
          priceGBP: `£${parseInt(waitrose[i][2])}`,
          status: waitrose[i][3]
        }
        setWaitroseOrders(waitroseOrders => [...waitroseOrders, waitroseOrder])
      }

      // Prepare Sainsbury's data and update State
      for (let i = 0; i < sainsburys.length; i++) {
        const sainsburysOrder:Order = {
          date: new Date(sainsburys[i][0] * 1000).toLocaleString(),
          name: sainsburys[i][1],
          priceGBP: `£${parseInt(sainsburys[i][2])}`,
          status: sainsburys[i][3]
        }
        setSainsburysOrders(sainsburysOrders => [...sainsburysOrders, sainsburysOrder])
      }

      // Prepare Morrisons data and update State
      for (let i = 0; i < morrisons.length; i++) {
        const morrisonsOrder:Order = {
          date: new Date(morrisons[i][0] * 1000).toLocaleString(),
          name: morrisons[i][1],
          priceGBP: `£${parseInt(morrisons[i][2])}`,
          status: morrisons[i][3]
        }
        setMorrisonsOrders(morrisonsOrders => [...morrisonsOrders, morrisonsOrder])
      }

      

    },
  })
  
  const [tescoOrders, setTescoOrders] = useState<Order[]>([])
  const [waitroseOrders, setWaitroseOrders] = useState<Order[]>([])
  const [sainsburysOrders, setSainsburysOrders] = useState<Order[]>([])
  const [morrisonsOrders, setMorrisonsOrders] = useState<Order[]>([])

  // format tesco orders for table
  const tescoTableData = tescoOrders.map((order) => (
    <tr key={order.date}>
      <td>{order.date}</td>
      <td>{order.name}</td>
      <td>{order.priceGBP}</td>
      <td>{order.status}</td>
    </tr>
  ))

  // format waitrose orders for table
  const waitroseTableData = waitroseOrders.map((order) => (
    <tr key={order.date}>
      <td>{order.date}</td>
      <td>{order.name}</td>
      <td>{order.priceGBP}</td>
      <td>{order.status}</td>
    </tr>
  ))

  // format sainsburys orders for table
  const sainsburysTableData = sainsburysOrders.map((order) => (
    <tr key={order.date}>
      <td>{order.date}</td>
      <td>{order.name}</td>
      <td>{order.priceGBP}</td>
      <td>{order.status}</td>
    </tr>
  ))

  // format morrisons orders for table
  const morrisonsTableData = morrisonsOrders.map((order) => (
    <tr key={order.date}>
      <td>{order.date}</td>
      <td>{order.name}</td>
      <td>{order.priceGBP}</td>
      <td>{order.status}</td>
    </tr>
  ))


  return (
    
    <>
    <HeaderResponsive links={[{link: "/",label: "Home",}, {link: '/newOrder', label: 'New Order'}]} />
    <Container size={'lg'}>
      <div className='Dapp'>
      <Title>Welcome to Paul's Supply Chain™ order tracking system!</Title>
      
      <Title order={2}>Current orders:</Title>
      <br/>
      <Grid>
      <Grid.Col span={6}>
        <Title order={3}>Tesco</Title>
        <Table highlightOnHover>
        <thead>
          <tr>
            <th>Time</th>
            <th>Name</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tescoTableData}
        </tbody>
        </Table>
      </Grid.Col>
      <Grid.Col span={6}>
        <Title order={3}>Waitrose</Title>
        <Table highlightOnHover>
        <thead>
          <tr>
            <th>Time</th>
            <th>Name</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {waitroseTableData}
          </tbody>
        </Table>
      </Grid.Col>
      <Grid.Col span={6}>
        <Title order={3}>Sainsbury's</Title>
        <Table highlightOnHover>
        <thead>
          <tr>
            <th>Time</th>
            <th>Name</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sainsburysTableData}
          </tbody>
        </Table>
      </Grid.Col>
      <Grid.Col span={6}>
        <Title order={3}>Morrisons</Title>
        <Table highlightOnHover>
        <thead>
          <tr>
            <th>Time</th>
            <th>Name</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {morrisonsTableData}
          </tbody>
        </Table>
      </Grid.Col>

      </Grid>
      </div>
    </Container>
    </>
    
  )
}

export default App;
