export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  year: string;
  duration: string;
  role: string;
  coverImage: string | null;
  coverVideo: string | null;
  accentColor: string;
  metrics: Metric[];
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  featured: boolean;
  caseStudySections: CaseStudySection[];
}

export interface Metric {
  label: string;
  value: string;
  description?: string;
}

export interface CaseStudySection {
  id: string;
  type: 'text' | 'image' | 'video' | 'metrics' | 'quote' | 'split';
  title?: string;
  body?: string;
  media?: string | null;
  quote?: string;
  author?: string;
  metrics?: Metric[];
}

export interface FunProject {
  id: string;
  title: string;
  description: string;
  type: 'motion' | 'parallax' | 'landing' | 'ui-concept';
  tags: string[];
  video: string | null;
  thumbnail: string | null;
  accentColor: string;
}
