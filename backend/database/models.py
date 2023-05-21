from flask_bcrypt import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)

    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __repr__(self):
        return self.username



# TODO: Add your models below, remember to add a new migration and upgrade database

class Subscription(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    subscription_type = db.Column(db.String(255), nullable=False)
    family_size = db.Column(db.Integer)
    meals_per_week = db.Column(db.Integer)
    price = db.Column(db.Integer)
    # Adds user_id as an Integer column on the car table which references the id column on user table
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    # Establishes object relation between car-user so we can grab values like car.user.username
    user = db.relationship("User")
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    product = db.relationship('Product')

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Integer)
    
class Survey(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    like = db.Column(db.String(255), nullable=False)
    dilike = db.Column(db.String(255), nullable=False)
    content_results =db.Column(db.String(255), nullable=False)
