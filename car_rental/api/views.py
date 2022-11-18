from rest_framework import generics, viewsets, filters
from rest_framework.permissions import IsAuthenticated

from .serializers import UserSerializer, BranchSerializer, BranchPhoneNumberSerializer, EmployeePhoneNumberSerializer, EmployeeSerializer, CustomerSerializer, CustomerPhoneNumberSerializer, CarSerializer, CarTypeSerializer, RentalSerializer
from .models import Branch, BranchPhoneNumber, Employee, Customer, CustomerPhoneNumber, EmployeePhoneNumber, Car, CarType, Rental, User

# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['updated']
    ordering = ['-updated']

    def get_queryset(self):
        if self.request.user.is_superuser:
            return User.objects.all()

    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]

        obj = User.objects.get(lookup_field_value)
        self.check_object_permissions(self.request, obj)

        return obj


class RentalView(viewsets.ModelViewSet):
    serializer_class = RentalSerializer
    queryset = Rental.objects.all()


class BranchView(viewsets.ModelViewSet):
    serializer_class = BranchSerializer
    queryset = Branch.objects.all()


class BranchPhoneNumberView(viewsets.ModelViewSet):
    serializer_class = BranchPhoneNumberSerializer
    queryset = BranchPhoneNumber.objects.all()


class CarTypeView(viewsets.ModelViewSet):
    serializer_class = CarTypeSerializer
    queryset = CarType.objects.all()


class CarView(viewsets.ModelViewSet):
    serializer_class = CarSerializer
    queryset = Car.objects.all()


class EmployeeView(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()


class EmployeePhoneNumberView(viewsets.ModelViewSet):
    serializer_class = EmployeePhoneNumberSerializer
    queryset = EmployeePhoneNumber.objects.all()


class CustomerView(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all()


class CustomerPhoneNumberView(viewsets.ModelViewSet):
    serializer_class = CustomerPhoneNumberSerializer
    queryset = CustomerPhoneNumber.objects.all()
