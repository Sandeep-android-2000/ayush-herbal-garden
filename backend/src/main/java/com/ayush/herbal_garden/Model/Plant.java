package com.ayush.herbal_garden.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Plant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String scientificName;

    @ElementCollection
    @CollectionTable(
            name = "plant_systems",
            joinColumns = @JoinColumn(name = "plant_id")
    )
    @Column(name = "`system`")
    private List<String> system;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ElementCollection
    @CollectionTable(
            name = "plant_medicinal_uses",              // ✅ This matches your table name
            joinColumns = @JoinColumn(name = "plant_id") // ✅ This matches the foreign key column
    )
    @Column(name = "medicinal_use") // ✅ This is important to tell Hibernate which column to map to
    private List<String> medicinalUses;

    @ElementCollection
    @CollectionTable(
            name = "plant_parts_used",
            joinColumns = @JoinColumn(name = "plant_id")
    )
    @Column(name = "part_used")
    private List<String> partUsed;

    @Column(columnDefinition = "TEXT")
    private String cultivationInfo;

    private String image;
    private String modelUrl;
}
