from flask import Blueprint, jsonify, session, request
from app.models import User, db, Ranch
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@auth_routes.route('')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # print(request.get_json())
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        # if user.staff:
        #     return user.to_staff_dict()
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if request.json["ranch_id"] == 0:
        r_id=None
    else:
        r_id = request.json["ranch_id"]

    if form.validate_on_submit():
        # print("form validated*****************", request.json["ranch_id"])
        user = User(
            full_name=form['full_name'].data,
            email=form['email'].data,
            password=form['password'].data,
            age=form['age'].data,
            phone_number=form['phone_number'].data,
            dietary_restrictions=form['dietary_restrictions'].data,
            emergency_contact=form['emergency_contact'].data,
            staff=form['staff'].data,
            ranch_id=r_id
        )
        # print("SignUp Route ============================", user)
        db.session.add(user)
        db.session.commit()
        login_user(user)
        # if user.staff:
        #     return user.to_staff_dict()
        return user.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/demo/guest', methods=['GET'])
def demo_guest():
    """
    Logs a user in as demo guest user
    """
    user = User.query.filter_by(id=1).first()
    login_user(user)
    return user.to_dict()

@auth_routes.route('/demo/staff', methods=['GET'])
def demo_staff():
    """
    Logs a user in as demo staff user
    """
    user = User.query.filter_by(id=3).first()
    login_user(user)
    return user.to_dict()


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
