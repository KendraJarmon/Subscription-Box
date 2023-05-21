from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Subscription, Product, Survey
from database.schemas import subscription_schema, subscriptions_schema, product_schema, products_schema, survey_schema


class AllProductResource(Resource):
    def get(self):
        products = Product.query.all()
        type = request.args.get('name')
        if type:
            products = Product.query.filter_by(name=products)
        return products_schema.dump(products), 200
    
class UserProductResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user_products = Product.query.all()
        return products_schema.dump(user_products), 200
      

    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        new_product = product_schema.load(form_data)
        db.session.add(new_product)
        db.session.commit()
        return product_schema.dump(new_product), 201