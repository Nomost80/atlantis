package exakis.atlantis.mobileapi.repositories;

import exakis.atlantis.mobileapi.models.Device;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.repository.CrudRepository;

public interface DeviceRepository extends CrudRepository<Device, String> {
    Iterable<Device> findByUserId(String userId);

    @EntityGraph(value = "device.sensors")
    Device findByUserIdAndMacAddress(String userId, String macAddress);
}
