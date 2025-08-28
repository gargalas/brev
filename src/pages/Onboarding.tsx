import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { BubbleButton } from "@/components/BubbleButton";
import { ChevronRight, Check, Loader2 } from "lucide-react";
import { SPECIALTIES, findSpecialty } from "../../specialties";
import { apiClient } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedSubspecialty, setSelectedSubspecialty] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [practice, setPractice] = useState("");

  // Save profile mutation
  const saveProfileMutation = useMutation({
    mutationFn: (profileData: {
      specialty: string;
      practice: string;
      subinterests: string[];
      evidence_weights: Record<string, number>;
      recency_half_life_days: number;
    }) => apiClient.updateProfile(profileData),
    onSuccess: () => {
      localStorage.setItem('userOnboarded', 'true');
      toast({ title: "Profile saved successfully!" });
      navigate('/feed');
    },
    onError: (error) => {
      console.error('Profile save error:', error);
      toast({ title: "Failed to save profile", variant: "destructive" });
    }
  });

  const handleSpecialtySelect = (specialtyId: string) => {
    setSelectedSpecialty(specialtyId);
    setSelectedSubspecialty("");
    setSelectedTopics([]);
  };

  const handleSubspecialtySelect = (subspecialtyId: string) => {
    setSelectedSubspecialty(subspecialtyId);
    setSelectedTopics([]);
  };

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const handleComplete = () => {
    const specialty = findSpecialty(selectedSpecialty);
    const subspecialty = specialty?.subs.find(s => s.id === selectedSubspecialty);
    
    const profileData = {
      specialty: specialty?.name || "",
      practice: practice || "Hospital/Clinical Practice", 
      subinterests: selectedTopics,
      evidence_weights: {
        "Meta-Analysis": 1.0,
        "Systematic Review": 0.9,
        "Randomized Controlled Trial": 0.8,
        "Guideline": 0.7
      },
      recency_half_life_days: 180
    };

    saveProfileMutation.mutate(profileData);
  };

  const canProceed = () => {
    switch (step) {
      case 1: return selectedSpecialty !== "";
      case 2: return selectedSubspecialty !== "";
      case 3: return selectedTopics.length > 0;
      default: return false;
    }
  };

  const selectedSpecialtyData = findSpecialty(selectedSpecialty);
  const selectedSubspecialtyData = selectedSpecialtyData?.subs.find(s => s.id === selectedSubspecialty);

  return (
    <div className="min-h-screen bg-gradient-surface safe-area-top safe-area-bottom">
      <div className="px-6 py-8 max-w-2xl mx-auto">
        {/* Progress Indicator */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                num < step ? "bg-primary text-primary-foreground" :
                num === step ? "bg-primary text-primary-foreground" :
                "bg-muted text-muted-foreground"
              }`}>
                {num < step ? <Check size={16} /> : num}
              </div>
              {num < 3 && (
                <div className={`w-8 h-1 mx-2 rounded-full transition-colors ${
                  num < step ? "bg-primary" : "bg-muted"
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        {step === 1 && (
          <div>
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              What's your medical specialty?
            </h1>
            <p className="text-muted-foreground mb-6">
              This helps us curate relevant content for you
            </p>
            
            <div className="grid grid-cols-1 gap-3 mb-8">
              {SPECIALTIES.map((specialty) => (
                <BubbleButton
                  key={specialty.id}
                  selected={selectedSpecialty === specialty.id}
                  onClick={() => handleSpecialtySelect(specialty.id)}
                  className="text-left justify-start"
                >
                  {specialty.name}
                </BubbleButton>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              Choose your subspecialty
            </h1>
            <p className="text-muted-foreground mb-6">
              Select your area of focus within {selectedSpecialtyData?.name}
            </p>
            
            <div className="grid grid-cols-1 gap-3 mb-8">
              {selectedSpecialtyData?.subs.map((subspecialty) => (
                <BubbleButton
                  key={subspecialty.id}
                  selected={selectedSubspecialty === subspecialty.id}
                  onClick={() => handleSubspecialtySelect(subspecialty.id)}
                  className="text-left justify-start"
                >
                  {subspecialty.name}
                </BubbleButton>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              Select your topics of interest
            </h1>
            <p className="text-muted-foreground mb-6">
              Choose specific topics within {selectedSubspecialtyData?.name} to personalize your feed
            </p>
            
            <div className="grid grid-cols-1 gap-2 mb-8 max-h-96 overflow-y-auto">
              {selectedSubspecialtyData?.topics.map((topic) => (
                <BubbleButton
                  key={topic}
                  selected={selectedTopics.includes(topic)}
                  onClick={() => handleTopicToggle(topic)}
                  className="text-left justify-start text-sm py-2"
                >
                  {topic}
                </BubbleButton>
              ))}
            </div>
            
            <div className="text-center text-sm text-muted-foreground mb-6">
              Selected {selectedTopics.length} topics
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              disabled={saveProfileMutation.isPending}
              className="button-secondary"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={step === 3 ? handleComplete : () => setStep(step + 1)}
            disabled={!canProceed() || saveProfileMutation.isPending}
            className="button-primary flex items-center gap-2"
          >
            {saveProfileMutation.isPending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving Profile...
              </>
            ) : (
              <>
                {step === 3 ? "Complete Setup" : "Continue"}
                <ChevronRight size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};