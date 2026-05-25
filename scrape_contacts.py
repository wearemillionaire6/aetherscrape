import subprocess, json, sys, time, os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

API_KEY = os.getenv("FIRECRAWL_API_KEY")

if not API_KEY:
    print("⚠️  Warning: FIRECRAWL_API_KEY not found in environment variables or .env file.", file=sys.stderr)
    print("Please set the FIRECRAWL_API_KEY in your .env file or environment.", file=sys.stderr)


def scrape_gmaps(query):
    """Scrape Google Maps search for a business and extract contact info."""
    payload = {
        "url": f"https://www.google.com/maps/search/{query.replace(' ', '+')}",
        "formats": ["extract"],
        "extract": {
            "schema": {
                "type": "object",
                "properties": {
                    "businesses": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "name": {"type": "string"},
                                "address": {"type": "string"},
                                "phone": {"type": "string"},
                                "website": {"type": "string"},
                                "email": {"type": "string"},
                                "rating": {"type": "string"},
                                "total_reviews": {"type": "string"},
                                "category": {"type": "string"},
                                "hours": {"type": "string"}
                            }
                        }
                    }
                }
            },
            "prompt": "Extract ALL business listings. For EACH business get: name, full address, phone number (very important - extract the actual phone number shown), website URL (their actual site not google.com), email if shown, rating, total review count, business category, and business hours. Phone numbers are critical."
        },
        "waitFor": 5000
    }
    
    result = subprocess.run(
        ["curl", "-s", "-X", "POST", "https://api.firecrawl.dev/v1/scrape",
         "-H", f"Authorization: Bearer {API_KEY}",
         "-H", "Content-Type: application/json",
         "-d", json.dumps(payload)],
        capture_output=True, text=True, timeout=60
    )
    
    try:
        data = json.loads(result.stdout)
        return data.get("data", {}).get("extract", {}).get("businesses", [])
    except:
        return []

# Searches to run - specific areas + categories
searches = [
    # Salons
    ("salons in Andheri West Mumbai", "Salon", "Andheri West"),
    ("salons in Andheri East Mumbai", "Salon", "Andheri East"),
    ("beauty salon in Bandra West Mumbai", "Salon", "Bandra West"),
    ("salons in Malad West Mumbai", "Salon", "Malad West"),
    ("salons in Borivali West Mumbai", "Salon", "Borivali West"),
    # Gyms
    ("gym fitness center Andheri Mumbai", "Gym", "Andheri"),
    ("gym fitness center Borivali Mumbai", "Gym", "Borivali"),
    # Spas
    ("spa massage Lower Parel Mumbai", "Spa", "Lower Parel"),
    ("spa massage Andheri Mumbai", "Spa", "Andheri"),
    # Yoga
    ("yoga studio classes Borivali Mumbai", "Yoga", "Borivali"),
    ("yoga studio classes Andheri Mumbai", "Yoga", "Andheri"),
    # Clinics
    ("dental clinic Andheri Mumbai", "Dental Clinic", "Andheri"),
    ("skin clinic dermatologist Bandra Mumbai", "Skin Clinic", "Bandra"),
    # Pet
    ("pet grooming pet salon Mumbai", "Pet Grooming", "Various"),
    # Physio
    ("physiotherapy clinic Mumbai Andheri", "Physiotherapy", "Andheri"),
]

all_leads = []

for i, (query, category, area) in enumerate(searches):
    print(f"\n[{i+1}/{len(searches)}] Scraping: {query}", file=sys.stderr)
    businesses = scrape_gmaps(query)
    for b in businesses:
        b["search_category"] = category
        b["search_area"] = area
        # Mark if no website
        website = b.get("website", "")
        has_own_site = bool(website) and "google.com" not in website and website.strip() != ""
        b["has_own_website"] = has_own_site
    all_leads.extend(businesses)
    print(f"  Got {len(businesses)} results", file=sys.stderr)
    time.sleep(0.5)  # Rate limiting

# Output all leads as JSON
print(json.dumps(all_leads, indent=2, ensure_ascii=False))
