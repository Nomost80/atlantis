package exakis.atlantis.metricpersistence.repositories;

import exakis.atlantis.metricpersistence.model.Device;
import org.springframework.data.repository.CrudRepository;

public interface DeviceRepository extends CrudRepository<Device, String> {
}
