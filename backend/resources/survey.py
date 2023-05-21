from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Subscription, Product, Survey
from database.schemas import subscription_schema, subscriptions_schema, product_schema, products_schema, survey_schema


    
class UserSurveyResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user_survey = Survey.query.filter_by(user_id=user_id)
        return survey_schema.dump(user_survey), 200
      

    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        new_survey = survey_schema.load(form_data)
        new_survey.user_id = user_id
        db.session.add(new_survey)
        db.session.commit()
        return survey_schema.dump(new_survey), 201