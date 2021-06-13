from django.db.models.signals import pre_save
from django.contrib.auth.models import User
from django.dispatch import receiver


@receiver(pre_save, sender=User) 
def updateUser(sender, instance, **kwargs):
    user = instance
    if user != '':
        user.username = user.email

# pre_save.connect(updateUser, sender=User)
