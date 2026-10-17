import os

os.makedirs('public/logos', exist_ok=True)

svgs = {
    'deloitte.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 80" fill="none">
  <text x="10" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="52" fill="#0d0d0d" letter-spacing="-1.5">Deloitte<tspan fill="#86BC25">.</tspan></text>
</svg>''',
    'sql.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none">
  <rect width="128" height="128" rx="24" fill="#00758F" fill-opacity="0.12"/>
  <ellipse cx="64" cy="34" rx="42" ry="16" fill="#00758F"/>
  <path d="M22 34v60c0 8.8 18.8 16 42 16s42-7.2 42-16V34" stroke="#00758F" stroke-width="8" stroke-linecap="round"/>
  <path d="M22 54c0 8.8 18.8 16 42 16s42-7.2 42-16M22 74c0 8.8 18.8 16 42 16s42-7.2 42-16" stroke="#F29111" stroke-width="8" stroke-linecap="round"/>
</svg>''',
    'xgboost.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none">
  <rect width="128" height="128" rx="24" fill="#0E2B44"/>
  <path d="M34 38 L64 64 L34 90" stroke="#FF6B35" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M94 38 L64 64 L94 90" stroke="#00B4D8" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="64" cy="64" r="8" fill="#FFFFFF"/>
</svg>''',
    'chromadb.svg': '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none">
  <rect width="128" height="128" rx="24" fill="#111111"/>
  <circle cx="48" cy="48" r="20" fill="#FF5E62"/>
  <circle cx="80" cy="52" r="18" fill="#FF9966"/>
  <circle cx="64" cy="82" r="22" fill="#38EF7D"/>
</svg>'''
}

for name, code in svgs.items():
    with open(os.path.join('public/logos', name), 'w', encoding='utf-8') as f:
        f.write(code)

print("Created logos successfully.")
