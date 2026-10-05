package com.devops.monitoring.service;

import com.devops.monitoring.dto.server.ServerRequest;
import com.devops.monitoring.dto.server.ServerResponse;
import com.devops.monitoring.entity.Metric;
import com.devops.monitoring.entity.Server;
import com.devops.monitoring.exception.ResourceNotFoundException;
import com.devops.monitoring.repository.MetricRepository;
import com.devops.monitoring.repository.ServerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ServerServiceTest {

    @Mock
    private ServerRepository serverRepository;

    @Mock
    private MetricRepository metricRepository;

    @InjectMocks
    private ServerService serverService;

    private Server server;
    private ServerRequest serverRequest;

    @BeforeEach
    void setUp() {
        server = Server.builder()
                .id(1L)
                .name("test-server")
                .build();
                
        serverRequest = new ServerRequest();
        serverRequest.setName("new-server");
    }

    @Test
    void testGetAllServers() {
        when(serverRepository.findServers(any(), any(), any(), any())).thenReturn(new PageImpl<>(List.of(server)));
        when(metricRepository.findFirstByServerIdOrderByTimestampDesc(anyLong())).thenReturn(Optional.empty());

        Page<ServerResponse> result = serverService.getAllServers(PageRequest.of(0, 10), null, null, null);

        assertNotNull(result);
        assertEquals(1, result.getContent().size());
        assertEquals("test-server", result.getContent().get(0).getName());
    }

    @Test
    void testGetServerById_NotFound() {
        when(serverRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> serverService.getServerById(1L));
    }

    @Test
    void testCreateServer() {
        when(serverRepository.save(any(Server.class))).thenReturn(server);
        
        ServerResponse result = serverService.createServer(serverRequest);

        assertNotNull(result);
        assertEquals("test-server", result.getName());
    }

    @Test
    void testDeleteServer() {
        when(serverRepository.findById(1L)).thenReturn(Optional.of(server));
        
        serverService.deleteServer(1L);
        
        verify(serverRepository, times(1)).delete(server);
    }
}
