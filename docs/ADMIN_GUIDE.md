# AUTO HEADS — Admin Guide

This guide is for David Abel. It explains how to use every feature of the admin panel without touching code.

---

## Accessing the Admin Panel

1. Log in to AUTO HEADS with your admin account
2. Navigate to `/admin/dashboard`
3. If you see "Permission denied", your account's role is not set to `admin` — follow the setup guide

---

## Dashboard Overview (`/admin/dashboard`)

Shows platform-wide KPIs:
- Total registered users
- Total projects published
- Total revenue (KES)
- Daily active users
- New signups today

Refreshes on page load. For real-time analytics, check Firebase Console → Analytics.

---

## Managing Projects (`/admin/projects`)

- **Search**: Filter by project name, category, or status
- **Edit**: Click any field to edit inline — name, description, price, status
- **Feature / Unfeature**: Toggle star icon — featured projects appear first in feed with a star badge
- **Delete**: Click delete icon → confirm dialog appears — action is irreversible

---

## Managing Users (`/admin/users`)

- **Search**: Find users by name or email
- **View profile**: Click username → navigates to their public profile
- **Change role**: Dropdown — `user` or `admin`. Only do this for trusted people.
- **Ban**: Toggle switch — banned users cannot log in. Their content remains visible.
- **Unban**: Toggle switch back to active.

---

## Managing Transactions (`/admin/transactions`)

- **Filter**: By payment status (pending / completed / failed / refunded) or payment method (Stripe / M-Pesa)
- **View**: See buyer, seller, project, amount, and date for every transaction
- **Refund**: Click Refund button → issues refund via Stripe API (Stripe card payments only). M-Pesa refunds must be processed manually via Safaricom.
- **Export**: Download CSV of all transactions for accounting

---

## Platform Customization (`/admin/customize`)

All changes take effect immediately without redeployment.

- **Slogan**: Edit the tagline shown on the landing page and footer
- **Featured section title**: Change the heading above featured projects in the feed
- **Feed page size**: Number of projects shown per page (default: 12)
- **Default theme**: Light or dark for new users
- **Accent color**: Primary brand color (default: #FF6B00 orange)
- **Secondary color**: Link and tag color (default: #00A8E8 blue)
- **Heading font**: Poppins (default), Inter, or Roboto

---

## Managing Supporters (`/admin/supporters`)

Supporters appear in the footer strip on every page.

- **Add**: Click "Add Supporter" → fill name, logo, website, description
- **Remove**: Click delete icon → confirm
- **Reorder**: Drag to reorder — order is reflected immediately in footer
- **Logo upload**: Accepts PNG or SVG, displayed at 40px height in footer
