package com.devops.monitoring.service;

import com.devops.monitoring.entity.Alert;
import com.devops.monitoring.entity.Metric;
import com.devops.monitoring.entity.Server;
import com.devops.monitoring.entity.User;
import com.devops.monitoring.repository.AlertRepository;
import com.devops.monitoring.repository.MetricRepository;
import com.devops.monitoring.repository.ServerRepository;
import com.devops.monitoring.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class DataInitializerService implements ApplicationRunner {

    private final UserRepository userRepository;
    private final ServerRepository serverRepository;
    private final MetricRepository metricRepository;
    private final AlertRepository alertRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        if (userRepository.count() == 0) {
            initData();
        }
    }

    private void initData() {
        // Create Admin
        User admin = User.builder()
                .firstName("Admin")
                .lastName("User")
                .email("admin@devops.local")
                .password(passwordEncoder.encode("Admin123!"))
                .role(User.Role.ADMIN)
                .build();
        userRepository.save(admin);

        // Create Servers
        Server prod1 = Server.builder()
                .name("server-prod-01")
                .environment(Server.Environment.PRODUCTION)
                .status(Server.ServerStatus.ONLINE)
                .operatingSystem("Ubuntu 22.04 LTS")
                .hostname("prod-01.devops.local")
                .ipAddress("10.0.1.101")
                .build();

        Server prod2 = Server.builder()
                .name("server-prod-02")
                .environment(Server.Environment.PRODUCTION)
                .status(Server.ServerStatus.WARNING)
                .operatingSystem("Ubuntu 22.04 LTS")
                .hostname("prod-02.devops.local")
                .ipAddress("10.0.1.102")
                .build();

        Server staging1 = Server.builder()
                .name("server-staging-01")
                .environment(Server.Environment.STAGING)
                .status(Server.ServerStatus.ONLINE)
                .operatingSystem("CentOS Stream 9")
                .hostname("staging-01.devops.local")
                .ipAddress("10.0.2.101")
                .build();

        Server dev1 = Server.builder()
                .name("server-dev-01")
                .environment(Server.Environment.DEVELOPMENT)
                .status(Server.ServerStatus.OFFLINE)
                .operatingSystem("Debian 12")
                .hostname("dev-01.devops.local")
                .ipAddress("10.0.3.101")
                .build();

        serverRepository.save(prod1);
        serverRepository.save(prod2);
        serverRepository.save(staging1);
        serverRepository.save(dev1);

        // Generate Metrics
        generateMetrics(prod1);
        generateMetrics(prod2);
        generateMetrics(staging1);

        // Create Alerts
        Alert alert1 = Alert.builder()
                .server(prod2)
                .type(Alert.AlertType.CPU)
                .severity(Alert.AlertSeverity.CRITICAL)
                .message("CPU usage exceeded 95%")
                .resolved(false)
                .build();
                
        Alert alert2 = Alert.builder()
                .server(prod2)
                .type(Alert.AlertType.MEMORY)
                .severity(Alert.AlertSeverity.WARNING)
                .message("Memory usage high")
                .resolved(false)
                .build();

        Alert alert3 = Alert.builder()
                .server(dev1)
                .type(Alert.AlertType.SERVER)
                .severity(Alert.AlertSeverity.CRITICAL)
                .message("Server is unresponsive")
                .resolved(false)
                .build();

        Alert alert4 = Alert.builder()
                .server(prod1)
                .type(Alert.AlertType.DISK)
                .severity(Alert.AlertSeverity.INFO)
                .message("Disk cleanup completed")
                .resolved(true)
                .build();

        Alert alert5 = Alert.builder()
                .server(staging1)
                .type(Alert.AlertType.NETWORK)
                .severity(Alert.AlertSeverity.WARNING)
                .message("High network latency detected")
                .resolved(false)
                .build();

        alertRepository.save(alert1);
        alertRepository.save(alert2);
        alertRepository.save(alert3);
        alertRepository.save(alert4);
        alertRepository.save(alert5);
    }

    private void generateMetrics(Server server) {
        LocalDateTime now = LocalDateTime.now();
        for (int i = 0; i < 20; i++) {
            Metric m = Metric.builder()
                    .server(server)
                    .cpuUsage(20.0 + (Math.random() * 65.0))
                    .memoryUsage(30.0 + (Math.random() * 60.0))
                    .diskUsage(40.0 + (Math.random() * 40.0))
                    .networkIn(10.0 + (Math.random() * 100.0))
                    .networkOut(10.0 + (Math.random() * 100.0))
                    .timestamp(now.minusHours(19 - i))
                    .build();
            metricRepository.save(m);
        }
    }
}
