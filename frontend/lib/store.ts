import { create } from 'zustand';

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

export interface GeneratedVideo {
  id: string
  sceneId: string
  url: string
  thumbnail: string
  generator: string
  duration: number
  lipsyncUsed: boolean
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
  /**
   * Selected final videos for scenes.
   */
  videos?: Record<string, GeneratedVideo>;
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
  fetchProjects: () => Promise<void>;
  createProject: (data: Partial<Project>) => Promise<void>;
  updateProject: (project: Project) => void;
  addProduct: (projectId: string, product: Product) => void;
  updateProduct: (projectId: string, product: Product) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  projects: [],
  fetchProjects: async () => {
    const res = await fetch('/api/projects');
    if (res.ok) {
      const data = await res.json();
      set({ projects: data });
    }
  },
  createProject: async (data) => {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create project');
    const project = await res.json();
    set({ projects: [...get().projects, project] });
  },
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
}));
