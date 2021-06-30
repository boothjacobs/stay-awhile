from app.models import db, Cabin

def seed_cabins():
    cabin1 = Cabin(name='Antler',
                beds='3',
                total_capacity='4',
                img_url='https://stay-awhile.s3.us-east-2.amazonaws.com/antler.png',
                ranch_id='1')
    cabin2 = Cabin(name='Big Buffalo',
                beds='6',
                total_capacity='8',
                img_url='https://stay-awhile.s3.us-east-2.amazonaws.com/bigbuff.png',
                ranch_id='1')
    cabin3 = Cabin(name='Waldorf',
                beds='6',
                total_capacity='8',
                img_url='https://www.7dranch.com/site/wp-content/uploads/2015/03/waldorf-out.jpg',
                ranch_id='1')
    cabin4 = Cabin(name='Aspen',
                beds='1',
                total_capacity='2',
                img_url='https://stay-awhile.s3.us-east-2.amazonaws.com/aspen.png',
                ranch_id='1')

    cabin5 = Cabin(name='East',
                beds='2',
                total_capacity='4',
                img_url='https://www.lazylb.com/wp-content/uploads/2020/02/LB-Rooms_10.jpg',
                ranch_id='2')
    cabin6 = Cabin(name='West',
            beds='2',
            total_capacity='4',
            img_url='https://www.lazylb.com/wp-content/uploads/2020/02/LB-Rooms_04.jpg',
            ranch_id='2')
    cabin7 = Cabin(name='South',
                beds='1',
                total_capacity='2',
                img_url='https://www.lazylb.com/wp-content/uploads/2020/01/image-4.jpg',
                ranch_id='2')

    cabin8 = Cabin(name='Cabin',
                beds='2',
                total_capacity='4',
                img_url='https://thehideout.com/wp-content/uploads/2015/09/2015_Hideout_Cabin_nwm_155041.jpg',
                ranch_id='3')

    cabin9 = Cabin(name='Cabin One',
                beds='4',
                total_capacity='6',
                img_url='https://veebar.com/wp-content/uploads/2020/03/1-Q-bed-3.jpg',
                ranch_id='4')
    cabin10 = Cabin(name='Cabin Two',
                beds='4',
                total_capacity='6',
                img_url='https://veebar.com/wp-content/uploads/2020/03/2-downstairs.jpg',
                ranch_id='4')
    cabin11 = Cabin(name='Cabin Three',
                beds='4',
                total_capacity='6',
                img_url='https://veebar.com/wp-content/uploads/2020/03/3-upstairs3.jpg',
                ranch_id='4')

    cabin12 = Cabin(name='North Cabin',
                beds='4',
                total_capacity='6',
                img_url='https://secureservercdn.net/166.62.110.72/d3h.ce5.myftpupload.com/wp-content/uploads/2019/07/fullsizeoutput_341d.jpeg?time=1622620155',
                ranch_id='5')
    cabin13 = Cabin(name='West Cabin',
                beds='2',
                total_capacity='4',
                img_url='https://secureservercdn.net/166.62.110.72/d3h.ce5.myftpupload.com/wp-content/uploads/2019/07/fullsizeoutput_3424-1024x683.jpeg',
                ranch_id='5')

    cabin14 = Cabin(name='Rendezvous Cabin',
                beds='5',
                total_capacity='6',
                img_url='https://rlazys.com/wp-content/uploads/2020/11/Rendezvous-Ext-300x200.jpg',
                ranch_id='6')
    cabin15 = Cabin(name='Cottonwood Cabin',
                beds='4',
                total_capacity='6',
                img_url='https://rlazys.com/wp-content/uploads/2020/11/Cottonwood-exterior-300x200.jpg',
                ranch_id='6')
    cabin16 = Cabin(name='Coyote East',
                beds='1',
                total_capacity='2',
                img_url='https://rlazys.com/wp-content/uploads/2020/11/Coyotes-E-Ext-300x200.jpg',
                ranch_id='6')
    cabin17 = Cabin(name='Willows Cabin',
                beds='4',
                total_capacity='5',
                img_url='https://rlazys.com/wp-content/uploads/2020/11/Willows2-300x200.jpg',
                ranch_id='6')

    cabin18 = Cabin(name='One Cabin',
                beds='2',
                total_capacity='4',
                img_url= None,
                ranch_id='7')
    cabin19 = Cabin(name='Two Cabin',
                beds='2',
                total_capacity='4',
                img_url= None,
                ranch_id='7')

    cabin20 = Cabin(name='Aspen West Cabin',
                beds='4',
                total_capacity='6',
                img_url='https://stay-awhile.s3.us-east-2.amazonaws.com/Screen+Shot+2021-06-29+at+9.43.55+PM.png',
                ranch_id='8')

    cabin21 = Cabin(name='Pines East Cabin',
                beds='2',
                total_capacity='4',
                img_url="https://www.mooseheadranch.com/wp-content/uploads/moose-head-ranch-cabins.jpg",
                ranch_id='9')
    cabin22 = Cabin(name='Pines West Cabin',
                beds='1',
                total_capacity='2',
                img_url="https://www.mooseheadranch.com/wp-content/uploads/moose-head-ranch-cabin-exterior.jpg",
                ranch_id='9')
    cabin23 = Cabin(name='Meadows Cabin',
                beds='4',
                total_capacity='6',
                img_url="https://www.mooseheadranch.com/wp-content/uploads/moose-head-ranch-2br-cabin.jpg",
                ranch_id='9')

    db.session.add(cabin1)
    db.session.add(cabin2)
    db.session.add(cabin3)
    db.session.add(cabin4)
    db.session.add(cabin5)
    db.session.add(cabin6)
    db.session.add(cabin7)
    db.session.add(cabin8)
    db.session.add(cabin9)
    db.session.add(cabin10)
    db.session.add(cabin11)
    db.session.add(cabin12)
    db.session.add(cabin13)
    db.session.add(cabin14)
    db.session.add(cabin15)
    db.session.add(cabin16)
    db.session.add(cabin17)
    db.session.add(cabin18)
    db.session.add(cabin19)
    db.session.add(cabin20)
    db.session.add(cabin21)
    db.session.add(cabin22)
    db.session.add(cabin23)
    db.session.commit()


def undo_cabins():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
