from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import FileExtensionValidator


class User( AbstractUser ):
	GENDERS = (('male','male'),('female','female'),('other','other'))
	ROLES = (('manager','manager'), ('team_leader','team_leader'), ('developer','developer'))
 
	email = models.EmailField(unique=True)
	gender = models.CharField(max_length=50,null=True,blank=True,choices=GENDERS)
	profile_pic = models.ImageField(max_length=50,upload_to="profile_pic/",null=True,blank=True,
			validators = [ FileExtensionValidator(['jpg', 'jpeg', 'png']) ]
		)
	address = models.TextField(null=True,blank=True)
	pincode = models.IntegerField(null=True,blank=True)
	city = models.CharField(max_length=50,null=True,blank=True)
	contact = models.BigIntegerField(null=True,blank=True)
	role = models.CharField(max_length=50,choices=ROLES)
	company = models.CharField(max_length=50,null=True,blank=True)





	




















