import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Camera, X } from 'lucide-react';

interface CameraScannerProps {
  showCamera: boolean;
  stopCamera: () => void;
  simulateScan: () => void;
  videoRef: React.RefObject<HTMLVideoElement>;
}

export const CameraScanner: React.FC<CameraScannerProps> = ({
  showCamera,
  stopCamera,
  simulateScan,
  videoRef
}) => {
  if (!showCamera) return null;

  return (
    <Card className="glass-card mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-serif text-xl text-smokey flex items-center">
            <Camera className="h-5 w-5 mr-2" />
            Camera Scanner
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={stopCamera}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-64 bg-black rounded-lg"
          />
          <div className="absolute inset-0 border-2 border-primary rounded-lg pointer-events-none">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-12 border-2 border-primary rounded-lg">
              <div className="text-center text-primary text-sm mt-14">
                Position barcode here
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-primary font-medium mb-2">
            Scanning for barcodes...
          </p>
          <p className="text-xs text-muted-foreground">
            Point camera at barcode to scan SKU automatically
          </p>
          <Button 
            onClick={simulateScan}
            variant="outline"
            size="sm"
            className="mt-3"
          >
            Try Demo Scan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};