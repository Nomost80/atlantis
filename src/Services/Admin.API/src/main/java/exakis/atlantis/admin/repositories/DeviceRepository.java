package exakis.atlantis.admin.repositories;

import exakis.atlantis.admin.models.Device;
import org.springframework.data.repository.CrudRepository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface DeviceRepository extends CrudRepository<Device, String> {
    Iterable<Device> findDevicesWithoutUser();
}
