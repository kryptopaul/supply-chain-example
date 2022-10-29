import { useState, useEffect } from 'react';
import '../App.css';
import { Container, Title, Grid, Table, BackgroundImage, Button, TextInput, Input, NumberInput, Modal, Loader} from '@mantine/core';
import { HeaderResponsive } from '../HeaderResponsive';
import configFile from '../config.json'
import { useAccount, useConnect, useEnsName, useContractReads, useDisconnect, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { useInputState } from '@mantine/hooks';
import { BigNumber } from 'ethers';





export function NewOrder() {

    const { address, isConnected } = useAccount()
    const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
    const { data: ensName } = useEnsName({ address })
    const { disconnect } = useDisconnect()

    function LoginPanel() {
        return (
            <div>
                <Title>Please login!</Title>
                <br/>
                {connectors.map((connector) => (
            <Button
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => connect({ connector })}
            >
              {connector.name}
              {!connector.ready && ' (unsupported)'}
              {isLoading &&
                connector.id === pendingConnector?.id &&
                ' (connecting)'}
            </Button>
          ))}
            </div>
        )
    }

    

    

    function OrderPanel() {

        
        
        const [orderName, setOrderName] = useInputState("");
        const [orderPrice, setOrderPrice] = useInputState(0);

        const { config } = usePrepareContractWrite({
            address: configFile.contract,
            // idk why import from json throws an error :/
            abi: [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"uint256","name":"_priceGBP","type":"uint256"}],"name":"addNewOrder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"companies","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"}],"name":"getOrderByStoreName","outputs":[{"components":[{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"priceGBP","type":"uint256"},{"internalType":"string","name":"status","type":"string"}],"internalType":"struct SupplyChainGreenwich.Order[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"orders","outputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"priceGBP","type":"uint256"},{"internalType":"string","name":"status","type":"string"}],"stateMutability":"view","type":"function"}],
            functionName: 'addNewOrder',
            args: [orderName, typeof orderPrice == "number" ? BigNumber.from(orderPrice) : BigNumber.from(0)],
            chainId: 80001,
        })

        const {data, write} = useContractWrite({...config,
            onSuccess: (data) => {
                console.log("Success", data)
                setIsModalOpened(true)
            }})

        
        const {} = useWaitForTransaction({
            chainId: 5,
            hash: data?.hash,
            onSuccess(data) {
                setCurrentTxStatus("Success")
            },
            onError(error) {
                alert("Error: " + error);
                }
            })
            


        const [isModalOpened, setIsModalOpened] = useState(false);
        const [currentTxStatus, setCurrentTxStatus] = useState("Pending");

        function ProgressModal() {


            return (
                <>
                <Modal
                    title={currentTxStatus === "Pending" ? "Submitting order..." : "Order submitted!"}
                    opened={isModalOpened}
                    onClose={() => {setIsModalOpened(false)}}
                    closeOnClickOutside={false}
                    >
                        {
                        currentTxStatus === "Pending" 
                        ? 
                        <Loader size="lg" /> 
                        : 
                        <>
                            <Title order={2}>✅ Order submitted successfully!</Title>
                            <Button onClick={() => {setIsModalOpened(false)}}>Close</Button>
                        </>
                        }

                </Modal>
                </>
            )

        }

        return (
            <div>
                <ProgressModal />
                <Title>Welcome back, Tesco!</Title>
                <Title order={2}>Place new order:</Title>
                <br/>
                <TextInput
                    placeholder="Enter order contents"
                    label="Order content"
                    withAsterisk
                    
                    onInput={setOrderName}

                    />
                <br/>
                <NumberInput
                    placeholder="Enter order price"
                    label="Order price"
                    withAsterisk
                    
                    onChange={setOrderPrice}

                    />
                <br/>
                <Button style={{marginRight: '10px'}} onClick={() => write?.()} >Place order</Button>
                <Button style={{marginLeft: '10px'}} onClick={() => disconnect()}>Disconnect</Button>
            </div>
        )
    }

    return (
        <>
            <HeaderResponsive links={[{link: "/",label: "Home",}, {link: '/newOrder', label: 'New Order'}]} />

        <Container>
        <div className="Dapp">
            {isConnected ? <OrderPanel /> : <LoginPanel />}
        </div>
        </Container>
        </>

    )

}