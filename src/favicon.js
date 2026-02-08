// Функция для генерации favicon
function generateFavicon() {
  // Создаем временный canvas элемент
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  
  // Задний фон (белый)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 32, 32);
  
  // Квадрат QR-кода (черный)
  ctx.fillStyle = '#000000';
  // Рисуем упрощенный QR-код
  ctx.fillRect(4, 4, 8, 8);   // Верхний левый квадрат
  ctx.fillRect(20, 4, 8, 8);  // Верхний правый квадрат
  ctx.fillRect(4, 20, 8, 8);  // Нижний левый квадрат
  ctx.fillRect(20, 20, 8, 8); // Нижний правый квадрат
  
  // Центральный узор
  ctx.fillRect(12, 12, 8, 8);
  
  // Возвращаем Data URL
  return canvas.toDataURL('image/png');
}

// Функция для установки favicon
function setFavicon() {
  const faviconUrl = generateFavicon();
  
  // Удаляем старый favicon, если он есть
  const oldFavicon = document.querySelector('link[rel="icon"]');
  if (oldFavicon) {
    oldFavicon.remove();
  }
  
  // Создаем новый элемент link для favicon
  const link = document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'icon';
  link.href = faviconUrl;
  document.head.appendChild(link);
}

// Устанавливаем favicon при загрузке
document.addEventListener('DOMContentLoaded', setFavicon);