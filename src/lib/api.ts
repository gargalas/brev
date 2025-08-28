// For local development - change this to your local IP when using Netlify frontend
const API_BASE_URL = import.meta.env.PROD ? 'http://192.168.1.129:5000' : '/api';

export interface SearchResult {
  pmid: string;
  title: string;
  journal: string;
  pub_date: string;
  article_types: string[];
  mesh_terms: string[];
  score: number;
}

export interface FeedResult {
  results: SearchResult[];
  seeds: string[];
  profile: {
    has_profile: boolean;
    specialty: string;
    interests: string[];
    recency_half_life_days: number;
  };
}

export interface SummaryResult {
  pmid: string;
  title: string;
  journal: string;
  pub_date: string;
  article_types: string[];
  takeaway_md: string;
  summary_md: string;
  html: string;
  source: string;
  authors?: string[];
}

export interface UserProfile {
  email: string;
  created_at: string;
  last_login: string;
  profile?: {
    specialty: string;
    practice: string;
    subinterests: string[];
    evidence_weights: Record<string, number>;
    recency_half_life_days: number;
    updated_at: string;
  };
}

class ApiClient {
  private getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getAuthToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Auth
  async startAuth(email: string): Promise<{ ok: boolean; dev: boolean }> {
    return this.request('/auth/start', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async verifyAuth(email: string, code: string): Promise<{ ok: boolean; token: string }> {
    return this.request('/auth/verify', {
      method: 'POST',
      body: JSON.stringify({ email, code }),
    });
  }

  async loginWithPassword(email: string, password: string): Promise<{ ok: boolean; token: string }> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async getMe(): Promise<UserProfile> {
    return this.request('/me');
  }

  async updateProfile(profile: {
    specialty: string;
    practice: string;
    subinterests: string[];
    evidence_weights: Record<string, number>;
    recency_half_life_days: number;
  }): Promise<{ ok: boolean }> {
    return this.request('/me/profile', {
      method: 'PUT',
      body: JSON.stringify(profile),
    });
  }

  // Search and Feed
  async search(query: string, options: { k?: number; explain?: boolean } = {}): Promise<{ query: string; results: SearchResult[] }> {
    const params = new URLSearchParams({
      q: query,
      k: (options.k || 5).toString(),
      ...(options.explain && { explain: 'true' }),
    });
    return this.request(`/search?${params}`);
  }

  async getFeed(options: {
    k?: number;
    lambda?: number;
    w_sem?: number;
    w_bm25?: number;
    explain?: boolean;
  } = {}): Promise<FeedResult> {
    const params = new URLSearchParams();
    if (options.k) params.set('k', options.k.toString());
    if (options.lambda) params.set('lambda', options.lambda.toString());
    if (options.w_sem) params.set('w_sem', options.w_sem.toString());
    if (options.w_bm25) params.set('w_bm25', options.w_bm25.toString());
    if (options.explain) params.set('explain', 'true');
    
    return this.request(`/feed?${params}`);
  }

  // Summarization
  async getSummary(pmid: string): Promise<SummaryResult> {
    return this.request(`/summarise?pmid=${pmid}`);
  }

  // Feedback and Saved
  async submitFeedback(pmid: string, action: 'like' | 'dislike', query?: string): Promise<{ ok: boolean }> {
    return this.request('/feedback', {
      method: 'POST',
      body: JSON.stringify({ pmid, action, query }),
    });
  }

  async saveArticle(pmid: string, title: string, takeaway_md?: string, summary_md?: string): Promise<{ ok: boolean }> {
    return this.request('/saved', {
      method: 'POST',
      body: JSON.stringify({ pmid, title, takeaway_md, summary_md }),
    });
  }

  async getSavedArticles(): Promise<{ user: string; items: Array<{
    pmid: string;
    title: string;
    takeaway_md: string;
    summary_md: string;
    ts: string;
  }> }> {
    return this.request('/saved');
  }

  async deleteSavedArticle(pmid: string): Promise<{ ok: boolean }> {
    return this.request(`/saved/${pmid}`, {
      method: 'DELETE',
    });
  }

  // Health check
  async health(): Promise<{ status: string; index: string }> {
    return this.request('/health');
  }
}

export const apiClient = new ApiClient();
export default apiClient;