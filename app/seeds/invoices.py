from app.models import db, Invoice

def seed_invoices():
    invoice1 = Invoice(guest_id='1',
                        booking_id='1',
                        additional_charges=None,
                        deposit=True,
                        rollover_payment=False,
                        amount_paid='2850')
    invoice2 = Invoice(guest_id='1',
                        booking_id='2',
                        additional_charges=None,
                        deposit=True,
                        rollover_payment=False,
                        amount_paid='675')
    invoice3 = Invoice(guest_id='1',
                        booking_id='3',
                        additional_charges=None,
                        deposit=True,
                        rollover_payment=False,
                        amount_paid='800')
    invoice4 = Invoice(guest_id='4',
                        booking_id='4',
                        additional_charges=None,
                        deposit=True,
                        rollover_payment=False,
                        amount_paid='8388')
    invoice5 = Invoice(guest_id='4',
                        booking_id='5',
                        additional_charges=None,
                        deposit=False,
                        rollover_payment=False,
                        amount_paid='0')
    invoice6 = Invoice(guest_id='1',
                        booking_id='6',
                        additional_charges=None,
                        deposit=False,
                        rollover_payment=False,
                        amount_paid='0')
    invoice7 = Invoice(guest_id='1',
                        booking_id='7',
                        additional_charges=None,
                        deposit=True,
                        rollover_payment=False,
                        amount_paid='2850')
    invoice8 = Invoice(guest_id='2',
                        booking_id='8',
                        additional_charges=None,
                        deposit=True,
                        rollover_payment=False,
                        amount_paid='5520')

    db.session.add(invoice1)
    db.session.add(invoice2)
    db.session.add(invoice3)
    db.session.add(invoice4)
    db.session.add(invoice5)
    db.session.add(invoice6)
    db.session.add(invoice7)
    db.session.add(invoice8)
    db.session.commit()

def undo_invoices():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
