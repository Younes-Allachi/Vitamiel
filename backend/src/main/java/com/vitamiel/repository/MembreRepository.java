package com.vitamiel.repository;

import com.vitamiel.domain.Membre;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Membre entity.
 */
@Repository
public interface MembreRepository extends JpaRepository<Membre, Long> {
    default Optional<Membre> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Membre> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Membre> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(value = "select membre from Membre membre left join fetch membre.user", countQuery = "select count(membre) from Membre membre")
    Page<Membre> findAllWithToOneRelationships(Pageable pageable);

    @Query("select membre from Membre membre left join fetch membre.user")
    List<Membre> findAllWithToOneRelationships();

    @Query("select membre from Membre membre left join fetch membre.user where membre.id =:id")
    Optional<Membre> findOneWithToOneRelationships(@Param("id") Long id);

    Optional<Membre> findByUser_Id(Long id);
}
