package exakis.atlantis.mobileapi.repositories;

import exakis.atlantis.mobileapi.models.Device;
import org.springframework.data.repository.CrudRepository;

public interface DeviceRepository extends CrudRepository<Device, String> {
    Iterable<Device> findByUserId(String userId);
    Device getDeviceSensors(String userId, String macAddress);
}
