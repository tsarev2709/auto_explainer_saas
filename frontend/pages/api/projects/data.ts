import { ProjectFormData } from '../../../components/ProjectVideoForm';

export interface VideoProject extends ProjectFormData {
  id: string;
  status?: string;
}

export const projects: VideoProject[] = [];
