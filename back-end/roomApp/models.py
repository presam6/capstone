from django.db import models

# Create your models here.

class Room(models.Model):
    room_number = models.IntegerField(unique=True)
    capacity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Room {self.room_number} - Capacity: {self.capacity} - Price: {self.price}"
