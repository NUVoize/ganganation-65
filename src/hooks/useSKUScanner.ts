import { useState, useRef, useEffect } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import { whiskeyCollection } from '../data';
import { WhiskeyProduct } from '../types/whiskey';

export const useSKUScanner = () => {
  const [skuInput, setSkuInput] = useState('');
  const [searchResult, setSearchResult] = useState<WhiskeyProduct | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReader = useRef<BrowserMultiFormatReader | null>(null);

  const handleSearch = () => {
    if (!skuInput.trim()) return;

    const whiskey = whiskeyCollection.find(w => 
      w.sku.toLowerCase() === skuInput.trim().toLowerCase()
    );

    if (whiskey) {
      setSearchResult(whiskey);
      setNotFound(false);
    } else {
      setSearchResult(null);
      setNotFound(true);
    }
  };

  const clearSearch = () => {
    setSkuInput('');
    setSearchResult(null);
    setNotFound(false);
  };

  const startCamera = async () => {
    try {
      setIsScanning(true);
      setShowCamera(true);
      
      // Initialize the barcode reader
      if (!codeReader.current) {
        codeReader.current = new BrowserMultiFormatReader();
      }
      
      // Start scanning
      await codeReader.current.decodeFromVideoDevice(
        undefined, // Use default camera
        videoRef.current!,
        (result, error) => {
          if (result) {
            const scannedText = result.getText();
            console.log('Barcode detected:', scannedText);
            
            // Set the SKU input and search
            setSkuInput(scannedText);
            stopCamera();
            
            // Search for the whiskey
            setTimeout(() => {
              const whiskey = whiskeyCollection.find(w => 
                w.sku.toLowerCase() === scannedText.toLowerCase()
              );
              if (whiskey) {
                setSearchResult(whiskey);
                setNotFound(false);
              } else {
                setSearchResult(null);
                setNotFound(true);
              }
            }, 300);
          }
          
          if (error && error.name !== 'NotFoundException') {
            console.error('Barcode scanning error:', error);
          }
        }
      );
      
      setIsScanning(false);
    } catch (error) {
      console.error('Camera access denied:', error);
      alert('Camera access is required for barcode scanning. Please allow camera permission and try again.');
      setIsScanning(false);
      setShowCamera(false);
    }
  };

  const stopCamera = () => {
    if (codeReader.current) {
      codeReader.current.reset();
    }
    setShowCamera(false);
    setIsScanning(false);
  };

  const simulateScan = () => {
    const randomSku = whiskeyCollection[Math.floor(Math.random() * whiskeyCollection.length)].sku;
    setSkuInput(randomSku);
    stopCamera();
    
    setTimeout(() => {
      const whiskey = whiskeyCollection.find(w => 
        w.sku.toLowerCase() === randomSku.toLowerCase()
      );
      if (whiskey) {
        setSearchResult(whiskey);
        setNotFound(false);
      }
    }, 500);
  };

  return {
    skuInput,
    setSkuInput,
    searchResult,
    notFound,
    showCamera,
    isScanning,
    videoRef,
    handleSearch,
    clearSearch,
    startCamera,
    stopCamera,
    simulateScan
  };
};