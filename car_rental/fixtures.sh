fixtures=("Branch.json" "CarType.json" "Car.json" "User.json" "Employee.json" "Customer.json" "Rental.json")

for str in ${fixtures[@]}; do
  python3 manage.py loaddata fixtures/$str
done