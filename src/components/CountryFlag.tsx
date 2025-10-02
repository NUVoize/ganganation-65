import { CSSProperties } from 'react';

// Mapping of country names to ISO 3166-1 alpha-2 codes
const countryCodeMap: Record<string, string> = {
  'Canada': 'CA',
  'United States': 'US',
  'USA': 'US',
  'Netherlands': 'NL',
  'South Africa': 'ZA',
  'India/Afghanistan': 'IN',
  'India': 'IN',
  'Afghanistan': 'AF',
  'Pakistan': 'PK',
  'Jamaica': 'JM',
  'Colombia': 'CO',
  'Mexico': 'MX',
  'Thailand': 'TH',
  'Morocco': 'MA',
  'Lebanon': 'LB',
  'Spain': 'ES',
  'United Kingdom': 'GB',
  'UK': 'GB',
  'Scotland': 'GB',
  'Ireland': 'IE',
  'Japan': 'JP',
  'Australia': 'AU',
  'New Zealand': 'NZ',
  'Israel': 'IL',
  'Switzerland': 'CH',
  'Germany': 'DE',
  'France': 'FR',
  'Italy': 'IT',
  'Portugal': 'PT',
  'Brazil': 'BR',
  'Uruguay': 'UY',
  'Chile': 'CL',
  'Argentina': 'AR',
  'Peru': 'PE',
};

interface CountryFlagProps {
  country: string;
  size?: number;
  className?: string;
  showLabel?: boolean;
}

export const CountryFlag = ({ country, size = 24, className = '', showLabel = true }: CountryFlagProps) => {
  const countryCode = countryCodeMap[country] || 'UN'; // Default to UN flag if not found
  const flagUrl = `https://flagcdn.com/w${size * 2}/${countryCode.toLowerCase()}.png`;
  
  const style: CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <img
        src={flagUrl}
        alt={`${country} flag`}
        style={style}
        className="flex-shrink-0"
        loading="lazy"
        onError={(e) => {
          // Fallback to a default circle if flag fails to load
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const fallback = document.createElement('div');
          fallback.style.cssText = `width: ${size}px; height: ${size}px; border-radius: 50%; background: linear-gradient(135deg, #4ade80 0%, #10b981 100%); border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); flex-shrink: 0;`;
          target.parentElement?.insertBefore(fallback, target);
        }}
      />
      {showLabel && <span className="truncate">{country}</span>}
    </div>
  );
};
