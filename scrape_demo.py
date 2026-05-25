import os
from dotenv import load_dotenv
from scrapegraphai.graphs import SmartScraperGraph

# Load API keys from .env file
load_dotenv()

# Check if Gemini API key or OpenAI API key is set
api_key = os.getenv("GEMINI_API_KEY") or os.getenv("OPENAI_API_KEY")
provider = "google" if os.getenv("GEMINI_API_KEY") else "openai"
model_name = "gemini-1.5-flash" if provider == "google" else "gpt-4o-mini"

if not api_key:
    print("⚠️  Warning: No API key found in env. Please set GEMINI_API_KEY or OPENAI_API_KEY.")
    print("Defaulting config to expect keys in your environment variables.")

# 1. Define the configuration for ScrapeGraphAI
graph_config = {
    "llm": {
        "api_key": api_key,
        "model": f"{provider}/{model_name}" if provider == "google" else f"{provider}/{model_name}",
    },
    "verbose": True,
    "headless": True, # Runs the browser in headless mode (no UI)
}

# 2. Define the source and prompt
# We will scrape a simple page as a test
prompt = "List all features or sections on this page with their titles and brief descriptions."
source_url = "https://example.com"

print(f"🚀 Initializing SmartScraperGraph...")
print(f"Using Provider: {provider} | Model: {model_name}")
print(f"Target URL: {source_url}")

# 3. Create the scraping graph
smart_scraper_graph = SmartScraperGraph(
    prompt=prompt,
    source=source_url,
    config=graph_config
)

# 4. Run the scraper
try:
    print("\n⏳ Running scraping pipeline (this will launch a browser, fetch HTML, and analyze with LLM)...")
    result = smart_scraper_graph.run()
    
    print("\n✅ Scraping Completed Successfully! Structured output:")
    import json
    print(json.dumps(result, indent=2))
except Exception as e:
    print(f"\n❌ Error running scraper: {e}")
    print("\nEnsure you have set the correct API key in a `.env` file or export it in your shell.")
