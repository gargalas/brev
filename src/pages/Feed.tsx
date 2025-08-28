import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArticleCard } from "@/components/ArticleCard";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Logo } from "@/components/Logo";
import { apiClient } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface FeedArticle {
  pmid: string;
  title: string;
  journal: string;
  pub_date: string;
  article_types?: string[];
  mesh_terms?: string[];
  score?: number;
  takeaway?: string;
  summary?: string;
}

export const Feed = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [articleSummaries, setArticleSummaries] = useState<Record<string, {summary: string; takeaway: string}>>({});
  const [articleTitles, setArticleTitles] = useState<Record<string, string>>({});
  const [loadedSummaries, setLoadedSummaries] = useState<Set<string>>(new Set());
  
  // Fetch feed data
  const { data: feedData, isLoading, error, refetch } = useQuery({
    queryKey: ['feed'],
    queryFn: () => apiClient.getFeed({ k: 3 }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Feedback mutations
  const likeMutation = useMutation({
    mutationFn: ({ pmid, action }: { pmid: string; action: 'like' | 'dislike' }) => 
      apiClient.submitFeedback(pmid, action),
    onSuccess: () => {
      toast({ title: "Feedback recorded" });
    },
    onError: () => {
      toast({ title: "Failed to record feedback", variant: "destructive" });
    }
  });

  const saveMutation = useMutation({
    mutationFn: async (pmid: string) => {
      // Get article details from state and feed data
      const article = feedData?.results?.find(a => a.pmid === pmid);
      if (!article) throw new Error("Article not found");
      
      const title = article.title || articleTitles[pmid] || `Article ${pmid}`;
      const takeaway = articleSummaries[pmid]?.takeaway || '';
      const summary = articleSummaries[pmid]?.summary || '';
      
      return apiClient.saveArticle(pmid, title, takeaway, summary);
    },
    onSuccess: () => {
      toast({ title: "Article saved to your collection" });
      queryClient.invalidateQueries({ queryKey: ['saved'] });
    },
    onError: (error) => {
      console.error('Save error:', error);
      toast({ title: "Failed to save article", variant: "destructive" });
    }
  });

  const summaryMutation = useMutation({
    mutationFn: (pmid: string) => apiClient.getSummary(pmid),
    onSuccess: (data, pmid) => {
      console.log('Summary loaded for PMID:', pmid, data);
      const summary = data.html || data.summary_md || '';
      const takeaway = data.takeaway_md || '';
      
      // Also store the title if we got it from the summarise endpoint
      if (data.title) {
        setArticleTitles(prev => ({
          ...prev,
          [pmid]: data.title
        }));
      }
      
      if (!summary && !takeaway) {
        toast({ title: "No summary available for this article", variant: "destructive" });
        return;
      }
      
      setArticleSummaries(prev => ({
        ...prev,
        [pmid]: { summary, takeaway }
      }));
      toast({ title: "Summary loaded" });
    },
    onError: (error) => {
      console.error('Summary load error:', error);
      toast({ title: "Failed to load summary", variant: "destructive" });
    }
  });


  const handleLike = (pmid: string) => {
    likeMutation.mutate({ pmid, action: 'like' });
  };

  const handleDislike = (pmid: string) => {
    likeMutation.mutate({ pmid, action: 'dislike' });
  };

  const handleSave = async (pmid: string) => {
    return new Promise((resolve, reject) => {
      saveMutation.mutate(pmid, {
        onSuccess: () => resolve(true),
        onError: (error) => reject(error)
      });
    });
  };

  const handleShare = (pmid: string) => {
    if (navigator.share) {
      navigator.share({
        title: "Medical Article",
        text: "Check out this medical article",
        url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`
      });
    } else {
      navigator.clipboard.writeText(`https://pubmed.ncbi.nlm.nih.gov/${pmid}/`);
      toast({ title: "Link copied to clipboard" });
    }
  };

  const handleLoadSummary = (pmid: string) => {
    summaryMutation.mutate(pmid);
  };

  // Auto-fetch titles and summaries for all articles
  useEffect(() => {
    if (feedData?.results) {
      feedData.results.forEach(async (article, index) => {
        const pmid = article.pmid;
        
        // Skip if we already have summary for this article
        if (!articleSummaries[pmid] && !loadedSummaries.has(pmid)) {
          setLoadedSummaries(prev => new Set([...prev, pmid]));
          
          try {
            // Add a small delay to stagger requests
            await new Promise(resolve => setTimeout(resolve, index * 100));
            
            const summary = await apiClient.getSummary(pmid);
            
            // Store title
            if (summary.title) {
              setArticleTitles(prev => ({
                ...prev,
                [pmid]: summary.title
              }));
            }
            
            // Store summary
            const summaryText = summary.html || summary.summary_md || '';
            const takeawayText = summary.takeaway_md || '';
            
            if (summaryText || takeawayText) {
              setArticleSummaries(prev => ({
                ...prev,
                [pmid]: { summary: summaryText, takeaway: takeawayText }
              }));
            }
          } catch (error) {
            console.error(`Failed to load summary for PMID ${pmid}:`, error);
          }
        }
      });
    }
  }, [feedData?.results]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pb-20 safe-area-top safe-area-bottom">
        <header className="sticky top-0 bg-card border-b border-border z-10">
          <div className="px-4 py-2">
            <Logo size="sm" />
          </div>
        </header>
        <div className="flex items-center justify-center pt-20">
          <div className="text-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
            <p className="text-muted-foreground">Loading personalized feed...</p>
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  if (error) {
    console.error('Feed error details:', error);
    return (
      <div className="min-h-screen bg-background pb-20 safe-area-top safe-area-bottom">
        <header className="sticky top-0 bg-card border-b border-border z-10">
          <div className="px-4 py-2">
            <Logo size="sm" />
          </div>
        </header>
        <div className="flex items-center justify-center pt-20">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">Failed to load articles</p>
            <p className="text-xs text-red-600">{error instanceof Error ? error.message : 'Unknown error'}</p>
            <button onClick={() => refetch()} className="button-primary">
              Try Again
            </button>
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  const articles = feedData?.results || [];

  return (
    <div className="min-h-screen bg-background pb-20 safe-area-top safe-area-bottom">
      {/* Header */}
      <header className="sticky top-0 bg-card border-b border-border z-10">
        <div className="px-4 py-2">
          <Logo size="sm" />
          {feedData?.profile?.specialty && (
            <p className="text-xs text-muted-foreground mt-1">
              Personalized for {feedData.profile.specialty}
            </p>
          )}
        </div>
      </header>

      {/* Articles Feed */}
      <main className="px-4 pt-6 space-y-4">
        {articles.length > 0 ? (
          <>
            {articles.map((article) => {
              const enrichedArticle = {
                ...article,
                title: article.title || articleTitles[article.pmid] || `Article ${article.pmid}`,
                summary: articleSummaries[article.pmid]?.summary || article.summary,
                takeaway: articleSummaries[article.pmid]?.takeaway || article.takeaway
              };
              
              return (
                <ArticleCard
                  key={article.pmid}
                  article={enrichedArticle}
                  onLike={handleLike}
                  onDislike={handleDislike}
                  onSave={handleSave}
                  onShare={handleShare}
                  onLoadSummary={handleLoadSummary}
                  isLoadingSummary={summaryMutation.isPending && summaryMutation.variables === article.pmid}
                />
              );
            })}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">No articles found (Count: {articles.length})</p>
            <button onClick={() => refetch()} className="button-primary">
              Refresh
            </button>
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
};