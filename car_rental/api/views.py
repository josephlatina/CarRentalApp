from rest_framework import generics, viewsets, filters, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from .serializers import UserSerializer, BranchSerializer, BranchPhoneNumberSerializer, EmployeePhoneNumberSerializer, EmployeeSerializer, CustomerSerializer, CustomerPhoneNumberSerializer, CarSerializer, CarTypeSerializer, RentalSerializer
from .models import Branch, BranchPhoneNumber, Employee, Customer, CustomerPhoneNumber, EmployeePhoneNumber, Car, CarType, Rental, User
from rest_framework.response import Response
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
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    def get_queryset(self):
        queryset = self.queryset

        # Filter by user id
        request_user_id = self.request.GET.get('user_id')
        if (request_user_id != None):
            query_set = queryset.filter(user=request_user_id)
            return query_set

        if (bool(self.kwargs)):
            customer_id = self.kwargs['pk']
            if (customer_id != None):
                query_set = queryset.filter(id=customer_id)
                return query_set

        # Return all
        return queryset


class CustomerPhoneNumberView(viewsets.ModelViewSet):
    serializer_class = CustomerPhoneNumberSerializer
    queryset = CustomerPhoneNumber.objects.all()
