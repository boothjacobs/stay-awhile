from app.models import db, Ranch

def seed_ranches():

    ranch_one = Ranch(ranch_name='7D Ranch',
                    location='Cody, Wyoming',
                    description=None,
                    nightly_rate='398',
                    img_url="https://www.7dranch.com/site/wp-content/uploads/2017/04/20160822104959-925x400.jpg")

    ranch_two = Ranch(ranch_name='Lazy L and B Ranch',
                    location='Dubois, Wyoming',
                    description=None,
                    nightly_rate='400',
                    img_url="https://www.lazylb.com/wp-content/uploads/2020/01/arciwZvU.jpeg")

    ranch_3 = Ranch(ranch_name='The Hideout',
                    location='Shell, Wyoming',
                    description=None,
                    nightly_rate='595',
                    img_url="https://thehideout.com/wp-content/uploads/2019/06/calendar-cover.jpg")

    ranch_4 = Ranch(ranch_name='VeeBar Guest Ranch',
                    location='Laramie, Wyoming',
                    description=None,
                    nightly_rate='466',
                    img_url="https://veebar.com/wp-content/uploads/2020/02/flyfish3.jpg")

    ranch_5 = Ranch(ranch_name='Crossed Sabres Ranch',
                    location='Cody, Wyoming',
                    description=None,
                    nightly_rate='415',
                    img_url="https://secureservercdn.net/166.62.110.72/d3h.ce5.myftpupload.com/wp-content/uploads/2019/01/CSC_0238.jpg?time=1622620155")

    ranch_6 = Ranch(ranch_name='R Lazy S Ranch',
                    location='Teton Village, Wyoming',
                    description=None,
                    nightly_rate='475',
                    img_url="https://rlazys.com/wp-content/themes/rlazys/images/defaults/feature.jpg")

    ranch_7 = Ranch(ranch_name='Diamond 4 Ranch',
                    location='Lander, Wyoming',
                    description=None,
                    nightly_rate='345',
                    img_url="https://images.squarespace-cdn.com/content/v1/5c93acc9755be276fa09bf09/1555077543382-O9TBUSGYOBZNJZ4T5FX0/flowers%2C+sign.jpg?format=500w")

    ranch_8 = Ranch(ranch_name='Absaroka Ranch',
                    location='Dubois, Wyoming',
                    description=None,
                    nightly_rate='365',
                    img_url=None)

    ranch_9 = Ranch(ranch_name='Moose Head Ranch',
                    location='Jackson Hole, Wyoming',
                    description=None,
                    nightly_rate='460',
                    img_url="https://www.mooseheadranch.com/wp-content/uploads/DSC_0346.jpg")

    db.session.add(ranch_one)
    db.session.add(ranch_two)
    db.session.add(ranch_3)
    db.session.add(ranch_4)
    db.session.add(ranch_5)
    db.session.add(ranch_6)
    db.session.add(ranch_7)
    db.session.add(ranch_8)
    db.session.add(ranch_9)
    db.session.commit()

def undo_ranches():
    db.session.execute('TRUNCATE ranches RESTART IDENTITY CASCADE;')
    db.session.commit()
