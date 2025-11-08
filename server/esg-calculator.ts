/**
 * ESG Calculator - Real Carbon Footprint & Environmental Metrics
 * Based on scientific formulas and Copper Mark standards for mining industry
 */

export interface MaterialData {
  material: string;
  weight: number; // kg
  recyclability: number; // percentage 0-100
  isRecycled?: boolean;
}

export interface ESGMetrics {
  absoluteEmissions: number; // kg CO2e (actual emissions)
  avoidedEmissions: number; // kg CO2e (emissions avoided through recycling)
  carbonReductionPercent: number; // percentage reduction
  waterSaved: number; // liters
  energySaved: number; // kWh
  wasteReduced: number; // kg
  recyclabilityScore: number; // 0-100
  copperMarkScore: number; // 0-100
  details: {
    materialBreakdown: MaterialBreakdownMetric[];
    calculations: CalculationDetails;
  };
}

export interface MaterialBreakdownMetric {
  material: string;
  weight: number;
  co2Impact: number;
  waterImpact: number;
  energyImpact: number;
}

export interface CalculationDetails {
  formula: string;
  assumptions: string[];
  sources: string[];
}

/**
 * Carbon emission factors (kg CO2e per kg of material)
 * Source: IPCC, EPA, and mining industry studies
 */
const CARBON_EMISSION_FACTORS: Record<string, { virgin: number; recycled: number }> = {
  papel_carton: {
    virgin: 1.32, // kg CO2e per kg (pulp & paper production)
    recycled: 0.77, // 42% reduction when recycled
  },
  plasticos: {
    virgin: 6.0, // Average for common plastics (PET, HDPE, PP)
    recycled: 2.1, // 65% reduction when recycled
  },
  vidrio: {
    virgin: 0.85, // Glass production
    recycled: 0.59, // 30% reduction
  },
  metales: {
    virgin: 8.9, // Average for steel/aluminum (mining intensive)
    recycled: 0.89, // 90% reduction (highly efficient recycling)
  },
  madera: {
    virgin: 0.45, // Timber processing
    recycled: 0.27, // 40% reduction
  },
  compuestos: {
    virgin: 4.5, // Complex materials
    recycled: 2.7, // 40% reduction
  },
  otros: {
    virgin: 3.0, // Generic average
    recycled: 1.8, // 40% reduction
  },
};

/**
 * Water consumption factors (liters per kg of material)
 * Source: Water Footprint Network, mining industry data
 */
const WATER_CONSUMPTION_FACTORS: Record<string, { virgin: number; recycled: number }> = {
  papel_carton: { virgin: 300, recycled: 60 },
  plasticos: { virgin: 185, recycled: 50 },
  vidrio: { virgin: 25, recycled: 10 },
  metales: { virgin: 400, recycled: 40 }, // Mining is water-intensive
  madera: { virgin: 150, recycled: 45 },
  compuestos: { virgin: 200, recycled: 80 },
  otros: { virgin: 150, recycled: 75 },
};

/**
 * Energy consumption factors (kWh per kg of material)
 * Source: International Energy Agency, industrial energy studies
 */
const ENERGY_CONSUMPTION_FACTORS: Record<string, { virgin: number; recycled: number }> = {
  papel_carton: { virgin: 5.4, recycled: 2.8 },
  plasticos: { virgin: 18.0, recycled: 5.4 },
  vidrio: { virgin: 2.5, recycled: 1.5 },
  metales: { virgin: 25.0, recycled: 2.5 }, // 90% energy savings
  madera: { virgin: 1.5, recycled: 0.9 },
  compuestos: { virgin: 12.0, recycled: 7.2 },
  otros: { virgin: 8.0, recycled: 4.8 },
};

/**
 * Calculate real carbon footprint (absolute emissions) and avoided emissions
 */
export function calculateCarbonFootprint(materials: MaterialData[]): { 
  absoluteEmissions: number; 
  avoidedEmissions: number;
  reductionPercentage: number;
} {
  let totalEmissions = 0;
  let baselineEmissions = 0;

  for (const mat of materials) {
    const factors = CARBON_EMISSION_FACTORS[mat.material] || CARBON_EMISSION_FACTORS.otros;
    
    const virginFactor = factors.virgin;
    const recycledFactor = factors.recycled;
    const recyclabilityFraction = mat.recyclability / 100;
    
    // Baseline (100% virgin material)
    const baseline = mat.weight * virginFactor;
    baselineEmissions += baseline;
    
    // Actual emissions with recyclability
    const effectiveFactor = virginFactor + (recycledFactor - virginFactor) * recyclabilityFraction;
    const actualEmissions = mat.weight * effectiveFactor;
    totalEmissions += actualEmissions;
  }

  const avoidedEmissions = baselineEmissions - totalEmissions;
  const reductionPercentage = baselineEmissions > 0 ? (avoidedEmissions / baselineEmissions) * 100 : 0;

  return {
    absoluteEmissions: Math.round(totalEmissions * 100) / 100,
    avoidedEmissions: Math.round(avoidedEmissions * 100) / 100,
    reductionPercentage: Math.round(reductionPercentage * 100) / 100,
  };
}

/**
 * Calculate water saved through recycling
 */
export function calculateWaterSaved(materials: MaterialData[]): number {
  let totalWaterSaved = 0;

  for (const mat of materials) {
    const factors = WATER_CONSUMPTION_FACTORS[mat.material] || WATER_CONSUMPTION_FACTORS.otros;
    
    const virginWater = factors.virgin;
    const recycledWater = factors.recycled;
    const recyclabilityFraction = mat.recyclability / 100;
    
    // Water saved = (virgin - recycled) * weight * recyclability
    const waterSaved = (virginWater - recycledWater) * mat.weight * recyclabilityFraction;
    totalWaterSaved += waterSaved;
  }

  return Math.round(totalWaterSaved);
}

/**
 * Calculate energy saved through recycling
 */
export function calculateEnergySaved(materials: MaterialData[]): number {
  let totalEnergySaved = 0;

  for (const mat of materials) {
    const factors = ENERGY_CONSUMPTION_FACTORS[mat.material] || ENERGY_CONSUMPTION_FACTORS.otros;
    
    const virginEnergy = factors.virgin;
    const recycledEnergy = factors.recycled;
    const recyclabilityFraction = mat.recyclability / 100;
    
    // Energy saved = (virgin - recycled) * weight * recyclability
    const energySaved = (virginEnergy - recycledEnergy) * mat.weight * recyclabilityFraction;
    totalEnergySaved += energySaved;
  }

  return Math.round(totalEnergySaved * 100) / 100;
}

/**
 * Normalize a metric to 0-100 scale
 * @param value - The raw value
 * @param baseline - The baseline value (0% reduction)
 * @param target - The target value (100% reduction)
 */
function normalizeMetric(value: number, baseline: number, target: number = 0): number {
  if (baseline === 0) return 0;
  const normalized = ((baseline - value) / (baseline - target)) * 100;
  return Math.max(0, Math.min(100, normalized));
}

/**
 * Calculate Copper Mark compliance score for mining industry
 * Based on RBA (Responsible Business Alliance) and ICMM principles
 * All input metrics MUST be normalized to 0-100 scale
 */
export function calculateCopperMarkScore(metrics: {
  recyclabilityScore: number; // 0-100
  carbonReduction: number; // 0-100
  waterEfficiency: number; // 0-100
  energyEfficiency: number; // 0-100
  traceabilityScore: number; // 0-100
}): number {
  // Validate all inputs are in 0-100 range
  Object.values(metrics).forEach(value => {
    if (value < 0 || value > 100) {
      console.warn(`Copper Mark metric out of range: ${value}`);
    }
  });

  // Copper Mark weighted scoring
  const weights = {
    recyclability: 0.25, // 25% - Circular economy
    carbonReduction: 0.30, // 30% - Climate action
    waterEfficiency: 0.20, // 20% - Water stewardship
    energyEfficiency: 0.15, // 15% - Energy management
    traceability: 0.10, // 10% - Supply chain transparency
  };

  const score =
    metrics.recyclabilityScore * weights.recyclability +
    metrics.carbonReduction * weights.carbonReduction +
    metrics.waterEfficiency * weights.waterEfficiency +
    metrics.energyEfficiency * weights.energyEfficiency +
    metrics.traceabilityScore * weights.traceability;

  return Math.round(score * 100) / 100;
}

/**
 * Calculate complete ESG metrics for a certification
 */
export function calculateESGMetrics(materials: MaterialData[]): ESGMetrics {
  const carbonData = calculateCarbonFootprint(materials);
  const waterSaved = calculateWaterSaved(materials);
  const energySaved = calculateEnergySaved(materials);
  
  // Average recyclability across all materials
  const totalWeight = materials.reduce((sum, m) => sum + m.weight, 0);
  const weightedRecyclability = materials.reduce(
    (sum, m) => sum + (m.recyclability * m.weight) / totalWeight,
    0
  );

  // Calculate waste reduction (assuming recyclability directly reduces waste)
  const wasteReduced = Math.round(totalWeight * (weightedRecyclability / 100));

  // Calculate baselines for normalization
  const baselineCO2 = totalWeight * 5.0; // 5 kg CO2e per kg virgin material (industry avg)
  const baselineWater = totalWeight * 200; // 200L per kg virgin material
  const baselineEnergy = totalWeight * 10; // 10 kWh per kg virgin material

  // Normalize metrics to 0-100 scale
  const carbonReductionScore = normalizeMetric(carbonData.absoluteEmissions, baselineCO2);
  const waterEfficiencyScore = normalizeMetric(totalWeight * 200 - waterSaved, baselineWater);
  const energyEfficiencyScore = normalizeMetric(totalWeight * 10 - energySaved, baselineEnergy);
  const traceabilityScore = 85; // Based on blockchain + NFC implementation

  const copperMarkScore = calculateCopperMarkScore({
    recyclabilityScore: weightedRecyclability,
    carbonReduction: carbonReductionScore,
    waterEfficiency: waterEfficiencyScore,
    energyEfficiency: energyEfficiencyScore,
    traceabilityScore,
  });

  // Material breakdown
  const materialBreakdown: MaterialBreakdownMetric[] = materials.map((mat) => {
    const carbonFactors = CARBON_EMISSION_FACTORS[mat.material] || CARBON_EMISSION_FACTORS.otros;
    const waterFactors = WATER_CONSUMPTION_FACTORS[mat.material] || WATER_CONSUMPTION_FACTORS.otros;
    const energyFactors = ENERGY_CONSUMPTION_FACTORS[mat.material] || ENERGY_CONSUMPTION_FACTORS.otros;

    const recyclabilityFraction = mat.recyclability / 100;
    const effectiveCarbonFactor = carbonFactors.virgin + (carbonFactors.recycled - carbonFactors.virgin) * recyclabilityFraction;

    return {
      material: mat.material,
      weight: mat.weight,
      co2Impact: Math.round(mat.weight * effectiveCarbonFactor * 100) / 100,
      waterImpact: Math.round((waterFactors.virgin - waterFactors.recycled) * mat.weight * recyclabilityFraction),
      energyImpact: Math.round((energyFactors.virgin - energyFactors.recycled) * mat.weight * recyclabilityFraction * 100) / 100,
    };
  });

  return {
    absoluteEmissions: carbonData.absoluteEmissions,
    avoidedEmissions: carbonData.avoidedEmissions,
    carbonReductionPercent: carbonData.reductionPercentage,
    waterSaved,
    energySaved,
    wasteReduced,
    recyclabilityScore: Math.round(weightedRecyclability * 100) / 100,
    copperMarkScore,
    details: {
      materialBreakdown,
      calculations: {
        formula: "CO2e_actual = Σ(weight × [virgin_factor + (recycled_factor - virgin_factor) × recyclability]); CO2e_avoided = CO2e_baseline - CO2e_actual",
        assumptions: [
          "Emission factors based on IPCC and EPA data",
          "Baseline assumes 100% virgin material (5 kg CO2e/kg, 200L water/kg, 10 kWh/kg)",
          "Recyclability linearly reduces impact between virgin and recycled factors",
          "Copper Mark scoring: Recyclability 25%, Carbon 30%, Water 20%, Energy 15%, Traceability 10%",
          "All Copper Mark components normalized to 0-100 scale before weighting",
        ],
        sources: [
          "IPCC Guidelines for National Greenhouse Gas Inventories",
          "U.S. EPA - Waste Reduction Model (WARM)",
          "Copper Mark RBA Framework v7.0",
          "International Council on Mining and Metals (ICMM)",
        ],
      },
    },
  };
}

/**
 * Calculate aggregated ESG metrics for multiple certifications
 */
export function calculateAggregatedESG(certifications: Array<{ materials: MaterialData[] }>): {
  totalAbsoluteEmissions: number;
  totalCO2Avoided: number;
  totalWaterSaved: number;
  totalEnergySaved: number;
  totalWasteReduced: number;
  averageCopperMark: number;
  averageReductionPercent: number;
} {
  let totalAbsolute = 0;
  let totalAvoided = 0;
  let totalWater = 0;
  let totalEnergy = 0;
  let totalWaste = 0;
  let totalCopperMark = 0;
  let totalReduction = 0;

  for (const cert of certifications) {
    const metrics = calculateESGMetrics(cert.materials);
    totalAbsolute += metrics.absoluteEmissions;
    totalAvoided += metrics.avoidedEmissions;
    totalWater += metrics.waterSaved;
    totalEnergy += metrics.energySaved;
    totalWaste += metrics.wasteReduced;
    totalCopperMark += metrics.copperMarkScore;
    totalReduction += metrics.carbonReductionPercent;
  }

  return {
    totalAbsoluteEmissions: Math.round(totalAbsolute * 100) / 100,
    totalCO2Avoided: Math.round(totalAvoided * 100) / 100,
    totalWaterSaved: Math.round(totalWater),
    totalEnergySaved: Math.round(totalEnergy * 100) / 100,
    totalWasteReduced: Math.round(totalWaste),
    averageCopperMark: certifications.length > 0 ? Math.round((totalCopperMark / certifications.length) * 100) / 100 : 0,
    averageReductionPercent: certifications.length > 0 ? Math.round((totalReduction / certifications.length) * 100) / 100 : 0,
  };
}
