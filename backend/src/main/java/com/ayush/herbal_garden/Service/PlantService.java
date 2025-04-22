package com.ayush.herbal_garden.Service;

import com.ayush.herbal_garden.Model.Plant;
import com.ayush.herbal_garden.Repository.PlantRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PlantService {

    @Autowired
    private PlantRepository plantRepository;

    public List<Plant> getAllPlants() {
        return plantRepository.findAll();
    }

    public Plant getPlantById(Long id) {
        return plantRepository.findById(id).orElse(null);
    }

    public Plant savePlant(Plant plant) {
        return plantRepository.save(plant);
    }

    public List<Plant> searchPlants(String term) {
        List<Plant> plants = plantRepository.findAll();
        return plants.stream()
                .filter(plant -> plant.getName().toLowerCase().contains(term.toLowerCase()) ||
                        plant.getScientificName().toLowerCase().contains(term.toLowerCase()) ||
                        plant.getDescription().toLowerCase().contains(term.toLowerCase()))
                .collect(Collectors.toList());
    }

    // Filter plants by medicinal system
    public List<Plant> filterPlantsBySystem(String system) {
        List<Plant> plants = plantRepository.findAll();
        return plants.stream()
                .filter(plant -> plant.getSystem().contains(system))
                .collect(Collectors.toList());
    }

    // ✅ Update plant
    public Plant updatePlant(Long id, Plant updatedPlant) {
        Optional<Plant> optionalPlant = plantRepository.findById(id);
        if (optionalPlant.isPresent()) {
            Plant existingPlant = optionalPlant.get();

            // Update fields - customize as per your model
            existingPlant.setName(updatedPlant.getName());
            existingPlant.setScientificName(updatedPlant.getScientificName());
            existingPlant.setSystem(updatedPlant.getSystem());
            existingPlant.setDescription(updatedPlant.getDescription());
            existingPlant.setMedicinalUses(updatedPlant.getMedicinalUses());
            existingPlant.setPartUsed(updatedPlant.getPartUsed());
            existingPlant.setCultivationInfo(updatedPlant.getCultivationInfo());
            existingPlant.setImage(updatedPlant.getImage());
            existingPlant.setModelUrl(updatedPlant.getModelUrl());

            return plantRepository.save(existingPlant);
        }
        return null;
    }

    // ✅ Delete plant
    public void deletePlant(Long id) {
        plantRepository.deleteById(id);
    }
}
