from rest_framework.views import APIView;
from rest_framework.parsers import JSONParser;
from django.http.response import JsonResponse, HttpResponse;

from rest_framework.exceptions import AuthenticationFailed;
import jwt, datetime;

from .models import User;
from .serializers.register_serializer import RegisterSerializer;
from .serializers.login_serializer import LoginSerializer;
from .serializers.users_serializer import UsersSerializer;
from .serializers.user_serializer import UserSerializer;

class RegisterView(APIView) :
    def post(self, request) :
        try :
            vo = JSONParser().parse(request);
            user_serializer = RegisterSerializer(data=vo);

            if user_serializer.is_valid(raise_exception=True) :
                entity = user_serializer.save();

                return JsonResponse({
                    'payload': entity,
                    'message': 'Successfully register'
                });

            return JsonResponse({
                'payload': None,
                'message': 'Failed to register'
            });
        except Exception as e:
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

                if not user.check_password(password) :
                    raise AuthenticationFailed('Incorrect password');

                payload = {
                    'user_id': user.user_id,
                    'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
                    'iat': datetime.datetime.utcnow()
                };

                token = jwt.encode(payload, 'secret', algorithm='HS256');
                response = HttpResponse();

                response.set_cookie(key='token', value=token, httponly=True);
                response.data = {
                    "payload": None,
                    "message": "Successfully login"
                };

                return response;
            
            return JsonResponse({
                "payload": None,
                "message": "Falied to login"
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
            payload = jwt.decode(token, 'secret', algorithms='HS256');
            user = User.objects.get(user_id=payload['user_id']);
            user_serializer = UserSerializer(user);

            if not user :
                return JsonResponse({
                    'payload': None,
                    'message': "Failed to get user information"
                });
                
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
            jwt.decode(token, 'secret', algorithms='HS256');

            user = User.objects.all();
            user_serializer = UsersSerializer(user, many=True);

            return JsonResponse({
                'payload': user_serializer.data,
                'message': "Successfully get all users"
            });

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!');

class LogoutView(APIView) :
    def post(self, request) :
        response  = HttpResponse();

        response.delete_cookie('token');
        response.data = {
            'payload': None,
            'message': "Successfully logout!"
        };

        return response;