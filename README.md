# Refresh D Thai Spa - Website

A premium, responsive, and luxury-oriented website for **Refresh D Thai Spa**, a premier massage and wellness center located in Marathahalli, Bengaluru, Karnataka, India.

This project delivers a state-of-the-art web experience showcasing traditional therapies, signature spa packages, and an appointment booking application.

---

## 🌟 Key Features

- **Luxury Aesthetics**: Rich color palettes, smooth hover effects, custom cursor animations, elegant typography (Alex Brush, Cormorant, Plus Jakarta Sans), and subtle micro-animations.
- **Dual Themes**: Includes light mode (`index.html`) and dark mode (`index-dark.html`) homepage layouts.
- **Signature Service Pages**: 14 distinct service detail pages showcasing various treatments (Aroma, Balinese, Deep Tissue, Thai, Turkish Hammam, VVIP, etc.) with description, benefits, duration, and pricing.
- **Interactive Booking Form**: Direct appointment scheduling form with validation, service dropdown, datepicker, and time selector.
- **Contact & Map Integration**: Fully functional contact page with interactive, customized dark-themed embedded Google Maps pointing to the Marathahalli location.
- **Fully Responsive**: Optimized for desktop, tablet, and mobile screens.

---

## 📂 Project Directory Structure

```text
Refresh-D-Salon-and-Spa/
│
├── index.html                  # Main homepage (Light Theme)
├── index-dark.html             # Homepage (Dark Theme)
├── services.html               # Overview of all spa services
├── contact.html                # Contact page & location map
│
├── service-d-*.html            # Individual service detail pages (14 pages):
│   ├── service-d-aroma.html
│   ├── service-d-balinese.html
│   ├── service-d-candle.html
│   ├── service-d-couple.html
│   ├── service-d-deep-tissue.html
│   ├── service-d-four-hand.html
│   ├── service-d-lomi-lomi.html
│   ├── service-d-stone.html
│   ├── service-d-swedish.html
│   ├── service-d-thai.html
│   ├── service-d-turkish.html
│   ├── service-d-vip.html
│   ├── service-d-vvip.html
│   └── service-d-wine.html
│
├── assets/                     # Core design and styling assets
│   ├── css/                    # Custom stylesheets
│   ├── js/                     # Custom javascript logic
│   ├── images/                 # SVG icons, shapes, and branding assets
│   ├── spa-pictures/           # High-resolution premium images for treatments
│   └── vendors/                # External libraries & frameworks (Bootstrap, Owl Carousel, WOW.js, jQuery, etc.)
│
└── README.md                   # Project documentation (this file)
```

---

## 🛠️ Technologies Used

- **Core Structure & Logic**: HTML5, Vanilla JavaScript, jQuery
- **Styling & Frameworks**: Vanilla CSS3, Bootstrap 5.x
- **Typography & Icons**: Google Fonts, FontAwesome Icons, Custom SVG icon sets
- **Interactive Libraries**:
  - **WOW.js & Animate.css**: For smooth reveals and animations on scroll.
  - **Owl Carousel / Tiny Slider**: For high-performance sliders and carousels.
  - **Magnific Popup**: For responsive lightbox popups.
  - **jQuery UI Datepicker**: For smooth appointment date picking.
  - **Jarallax**: For parallax background scroll effects.

---

## 🚀 How to Run Locally

Since this is a static website, you do not need any build systems, compilers, or server-side runtimes to run it.

### Method 1: Directly Open in Browser
Simply double-click the `index.html` file or open it directly inside any browser (Chrome, Safari, Firefox, Edge).

### Method 2: Local HTTP Server (Recommended)
Running through a local web server ensures all paths, resources, and map assets resolve perfectly without origin restrictions.

- **Using VS Code Live Server**: Right-click `index.html` and select **"Open with Live Server"**.
- **Using Python**:
  ```bash
  python3 -m http.server 8000
  ```
  Then open [http://localhost:8000](http://localhost:8000) in your browser.
- **Using Node.js (`http-server`)**:
  ```bash
  npx http-server -p 8000
  ```

---

## 📍 Contact & Spa Details

- **Location**: 21/2, Main Road, Next to Indian Oil Petrol Bunk, Marathahalli, Bengaluru, KA 560037
- **Phone**: +91 83108 05129
- **Email**: customer.refresh@gmail.com
- **Timings**: Monday to Sunday: 10:00 AM – 8:00 PM
