import { createClient } from '@supabase/supabase-js';
import { ReviewItem } from '@/types';
import { INITIAL_REVIEWS } from './mockData';
import { siteConfig } from '@/config/site';

const supabaseUrl = siteConfig.integrations.supabase.url || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = siteConfig.integrations.supabase.anonKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const LOCAL_STORAGE_KEY = 'premier_clean_reviews_v1';

export async function fetchReviews(): Promise<ReviewItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((item) => ({
          id: String(item.id),
          author: item.author || '익명 고객님',
          location: item.location || '서울 경기권',
          serviceType: item.service_type || '프리미엄 클리닝',
          rating: item.rating || 5,
          content: item.content || '',
          date: item.date || new Date().toISOString().slice(0, 10),
          beforeImage: item.before_image || '',
          afterImage: item.after_image || '',
          verified: item.verified ?? true,
        }));
      }
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to local reviews:', err);
    }
  }

  // Client-side local storage fallback
  if (typeof window !== 'undefined') {
    try {
      const local = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('LocalStorage access failed:', e);
    }
  }

  return INITIAL_REVIEWS;
}

export async function createReview(newReview: Omit<ReviewItem, 'id' | 'date'>): Promise<ReviewItem> {
  const reviewToSave: ReviewItem = {
    ...newReview,
    id: `rev-${Date.now()}`,
    date: new Date().toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).replace(/\. /g, '.').replace(/\.$/, ''),
    verified: true,
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([
          {
            author: reviewToSave.author,
            location: reviewToSave.location,
            service_type: reviewToSave.serviceType,
            rating: reviewToSave.rating,
            content: reviewToSave.content,
            date: reviewToSave.date,
            before_image: reviewToSave.beforeImage,
            after_image: reviewToSave.afterImage,
            verified: true,
          },
        ])
        .select()
        .single();

      if (!error && data) {
        return {
          id: String(data.id),
          author: data.author,
          location: data.location,
          serviceType: data.service_type,
          rating: data.rating,
          content: data.content,
          date: data.date,
          beforeImage: data.before_image,
          afterImage: data.after_image,
          verified: data.verified,
        };
      }
    } catch (err) {
      console.warn('Supabase insert failed, fallback to local storage:', err);
    }
  }

  // Local fallback save
  if (typeof window !== 'undefined') {
    try {
      const current = await fetchReviews();
      const updated = [reviewToSave, ...current];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save review to localStorage:', e);
    }
  }

  return reviewToSave;
}

export function verifyAdminPassword(password: string): boolean {
  const validPassword = siteConfig.integrations.adminPassword || process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '0000';
  return password.trim() === validPassword.trim();
}
