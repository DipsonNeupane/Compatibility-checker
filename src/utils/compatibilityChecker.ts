import { PCComponents, ValidationResult } from '../types';

export function checkCompatibility(components: PCComponents): ValidationResult {
  const messages: string[] = [];
  let isCompatible = true;

  // Simulate compatibility checks
  if (components.cpu.toLowerCase().includes('amd') && 
      !components.motherboard.toLowerCase().includes('am4') && 
      !components.motherboard.toLowerCase().includes('am5')) {
    messages.push('Warning: AMD CPU may not be compatible with this motherboard');
    isCompatible = false;
  }

  if (components.cpu.toLowerCase().includes('intel') && 
      !components.motherboard.toLowerCase().includes('lga')) {
    messages.push('Warning: Intel CPU may not be compatible with this motherboard');
    isCompatible = false;
  }

  if (!components.ram.toLowerCase().includes('ddr4') && 
      !components.ram.toLowerCase().includes('ddr5')) {
    messages.push('Warning: RAM type not specified or unsupported');
    isCompatible = false;
  }

  if (components.gpu.trim() === '') {
    messages.push('Note: No dedicated GPU specified - ensure CPU has integrated graphics');
  }

  if (messages.length === 0) {
    messages.push('All components appear to be compatible!');
  }

  return { isCompatible, messages };
}