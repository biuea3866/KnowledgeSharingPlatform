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
from .serializers.resurrect_serializer import ResurrectSerializer;

from django.core.cache import cache;

class RegisterView(APIView) :
    def post(self, request) :
        token = request.META['HTTP_AUTHORIZATION'];

        if not token :
            raise AuthenticationFailed('Unauthenticated!');

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

class CheckEmailView(APIView) :
    def get(self, request, email) :
        try :
            if not User.objects.filter(email=email).exists() :
                return JsonResponse({
                    "payload": True,
                    "message": "Available email!"
                });

            return JsonResponse({
                "payload": False,
                "message":"Already existed email!"
            });

        except Exception as e :
            return JsonResponse({
                "payload": None,
                "message": "Error: " + str(e)
            });

class CheckNicknameView(APIView) :
     def get(self, request, nickname) :
        try :
            if not User.objects.filter(nickname=nickname).exists() :
                return JsonResponse({
                    "payload": True,
                    "message": "Available nickname!"
                });

            return JsonResponse({
                "payload": False,
                "message":"Already existed nickname!"
            });

        except Exception as e :
            return JsonResponse({
                "payload": None,
                "message": "Error: " + str(e)
            });

class LoginView(APIView) :
    def post(self, request) :
        try :
            vo = JSONParser().parse(request);
            user_serializer = LoginSerializer(data=vo);

            if user_serializer.is_valid(raise_exception=True) :
                email = user_serializer.data['email'];
                password = user_serializer.data['password'];

                user = cache.get_or_set('user', User.objects.filter(email=email).first());

                if user is None :
                    raise AuthenticationFailed('User not found!');

                if user.is_active is False :
                    raise AuthenticationFailed('Deactivating user');

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
                    "payload": token,
                    "message": "Successfully login"
                });
            
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
        token = request.META['HTTP_AUTHORIZATION'];

        if not token :
            raise AuthenticationFailed('Unauthenticated!');

        try :
            payload = jwt.decode(token, 
                                 'secret', 
                                 algorithms='HS256');
            user = cache.get_or_set('user', User.objects.get(user_id=payload['user_id']));

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
        token = request.META['HTTP_AUTHORIZATION'];

        if not token :
            raise AuthenticationFailed('Unauthenticated!');

        try :
            users = User.objects.all();

            user_serializer = cache.cache.get_or_set('users', 
                                                     UsersSerializer(users, 
                                                                     many=True));

            return JsonResponse({
                'payload': user_serializer.data,
                'message': "Successfully get all users"
            });

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!');

class ModifyView(APIView) :
    def put(self, request) :
        token = request.META['HTTP_AUTHORIZATION'];

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
        response = JsonResponse({
            'payload': None,
            'message': "Successfully logout!"
        });

        response.delete_cookie('token'); 

        return response;

class DeleteView(APIView) :
    def put(self, request) :
        token = request.META['HTTP_AUTHORIZATION'];

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

class ResurrectView(APIView) :
    def put(self, request) :
        token = request.META['HTTP_AUTHORIZATION'];

        if not token :
            raise AuthenticationFailed('Unauthenticated');

        try :
            vo = JSONParser().parse(request);
            user = User.objects.get(user_id=vo['user_id']);

            if not user :
                raise AuthenticationFailed('User not found');

            user_serializer = ResurrectSerializer(user, 
                                                  data=vo,
                                                  partial=True);

            if(user_serializer.is_valid(raise_exception=True)) :
                user_serializer.save();

                return JsonResponse({
                    'payload': user_serializer.data,
                    'message': "Successfully resurrect user"
                });

            return JsonResponse({
                'payload': None,
                'message': "Error: Falied to resurrect user"
            });
        except Exception as e:
            return JsonResponse({
                'payload': None,
                'message': "Error message: " + str(e)
            });