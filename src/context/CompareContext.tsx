import { createContext, useContext, useState, ReactNode } from "react";
import { Vehicle } from "@/lib/supabase";

interface CompareContextType {
    compareList: Vehicle[];
    addToCompare: (car: Vehicle) => void;
    removeFromCompare: (id: string) => void;
    isInCompare: (id: string) => boolean;
    clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
    const [compareList, setCompareList] = useState<Vehicle[]>([]);

    const addToCompare = (car: Vehicle) => {
        setCompareList(prev => {
            if (prev.find(c => c.id === car.id)) return prev;
            if (prev.length >= 3) return prev;
            return [...prev, car];
        });
    };

    const removeFromCompare = (id: string) => {
        setCompareList(prev => prev.filter(c => c.id !== id));
    };

    const isInCompare = (id: string) => compareList.some(c => c.id === id);

    const clearCompare = () => setCompareList([]);

    return (
        <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, isInCompare, clearCompare }}>
            {children}
        </CompareContext.Provider>
    );
}

export function useCompare() {
    const ctx = useContext(CompareContext);
    if (!ctx) throw new Error("useCompare must be used within CompareProvider");
    return ctx;
}