
package com.EmployeeManagementSystem.Controller;

import com.EmployeeManagementSystem.Entity.Employee;
import com.EmployeeManagementSystem.Service.EmployeeService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService service;

    public EmployeeController(EmployeeService service) {
        this.service = service;
    }

    // Get all employees
    @GetMapping
    public List<Employee> getAll() {
        return service.getAll();
    }

    // Get employee by ID
    @GetMapping("/{id}")
    public Employee getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // Create new employee
    @PostMapping
    public ResponseEntity<Employee> create(
            @Valid @RequestBody Employee employee) {

        return new ResponseEntity<>(
                service.create(employee),
                HttpStatus.CREATED
        );
    }

    // Update employee
    @PutMapping("/{id}")
    public Employee update(
            @PathVariable Long id,
            @Valid @RequestBody Employee employee) {

        return service.update(id, employee);
    }

    // Delete employee
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        service.delete(id);

        return ResponseEntity.noContent().build();
    }
}
