package com.devops.monitoring.service;

import com.devops.monitoring.dto.alert.AlertResponse;
import com.devops.monitoring.entity.Alert;
import com.devops.monitoring.entity.Server;
import com.devops.monitoring.exception.ResourceNotFoundException;
import com.devops.monitoring.repository.AlertRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AlertServiceTest {

    @Mock
    private AlertRepository alertRepository;

    @InjectMocks
    private AlertService alertService;

    private Alert alert;

    @BeforeEach
    void setUp() {
        Server server = Server.builder().id(1L).name("test-server").build();
        alert = Alert.builder()
                .id(1L)
                .server(server)
                .resolved(false)
                .message("Test message")
                .build();
    }

    @Test
    void testResolveAlert() {
        when(alertRepository.findById(1L)).thenReturn(Optional.of(alert));
        when(alertRepository.save(any(Alert.class))).thenReturn(alert);

        AlertResponse response = alertService.resolveAlert(1L);

        assertTrue(alert.getResolved());
        assertTrue(response.getResolved());
        verify(alertRepository).save(alert);
    }

    @Test
    void testGetAlertById_NotFound() {
        when(alertRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> alertService.getAlertById(1L));
    }

    @Test
    void testDeleteAlert() {
        when(alertRepository.findById(1L)).thenReturn(Optional.of(alert));

        alertService.deleteAlert(1L);

        verify(alertRepository).delete(alert);
    }
}
