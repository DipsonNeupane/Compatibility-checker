export interface PCComponents {
  cpu: string;
  motherboard: string;
  ram: string;
  gpu: string;
}

export interface ValidationResult {
  isCompatible: boolean;
  messages: string[];
}