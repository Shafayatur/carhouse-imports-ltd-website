import { useEffect, useState } from 'react';
import {
    getVehicles, getFeaturedVehicles, getVehicleById,
    getHeroSlides, getMarketUpdates, getPartners,
    getFaqItems, getSiteSettings,
    type Vehicle, type HeroSlide, type MarketUpdate,
    type Partner, type FaqItem,
} from '@/lib/supabase';

// ─── useVehicles ──────────────────────────────────────────────────────────────
export function useVehicles() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getVehicles().then(setVehicles).finally(() => setLoading(false));
    }, []);
    return { vehicles, loading };
}

// ─── useFeaturedVehicles ──────────────────────────────────────────────────────
export function useFeaturedVehicles() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getFeaturedVehicles().then(setVehicles).finally(() => setLoading(false));
    }, []);
    return { vehicles, loading };
}

// ─── useVehicle ───────────────────────────────────────────────────────────────
export function useVehicle(id: string | undefined) {
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!id) { setLoading(false); return; }
        getVehicleById(id).then(setVehicle).finally(() => setLoading(false));
    }, [id]);
    return { vehicle, loading };
}

// ─── useHeroSlides ────────────────────────────────────────────────────────────
export function useHeroSlides() {
    const [slides, setSlides] = useState<HeroSlide[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getHeroSlides().then(setSlides).finally(() => setLoading(false));
    }, []);
    return { slides, loading };
}

// ─── useMarketUpdates ─────────────────────────────────────────────────────────
export function useMarketUpdates() {
    const [updates, setUpdates] = useState<MarketUpdate[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getMarketUpdates().then(setUpdates).finally(() => setLoading(false));
    }, []);
    return { updates, loading };
}

// ─── usePartners ──────────────────────────────────────────────────────────────
export function usePartners() {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getPartners().then(setPartners).finally(() => setLoading(false));
    }, []);
    return { partners, loading };
}

// ─── useFaqItems ──────────────────────────────────────────────────────────────
export function useFaqItems() {
    const [faqs, setFaqs] = useState<FaqItem[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getFaqItems().then(setFaqs).finally(() => setLoading(false));
    }, []);
    return { faqs, loading };
}

// ─── useSiteSettings ─────────────────────────────────────────────────────────
export function useSiteSettings() {
    const [settings, setSettings] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getSiteSettings().then(setSettings).finally(() => setLoading(false));
    }, []);
    // get(key, fallback) helper
    const get = (key: string, fallback = '') => settings[key] ?? fallback;
    return { settings, get, loading };
}

// ─── useHorizontalVehicles ────────────────────────────────────────────────────
import { getHorizontalVehicles, getVaultFeatureVehicles } from '@/lib/supabase';

export function useHorizontalVehicles() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getHorizontalVehicles().then(setVehicles).finally(() => setLoading(false));
    }, []);
    return { vehicles, loading };
}

// ─── useVaultFeatureVehicles ──────────────────────────────────────────────────
export function useVaultFeatureVehicles() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getVaultFeatureVehicles().then(setVehicles).finally(() => setLoading(false));
    }, []);
    return { vehicles, loading };
}

// ─── useNewArrivals ───────────────────────────────────────────────────────────
import { getNewArrivals, getCategories, getGalleryImages, type VehicleCategory, type GalleryImage } from '@/lib/supabase';

export function useNewArrivals() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getNewArrivals().then(setVehicles).finally(() => setLoading(false));
    }, []);
    return { vehicles, loading };
}

// ─── useCategories ────────────────────────────────────────────────────────────
export function useCategories() {
    const [categories, setCategories] = useState<VehicleCategory[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getCategories().then(setCategories).finally(() => setLoading(false));
    }, []);
    return { categories, loading };
}

// ─── useGalleryImages ─────────────────────────────────────────────────────────
export function useGalleryImages() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getGalleryImages().then(setImages).finally(() => setLoading(false));
    }, []);
    return { images, loading };
}