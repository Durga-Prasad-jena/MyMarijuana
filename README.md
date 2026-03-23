# Modern Admin Dashboard - Next.js 15

A modern, responsive admin dashboard built with **Next.js 15.0.0**, **React 18**, **TypeScript 5.2**, and **Material-UI (MUI) v5**.

## 🚀 **Framework & Dependencies**

- **Next.js**: 15.0.0 (Latest)
- **React**: 18.2.0
- **TypeScript**: 5.2.0
- **Material-UI**: v5.14.0+
- **MUI X Components**: Date Pickers v6, TreeView v8
- **Emotion**: v11.11.0 for styling
- **Redux Toolkit**: State management

Theme Demo Link: [https://modernize-nextjs.adminmart.com/dashboards/modern](https://modernize-nextjs.adminmart.com/dashboards/modern)

## 🎉 **Recent Updates (Next.js 15 Migration)**

This project has been successfully upgraded to **Next.js 15.0.0** with the following improvements:

### ✅ **Completed Migrations:**
- **Framework**: Next.js 13.1.6 → 15.0.0
- **TypeScript**: 4.9.5 → 5.2.0 with modern module resolution
- **MUI Components**: Updated to latest v5.14.0+ packages
- **Date Pickers**: Migrated to MUI X v6 API (slotProps pattern)
- **TreeView**: Migrated from `@mui/lab` to `@mui/x-tree-view`
- **Image Optimization**: All components use proper Next.js Image with required dimensions
- **Import Patterns**: Fixed 70+ image import issues for Next.js 15 compatibility

### 🚀 **Performance Enhancements:**
- **Bundle Optimization**: Package import optimizations for MUI components
- **Build System**: Updated TypeScript compilation with ES2017 target
- **Module Resolution**: Modern "bundler" resolution for faster builds
- **Image Handling**: Optimized static asset loading with proper Next.js patterns

## ⚠️ **Development Notes**
Code completion might be very slow if you have GitLens plugin in VS Code enabled. Keep it disabled for optimal performance with this project!


## Additional css includes

The following CSS files were being imported regardless (Even if its not in use):

```
import "react-quill/dist/quill.snow.css";
import "./apps/calendar/Calendar.css";
import "../src/theme-components/landingpage/testimonial/testimonial.css";
import "../src/theme-components/landingpage/demo-slider/demo-slider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
```

They have been removed because certain things may never actually be used.
examples :
 - testimonials in a dashboard? very rare
 - slider carousel in a dashboard? very rare

Therefore, import it in the page where you need it.

## 🛠️ **Getting Started**

### Installation & Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### 🌐 **Development Server**
- **Local URL**: http://localhost:3000
- **Modern Dashboard**: Displays on landing page with integrated sidebar
- **Hot Reload**: Automatic refresh on file changes
- **TypeScript**: Full type checking and IntelliSense support

## 📁 **Project Structure**

```
.
├── pages/                          # Next.js pages (file-based routing)
│   ├── index.tsx                  # Landing page with Modern dashboard
│   ├── dashboards/                # Dashboard pages
│   ├── apps/                      # Application pages
│   ├── forms/                     # Form examples
│   ├── tables/                    # Table components
│   └── ui-components/            # UI component examples
├── src/
│   ├── layouts/                   # Layout components
│   │   ├── AdminLayout.tsx       # Main admin layout with header/sidebar
│   │   └── theme/                # Theme layout components
│   ├── data/                     # JSON/JS data (configs, constants, etc.)
│   │   ├── admin/               # Admin-specific configurations
│   │   └── theme/               # Theme configurations
│   ├── store/                    # Redux store setup
│   │   ├── Store.tsx            # Main store configuration
│   │   └── theme.slice.tsx      # Theme state management
│   ├── types/                    # TypeScript interfaces & types
│   ├── utils/                    # Utility functions & helpers
│   ├── theme-components/         # Pre-built theme components
│   │   ├── dashboards/          # Dashboard-specific components
│   │   ├── shared/              # Shared/common components
│   │   └── container/           # Layout containers
│   └── components/               # Custom components (add your own here)
├── public/                       # Static assets
│   └── images/                   # Image assets
├── next.config.js               # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies & scripts
```


## Building Non-Auth Page

Let's build a public page, which doesn't require a user to be authenticated!
Create a file "test-page.tsx", place it here :
```
└── pages
    └── test-page.tsx
```

```
import React from 'react';
import { Box } from '@mui/material';

function TestPage() {
    return (
        <Box>
          <p>This is an empty Page!</p>
        </Box>
    )
}

export default TestPage;

```

## 🏠 **Landing Page Configuration**

The landing page (`pages/index.tsx`) has been configured to display the modern dashboard with integrated sidebar and navigation. Current setup:

```tsx
import React from "react";
import PageContainer from "../src/theme-components/container/PageContainer";
import Modern from "./dashboards/modern";
import Sidebar from "@/layouts/theme/full/vertical/sidebar/Sidebar";
import { MenuitemsType } from "@/layouts/theme/full/vertical/sidebar/MenuItems";

interface Props extends React.PropsWithChildren {
  sidebarMenuitems?: MenuitemsType[],
  headerMenuitems?: MenuitemsType[]
}

const Landingpage: React.FC<Props> = ({ sidebarMenuitems }) => {
  return (
    <PageContainer>
     <Sidebar menuItems={sidebarMenuitems}/>
     <Modern />
    </PageContainer>
  );
};

export default Landingpage;
```

## 📱 **Building Authenticated Pages**

For pages requiring authentication and full admin layout, use the `AdminLayout` wrapper:

```tsx
import React from 'react';
import AdminLayout from "../src/layouts/AdminLayout";
import { Box } from '@mui/material';

function TestAuthPage() {
    return (
      <AdminLayout>
        <Box>
          <p>This is an authenticated admin page!</p>
        </Box>
      </AdminLayout>
    )
}

export default TestAuthPage;
```

The `AdminLayout` component automatically provides:
 - **Header**: Top navigation with menu items
 - **Sidebar**: Collapsible navigation menu
 - **Responsive Design**: Mobile and desktop layouts
 - **Theme Integration**: Material-UI theming and customization


