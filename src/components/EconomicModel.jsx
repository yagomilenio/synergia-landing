import { useState, useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import { useLanguage, TRANSLATIONS } from '../utils/i18n'
import './EconomicModel.css'

// Large, veridical database of real current and older CPUs with both Physical Cores and Logical Threads
const CPU_DATABASE = [
  // Ryzen 9000 Series
  { name: 'AMD Ryzen 9 9950X', cores: 16, threads: 32, baseGhz: 4.3 },
  { name: 'AMD Ryzen 9 9900X', cores: 12, threads: 24, baseGhz: 4.4 },
  { name: 'AMD Ryzen 7 9700X', cores: 8, threads: 16, baseGhz: 3.8 },
  { name: 'AMD Ryzen 5 9600X', cores: 6, threads: 12, baseGhz: 3.9 },

  // Ryzen 8000 Series
  { name: 'AMD Ryzen 7 8700G', cores: 8, threads: 16, baseGhz: 4.2 },
  { name: 'AMD Ryzen 5 8600G', cores: 6, threads: 12, baseGhz: 4.35 },
  { name: 'AMD Ryzen 5 8500G', cores: 6, threads: 12, baseGhz: 3.5 },

  // Ryzen 7000 Series
  { name: 'AMD Ryzen 9 7950X3D', cores: 16, threads: 32, baseGhz: 4.2 },
  { name: 'AMD Ryzen 9 7950X', cores: 16, threads: 32, baseGhz: 4.5 },
  { name: 'AMD Ryzen 9 7900X3D', cores: 12, threads: 24, baseGhz: 4.4 },
  { name: 'AMD Ryzen 9 7900X', cores: 12, threads: 24, baseGhz: 4.7 },
  { name: 'AMD Ryzen 9 7900', cores: 12, threads: 24, baseGhz: 3.7 },
  { name: 'AMD Ryzen 7 7800X3D', cores: 8, threads: 16, baseGhz: 4.2 },
  { name: 'AMD Ryzen 7 7700X', cores: 8, threads: 16, baseGhz: 4.5 },
  { name: 'AMD Ryzen 7 7700', cores: 8, threads: 16, baseGhz: 3.8 },
  { name: 'AMD Ryzen 5 7600X', cores: 6, threads: 12, baseGhz: 4.7 },
  { name: 'AMD Ryzen 5 7600', cores: 6, threads: 12, baseGhz: 3.8 },
  { name: 'AMD Ryzen 5 7500F', cores: 6, threads: 12, baseGhz: 3.7 },

  // Ryzen 5000 Series
  { name: 'AMD Ryzen 9 5950X', cores: 16, threads: 32, baseGhz: 3.4 },
  { name: 'AMD Ryzen 9 5900X', cores: 12, threads: 24, baseGhz: 3.7 },
  { name: 'AMD Ryzen 7 5800X3D', cores: 8, threads: 16, baseGhz: 3.4 },
  { name: 'AMD Ryzen 7 5800X', cores: 8, threads: 16, baseGhz: 3.8 },
  { name: 'AMD Ryzen 7 5700X3D', cores: 8, threads: 16, baseGhz: 3.0 },
  { name: 'AMD Ryzen 7 5700X', cores: 8, threads: 16, baseGhz: 3.4 },
  { name: 'AMD Ryzen 7 5700G', cores: 8, threads: 16, baseGhz: 3.8 },
  { name: 'AMD Ryzen 5 5600X', cores: 6, threads: 12, baseGhz: 3.7 },
  { name: 'AMD Ryzen 5 5600G', cores: 6, threads: 12, baseGhz: 3.9 },
  { name: 'AMD Ryzen 5 5600', cores: 6, threads: 12, baseGhz: 3.5 },
  { name: 'AMD Ryzen 5 5500', cores: 6, threads: 12, baseGhz: 3.6 },

  // Ryzen 4000 Series
  { name: 'AMD Ryzen 5 4600G', cores: 6, threads: 12, baseGhz: 3.7 },
  { name: 'AMD Ryzen 5 4500', cores: 6, threads: 12, baseGhz: 3.6 },
  { name: 'AMD Ryzen 3 4100', cores: 4, threads: 8, baseGhz: 3.8 },

  // Ryzen 3000 Series
  { name: 'AMD Ryzen 9 3950X', cores: 16, threads: 32, baseGhz: 3.5 },
  { name: 'AMD Ryzen 9 3900X', cores: 12, threads: 24, baseGhz: 3.8 },
  { name: 'AMD Ryzen 7 3800X', cores: 8, threads: 16, baseGhz: 3.9 },
  { name: 'AMD Ryzen 7 3700X', cores: 8, threads: 16, baseGhz: 3.6 },
  { name: 'AMD Ryzen 5 3600XT', cores: 6, threads: 12, baseGhz: 3.8 },
  { name: 'AMD Ryzen 5 3600X', cores: 6, threads: 12, baseGhz: 3.8 },
  { name: 'AMD Ryzen 5 3600', cores: 6, threads: 12, baseGhz: 3.6 },
  { name: 'AMD Ryzen 5 3500X', cores: 6, threads: 6, baseGhz: 3.6 },
  { name: 'AMD Ryzen 5 3400G', cores: 4, threads: 8, baseGhz: 3.7 },
  { name: 'AMD Ryzen 3 3300X', cores: 4, threads: 8, baseGhz: 3.8 },
  { name: 'AMD Ryzen 3 3100', cores: 4, threads: 8, baseGhz: 3.6 },

  // Ryzen 2000 Series
  { name: 'AMD Ryzen 7 2700X', cores: 8, threads: 16, baseGhz: 3.7 },
  { name: 'AMD Ryzen 7 2700', cores: 8, threads: 16, baseGhz: 3.2 },
  { name: 'AMD Ryzen 5 2600X', cores: 6, threads: 12, baseGhz: 3.6 },
  { name: 'AMD Ryzen 5 2600', cores: 6, threads: 12, baseGhz: 3.4 },
  { name: 'AMD Ryzen 5 2400G', cores: 4, threads: 8, baseGhz: 3.6 },
  { name: 'AMD Ryzen 3 2200G', cores: 4, threads: 4, baseGhz: 3.5 },

  // Ryzen 1000 Series
  { name: 'AMD Ryzen 7 1800X', cores: 8, threads: 16, baseGhz: 3.6 },
  { name: 'AMD Ryzen 7 1700X', cores: 8, threads: 16, baseGhz: 3.4 },
  { name: 'AMD Ryzen 7 1700', cores: 8, threads: 16, baseGhz: 3.0 },
  { name: 'AMD Ryzen 5 1600X', cores: 6, threads: 12, baseGhz: 3.6 },
  { name: 'AMD Ryzen 5 1600', cores: 6, threads: 12, baseGhz: 3.2 },
  { name: 'AMD Ryzen 5 1500X', cores: 4, threads: 8, baseGhz: 3.5 },
  { name: 'AMD Ryzen 5 1400', cores: 4, threads: 8, baseGhz: 3.2 },
  { name: 'AMD Ryzen 3 1300X', cores: 4, threads: 4, baseGhz: 3.5 },
  { name: 'AMD Ryzen 3 1200', cores: 4, threads: 4, baseGhz: 3.1 },

  // Ryzen Threadripper Series
  { name: 'AMD Ryzen Threadripper PRO 7995WX', cores: 96, threads: 192, baseGhz: 2.5 },
  { name: 'AMD Ryzen Threadripper PRO 7980X', cores: 64, threads: 128, baseGhz: 3.2 },
  { name: 'AMD Ryzen Threadripper PRO 7975WX', cores: 32, threads: 64, baseGhz: 4.0 },
  { name: 'AMD Ryzen Threadripper PRO 7965WX', cores: 24, threads: 48, baseGhz: 4.2 },
  { name: 'AMD Ryzen Threadripper PRO 5995WX', cores: 64, threads: 128, baseGhz: 2.7 },
  { name: 'AMD Ryzen Threadripper PRO 5975WX', cores: 32, threads: 64, baseGhz: 3.6 },
  { name: 'AMD Ryzen Threadripper 3990X', cores: 64, threads: 128, baseGhz: 2.9 },
  { name: 'AMD Ryzen Threadripper 3970X', cores: 32, threads: 64, baseGhz: 3.7 },
  { name: 'AMD Ryzen Threadripper 3960X', cores: 24, threads: 48, baseGhz: 3.8 },
  { name: 'AMD Ryzen Threadripper 2990WX', cores: 32, threads: 64, baseGhz: 3.0 },
  { name: 'AMD Ryzen Threadripper 2950X', cores: 16, threads: 32, baseGhz: 3.5 },
  { name: 'AMD Ryzen Threadripper 1950X', cores: 16, threads: 32, baseGhz: 3.4 },

  // Intel 14th Gen
  { name: 'Intel Core i9-14900KS', cores: 24, threads: 32, baseGhz: 3.2 },
  { name: 'Intel Core i9-14900K', cores: 24, threads: 32, baseGhz: 3.2 },
  { name: 'Intel Core i7-14700K', cores: 20, threads: 28, baseGhz: 3.4 },
  { name: 'Intel Core i5-14600K', cores: 14, threads: 20, baseGhz: 3.5 },
  { name: 'Intel Core i5-14400', cores: 10, threads: 16, baseGhz: 2.5 },

  // Intel 13th Gen
  { name: 'Intel Core i9-13900KS', cores: 24, threads: 32, baseGhz: 3.2 },
  { name: 'Intel Core i9-13900K', cores: 24, threads: 32, baseGhz: 3.0 },
  { name: 'Intel Core i7-13700K', cores: 16, threads: 24, baseGhz: 3.4 },
  { name: 'Intel Core i5-13600K', cores: 14, threads: 20, baseGhz: 3.5 },
  { name: 'Intel Core i5-13400', cores: 10, threads: 16, baseGhz: 2.5 },

  // Intel 12th Gen
  { name: 'Intel Core i9-12900K', cores: 16, threads: 24, baseGhz: 3.2 },
  { name: 'Intel Core i7-12700K', cores: 12, threads: 20, baseGhz: 3.6 },
  { name: 'Intel Core i5-12600K', cores: 10, threads: 16, baseGhz: 3.7 },
  { name: 'Intel Core i5-12400', cores: 6, threads: 12, baseGhz: 2.5 },

  // Intel Core Ultra (Series 1 & 2)
  { name: 'Intel Core Ultra 9 285K', cores: 24, threads: 24, baseGhz: 3.7 },
  { name: 'Intel Core Ultra 7 265K', cores: 20, threads: 20, baseGhz: 3.9 },
  { name: 'Intel Core Ultra 5 245K', cores: 14, threads: 14, baseGhz: 4.2 },
  { name: 'Intel Core Ultra 9 185H', cores: 16, threads: 22, baseGhz: 2.3 },
  { name: 'Intel Core Ultra 7 155H', cores: 16, threads: 22, baseGhz: 1.4 },

  // Legacy Intel Core
  { name: 'Intel Core i9-11900K', cores: 8, threads: 16, baseGhz: 3.5 },
  { name: 'Intel Core i7-10700K', cores: 8, threads: 16, baseGhz: 3.8 },
  { name: 'Intel Core i7-9700K', cores: 8, threads: 8, baseGhz: 3.6 },
  { name: 'Intel Core i7-8700K', cores: 6, threads: 12, baseGhz: 3.7 },
  { name: 'Intel Core i7-7700K', cores: 4, threads: 8, baseGhz: 4.2 },
  { name: 'Intel Core i5-4690K', cores: 4, threads: 4, baseGhz: 3.5 },
  { name: 'Intel Core 2 Quad Q6600', cores: 4, threads: 4, baseGhz: 2.4 },

  // Apple Silicon (M-series have threads = physical cores)
  { name: 'Apple M3 Max', cores: 16, threads: 16, baseGhz: 4.05 },
  { name: 'Apple M3 Pro', cores: 12, threads: 12, baseGhz: 4.05 },
  { name: 'Apple M3', cores: 8, threads: 8, baseGhz: 4.05 },
  { name: 'Apple M2 Ultra', cores: 24, threads: 24, baseGhz: 3.49 },
  { name: 'Apple M2 Max', cores: 12, threads: 12, baseGhz: 3.49 },
  { name: 'Apple M2 Pro', cores: 10, threads: 10, baseGhz: 3.49 },
  { name: 'Apple M2', cores: 8, threads: 8, baseGhz: 3.49 },
  { name: 'Apple M1 Ultra', cores: 20, threads: 20, baseGhz: 3.2 },
  { name: 'Apple M1 Max', cores: 10, threads: 10, baseGhz: 3.2 },
  { name: 'Apple M1 Pro', cores: 8, threads: 8, baseGhz: 3.2 },
  { name: 'Apple M1', cores: 8, threads: 8, baseGhz: 3.2 },

  // Server
  { name: 'Intel Xeon Platinum 8480+', cores: 56, threads: 112, baseGhz: 2.0 },
  { name: 'AMD EPYC 9654', cores: 96, threads: 192, baseGhz: 2.4 }
];

// Large, veridical database of real current and older GPUs
const GPU_DATABASE = [
  // NVIDIA RTX 50 Series
  { name: 'NVIDIA RTX 5090', tdp: 600 },
  { name: 'NVIDIA RTX 5080', tdp: 400 },
  { name: 'NVIDIA RTX 5070', tdp: 250 },
  { name: 'NVIDIA RTX 5060', tdp: 170 },

  // NVIDIA RTX 40 Series
  { name: 'NVIDIA RTX 4090', tdp: 450 },
  { name: 'NVIDIA RTX 4080 Super', tdp: 320 },
  { name: 'NVIDIA RTX 4080', tdp: 320 },
  { name: 'NVIDIA RTX 4070 Ti Super', tdp: 285 },
  { name: 'NVIDIA RTX 4070 Ti', tdp: 285 },
  { name: 'NVIDIA RTX 4070 Super', tdp: 220 },
  { name: 'NVIDIA RTX 4070', tdp: 200 },
  { name: 'NVIDIA RTX 4060 Ti 16GB', tdp: 165 },
  { name: 'NVIDIA RTX 4060 Ti 8GB', tdp: 160 },
  { name: 'NVIDIA RTX 4060', tdp: 115 },

  // NVIDIA RTX 30 Series
  { name: 'NVIDIA RTX 3090 Ti', tdp: 450 },
  { name: 'NVIDIA RTX 3090', tdp: 350 },
  { name: 'NVIDIA RTX 3080 Ti', tdp: 350 },
  { name: 'NVIDIA RTX 3080 12GB', tdp: 350 },
  { name: 'NVIDIA RTX 3080 10GB', tdp: 320 },
  { name: 'NVIDIA RTX 3070 Ti', tdp: 290 },
  { name: 'NVIDIA RTX 3070', tdp: 220 },
  { name: 'NVIDIA RTX 3060 Ti', tdp: 200 },
  { name: 'NVIDIA RTX 3060 12GB', tdp: 170 },
  { name: 'NVIDIA RTX 3060 8GB', tdp: 170 },
  { name: 'NVIDIA RTX 3050 8GB', tdp: 130 },
  { name: 'NVIDIA RTX 3050 6GB', tdp: 70 },

  // NVIDIA RTX 20 Series
  { name: 'NVIDIA RTX 2080 Ti', tdp: 250 },
  { name: 'NVIDIA RTX 2080 Super', tdp: 250 },
  { name: 'NVIDIA RTX 2080', tdp: 215 },
  { name: 'NVIDIA RTX 2070 Super', tdp: 215 },
  { name: 'NVIDIA RTX 2070', tdp: 175 },
  { name: 'NVIDIA RTX 2060 Super', tdp: 175 },
  { name: 'NVIDIA RTX 2060 12GB', tdp: 184 },
  { name: 'NVIDIA RTX 2060 6GB', tdp: 160 },

  // NVIDIA Laptop / Mobile GPUs
  { name: 'NVIDIA RTX 4090 Laptop', tdp: 150 },
  { name: 'NVIDIA RTX 4080 Laptop', tdp: 150 },
  { name: 'NVIDIA RTX 4070 Laptop', tdp: 115 },
  { name: 'NVIDIA RTX 4060 Laptop', tdp: 115 },
  { name: 'NVIDIA RTX 4050 Laptop', tdp: 95 },
  { name: 'NVIDIA RTX 3080 Ti Laptop', tdp: 150 },
  { name: 'NVIDIA RTX 3080 Laptop', tdp: 150 },
  { name: 'NVIDIA RTX 3070 Ti Laptop', tdp: 125 },
  { name: 'NVIDIA RTX 3070 Laptop', tdp: 125 },
  { name: 'NVIDIA RTX 3060 Laptop', tdp: 115 },
  { name: 'NVIDIA RTX 3050 Ti Laptop', tdp: 80 },
  { name: 'NVIDIA RTX 3050 Laptop', tdp: 80 },
  { name: 'NVIDIA RTX 2080 Super Mobile', tdp: 150 },
  { name: 'NVIDIA RTX 2070 Mobile', tdp: 115 },
  { name: 'NVIDIA RTX 2060 Mobile', tdp: 90 },

  // NVIDIA GTX Series
  { name: 'NVIDIA GTX 1660 Ti', tdp: 120 },
  { name: 'NVIDIA GTX 1660 Super', tdp: 125 },
  { name: 'NVIDIA GTX 1080 Ti', tdp: 250 },
  { name: 'NVIDIA GTX 1080', tdp: 180 },
  { name: 'NVIDIA GTX 1070', tdp: 150 },
  { name: 'NVIDIA GTX 1060 6GB', tdp: 120 },
  { name: 'NVIDIA GTX 1060 3GB', tdp: 120 },
  { name: 'NVIDIA GTX 970', tdp: 145 },

  // AMD Radeon RX Series
  { name: 'AMD Radeon RX 7900 XTX', tdp: 355 },
  { name: 'AMD Radeon RX 7900 XT', tdp: 315 },
  { name: 'AMD Radeon RX 7800 XT', tdp: 263 },
  { name: 'AMD Radeon RX 7700 XT', tdp: 245 },
  { name: 'AMD Radeon RX 7600 XT', tdp: 190 },
  { name: 'AMD Radeon RX 6950 XT', tdp: 335 },
  { name: 'AMD Radeon RX 6900 XT', tdp: 300 },
  { name: 'AMD Radeon RX 6800 XT', tdp: 300 },
  { name: 'AMD Radeon RX 6700 XT', tdp: 230 },
  { name: 'AMD Radeon RX 6600 XT', tdp: 160 },
  { name: 'AMD Radeon RX 580', tdp: 185 },

  // Professional Accelerators
  { name: 'NVIDIA H100 PCIe', tdp: 350 },
  { name: 'NVIDIA A100 PCIe', tdp: 250 },
  { name: 'NVIDIA RTX A6000', tdp: 300 },
  { name: 'NVIDIA RTX A5000', tdp: 230 },
  { name: 'NVIDIA RTX A4000', tdp: 140 },
  { name: 'NVIDIA RTX A2000', tdp: 70 },
  { name: 'NVIDIA RTX 6000 Ada', tdp: 300 }
];

// Discrete non-linear step values for Logical Threads
const CORES_STEPS = [1, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192];
const RAM_STEPS = [0.032, 0.064, 0.128, 0.256, 0.512, 1, 2, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256];
const DURATION_STEPS = [
  1, 2, 5, 10, 30, // seconds
  60, 120, 300, 600, 1800, // minutes
  3600, 7200, 14400, 28800, 43200, 57600, 86400 // hours up to 24h
];

export default function EconomicModel() {
  const { ref: refCopy, isVisible: isVisibleCopy } = useReveal()
  const { ref: refGrid, isVisible: isVisibleGrid } = useReveal()
  const [lang] = useLanguage()
  const t = TRANSLATIONS[lang]

  // Interactive Calculator State
  const [selectedCpuIndex, setSelectedCpuIndex] = useState(4) // Default Core i7-13700K (24 threads)
  const [cpuUsagePercent, setCpuUtilizationPercent] = useState(65) // Default 65% utilization
  const [coresStepIndex, setCoresStepIndex] = useState(2) // Default index 2 -> 4 threads

  const [hasGpu, setHasGpu] = useState(false)
  const [selectedGpuIndex, setSelectedGpuIndex] = useState(15) // Default RTX 3070 (220W)
  const [gpuUsagePercent, setGpuUtilizationPercent] = useState(100) // Default 100% load
  
  const [ramStepIndex, setRamStepIndex] = useState(2) // Default index 2 -> 128 MB
  const [durationStepIndex, setDurationStepIndex] = useState(3) // Default index 3 -> 10 seconds

  // Custom Searchable Dropdown state
  const [cpuSearch, setCpuSearch] = useState('')
  const [gpuSearch, setGpuSearch] = useState('')
  const [isCpuOpen, setIsCpuOpen] = useState(false)
  const [isGpuOpen, setIsGpuOpen] = useState(false)

  const cpuDropdownRef = useRef(null)
  const gpuDropdownRef = useRef(null)

  const selectedCPU = CPU_DATABASE[selectedCpuIndex] || CPU_DATABASE[0]
  const selectedGPU = GPU_DATABASE[selectedGpuIndex] || GPU_DATABASE[0]

  const ramGB = RAM_STEPS[ramStepIndex]
  const coresUsed = CORES_STEPS[coresStepIndex]
  const duration = DURATION_STEPS[durationStepIndex]

  // Close custom dropdowns on clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (cpuDropdownRef.current && !cpuDropdownRef.current.contains(event.target)) {
        setIsCpuOpen(false)
      }
      if (gpuDropdownRef.current && !gpuDropdownRef.current.contains(event.target)) {
        setIsGpuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Limit logical threads used based on the currently selected CPU logical threads
  useEffect(() => {
    const currentMaxThreads = selectedCPU.threads
    const mappedCoresValue = CORES_STEPS[coresStepIndex]
    if (mappedCoresValue > currentMaxThreads) {
      // Find the highest step below or equal to currentMaxThreads
      let bestIndex = 0
      for (let i = 0; i < CORES_STEPS.length; i++) {
        if (CORES_STEPS[i] <= currentMaxThreads) {
          bestIndex = i
        }
      }
      setCoresStepIndex(bestIndex)
    }
  }, [selectedCpuIndex, selectedCPU.threads, coresStepIndex])

  // Calculation of CPU cycles using baseGhz, load, hilos (threads) and duration
  const cpuCyclesCalculated = selectedCPU.baseGhz * 1e9 * (cpuUsagePercent / 100) * coresUsed * duration

  // Constants from TFG Server api.py
  const CPU_COST_PER_CYCLE = 1e-9
  const RAM_COST_PER_GB_SEC = 0.001 * (887 / 1.985) // ~0.44685
  const GPU_COST_PER_WATT_SEC = 0.0001 * (887 / 4.3) // ~0.020628

  // Breakdown Calculations
  const costCPU = cpuCyclesCalculated * CPU_COST_PER_CYCLE
  const costRAM = ramGB * duration * RAM_COST_PER_GB_SEC
  const realGpuWatts = selectedGPU.tdp * (gpuUsagePercent / 100)
  const costGPU = hasGpu ? realGpuWatts * duration * GPU_COST_PER_WATT_SEC : 0
  const totalCost = costCPU + costRAM + costGPU

  // Formatting helpers
  const formatRAM = (val) => {
    if (val < 1.0) {
      return `${Math.round(val * 1024)} MB`
    }
    return `${val.toFixed(2)} GB`
  }

  const formatDuration = (val) => {
    if (val < 60) return `${val} s`
    if (val < 3600) return `${(val / 60).toFixed(1)} min`
    return `${(val / 3600).toFixed(1)} h`
  }

  // Filtering for custom searchable selectors
  const filteredCPUs = CPU_DATABASE.filter(cpu =>
    cpu.name.toLowerCase().includes(cpuSearch.toLowerCase())
  );

  const filteredGPUs = GPU_DATABASE.filter(gpu =>
    gpu.name.toLowerCase().includes(gpuSearch.toLowerCase())
  );

  return (
    <section id="economia" className="section economic circuit-grid">
      <div className="container">
        
        {/* Encabezado: Economía de Reciprocidad */}
        <div className={`economic__header reveal ${isVisibleCopy ? 'is-visible' : ''}`} ref={refCopy}>
          <span className="eyebrow">{t.economics.eyebrow}</span>
          <h2 className="section-title">{t.economics.calc_section_title || t.economics.title}</h2>
          <p className="section-kicker">
            {t.economics.calc_section_desc || t.economics.kicker}
          </p>
        </div>

        {/* Calculadora Interactiva de Coste Físico y Fórmulas del TFG */}
        <div className={`economic__main-grid reveal ${isVisibleGrid ? 'is-visible' : ''}`} ref={refGrid}>
          
          {/* Panel Izquierdo: Parámetros de Telemetría (perf stat) */}
          <div className="economic__flow-card chamfer">
            <div className="economic__flow-header">
              <span className="flow-badge">
                {lang === 'es' ? 'PARÁMETROS DE HARDWARE REALES' : 'REAL HARDWARE PARAMETERS'}
              </span>
            </div>

            <div className="calc-sliders">
              {/* Selección Buscar/Elegir CPU */}
              <div className="slider-group" ref={cpuDropdownRef}>
                <div className="slider-label">
                  <span>{lang === 'es' ? 'Buscar y Seleccionar Procesador' : 'Search and Select Processor'}</span>
                </div>
                <div className="custom-combobox">
                  <div 
                    className="combobox-trigger"
                    onClick={() => setIsCpuOpen(!isCpuOpen)}
                  >
                    <span>{selectedCPU.name} ({selectedCPU.baseGhz} GHz · {selectedCPU.cores} Cores / {selectedCPU.threads} Threads)</span>
                    <span className="combobox-arrow">▼</span>
                  </div>
                  
                  {isCpuOpen && (
                    <div className="combobox-dropdown">
                      <input 
                        type="text"
                        placeholder={lang === 'es' ? 'Escribe para buscar CPU...' : 'Type to search CPU...'}
                        value={cpuSearch}
                        onChange={(e) => setCpuSearch(e.target.value)}
                        className="combobox-search-input"
                        autoFocus
                      />
                      <ul className="combobox-list">
                        {filteredCPUs.length > 0 ? (
                          filteredCPUs.map((cpu) => (
                            <li 
                              key={cpu.name}
                              onClick={() => {
                                setSelectedCpuIndex(CPU_DATABASE.indexOf(cpu))
                                setIsCpuOpen(false)
                                setCpuSearch('')
                              }}
                              className={`combobox-option ${cpu.name === selectedCPU.name ? 'is-selected' : ''}`}
                            >
                              {cpu.name} ({cpu.baseGhz} GHz · {cpu.cores} Cores / {cpu.threads} Threads)
                            </li>
                          ))
                        ) : (
                          <li className="combobox-no-results">
                            {lang === 'es' ? 'No se encontraron resultados' : 'No results found'}
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Uso medio de CPU (%) */}
              <div className="slider-group">
                <div className="slider-label">
                  <span>{lang === 'es' ? 'Uso medio de CPU (Carga %)' : 'Average CPU load (%)'}</span>
                  <strong>{cpuUsagePercent}%</strong>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="100" 
                  step="5" 
                  value={cpuUsagePercent} 
                  onChange={(e) => setCpuUtilizationPercent(parseInt(e.target.value))}
                  className="calc-range"
                />
              </div>

              {/* Hilos (Threads) Asignados (Non-linear Step Slider, adapting perfectly to selected CPU logical threads!) */}
              <div className="slider-group">
                <div className="slider-label">
                  <span>{lang === 'es' ? 'Hilos de CPU asignados (Hilos lógicos)' : 'CPU threads assigned (Logical threads)'}</span>
                  <strong>{coresUsed} / {selectedCPU.threads} hilos (threads) <span style={{ opacity: 0.6, fontSize: '11px' }}>[{selectedCPU.cores} cores]</span></strong>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max={CORES_STEPS.filter(step => step <= selectedCPU.threads).length - 1} 
                  step="1" 
                  value={coresStepIndex} 
                  onChange={(e) => setCoresStepIndex(parseInt(e.target.value))}
                  className="calc-range"
                />
              </div>

              {/* Memoria RAM Usada (Non-linear Step Slider, up to 256GB) */}
              <div className="slider-group">
                <div className="slider-label">
                  <span>{lang === 'es' ? 'Memoria RAM utilizada (No lineal)' : 'RAM memory used (Non-linear)'}</span>
                  <strong>{formatRAM(ramGB)}</strong>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max={RAM_STEPS.length - 1} 
                  step="1" 
                  value={ramStepIndex} 
                  onChange={(e) => setRamStepIndex(parseInt(e.target.value))}
                  className="calc-range"
                />
              </div>

              {/* Duración de la Tarea (Non-linear Step Slider up to 24h) */}
              <div className="slider-group">
                <div className="slider-label">
                  <span>{lang === 'es' ? 'Duración de la ejecución (No lineal)' : 'Execution duration (Non-linear)'}</span>
                  <strong>{formatDuration(duration)}</strong>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max={DURATION_STEPS.length - 1} 
                  step="1" 
                  value={durationStepIndex} 
                  onChange={(e) => setDurationStepIndex(parseInt(e.target.value))}
                  className="calc-range"
                />
              </div>

              {/* Procesamiento por GPU */}
              <div className="gpu-toggle-container">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={hasGpu} 
                    onChange={(e) => setHasGpu(e.target.checked)} 
                  />
                  <span className="checkbox-text">
                    {lang === 'es' ? 'Habilitar GPU dedicada' : 'Enable GPU processing'}
                  </span>
                </label>
              </div>

              {hasGpu && (
                <>
                  {/* Selección Buscar/Elegir GPU */}
                  <div className="slider-group" ref={gpuDropdownRef}>
                    <div className="slider-label">
                      <span>{lang === 'es' ? 'Buscar y Seleccionar Tarjeta Gráfica' : 'Search and Select Graphics Card'}</span>
                    </div>
                    <div className="custom-combobox">
                      <div 
                        className="combobox-trigger"
                        onClick={() => setIsGpuOpen(!isGpuOpen)}
                      >
                        <span>{selectedGPU.name} (TDP {selectedGPU.tdp}W)</span>
                        <span className="combobox-arrow">▼</span>
                      </div>
                      
                      {isGpuOpen && (
                        <div className="combobox-dropdown">
                          <input 
                            type="text"
                            placeholder={lang === 'es' ? 'Escribe para buscar GPU...' : 'Type to search GPU...'}
                            value={gpuSearch}
                            onChange={(e) => setGpuSearch(e.target.value)}
                            className="combobox-search-input"
                            autoFocus
                          />
                          <ul className="combobox-list">
                            {filteredGPUs.length > 0 ? (
                              filteredGPUs.map((gpu) => (
                                <li 
                                  key={gpu.name}
                                  onClick={() => {
                                    setSelectedGpuIndex(GPU_DATABASE.indexOf(gpu))
                                    setIsGpuOpen(false)
                                    setGpuSearch('')
                                  }}
                                  className={`combobox-option ${gpu.name === selectedGPU.name ? 'is-selected' : ''}`}
                                >
                                  {gpu.name} (TDP {gpu.tdp}W)
                                </li>
                              ))
                            ) : (
                              <li className="combobox-no-results">
                                {lang === 'es' ? 'No se encontraron resultados' : 'No results found'}
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="slider-group">
                    <div className="slider-label">
                      <span>{lang === 'es' ? 'Uso medio de GPU (Carga %)' : 'Average GPU load (%)'}</span>
                      <strong>{gpuUsagePercent}%</strong>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="100" 
                      step="5" 
                      value={gpuUsagePercent} 
                      onChange={(e) => setGpuUtilizationPercent(parseInt(e.target.value))}
                      className="calc-range"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Panel Derecho: Liquidación Criptográfica Formal */}
          <div className="economic__comparison-card chamfer">
            <div className="economic__comparison-header">
              <span className="comparison-badge">
                {lang === 'es' ? 'DESGLOSE DE CRÉDITOS LIQUIDADOS' : 'SETTLED CREDITS BREAKDOWN'}
              </span>
            </div>

            <div className="calc-results font-body">
              <div className="formula-box">
                <div className="formula-title">Coste Total = Coste_CPU + Coste_RAM + Coste_GPU</div>
                
                <div className="formula-row">
                  <span className="formula-part">Coste CPU</span>
                  <span className="formula-math">({(cpuCyclesCalculated / 1e9).toFixed(2)}B cycles × 10⁻⁹)</span>
                  <strong className="formula-val">↯ {costCPU.toFixed(4)}</strong>
                </div>

                <div className="formula-row">
                  <span className="formula-part">Coste RAM</span>
                  <span className="formula-math">({ramGB.toFixed(3)}GB × {duration.toFixed(1)}s × 0.4468)</span>
                  <strong className="formula-val">↯ {costRAM.toFixed(4)}</strong>
                </div>

                {hasGpu ? (
                  <div className="formula-row formula-row--gpu">
                    <span className="formula-part" style={{ color: 'var(--blue)' }}>Coste GPU</span>
                    <span className="formula-math">({realGpuWatts.toFixed(0)}W × {duration.toFixed(1)}s × 0.0206)</span>
                    <strong className="formula-val" style={{ color: 'var(--blue)' }}>↯ {costGPU.toFixed(4)}</strong>
                  </div>
                ) : (
                  <div className="formula-row formula-row--disabled">
                    <span className="formula-part">Coste GPU</span>
                    <span className="formula-math">({lang === 'es' ? 'Sin aceleración' : 'No hardware acceleration'})</span>
                    <strong className="formula-val">↯ 0.0000</strong>
                  </div>
                )}

                <div className="formula-divider" />

                <div className="formula-total">
                  <span>{lang === 'es' ? 'CRÉDITOS LIQUIDADOS' : 'TOTAL CREDITS LIQUIDATED'}</span>
                  <strong className="total-val">↯ {totalCost.toFixed(4)}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}