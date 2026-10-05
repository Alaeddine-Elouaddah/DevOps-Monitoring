package com.devops.monitoring.repository;

import com.devops.monitoring.entity.Server;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ServerRepository extends JpaRepository<Server, Long> {
    @Query("SELECT s FROM Server s WHERE " +
            "(:search IS NULL OR LOWER(s.name) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(s.hostname) LIKE LOWER(CONCAT('%', :search, '%')) OR s.ipAddress LIKE CONCAT('%', :search, '%')) AND " +
            "(:env IS NULL OR s.environment = :env) AND " +
            "(:status IS NULL OR s.status = :status)")
    Page<Server> findServers(@Param("search") String search, 
                             @Param("env") Server.Environment env, 
                             @Param("status") Server.ServerStatus status, 
                             Pageable pageable);
                             
    long countByStatus(Server.ServerStatus status);
}
