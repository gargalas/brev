import { useState } from "react";
import { Heart, ThumbsDown, Bookmark, Share2, Clock, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Article {
  pmid: string;
  title?: string;
  journal?: string;
  pub_date?: string;
  article_types?: string[];
  mesh_terms?: string[];
  score?: number;
  summary?: string;
  takeaway?: string;
}

interface ArticleCardProps {
  article: Article;
  onLike?: (id: string) => void;
  onDislike?: (id: string) => void;
  onSave?: (id: string) => void;
  onShare?: (id: string) => void;
  onLoadSummary?: (id: string) => void;
  isLoadingSummary?: boolean;
}

export const ArticleCard = ({ 
  article, 
  onLike, 
  onDislike, 
  onSave, 
  onShare,
  onLoadSummary,
  isLoadingSummary = false
}: ArticleCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const handleLike = () => {
    if (isDisliked) setIsDisliked(false);
    setIsLiked(!isLiked);
    onLike?.(article.pmid);
  };

  const handleDislike = () => {
    if (isLiked) setIsLiked(false);
    setIsDisliked(!isDisliked);
    onDislike?.(article.pmid);
  };

  const handleSave = async () => {
    setSaveLoading(true);
    try {
      await onSave?.(article.pmid);
      setIsSaved(true);
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleShare = () => {
    onShare?.(article.pmid);
  };

  return (
    <article className="article-card">
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          {article.article_types && article.article_types.length > 0 && (
            <span className="px-2 py-1 bg-primary-light text-primary rounded-full font-medium">
              {article.article_types[0]}
            </span>
          )}
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>PMID: {article.pmid}</span>
          </div>
        </div>

        <h3 className="font-display font-semibold text-foreground mb-3 line-clamp-2 leading-snug text-lg">
          {article.title || (
            <button 
              onClick={() => onLoadSummary?.(article.pmid)}
              className="text-muted-foreground hover:text-primary transition-colors text-left"
            >
              Click to load title - PMID: {article.pmid}
            </button>
          )}
        </h3>
        
        {article.takeaway ? (
          <div className="text-muted-foreground mb-4 leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: article.takeaway }} />
          </div>
        ) : article.summary ? (
          <div className="text-muted-foreground mb-4 leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: article.summary }} />
          </div>
        ) : (
          <div className="mb-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Loading summary...</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User size={14} />
            <span>{article.journal || 'Unknown Journal'}</span>
            <span>•</span>
            <span>{article.pub_date || 'Unknown Date'}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleLike}
              className={cn(
                "action-button",
                isLiked && "liked"
              )}
              aria-label="Like article"
            >
              <Heart 
                size={18} 
                className={isLiked ? "fill-current" : ""} 
              />
            </button>

            <button
              onClick={handleDislike}
              className={cn(
                "action-button",
                isDisliked && "text-muted-foreground bg-muted"
              )}
              aria-label="Dislike article"
            >
              <ThumbsDown 
                size={18} 
                className={isDisliked ? "fill-current" : ""} 
              />
            </button>

            <button
              onClick={handleSave}
              disabled={saveLoading}
              className={cn(
                "action-button",
                isSaved && "saved",
                saveLoading && "opacity-50"
              )}
              aria-label="Save article"
            >
              {saveLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Bookmark 
                  size={18} 
                  className={isSaved ? "fill-current" : ""} 
                />
              )}
            </button>

            <button
              onClick={handleShare}
              className="action-button"
              aria-label="Share article"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};