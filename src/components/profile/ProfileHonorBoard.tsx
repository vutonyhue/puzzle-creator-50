// src/components/profile/ProfileHonorBoard.tsx
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

interface UserStats {
  posts_count: number;
  comments_count: number;
  reactions_count: number;
  friends_count: number;
  total_reward: number;
}

interface ProfileHonorBoardProps {
  userId: string;
  username: string;
  avatarUrl?: string;
  isDemo?: boolean;
}

export const ProfileHonorBoard = ({ 
  userId, 
  username,
  avatarUrl,
  isDemo = false 
}: ProfileHonorBoardProps) => {
  const [stats, setStats] = useState<UserStats>({
    posts_count: 0,
    comments_count: 0,
    reactions_count: 0,
    friends_count: 0,
    total_reward: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDemo) {
      setTimeout(() => {
        setStats({
          posts_count: 1000,
          comments_count: 2000,
          reactions_count: 5000,
          friends_count: 5000,
          total_reward: 9999999,
        });
        setLoading(false);
      }, 800);
      return;
    }

    fetchUserStats();
  }, [userId, isDemo]);

  const fetchUserStats = async () => {
    try {
      const [
        { count: postsCount },
        { count: commentsCount },
        { count: reactionsCount },
        { count: friendsCount },
      ] = await Promise.all([
        supabase.from('posts').select('*', { count: 'exact', head: true }).eq('user_id', userId),
        supabase.from('comments').select('*', { count: 'exact', head: true }).eq('user_id', userId),
        supabase.from('reactions').select('*', { count: 'exact', head: true }).eq('user_id', userId),
        supabase.from('friendships').select('*', { count: 'exact', head: true })
          .or(`user_id.eq.${userId},friend_id.eq.${userId}`)
          .eq('status', 'accepted'),
      ]);

      setStats({
        posts_count: postsCount || 0,
        comments_count: commentsCount || 0,
        reactions_count: reactionsCount || 0,
        friends_count: friendsCount || 0,
        total_reward: 9999999, // Sẽ thay bằng công thức thật sau
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Skeleton className="h-[720px] w-80 rounded-3xl" />;
  }

  return (
    <div className="fixed right-4 top-20 z-50 hidden lg:block">
      <div className="relative w-80 h-[720px] rounded-3xl overflow-hidden shadow-2xl">
        
        {/* ẢNH NỀN – DÙNG ẢNH 2 CỦA CON */}
        <img 
          src="/honor-board-bg.jpg" 
          alt="Honor Board Background" 
          className="w-full h-full object-cover"
        />

        {/* CHỒNG SỐ + AVATAR + TÊN USER */}
        <div className="absolute inset-0 pointer-events-none">

          {/* AVATAR – VỊ TRÍ CHUẨN THEO ẢNH */}
          <div className="absolute top-[90px] right-[30px]">
            <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-yellow-400 shadow-xl">
              <Avatar className="w-full h-full">
                <AvatarImage src={isDemo ? "/lovable-avatar.jpg" : avatarUrl} />
                <AvatarFallback className="bg-yellow-500 text-black font-bold text-lg">
                  {username?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* TÊN USER – VỊ TRÍ CHUẨN */}
          <div className="absolute top-[85px] left-[40px] right-[100px] text-left">
            <h2 className="text-2xl font-black text-yellow-400 tracking-widest drop-shadow-lg">
              {username.toUpperCase()}
            </h2>
          </div>

          {/* SỐ LIỆU – CHỒNG LÊN VỊ TRÍ TRỐNG TRONG ẢNH 2 */}
          <div className="absolute top-[230px] left-0 right-0 space-y-16 px-8">

            {/* POSTS */}
            <div className="text-right pr-8">
              <span className="text-4xl font-black text-white drop-shadow-2xl">
                {stats.posts_count.toLocaleString()}
              </span>
            </div>

            {/* COMMENTS */}
            <div className="text-right pr-8">
              <span className="text-4xl font-black text-white drop-shadow-2xl">
                {stats.comments_count.toLocaleString()}
              </span>
            </div>

            {/* REACTIONS */}
            <div className="text-right pr-8">
              <span className="text-4xl font-black text-white drop-shadow-2xl">
                {stats.reactions_count.toLocaleString()}
              </span>
            </div>

            {/* FRIENDS */}
            <div className="text-right pr-8">
              <span className="text-4xl font-black text-white drop-shadow-2xl">
                {stats.friends_count.toLocaleString()}
              </span>
            </div>

            {/* TOTAL REWARD – SIÊU TO, CĂN GIỮA */}
            <div className="text-center mt-8">
              <span className="text-5xl font-black bg-gradient-to-r from-rose-500 via-red-500 to-amber-500 bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
                {stats.total_reward.toLocaleString()}
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
