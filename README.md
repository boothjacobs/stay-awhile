# stay-awhile

StayAwhile is a reservation management application for dude ranches, based loosely on my experience using [Lodge-ical](https://romeobravosoftware.com/software-products/) in a previous job. The software my employer was using was limited to a single desktop, a problem when we moved "the office" from town to the remote ranch location at the start of every season, and it offered dozens more features than we ever used. StayAwhile aims to make streamlined reservation records accessible to ranch managers wherever they need it, with the added convenience of customer correspondence built into the app.

## Browsing
An unauthorized user can visit ranch profile pages and read reviews left by guests. (Clicking on "Book Now" would redirect to the login splash page.)
![ranch profile screenshot](https://github.com/boothjacobs/stay-awhile/blob/main/notes/Screen%20Shot%202021-07-11%20at%206.32.31%20PM.png?raw=true)

## Customer Experience

![guest home screenshot](https://github.com/boothjacobs/stay-awhile/blob/main/notes/Screen%20Shot%202021-07-11%20at%206.14.57%20PM.png?raw=true)
On login, a customer account is directed to their dashboard, where they see a summary of their upcoming reservations, their open invoices, and their past reservations. Invoices can only be created by a ranch in association with an existing booking. PayPal payments have not been implemented yet, but in the future a guest account will have the ability to post a payment to an invoice and update the balance accordingly. Otherwise guests can only create/edit/delete bookings and reviews.
```html
<NavLink to="/guest/bookings" className="dashboard-header"><h3>Upcoming Bookings</h3></NavLink>
                        {(bookings) ? bookings?.map((booking) => {
                            let start = new Date(booking?.start_date);
                            let end = new Date(booking?.end_date);
                            if (Date.parse(start) < Date.now()) {
                                return null;
                            };
                            return ( <div className="info-entry" key={booking?.id}>
                                <p className="dashboard-p">{booking?.ranch}</p>
                                <p className="dashboard-p">{start?.toDateString()}</p>
                                <p className="dashboard-p">{end?.toDateString()}</p>
                            </div> )
                        }) : null}
```

![guest's booking details page](https://github.com/boothjacobs/stay-awhile/blob/main/notes/Screen%20Shot%202021-07-11%20at%206.15.07%20PM.png?raw=true)
On the Booking Details page, a guest can edit or delete a booking unless an invoice has been created for it, in which case they can only edit.
```html
        <div id="bookings-page-js">
            <div className="dashboard-header">
                <h1>Booking Details</h1>
            </div>
            <div className="info-display">
                {bookings?.map((booking) => {
                    const startDate = new Date(booking?.start_date);
                    const endDate = new Date(booking?.end_date);
                    const invoice = booking?.invoice[0]

                    if (startDate > Date.now()) {
                        return (
                            <div className="info-entry" key={booking?.id}>
                                <p className="dashboard-p">{booking?.ranch}</p>
                                <p className="dashboard-p">{booking?.cabin}</p>
                                <p className="dashboard-p"> Arrive {startDate.toDateString()}</p>
                                <p className="dashboard-p"> Depart {endDate.toDateString()}</p>
                                <p className="dashboard-p">{booking?.guest_count} guests</p>
                                <p className="dashboard-p">{booking?.interests}</p>
                                <p>Remaining Balance: ${invoice?.amount_due} <br />
                                {invoice?.amount_due > 0 ? (<NavLink to="/guest/invoices">See Invoice</NavLink>) : null}
                                </p>
                                    <div className="modal-buttons">
                                        <EditBookingModal booking={booking} className="one-modal" />
                                        {invoice ? null : <DeleteBookingModal booking={booking} className="one-modal" />}
                                    </div>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
```

![reviews page screenshot](https://github.com/boothjacobs/stay-awhile/blob/main/notes/Screen%20Shot%202021-07-11%20at%206.15.19%20PM.png?raw=true)
Clicking on "Your Past Experiences" on the dashboard brings a user to the "My Reviews" page--a thumbnail of each past booking appears, with the associated review if it exists, and a link to add a review if one hasn't been created yet. Users can only post reviews for ranches they have had bookings at.

## Staff Experience
![ranch dashboard screenshot](https://github.com/boothjacobs/stay-awhile/blob/main/notes/Screen%20Shot%202021-07-11%20at%206.15.42%20PM.png?raw=true)
When a Staff user logs in, they are directed to the Ranch Dashboard page. This dashboard provides access to upcoming bookings, open invoices, and a link to the ranch details page to edit the ranch profile.
```python
@ranch_routes.route('/<int:ranchId>/invoices', methods=["GET"])
@login_required
def open_invoices(ranchId):
    open_invoices = Invoice.query.filter(Invoice.ranch_id == ranchId).filter(Invoice.amount_due > 0).all()
    return {"invoices": [invoice.to_dict() for invoice in open_invoices]}
```

"Available Cabins" currently only renders the full list of cabins/rooms associated with the ranch profile (which can be managed via the "Your Ranch" page), but would eventually dynamically render only the cabins not booked on that day. "See All Invoices" renders a page with thumbnail versions of all past or upcoming bookings, for recordkeeping purposes.

![booking/create invoice screenshot](https://github.com/boothjacobs/stay-awhile/blob/main/notes/Screen%20Shot%202021-07-11%20at%206.16.01%20PM.png?raw=true)
The "View or Create Invoice" link on each booking brings the user to a page that renders the details of that reservation along with a form to create an invoice for it (which will then appear on the guest's dashboard). If an invoice exists for that booking, it is rendered with edit/delete options.

## Future Features

 - My first priority in continuing to work on StayAwhile would be to implement a payment feature for the Guest side. I looked into PayPal and ultimately settled on Stripe's payment processing integration, because their documentation is much more transparent and allows more granular access to each aspect of the API interaction.
- I also want to implement a robust search function on the Ranch side for viewing all records associated with one Guest account, as well as bookings by date, etc. This, combined with the in-app payments by guests, is really the central functionality of the app.
- Bookings are at the moment just a list of dates and details, and need additional logic to prevent overlapping bookings for the same cabin (which would be involved in the "Available Cabins" widget on the dashboard). Handling JavaScript dates was by far the most challenging aspect of this project.
- Edit User Profile hasn't been implemented yet, and that will be important as it's the User Model that stores information like dietary restrictions that need to be updated by returning customers every year.
- I'd also like to add search function for "destinations" (ranches) for the Guest side.
