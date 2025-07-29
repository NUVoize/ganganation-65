import React from 'react';
import { WhiskeyProduct } from '../types/whiskey';
import { useSKUScanner } from '../hooks/useSKUScanner';
import { SKUSearchInput } from './SKUSearchInput';
import { CameraScanner } from './CameraScanner';
import { SearchResult } from './SearchResult';
import { NotFoundMessage } from './NotFoundMessage';
import { AvailableSKUs } from './AvailableSKUs';

interface SKUScannerProps {
  onWhiskeyFound: (whiskey: WhiskeyProduct) => void;
}

export const SKUScanner: React.FC<SKUScannerProps> = ({ onWhiskeyFound }) => {
  const {
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
  } = useSKUScanner();

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-2xl mx-auto px-4 pb-12">
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl text-smokey mb-4">Menu Scanner</h1>
          <p className="text-muted-foreground">
            Enter a product SKU to quickly find whiskey details and pricing
          </p>
        </div>

        <SKUSearchInput
          skuInput={skuInput}
          setSkuInput={setSkuInput}
          handleSearch={handleSearch}
          clearSearch={clearSearch}
          startCamera={startCamera}
          isScanning={isScanning}
        />

        <CameraScanner
          showCamera={showCamera}
          stopCamera={stopCamera}
          simulateScan={simulateScan}
          videoRef={videoRef}
        />

        <SearchResult
          searchResult={searchResult}
          onWhiskeyFound={onWhiskeyFound}
        />

        <NotFoundMessage
          notFound={notFound}
          skuInput={skuInput}
        />

        <AvailableSKUs setSkuInput={setSkuInput} />
      </div>
    </div>
  );
};