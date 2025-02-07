import React, { useState } from 'react';
import { PCComponents, ValidationResult } from '../types';
import { checkCompatibility } from '../utils/compatibilityChecker';
import { AlertCircle, CheckCircle2, Cpu, HardDrive, Layers, Clapperboard as Motherboard } from 'lucide-react';

export default function PCForm() {
  const [components, setComponents] = useState<PCComponents>({
    cpu: '',
    motherboard: '',
    ram: '',
    gpu: ''
  });

  const [result, setResult] = useState<ValidationResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationResult = checkCompatibility(components);
    setResult(validationResult);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComponents(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Cpu className="w-8 h-8 text-blue-600" />
            PC Component Checker
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Cpu className="w-4 h-4" /> CPU
              </label>
              <input
                type="text"
                name="cpu"
                value={components.cpu}
                onChange={handleChange}
                placeholder="e.g., AMD Ryzen 7 5800X or Intel i7-12700K"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Motherboard className="w-4 h-4" /> Motherboard
              </label>
              <input
                type="text"
                name="motherboard"
                value={components.motherboard}
                onChange={handleChange}
                placeholder="e.g., MSI B550 or ASUS ROG STRIX Z690"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Layers className="w-4 h-4" /> RAM
              </label>
              <input
                type="text"
                name="ram"
                value={components.ram}
                onChange={handleChange}
                placeholder="e.g., 32GB DDR4-3600 or 16GB DDR5-5200"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <HardDrive className="w-4 h-4" /> GPU
              </label>
              <input
                type="text"
                name="gpu"
                value={components.gpu}
                onChange={handleChange}
                placeholder="e.g., NVIDIA RTX 4070 or AMD RX 6800 XT"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Check Compatibility
            </button>
          </form>
        </div>

        {result && (
          <div className={`bg-white rounded-lg shadow-xl p-6 ${result.isCompatible ? 'border-green-500' : 'border-yellow-500'} border-2`}>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              {result.isCompatible ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  <span className="text-green-700">Compatibility Results</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-6 h-6 text-yellow-500" />
                  <span className="text-yellow-700">Compatibility Warnings</span>
                </>
              )}
            </h2>
            <ul className="space-y-2">
              {result.messages.map((message, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-2 ${
                    message.toLowerCase().includes('warning')
                      ? 'text-yellow-700'
                      : message.toLowerCase().includes('note')
                      ? 'text-blue-700'
                      : 'text-green-700'
                  }`}
                >
                  {message.toLowerCase().includes('warning') ? (
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                  ) : message.toLowerCase().includes('note') ? (
                    <AlertCircle className="w-4 h-4 text-blue-500" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  )}
                  {message}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}