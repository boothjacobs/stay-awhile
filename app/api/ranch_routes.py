from flask import Blueprint, request
from app.models import db, Ranch
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


@ranch_routes.route('/<id>', methods=['GET'])
def get_ranch(id):
    ranch = Ranch.query.get(id)
    return ranch.to_dict()

@ranch_routes.route('/<id>', methods=["PUT"])
def edit_ranch(id):
    ranch = Ranch.query.get(id)
    ranch.ranch_name = request.form['ranch_name'].data
    ranch.location = request.form['location'].data
    ranch.description = request.form['description'].data
    ranch.nightly_rate = request.form['nightly_rate'].data

    db.session.add(ranch)
    db.session.commit()

    return ranch.to_dict()
# image_routes = Blueprint("images", __name__)
# @image_routes.route("", methods=["POST"])
# @login_required
# def upload_image():
#     if "image" not in request.files:
#         return {"errors": "image required"}, 400

#     image = request.files["image"]

#     if not allowed_file(image.filename):
#         return {"errors": "file type not permitted"}, 400

#     image.filename = get_unique_filename(image.filename)

#     upload = upload_file_to_s3(image)

#     if "url" not in upload:
#         # if the dictionary doesn't have a url key
#         # it means that there was an error when we tried to upload
#         # so we send back that error message
#         return upload, 400

#     url = upload["url"]
#     # flask_login allows us to get the current user from the request
#     new_image = Image(user=current_user, url=url)
#     db.session.add(new_image)
#     db.session.commit()
#     return {"url": url}
