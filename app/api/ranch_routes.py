from flask import Blueprint, request
from app.models import db, Ranch, Cabin, User
from app.forms import SignUpForm
from flask_login import current_user, login_required

#s3_helpers and related code relied heavily on Juliet Shafto's "Using S3 for image upload with Flask"
# https://hackmd.io/@jpshafto/SyWY45KGu
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

ranch_routes = Blueprint('ranch', __name__)

@ranch_routes.route('', methods=['POST'])
def new_ranch():
    form = SignUpForm()

    ranch = Ranch(
        ranch_name=form['ranch_name'].data,
        location=form['location'].data,
        description=form['description'].data,
        nightly_rate=form['nightly_rate'].data
    )
    db.session.add(ranch)
    # print(ranch)
    db.session.commit()
    return ranch.to_dict()


@ranch_routes.route("/search", methods=['POST'])
def search_ranch():
    print("******************************************", request.data)
    ranches = Ranch.query.all()
    # print("==1111111111111111111111111===", ranches)
    # if (request.data):
    #     ranches = []
    #     if (Ranch.query.filter(Ranch.ranch_name.ilike(f'{request.data}'))):
    #         ranches.append(Ranch.query.filter(Ranch.ranch_name.ilike(f'{request.data}')).all())
    #     if (Ranch.query.filter(Ranch.location.ilike(f'{request.data}'))):
    #         ranches.append(Ranch.query.filter(Ranch.location.ilike(f'{request.data}')).all())
    #     if (Ranch.query.filter(Ranch.description.ilike(f'{request.data}'))):
    #         ranches.append(Ranch.query.filter(Ranch.description.ilike(f'{request.data}')).all())
    # print("=======================================", ranches)
    return {ranch.id: ranch.to_dict() for ranch in ranches}


@ranch_routes.route('/<id>', methods=['GET'])
def get_ranch(id):
    ranch = Ranch.query.get(id)
    return ranch.to_dict()


@ranch_routes.route('/<id>', methods=["PUT"])
def edit_ranch(id):
    ranch = Ranch.query.get(id)
    # print("****************** edit route", ranch)
    # print("****************** edit route", request.form["location"])
    ranch.ranch_name = request.form['ranch_name']
    ranch.location = request.form['location']
    ranch.description = request.form['description']
    ranch.nightly_rate = request.form['nightly_rate']

    db.session.add(ranch)
    db.session.commit()

    return ranch.to_dict()


@ranch_routes.route('/<id>/cabins', methods=['GET'])
def get_cabins(id):
    print("============================== get_cabins +++++++++++++++++++++++")
    print(id)
    cabins = Cabin.query.filter(Cabin.ranch_id == id)
    print("::::::::::::::::::::::::::::::::::::::::", cabins)
    return {"cabins": [cabin.to_dict() for cabin in cabins]}


@ranch_routes.route('/<id>/cabins', methods=["POST"])
def add_cabin(id):
    ranch = Ranch.query.get(id)

    if "image" not in request.files:
        url = None
    else:
        image_file = request.files["image"]
        if not allowed_file(image_file.filename):
            return {"errors": "file type not permitted"}, 400

        image_file.filename = get_unique_filename(image_file.filename)

        upload = upload_file_to_s3(image_file)
        if "url" not in upload:
            #upload will have its own error messages if it didn't bring back a URL
            return upload, 400

        url = upload["url"]

    cabin = Cabin(
        name=request.form['name'],
        beds=request.form['beds'],
        total_capacity=request.form['total_capacity'],
        img_url=url,
        ranch_id=ranch.id
        )
    db.session.add(cabin)
    print("******************", cabin)
    db.session.commit()
    return cabin.to_dict()


@ranch_routes.route('/cabins/<int:cabinId>', methods=["PUT"])
def edit_cabin(cabinId):
    cabin = Cabin.query.get(cabinId)

    if "image" not in request.files:
        url = cabin.img_url
    else:
        image_file = request.files["image"]
        if not allowed_file(image_file.filename):
            return {"errors": "file type not permitted"}, 400
        image_file.filename = get_unique_filename(image_file.filename)
        upload = upload_file_to_s3(image_file)
        if "url" not in upload:
            return upload, 400

        url = upload["url"]

    cabin.name = request.form['name']
    cabin.beds = request.form['beds']
    cabin.total_capacity = request.form['total_capacity']
    cabin.img_url = url

    db.session.add(cabin)
    db.session.commit()
    return cabin.to_dict()


@ranch_routes.route('/cabins/<int:cabinId>', methods=["DELETE"])
def delete_cabin(cabinId):
    cabin = Cabin.query.get(cabinId)
    # allCabins = Cabin.query.filter(Cabin.ranch_id.is_(id))
    print("===========================DELETE ROUTE For Real", cabin)
    db.session.delete(cabin)
    db.session.commit()
    return {"yes": "delete successful"}
