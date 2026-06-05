export interface Project {
  id: string;
  title: string;
  description: string | null;
  status: string;
  tech_stack: string[];

  github_url: string | null;
  live_url: string | null;

  cover_image_url: string | null;

  featured?: boolean;
}