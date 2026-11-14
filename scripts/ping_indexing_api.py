import requests
import json

sitemap_url = "https://www.wanderwithakhi.com/sitemap-index.xml"

# IndexNow API ping (bing / yandex / indexnow compliant search engines)
indexnow_url = "https://api.indexnow.org/indexnow"
data = {
    "host": "www.wanderwithakhi.com",
    "key": "wanderwithakhikey123",
    "keyLocation": "https://www.wanderwithakhi.com/wanderwithakhikey123.txt",
    "urlList": [
        "https://www.wanderwithakhi.com/",
        "https://www.wanderwithakhi.com/guide/",
        "https://www.wanderwithakhi.com/destinations/",
        "https://www.wanderwithakhi.com/blog/travel/200-hour-yoga-teacher-training-goa-guide/",
        "https://www.wanderwithakhi.com/blog/travel/sampoorna-yoga-vs-kranti-yoga-goa/",
        "https://www.wanderwithakhi.com/blog/travel/best-yoga-retreats-in-goa-2026/",
        "https://www.wanderwithakhi.com/blog/travel/north-goa-vs-south-goa-yoga-guide/",
        "https://www.wanderwithakhi.com/blog/travel/cost-of-yoga-teacher-training-goa/",
        "https://www.wanderwithakhi.com/blog/travel/south-goa-vs-north-goa-slow-travel/",
        "https://www.wanderwithakhi.com/blog/travel/quiet-yoga-retreats-in-goa/",
        "https://www.wanderwithakhi.com/blog/wellness/digital-detox-retreat-goa/",
        "https://www.wanderwithakhi.com/blog/travel/goa-monsoon-wellness-retreats/",
        "https://www.wanderwithakhi.com/blog/wellness/plant-based-vegan-cafes-goa/",
        "https://www.wanderwithakhi.com/blog/mindfulness/sankhya-philosophy-tattvas/",
        "https://www.wanderwithakhi.com/blog/mindfulness/headstand-injury-risks/",
        "https://www.wanderwithakhi.com/blog/mindfulness/trataka-candle-gazing-benefits/",
        "https://www.wanderwithakhi.com/blog/mindfulness/noble-silence-retreat-benefits/",
        "https://www.wanderwithakhi.com/blog/mindfulness/hands-on-adjustments-yoga-consent/"
    ]
}

try:
    response = requests.post(indexnow_url, json=data, headers={"Content-Type": "application/json"})
    print(f"IndexNow Ping Response Status: {response.status_code}")
except Exception as e:
    print(f"IndexNow ping failed: {e}")
