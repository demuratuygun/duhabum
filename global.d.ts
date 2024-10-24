interface Fbq {
    (...args: any[]): void;
    callMethod?: (...args: any[]) => void;
    queue?: any[];
    loaded?: boolean;
    version?: string;
  }
  
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }