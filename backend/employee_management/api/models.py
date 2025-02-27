from django.contrib.auth.models import AbstractUser
from django.db import models

# Custom User Model
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('manager', 'Manager'),
        ('employee', 'Employee'),
    ]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='employee')
    def __str__(self):
        return self.name

# Company Model
class Company(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name

    @property
    def num_departments(self):
        return self.departments.count()

    @property
    def num_employees(self):
        return Employee.objects.filter(department__company=self).count()

# Department Model
class Department(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="departments")
    name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.name} - {self.company.name}"

    @property
    def num_employees(self):
        return self.employees.count()

# Employee Model
class Employee(models.Model):
    STATUS_CHOICES = [
        ('application_received', 'Application Received'),
        ('interview_scheduled', 'Interview Scheduled'),
        ('hired', 'Hired'),
        ('not_accepted', 'Not Accepted'),
    ]
    def __str__(self):
        return self.name

    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name="employees")
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    address = models.TextField()
    designation = models.CharField(max_length=255)
    hired_on = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='application_received')

    def __str__(self):
        return f"{self.name} - {self.designation}"

    @property
    def days_employed(self):
        from datetime import date
        return (date.today() - self.hired_on).days if self.hired_on else None
