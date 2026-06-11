# CampusFinder — Mobile UI Kit

A high-fidelity, interactive recreation of the **redesigned** CampusFinder
mobile app (a lost & found platform for University of Ghana students). It
composes the design-system primitives (`Button`, `Input`, `SearchBar`,
`SegmentedTabs`, `Badge`, `Avatar`, `ItemCard`, `StatBanner`, `ChatBubble`,
`EmptyState`) inside an iOS device frame.

## Run it
Open `index.html`. Use the segmented control on the left to jump to any screen,
or tap through the live flow inside the phone.

## Screens & flow
`Sign Up / Login → Verify Email → Welcome → Browse (Lost & Found) → Item Details
→ Secure Chat → Confirmation`, plus the **Report an Item** form and **Inbox**.

- **AuthScreen** — branded gradient hero + form; toggles between sign-up and login.
- **VerificationScreen** — 4-digit email code entry.
- **WelcomeScreen** — onboarding with the feature list.
- **ListScreen** — stats banner, search, All/Lost/Found filter, item rows, floating Report button.
- **DetailsScreen** — photo header, detail rows, secure-chat notice, sticky CTA.
- **ReportScreen** — Lost/Found toggle, labeled fields, photo dropzone, safety notes.
- **ChatScreen** — encrypted-conversation banner + message bubbles + composer.
- **InboxScreen** — conversation list with avatars and previews.
- **ConfirmationScreen** — success state with campus safety tips.

## Files
- `frame.jsx` — `PhoneFrame`, `StatusBar`, `AppBar`, and the `CF_ITEMS` mock data.
- `screens-auth.jsx` — Auth, Verification, Welcome.
- `screens-browse.jsx` — List, Details, Report.
- `screens-chat.jsx` — Chat, Inbox, Confirmation.
- `app.jsx` — navigation state machine (`CampusFinderApp`).

## Redesign notes vs. the original
The original Expo app used a generic Material blue (`#2196F3`) with gray cards
and emoji-only iconography. This kit re-skins every screen with the CampusFinder
brand: Deep Blue primary, Teal "Found" / Orange "Lost" status colors, the pin
logo, Plus Jakarta Sans / Manrope type, branded gradient heros, a floating
report action, and the secure-chat treatment in the brand ink tone. All original
features and flows are preserved.
