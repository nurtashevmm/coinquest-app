// src/dev-mock.ts

// Это строка, максимально похожая на то, что присылает реальный Telegram
export const mockTelegramData = {
  initData: new URLSearchParams({
    user: JSON.stringify({
      id: 999999,
      is_bot: false,
      first_name: 'Local',
      last_name: 'User',
      username: 'local_user',
      language_code: 'en',
      is_premium: true,
      allows_write_to_pm: true,
    }),
    chat_instance: '123456789',
    chat_type: 'sender',
    auth_date: String(Math.floor(Date.now() / 1000)),
    hash: 'mock_hash_string_for_dev_only'
  }).toString(),
  // Эти поля тоже нужны, чтобы SDK не ругался
  version: '6.9',
  platform: 'tdesktop',
  themeParams: {
      bg_color: '#212121',
      text_color: '#ffffff',
      hint_color: '#aaaaaa',
      link_color: '#8774e1',
      button_color: '#8774e1',
      button_text_color: '#ffffff',
      secondary_bg_color: '#0f0f0f',
  },
  // Имитируем методы
  ready: () => {},
  expand: () => {},
  // ... и так далее
};