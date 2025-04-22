package com.ayush.herbal_garden.Controller;

import com.ayush.herbal_garden.Model.Plant;
import com.ayush.herbal_garden.Service.PlantService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plants")
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class PlantController {

    @Autowired
    private PlantService plantService;

    @GetMapping
    public List<Plant> getAllPlants() {
        return plantService.getAllPlants();
    }

    @GetMapping("/{id}")
    public Plant getPlantById(@PathVariable Long id) {
        return plantService.getPlantById(id);
    }

    @PostMapping
    public Plant createPlant(@RequestBody Plant plant) {
        return plantService.savePlant(plant);
    }

    @GetMapping("/search")
    public List<Plant> searchPlants(@RequestParam String term) {
        return plantService.searchPlants(term);
    }

    @GetMapping("/filter")
    public List<Plant> filterPlantsBySystem(@RequestParam String system) {
        return plantService.filterPlantsBySystem(system);
    }

    // ✅ Update existing plant by ID
    @PutMapping("/{id}")
    public Plant updatePlant(@PathVariable Long id, @RequestBody Plant plant) {
        return plantService.updatePlant(id, plant);
    }

    // ✅ Delete plant by ID
    @DeleteMapping("/{id}")
    public void deletePlant(@PathVariable Long id) {
        plantService.deletePlant(id);
    }

}
