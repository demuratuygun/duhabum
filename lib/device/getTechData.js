'use client';

const getTechData = async () => {

      try {
        // A. Donanım Verileri
        const hardware = {
          cores: navigator.hardwareConcurrency || 2,
          memory: navigator.deviceMemory || 2,
          gpu: (() => {
            try {
              const canvas = document.createElement('canvas');
              const gl = canvas.getContext('webgl');
              return gl.getParameter(gl.RENDERER);
            } catch { return 'unknown'; }
          })()
        };

        // B. Ekran Teknolojisi (Medya Sorguları)
        const screen = {
          colorDepth: window.screen.colorDepth,
          isHDR: window.matchMedia('(dynamic-range: high)').matches,
          colorGamut: window.matchMedia('(color-gamut: p3)').matches ? 'P3' : 'sRGB',
          pixelRatio: window.devicePixelRatio
        };

        // C. Ağ Kalitesi
        const connection = navigator.connection ? {
          type: navigator.connection.effectiveType,
          downlink: navigator.connection.downlink,
          rtt: navigator.connection.rtt
        } : null;

        // D. Cihaz Sınıflandırma
        const isMobile = /Mobi|Android/i.test(navigator.userAgent);
        const isAppleGPU = hardware.gpu.includes('Apple');
        const isHighEndGPU = /Adreno7\d{2}|Mali-G7/.test(hardware.gpu);

        // E. Segmentasyon Mantığı
        const techTier = 
          (isAppleGPU && screen.pixelRatio >= 2) || 
          (isHighEndGPU && screen.isHDR) ? 'Flagship' :
          hardware.cores >= 4 && hardware.memory >= 4 ? 'Premium' :
          hardware.cores >= 2 ? 'Mid' : 'Basic';

        const networkTier = connection ? 
          connection.downlink > 5 && connection.rtt < 100 ? '5G' :
          connection.downlink > 2 ? '4G' : '3G' : 'Unknown';

        // F. Sonuçlar
        return ({
          loading: false,
          techTier,
          networkTier,
          display: {
            quality: screen.isHDR ? 'HDR' : screen.colorGamut,
            colorDepth: `${screen.colorDepth}bit`
          },
          recommendation: getRecommendations(techTier, networkTier)
        });

      } catch (error) {
        return ({ loading: false, error: error.message });
      }
    };



// Öneri Altyapısı
const getRecommendations = (techTier, networkTier) => {
  const matrix = {
    Flagship: {
      '5G': ['8K Stream', 'AAA Oyunlar', 'AR Deneyimleri'],
      '4G': ['4K Stream', 'Premium Uygulamalar'],
      default: ['HD İçerik']
    },
    Premium: {
      '5G': ['4K Stream', 'Çoklu Görev'],
      '4G': ['HD Stream', 'Ofis Paketi'],
      default: ['Standart Paket']
    },
    Mid: {
      '4G': ['Web Uygulamalar', 'E-Ticaret'],
      default: ['Temel Servisler']
    },
    Basic: {
      default: ['Hafif İçerik', 'Metin Tabanlı']
    }
  };

  return matrix[techTier]?.[networkTier] || matrix[techTier]?.default;
};

export default getTechData;