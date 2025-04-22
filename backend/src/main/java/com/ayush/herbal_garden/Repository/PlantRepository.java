package com.ayush.herbal_garden.Repository;

import com.ayush.herbal_garden.Model.Plant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlantRepository extends JpaRepository<Plant,Long> {
}
