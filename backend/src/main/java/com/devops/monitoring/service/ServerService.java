package com.devops.monitoring.service;

import com.devops.monitoring.dto.server.ServerRequest;
import com.devops.monitoring.dto.server.ServerResponse;
import com.devops.monitoring.entity.Metric;
import com.devops.monitoring.entity.Server;
import com.devops.monitoring.exception.ResourceNotFoundException;
import com.devops.monitoring.repository.MetricRepository;
import com.devops.monitoring.repository.ServerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ServerService {

    private final ServerRepository serverRepository;
    private final MetricRepository metricRepository;

    public Page<ServerResponse> getAllServers(Pageable pageable, String search, String environment, String status) {
        Server.Environment envEnum = environment != null && !environment.isEmpty() ? Server.Environment.valueOf(environment.toUpperCase()) : null;
        Server.ServerStatus statusEnum = status != null && !status.isEmpty() ? Server.ServerStatus.valueOf(status.toUpperCase()) : null;
        
        return serverRepository.findServers(search, envEnum, statusEnum, pageable)
                .map(this::mapToServerResponse);
    }

    public ServerResponse getServerById(Long id) {
        Server server = serverRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Server not found with id: " + id));
        return mapToServerResponse(server);
    }

    public ServerResponse createServer(ServerRequest request) {
        Server server = Server.builder()
                .name(request.getName())
                .hostname(request.getHostname())
                .ipAddress(request.getIpAddress())
                .operatingSystem(request.getOperatingSystem())
                .environment(request.getEnvironment())
                .status(request.getStatus())
                .build();
        return mapToServerResponse(serverRepository.save(server));
    }

    public ServerResponse updateServer(Long id, ServerRequest request) {
        Server server = serverRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Server not found with id: " + id));
        
        server.setName(request.getName());
        server.setHostname(request.getHostname());
        server.setIpAddress(request.getIpAddress());
        server.setOperatingSystem(request.getOperatingSystem());
        server.setEnvironment(request.getEnvironment());
        server.setStatus(request.getStatus());
        
        return mapToServerResponse(serverRepository.save(server));
    }

    public ServerResponse patchServer(Long id, ServerRequest request) {
        Server server = serverRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Server not found with id: " + id));
        
        if (request.getName() != null) server.setName(request.getName());
        if (request.getHostname() != null) server.setHostname(request.getHostname());
        if (request.getIpAddress() != null) server.setIpAddress(request.getIpAddress());
        if (request.getOperatingSystem() != null) server.setOperatingSystem(request.getOperatingSystem());
        if (request.getEnvironment() != null) server.setEnvironment(request.getEnvironment());
        if (request.getStatus() != null) server.setStatus(request.getStatus());
        
        return mapToServerResponse(serverRepository.save(server));
    }

    public void deleteServer(Long id) {
        Server server = serverRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Server not found with id: " + id));
        serverRepository.delete(server);
    }

    private ServerResponse mapToServerResponse(Server server) {
        Optional<Metric> latestMetric = metricRepository.findFirstByServerIdOrderByTimestampDesc(server.getId());
        
        return ServerResponse.builder()
                .id(server.getId())
                .name(server.getName())
                .hostname(server.getHostname())
                .ipAddress(server.getIpAddress())
                .operatingSystem(server.getOperatingSystem())
                .environment(server.getEnvironment())
                .status(server.getStatus())
                .createdAt(server.getCreatedAt())
                .updatedAt(server.getUpdatedAt())
                .latestCpu(latestMetric.map(Metric::getCpuUsage).orElse(null))
                .latestMemory(latestMetric.map(Metric::getMemoryUsage).orElse(null))
                .latestDisk(latestMetric.map(Metric::getDiskUsage).orElse(null))
                .build();
    }
}
