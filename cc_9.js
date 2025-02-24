// Task 1 - Created Employee Class
class Employee {
    constructor(name, id, department, salary) {
        this.name = name;
        this.id = id;
        this.department = department;
        this.salary = salary;
    }

    getDetails() {
        return `Employee: ${this.name}, ID: ${this.id}, Department: ${this.department}, Salary: $${this.salary}`;
    }

    calculateAnnualSalary() {
        return this.salary * 12;
    }
}

// Test Case for Task 1
const emp1 = new Employee("Alice Johnson", 101, "Sales", 5000);
console.log(emp1.getDetails()); // Expected output: "Employee: Alice Johnson, ID: 101, Department: Sales, Salary: $5000"
console.log(emp1.calculateAnnualSalary()); // Expected output: 60000

// Task 2 - Created Manager Class with Inheritance
class Manager extends Employee {
    constructor(name, id, department, salary, teamSize) {
        super(name, id, department, salary);
        this.teamSize = teamSize;
    }

    getDetails() {
        return `Manager: ${this.name}, ID: ${this.id}, Department: ${this.department}, Salary: $${this.salary}, Team Size: ${this.teamSize}`;
    }

    calculateBonus() {
        return this.calculateAnnualSalary() * 0.10;
    }
}

// Test Case for Task 2
const mgr1 = new Manager("John Smith", 201, "IT", 8000, 5);
console.log(mgr1.getDetails());
// Expected output: "Manager: John Smith, ID: 201, Department: IT, Salary: $8000, Team Size: 5"
console.log(mgr1.calculateBonus());
// Expected output: 9600

// Task 3 - Created Company Class
class Company {
    constructor(name) {
        this.name = name;
        this.employees = [];
    }

    addEmployee(employee) {
        this.employees.push(employee);
    }

    listEmployees() {
        this.employees.forEach(emp => console.log(emp.getDetails()));
    }
}

// Test Case for Task 3
const company = new Company("TechCorp");
company.addEmployee(emp1);
company.addEmployee(mgr1);
company.listEmployees();
// Expected output:
// "Employee: Alice Johnson, ID: 101, Department: Sales, Salary: $5000"
// "Manager: John Smith, ID: 201, Department: IT, Salary: $8000, Team Size: 5"

// Task 4 - Implemented Payroll System
class PayrollCompany extends Company {
    calculateTotalPayroll() {
        return this.employees.reduce((total, emp) => {
            if (emp instanceof Manager) {
                return total + emp.calculateAnnualSalary() + emp.calculateBonus();
            }
            return total + emp.calculateAnnualSalary();
        }, 0);
    }
}

// Test Case for Task 4
const payrollCompany = new PayrollCompany("TechCorp");
payrollCompany.addEmployee(emp1);
payrollCompany.addEmployee(mgr1);
console.log(payrollCompany.calculateTotalPayroll()); 
// Expected output: 165600

// Task 5 - Implemented Promotion System
Company.prototype.promoteToManager = function(employee, teamSize) {
    const index = this.employees.findIndex(emp => emp.id === employee.id);
    if (index !== -1) {
        const newManager = new Manager(employee.name, employee.id, employee.department, employee.salary, teamSize);
        this.employees[index] = newManager;
    }
};

// Test Case for Task 5
company.promoteToManager(emp1, 3);
company.listEmployees();
// Expected output: "Manager: Alice Johnson, ID: 101, Department: Sales, Salary: $5000, Team Size: 3"
