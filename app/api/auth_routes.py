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


@auth_routes.route('/')
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
    print(request.get_json())
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
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
    print("SignUpRoute *************************", form)

    form['csrf_token'] = request.cookies['csrf_token']

    if form.validate_on_submit():
        user = User(
            full_name=form['fullName'],
            email=form['email'],
            password=form['password'],
            age=form['age'],
            phone_number=form['phone'],
            dietary_restrictions=form['dietary'],
            emergency_contact=form['eContact'],
            staff=form['staff']
        )
        if (form['ranchName']):
            ranch = Ranch(
                name=form['ranch_name'],
                rate=form['ranch_rate']
            )
            db.session.add(ranch)
            print(ranch)
            db.session.commit()
        print("SignUp Route ============================", user)
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/demo', methods=['POST'])
def demo():
    """
    Logs a user in as demo user
    """
    user = User.query.filter_by(username="Demo1").first()
    login_user(user)
    return user.to_dict()


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
