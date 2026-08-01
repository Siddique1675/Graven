export interface SpecItem {
  label: string;
  value: string;
}

export interface BeatData {
  id: string;
  kicker: string;
  heading: string;
  highlightWord?: string;
  sub: string;
  specs: SpecItem[];
  progressRange: [number, number]; // [minProgress, maxProgress]
  position: 'left' | 'right' | 'center';
}

export interface DrawingProject {
  id: string;
  sheetNo: string;
  title: string;
  category: string;
  scale: string;
  year: string;
  tolerance: string;
  description: string;
  specs: Record<string, string>;
  details: string[];
}

export interface InquiryFormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  medium: 'vellum' | 'mylar' | 'digital' | 'hybrid';
  scale: string;
  budget: string;
  notes: string;
}
