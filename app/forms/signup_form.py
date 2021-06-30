from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("User is already registered.")


class SignUpForm(FlaskForm):
    full_name = StringField('Full Name', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired()]) #This field is trashed, workaround using form['password'].data
    age = IntegerField('Age')
    phone_number = StringField('Phone Number')
    dietary_restrictions = SelectField(choices=["None", "Vegetarian", "Vegan", "Gluten-Free", "Allergy"])
    emergency_contact = StringField('Emergency Contact')
    staff = BooleanField('Staff or Guest')
    ranch_name = StringField('Ranch Name')
    location = StringField('Location')
    description = StringField('Description')
    nightly_rate = IntegerField('Base Nightly Rate')
