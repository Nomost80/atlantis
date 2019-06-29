package exakis.atlantis.admin.repositories;

import exakis.atlantis.admin.models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, String> {

}
