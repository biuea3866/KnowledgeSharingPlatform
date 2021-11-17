from rest_framework.views import APIView;
from rest_framework.parsers import JSONParser;
from django.http.response import JsonResponse, HttpResponse;

from rest_framework.exceptions import AuthenticationFailed, ValidationError;

import jwt, datetime, bcrypt;

from .models import User;
from .serializers.register_serializer import RegisterSerializer;
from .serializers.login_serializer import LoginSerializer;
from .serializers.users_serializer import UsersSerializer;
from .serializers.user_serializer import UserSerializer;
from .serializers.modify_serializer import ModifySerializer;
from .serializers.delete_serializer import DeleteSerializer;

class RegisterView(APIView) :
    def post(self, request) :
        try :
            vo = JSONParser().parse(request);
            user_serializer = RegisterSerializer(data=vo);
            
            if user_serializer.is_valid(raise_exception=True) :
                user_serializer.save();

                return JsonResponse({
                    'payload': user_serializer.data,
                    'message': 'Successfully register'
                });

            return JsonResponse({
                'payload': None,
                'message': 'Error: Failed to register'
            });

        except ValidationError as e:
            return JsonResponse({
                'payload': None,
                'message': 'Error: ' + str(e)
            });

class LoginView(APIView) :
    def post(self, request) :
        try :
            vo = JSONParser().parse(request);
            user_serializer = LoginSerializer(data=vo);

            if user_serializer.is_valid(raise_exception=True) :
                email = user_serializer.data['email'];
                password = user_serializer.data['password'];

                user = User.objects.filter(email=email).first()

                if user is None :
                    raise AuthenticationFailed('User not found!');

                if bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')) is False :
                    raise AuthenticationFailed('Incorrect password');

                payload = {
                    'user_id': user.user_id,
                    'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
                    'iat': datetime.datetime.utcnow()
                };

                token = jwt.encode(payload, 
                                   'secret', 
                                   algorithm='HS256');
                
                return JsonResponse({
                    "payload": None,
                    "message": "Successfully login"
                }).set_cookie(key='token', 
                              value=token, 
                              httponly=True);
            
            return JsonResponse({
                "payload": None,
                "message": "Error: Falied to login"
            });

        except Exception as e :
            return JsonResponse({
                "payload": None,
                "message": "Error: " + str(e)
            });

class UserView(APIView) :
    def get(self, request) :
        token = request.COOKIES.get('token');

        if not token :
            raise AuthenticationFailed('Unauthenticated!');

        try :
            payload = jwt.decode(token, 
                                 'secret', 
                                 algorithms='HS256');
            user = User.objects.get(user_id=payload['user_id']);

            if not user :
                raise AuthenticationFailed('User not found!');

            user_serializer = UserSerializer(user);

            return JsonResponse({
                'payload': user_serializer.data,
                'message': "Successfully get user information"
            }); 

        except jwt.ExpiredSignatureError :
            raise AuthenticationFailed('Unauthenticated!');

class UsersView(APIView) :
    def get(self, request) :
        token = request.COOKIES.get('token');

        if not token :
            raise AuthenticationFailed('Unauthenticated!');

        try :
            jwt.decode(token, 
                       'secret', 
                       algorithms='HS256');

            users = User.objects.all().filter(is_active=True);

            if not users :
                raise AuthenticationFailed('Users not found');

            user_serializer = UsersSerializer(users, 
                                              many=True);

            return JsonResponse({
                'payload': user_serializer.data,
                'message': "Successfully get all users"
            });

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!');

class ModifyView(APIView) :
    def put(self, request) :
        token = request.COOKIES.get('token');

        if not token :
            raise AuthenticationFailed('Unauthenticated!');

        try :
            vo = JSONParser().parse(request);
            user = User.objects.get(user_id=vo['user_id']);

            if not user :
                raise AuthenticationFailed('User not found');

            user_serializer = ModifySerializer(user, 
                                               data=vo,
                                               partial=True);

            if user_serializer.is_valid(raise_exception=True) :
                user_serializer.save();

                return JsonResponse({
                    'payload': user_serializer.data,
                    'message': "Successfully update data"
                });

            return JsonResponse({
                'payload': None,
                'message': "Error: Failed to update user"
            });
        
        except Exception as e:
            return JsonResponse({
                'payload': None,
                'message': "Error message: " +  str(e)
            });

class LogoutView(APIView) :
    def post(self, request) :
        return JsonResponse({
            'payload': None,
            'message': "Successfully logout!"
        }).delete_cookie('token');

class DeleteView(APIView) :
    def put(self, request) :
        token = request.COOKIES.get('token');

        if not token :
            raise AuthenticationFailed('Unauthenticated');

        try :
            vo = JSONParser().parse(request);
            user = User.objects.get(user_id=vo['user_id']);

            if not user :
                raise AuthenticationFailed('User not found');

            user_serializer = DeleteSerializer(user, 
                                               data=vo,
                                               partial=True);

            if(user_serializer.is_valid(raise_exception=True)) :
                user_serializer.save();

                return JsonResponse({
                    'payload': user_serializer.data,
                    'message': "Successfully delete user"
                });

            return JsonResponse({
                'payload': None,
                'message': "Error: Falied to delete user"
            });
        except Exception as e:
            return JsonResponse({
                'payload': None,
                'message': "Error message: " + str(e)
            });