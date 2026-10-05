package com.devops.monitoring.controller;

import com.devops.monitoring.dto.server.ServerRequest;
import com.devops.monitoring.dto.server.ServerResponse;
import com.devops.monitoring.entity.Server;
import com.devops.monitoring.exception.ResourceNotFoundException;
import com.devops.monitoring.service.ServerService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityFilterAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import com.devops.monitoring.security.SecurityConfig;
import com.devops.monitoring.security.JwtAuthenticationFilter;

@WebMvcTest(controllers = ServerController.class)
@AutoConfigureMockMvc(addFilters = false)
class ServerControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ServerService serverService;

    @MockBean
    private com.devops.monitoring.security.JwtService jwtService;

    @MockBean
    private com.devops.monitoring.security.CustomUserDetailsService userDetailsService;

    private ServerResponse serverResponse;
    private ServerRequest serverRequest;

    @BeforeEach
    void setUp() {
        serverResponse = ServerResponse.builder()
                .id(1L)
                .name("test-server")
                .environment(Server.Environment.DEVELOPMENT)
                .build();
                
        serverRequest = new ServerRequest();
        serverRequest.setName("test-server");
        serverRequest.setHostname("test");
        serverRequest.setIpAddress("127.0.0.1");
        serverRequest.setOperatingSystem("Linux");
        serverRequest.setEnvironment(Server.Environment.DEVELOPMENT);
        serverRequest.setStatus(Server.ServerStatus.ONLINE);
    }

    @Test
    void testGetAllServers() throws Exception {
        Page<ServerResponse> page = new PageImpl<>(List.of(serverResponse));
        when(serverService.getAllServers(any(Pageable.class), any(), any(), any())).thenReturn(page);

        mockMvc.perform(get("/api/servers"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].name").value("test-server"));
    }

    @Test
    void testCreateServer() throws Exception {
        when(serverService.createServer(any(ServerRequest.class))).thenReturn(serverResponse);

        mockMvc.perform(post("/api/servers")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(serverRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("test-server"));
    }

    @Test
    void testGetServerById_NotFound() throws Exception {
        when(serverService.getServerById(1L)).thenThrow(new ResourceNotFoundException("Not found"));

        mockMvc.perform(get("/api/servers/1"))
                .andExpect(status().isNotFound());
    }
}
