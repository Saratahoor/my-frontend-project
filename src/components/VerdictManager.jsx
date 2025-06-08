import { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import ABI from "../store/abiKey.json";
import toast from "react-hot-toast";
import { apiCloseCase } from "../utils/apiMediator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useLoginData from "../features/Auth/useLoginData";
import { FaCopy } from "react-icons/fa";

// Contract configuration
const CONTRACT_ADDRESS = import.meta.env.VITE_PINATA_CONTRACT_ADDRESS;
const CONTRACT_ABI = [
  "function roles(address) view returns (uint8)",
  "function storeVerdict(uint256 caseId, string calldata ipfsHash) external",
  "function getVerdict(uint256 caseId) external view returns (string memory ipfsHash, uint256 timestamp)",
];
const PINATA_JWT = import.meta.env.VITE_PINATA_JWT_TOKEN;

console.log(CONTRACT_ADDRESS);
console.log(PINATA_JWT);

export default function VerdictManager({ caseId, verdictDetails, onClose }) {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  const { data: UserData } = useLoginData();

  // Add close case mutation
  const closeCaseMutation = useMutation({
    mutationFn: ({ mediatorId, caseId }) =>
      apiCloseCase({ mediatorId, caseId }),
    onSuccess: () => {
      toast.success("Case closed successfully");
      queryClient.invalidateQueries(["my-cases"]);
      onClose?.(); // Close the modal if provided
    },
    onError: (error) => {
      toast.error(error.message || "Failed to close case");
    },
  });

  // Get contract instance with signer
  async function getContract() {
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask not found! Please install MetaMask.");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      // Check mediator role
      const address = await signer.getAddress();
      const role = await contract.roles(address);

      // Convert BigInt to Number safely
      const roleValue = Number(role.toString());

      if (roleValue !== 2 && roleValue !== 3) {
        throw new Error("Only mediators can store verdicts");
      }

      return contract;
    } catch (error) {
      console.error("Contract connection error:", error);
      throw new Error("Failed to connect to contract: " + error.message);
    }
  }

  async function uploadToIPFS() {
    try {
      const formData = new FormData();

      // Create verdict metadata
      const verdictData = {
        ...verdictDetails,
        caseId: caseId,
        timestamp: new Date().toISOString(),
        metadata: {
          type: "verdict",
          version: "1.0",
        },
      };

      // Create JSON file for verdict
      const verdictBlob = new Blob([JSON.stringify(verdictData, null, 2)], {
        type: "application/json",
      });
      // formData.append("file", verdictBlob, "verdict.json");

      // Append supporting document if provided
      if (file) {
        formData.append("file", file);
      }

      // Upload to IPFS via Pinata
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: Infinity,
          headers: {
            Authorization: `Bearer ${PINATA_JWT}`,
          },
        }
      );

      if (!res.data?.IpfsHash) {
        throw new Error("Failed to get IPFS hash");
      }

      return res.data.IpfsHash;
    } catch (error) {
      console.error("IPFS Upload Error:", error);
      throw new Error("Failed to upload to IPFS: " + error.message);
    }
  }

  async function handleUploadAndStore() {
    if (!caseId || !verdictDetails) {
      toast.error("Missing case details");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const contract = await getContract();
      const ipfsHash = await uploadToIPFS();
      const caseIdBigInt = BigInt(caseId.replace(/[^0-9]/g, ""));

      // Store verdict on blockchain
      const tx = await contract.storeVerdict(caseIdBigInt, ipfsHash);
      await tx.wait();

      // Verify the stored verdict
      const [storedHash, timestamp] = await contract.getVerdict(caseIdBigInt);
      console.log("Stored verdict verified:", {
        hash: storedHash,
        timestamp: new Date(Number(timestamp.toString()) * 1000).toISOString(),
      });

      // Close the case in backend
      await closeCaseMutation.mutateAsync({
        mediatorId: UserData.linked_id,
        caseId: caseId,
      });

      toast.success("Verdict stored and case closed successfully!");
      setResult(`✅ Verdict stored! IPFS Hash: ${ipfsHash}`);
    } catch (err) {
      console.error("Error:", err);
      toast.error(err.message || "Failed to process verdict");
      setResult("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Hash copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy hash");
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className="p-4">
      {!result ? (
        // Show this section only when verdict is not yet stored
        <>
          <h2 className="text-xl font-semibold mb-4">📝 Store Final Verdict</h2>

          <div className="mb-4">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>

          <button
            onClick={handleUploadAndStore}
            disabled={loading}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Storing Verdict..." : "Store Final Verdict"}
          </button>
        </>
      ) : (
        // Show only the IPFS hash when verdict is stored
        <div className="text-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-green-800 mb-2">
              IPFS Hash
            </h3>
            <div className="flex items-center justify-center gap-2">
              <p className="font-mono text-sm break-all">
                {result.replace("✅ Verdict stored! IPFS Hash: ", "")}
              </p>
              <button
                onClick={() =>
                  handleCopy(
                    result.replace("✅ Verdict stored! IPFS Hash: ", "")
                  )
                }
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                title="Copy to clipboard"
              >
                <FaCopy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
