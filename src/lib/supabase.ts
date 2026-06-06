import { createClient } from '@supabase/supabase-js';

// ─── Client ───────────────────────────────────────────────────────────────────

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseKey) {
    throw new Error(
        '[Supabase] Missing env vars.\n' +
        'Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.'
    );
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// ─── Types (matching actual DB columns) ──────────────────────────────────────

export interface Vehicle {
    id: string;
    make: string;
    model: string;
    year: number;
    color: string;
    vin: string;
    chassis_no: string;
    origin: string;
    port: string;
    purchase_price: number;
    selling_price: number;
    status: string;
    condition: string;
    mileage: number;
    engine_cc: number;
    transmission: string;
    fuel_type: string;
    import_date: string;
    customs_duty: number;
    shipping_cost: number;
    featured: boolean;
    show_new_arrival: boolean;
    body_type: string;
    image_url: string | null;
    gallery_urls: string[] | null;
    engine_image_url: string | null;
}

export interface HeroSlide {
    id: number;
    title: string;
    subtitle: string | null;
    image_url: string;
    cta_text: string;
    cta_link: string;
    sort_order: number;
    is_active: boolean;
}

export interface MarketUpdate {
    id: number;
    type: string;
    title: string;
    description: string;
    urgent: boolean;
    published: boolean;
    sort_order: number;
    created_at: string;
}

export interface Partner {
    id: number;
    name: string;
    region: string;
    sort_order: number;
    is_active: boolean;
}

export interface FaqItem {
    id: number;
    question: string;
    answer: string;
    sort_order: number;
    is_active: boolean;
}

// ─── Fetchers ─────────────────────────────────────────────────────────────────

export async function getVehicles(): Promise<Vehicle[]> {
    const { data, error } = await supabase
        .from('vehicles').select('*')
        .order('import_date', { ascending: false });
    if (error) throw error;
    return data as Vehicle[];
}

export async function getFeaturedVehicles(): Promise<Vehicle[]> {
    const { data, error } = await supabase
        .from('vehicles').select('*')
        .eq('featured', true)
        .order('import_date', { ascending: false });
    if (error) throw error;
    return data as Vehicle[];
}

export async function getVehicleById(id: string): Promise<Vehicle | null> {
    const { data, error } = await supabase
        .from('vehicles').select('*').eq('id', id).single();
    if (error) return null;
    return data as Vehicle;
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
    const { data, error } = await supabase
        .from('hero_slides').select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
    if (error) throw error;
    return data as HeroSlide[];
}

export async function getMarketUpdates(): Promise<MarketUpdate[]> {
    const { data, error } = await supabase
        .from('market_updates').select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true });
    if (error) throw error;
    return data as MarketUpdate[];
}

export async function getPartners(): Promise<Partner[]> {
    const { data, error } = await supabase
        .from('partners').select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
    if (error) throw error;
    return data as Partner[];
}

export async function getFaqItems(): Promise<FaqItem[]> {
    const { data, error } = await supabase
        .from('faq_items').select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
    if (error) throw error;
    return data as FaqItem[];
}

export async function getSiteSettings(): Promise<Record<string, string>> {
    const { data, error } = await supabase
        .from('site_settings').select('key, value');
    if (error) throw error;
    return (data as { key: string; value: string }[]).reduce<Record<string, string>>(
        (acc, row) => { acc[row.key] = row.value ?? ''; return acc; }, {}
    );
}

export async function submitEnquiry(payload: {
    name: string; phone: string; email?: string;
    message?: string; vehicle_id?: string;
}): Promise<void> {
    const { error } = await supabase.from('enquiries').insert([payload]);
    if (error) throw error;
}

/** Vehicles selected for homepage horizontal scroll section */
export async function getHorizontalVehicles(): Promise<Vehicle[]> {
    const { data, error } = await supabase
        .from('vehicles').select('*')
        .eq('show_horizontal', true)
        .order('import_date', { ascending: false })
        .limit(7);
    if (error) throw error;
    return data as Vehicle[];
}

/** Vehicles selected for homepage vault feature (sticky scroll) */
export async function getVaultFeatureVehicles(): Promise<Vehicle[]> {
    const { data, error } = await supabase
        .from('vehicles').select('*')
        .eq('show_vault_feature', true)
        .order('import_date', { ascending: false })
        .limit(4);
    if (error) throw error;
    return data as Vehicle[];
}
/** Vehicles flagged for New Arrivals homepage section */
export async function getNewArrivals(): Promise<Vehicle[]> {
    const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('show_new_arrival', true)
        .order('import_date', { ascending: false });
    if (error) return [];
    return data as Vehicle[];
}

/** Categories for homepage category section */
export interface VehicleCategory {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    image_url: string | null;
    sort_order: number;
    is_active: boolean;
}
export async function getCategories(): Promise<VehicleCategory[]> {
    const { data, error } = await supabase
        .from('vehicle_categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
    if (error) return [];
    return data as VehicleCategory[];
}

/** Gallery images for homepage showroom gallery section */
export interface GalleryImage {
    id: number;
    image_url: string;
    alt: string | null;
    position: number;  // 1-9 grid position
    span: '1x1' | '2x1' | '1x2' | '2x2';  // col x row span
    sort_order: number;
    is_active: boolean;
}
export async function getGalleryImages(): Promise<GalleryImage[]> {
    const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
    if (error) return [];
    return data as GalleryImage[];
}