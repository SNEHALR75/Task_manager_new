from rest_framework import serializers
from task_app.serializers import TaskSerializer

from django.contrib.auth import get_user_model
User = get_user_model()



class UserTasksSerializer(serializers.ModelSerializer):
	date_joined = serializers.DateTimeField( format="%d/%m/%Y %H:%M:%S", read_only=True )
	assigner = TaskSerializer(many=True,read_only=True)
	assignee = TaskSerializer(many=True,read_only=True)
	class Meta:
		model = User
		fields = "__all__"
		read_only_fields = ['id','date_joined','last_login','groups',
			'user_permissions','assigner','assignee']



class UserDetailSerializer(serializers.ModelSerializer):
	date_joined = serializers.DateTimeField( format="%d/%m/%Y %H:%M:%S", read_only=True )
	last_login = serializers.DateTimeField( format="%d/%m/%Y %H:%M:%S", read_only=True )
	class Meta:
		model = User
		fields = "__all__"
		read_only_fields = ['id','date_joined','last_login','groups','user_permissions']


	def create(self,validated_data):
		return User.objects.create_user(**validated_data)

	def update(self,instance,validated_data):
		instance.email = validated_data.get( 'email', instance.email  )
		instance.gender = validated_data.get( 'gender', instance.gender  )
		instance.address = validated_data.get( 'address', instance.address  )
		instance.pincode = validated_data.get( 'pincode', instance.pincode  )
		instance.city = validated_data.get( 'city', instance.city  )
		instance.contact = validated_data.get( 'contact', instance.contact  )
		instance.role = validated_data.get( 'role', instance.role  )
		instance.profile_pic = validated_data.get( 'profile_pic', instance.profile_pic  )
		instance.company = validated_data.get( 'company', instance.company  )
		instance.save()
		return instance