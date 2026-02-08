import QRCode from 'qrcode'
import { APP_VERSION } from './version.js'

// DOM элементы
const textInput = document.getElementById('text-input')
const sizeSelect = document.getElementById('size-select')
const colorInput = document.getElementById('color-input')
const generateBtn = document.getElementById('generate-btn')
const qrcodeDiv = document.getElementById('qrcode')
const resultContainer = document.getElementById('result-container')
const downloadPngBtn = document.getElementById('download-png')
const downloadSvgBtn = document.getElementById('download-svg')
const versionDisplay = document.getElementById('version-display')

// Устанавливаем версию в элемент отображения
if (versionDisplay) {
  versionDisplay.textContent = `v${APP_VERSION}`
}

// Генерация QR-кода
async function generateQRCode() {
  const text = textInput.value.trim()
  const size = parseInt(sizeSelect.value)
  const color = colorInput.value

  if (!text) {
    alert('Пожалуйста, введите текст или URL')
    return
  }

  try {
    // Очищаем предыдущий QR-код
    qrcodeDiv.innerHTML = ''

    // Создаем canvas элемент для отрисовки QR-кода
    const canvas = document.createElement('canvas')
    qrcodeDiv.appendChild(canvas)

    // Генерируем новый QR-код
    await QRCode.toCanvas(canvas, text, {
      width: size,
      height: size,
      color: {
        dark: color, // цвет темных пикселей
        light: '#FFFFFF' // цвет светлых пикселей
      }
    })

    // Показываем результат
    resultContainer.classList.add('active')
  } catch (error) {
    console.error(error)
    alert('Ошибка при генерации QR-кода')
  }
}

// Скачивание PNG
function downloadPNG() {
  const canvas = qrcodeDiv.querySelector('canvas')
  if (!canvas) return

  const link = document.createElement('a')
  link.download = 'qrcode.png'
  link.href = canvas.toDataURL('image/png')
  link.click()
}

// Скачивание SVG
async function downloadSVG() {
  const text = textInput.value.trim()
  const size = parseInt(sizeSelect.value)
  const color = colorInput.value

  if (!text) return

  try {
    const svgData = await QRCode.toString(text, {
      type: 'svg',
      width: size,
      color: {
        dark: color,
        light: '#FFFFFF'
      }
    })

    const blob = new Blob([svgData], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.download = 'qrcode.svg'
    link.href = url
    link.click()

    // Освобождаем URL объект
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error(error)
    alert('Ошибка при создании SVG')
  }
}

// Обработчики событий
generateBtn.addEventListener('click', generateQRCode)
downloadPngBtn.addEventListener('click', downloadPNG)
downloadSvgBtn.addEventListener('click', downloadSVG)

// Генерация при нажатии Enter в поле ввода
textInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    generateQRCode()
  }
})