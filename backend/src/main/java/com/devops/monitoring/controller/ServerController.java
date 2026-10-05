package com.devops.monitoring.controller;

import com.devops.monitoring.dto.server.ServerRequest;
import com.devops.monitoring.dto.server.ServerResponse;
import com.devops.monitoring.service.ServerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/servers")
@RequiredArgsConstructor
public class ServerController {

    private final ServerService serverService;

    @GetMapping
    public ResponseEntity<Page<ServerResponse>> getAllServers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String environment,
            @RequestParam(required = false) String status
    ) {
        return ResponseEntity.ok(serverService.getAllServers(PageRequest.of(page, size), search, environment, status));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServerResponse> getServerById(@PathVariable Long id) {
        return ResponseEntity.ok(serverService.getServerById(id));
    }

    @PostMapping
    public ResponseEntity<ServerResponse> createServer(@Valid @RequestBody ServerRequest request) {
        return new ResponseEntity<>(serverService.createServer(request), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServerResponse> updateServer(@PathVariable Long id, @Valid @RequestBody ServerRequest request) {
        return ResponseEntity.ok(serverService.updateServer(id, request));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ServerResponse> patchServer(@PathVariable Long id, @RequestBody ServerRequest request) {
        return ResponseEntity.ok(serverService.patchServer(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteServer(@PathVariable Long id) {
        serverService.deleteServer(id);
        return ResponseEntity.noContent().build();
    }
}
