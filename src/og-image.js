// Функция для генерации OG-изображения
function generateOGImage() {
  // Создаем canvas элемент большего размера для OG-изображения
  const canvas = document.createElement('canvas');
  // Стандартный размер для OG-изображений: 1200x630 пикселей
  canvas.width = 1200;
  canvas.height = 630;
  const ctx = canvas.getContext('2d');
  
  // Задний фон (светло-серый)
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#f0f0f0");
  gradient.addColorStop(1, "#e0e0e0");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Заголовок
  ctx.font = "bold 60px Arial";
  ctx.textAlign = "center";
  ctx.fillStyle = "#333";
  ctx.fillText("QR Code Generator", canvas.width / 2, 200);
  
  // Описание
  ctx.font = "28px Arial";
  ctx.fillStyle = "#666";
  ctx.fillText("Create QR codes directly in your browser", canvas.width / 2, 280);
  
  // QR-код в центре
  const qrSize = 200;
  const qrX = (canvas.width - qrSize) / 2;
  const qrY = 350;
  
  // Фон QR-кода (белый квадрат)
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(qrX, qrY, qrSize, qrSize);
  
  // Угловые квадраты QR-кода
  ctx.fillStyle = "#000000";
  // Верхний левый
  ctx.fillRect(qrX + 10, qrY + 10, 50, 50);
  ctx.fillRect(qrX + 10, qrY + 60, 10, 10);
  ctx.fillRect(qrX + 20, qrY + 60, 10, 10);
  ctx.fillRect(qrX + 60, qrY + 10, 10, 10);
  ctx.fillRect(qrX + 60, qrY + 20, 10, 10);
  
  // Верхний правый
  ctx.fillRect(qrX + qrSize - 60, qrY + 10, 50, 50);
  ctx.fillRect(qrX + qrSize - 60, qrY + 60, 10, 10);
  ctx.fillRect(qrX + qrSize - 50, qrY + 60, 10, 10);
  ctx.fillRect(qrX + qrSize - 10, qrY + 10, 10, 10);
  ctx.fillRect(qrX + qrSize - 10, qrY + 20, 10, 10);
  
  // Нижний левый
  ctx.fillRect(qrX + 10, qrY + qrSize - 60, 50, 50);
  ctx.fillRect(qrX + 10, qrY + qrSize - 10, 10, 10);
  ctx.fillRect(qrX + 20, qrY + qrSize - 10, 10, 10);
  ctx.fillRect(qrX + 60, qrY + qrSize - 60, 10, 10);
  ctx.fillRect(qrX + 60, qrY + qrSize - 50, 10, 10);
  
  // Центральный узор
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if ((i + j) % 2 === 0) {
        ctx.fillRect(qrX + 80 + i * 20, qrY + 80 + j * 20, 15, 15);
      }
    }
  }
  
  // Возвращаем Data URL
  return canvas.toDataURL('image/png');
}

// Функция для создания тега meta с OG-изображением
function setOGImage() {
  const ogImageUrl = generateOGImage();
  
  // Создаем или обновляем тег meta для og:image
  let ogImageTag = document.querySelector('meta[property="og:image"]');
  if (!ogImageTag) {
    ogImageTag = document.createElement('meta');
    ogImageTag.setAttribute('property', 'og:image');
    document.head.appendChild(ogImageTag);
  }
  ogImageTag.setAttribute('content', ogImageUrl);
  
  // Также обновляем twitter:image
  let twitterImageTag = document.querySelector('meta[property="twitter:image"]');
  if (!twitterImageTag) {
    twitterImageTag = document.createElement('meta');
    twitterImageTag.setAttribute('property', 'twitter:image');
    document.head.appendChild(twitterImageTag);
  }
  twitterImageTag.setAttribute('content', ogImageUrl);
}

// Устанавливаем OG-изображение при загрузке
document.addEventListener('DOMContentLoaded', setOGImage);