import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface RoadmapStep {
  id: string;
  title: string;
  status: 'not_started' | 'in_progress' | 'done';
  data?: any;
}

export interface Scene {
  id: string;
  title: string;
  description: string;
  lipsync: boolean;
  lipsyncText?: string;
}

export interface ScriptOutput {
  storyboard: Scene[];
  voiceoverText: string;
  rationale: string;
}

export interface GeneratedImage {
  id: string;
  url: string;
  sceneId: string;
  promptUsed: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  targetAudience: string;
  customerValues: string[];
  problem: string;
  useCase: string;
  funnelDescription: string;
  productGoal: string;
  script?: ScriptOutput;
  /**
   * Selected keyframes for scenes of this product.
   * Map of sceneId to chosen image.
   */
  frames?: Record<string, GeneratedImage>;
  roadmap: RoadmapStep[];
}

export interface Project {
  id: string;
  companyName: string;
  sphere?: string;
  logo?: string;
  description?: string;
  niche?: string;
  mission?: string;
  createdAt: string;
  products: Product[];
}

interface StoreState {
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  addProduct: (projectId: string, product: Product) => void;
  updateProduct: (projectId: string, product: Product) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      projects: [],
      addProject: (project) =>
        set({ projects: [...get().projects, project] }),
      updateProject: (project) =>
        set({ projects: get().projects.map(p => p.id === project.id ? project : p) }),
      addProduct: (projectId, product) =>
        set({
          projects: get().projects.map(p => p.id === projectId ? { ...p, products: [...p.products, product] } : p)
        }),
      updateProduct: (projectId, product) =>
        set({
          projects: get().projects.map(p =>
            p.id === projectId
              ? { ...p, products: p.products.map(pr => pr.id === product.id ? product : pr) }
              : p
          )
        }),
    }),
    { name: 'ae-projects' }
  )
);
