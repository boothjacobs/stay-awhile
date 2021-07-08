from app.models import db, Invoice

def seed_invoices():
    invoice1 = Invoice(guest_id='1',
                        booking_id='1',
                        ranch_id='6',
                        additional_charges=None,
                        deposit=True,
                        rollover_payment=False,
                        amount_paid='2850',
                        amount_due='0')
    invoice2 = Invoice(guest_id='1',
                        booking_id='2',
                        ranch_id='9',
                        additional_charges=None,
                        deposit=True,
                        rollover_payment=False,
                        amount_paid='675',
                        amount_due='2085')
    invoice3 = Invoice(guest_id='1',
                        booking_id='3',
                        ranch_id='4',
                        additional_charges=None,
                        deposit=True,
                        rollover_payment=False,
                        amount_paid='800',
                        amount_due='1996')
    invoice4 = Invoice(guest_id='4',
                        booking_id='4',
                        ranch_id='4',
                        additional_charges=None,
                        deposit=True,
                        rollover_payment=False,
                        amount_paid='8388',
                        amount_due='0')
    invoice5 = Invoice(guest_id='4',
                        booking_id='5',
                        ranch_id='4',
                        additional_charges=None,
                        deposit=False,
                        rollover_payment=False,
                        amount_paid='0',
                        amount_due='8388')
    invoice6 = Invoice(guest_id='1',
                        booking_id='6',
                        ranch_id='5',
                        additional_charges=None,
                        deposit=False,
                        rollover_payment=False,
                        amount_paid='0',
                        amount_due='4980')
    invoice7 = Invoice(guest_id='1',
                        booking_id='7',
                        ranch_id='6',
                        additional_charges=None,
                        deposit=True,
                        rollover_payment=False,
                        amount_paid='2850',
                        amount_due='0')
    invoice8 = Invoice(guest_id='2',
                        booking_id='8',
                        ranch_id='9',
                        additional_charges=None,
                        deposit=True,
                        rollover_payment=False,
                        amount_paid='5520',
                        amount_due='0')

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
    db.session.execute('TRUNCATE invoices RESTART IDENTITY CASCADE;')
    db.session.commit()
