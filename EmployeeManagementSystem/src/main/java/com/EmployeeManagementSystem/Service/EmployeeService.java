package com.EmployeeManagementSystem.Service;

import com.EmployeeManagementSystem.Entity.Employee;
import com.EmployeeManagementSystem.Exception.ResourceNotFoundException;
import com.EmployeeManagementSystem.Repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    public List<Employee> getAll() {
        return repository.findAll();
    }

    public Employee getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id " + id));
    }

    public Employee create(Employee employee) {
        return repository.save(employee);
    }

    public Employee update(Long id, Employee details) {
        Employee e = getById(id);
        e.setFirstName(details.getFirstName());
        e.setLastName(details.getLastName());
        e.setEmail(details.getEmail());
        e.setDepartment(details.getDepartment());
        e.setSalary(details.getSalary());
        return repository.save(e);
    }

    public void delete(Long id) {
        repository.delete(getById(id));
    }
}