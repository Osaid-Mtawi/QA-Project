# 🧪 SQA Project – ToolShop Demo
# 📌 Project Overview
**Under the supervision of Dr. Mo'men Abu Ghazaleh**
## This project is a complete End-to-End (E2E) testing framework built using Playwright for the ToolShop Demo web application.
## This Project Was Fully Coded And Developed By
<a href="https://github.com/prog-momen"
   target="_blank"
   rel="noopener noreferrer">
 <h1>Mumen Hijazi 🔗</h1>
</a>

<a href="https://github.com/Osaid-Mtawi"
   target="_blank"
   rel="noopener noreferrer">
  <h1>Osaid Motawi 🔗</h1>
</a>

## The main goal of this project is to simulate real user behavior across the most important e-commerce flows such as:

User Registration & Login

Product Browsing & Details

Search & Sorting

Filtering (Price, Category, Brand)

Add to Cart & Remove from Cart

Session persistence across tests

All tests are designed following best practices in software testing, with a clean structure, reusability, and zero hard-coded credentials.

## 🎯 Testing Strategy & Workflow

The testing process follows a realistic user journey, exactly as a real customer would interact with the system:

User Registration

A new user is created dynamically.

Credentials are generated automatically.

Email & password are saved securely into .env.

Authentication

Login tests use credentials from .env.

Invalid login scenarios are also tested.

Session is stored using storageState.json for reuse.

Product Exploration

Products are loaded from the listing page.

Product details page is validated (name, price, add-to-cart).

Search & Sorting

Search functionality is tested using keywords.

Sorting is tested (A–Z, Price High → Low).

Filtering

Price Range filter (slider from 1 to 200).

Category filter (checkbox-based).

Brand filter (checkbox-based).

Each filter ensures results are updated correctly.

Cart Operations

Add product to cart from product details page.

Remove product from cart.

Validate cart state (empty / has items).

All tests are independent, repeatable, and cross-browser (Chromium & Firefox).

# 🧱 Project Structure
```
├── pages/
│   ├── auth/
│   │   ├── LoginPage.ts
│   │   └── RegisterPage.ts
│   ├── cart/
│   │   └── CartPage.ts
│   └── products/
│       ├── ProductsPage.ts
│       └── ProductDetailsPage.ts
│
├── tests/
│   ├── auth/
│   │   ├── auth.setup.spec.ts
│   │   ├── login.spec.ts
│   │   └── register.spec.ts
│   ├── cart/
│   │   ├── add-to-cart.spec.ts
│   │   └── remove-from-cart.spec.ts
│   ├── filters/
│   │   ├── price-range.spec.ts
│   │   ├── category.spec.ts
│   │   └── brand.spec.ts
│   └── products/
│       ├── product.details.spec.ts
│       ├── search.spec.ts
│       └── sort.spec.ts
│
├── utils/
│   └── testUser.ts
│
├── playwright.config.ts
├── .env.example
└── README.md
```
# 🧩 Architecture Design

Page Object Model (POM)
Each page has its own class encapsulating locators and actions.

Zero Hardcoded Credentials
All sensitive data is managed via environment variables.

Reusable Components
Pages and methods are reused across multiple tests.

Stable Selectors Strategy
Locators are designed to survive UI changes.

Cross-Browser Execution
Tests run on Chromium & Firefox.

▶️ How to Run the Project
1️⃣ Install 
```
npm install
```
2️⃣ Setup Environment Variables
```
cp .env.example .env
```

**⚠️ .env is ignored by Git and must NOT be committed.**

3️⃣ Run Authentication Setup (Optional but Recommended)
```
npx playwright test tests/auth/auth.setup.spec.ts
```
4️⃣ Run All Tests
```
npx playwright test --headed
```
5️⃣ Run Specific Test Suites
```
npx playwright test tests/cart
```
```
npx playwright test tests/filters
```
```
npx playwright test tests/products
```
# ⭐ What Makes This Project Unique

## ✅ Dynamic User Creation
Users are created automatically during test execution.

## ✅ Secure Credential Handling
Credentials are never hardcoded or exposed.

## ✅ Realistic User Flow
Tests follow real customer behavior, not isolated actions.

## ✅ Advanced UI Interaction
Price range slider is tested using mouse drag logic.

## ✅ High Stability
Fallbacks and waits are implemented to handle SPA behavior.

## ✅ Clean & Scalable Structure
Easy to extend with new test cases or features.

## ✅ Academic + Industry Ready
Meets university requirements while following real industry standards.

## 🏁 Conclusion

This project demonstrates a professional-level E2E testing solution using Playwright, combining:

Clean architecture

Robust test coverage

Security awareness

Real-world testing scenarios

It can be easily extended to support CI/CD pipelines and additional features.

# 🔥 This is not just a test project — it’s a production-ready testing framework.