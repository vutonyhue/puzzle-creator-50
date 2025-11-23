import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, TrendingUp, Users, Sparkles } from 'lucide-react';

export const LeftSidebar = () => {
  return (
    <div className="space-y-4">
      {/* About Section */}
      <Card className="bg-card border-border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Info className="w-4 h-4 text-primary" />
            Về FUN Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-3">
          <p>✳️ F.U. Profile – Mạng Xã Hội Web3 Kết Hợp AI, Biến Mọi Thứ Thành Tài Sản Số</p>
          <p>F.U. Profile là một mạng xã hội Web3 và còn là một nền tảng sáng tạo, lưu trữ và giao dịch tài sản số phi tập trung, nơi mọi thông tin, tài sản kỹ thuật số và giá trị cá nhân được bảo toàn vĩnh viễn trên blockchain.</p>
          <p>…</p>
          <a 
            href="/about" 
            className="inline-block text-primary hover:text-primary/80 font-medium text-sm underline underline-offset-2"
          >
            Xem tiếp
          </a>
        </CardContent>
      </Card>

      {/* Trending Topics */}
      <Card className="bg-card border-border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Xu Hướng
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
            <p className="text-sm font-medium">#CryptoCommunity</p>
            <p className="text-xs text-muted-foreground">245 bài viết</p>
          </div>
          <div className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
            <p className="text-sm font-medium">#Blockchain</p>
            <p className="text-xs text-muted-foreground">189 bài viết</p>
          </div>
          <div className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
            <p className="text-sm font-medium">#Web3</p>
            <p className="text-xs text-muted-foreground">156 bài viết</p>
          </div>
        </CardContent>
      </Card>

      {/* Suggested Friends */}
      <Card className="bg-card border-border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            Gợi Ý Kết Bạn
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">Đăng nhập để xem gợi ý kết bạn</p>
        </CardContent>
      </Card>

      {/* Features */}
      <Card className="bg-card border-border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Tính Năng
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
            <p>Ví crypto tích hợp</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
            <p>Kiếm Camly Coin mỗi ngày</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
            <p>Kết nối cộng đồng Web3</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
