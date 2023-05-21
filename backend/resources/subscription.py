from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Subscription, Product, Survey
from database.schemas import subscription_schema, subscriptions_schema, product_schema, products_schema, survey_schema


class AllSubscriptionResource(Resource):
    def get(self):
        subscriptions = Subscription.query.all()
        type = request.args.get('type')
        if type:
            subscriptions = Subscription.query.filter_by(type=type)
        return subscriptions_schema.dump(subscriptions), 200
    
class UserSubscriptionResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user_subscriptions = Subscription.query.filter_by(user_id=user_id)
        return subscription_schema.dump(user_subscriptions), 200
        # # Alternate version where JWT is used, but not required
        # try:
        #     verify_jwt_in_request()
        #     user_id = get_jwt_identity()
        # # Do stuff with token
        # except:
        # # Do stuff without tokeng
        #     return "Unauthorized", 401

    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        new_subscription = subscription_schema.load(form_data)
        new_subscription.user_id = user_id
        db.session.add(new_subscription)
        db.session.commit()
        return subscription_schema.dump(new_subscription), 201