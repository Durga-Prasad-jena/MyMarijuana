# Admin Panel

Theme Demo Link: [https://modernize-nextjs.adminmart.com/dashboards/modern](https://modernize-nextjs.adminmart.com/dashboards/modern)

## Warning
Code completion might be very slow if you have Gitlens plugin in vs code enabled. Keep it disabled for this project!


## Additional css includes

The following CSS files were being imported regardless (Even if its not in use):

```
import "react-quill/dist/quill.snow.css";
import "./forms/form-quill/Quill.css";
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


## Getting started with project structure

```
.
├── pages
├── theme-pages (all the pages included in the theme, can be renamed to "pages" to view these pages)
└── src
    ├── data (place JSON / JS data here, example: component configuration, constants, etc)
    ├── store (organize your redux store here)
    ├── types ( place your Typescript interfaces here )
    ├── utils ( additional utility features, eg - languages data )
    ├── theme-components (all the components that were included in the theme, using them is encouraged!)
    └── components ( all your custom components will be placed here )
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

## Building Authenticated Page
Let's build a public page, which doesn't require a user to be authenticated!
Create a file "test-auth-page.tsx", place it here :
```
└── pages
    └── test-auth-page.tsx
```

```
import React from 'react';
import AdminAuth from "../src/components/admin/AdminAuth";
import AdminLayout from "../src/components/admin/AdminLayout";
import { Box } from '@mui/material';


function TestAuthPage() {
    return (
      <AdminAuth><AdminLayout>

        <Box>
          <p>This is an empty Page!</p>
        </Box>
      
      </AdminLayout></AdminAuth>
    )
}

export default TestAuthPage;
```
Two utility components being used here are:
 - AdminAuth : if a component is wrapped inside this, then it requires authentication
 - AdminLayout : if a component is wrapped inside this, then it automatically adds Sidebar & Header
You don't want the Sidebar & Header, then no need to wrap with `AdminLayout`.


