// EcoVision AI Shared Domain Data Contracts & Types

export enum UserRole {
  ADMIN = 'ADMIN',
  RESEARCHER = 'RESEARCHER',
  USER = 'USER',
}

export enum WasteCategory {
  PLASTIC = 'PLASTIC',
  GLASS = 'GLASS',
  METAL = 'METAL',
  PAPER = 'PAPER',
  CARDBOARD = 'CARDBOARD',
  ORGANIC = 'ORGANIC',
  E_WASTE = 'E_WASTE',
  HAZARDOUS = 'HAZARDOUS',
  TRASH = 'TRASH',
}

export enum DetectionSource {
  WEBCAM = 'WEBCAM',
  IMAGE_UPLOAD = 'IMAGE_UPLOAD',
  BATCH_PROCESS = 'BATCH_PROCESS',
}

export interface BoundingBox {
  x: number;      // normalized 0.0 - 1.0 or pixel offset
  y: number;
  width: number;
  height: number;
}

export interface DetectedObject {
  id?: string;
  label: WasteCategory | string;
  confidence: number; // 0.0 - 1.0
  box: BoundingBox;
  recyclable: boolean;
  recyclingInstructions?: string;
  co2SavingsKg?: number;
}

export interface DetectionResult {
  detectionId: string;
  imageUrl?: string;
  source: DetectionSource;
  timestamp: string;
  processingTimeMs: number;
  objects: DetectedObject[];
  totalObjects: number;
  recyclableCount: number;
  totalCo2SavingsKg: number;
  ecoScore: number;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
  recyclingScore: number;
  totalScans: number;
  totalCo2SavedKg: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  timestamp: string;
}
