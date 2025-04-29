
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Download, RefreshCcw, QrCode } from "lucide-react";

const QRCodeGenerator = () => {
  const [url, setUrl] = useState("https://partnercabinet.ru/?ref=partner123");
  const [color, setColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [size, setSize] = useState("200");
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrImageUrl, setQrImageUrl] = useState("");
  const { toast } = useToast();

  const generateQR = async () => {
    setIsGenerating(true);
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you'd make an API call to generate the QR code
      // For now, we'll use a third-party service
      const encodedUrl = encodeURIComponent(url);
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodedUrl}&size=${size}x${size}&color=${color.replace('#', '')}&bgcolor=${backgroundColor.replace('#', '')}`;
      
      setQrImageUrl(qrUrl);
      
      toast({
        title: "QR-код сгенерирован",
        description: "Теперь вы можете скачать его или поделиться ссылкой.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось сгенерировать QR-код. Пожалуйста, попробуйте еще раз.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQR = () => {
    if (!qrImageUrl) return;
    
    // Create an anchor element and trigger download
    const link = document.createElement("a");
    link.href = qrImageUrl;
    link.download = `qrcode-${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "QR-код скачан",
      description: "QR-код сохранен на ваше устройство.",
    });
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center">
          <QrCode className="mr-2" size={24} />
          Генератор QR-кодов
        </CardTitle>
        <CardDescription>
          Создавайте персонализированные QR-коды для привлечения новых клиентов
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">URL для QR-кода</Label>
              <Input 
                id="url" 
                placeholder="https://example.com/?ref=your_ref_id" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Ссылка, на которую будет перенаправлен пользователь при сканировании QR-кода
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="color">Цвет QR</Label>
                <div className="flex">
                  <Input 
                    id="color" 
                    type="color" 
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-12 p-1 h-10"
                  />
                  <Input 
                    type="text" 
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="flex-1 ml-2"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="backgroundColor">Цвет фона</Label>
                <div className="flex">
                  <Input 
                    id="backgroundColor" 
                    type="color" 
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-12 p-1 h-10"
                  />
                  <Input 
                    type="text" 
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="flex-1 ml-2"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="size">Размер (пикселей)</Label>
              <Select
                value={size}
                onValueChange={setSize}
              >
                <SelectTrigger id="size">
                  <SelectValue placeholder="Выберите размер" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100">100 x 100</SelectItem>
                  <SelectItem value="200">200 x 200</SelectItem>
                  <SelectItem value="300">300 x 300</SelectItem>
                  <SelectItem value="400">400 x 400</SelectItem>
                  <SelectItem value="500">500 x 500</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="pt-4 flex space-x-2">
              <Button 
                onClick={generateQR} 
                disabled={isGenerating || !url}
                className="w-full bg-brand-purple hover:bg-brand-purple-dark flex-1"
              >
                {isGenerating ? (
                  <>
                    <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                    Генерация...
                  </>
                ) : qrImageUrl ? (
                  <>
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Обновить QR
                  </>
                ) : (
                  <>
                    <QrCode className="mr-2 h-4 w-4" />
                    Создать QR
                  </>
                )}
              </Button>
              
              {qrImageUrl && (
                <Button 
                  variant="outline" 
                  onClick={downloadQR}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Скачать
                </Button>
              )}
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center p-4 border rounded-md bg-gray-50">
            {qrImageUrl ? (
              <div className="text-center">
                <img 
                  src={qrImageUrl} 
                  alt="QR Code" 
                  className="mx-auto max-w-full"
                />
                <p className="text-sm text-muted-foreground mt-4">
                  QR-код для: {url.length > 30 ? `${url.substring(0, 30)}...` : url}
                </p>
              </div>
            ) : (
              <div className="text-center p-8">
                <QrCode size={100} className="mx-auto text-gray-300" />
                <p className="text-muted-foreground mt-4">
                  Заполните форму и нажмите "Создать QR", чтобы сгенерировать QR-код
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRCodeGenerator;
