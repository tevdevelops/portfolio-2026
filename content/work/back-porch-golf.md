---
title: Back Porch Golf Co., a booking system with real rules
summary: A booking site for a made-up golf simulator studio that's open 24/7 with no staff. Pick a bay on a live day grid, pay through Stripe and get a door code that only works during your booking. A small product built end to end in Laravel and Vue, from landing page to payments, refunds, door access and deployment.
org: Personal
role: Designer & developer (solo)
period: Nov 2026
stack: [Laravel 13, PHP 8.4, Inertia, Vue 3, TypeScript, Tailwind CSS 4, Stripe Checkout, Pest, Laravel Cloud, Claude Code]
status: published
outcomes:
  - No double bookings, even when two people click the same slot at once
  - Stripe's signed webhook confirms every booking, and late payments are refunded automatically
  - 44 tests cover the full payment flow with no network calls
cover: /media/work/back-porch-golf/cover.jpg
liveUrl: https://back-porch-golf-production-wan3nh.laravel.cloud
order: 2
featured: true
---

I'd been toying with the idea of a golf simulator studio: a couple of bays, open around the clock, with nobody at the front desk. It's an early maybe, but it raised a UX question I wanted to work through. How do you let people book, pay, cancel and get through the door with no staff to help?

So I built the booking system for a made-up studio, Back Porch Golf Co. Most of my work has been on the front end, and I wanted a real Laravel project with real business rules instead of a todo app. The rules come from my own rough plan: $35 an hour per bay, $8 an hour for each extra player, 5% amusement tax, and free cancellation up to 24 hours before.

It's a demo. Stripe runs in test mode, and the studio doesn't exist.

## What it does

A visitor lands on a short marketing page (how it works, pricing, FAQ) and goes to **Book a bay**. The booking page is a day grid with one column per bay and a row every 30 minutes, covering the next 14 days. Existing bookings show as Booked, In progress or Complete, without customer details. A line marks the current time.

::case-figure{src="/media/work/back-porch-golf/grid.jpg" alt="The Book a bay page: a row of day buttons for the next two weeks, then a grid with columns for Bay 1 and Bay 2, an amber in-progress block, dark green booked blocks, a pale complete block and a rust line marking 12:28 PM" caption="The day grid. Amber is in progress, green is booked, pale is complete, and the rust line is now."}
::

I modeled the flow on real sim studio booking pages. The day-grid idea came from one of them; the styling is my own.

Clicking an open slot opens a drawer. You choose 1 to 4 hours, capped by the next booking on that bay, and 1 to 4 players. Then you enter your name, email and phone, and see the price update as you go. Two hours for three players comes to $70 for the bay plus $32 for the extra players, $5.10 tax, $107.10 in total.

::case-figure{src="/media/work/back-porch-golf/drawer.jpg" alt="The booking drawer open over the grid for Bay 2, 3:00 to 5:00 PM: length set to 2 hours, 3 players, name, email and phone filled in, and a price breakdown totaling $107.10" caption="The drawer. The dashed block on the grid shows the selection, and the total updates as you choose."}
::

From there you pay on Stripe Checkout and land on a "You're booked!" page with your door code and a private link to manage the booking. The same details arrive by email. Cancelling 24 or more hours ahead refunds you in full through Stripe. Inside 24 hours the cancellation is refused, with an explanation.

::figure-pair{first="/media/work/back-porch-golf/checkout.jpg" first-alt="Stripe Checkout with a Sandbox badge, showing $107.10 for Bay 2 on Wednesday, November 18 at 3:00 PM, 2 hours, 3 players, plus amusement tax" first-label="Stripe Checkout (sandbox)" second="/media/work/back-porch-golf/confirmation.jpg" second-alt="The You're booked page with door code 304413, valid from 2:50 PM, and a summary of Bay 2, 3:00 to 5:00 PM, $107.10 paid" second-label="Confirmation" caption="Paying in Stripe's sandbox, then the confirmation with the door code, issued once the webhook arrives."}
::

There's no real door, so there's a pretend keypad at `/door`. Enter a code and a time, and it unlocks from 10 minutes before the booking until it ends, and stays locked any other time.

::figure-pair{first="/media/work/back-porch-golf/door-unlocked.jpg" first-alt="Door keypad demo showing code 304413 on a green display with the message Unlocked. Enjoy Bay 2! at 3:30 PM" first-label="3:30 PM · unlocked" second="/media/work/back-porch-golf/door-denied.jpg" second-alt="The same keypad with the code on a rust display and the message Denied. That code is not active at this time, at 7:00 PM" second-label="7:00 PM · denied" caption="The same code during the booking and two hours after it ends."}
::

## Picking a look

Before building the real interface, I prototyped three throwaway design directions on a single route, switched by a URL parameter: **Warm porch**, **Retro clubhouse** and **Clean modern**. Each one had a landing hero and the booking grid, so I could judge them on the screen that matters most rather than on a mood board.

::case-figure{src="/media/work/back-porch-golf/prototypes.jpg" alt="Three prototype pages side by side. Warm porch: cream page, serif headline and a wooden sign. Retro clubhouse: orange sunburst, chunky italic logo and pill-shaped bookings. Clean modern: white page, black sans-serif headline and gray grid" caption="The three throwaway directions, each with a landing hero and the booking grid."}
::

Warm porch won. It uses cream and linen backgrounds, forest green as the main accent, and wood browns. Amber marks bookings in progress and your own selection, and a rust line shows the current time. Headings are set in Fraunces and body text in Inter. It felt like somewhere you'd want to spend a Tuesday night, and the grid stayed easy to scan. Once I'd chosen, I took the prototype off the main branch and kept it on its own branch.

The words were part of the design too. The project has a short glossary (Bay, Booking, Hold, Door code, Access window), and the code and the interface use the same terms. It's "Book a bay", never "tee time": on a course, a tee time is a start time, and here you're booking a block of hours.

## No double bookings

The one thing a booking system can't get wrong is selling the same slot twice. Creating a booking runs inside a database transaction that locks the bay's row before checking for overlaps. If two people click the same slot at the same moment, the second request waits for the first to finish, sees the slot is taken and gets turned away. There's a test for exactly that.

While someone is on Stripe's payment page, their booking is **Held** and blocks the slot. Stripe Checkout sessions must last at least 30 minutes, so the hold lasts 30 minutes plus 2 minutes of grace, and the Stripe session is set to expire at 31. The payment page always closes before the hold runs out.

A hold that runs out frees the slot straight away, because the overlap check simply ignores expired holds. No timer or background job has to run for the slot to open again, which mattered later for the hosting bill.

## Stripe confirms the booking, not the browser

The redirect back from Stripe isn't proof that anyone paid; people close tabs and lose connections. A booking is confirmed only when Stripe's signed `checkout.session.completed` webhook arrives. That's what assigns the door code and sends the email.

The webhook is idempotent, so if Stripe sends the same event twice, nothing happens the second time. If a payment arrives for a slot that was lost in the meantime (say the hold ran out mid-payment), the customer is refunded automatically and the booking is marked Expired. If a visitor backs out of checkout, the hold is released and the Stripe session is closed right away, so the slot doesn't sit blocked for half an hour.

The server is also the only authority on price. The drawer's live total is a preview. The server works out the price again before creating the Stripe session, and money is integer cents everywhere.

## Time is hard, so I handled it on purpose

A 24/7 studio means bookings at 11pm that run until 2am, and a calendar that has to survive daylight saving time.

- Times are stored in UTC and shown in the studio's timezone.
- A **studio day** runs from local midnight to midnight, so the grid has 23 or 25 hours on the days the clocks change. Nothing assumes 48 half-hour rows.
- A booking that crosses midnight shows on both days, labeled "from last night" or "runs past midnight".

Door codes depend on time too. Each code is 6 digits, and it's unique among bookings whose access windows overlap, so a code can never open the door for the wrong person.

Customers never create accounts, but their bookings stay private. The confirmation, manage and cancel pages use Laravel's signed URLs, so only someone with the link can see or cancel a booking.

## Testing payments without Stripe

Stripe sits behind a small `PaymentGateway` interface with two implementations: the real Stripe one and a fake. That one seam lets the test suite run the whole flow (hold, checkout, webhook, refund) without a network call, including the case where Stripe is down. Webhook tests sign their payloads the same way Stripe does, so the signature check gets tested too.

The suite has 44 tests with 142 assertions. PHPStan runs at level 7 with no ignored errors, and GitHub Actions runs linting, type checks, static analysis and tests on every push.

I also ran it for real against Stripe's sandbox: paid with the test card and got a confirmed booking, a door code and an email. Cancelling sent a $45.15 refund through Stripe, and backing out of checkout released the hold and expired the session.

## Shipping it for about $5 a month

The demo runs on Laravel Cloud, which bills compute and the database by the second and can scale both to zero when nobody's using them. That changed one decision.

My first version swept expired holds every 5 minutes. On a scale-to-zero host, a job that runs every 5 minutes keeps the app and database awake around the clock. Because expired holds already stop blocking slots on their own, the sweep was only tidying up statuses, so I moved it to once a day. A weekly job reseeds the fake bookings so the grid always looks busy. The rest of the time the demo sleeps, and it costs about $5 a month.

## How I worked

I built this with Claude Code as a pair programmer. I set the domain rules and the vocabulary, made the calls on the hard parts (the locking, the hold timing, where the payment seam should go) and reviewed everything that went in. Claude Code drafted much of the Laravel code and the tests, and prototyped the three design directions so I could compare real screens instead of guessing. It made a stack I hadn't shipped before quick to learn, and I still understood every line.

## What's next

It covers the core loop and stops there. Not built yet: customer accounts, memberships and members-only hours, an admin dashboard, club rentals, promo codes, SMS reminders, real email delivery (it writes emails to a log for now) and real door hardware.

The code is on [GitHub](https://github.com/tevdevelops/back-porch-golf). To try the [live demo](https://back-porch-golf-production-wan3nh.laravel.cloud), pay with Stripe's test card, 4242 4242 4242 4242.
