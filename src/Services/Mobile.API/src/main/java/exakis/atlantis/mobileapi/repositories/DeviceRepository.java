package exakis.atlantis.mobileapi.repositories;

import exakis.atlantis.mobileapi.models.Device;
import exakis.atlantis.mobileapi.models.Metric;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.repository.CrudRepository;

public interface DeviceRepository extends CrudRepository<Device, String> {
    Iterable<Device> findByUserId(int userId);

    @EntityGraph(value = "device.sensors")
    Iterable<Metric> findByUserAndMacAddressOrder(int userId, String macAddress);
}
