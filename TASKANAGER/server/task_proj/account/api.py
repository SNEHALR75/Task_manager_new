from account.serializers import UserDetailSerializer,UserTasksSerializer
from account.models import User
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView,RetrieveAPIView
from task_app.permissions import IsManagerOrTL
from datetime import datetime,timedelta,timezone
import jwt
from django.conf import settings
from account.utils import async_send_email
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework_simplejwt import tokens as jwt_tokens, views as jwt_views, serializers as jwt_serializers, exceptions as jwt_exceptions
from django.middleware import csrf
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import action


class UserTasksView(RetrieveAPIView):
    permission_classes = [IsAuthenticated,IsManagerOrTL]
    authentication_classes = [JWTAuthentication,]
    serializer_class = UserTasksSerializer
    queryset = User.objects.all()

class UserViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    serializer_class = UserDetailSerializer
    queryset = User.objects.all()
    http_method_names = ['get']

    @action(detail=False,methods = ['get'])
    def developers(self,request):
        developers = User.objects.filter(role='developer')
        serializer = self.get_serializer(developers,many=True)
        return Response(serializer.data)


class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self,request):
        serializer = UserDetailSerializer(request.user)
        return Response(data=serializer.data,status=200)
        
    def patch(self,request):
        print(request.data)
        serilaizer = UserDetailSerializer(data=request.data,instance=request.user,partial=True)
        if serilaizer.is_valid():
            serilaizer.save()
            return Response(data=serilaizer.data,status=200)
        return Response(data=serilaizer.errors,status=400)
    






class SignUpView(CreateAPIView):
    serializer_class = UserDetailSerializer
    queryset = User.objects.all()


    def perform_create(self,serializer):
        user = serializer.save(is_active = False)

        jwt_payload = jwt.encode(
            {"exp":datetime.now(tz=timezone.utc) + timedelta(minutes=15),
             "user":user.id},"secret")
        print( jwt_payload )
        print( f'http://127.0.0.1:3000/account/activate/{jwt_payload}/' )


        async_send_email(
            subject = "Account Activation Mail",
            message = f"Your Account Activation Link : http://127.0.0.1:3000/account/activate/{jwt_payload}/",
            from_email = settings.EMAIL_HOST_USER,
            recipient_list = [ user.email ]
        )

class AccountActivationView(APIView):
    def post(self,request,token):
        try:
            jwt_payload = jwt.decode(token, "secret", algorithms=["HS256"])
            # print( jwt_payload )
        except jwt.ExpiredSignatureError:
            print( 'expired token' )
            return Response(data={"detail":'InvalidToken.'},status=400)
        except Exception as e:
            print( e )
            return Response(data={"detail":'InvalidToken.'},status=400)
        else:
            user = get_object_or_404(User, id=jwt_payload.get( 'user' ) )
            user.is_active = 1
            user.save()
        
            return Response(data={"detail":'Account activated.'},status=200)
        

def get_tokens_for_user(user):
    refresh = jwt_tokens.RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class SignInView(APIView):
    def post(self,request):
        response = Response()
        try:
            username=request.data.get('username')
            password=request.data.get('password')
            user = User.objects.get( username=username )
        except:
            return Response(data={"detail":"Incorrect un/pw."},status=400)
        else:
            if user.check_password(password):
                if not user.is_active:
                    return Response(data={"detail":"Inactive Account."},status=400)

                tokens = get_tokens_for_user(user)
                response = Response(data=tokens)
                response.set_cookie(
                        key = settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'], 
                        value = tokens["refresh"],
                        expires = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                        secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                        httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                        samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
                    )

            else:
                return Response(data={"detail":"Incorrect un/pw."},status=400)
            response["X-CSRFToken"] = csrf.get_token(request)
            return response



class CookieTokenRefreshSerializer(jwt_serializers.TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs):
        attrs['refresh'] = self.context['request'].COOKIES.get('refresh')
        if attrs['refresh']:
            return super().validate(attrs)
        else:
            raise jwt_exceptions.InvalidToken("No valid token found in cookie 'refresh'.")


class CookieTokenRefreshView(jwt_views.TokenRefreshView):
    serializer_class = CookieTokenRefreshSerializer

    def finalize_response(self, request, response, *args, **kwargs):
        print( response.data )   
        try:
            response["X-CSRFToken"] = request.COOKIES.get("csrftoken")

        except Exception as e:
            print(e)

        return super().finalize_response(request, response, *args, **kwargs)


class LogoutView(APIView):
    def post(self,request):
        response = Response()
        try:
            refreshToken = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
            token = jwt_tokens.RefreshToken(refreshToken)
            token.blacklist()
        except Exception as e:
            print(e)
            response = Response(data={"detail": "Invalid Token."},status=400)
        finally:
            response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'])
            response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
            response.delete_cookie("X-CSRFToken")
            response.delete_cookie("csrftoken")
            response["X-CSRFToken"]=None
       
        return response
    

