
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Copy, Link as LinkIcon, RefreshCcw, CheckCircle } from "lucide-react";

const ReferralLinkGenerator = () => {
  const [baseUrl, setBaseUrl] = useState("https://partnercabinet.ru");
  const [refId, setRefId] = useState("partner123");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [activeTab, setActiveTab] = useState("standard");
  const { toast } = useToast();

  const generateLink = async () => {
    setIsGenerating(true);
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let link = "";
      
      switch (activeTab) {
        case "standard":
          link = `${baseUrl}/?ref=${refId}`;
          break;
        case "utm":
          link = `${baseUrl}/?utm_source=partner&utm_medium=referral&utm_campaign=${refId}`;
          break;
        case "custom":
          link = `${baseUrl}/r/${refId}`;
          break;
        default:
          link = `${baseUrl}/?ref=${refId}`;
      }
      
      setGeneratedLink(link);
      
      toast({
        title: "Ссылка сгенерирована",
        description: "Теперь вы можете скопировать её и поделиться.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось сгенерировать ссылку. Пожалуйста, попробуйте еще раз.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    if (!generatedLink) return;
    
    try {
      await navigator.clipboard.writeText(generatedLink);
      setIsCopied(true);
      
      toast({
        title: "Скопировано!",
        description: "Ссылка скопирована в буфер обмена.",
      });
      
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось скопировать ссылку.",
      });
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center">
          <LinkIcon className="mr-2" size={24} />
          Генератор реферальных ссылок
        </CardTitle>
        <CardDescription>
          Создавайте персонализированные реферальные ссылки для отслеживания конверсий
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="standard" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="standard">Стандартная</TabsTrigger>
            <TabsTrigger value="utm">С UTM-метками</TabsTrigger>
            <TabsTrigger value="custom">Короткая ссылка</TabsTrigger>
          </TabsList>
          
          <TabsContent value="standard" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="standard-base-url">Базовый URL</Label>
              <Input 
                id="standard-base-url" 
                placeholder="https://yourwebsite.com" 
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="standard-ref-id">Ваш реферальный ID</Label>
              <Input 
                id="standard-ref-id" 
                placeholder="your_ref_id" 
                value={refId}
                onChange={(e) => setRefId(e.target.value)}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="utm" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="utm-base-url">Базовый URL</Label>
              <Input 
                id="utm-base-url" 
                placeholder="https://yourwebsite.com" 
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="utm-campaign">Название кампании (utm_campaign)</Label>
              <Input 
                id="utm-campaign" 
                placeholder="campaign_name" 
                value={refId}
                onChange={(e) => setRefId(e.target.value)}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="custom" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="custom-base-url">Базовый URL</Label>
              <Input 
                id="custom-base-url" 
                placeholder="https://yourwebsite.com" 
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="custom-path">Короткий путь</Label>
              <Input 
                id="custom-path" 
                placeholder="custom_path" 
                value={refId}
                onChange={(e) => setRefId(e.target.value)}
              />
            </div>
          </TabsContent>
          
          <div className="pt-6">
            <Button 
              onClick={generateLink} 
              disabled={isGenerating || !baseUrl || !refId}
              className="w-full bg-brand-purple hover:bg-brand-purple-dark"
            >
              {isGenerating ? (
                <>
                  <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                  Генерация...
                </>
              ) : (
                <>
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Сгенерировать ссылку
                </>
              )}
            </Button>
          </div>
          
          {generatedLink && (
            <div className="mt-6 p-4 border rounded-lg bg-gray-50">
              <Label>Ваша реферальная ссылка:</Label>
              <div className="flex mt-2">
                <Input 
                  value={generatedLink}
                  readOnly
                  className="flex-1"
                />
                <Button 
                  variant="outline"
                  className="ml-2"
                  onClick={copyToClipboard}
                >
                  {isCopied ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Поделитесь этой ссылкой, чтобы привлекать новых клиентов и отслеживать конверсии
              </p>
            </div>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ReferralLinkGenerator;
