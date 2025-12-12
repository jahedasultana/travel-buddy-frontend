# Travel Buddy Frontend

**Live Demo:** [Add your live URL here]

The **Travel Buddy Frontend** is a modern, responsive, and interactive web application built with Next.js and TailwindCSS. It allows users to explore travel plans, join trips, leave reviews, and manage their profile seamlessly.

---

## Features

- **Explore Travel Plans:** Filter by destination, travel type, date range, and budget.  
- **Travel Plan Details:** View plan details, host information, and join requests.  
- **Real-time Search & Filters:** Search and filter plans dynamically without page reloads.  
- **Join Requests:** Send join requests to travel plans and view request status.  
- **User Reviews:** Leave and view reviews after completing trips.  
- **Dashboard:** View personal travel plans, join requests, and submitted reviews.  
- **Responsive Design:** Fully mobile-friendly with modern UI components.  
- **Interactive UI:** Uses ShadCN UI, Lucide icons, and TailwindCSS for a polished user experience.
- **Subscription system:** Monthly and yearly subscription system using stripe.

---

## Technology Stack

- **Framework:** Next.js 14 (App Router)  
- **Language:** TypeScript  
- **UI & Styling:** TailwindCSS, ShadCN UI, Lucide Icons  
- **State & Data Fetching:** React hooks, Server Actions, SWR (optional)  
- **Authentication:** JWT-based authentication (connected to backend)  
- **API:** REST APIs to interact with backend services (Travel Plans, Join Requests, Reviews)  

---

## Setup & Usage

### Prerequisites
- Node.js v20+  
- npm or yarn  
- Access to backend API server  

### Installation

1. Clone the repository:
```bash
git clone <frontend-repo-url>
cd travel-buddy-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Install dependencies:
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

4. Start the development server:
```bash
npm run dev
```

5. Open in browser:
```bash
http://localhost:3000
```

6. Build for Production
```bash
npm run build
npm run start
```


/src
  /app
    /explore          # Explore page
    /travel-plans     # Travel plan details page
    /user/dashboard   # User dashboard pages
  /components
    /shared           # Reusable components (cards, tables, buttons)
    /ui               # ShadCN UI wrappers
  /services           # API calls
  /lib 