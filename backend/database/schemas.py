from flask_marshmallow import Marshmallow
from marshmallow import post_load, fields
from database.models import User, Subscription, Product, Survey

ma = Marshmallow()

# Auth Schemas
class RegisterSchema(ma.Schema):
    """
    Schema used for registration, includes password
    """
    id = fields.Integer(primary_key=True)
    username = fields.String(required=True)
    password = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    email = fields.String(required=True)
    class Meta:
        fields = ("id", "username",  "password", "first_name", "last_name", "email")

    @post_load
    def create_user(self, data, **kwargs):
        return User(**data)
    
class UserSchema(ma.Schema):
    """
    Schema used for displaying users, does NOT include password
    """
    id = fields.Integer(primary_key=True)
    username = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    email = fields.String(required=True)
    class Meta:
        fields = ("id", "username", "first_name", "last_name", "email",)

register_schema = RegisterSchema()
user_schema = UserSchema()
users_schema = UserSchema(many=True)


# TODO: Add your schemas below
class ProductSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    product_name = fields.String(required=True)
    price = fields.Integer()
    class Meta:
         fields = ('id', 'name', 'price')

    @post_load
    def create_product(self, data, **kwargs):
        return Product(**data)
    
product_schema = ProductSchema()
products_schema = ProductSchema(many=True)

class SurveySchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    like = fields.String(required=True)
    dislike = fields.String(required=True)
    content_results = fields.String(required=True)
    class Meta:
        fields = ('id', 'like', 'dislike', 'content_results')

    @post_load
    def create_survey(self, data, **kwargs):
        return Survey(**data)

survey_schema = SurveySchema()

class SubscriptionSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    Subscription_type = fields.Integer(required=True)
    family_size = fields.Integer(required=True)
    meals_per_week = fields.Integer()
    price = fields.Integer()
    user_id = fields.Integer()
    user = ma.Nested(UserSchema, many=False)
    product_id = fields.String(required=True)
    product = ma.Nested(ProductSchema, many=False)
    class Meta:
        fields = ("id", "type", "family_size", "price", "user_id", "user", "product_id", "product")
    
    @post_load
    def create_subscription(self, data, **kwargs):
        return Subscription(**data)

subscription_schema = SubscriptionSchema()
subscriptions_schema = SubscriptionSchema(many=True)