import requests
import json

sitemap_url = "https://wanderwithakhi.com/sitemap-index.xml"

# IndexNow API ping (bing / yandex / indexnow compliant search engines)
indexnow_url = "https://api.indexnow.org/indexnow"
data = {
    "host": "wanderwithakhi.com",
    "key": "wanderwithakhikey123",
    "keyLocation": "https://wanderwithakhi.com/wanderwithakhikey123.txt",
    "urlList": [
        "https://wanderwithakhi.com/",
        "https://wanderwithakhi.com/guide/",
        "https://wanderwithakhi.com/destinations/",
        "https://wanderwithakhi.com/blog/travel/south-goa-vs-north-goa-slow-travel/",
        "https://wanderwithakhi.com/blog/travel/quiet-yoga-retreats-in-goa/",
        "https://wanderwithakhi.com/blog/wellness/digital-detox-retreat-goa/",
        "https://wanderwithakhi.com/blog/travel/goa-monsoon-wellness-retreats/",
        "https://wanderwithakhi.com/blog/wellness/plant-based-vegan-cafes-goa/",
        "https://wanderwithakhi.com/blog/mindfulness/sankhya-philosophy-tattvas/",
        "https://wanderwithakhi.com/blog/mindfulness/headstand-injury-risks/",
        "https://wanderwithakhi.com/blog/mindfulness/trataka-candle-gazing-benefits/",
        "https://wanderwithakhi.com/blog/mindfulness/noble-silence-retreat-benefits/",
        "https://wanderwithakhi.com/blog/mindfulness/hands-on-adjustments-yoga-consent/"
    ]
}

try:
    response = requests.post(indexnow_url, json=data, headers={"Content-Type": "application/json"})
    print(f"IndexNow Ping Response Status: {response.status_code}")
except Exception as e:
    print(f"IndexNow ping failed: {e}")
