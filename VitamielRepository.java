package repository;

import org.springframework.data.jpa.repository.JpaRepository;

import model.Vitamiel;

public interface VitamielRepository extends JpaRepository<Vitamiel, Integer> {
	
	Vitamiel findVitamielById(int id);

}
