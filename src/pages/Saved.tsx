import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Logo } from "@/components/Logo";
import { Search, Filter, Bookmark, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { apiClient } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface SavedArticle {
  pmid: string;
  title: string;
  takeaway_md: string;
  summary_md: string;
  ts: string;
}

export const Saved = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch saved articles
  const { data: savedData, isLoading, error } = useQuery({
    queryKey: ['saved'],
    queryFn: () => apiClient.getSavedArticles(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (pmid: string) => apiClient.deleteSavedArticle(pmid),
    onSuccess: () => {
      toast({ title: "Article removed from saved items" });
      queryClient.invalidateQueries({ queryKey: ['saved'] });
    },
    onError: () => {
      toast({ title: "Failed to remove article", variant: "destructive" });
    }
  });

  const handleDelete = (pmid: string) => {
    if (window.confirm('Remove this article from your saved items?')) {
      deleteMutation.mutate(pmid);
    }
  };

  const handleViewOnPubMed = (pmid: string) => {
    window.open(`https://pubmed.ncbi.nlm.nih.gov/${pmid}/`, '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pb-20 safe-area-top safe-area-bottom">
        <header className="sticky top-0 bg-card border-b border-border z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Logo size="sm" showText={false} />
              <h1 className="text-lg font-semibold">Saved Articles</h1>
            </div>
          </div>
        </header>
        <div className="flex items-center justify-center pt-20">
          <div className="text-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
            <p className="text-muted-foreground">Loading saved articles...</p>
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background pb-20 safe-area-top safe-area-bottom">
        <header className="sticky top-0 bg-card border-b border-border z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Logo size="sm" showText={false} />
              <h1 className="text-lg font-semibold">Saved Articles</h1>
            </div>
          </div>
        </header>
        <div className="flex items-center justify-center pt-20">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">Failed to load saved articles</p>
            <button onClick={() => window.location.reload()} className="button-primary">
              Try Again
            </button>
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  const articles = savedData?.items || [];

  return (
    <div className="min-h-screen bg-background pb-20 safe-area-top safe-area-bottom">
      {/* Header */}
      <header className="sticky top-0 bg-card border-b border-border z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="sm" showText={false} />
            <h1 className="text-lg font-semibold">Saved Articles ({articles.length})</h1>
          </div>
        </div>
      </header>

      <main className="px-4 space-y-4">
        {articles.length > 0 ? (
          articles.map((article) => (
            <article key={article.pmid} className="article-card">
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-foreground mb-2 line-clamp-2 leading-snug text-lg">
                      {article.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      PMID: {article.pmid} • Saved {new Date(article.ts).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                {article.takeaway_md && (
                  <div className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                    <div dangerouslySetInnerHTML={{ __html: article.takeaway_md }} />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleViewOnPubMed(article.pmid)}
                      className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                    >
                      <ExternalLink size={14} />
                      View on PubMed
                    </button>
                  </div>
                  
                  <button
                    onClick={() => handleDelete(article.pmid)}
                    className="action-button text-red-600 hover:text-red-700 hover:bg-red-50"
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="text-center py-20 max-w-sm mx-auto">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Bookmark size={24} className="text-muted-foreground" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              No saved articles yet
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Articles you save from the feed will appear here for easy access later
            </p>
            <button 
              onClick={() => navigate('/feed')}
              className="button-primary"
            >
              Browse Articles
            </button>
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
};