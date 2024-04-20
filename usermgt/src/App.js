import { useState } from 'react';
import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb";
import { ethers } from 'ethers';

const clientId = "8558984b8d488b91ae90e5eaae654889"; // Replace with your actual client ID
const contractAddress = '0x251964C9abEcF2E55e9294ec4891A1286a4B9d9c';

const client = createThirdwebClient({ clientId });
const contract = getContract({ 
  client, 
  chain: defineChain(undefined), // Assuming you're on a supported chain
  address: contractAddress
});

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationResult, setVerificationResult] = useState('');

  // (Assuming you have logic to handle connected wallet)
  const connectedWallet = /* Your logic to get connected wallet */;

  const handleRegisterUser = async () => {
    // Check if wallet is connected (optional, based on your logic)
    // ...

    try {
      // Use prepareContractCall and sendTransaction from thirdweb
      const tx = await prepareContractCall({
        contract,
        method: resolveMethod("registerUser"),
        params: [ethers.utils.keccak256(phoneNumber)],
      });
      const { transactionHash } = await sendTransaction({
        transaction: tx,
        account: connectedWallet, // Assuming you have connected wallet logic
      });
      console.log('User registered successfully!', transactionHash);
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };

  const handleVerifyWalletOwner = async () => {
    // Check if wallet is connected (optional, based on your logic)
    // ...

    try {
      // Use prepareContractCall and sendTransaction from thirdweb
      const tx = await prepareContractCall({
        contract,
        method: resolveMethod("loginUser"),
        params: [], // loginUser might not require any parameters
      });
      const { transactionHash } = await sendTransaction({
        transaction: tx,
        account: connectedWallet, // Assuming you have connected wallet logic
      });
      console.log('Verification successful!', transactionHash);
      setVerificationResult('Verification successful');
    } catch (error) {
      console.error('Verification failed:', error.message);
      setVerificationResult('Verification failed');
    }
  };

  return (
    <main className="main">
      <div className="container">
        <div className="header">
          <h1 className="title">
            Welcome to{" "}
            <span className="gradient-text-0">
              <a
                href="https://thirdweb.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fedhadex
              </a>
            </span>
          </h1>
        </div>

        <div className="connect">
          {/* Your wallet connection component */}
        </div>

        <div className="form">
          <input
            type="text"
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <div className="verify">
          <button onClick={handleVerifyWalletOwner}>Verify Wallet Ownership</button>
                       <p>{verificationResult}</p>
          </div>
          <button onClick={handleRegisterUser}>Register User</button>
        </div>
        

      </div>
    </main>
  );
}
