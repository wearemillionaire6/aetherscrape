# AetherScrape & Mumbai Business Leads Pipeline

An AI-powered web scraping and automation toolkit. This repository contains data collection pipelines (focusing on local businesses in Mumbai) and the structural architecture for **AetherScrape**—a conceptual self-healing, agentic web scraping engine.

---

## 🚀 Features

1. **AetherScrape Architecture (`aetherscrape_architecture.py`):**
   * A simulated blueprint of a next-generation scraping engine that combines Crawl4AI's stealth/concurrency, Skyvern's vision-guided interactions, and ScrapeGraphAI's semantic schema parsing.
   * Features a **self-healing selector cache** that maps elements on a first run (using an LLM) and executes at maximum speed via native CSS selectors on subsequent runs.
   
2. **Mumbai Lead Generation Pipelines (`create_clean_excel.py`, `scrape_contacts.py`):**
   * AI-driven contact extraction for small businesses (Salons, Spas, Gyms, Yoga, Driving Schools) without robust digital presences or appointment systems.
   * Generates highly formatted Excel spreadsheets optimized for cold calling workflows.

---

## 🛠️ Project Structure

* `aetherscrape_architecture.py` - Core simulation and architectural blueprint of the self-healing scraper.
* `scrape_demo.py` - ScrapeGraphAI test script using Playwright and LLM configurations.
* `create_clean_excel.py` - Generation script that formats scraped leads into a clean, single-sheet Excel workbook.
* `create_full_excel.py` - Generation script creating a multi-sheet tracking and category-wise workbook.
* `.gitignore` - Standard Python exclusion list.

---

## 💡 How AetherScrape Works (Architectural Flow)

1. **Stealth Headless Browser:** Launched with randomized user agents and behavioral emulation to avoid bot detection.
2. **Interaction Phase (Vision):** Leverages screenshots to navigate through popups, CAPTCHAs, or logins.
3. **Selector Induction:** Extracts data using LLMs on the first run, then reverse-engineers and caches the static CSS selectors.
4. **Self-Healing Run:** Direct CSS extraction executes on future runs (0 token cost). If selectors fail due to site updates, the LLM is triggered to automatically re-map and save the new path.

---

## 🚀 Advanced Scraper Engineering: Required Skills & Roadmap

To evolve AetherScrape from a prototype to a production-grade scraping pipeline, developers need specialized technical skills in the following areas:

### 1. HTTP Protocol & Network Engineering
* **TLS Fingerprint Spoofing (JA3/JA4):** Modern Web Application Firewalls (WAFs) block scrapers by inspecting their TLS handshake signature, even if headers are spoofed. Mastering how to change your TLS client profile is essential.
* **HTTP/2 and HTTP/3 Negotiation:** Ensuring browser requests mimic standard user clients (which default to HTTP/2/3).
* **Proxy Pool Routing & Session Sticky Management:** Implementing rotational logic across mobile and residential proxy gateways.

### 2. Low-Level DOM Parsing & Token Minimization
* **HTML Pruning & Tree Shaking:** Stripping structural noise (scripts, CSS blocks, metadata, SVGs) from the HTML document before feeding it to the LLM to minimize context token cost.
* **Semantic Chunking (BM25 / Cosine Similarity):** Using algorithms to score HTML elements for relevance, filtering out headers and footers while preserving content-rich blocks.

### 3. Dynamic Selector Induction & Reverse-Engineering
* **AST (Abstract Syntax Tree) Parsing:** Using Python's parser tools to trace dynamic layout patterns.
* **Robust Selector Synthesis:** Re-generating minimal, resilient CSS/XPath selectors from identified HTML nodes so they don't break with minor DOM changes.

### 4. Advanced Playwright & Browser Orchestration
* **Network Request Interception:** Hooking into browser requests to block expensive assets (images, fonts, ads) to speed up scraping.
* **Service Worker Manipulation:** Disabling or controlling caching workers to ensure clean browser states.

