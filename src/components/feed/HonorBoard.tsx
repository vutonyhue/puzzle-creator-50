import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';
import { Trophy, FileText, MessageCircle, ThumbsUp, Users, Coins } from 'lucide-react';

interface LeaderboardUser {
  id: string;
  username: string;
  avatar_url: string;
  posts_count: number;
  comments_count: number;
  reactions_count: number;
  friends_count: number;
  total_reward: number;
}

export const HonorBoard = () => {
  const navigate = useNavigate();
  const [topPosts, setTopPosts] = useState<LeaderboardUser[]>([]);
  const [topComments, setTopComments] = useState<LeaderboardUser[]>([]);
  const [topReactions, setTopReactions] = useState<LeaderboardUser[]>([]);
  const [topFriends, setTopFriends] = useState<LeaderboardUser[]>([]);
  const [topRewards, setTopRewards] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboards();
  }, []);

  const fetchLeaderboards = async () => {
    try {
      // Fetch top users by posts count
      const { data: postsData } = await supabase
        .from('posts')
        .select('user_id, profiles!inner(id, username, avatar_url)')
        .order('created_at', { ascending: false });

      // Fetch top users by comments count
      const { data: commentsData } = await supabase
        .from('comments')
        .select('user_id, profiles!inner(id, username, avatar_url)')
        .order('created_at', { ascending: false });

      // Fetch top users by reactions count
      const { data: reactionsData } = await supabase
        .from('reactions')
        .select('user_id, profiles!inner(id, username, avatar_url)')
        .order('created_at', { ascending: false });

      // Aggregate posts data
      const postsMap = new Map<string, LeaderboardUser>();
      postsData?.forEach((post: any) => {
        const profile = post.profiles;
        if (profile) {
          const existing = postsMap.get(profile.id) || {
            id: profile.id,
            username: profile.username,
            avatar_url: profile.avatar_url,
            posts_count: 0,
            comments_count: 0,
            reactions_count: 0,
            friends_count: 0,
            total_reward: 0,
          };
          existing.posts_count++;
          postsMap.set(profile.id, existing);
        }
      });

      // Aggregate comments data
      const commentsMap = new Map<string, LeaderboardUser>();
      commentsData?.forEach((comment: any) => {
        const profile = comment.profiles;
        if (profile) {
          const existing = commentsMap.get(profile.id) || {
            id: profile.id,
            username: profile.username,
            avatar_url: profile.avatar_url,
            posts_count: 0,
            comments_count: 0,
            reactions_count: 0,
            friends_count: 0,
            total_reward: 0,
          };
          existing.comments_count++;
          commentsMap.set(profile.id, existing);
        }
      });

      // Aggregate reactions data
      const reactionsMap = new Map<string, LeaderboardUser>();
      reactionsData?.forEach((reaction: any) => {
        const profile = reaction.profiles;
        if (profile) {
          const existing = reactionsMap.get(profile.id) || {
            id: profile.id,
            username: profile.username,
            avatar_url: profile.avatar_url,
            posts_count: 0,
            comments_count: 0,
            reactions_count: 0,
            friends_count: 0,
            total_reward: 0,
          };
          existing.reactions_count++;
          reactionsMap.set(profile.id, existing);
        }
      });

      // Convert to arrays and sort
      const topPostsUsers = Array.from(postsMap.values())
        .sort((a, b) => b.posts_count - a.posts_count)
        .slice(0, 5);
      
      const topCommentsUsers = Array.from(commentsMap.values())
        .sort((a, b) => b.comments_count - a.comments_count)
        .slice(0, 5);
      
      const topReactionsUsers = Array.from(reactionsMap.values())
        .sort((a, b) => b.reactions_count - a.reactions_count)
        .slice(0, 5);

      setTopPosts(topPostsUsers);
      setTopComments(topCommentsUsers);
      setTopReactions(topReactionsUsers);
      
      // For now, Friends and Rewards are placeholders (future implementation)
      setTopFriends([]);
      setTopRewards([]);
    } catch (error) {
      console.error('Error fetching leaderboards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  const renderTopUser = (user: LeaderboardUser | undefined, icon: any, label: string, count: number) => {
    if (!user) {
      return (
        <div 
          className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 flex-1">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20">
              {icon}
            </div>
            <div>
              <p className="text-sm font-medium">{label}</p>
              <p className="text-xs text-white/70">Chưa có dữ liệu</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">0</p>
          </div>
        </div>
      );
    }

    return (
      <div 
        onClick={() => handleUserClick(user.id)}
        className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Avatar className="w-10 h-10 border-2 border-white/30">
            <AvatarImage src={user.avatar_url} />
            <AvatarFallback className="text-xs bg-primary text-primary-foreground">
              {user.username?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user.username}</p>
            <p className="text-xs text-white/70">{label}</p>
          </div>
        </div>
        <div className="text-right ml-2">
          <p className="text-lg font-bold">{count}</p>
          <p className="text-xs text-white/70">TOP 1</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Honor Board */}
      <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-center text-lg font-bold flex items-center justify-center gap-2">
            <Trophy className="w-5 h-5" />
            HONOR BOARD
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pb-4">
          {renderTopUser(
            topPosts[0],
            <FileText className="w-5 h-5" />,
            "Posts",
            topPosts[0]?.posts_count || 0
          )}
          {renderTopUser(
            topComments[0],
            <MessageCircle className="w-5 h-5" />,
            "Comments",
            topComments[0]?.comments_count || 0
          )}
          {renderTopUser(
            topReactions[0],
            <ThumbsUp className="w-5 h-5" />,
            "Reacts",
            topReactions[0]?.reactions_count || 0
          )}
          {renderTopUser(
            topFriends[0],
            <Users className="w-5 h-5" />,
            "Friends",
            topFriends[0]?.friends_count || 0
          )}
          {renderTopUser(
            topRewards[0],
            <Coins className="w-5 h-5" />,
            "Reward",
            topRewards[0]?.total_reward || 0
          )}
        </CardContent>
      </Card>

      {/* Top Ranking */}
      <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-center text-lg font-bold">TOP RANKING</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 pb-4">
          {topPosts.slice(0, 10).map((user, index) => (
            <div
              key={user.id}
              onClick={() => handleUserClick(user.id)}
              className="flex items-center justify-between p-2 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex items-center gap-2 min-w-[60px]">
                  <Trophy className={`w-4 h-4 ${index === 0 ? 'text-yellow-300' : index === 1 ? 'text-gray-300' : index === 2 ? 'text-orange-300' : 'text-white'}`} />
                  <span className="text-sm font-bold">#{index + 1}</span>
                </div>
                <Avatar className="w-8 h-8 border-2 border-white/30">
                  <AvatarImage src={user.avatar_url} />
                  <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                    {user.username?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.username}</p>
                  <p className="text-xs text-white/70">Việt Nam</p>
                </div>
              </div>
              <div className="text-right ml-2">
                <p className="text-sm font-bold">{user.posts_count}</p>
                <p className="text-xs text-white/70">C</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
