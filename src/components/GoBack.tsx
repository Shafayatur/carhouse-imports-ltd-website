import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface GoBackProps {
  className?: string;
}

export function GoBack({ className = "pt-6 pb-6" }: GoBackProps) {
  const navigate = useNavigate();
  
  return (
    <div className={`container mx-auto px-6 md:px-12 ${className}`}>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-3 text-white/30 hover:text-white transition-colors group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] uppercase tracking-[0.4em] font-black">Go Back</span>
      </button>
    </div>
  );
}
